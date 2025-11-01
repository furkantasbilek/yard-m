'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'

interface Orphan {
    id: string
    orphan_number: string
    first_name: string
    last_name: string
    birth_date: string
    education_level: string
    health_status: string
    is_sponsored: boolean
    is_active: boolean
    family: {
        family_number: string
        region: {
            name: string
            code: string
        }
    }
}

export default function OrphansListPage() {
    const [orphans, setOrphans] = useState<Orphan[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('all') // all, sponsored, unsponsored
    const [searchTerm, setSearchTerm] = useState('')
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        checkAuth()
        loadOrphans()
    }, [])

    const checkAuth = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            router.push('/giris')
            return
        }

        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single()

        if (!profile || !['admin', 'personel'].includes(profile.role)) {
            router.push('/giris')
            return
        }
    }

    const loadOrphans = async () => {
        try {
            const { data, error } = await supabase
                .from('orphans')
                .select(`
          id,
          orphan_number,
          first_name,
          last_name,
          birth_date,
          education_level,
          health_status,
          is_sponsored,
          is_active,
          families!inner (
            family_number,
            regions!inner (
              name,
              code
            )
          )
        `)
                .eq('is_active', true)
                .order('created_at', { ascending: false })

            if (error) {
                console.error('Yetimler yüklenirken hata:', error)
                return
            }

            // Veriyi düzenle
            const formattedOrphans = data?.map(orphan => ({
                ...orphan,
                family: {
                    family_number: orphan.families.family_number,
                    region: orphan.families.regions
                }
            })) || []

            setOrphans(formattedOrphans)
        } catch (error) {
            console.error('Yetimler yüklenirken hata:', error)
        } finally {
            setLoading(false)
        }
    }

    const filteredOrphans = orphans.filter(orphan => {
        // Sponsorluk filtresi
        if (filter === 'sponsored' && !orphan.is_sponsored) return false
        if (filter === 'unsponsored' && orphan.is_sponsored) return false

        // Arama filtresi
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase()
            return (
                orphan.first_name.toLowerCase().includes(searchLower) ||
                orphan.last_name.toLowerCase().includes(searchLower) ||
                orphan.orphan_number.toLowerCase().includes(searchLower) ||
                orphan.family.family_number.toLowerCase().includes(searchLower)
            )
        }

        return true
    })

    const calculateAge = (birthDate: string) => {
        const today = new Date()
        const birth = new Date(birthDate)
        let age = today.getFullYear() - birth.getFullYear()
        const monthDiff = today.getMonth() - birth.getMonth()
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--
        }
        return age
    }

    const getEducationLabel = (level: string) => {
        const labels: { [key: string]: string } = {
            'okul_oncesi': 'Okul Öncesi',
            'ilkokul': 'İlkokul',
            'ortaokul': 'Ortaokul',
            'lise': 'Lise',
            'universite': 'Üniversite',
            'mezun': 'Mezun',
            'okula_gitmiyor': 'Okula Gitmiyor'
        }
        return labels[level] || level
    }

    const getHealthLabel = (status: string) => {
        const labels: { [key: string]: string } = {
            'saglikli': 'Sağlıklı',
            'kronik_hastalik': 'Kronik Hastalık',
            'engelli': 'Engelli',
            'ozel_bakim': 'Özel Bakım'
        }
        return labels[status] || status
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Yetimler yükleniyor...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4">
                            <Link href="/dashboard/admin" className="text-gray-600 hover:text-gray-800">
                                ← Geri
                            </Link>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">Yetim Listesi</h1>
                                <p className="text-sm text-gray-600">Tüm yetim kayıtları</p>
                            </div>
                        </div>
                        <Button className="bg-emerald-600 hover:bg-emerald-700">
                            + Yeni Yetim Ekle
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Filters */}
                <div className="mb-6 flex flex-col sm:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Yetim adı, soyadı veya numarası ile ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex space-x-2">
                        <Button
                            variant={filter === 'all' ? 'default' : 'outline'}
                            onClick={() => setFilter('all')}
                            className="whitespace-nowrap"
                        >
                            Tümü ({orphans.length})
                        </Button>
                        <Button
                            variant={filter === 'sponsored' ? 'default' : 'outline'}
                            onClick={() => setFilter('sponsored')}
                            className="whitespace-nowrap"
                        >
                            Sponsorlu ({orphans.filter(o => o.is_sponsored).length})
                        </Button>
                        <Button
                            variant={filter === 'unsponsored' ? 'default' : 'outline'}
                            onClick={() => setFilter('unsponsored')}
                            className="whitespace-nowrap"
                        >
                            Sponsorsuz ({orphans.filter(o => !o.is_sponsored).length})
                        </Button>
                    </div>
                </div>

                {/* Orphans Grid */}
                {filteredOrphans.length === 0 ? (
                    <Card>
                        <CardContent className="text-center py-12">
                            <div className="text-6xl mb-4">👶</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                {searchTerm ? 'Arama sonucu bulunamadı' : 'Henüz yetim kaydı yok'}
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {searchTerm
                                    ? 'Farklı arama terimleri deneyebilirsiniz.'
                                    : 'İlk yetim kaydını oluşturmak için butona tıklayın.'
                                }
                            </p>
                            {!searchTerm && (
                                <Button className="bg-emerald-600 hover:bg-emerald-700">
                                    + İlk Yetimi Ekle
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredOrphans.map((orphan) => (
                            <Card key={orphan.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-lg">
                                                {orphan.first_name} {orphan.last_name}
                                            </CardTitle>
                                            <CardDescription>
                                                {orphan.orphan_number}
                                            </CardDescription>
                                        </div>
                                        <div className="flex flex-col items-end space-y-1">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${orphan.is_sponsored
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                }`}>
                                                {orphan.is_sponsored ? 'Sponsorlu' : 'Sponsorsuz'}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {orphan.family.region.name}
                                            </span>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Yaş:</span>
                                            <span className="font-medium">{calculateAge(orphan.birth_date)} yaşında</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Eğitim:</span>
                                            <span className="font-medium">{getEducationLabel(orphan.education_level)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Sağlık:</span>
                                            <span className="font-medium">{getHealthLabel(orphan.health_status)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Aile No:</span>
                                            <span className="font-medium">{orphan.family.family_number}</span>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex space-x-2">
                                        <Button variant="outline" size="sm" className="flex-1">
                                            Detaylar
                                        </Button>
                                        <Button variant="outline" size="sm" className="flex-1">
                                            Düzenle
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}