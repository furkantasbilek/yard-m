import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">❤️</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Yardım Platformu</h1>
                            <p className="text-sm text-gray-600">Hayır Kurumu Yönetim Sistemi</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link href="/giris">
                            <Button variant="outline">Giriş Yap</Button>
                        </Link>
                        <Link href="/demo">
                            <Button className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700">
                                Demo İzle
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-16">
                {/* Hero Section */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <span>🌟</span>
                        <span>Güvenilir • Şeffaf • Etkili</span>
                    </div>
                    <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        Hayır İşlerinizi
                        <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent"> Dijitalleştirin</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        Yetim takibinden sponsor yönetimine, proje koordinasyonundan depo organizasyonuna kadar
                        tüm hayır işlerinizi tek platformda yönetin. Şeffaflık ve güven ile.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/giris">
                            <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 px-8 py-3 text-lg">
                                Hemen Başlayın
                            </Button>
                        </Link>
                        <Link href="/demo">
                            <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                                Canlı Demo
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white/70 backdrop-blur-sm">
                        <CardHeader>
                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-white text-2xl">👥</span>
                            </div>
                            <CardTitle className="text-xl">Yetim & Aile Yönetimi</CardTitle>
                            <CardDescription>
                                Yetim kayıtları, aile bilgileri ve sponsor eşleştirme sistemi
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="text-sm text-gray-600 space-y-2">
                                <li className="flex items-center space-x-2">
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                                    <span>Merkezi yetim kayıt sistemi</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                                    <span>Aile bilgileri yönetimi</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                                    <span>Otomatik sponsor eşleştirme</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                                    <span>Fotoğraf ve belge yönetimi</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white/70 backdrop-blur-sm">
                        <CardHeader>
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-white text-2xl">💰</span>
                            </div>
                            <CardTitle className="text-xl">Ödeme & Muhasebe</CardTitle>
                            <CardDescription>
                                Sponsor ödemeleri, dekont takibi ve finansal raporlama
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="text-sm text-gray-600 space-y-2">
                                <li className="flex items-center space-x-2">
                                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                    <span>Multi-currency ödeme takibi</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                    <span>Dekont yönetimi ve OCR</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                    <span>Otomatik borç/alacak hesabı</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                    <span>Detaylı finansal raporlar</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white/70 backdrop-blur-sm">
                        <CardHeader>
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-white text-2xl">🏗️</span>
                            </div>
                            <CardTitle className="text-xl">Proje Yönetimi</CardTitle>
                            <CardDescription>
                                Proje takibi, etap yönetimi ve medya arşivi
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="text-sm text-gray-600 space-y-2">
                                <li className="flex items-center space-x-2">
                                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                                    <span>Proje etap takibi</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                                    <span>Fotoğraf/video arşivi</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                                    <span>Saha personeli mobil erişim</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                                    <span>İlerleme raporları</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white/70 backdrop-blur-sm">
                        <CardHeader>
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-white text-2xl">📦</span>
                            </div>
                            <CardTitle className="text-xl">Depo Yönetimi</CardTitle>
                            <CardDescription>
                                Stok takibi, ayni yardım dağıtımı ve envanter
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="text-sm text-gray-600 space-y-2">
                                <li className="flex items-center space-x-2">
                                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                                    <span>Stok giriş/çıkış takibi</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                                    <span>Ayni yardım dağıtımı</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                                    <span>Son kullanma tarihi uyarıları</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                                    <span>Envanter raporları</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white/70 backdrop-blur-sm">
                        <CardHeader>
                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-white text-2xl">📄</span>
                            </div>
                            <CardTitle className="text-xl">OCR & Belgeler</CardTitle>
                            <CardDescription>
                                PDF okuma, teslim belgesi işleme ve tercüme
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="text-sm text-gray-600 space-y-2">
                                <li className="flex items-center space-x-2">
                                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                                    <span>Otomatik PDF okuma</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                                    <span>Teslim belgesi işleme</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                                    <span>Çoklu dil desteği</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                                    <span>AI destekli tercüme</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white/70 backdrop-blur-sm">
                        <CardHeader>
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-white text-2xl">📱</span>
                            </div>
                            <CardTitle className="text-xl">WhatsApp & İletişim</CardTitle>
                            <CardDescription>
                                Otomatik bildirimler, mesajlaşma ve hatırlatmalar
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="text-sm text-gray-600 space-y-2">
                                <li className="flex items-center space-x-2">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                    <span>WhatsApp Business entegrasyonu</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                    <span>Otomatik ödeme hatırlatmaları</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                    <span>Sponsor-aile iletişimi</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                    <span>Push bildirimleri</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                {/* CTA Section */}
                <div className="text-center bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl p-12 text-white">
                    <h2 className="text-3xl font-bold mb-4">Hayır İşlerinizi Daha Etkili Yönetin</h2>
                    <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                        Binlerce hayır kurumu tarafından güvenilen platformumuzla
                        yardım süreçlerinizi dijitalleştirin ve etkilerinizi artırın.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/giris">
                            <Button size="lg" variant="secondary" className="px-8 py-3 text-lg bg-white text-emerald-600 hover:bg-gray-100">
                                Ücretsiz Deneyin
                            </Button>
                        </Link>
                        <Link href="/iletisim">
                            <Button size="lg" variant="outline" className="px-8 py-3 text-lg border-white text-white hover:bg-white/10">
                                İletişime Geçin
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold">❤️</span>
                                </div>
                                <span className="text-xl font-bold">Yardım Platformu</span>
                            </div>
                            <p className="text-gray-400 text-sm">
                                Hayır kurumları için güvenilir, şeffaf ve etkili yönetim çözümleri.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Özellikler</h3>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li>Yetim Yönetimi</li>
                                <li>Sponsor Takibi</li>
                                <li>Proje Yönetimi</li>
                                <li>Depo Sistemi</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Destek</h3>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li>Dokümantasyon</li>
                                <li>Eğitim Videoları</li>
                                <li>Canlı Destek</li>
                                <li>SSS</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">İletişim</h3>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li>info@yardimplatformu.org</li>
                                <li>+90 (212) 123 45 67</li>
                                <li>İstanbul, Türkiye</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
                        <p>&copy; 2024 Yardım Platformu. Tüm hakları saklıdır.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}