/**
 * Pure TypeScript QR Code Generator (Zero-Dependency)
 * High-reliability QR Code Model 2 generator for UPI string encoding.
 * Generates clean, crisp SVG paths with zero Node/Webpack dependencies.
 */

// Error correction level
export type QrErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

interface QrMatrix {
  size: number;
  modules: boolean[][];
}

/* --- Lightweight QR Code Model 2 Core --- */

// GF(256) tables for Reed-Solomon error correction
const EXP_TABLE = new Uint8Array(512);
const LOG_TABLE = new Uint8Array(256);

(function initGalois() {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    EXP_TABLE[i] = x;
    EXP_TABLE[i + 255] = x;
    LOG_TABLE[x] = i;
    x = (x << 1) ^ (x >= 128 ? 0x11d : 0);
  }
  LOG_TABLE[0] = 0;
})();

function gfMultiply(x: number, y: number): number {
  if (x === 0 || y === 0) return 0;
  return EXP_TABLE[LOG_TABLE[x] + LOG_TABLE[y]];
}

function reedSolomonCompute(data: Uint8Array, eccLen: number): Uint8Array {
  const genPoly = new Uint8Array(eccLen);
  genPoly[0] = 1;
  for (let i = 0; i < eccLen; i++) {
    const factor = EXP_TABLE[i];
    for (let j = eccLen - 1; j >= 0; j--) {
      genPoly[j] = gfMultiply(genPoly[j], factor) ^ (j > 0 ? genPoly[j - 1] : 0);
    }
  }

  const result = new Uint8Array(eccLen);
  for (let i = 0; i < data.length; i++) {
    const factor = data[i] ^ result[0];
    for (let j = 0; j < eccLen - 1; j++) {
      result[j] = result[j + 1] ^ gfMultiply(genPoly[j + 1], factor);
    }
    result[eccLen - 1] = gfMultiply(genPoly[0], factor);
  }
  return result;
}

// Minimal table for versions 1 to 10 (UPI URLs are usually 80-160 chars, Version 5-8 is sufficient)
interface VersionSpec {
  version: number;
  totalBytes: number;
  eccBytes: number;
  blocks: number;
}

// Version capacity lookup for Error Correction Level M
const VERSION_SPECS_M: VersionSpec[] = [
  { version: 1, totalBytes: 16, eccBytes: 10, blocks: 1 },
  { version: 2, totalBytes: 28, eccBytes: 16, blocks: 1 },
  { version: 3, totalBytes: 44, eccBytes: 26, blocks: 1 },
  { version: 4, totalBytes: 64, eccBytes: 18, blocks: 2 },
  { version: 5, totalBytes: 86, eccBytes: 24, blocks: 2 },
  { version: 6, totalBytes: 108, eccBytes: 16, blocks: 4 },
  { version: 7, totalBytes: 124, eccBytes: 18, blocks: 4 },
  { version: 8, totalBytes: 154, eccBytes: 22, blocks: 4 },
  { version: 9, totalBytes: 182, eccBytes: 22, blocks: 5 },
  { version: 10, totalBytes: 216, eccBytes: 26, blocks: 5 },
];

function getAlignmentPositions(version: number): number[] {
  if (version === 1) return [];
  const intervals = [
    [], [], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34],
    [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50]
  ];
  return intervals[version] || [];
}

export function generateQrMatrix(text: string): QrMatrix {
  // Encode string as UTF-8 bytes
  const encoder = new TextEncoder();
  const textBytes = encoder.encode(text);
  const dataLen = textBytes.length;

  // Determine required version
  let spec = VERSION_SPECS_M.find((s) => s.totalBytes - s.eccBytes >= dataLen + 3);
  if (!spec) {
    spec = VERSION_SPECS_M[VERSION_SPECS_M.length - 1];
  }

  const version = spec.version;
  const size = version * 4 + 17;
  const dataCap = spec.totalBytes - spec.eccBytes;

  // Build bit stream: 4 bits mode (0100 for byte) + 8/16 bits char count + data + terminator + padding
  const bits: number[] = [];
  function pushBits(val: number, len: number) {
    for (let i = len - 1; i >= 0; i--) {
      bits.push((val >> i) & 1);
    }
  }

  // Byte mode indicator: 0100
  pushBits(0b0100, 4);
  // Character count indicator (8 bits for versions 1-9)
  pushBits(dataLen, version <= 9 ? 8 : 16);

  for (let i = 0; i < dataLen; i++) {
    pushBits(textBytes[i], 8);
  }

  // Terminator (up to 4 zeroes)
  const bitCap = dataCap * 8;
  const termLen = Math.min(4, bitCap - bits.length);
  for (let i = 0; i < termLen; i++) bits.push(0);

  // Pad to byte boundary
  while (bits.length % 8 !== 0) bits.push(0);

  // Pad bytes 0xEC, 0x11
  const padPatterns = [0xec, 0x11];
  let padIdx = 0;
  while (bits.length < bitCap) {
    pushBits(padPatterns[padIdx % 2], 8);
    padIdx++;
  }

  // Convert bits to raw data bytes
  const dataBytes = new Uint8Array(dataCap);
  for (let i = 0; i < dataCap; i++) {
    let byte = 0;
    for (let b = 0; b < 8; b++) {
      byte = (byte << 1) | bits[i * 8 + b];
    }
    dataBytes[i] = byte;
  }

  // Reed-Solomon per block
  const numBlocks = spec.blocks;
  const blockDataCap = Math.floor(dataCap / numBlocks);
  const blockEccLen = Math.floor(spec.eccBytes / numBlocks);

  const blockDataArray: Uint8Array[] = [];
  const blockEccArray: Uint8Array[] = [];

  for (let b = 0; b < numBlocks; b++) {
    const start = b * blockDataCap;
    const end = start + blockDataCap;
    const blkData = dataBytes.slice(start, end);
    blockDataArray.push(blkData);
    blockEccArray.push(reedSolomonCompute(blkData, blockEccLen));
  }

  // Interleave data bytes and ECC bytes
  const finalSequence: number[] = [];
  for (let i = 0; i < blockDataCap; i++) {
    for (let b = 0; b < numBlocks; b++) {
      finalSequence.push(blockDataArray[b][i]);
    }
  }
  for (let i = 0; i < blockEccLen; i++) {
    for (let b = 0; b < numBlocks; b++) {
      finalSequence.push(blockEccArray[b][i]);
    }
  }

  // Create grid matrix
  const modules: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));
  const isFunction: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));

  function setFunctionModule(r: number, c: number, val: boolean) {
    modules[r][c] = val;
    isFunction[r][c] = true;
  }

  // Draw 7x7 Finder Patterns at Top-Left, Top-Right, Bottom-Left
  function drawFinder(row: number, col: number) {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const targetR = row + r;
        const targetC = col + c;
        if (targetR >= 0 && targetR < size && targetC >= 0 && targetC < size) {
          const isBlack =
            (r >= 0 && r <= 6 && (c === 0 || c === 6)) ||
            (c >= 0 && c <= 6 && (r === 0 || r === 6)) ||
            (r >= 2 && r <= 4 && c >= 2 && c <= 4);
          setFunctionModule(targetR, targetC, isBlack);
        }
      }
    }
  }

  drawFinder(0, 0);
  drawFinder(0, size - 7);
  drawFinder(size - 7, 0);

  // Timing patterns
  for (let i = 8; i < size - 8; i++) {
    setFunctionModule(6, i, i % 2 === 0);
    setFunctionModule(i, 6, i % 2 === 0);
  }

  // Dark module
  setFunctionModule(4 * version + 9, 8, true);

  // Alignment patterns
  const alignPos = getAlignmentPositions(version);
  for (let r of alignPos) {
    for (let c of alignPos) {
      if (isFunction[r][c]) continue;
      for (let dr = -2; dr <= 2; dr++) {
        for (let dc = -2; dc <= 2; dc++) {
          const isBlack =
            Math.abs(dr) === 2 || Math.abs(dc) === 2 || (dr === 0 && dc === 0);
          setFunctionModule(r + dr, c + dc, isBlack);
        }
      }
    }
  }

  // Format info area reservation
  for (let i = 0; i < 9; i++) {
    if (!isFunction[8][i]) setFunctionModule(8, i, false);
    if (!isFunction[i][8]) setFunctionModule(i, 8, false);
  }
  for (let i = 0; i < 8; i++) {
    if (!isFunction[8][size - 1 - i]) setFunctionModule(8, size - 1 - i, false);
    if (!isFunction[size - 1 - i][8]) setFunctionModule(size - 1 - i, 8, false);
  }

  // Place codeword bits using zigzag scanning
  const allBits: number[] = [];
  for (let byte of finalSequence) {
    for (let b = 7; b >= 0; b--) {
      allBits.push((byte >> b) & 1);
    }
  }

  let bitIndex = 0;
  let upwards = true;
  for (let right = size - 1; right > 0; right -= 2) {
    if (right === 6) right--; // Skip vertical timing column
    const rows = upwards
      ? Array.from({ length: size }, (_, i) => size - 1 - i)
      : Array.from({ length: size }, (_, i) => i);

    for (let r of rows) {
      for (let c of [right, right - 1]) {
        if (!isFunction[r][c]) {
          let bit = bitIndex < allBits.length ? allBits[bitIndex++] : 0;
          // Apply standard Mask 0: (row + col) % 2 === 0
          const mask = (r + c) % 2 === 0;
          modules[r][c] = (bit === 1) !== mask;
        }
      }
    }
    upwards = !upwards;
  }

  // Write Format Information (Mask 0 + Error Level M => 0b101010000010010 ^ 0b101010000010010)
  // Precomputed format info for Error Correction M, Mask Pattern 0: 0x5412 ^ 0x5412 = 0x0000, actual with BCH: 0x5412
  const formatInfo = 0x5412;
  for (let i = 0; i < 15; i++) {
    const bit = ((formatInfo >> (14 - i)) & 1) === 1;
    // Top-left
    if (i < 6) modules[8][i] = bit;
    else if (i === 6) modules[8][7] = bit;
    else if (i === 7) modules[8][8] = bit;
    else if (i === 8) modules[7][8] = bit;
    else modules[14 - i][8] = bit;

    // Split corners
    if (i < 8) modules[size - 1 - i][8] = bit;
    else modules[8][size - 15 + i] = bit;
  }

  return { size, modules };
}

/**
 * Generate clean SVG Path string for QR code matrix
 */
export function generateQrSvgPath(matrix: QrMatrix): { path: string; size: number } {
  const { size, modules } = matrix;
  let path = '';
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (modules[r][c]) {
        path += `M${c},${r}h1v1h-1z `;
      }
    }
  }
  return { path, size };
}
