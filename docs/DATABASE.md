# 🗄️ Database Architecture & Schema Dictionary: Trinetra Mahakal

> **Engine:** PostgreSQL 15+ (Supabase / Neon / RDS)  
> **Last Synchronized:** `2026-09-09`  
> **Type Definitions:** [`src/types/database.ts`](../src/types/database.ts)

---

## 📊 Table Matrix

| Table Name | Primary Key | RLS Enabled | Description |
| :--- | :--- | :--- | :--- |
| `donations` | `id` (UUID) | ✅ Yes | Unified donation records (Mandir Nirman & NGO Seva) with UTR/Razorpay reconciliation |
| `yagya_inquiries` | `id` (UUID) | ✅ Yes | Confidential intake for Tantrik Badha and Vedic Yagya consultations |
| `ngo_sponsorships` | `id` (UUID) | ✅ Yes | Anna Daan, Granth Daan, and Shiksha Seva sponsorship tracking |
| `construction_milestones` | `id` (UUID) | ✅ Yes | "Neev to Shikhar" construction phase roadmap & expenditure tracking |

---

## 📋 Schema Definitions

### 1. `donations`
```sql
CREATE TABLE donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  donor_name TEXT NOT NULL,
  donor_phone TEXT NOT NULL,
  donor_email TEXT,
  pan_number TEXT,
  seva_type TEXT NOT NULL CHECK (seva_type IN ('shila', 'cement', 'sqft', 'pillar', 'custom', 'anna_daan', 'granth_daan', 'shiksha_seva')),
  amount NUMERIC NOT NULL CHECK (amount > 0),
  payment_method TEXT NOT NULL CHECK (payment_method IN ('upi_qr', 'razorpay', 'bank_transfer')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'verified', 'failed')),
  utr_reference TEXT,
  receipt_80g_number TEXT UNIQUE,
  receipt_pdf_url TEXT
);

-- RLS Policies
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Create Donation" ON donations FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin Full Access" ON donations FOR ALL USING (auth.role() = 'authenticated');
```

### 2. `yagya_inquiries`
```sql
CREATE TABLE yagya_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  devotee_name TEXT NOT NULL,
  gotra TEXT NOT NULL,
  date_of_birth DATE,
  place_of_birth TEXT,
  contact_phone TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  affliction_category TEXT NOT NULL CHECK (affliction_category IN ('tantrik_badha', 'paranormal', 'graha_pitra_dosh', 'health_family', 'spiritual_protection')),
  symptoms_description TEXT NOT NULL,
  prescribed_yagya TEXT,
  anushthan_status TEXT DEFAULT 'inquiry' CHECK (anushthan_status IN ('inquiry', 'consultation_scheduled', 'sankalpa_done', 'completed')),
  assigned_acharya TEXT
);

-- RLS Policies (Strict Confidentiality)
ALTER TABLE yagya_inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Submit Inquiry" ON yagya_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Acharya Authorized Access" ON yagya_inquiries FOR SELECT USING (auth.role() = 'authenticated');
```

### 3. `ngo_sponsorships`
```sql
CREATE TABLE ngo_sponsorships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  donor_name TEXT NOT NULL,
  donor_phone TEXT NOT NULL,
  pan_number TEXT,
  initiative TEXT NOT NULL CHECK (initiative IN ('anna_daan', 'granth_daan', 'shiksha_seva')),
  units_sponsored INT NOT NULL,
  amount NUMERIC NOT NULL,
  distribution_date DATE,
  photo_journal_urls TEXT[],
  receipt_80g_issued BOOLEAN DEFAULT FALSE
);
```

### 4. `construction_milestones`
```sql
CREATE TABLE construction_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phase_number INT NOT NULL,
  phase_name TEXT NOT NULL,
  description TEXT NOT NULL,
  target_amount NUMERIC NOT NULL,
  collected_amount NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('completed', 'in_progress', 'upcoming')),
  completion_percentage NUMERIC DEFAULT 0,
  photo_urls TEXT[] DEFAULT '{}'
);

-- RLS Policies
ALTER TABLE construction_milestones ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public View Milestones" ON construction_milestones FOR SELECT USING (true);
```
