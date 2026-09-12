/**
 * Database Contract Interfaces
 * Synchronized with docs/DATABASE.md under DoD Protocol v2.0
 */

export interface DonationRecord {
  id: string;
  created_at: string;
  donor_name: string;
  donor_phone: string;
  donor_email?: string;
  pan_number?: string;
  seva_type: 'shila' | 'cement' | 'sqft' | 'pillar' | 'custom' | 'anna_daan' | 'granth_daan' | 'shiksha_seva';
  amount: number;
  payment_method: 'upi_qr' | 'razorpay' | 'bank_transfer';
  payment_status: 'pending' | 'verified' | 'failed';
  utr_reference?: string;
  receipt_80g_number?: string;
  receipt_pdf_url?: string;
}

export interface YagyaBooking {
  id: string;
  created_at: string;
  devotee_name: string;
  gotra: string;
  date_of_birth?: string;
  place_of_birth?: string;
  contact_phone: string;
  whatsapp_number: string;
  affliction_category: 'tantrik_badha' | 'paranormal' | 'graha_pitra_dosh' | 'health_family' | 'spiritual_protection';
  symptoms_description: string;
  prescribed_yagya?: string;
  anushthan_status: 'inquiry' | 'consultation_scheduled' | 'sankalpa_done' | 'completed';
  assigned_acharya?: string;
}

export interface NgoSevaSponsorship {
  id: string;
  created_at: string;
  donor_name: string;
  donor_phone: string;
  pan_number?: string;
  initiative: 'anna_daan' | 'granth_daan' | 'shiksha_seva';
  units_sponsored: number; // e.g. 51 meals, 21 books
  amount: number;
  distribution_date?: string;
  photo_journal_urls?: string[];
  receipt_80g_issued: boolean;
}

export interface ConstructionMilestone {
  id: string;
  phase_number: number;
  phase_name: string;
  description: string;
  target_amount: number;
  collected_amount: number;
  status: 'completed' | 'in_progress' | 'upcoming';
  completion_percentage: number;
  photo_urls: string[];
}
