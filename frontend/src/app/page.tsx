import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Hayır Kurumu Yönetim Sistemi
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Yetim, sponsor, proje ve depo takibi için kapsamlı yönetim platformu
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                👥 Yetim & Aile Yönetimi
                            </CardTitle>
                            <CardDescription>
                                Yetim kayıtları, aile bilgileri ve sponsor eşleştirme
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Merkezi yetim kayıt sistemi</li>
                                <li>• Aile bilgileri yönetimi</li>
                                <li>• Sponsor eşleştirme</li>
                                <li>• Fotoğraf ve belge yönetimi</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                💰 Ödeme & Muhasebe
                            </CardTitle>
                            <CardDescription>
                                Sponsor ödemeleri, dekont takibi ve finansal raporlama
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Multi-currency ödeme takibi</li>
                                <li>• Dekont yönetimi</li>
                                <li>• Otomatik borç/alacak hesabı</li>
                                <li>• Finansal raporlar</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                🏗️ Proje Yönetimi
                            </CardTitle>
                            <CardDescription>
                                Proje takibi, etap yönetimi ve medya arşivi
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Proje etap takibi</li>
                                <li>• Fotoğraf/video arşivi</li>
                                <li>• Saha personeli mobil erişim</li>
                                <li>• İlerleme raporları</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                📦 Depo Yönetimi
                            </CardTitle>
                            <CardDescription>
                                Stok takibi, ayni yardım dağıtımı ve envanter
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Stok giriş/çıkış takibi</li>
                                <li>• Ayni yardım dağıtımı</li>
                                <li>• Son kullanma tarihi uyarıları</li>
                                <li>• Envanter raporları</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                📄 OCR & Belgeler
                            </CardTitle>
                            <CardDescription>
                                PDF okuma, teslim belgesi işleme ve tercüme
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Otomatik PDF okuma</li>
                                <li>• Teslim belgesi işleme</li>
                                <li>• Çoklu dil desteği</li>
                                <li>• Tercüme yönetimi</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                📱 WhatsApp & İletişim
                            </CardTitle>
                            <CardDescription>
                                Otomatik bildirimler, mesajlaşma ve hatırlatmalar
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• WhatsApp entegrasyonu</li>
                                <li>• Otomatik ödeme hatırlatmaları</li>
                                <li>• Sponsor-aile iletişimi</li>
                                <li>• Push bildirimleri</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                <div className="text-center">
                    <div className="space-x-4">
                        <Link href="/giris">
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                                Sisteme Giriş Yap
                            </Button>
                        </Link>
                        <Link href="/docs">
                            <Button variant="outline" size="lg">
                                Dokümantasyon
                            </Button>
                        </Link>
                    </div>
                    <p className="text-sm text-gray-500 mt-4">
                        Güvenli, ölçeklenebilir ve kullanıcı dostu hayır kurumu yönetimi
                    </p>
                </div>
            </div>
        </div>
    )
}