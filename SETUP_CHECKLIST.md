# 🚀 HAYIR KURUMU YÖNETİM SİSTEMİ - HAZIRLIK LİSTESİ

Bu dokümanda projeyi başlatmak için gerekli tüm hesaplar, API'ler ve hazırlıklar listelenmiştir.

## 📋 GENEL HAZIRLIK LİSTESİ

### ✅ 1. HESAP AÇILMASI GEREKENLER

#### 🔐 Temel Hesaplar
- [ ] **GitHub Hesabı** (Yeni repo için)
  - Repo adı: `hayir-kurumu-yonetim`
  - Private/Public: Private (başlangıçta)
  - Organization altında mı yoksa kişisel mi?

- [ ] **Supabase Hesabı** 
  - URL: https://supabase.com
  - Plan: Free (başlangıç), sonra Pro ($25/ay)
  - Proje adı: `hayir-kurumu-yonetim`

- [ ] **Vercel Hesabı** (Frontend hosting)
  - URL: https://vercel.com
  - GitHub ile bağlantılı
  - Plan: Hobby (ücretsiz), sonra Pro ($20/ay)

#### 📱 WhatsApp Business API
- [ ] **Meta Business Hesabı**
  - URL: https://business.facebook.com
  - WhatsApp Business API erişimi
  - Phone Number ID gerekli
  - **VEYA**
- [ ] **Twilio Hesabı** (Alternatif)
  - URL: https://console.twilio.com
  - WhatsApp Sandbox erişimi
  - Account SID ve Auth Token

#### 🤖 AI/OCR Servisleri
- [ ] **Google Cloud Platform**
  - Vision API (OCR için)
  - Service Account JSON key
  - Aylık $300 ücretsiz kredi

- [ ] **OpenAI Hesabı**
  - API Key (tercüme için)
  - GPT-4 erişimi önerilir
  - Pay-as-you-go plan

#### 📧 Email Servisleri
- [ ] **Gmail/Google Workspace**
  - Kurumsal email adresleri:
    - `admin@hayirkurumu.org`
    - `info@hayirkurumu.org`
    - `destek@hayirkurumu.org`

#### 🔔 Push Notification
- [ ] **Firebase Hesabı**
  - Cloud Messaging için
  - Web push notifications
  - Service Worker key

#### 📊 Monitoring (Opsiyonel)
- [ ] **Sentry Hesabı** (Error tracking)
- [ ] **LogRocket Hesabı** (User session recording)
- [ ] **UptimeRobot** (Uptime monitoring)

### 🔑 2. API KEYS VE TOKENS

#### Supabase
```env
NEXT_PUBLIC_SUPABASE_URL=https://[project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon-key]
SUPABASE_SERVICE_ROLE_KEY=[service-role-key]
SUPABASE_JWT_SECRET=[jwt-secret]
```

#### WhatsApp (Meta Business)
```env
WHATSAPP_ACCESS_TOKEN=[access-token]
WHATSAPP_PHONE_NUMBER_ID=[phone-number-id]
WHATSAPP_WEBHOOK_VERIFY_TOKEN=[custom-verify-token]
WHATSAPP_BUSINESS_ACCOUNT_ID=[business-account-id]
```

#### WhatsApp (Twilio - Alternatif)
```env
TWILIO_ACCOUNT_SID=[account-sid]
TWILIO_AUTH_TOKEN=[auth-token]
TWILIO_WHATSAPP_NUMBER=[whatsapp-number]
```

#### Google Cloud Vision
```env
GOOGLE_CLOUD_PROJECT_ID=[project-id]
GOOGLE_CLOUD_PRIVATE_KEY=[private-key]
GOOGLE_CLOUD_CLIENT_EMAIL=[client-email]
# VEYA
GOOGLE_APPLICATION_CREDENTIALS=[path-to-service-account.json]
```

#### OpenAI
```env
OPENAI_API_KEY=[api-key]
OPENAI_ORGANIZATION=[org-id] # Opsiyonel
```

#### Firebase
```env
FIREBASE_SERVER_KEY=[server-key]
FIREBASE_SENDER_ID=[sender-id]
FIREBASE_PROJECT_ID=[project-id]
```

### 📁 3. GOOGLE DRIVE YAPILANDIRMASI

#### Klasör Yapısı
```
📁 Hayır Kurumu Yönetim Sistemi/
├── 📁 01-Proje Dokümantasyonu/
│   ├── 📄 Proje Gereksinimleri.docx
│   ├── 📄 Database Şeması.pdf
│   └── 📄 API Dokümantasyonu.pdf
├── 📁 02-Tasarım Dosyaları/
│   ├── 📁 Logolar/
│   ├── 📁 Renkler ve Fontlar/
│   ├── 📁 UI Mockuplar/
│   └── 📁 İkonlar/
├── 📁 03-Test Verileri/
│   ├── 📄 yetimler.xlsx
│   ├── 📄 sponsorlar.xlsx
│   ├── 📄 odemeler.xlsx
│   └── 📁 Örnek Belgeler/
├── 📁 04-API Keys ve Konfigürasyon/
│   ├── 📄 .env.production
│   ├── 📄 service-account.json
│   └── 📄 api-keys.txt
├── 📁 05-Deployment/
│   ├── 📄 deployment-checklist.md
│   └── 📄 server-configs.txt
└── 📁 06-Backup/
    ├── 📁 Database Backups/
    └── 📁 Code Backups/
```

### 🎨 4. TASARIM VE BRANDING BİLGİLERİ

#### Logo Gereksinimleri
- [ ] **Ana Logo** (SVG, PNG - 512x512px)
- [ ] **Favicon** (ICO, PNG - 32x32px)
- [ ] **Mobil Icon** (PNG - 192x192px, 512x512px)
- [ ] **Email Signature Logo** (PNG - 200x60px)

#### Renk Paleti
```css
/* Lütfen tercih ettiğiniz renkleri belirtin */
:root {
  --primary: #2563eb;      /* Ana mavi */
  --secondary: #10b981;    /* Yeşil */
  --accent: #f59e0b;       /* Turuncu */
  --danger: #ef4444;       /* Kırmızı */
  --success: #22c55e;      /* Başarı yeşili */
  --warning: #f59e0b;      /* Uyarı turuncu */
  --gray-50: #f9fafb;      /* Açık gri */
  --gray-900: #111827;     /* Koyu gri */
}
```

#### Font Tercihleri
- [ ] **Ana Font**: (Örn: Inter, Roboto, Open Sans)
- [ ] **Başlık Font**: (Örn: Poppins, Montserrat)
- [ ] **Arapça Font**: (Örn: Noto Sans Arabic, Amiri)

#### UI/UX Tercihleri
- [ ] **Tasarım Stili**: Modern/Minimal/Corporate
- [ ] **Sidebar**: Sol/Sağ/Üst
- [ ] **Tema**: Light/Dark/Auto
- [ ] **Animasyonlar**: Minimal/Orta/Zengin

### 🌐 5. DOMAIN VE HOSTING

#### Domain
- [ ] **Ana Domain**: (Örn: hayirkurumu.org)
- [ ] **Alt Domainler**:
  - `app.hayirkurumu.org` (Ana uygulama)
  - `api.hayirkurumu.org` (API endpoint)
  - `docs.hayirkurumu.org` (Dokümantasyon)

#### SSL Sertifikası
- [ ] Let's Encrypt (Ücretsiz)
- [ ] Cloudflare SSL

### 📧 6. EMAIL YAPILANDIRMASI

#### SMTP Ayarları
- [ ] **Google Workspace** (Önerilen)
- [ ] **SendGrid** (Transactional emails)
- [ ] **Mailgun** (Alternatif)

#### Email Şablonları
- [ ] Hoş geldin emaili
- [ ] Şifre sıfırlama
- [ ] Ödeme hatırlatması
- [ ] Yetim durumu güncelleme

### 🔒 7. GÜVENLİK AYARLARI

#### 2FA Ayarları
- [ ] GitHub 2FA
- [ ] Supabase 2FA
- [ ] Google Cloud 2FA
- [ ] Vercel 2FA

#### Backup Stratejisi
- [ ] Database günlük backup
- [ ] Code repository backup
- [ ] Media files backup (Supabase Storage)

### 📱 8. WHATSAPP BUSINESS SETUP

#### Meta Business Manager
1. Business Manager hesabı oluştur
2. WhatsApp Business Account ekle
3. Phone number verify et
4. Webhook URL'i ayarla: `https://your-domain.com/api/webhooks/whatsapp`
5. Message templates oluştur:
   - Ödeme hatırlatması
   - Hoş geldin mesajı
   - Yetim durumu güncelleme

#### Template Örnekleri
```
Template 1: payment_reminder
Merhaba {{1}}, {{2}} numaralı yetim için {{3}} tarihli ödemeniz beklenmektedir. Teşekkürler.

Template 2: orphan_update
Sayın {{1}}, {{2}} numaralı yetim hakkında güncelleme: {{3}}

Template 3: welcome_message
Hayır Kurumu'na hoş geldiniz {{1}}! Hesabınız başarıyla oluşturuldu.
```

### 🔧 9. DEVELOPMENT TOOLS

#### Gerekli Yazılımlar
- [ ] **Node.js** (v18+)
- [ ] **Git**
- [ ] **VS Code** + Extensions:
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - Prettier
  - ESLint
  - GitLens

#### Package Managers
- [ ] **npm** (varsayılan)
- [ ] **yarn** (alternatif)
- [ ] **pnpm** (hızlı alternatif)

### 📊 10. ANALYTICS VE MONITORING

#### Web Analytics
- [ ] **Google Analytics 4**
- [ ] **Vercel Analytics** (built-in)

#### Error Tracking
- [ ] **Sentry** (önerilen)
- [ ] **LogRocket** (user sessions)

#### Performance Monitoring
- [ ] **Vercel Speed Insights**
- [ ] **Google PageSpeed Insights**

### 🚀 11. CI/CD PIPELINE

#### GitHub Actions
- [ ] Otomatik test çalıştırma
- [ ] Otomatik deployment (Vercel)
- [ ] Database migration
- [ ] Security scanning

#### Deployment Environments
- [ ] **Development**: Local
- [ ] **Staging**: Vercel preview
- [ ] **Production**: Vercel production

### 📋 12. PROJE YÖNETİMİ

#### Project Management Tools
- [ ] **GitHub Projects** (ücretsiz)
- [ ] **Trello** (alternatif)
- [ ] **Notion** (dokümantasyon)

#### Communication
- [ ] **Slack** workspace
- [ ] **Discord** server
- [ ] **WhatsApp** grup

---

## 🎯 ÖNCELİK SIRASI

### 🔥 Yüksek Öncelik (Hemen)
1. GitHub repo oluştur
2. Supabase hesabı aç
3. Vercel hesabı aç
4. Google Drive klasör yapısı oluştur
5. Tasarım dosyalarını hazırla (logo, renkler)

### 🔶 Orta Öncelik (1 hafta içinde)
1. WhatsApp Business API setup
2. Google Cloud Vision API
3. OpenAI API key
4. Domain satın al
5. Email setup

### 🔵 Düşük Öncelik (Geliştirme sırasında)
1. Monitoring tools
2. Analytics setup
3. Advanced security features
4. Performance optimization tools

---

## 📞 DESTEK VE KAYNAKLAR

### Dokümantasyon Linkleri
- [Supabase Docs](https://supabase.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [WhatsApp Business API](https://developers.facebook.com/docs/whatsapp)
- [Google Cloud Vision](https://cloud.google.com/vision/docs)
- [Vercel Docs](https://vercel.com/docs)

### Community Support
- [Supabase Discord](https://discord.supabase.com)
- [Next.js Discord](https://nextjs.org/discord)
- [Tailwind CSS Discord](https://tailwindcss.com/discord)

---

## ✅ HAZIRLIK TAMAMLANDI MI?

Bu listedeki tüm öğeleri tamamladıktan sonra, geliştirme sürecine başlayabiliriz!

**Son kontrol:**
- [ ] Tüm hesaplar açıldı
- [ ] API keyler alındı ve güvenli yerde saklandı
- [ ] Google Drive yapısı hazırlandı
- [ ] Tasarım dosyaları hazırlandı
- [ ] GitHub repo oluşturuldu
- [ ] Domain ve email ayarlandı

🚀 **Hazırsanız, kodlamaya başlayalım!**