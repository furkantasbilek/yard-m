'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import Link from 'next/link'

interface DashboardStats {
    totalOrphans: number
    totalSponsors: number
    totalProjects: number
    totalPayments: number
    activeSponsors: number
    pendingPayments: number
}

export default function AdminDashboard() {
    const [user, setUser] = useState<any>(null)
    const [profile, setProfile] = useState<any>(null)
    const [stats, setStats] = useState<DashboardStats>({
        totalOrphans: 0,
        totalSponsors: 0,
        totalProjects: 0,
        totalPayments: 0,
        activeSponsors: 0,
        pendingPayments: 0
    })
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        checkUser()
        loadStats()
    }, [])

    const checkUser = async () => {
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            router.push('/giris')
            return
        }

        setUser(user)

        // Profil bilgilerini al
        const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()

        if (!profile || profile.role !== 'admin') {
            router.push('/giris')
            return
        }

        setProfile(profile)
        setLoading(false)
    }

    const loadStats = async () => {
        try {
            // Yetim sayısı
            const { count: orphanCount } = await supabase
                .from('orphans')
                .select('*', { count: 'exact', head: true })
                .eq('is_active', true)

            // Sponsor sayısı
            const { count: sponsorCount } = await supabase
                .from('sponsors')
                .select('*', { count: 'exact', head: true })
                .eq('is_active', true)

            // Proje sayısı
            const { count: projectCount } = await supabase
                .from('projects')
                .select('*', { count: 'exact', head: true })

            // Ödeme sayısı
            const { count: paymentCount } = await supabase
                .from('payments')
                .select('*', { count: 'exact', head: true })

            // Aktif sponsorluk sayısı
            const { count: activeSponsorshipCount } = await supabase
                .from('sponsorships')
                .select('*', { count: 'exact', head: true })
                .eq('status', 'active')

            setStats({
                totalOrphans: orphanCount || 0,
                totalSponsors: sponsorCount || 0,
                totalProjects: projectCount || 0,
                totalPayments: paymentCount || 0,
                activeSponsors: activeSponsorshipCount || 0,
                pendingPayments: 0
            })
        } catch (error) {
            console.error('İstatistikler yüklenirken hata:', error)
        }
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/')
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Yükleniyor...</p>
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
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">❤️</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">Admin Paneli</h1>
                                <p className="text-sm text-gray-600">Hayır Kurumu Yönetim Sistemi</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <p className="text-sm font-medium text-gray-900">{profile?.full_name}</p>
                                <p className="text-xs text-gray-600">{profile?.role}</p>
                            </div>
                            <Button variant="outline" onClick={handleLogout}>
                                Çıkış Yap
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Message */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Hoş geldiniz, {profile?.full_name}! 👋
                    </h2>
                    <p className="text-gray-600">
                        Sistem durumu ve genel istatistikleri aşağıda görüntüleyebilirsiniz.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Toplam Yetim</CardTitle>
                            <span className="text-2xl">👶</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-emerald-600">{stats.totalOrphans}</div>
                            <p className="text-xs text-gray-600">Aktif yetim sayısı</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Toplam Sponsor</CardTitle>
                            <span className="text-2xl">🤝</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">{stats.totalSponsors}</div>
                            <p className="text-xs text-gray-600">Kayıtlı sponsor sayısı</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Aktif Sponsorluk</CardTitle>
                            <span className="text-2xl">💝</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-purple-600">{stats.activeSponsors}</div>
                            <p className="text-xs text-gray-600">Devam eden sponsorluklar</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Toplam Proje</CardTitle>
                            <span className="text-2xl">🏗️</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-600">{stats.totalProjects}</div>
                            <p className="text-xs text-gray-600">Tüm projeler</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <span>👥</span>
                                <span>Yetim Yönetimi</span>
                            </CardTitle>
                            <CardDescription>
                                Yetim kayıtları, aile bilgileri ve eşleştirmeler
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Link href="/dashboard/admin/yetimler">
                                    <Button className="w-full" variant="outline">
                                        Yetim Listesi
                                    </Button>
                                </Link>
                                <Button className="w-full" variant="outline">
                                    Yeni Yetim Ekle
                                </Button>
                                <Button className="w-full" variant="outline">
                                    Aile Yönetimi
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <span>💰</span>
                                <span>Sponsor & Ödeme</span>
                            </CardTitle>
                            <CardDescription>
                                Sponsor yönetimi ve ödeme takibi
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Button className="w-full" variant="outline">
                                    Sponsor Listesi
                                </Button>
                                <Button className="w-full" variant="outline">
                                    Ödeme Kayıtları
                                </Button>
                                <Button className="w-full" variant="outline">
                                    Eşleştirmeler
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <span>🏗️</span>
                                <span>Proje Yönetimi</span>
                            </CardTitle>
                            <CardDescription>
                                Proje takibi ve etap yönetimi
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Button className="w-full" variant="outline">
                                    Proje Listesi
                                </Button>
                                <Button className="w-full" variant="outline">
                                    Yeni Proje
                                </Button>
                                <Button className="w-full" variant="outline">
                                    Etap Takibi
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}