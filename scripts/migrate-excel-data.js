// Excel verilerini Supabase'e taşıma scripti
const XLSX = require('xlsx')
const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
)

class ExcelMigrator {
    constructor() {
        this.stats = {
            families: { success: 0, error: 0 },
            orphans: { success: 0, error: 0 },
            sponsors: { success: 0, error: 0 },
            payments: { success: 0, error: 0 }
        }
    }

    // Excel dosyasını oku
    readExcelFile(filePath, sheetName = null) {
        try {
            const workbook = XLSX.readFile(filePath)
            const sheet = sheetName ? workbook.Sheets[sheetName] : workbook.Sheets[workbook.SheetNames[0]]
            return XLSX.utils.sheet_to_json(sheet)
        } catch (error) {
            console.error('❌ Excel dosyası okuma hatası:', error.message)
            return []
        }
    }

    // Tarih formatını düzelt
    parseDate(dateValue) {
        if (!dateValue) return null

        // Excel tarih formatı
        if (typeof dateValue === 'number') {
            const date = XLSX.SSF.parse_date_code(dateValue)
            return `${date.y}-${String(date.m).padStart(2, '0')}-${String(date.d).padStart(2, '0')}`
        }

        // String tarih formatı
        if (typeof dateValue === 'string') {
            const date = new Date(dateValue)
            if (!isNaN(date.getTime())) {
                return date.toISOString().split('T')[0]
            }
        }

        return null
    }

    // Bölge kodunu bul
    async findRegionId(regionName) {
        const { data: regions } = await supabase.from('regions').select('id, name, code')

        const region = regions?.find(r =>
            r.name.toLowerCase().includes(regionName.toLowerCase()) ||
            r.code.toLowerCase() === regionName.toLowerCase()
        )

        return region?.id || regions?.[0]?.id // Varsayılan olarak ilk bölgeyi kullan
    }

    // Aileleri migrate et
    async migrateFamilies(filePath, sheetName = 'Aileler') {
        console.log('👨‍👩‍👧‍👦 Aileler migrate ediliyor...')

        const data = this.readExcelFile(filePath, sheetName)

        for (const row of data) {
            try {
                const regionId = await this.findRegionId(row['Bölge'] || row['Region'] || 'TR')

                const family = {
                    region_id: regionId,
                    address: row['Adres'] || row['Address'] || '',
                    city: row['Şehir'] || row['City'] || '',
                    notes: row['Notlar'] || row['Notes'] || ''
                }

                const { data: insertedFamily, error } = await supabase
                    .from('families')
                    .insert(family)
                    .select()

                if (error) {
                    console.error(`❌ Aile ekleme hatası:`, error.message, row)
                    this.stats.families.error++
                } else {
                    console.log(`✅ Aile eklendi: ${insertedFamily[0].family_number}`)
                    this.stats.families.success++
                }
            } catch (error) {
                console.error(`❌ Aile işleme hatası:`, error.message, row)
                this.stats.families.error++
            }
        }
    }

    // Yetimleri migrate et
    async migrateOrphans(filePath, sheetName = 'Yetimler') {
        console.log('👶 Yetimler migrate ediliyor...')

        const data = this.readExcelFile(filePath, sheetName)

        // Aileleri al
        const { data: families } = await supabase.from('families').select('id, family_number')

        for (const row of data) {
            try {
                // Aile numarasına göre aile bul
                const familyNumber = row['Aile No'] || row['Family Number']
                const family = families?.find(f => f.family_number === familyNumber)

                const orphan = {
                    family_id: family?.id,
                    first_name: row['Ad'] || row['First Name'] || '',
                    last_name: row['Soyad'] || row['Last Name'] || '',
                    mother_name: row['Anne Adı'] || row['Mother Name'] || '',
                    father_name: row['Baba Adı'] || row['Father Name'] || '',
                    birth_date: this.parseDate(row['Doğum Tarihi'] || row['Birth Date']),
                    education_level: this.mapEducationLevel(row['Eğitim Durumu'] || row['Education']),
                    health_status: this.mapHealthStatus(row['Sağlık Durumu'] || row['Health']),
                    health_details: row['Sağlık Detayları'] || row['Health Details'] || ''
                }

                const { data: insertedOrphan, error } = await supabase
                    .from('orphans')
                    .insert(orphan)
                    .select()

                if (error) {
                    console.error(`❌ Yetim ekleme hatası:`, error.message, row)
                    this.stats.orphans.error++
                } else {
                    console.log(`✅ Yetim eklendi: ${insertedOrphan[0].orphan_number} - ${orphan.first_name} ${orphan.last_name}`)
                    this.stats.orphans.success++
                }
            } catch (error) {
                console.error(`❌ Yetim işleme hatası:`, error.message, row)
                this.stats.orphans.error++
            }
        }
    }

    // Sponsorları migrate et
    async migrateSponsors(filePath, sheetName = 'Sponsorlar') {
        console.log('💰 Sponsorlar migrate ediliyor...')

        const data = this.readExcelFile(filePath, sheetName)

        for (const row of data) {
            try {
                const sponsor = {
                    full_name: row['Ad Soyad'] || row['Full Name'] || '',
                    email: row['Email'] || '',
                    phone: row['Telefon'] || row['Phone'] || '',
                    whatsapp_number: row['WhatsApp'] || row['Telefon'] || row['Phone'] || '',
                    address: row['Adres'] || row['Address'] || '',
                    registration_date: this.parseDate(row['Kayıt Tarihi'] || row['Registration Date']) || new Date().toISOString().split('T')[0],
                    sponsorship_start_date: this.parseDate(row['Sponsorluk Başlangıç'] || row['Sponsorship Start'])
                }

                const { data: insertedSponsor, error } = await supabase
                    .from('sponsors')
                    .insert(sponsor)
                    .select()

                if (error) {
                    console.error(`❌ Sponsor ekleme hatası:`, error.message, row)
                    this.stats.sponsors.error++
                } else {
                    console.log(`✅ Sponsor eklendi: ${insertedSponsor[0].sponsor_number} - ${sponsor.full_name}`)
                    this.stats.sponsors.success++
                }
            } catch (error) {
                console.error(`❌ Sponsor işleme hatası:`, error.message, row)
                this.stats.sponsors.error++
            }
        }
    }

    // Ödemeleri migrate et
    async migratePayments(filePath, sheetName = 'Ödemeler') {
        console.log('💳 Ödemeler migrate ediliyor...')

        const data = this.readExcelFile(filePath, sheetName)

        // Sponsorları al
        const { data: sponsors } = await supabase.from('sponsors').select('id, sponsor_number, full_name')

        for (const row of data) {
            try {
                // Sponsor bul
                const sponsorNumber = row['Sponsor No'] || row['Sponsor Number']
                const sponsorName = row['Sponsor Adı'] || row['Sponsor Name']

                const sponsor = sponsors?.find(s =>
                    s.sponsor_number === sponsorNumber ||
                    s.full_name.toLowerCase().includes(sponsorName?.toLowerCase())
                )

                if (!sponsor) {
                    console.warn(`⚠️ Sponsor bulunamadı: ${sponsorNumber || sponsorName}`)
                    continue
                }

                const payment = {
                    sponsor_id: sponsor.id,
                    payment_type: 'nakdi',
                    amount: parseFloat(row['Tutar'] || row['Amount'] || 0),
                    currency: row['Para Birimi'] || row['Currency'] || 'TRY',
                    payment_method: this.mapPaymentMethod(row['Ödeme Yöntemi'] || row['Payment Method']),
                    payment_date: this.parseDate(row['Ödeme Tarihi'] || row['Payment Date']) || new Date().toISOString().split('T')[0],
                    payment_month: this.parseDate(row['Ödeme Ayı'] || row['Payment Month']),
                    status: 'alindi',
                    notes: row['Notlar'] || row['Notes'] || ''
                }

                const { data: insertedPayment, error } = await supabase
                    .from('payments')
                    .insert(payment)
                    .select()

                if (error) {
                    console.error(`❌ Ödeme ekleme hatası:`, error.message, row)
                    this.stats.payments.error++
                } else {
                    console.log(`✅ Ödeme eklendi: ${sponsor.sponsor_number} - ${payment.amount} ${payment.currency}`)
                    this.stats.payments.success++
                }
            } catch (error) {
                console.error(`❌ Ödeme işleme hatası:`, error.message, row)
                this.stats.payments.error++
            }
        }
    }

    // Yardımcı fonksiyonlar
    mapEducationLevel(education) {
        if (!education) return null

        const mapping = {
            'okul öncesi': 'okul_oncesi',
            'anaokulu': 'okul_oncesi',
            'ilkokul': 'ilkokul',
            'ortaokul': 'ortaokul',
            'lise': 'lise',
            'üniversite': 'universite',
            'mezun': 'mezun',
            'okula gitmiyor': 'okula_gitmiyor'
        }

        const key = education.toLowerCase()
        return mapping[key] || 'ilkokul'
    }

    mapHealthStatus(health) {
        if (!health) return 'saglikli'

        const mapping = {
            'sağlıklı': 'saglikli',
            'kronik hastalık': 'kronik_hastalik',
            'engelli': 'engelli',
            'özel bakım': 'ozel_bakim'
        }

        const key = health.toLowerCase()
        return mapping[key] || 'saglikli'
    }

    mapPaymentMethod(method) {
        if (!method) return 'banka_transferi'

        const mapping = {
            'banka transferi': 'banka_transferi',
            'havale': 'havale',
            'kredi kartı': 'kredi_karti',
            'nakit': 'nakit'
        }

        const key = method.toLowerCase()
        return mapping[key] || 'banka_transferi'
    }

    // İstatistikleri göster
    showStats() {
        console.log('\n📊 Migration İstatistikleri:')
        console.log('================================')
        console.log(`👨‍👩‍👧‍👦 Aileler: ${this.stats.families.success} başarılı, ${this.stats.families.error} hata`)
        console.log(`👶 Yetimler: ${this.stats.orphans.success} başarılı, ${this.stats.orphans.error} hata`)
        console.log(`💰 Sponsorlar: ${this.stats.sponsors.success} başarılı, ${this.stats.sponsors.error} hata`)
        console.log(`💳 Ödemeler: ${this.stats.payments.success} başarılı, ${this.stats.payments.error} hata`)
        console.log('================================')
    }

    // Tüm migration'ı çalıştır
    async migrateAll(filePath) {
        console.log('🚀 Excel migration başlatılıyor...')
        console.log(`📁 Dosya: ${filePath}`)

        try {
            await this.migrateFamilies(filePath)
            await this.migrateOrphans(filePath)
            await this.migrateSponsors(filePath)
            await this.migratePayments(filePath)

            this.showStats()
            console.log('🎉 Migration tamamlandı!')
        } catch (error) {
            console.error('❌ Migration hatası:', error.message)
        }
    }
}

// Script çalıştır
async function main() {
    const filePath = process.argv[2]

    if (!filePath) {
        console.log('❌ Kullanım: node migrate-excel-data.js <excel-dosya-yolu>')
        console.log('📝 Örnek: node migrate-excel-data.js ./data/hayir-kurumu-verileri.xlsx')
        return
    }

    const migrator = new ExcelMigrator()
    await migrator.migrateAll(filePath)
}

if (require.main === module) {
    main()
}

module.exports = { ExcelMigrator }