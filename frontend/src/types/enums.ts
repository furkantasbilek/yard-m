// Enum tanımları - Database ile senkron

export const UserRole = {
    ADMIN: 'admin',
    MUHASEBE: 'muhasebe',
    PERSONEL: 'personel',
    SAHA_PERSONELI: 'saha_personeli',
    TERCUMAN: 'tercuman',
    PROJE_SORUMLUSU: 'proje_sorumlusu',
    SPONSOR: 'sponsor',
    AILE: 'aile'
} as const

export const Currency = {
    TRY: 'TRY',
    USD: 'USD',
    EUR: 'EUR'
} as const

export const EducationLevel = {
    OKUL_ONCESI: 'okul_oncesi',
    ILKOKUL: 'ilkokul',
    ORTAOKUL: 'ortaokul',
    LISE: 'lise',
    UNIVERSITE: 'universite',
    MEZUN: 'mezun',
    OKULA_GITMIYOR: 'okula_gitmiyor'
} as const

export const HealthStatus = {
    SAGLIKLI: 'saglikli',
    KRONIK_HASTALIK: 'kronik_hastalik',
    ENGELLI: 'engelli',
    OZEL_BAKIM: 'ozel_bakim'
} as const

export const PaymentType = {
    NAKDI: 'nakdi',
    AYNI: 'ayni'
} as const

export const PaymentMethod = {
    BANKA_TRANSFERI: 'banka_transferi',
    KREDI_KARTI: 'kredi_karti',
    NAKIT: 'nakit',
    HAVALE: 'havale'
} as const

export const PaymentStatus = {
    BEKLENIYOR: 'bekleniyor',
    ALINDI: 'alindi',
    EKSIK: 'eksik',
    IPTAL: 'iptal'
} as const

export const ProjectType = {
    SU_KUYUSU: 'su_kuyusu',
    KONUT_INSAATI: 'konut_insaati',
    GIDA_DAGITIM: 'gida_dagitim',
    NAKDI_YARDIM: 'nakdi_yardim',
    EGITIM: 'egitim',
    SAGLIK: 'saglik',
    DIGER: 'diger'
} as const

export const ProjectStatus = {
    PLANLANIYOR: 'planlaniyor',
    DEVAM_EDIYOR: 'devam_ediyor',
    TAMAMLANDI: 'tamamlandi',
    IPTAL: 'iptal'
} as const

// Türkçe etiketler
export const UserRoleLabels = {
    [UserRole.ADMIN]: 'Yönetici',
    [UserRole.MUHASEBE]: 'Muhasebe',
    [UserRole.PERSONEL]: 'Personel',
    [UserRole.SAHA_PERSONELI]: 'Saha Personeli',
    [UserRole.TERCUMAN]: 'Tercüman',
    [UserRole.PROJE_SORUMLUSU]: 'Proje Sorumlusu',
    [UserRole.SPONSOR]: 'Sponsor',
    [UserRole.AILE]: 'Aile'
} as const

export const EducationLevelLabels = {
    [EducationLevel.OKUL_ONCESI]: 'Okul Öncesi',
    [EducationLevel.ILKOKUL]: 'İlkokul',
    [EducationLevel.ORTAOKUL]: 'Ortaokul',
    [EducationLevel.LISE]: 'Lise',
    [EducationLevel.UNIVERSITE]: 'Üniversite',
    [EducationLevel.MEZUN]: 'Mezun',
    [EducationLevel.OKULA_GITMIYOR]: 'Okula Gitmiyor'
} as const

export const HealthStatusLabels = {
    [HealthStatus.SAGLIKLI]: 'Sağlıklı',
    [HealthStatus.KRONIK_HASTALIK]: 'Kronik Hastalık',
    [HealthStatus.ENGELLI]: 'Engelli',
    [HealthStatus.OZEL_BAKIM]: 'Özel Bakım'
} as const

export const ProjectTypeLabels = {
    [ProjectType.SU_KUYUSU]: 'Su Kuyusu',
    [ProjectType.KONUT_INSAATI]: 'Konut İnşaatı',
    [ProjectType.GIDA_DAGITIM]: 'Gıda Dağıtımı',
    [ProjectType.NAKDI_YARDIM]: 'Nakdi Yardım',
    [ProjectType.EGITIM]: 'Eğitim',
    [ProjectType.SAGLIK]: 'Sağlık',
    [ProjectType.DIGER]: 'Diğer'
} as const

export const ProjectStatusLabels = {
    [ProjectStatus.PLANLANIYOR]: 'Planlanıyor',
    [ProjectStatus.DEVAM_EDIYOR]: 'Devam Ediyor',
    [ProjectStatus.TAMAMLANDI]: 'Tamamlandı',
    [ProjectStatus.IPTAL]: 'İptal'
} as const