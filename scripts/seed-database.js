// Test verisi oluşturma scripti
const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function seedDatabase() {
    console.log('🌱 Test verisi oluşturuluyor...')

    try {
        // 1. Test kullanıcıları oluştur
        console.log('👥 Test kullanıcıları oluşturuluyor...')

        const testUsers = [
            {
                email: 'admin@hayirkurumu.org',
                password: 'admin123',
                role: 'admin',
                full_name: 'Sistem Yöneticisi'
            },
            {
                email: 'muhasebe@hayirkurumu.org',
                password: 'muhasebe123',
                role: 'muhasebe',
                full_name: 'Muhasebe Sorumlusu'
            },
            {
                email: 'personel@hayirkurumu.org',
                password: 'personel123',
                role: 'personel',
                full_name: 'Genel Personel'
            }
        ]

        for (const user of testUsers) {
            const { data: authData, error: authError } = await supabase.auth.admin.createUser({
                email: user.email,
                password: user.password,
                email_confirm: true
            })

            if (authError) {
                console.error(`❌ Kullanıcı oluşturma hatası (${user.email}):`, authError.message)
                continue
            }

            // Profil oluştur
            const { error: profileError } = await supabase
                .from('profiles')
                .insert({
                    id: authData.user.id,
                    role: user.role,
                    full_name: user.full_name,
                    email: user.email
                })

            if (profileError) {
                console.error(`❌ Profil oluşturma hatası (${user.email}):`, profileError.message)
            } else {
                console.log(`✅ Kullanıcı oluşturuldu: ${user.email}`)
            }
        }

        // 2. Test aileleri oluştur
        console.log('👨‍👩‍👧‍👦 Test aileleri oluşturuluyor...')

        const testFamilies = [
            {
                region_id: null, // Trigger otomatik numara oluşturacak
                address: 'Halep, Suriye',
                city: 'Halep',
                notes: 'Savaş mağduru aile'
            },
            {
                region_id: null,
                address: 'Gazze, Filistin',
                city: 'Gazze',
                notes: 'İhtiyaç sahibi aile'
            },
            {
                region_id: null,
                address: 'Bakü, Azerbaycan',
                city: 'Bakü',
                notes: 'Yardıma muhtaç aile'
            }
        ]

        // Bölge ID'lerini al
        const { data: regions } = await supabase.from('regions').select('id, code')

        for (let i = 0; i < testFamilies.length; i++) {
            const family = testFamilies[i]
            family.region_id = regions[i % regions.length].id

            const { data, error } = await supabase
                .from('families')
                .insert(family)
                .select()

            if (error) {
                console.error('❌ Aile oluşturma hatası:', error.message)
            } else {
                console.log(`✅ Aile oluşturuldu: ${data[0].family_number}`)
            }
        }

        // 3. Test yetimleri oluştur
        console.log('👶 Test yetimleri oluşturuluyor...')

        const { data: families } = await supabase.from('families').select('id')

        const testOrphans = [
            {
                family_id: families[0]?.id,
                first_name: 'Ahmed',
                last_name: 'Al-Mahmoud',
                mother_name: 'Fatma',
                father_name: 'Mahmoud',
                birth_date: '2015-03-15',
                education_level: 'ilkokul',
                health_status: 'saglikli'
            },
            {
                family_id: families[1]?.id,
                first_name: 'Zeynep',
                last_name: 'Öztürk',
                mother_name: 'Ayşe',
                father_name: 'Mehmet',
                birth_date: '2012-07-22',
                education_level: 'ortaokul',
                health_status: 'saglikli'
            },
            {
                family_id: families[2]?.id,
                first_name: 'Ali',
                last_name: 'Hasanov',
                mother_name: 'Leyla',
                father_name: 'Hasan',
                birth_date: '2018-11-08',
                education_level: 'okul_oncesi',
                health_status: 'saglikli'
            }
        ]

        for (const orphan of testOrphans) {
            const { data, error } = await supabase
                .from('orphans')
                .insert(orphan)
                .select()

            if (error) {
                console.error('❌ Yetim oluşturma hatası:', error.message)
            } else {
                console.log(`✅ Yetim oluşturuldu: ${data[0].orphan_number} - ${orphan.first_name} ${orphan.last_name}`)
            }
        }

        // 4. Test sponsorları oluştur
        console.log('💰 Test sponsorları oluşturuluyor...')

        const testSponsors = [
            {
                full_name: 'Ahmet Yılmaz',
                email: 'ahmet@example.com',
                phone: '+90 532 123 4567',
                whatsapp_number: '+90 532 123 4567',
                address: 'İstanbul, Türkiye',
                registration_date: '2024-01-15',
                sponsorship_start_date: '2024-02-01'
            },
            {
                full_name: 'Fatma Demir',
                email: 'fatma@example.com',
                phone: '+90 533 987 6543',
                whatsapp_number: '+90 533 987 6543',
                address: 'Ankara, Türkiye',
                registration_date: '2024-02-10',
                sponsorship_start_date: '2024-03-01'
            }
        ]

        for (const sponsor of testSponsors) {
            const { data, error } = await supabase
                .from('sponsors')
                .insert(sponsor)
                .select()

            if (error) {
                console.error('❌ Sponsor oluşturma hatası:', error.message)
            } else {
                console.log(`✅ Sponsor oluşturuldu: ${data[0].sponsor_number} - ${sponsor.full_name}`)
            }
        }

        console.log('🎉 Test verisi başarıyla oluşturuldu!')
        console.log('\n📋 Giriş Bilgileri:')
        console.log('Admin: admin@hayirkurumu.org / admin123')
        console.log('Muhasebe: muhasebe@hayirkurumu.org / muhasebe123')
        console.log('Personel: personel@hayirkurumu.org / personel123')

    } catch (error) {
        console.error('❌ Genel hata:', error.message)
    }
}

// Script çalıştır
if (require.main === module) {
    seedDatabase()
}

module.exports = { seedDatabase }