// Supabase Database Types
// Bu dosya `supabase gen types typescript` komutu ile otomatik oluşturulacak
// Şimdilik manuel tanımlar

export type Database = {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    role: 'admin' | 'muhasebe' | 'personel' | 'saha_personeli' | 'tercuman' | 'proje_sorumlusu' | 'sponsor' | 'aile'
                    full_name: string
                    phone: string | null
                    whatsapp_number: string | null
                    email: string | null
                    active: boolean
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    role: 'admin' | 'muhasebe' | 'personel' | 'saha_personeli' | 'tercuman' | 'proje_sorumlusu' | 'sponsor' | 'aile'
                    full_name: string
                    phone?: string | null
                    whatsapp_number?: string | null
                    email?: string | null
                    active?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    role?: 'admin' | 'muhasebe' | 'personel' | 'saha_personeli' | 'tercuman' | 'proje_sorumlusu' | 'sponsor' | 'aile'
                    full_name?: string
                    phone?: string | null
                    whatsapp_number?: string | null
                    email?: string | null
                    active?: boolean
                    created_at?: string
                    updated_at?: string
                }
            }
            regions: {
                Row: {
                    id: string
                    code: string
                    name: string
                    country: string
                    active: boolean
                    created_at: string
                }
                Insert: {
                    id?: string
                    code: string
                    name: string
                    country: string
                    active?: boolean
                    created_at?: string
                }
                Update: {
                    id?: string
                    code?: string
                    name?: string
                    country?: string
                    active?: boolean
                    created_at?: string
                }
            }
            families: {
                Row: {
                    id: string
                    family_number: string
                    region_id: string | null
                    address: string | null
                    city: string | null
                    notes: string | null
                    auth_user_id: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    family_number?: string
                    region_id?: string | null
                    address?: string | null
                    city?: string | null
                    notes?: string | null
                    auth_user_id?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    family_number?: string
                    region_id?: string | null
                    address?: string | null
                    city?: string | null
                    notes?: string | null
                    auth_user_id?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            orphans: {
                Row: {
                    id: string
                    orphan_number: string
                    family_id: string | null
                    first_name: string
                    last_name: string
                    mother_name: string | null
                    father_name: string | null
                    birth_date: string
                    education_level: 'okul_oncesi' | 'ilkokul' | 'ortaokul' | 'lise' | 'universite' | 'mezun' | 'okula_gitmiyor' | null
                    health_status: 'saglikli' | 'kronik_hastalik' | 'engelli' | 'ozel_bakim' | null
                    health_details: string | null
                    photo_url: string | null
                    is_sponsored: boolean
                    is_active: boolean
                    termination_reason: string | null
                    termination_date: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    orphan_number?: string
                    family_id?: string | null
                    first_name: string
                    last_name: string
                    mother_name?: string | null
                    father_name?: string | null
                    birth_date: string
                    education_level?: 'okul_oncesi' | 'ilkokul' | 'ortaokul' | 'lise' | 'universite' | 'mezun' | 'okula_gitmiyor' | null
                    health_status?: 'saglikli' | 'kronik_hastalik' | 'engelli' | 'ozel_bakim' | null
                    health_details?: string | null
                    photo_url?: string | null
                    is_sponsored?: boolean
                    is_active?: boolean
                    termination_reason?: string | null
                    termination_date?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    orphan_number?: string
                    family_id?: string | null
                    first_name?: string
                    last_name?: string
                    mother_name?: string | null
                    father_name?: string | null
                    birth_date?: string
                    education_level?: 'okul_oncesi' | 'ilkokul' | 'ortaokul' | 'lise' | 'universite' | 'mezun' | 'okula_gitmiyor' | null
                    health_status?: 'saglikli' | 'kronik_hastalik' | 'engelli' | 'ozel_bakim' | null
                    health_details?: string | null
                    photo_url?: string | null
                    is_sponsored?: boolean
                    is_active?: boolean
                    termination_reason?: string | null
                    termination_date?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            user_role: 'admin' | 'muhasebe' | 'personel' | 'saha_personeli' | 'tercuman' | 'proje_sorumlusu' | 'sponsor' | 'aile'
            currency: 'TRY' | 'USD' | 'EUR'
            education_level: 'okul_oncesi' | 'ilkokul' | 'ortaokul' | 'lise' | 'universite' | 'mezun' | 'okula_gitmiyor'
            health_status: 'saglikli' | 'kronik_hastalik' | 'engelli' | 'ozel_bakim'
        }
    }
}