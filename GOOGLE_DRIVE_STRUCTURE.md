# 📁 GOOGLE DRIVE KLASÖR YAPISI

Bu dokümanda proje için Google Drive'da oluşturulması gereken klasör yapısı ve içerikleri detaylı olarak açıklanmaktadır.

## 🗂️ ANA KLASÖR YAPISI

```
📁 Hayır Kurumu Yönetim Sistemi/
├── 📁 01-Proje Yönetimi/
├── 📁 02-Tasarım ve Brand/
├── 📁 03-Teknik Dokümantasyon/
├── 📁 04-API Keys ve Konfigürasyon/
├── 📁 05-Test Verileri/
├── 📁 06-Medya Arşivi/
├── 📁 07-Deployment/
├── 📁 08-Backup/
├── 📁 09-Eğitim Materyalleri/
└── 📁 10-Yasal ve Uyumluluk/
```

---

## 📋 DETAYLI KLASÖR İÇERİKLERİ

### 📁 01-Proje Yönetimi/
```
01-Proje Yönetimi/
├── 📄 Proje Özeti.docx
├── 📄 Gereksinim Analizi.docx
├── 📄 Proje Planı.xlsx
├── 📄 Haftalık İlerleme Raporları.xlsx
├── 📄 Bütçe ve Maliyet Analizi.xlsx
├── 📄 Risk Analizi.docx
├── 📄 Paydaş Listesi.xlsx
├── 📄 Toplantı Notları.docx
├── 📄 Değişiklik Talepleri.xlsx
└── 📄 Proje Teslim Belgesi.docx
```

**İçerik Örnekleri:**
- Proje kapsamı ve hedefleri
- Zaman çizelgesi (12 haftalık plan)
- Kaynak planlaması
- Milestone'lar ve deliverable'lar

### 📁 02-Tasarım ve Brand/
```
02-Tasarım ve Brand/
├── 📁 Logolar/
│   ├── 🖼️ logo-horizontal.svg
│   ├── 🖼️ logo-vertical.svg
│   ├── 🖼️ logo-icon.svg
│   ├── 🖼️ logo-white.png
│   ├── 🖼️ logo-black.png
│   └── 🖼️ logo-variations.ai
├── 📁 Renk Paleti/
│   ├── 🎨 color-palette.png
│   ├── 📄 color-codes.txt
│   └── 🎨 color-swatches.ase
├── 📁 Fontlar/
│   ├── 📄 font-list.txt
│   ├── 🔤 Inter-VariableFont.ttf
│   └── 🔤 NotoSansArabic-VariableFont.ttf
├── 📁 İkonlar/
│   ├── 🖼️ favicon.ico
│   ├── 🖼️ apple-touch-icon.png
│   ├── 🖼️ android-chrome-192x192.png
│   └── 📁 ui-icons/
├── 📁 Mockuplar/
│   ├── 🖼️ dashboard-desktop.png
│   ├── 🖼️ dashboard-mobile.png
│   ├── 🖼️ login-page.png
│   ├── 🖼️ orphan-profile.png
│   └── 🖼️ sponsor-portal.png
├── 📁 UI Bileşenleri/
│   ├── 🖼️ buttons.png
│   ├── 🖼️ forms.png
│   ├── 🖼️ cards.png
│   └── 🖼️ navigation.png
└── 📄 Brand Guidelines.pdf
```

### 📁 03-Teknik Dokümantasyon/
```
03-Teknik Dokümantasyon/
├── 📄 Sistem Mimarisi.pdf
├── 📄 Database Şeması.pdf
├── 📄 API Dokümantasyonu.pdf
├── 📄 Güvenlik Politikaları.pdf
├── 📄 Deployment Rehberi.pdf
├── 📄 Kullanıcı Kılavuzu.pdf
├── 📄 Admin Paneli Rehberi.pdf
├── 📄 Troubleshooting Guide.pdf
├── 📄 Performance Optimization.pdf
└── 📄 Backup ve Recovery Plan.pdf
```

### 📁 04-API Keys ve Konfigürasyon/
```
04-API Keys ve Konfigürasyon/
├── 📄 .env.production (ŞİFRELİ!)
├── 📄 .env.staging (ŞİFRELİ!)
├── 📄 api-keys-list.txt (ŞİFRELİ!)
├── 📄 service-account.json (ŞİFRELİ!)
├── 📄 whatsapp-config.json
├── 📄 firebase-config.json
├── 📄 supabase-config.txt
├── 📄 domain-dns-settings.txt
└── 📄 ssl-certificates.txt
```

**⚠️ GÜVENLİK UYARISI:**
- Bu klasör şifrelenmiş olmalı
- Sadece yetkili kişiler erişebilmeli
- Düzenli olarak yedeklenmeli

### 📁 05-Test Verileri/
```
05-Test Verileri/
├── 📁 Excel Dosyaları/
│   ├── 📊 yetimler-test-data.xlsx
│   ├── 📊 sponsorlar-test-data.xlsx
│   ├── 📊 odemeler-test-data.xlsx
│   ├── 📊 projeler-test-data.xlsx
│   └── 📊 stok-test-data.xlsx
├── 📁 Örnek Belgeler/
│   ├── 📄 teslim-belgesi-ornek.pdf
│   ├── 📄 kimlik-belgesi-ornek.pdf
│   ├── 📄 okul-belgesi-ornek.pdf
│   └── 📄 saglik-raporu-ornek.pdf
├── 📁 Örnek Fotoğraflar/
│   ├── 🖼️ yetim-foto-1.jpg
│   ├── 🖼️ yetim-foto-2.jpg
│   ├── 🖼️ proje-foto-1.jpg
│   └── 🖼️ proje-foto-2.jpg
└── 📄 test-scenarios.xlsx
```

### 📁 06-Medya Arşivi/
```
06-Medya Arşivi/
├── 📁 Stok Fotoğraflar/
│   ├── 📁 Çocuklar/
│   ├── 📁 Aileler/
│   ├── 📁 Projeler/
│   └── 📁 Yardım Faaliyetleri/
├── 📁 İllüstrasyonlar/
│   ├── 🖼️ dashboard-illustration.svg
│   ├── 🖼️ empty-state.svg
│   └── 🖼️ error-page.svg
├── 📁 Videolar/
│   ├── 🎥 promo-video.mp4
│   └── 🎥 tutorial-video.mp4
└── 📄 medya-lisans-bilgileri.txt
```

### 📁 07-Deployment/
```
07-Deployment/
├── 📄 deployment-checklist.md
├── 📄 server-requirements.txt
├── 📄 domain-setup.txt
├── 📄 ssl-setup.txt
├── 📄 cdn-configuration.txt
├── 📄 monitoring-setup.txt
├── 📄 backup-configuration.txt
├── 📄 performance-optimization.txt
└── 📄 security-hardening.txt
```

### 📁 08-Backup/
```
08-Backup/
├── 📁 Database Backups/
│   ├── 📄 backup-2024-01-01.sql
│   ├── 📄 backup-2024-01-02.sql
│   └── 📄 backup-schedule.txt
├── 📁 Code Backups/
│   ├── 📦 hayir-kurumu-v1.0.zip
│   ├── 📦 hayir-kurumu-v1.1.zip
│   └── 📄 version-history.txt
├── 📁 Media Backups/
│   ├── 📦 orphan-photos-backup.zip
│   └── 📦 documents-backup.zip
└── 📄 backup-restore-guide.pdf
```

### 📁 09-Eğitim Materyalleri/
```
09-Eğitim Materyalleri/
├── 📁 Kullanıcı Eğitimleri/
│   ├── 📄 Admin Eğitimi.pdf
│   ├── 📄 Personel Eğitimi.pdf
│   ├── 📄 Muhasebe Eğitimi.pdf
│   └── 📄 Sponsor Portal Eğitimi.pdf
├── 📁 Video Eğitimler/
│   ├── 🎥 sistem-giris.mp4
│   ├── 🎥 yetim-ekleme.mp4
│   ├── 🎥 odeme-kaydi.mp4
│   └── 🎥 rapor-olusturma.mp4
├── 📁 Ekran Görüntüleri/
│   ├── 🖼️ step-by-step-screenshots/
│   └── 🖼️ feature-highlights/
└── 📄 SSS-Frequently-Asked-Questions.pdf
```

### 📁 10-Yasal ve Uyumluluk/
```
10-Yasal ve Uyumluluk/
├── 📄 KVKK-Uyumluluk.pdf
├── 📄 Gizlilik-Politikasi.pdf
├── 📄 Kullanim-Kosullari.pdf
├── 📄 Cerez-Politikasi.pdf
├── 📄 Veri-Isleme-Sozlesmesi.pdf
├── 📄 API-Kullanim-Sozlesmeleri.pdf
├── 📄 Lisans-Belgeleri.pdf
└── 📄 Audit-Raporlari.pdf
```

---

## 🔐 ERİŞİM YETKİLERİ

### Klasör Yetkilendirme Matrisi

| Klasör | Proje Yöneticisi | Geliştirici | Tasarımcı | Müşteri |
|--------|------------------|-------------|-----------|---------|
| 01-Proje Yönetimi | ✅ Düzenle | 👁️ Görüntüle | 👁️ Görüntüle | 👁️ Görüntüle |
| 02-Tasarım ve Brand | 👁️ Görüntüle | 👁️ Görüntüle | ✅ Düzenle | ✅ Onay |
| 03-Teknik Dokümantasyon | ✅ Düzenle | ✅ Düzenle | 👁️ Görüntüle | 👁️ Görüntüle |
| 04-API Keys | ✅ Düzenle | 👁️ Görüntüle | ❌ Erişim Yok | ❌ Erişim Yok |
| 05-Test Verileri | ✅ Düzenle | ✅ Düzenle | 👁️ Görüntüle | 👁️ Görüntüle |
| 06-Medya Arşivi | 👁️ Görüntüle | 👁️ Görüntüle | ✅ Düzenle | 👁️ Görüntüle |
| 07-Deployment | ✅ Düzenle | ✅ Düzenle | ❌ Erişim Yok | ❌ Erişim Yok |
| 08-Backup | ✅ Düzenle | 👁️ Görüntüle | ❌ Erişim Yok | ❌ Erişim Yok |
| 09-Eğitim Materyalleri | ✅ Düzenle | 👁️ Görüntüle | 👁️ Görüntüle | ✅ Düzenle |
| 10-Yasal ve Uyumluluk | ✅ Düzenle | 👁️ Görüntüle | ❌ Erişim Yok | ✅ Onay |

---

## 📋 DOSYA ADLANDIRMA KURALLARI

### Genel Kurallar
```
✅ Doğru:
- proje-ozeti-v1.2.docx
- logo-horizontal-final.svg
- database-schema-2024-01.pdf

❌ Yanlış:
- Proje Özeti (1).docx
- logo final son.svg
- db şema.pdf
```

### Versiyon Kontrolü
```
Format: dosya-adi-v[major].[minor].uzanti
Örnek: 
- api-dokumantasyonu-v1.0.pdf (İlk versiyon)
- api-dokumantasyonu-v1.1.pdf (Küçük güncelleme)
- api-dokumantasyonu-v2.0.pdf (Büyük değişiklik)
```

### Tarih Formatı
```
Format: YYYY-MM-DD
Örnek:
- backup-2024-01-15.sql
- meeting-notes-2024-01-15.docx
- progress-report-2024-01.xlsx
```

---

## 🔄 SENKRONIZASYON VE BACKUP

### Otomatik Senkronizasyon
```bash
# Google Drive Desktop uygulaması ile
# Seçili klasörleri local'e senkronize et
Önerilen klasörler:
- 02-Tasarım ve Brand
- 03-Teknik Dokümantasyon  
- 05-Test Verileri
```

### Manuel Backup
```
Haftalık: Kritik dosyaların yerel kopyası
Aylık: Tüm klasörün zip arşivi
Proje bitimi: Tam arşiv + CD/DVD backup
```

---

## 📊 DOSYA BOYUT YÖNETİMİ

### Boyut Limitleri
```
📄 Dokümantasyon: Max 50MB
🖼️ Görseller: Max 10MB (optimize edilmiş)
🎥 Videolar: Max 500MB (sıkıştırılmış)
📦 Arşivler: Max 2GB
```

### Optimizasyon Önerileri
```
PDF: Sıkıştırma %75
Görseller: WebP format, %80 kalite
Videolar: H.264, 1080p max
Excel: Gereksiz formatları temizle
```

---

## ✅ GOOGLE DRIVE SETUP KONTROL LİSTESİ

### Hesap Hazırlığı
- [ ] Google Drive hesabı oluşturuldu
- [ ] Yeterli depolama alanı var (min 100GB önerilir)
- [ ] 2FA aktifleştirildi
- [ ] Backup hesabı oluşturuldu

### Klasör Yapısı
- [ ] Ana klasör oluşturuldu
- [ ] Alt klasörler oluşturuldu
- [ ] Erişim yetkileri ayarlandı
- [ ] Paylaşım linkleri oluşturuldu

### Güvenlik
- [ ] Hassas klasörler şifrelendi
- [ ] Erişim logları aktifleştirildi
- [ ] Düzenli backup planı oluşturuldu
- [ ] Veri kurtarma planı hazırlandı

---

## 📞 GOOGLE DRIVE DESTEĞİ

### Yararlı Linkler
- [Google Drive Help](https://support.google.com/drive)
- [Google Workspace Admin](https://admin.google.com)
- [Drive API Documentation](https://developers.google.com/drive)

### İpuçları
- Offline erişim için Google Drive Desktop kullanın
- Büyük dosyalar için Google Drive Stream tercih edin
- Versiyon geçmişi için "Version history" özelliğini kullanın
- Otomatik backup için Google Takeout'u ayarlayın

**Google Drive yapısı hazır olduğunda, tüm proje dosyalarını organize edebiliriz!**