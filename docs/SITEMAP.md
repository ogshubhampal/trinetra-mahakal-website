# 🧭 Application Sitemap & Route Manifest: Trinetra Mahakal

> **System Version:** `v1.0.0`  
> **Last Synchronized:** `2026-09-09`  
> **Verification Script:** `npm run docs:verify`

---

## 🌐 1. Public Sanctuary Endpoints

| Route Path | Component | Layout | Auth / RBAC | Purpose | Database Bindings |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/` | `src/app/page.tsx` | `RootLayout` | Public | Sanctum Home, Darshan, Neev to Shikhar Tracker, NGO Bento | `construction_milestones`, `donations` |
| `/mandir-nirman` | `src/app/mandir-nirman/page.tsx` | `RootLayout` | Public | Construction Seva Crowdfunding, Direct UPI QR, 80G Receipt | `donations`, `construction_milestones` |
| `/yagya-anushthan` | `src/app/yagya-anushthan/page.tsx` | `RootLayout` | Public | Vedic Yagya & Tantrik Badha Nivaran intake & Acharya helpline | `yagya_inquiries` |
| `/ngo-seva` | `src/app/ngo-seva/page.tsx` | `RootLayout` | Public | Registered NGO charity: Anna Daan, Granth Daan, Shiksha Seva | `ngo_sponsorships` |
| `/contact` | `src/app/contact/page.tsx` | `RootLayout` | Public | Mandir address, pilgrimage guide, visiting timings, contact | `donations` |

---

## 🛡️ 2. Administrative & Trustee Endpoints

| Route Path | Component | Layout | Auth / RBAC | Purpose | Database Bindings |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/admin/donations` | `src/app/admin/donations/page.tsx` | `AdminLayout` | `admin.treasury` | UTR verification, 80G receipt dispatch, and donor log | `donations` |
| `/admin/yagya` | `src/app/admin/yagya/page.tsx` | `AdminLayout` | `admin.acharya` | Review confidential Tantrik Badha consultation requests | `yagya_inquiries` |
