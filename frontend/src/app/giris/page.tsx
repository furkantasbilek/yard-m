'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()
    const supabase = createClient()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) {
                setError('Email veya şifre hatalı')
                return
            }

            if (data.user) {
                console.log('✅ Giriş başarılı, kullanıcı:', data.user.id)

                // Kullanıcı profilini kontrol et
                const { data: profile, error: profileError } = await supabase
                    .from('profiles')
                    .select('role, full_name')
                    .eq('id', data.user.id)
                    .single()

                console.log('📋 Profil sorgusu:', { profile, profileError })

                if (profile) {
                    console.log('✅ Profil bulundu:', profile)
                    // Herkesi admin dashboard'a yönlendir (geçici)
                    router.push('/dashboard/admin')
                } else {
                    console.error('❌ Profil bulunamadı:', profileError)
                    setError(`Profil hatası: ${profileError?.message || 'Bilinmeyen hata'}`)
                }
            }
        } catch (err) {
            setError('Giriş yapılırken bir hata oluştu')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo ve Başlık */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-2xl">❤️</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Yardım Platformu</h1>
                    <p className="text-gray-600">Hayır Kurumu Yönetim Sistemi</p>
                </div>

                {/* Giriş Formu */}
                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Sisteme Giriş</CardTitle>
                        <CardDescription>
                            Email adresiniz ve şifrenizle giriş yapın
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                                    Email Adresi
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                    placeholder="admin@hayirkurumu.org"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                                    Şifre
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 py-2.5"
                            >
                                {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Şifrenizi mi unuttunuz?{' '}
                                <Link href="/sifremi-unuttum" className="text-emerald-600 hover:text-emerald-700 font-medium">
                                    Şifre Sıfırla
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Test Bilgileri */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="text-sm font-medium text-blue-900 mb-2">Test Hesabı:</h3>
                    <p className="text-xs text-blue-700">
                        <strong>Email:</strong> admin@hayirkurumu.org<br />
                        <strong>Şifre:</strong> admin123456
                    </p>
                </div>

                {/* Ana Sayfaya Dön */}
                <div className="mt-6 text-center">
                    <Link href="/" className="text-sm text-gray-600 hover:text-gray-800">
                        ← Ana sayfaya dön
                    </Link>
                </div>
            </div>
        </div>
    )
}