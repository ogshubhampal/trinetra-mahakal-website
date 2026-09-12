# 🏗️ System Architecture & Engineering Standards

> **Tech Stack:** React / Next.js, TypeScript, Tailwind CSS, Supabase / PostgreSQL  
> **Last Updated:** `YYYY-MM-DD`

---

## 1. High-Level Architecture

```
+-----------------------------------------------------------------+
|                        CLIENT TIER (SPA / SSR)                  |
|   React / Next.js + React Router / App Router + Tailwind CSS   |
+-------------------------------+---------------------------------+
                                |
                                v
+-----------------------------------------------------------------+
|                       API & EDGE SERVICES                       |
|   Supabase Client + Edge Functions + Webhook Handlers           |
+-------------------------------+---------------------------------+
                                |
                                v
+-----------------------------------------------------------------+
|                        DATA & STORAGE TIER                      |
|   PostgreSQL 15 (RLS Protected) + S3 / Supabase Storage         |
+-----------------------------------------------------------------+
```

## 2. Core Engineering Invariants

1. **Zero Hardcoded Secrets or Contacts**: All brand and contact numbers reside in dynamic settings context.
2. **Zero-Trust Pricing**: Client never sends price or discount to payment gateways; Edge Function computes server-side.
3. **Optimized Media**: Edge CDN image transforms with WebP and explicit width/height dimensions.
4. **Resilient UX**: Error boundaries, offline alerts, and payment interruption fallback recovery.
