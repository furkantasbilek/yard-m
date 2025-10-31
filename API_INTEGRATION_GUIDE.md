# 🔗 API ENTEGRASYON REHBERİ

Bu dokümanda projeye entegre edilecek tüm harici API'ler ve servisler detaylı olarak açıklanmaktadır.

## 📋 API'LER VE SERVİSLER ÖZET LİSTESİ

### 🔥 Kritik (Proje çalışması için gerekli)
1. **Supabase** - Database, Auth, Storage
2. **WhatsApp Business API** - Mesajlaşma
3. **Google Cloud Vision** - OCR (Belge okuma)

### 🔶 Önemli (Ana özellikler için)
4. **OpenAI API** - Tercüme ve AI işlemleri
5. **Firebase Cloud Messaging** - Push bildirimleri
6. **Vercel** - Hosting ve deployment

### 🔵 Opsiyonel (Gelişmiş özellikler)
7. **Sentry** - Error tracking
8. **SendGrid** - Email gönderimi
9. **Cloudinary** - Görsel optimizasyonu

---

## 1. 🗄️ SUPABASE SETUP

### Hesap Oluşturma
1. [supabase.com](https://supabase.com) adresine git
2. "Start your project" butonuna tıkla
3. GitHub ile giriş yap
4. "New Project" oluştur

### Proje Konfigürasyonu
```bash
# Proje bilgileri
Project Name: hayir-kurumu-yonetim
Organization: [Kendi organizasyonun]
Database Password: [Güçlü şifre - kaydet!]
Region: Europe West (eu-west-1)
Pricing Plan: Free (başlangıç)
```

### API Keys
```env
# Supabase Dashboard > Settings > API
NEXT_PUBLIC_SUPABASE_URL=https://[project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon-key]
SUPABASE_SERVICE_ROLE_KEY=[service-role-key]
```

### Database Setup
```bash
# Local development
npm install -g @supabase/cli
supabase login
supabase init
supabase start

# Production
supabase link --project-ref [your-project-ref]
supabase db push
```

### Storage Buckets
```sql
-- Supabase Dashboard > Storage > Create Bucket
INSERT INTO storage.buckets (id, name, public) VALUES 
('orphan-photos', 'orphan-photos', true),
('documents', 'documents', false),
('receipts', 'receipts', false),
('project-media', 'project-media', true);
```

---

## 2. 📱 WHATSAPP BUSINESS API

### Seçenek A: Meta Business (Önerilen)

#### Hesap Oluşturma
1. [business.facebook.com](https://business.facebook.com) adresine git
2. Business Manager hesabı oluştur
3. WhatsApp Business Account ekle
4. Telefon numarasını doğrula

#### API Setup
```bash
# Meta Developers Console
1. developers.facebook.com adresine git
2. "Create App" > "Business" seç
3. WhatsApp Business API'yi ekle
4. Webhook URL'i ayarla: https://your-domain.com/api/webhooks/whatsapp
```

#### Environment Variables
```env
# Meta WhatsApp API
WHATSAPP_ACCESS_TOKEN=[permanent-access-token]
WHATSAPP_PHONE_NUMBER_ID=[phone-number-id]
WHATSAPP_BUSINESS_ACCOUNT_ID=[business-account-id]
WHATSAPP_WEBHOOK_VERIFY_TOKEN=[custom-verify-token]
WHATSAPP_API_VERSION=v18.0
```

#### Message Templates
```javascript
// Template oluşturma - Meta Business Manager
const templates = [
  {
    name: "payment_reminder",
    category: "UTILITY",
    language: "tr",
    components: [
      {
        type: "BODY",
        text: "Merhaba {{1}}, {{2}} numaralı yetim için {{3}} tarihli ödemeniz beklenmektedir. Teşekkürler."
      }
    ]
  },
  {
    name: "orphan_update", 
    category: "UTILITY",
    language: "tr",
    components: [
      {
        type: "BODY",
        text: "Sayın {{1}}, {{2}} numaralı yetim hakkında güncelleme: {{3}}"
      }
    ]
  }
]
```

### Seçenek B: Twilio (Alternatif)

#### Hesap Oluşturma
1. [console.twilio.com](https://console.twilio.com) adresine git
2. Hesap oluştur ve doğrula
3. WhatsApp Sandbox'ı aktifleştir

#### Environment Variables
```env
# Twilio WhatsApp API
TWILIO_ACCOUNT_SID=[account-sid]
TWILIO_AUTH_TOKEN=[auth-token]
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
```

---

## 3. 👁️ GOOGLE CLOUD VISION API (OCR)

### Google Cloud Setup
1. [console.cloud.google.com](https://console.cloud.google.com) adresine git
2. Yeni proje oluştur: "hayir-kurumu-ocr"
3. Vision API'yi aktifleştir
4. Service Account oluştur

### Service Account
```bash
# IAM & Admin > Service Accounts
1. "Create Service Account" tıkla
2. Name: "hayir-kurumu-vision"
3. Role: "Cloud Vision API User"
4. JSON key indir ve güvenli yerde sakla
```

### Environment Variables
```env
# Google Cloud Vision
GOOGLE_CLOUD_PROJECT_ID=[project-id]
GOOGLE_APPLICATION_CREDENTIALS=[path-to-service-account.json]
# VEYA
GOOGLE_CLOUD_PRIVATE_KEY=[private-key]
GOOGLE_CLOUD_CLIENT_EMAIL=[client-email]
```

### API Usage Example
```javascript
// Supabase Edge Function
import { GoogleAuth } from 'google-auth-library'

const auth = new GoogleAuth({
  scopes: 'https://www.googleapis.com/auth/cloud-platform',
  credentials: {
    client_email: Deno.env.get('GOOGLE_CLOUD_CLIENT_EMAIL'),
    private_key: Deno.env.get('GOOGLE_CLOUD_PRIVATE_KEY')?.replace(/\\n/g, '\n'),
  },
})

const client = await auth.getClient()
const projectId = Deno.env.get('GOOGLE_CLOUD_PROJECT_ID')
const url = `https://vision.googleapis.com/v1/projects/${projectId}/images:annotate`
```

---

## 4. 🤖 OPENAI API (Tercüme)

### Hesap Oluşturma
1. [platform.openai.com](https://platform.openai.com) adresine git
2. Hesap oluştur ve doğrula
3. Billing bilgilerini ekle
4. API key oluştur

### Environment Variables
```env
# OpenAI API
OPENAI_API_KEY=[api-key]
OPENAI_ORGANIZATION=[org-id] # Opsiyonel
OPENAI_MODEL=gpt-3.5-turbo # veya gpt-4
```

### Usage Limits
```javascript
// Önerilen limitler
const OPENAI_LIMITS = {
  maxTokensPerRequest: 1000,
  maxRequestsPerMinute: 60,
  maxRequestsPerDay: 1000,
  estimatedMonthlyCost: 50 // USD
}
```

---

## 5. 🔔 FIREBASE CLOUD MESSAGING

### Firebase Setup
1. [console.firebase.google.com](https://console.firebase.google.com) adresine git
2. Yeni proje oluştur: "hayir-kurumu-notifications"
3. Web app ekle
4. Cloud Messaging'i aktifleştir

### Environment Variables
```env
# Firebase
FIREBASE_PROJECT_ID=[project-id]
FIREBASE_PRIVATE_KEY=[private-key]
FIREBASE_CLIENT_EMAIL=[client-email]
FIREBASE_SERVER_KEY=[server-key]
NEXT_PUBLIC_FIREBASE_VAPID_KEY=[vapid-key]
```

### Web Push Setup
```javascript
// public/sw.js - Service Worker
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js')

firebase.initializeApp({
  apiKey: "[api-key]",
  authDomain: "[project-id].firebaseapp.com",
  projectId: "[project-id]",
  storageBucket: "[project-id].appspot.com",
  messagingSenderId: "[sender-id]",
  appId: "[app-id]"
})

const messaging = firebase.messaging()
```

---

## 6. 🚀 VERCEL DEPLOYMENT

### Hesap Oluşturma
1. [vercel.com](https://vercel.com) adresine git
2. GitHub ile giriş yap
3. Repository'yi import et

### Environment Variables
```bash
# Vercel Dashboard > Settings > Environment Variables
# Tüm yukarıdaki environment variable'ları ekle
```

### Build Configuration
```json
// vercel.json
{
  "buildCommand": "cd frontend && npm run build",
  "outputDirectory": "frontend/.next",
  "framework": "nextjs",
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

---

## 7. 🐛 SENTRY ERROR TRACKING (Opsiyonel)

### Setup
1. [sentry.io](https://sentry.io) adresine git
2. Yeni proje oluştur: "hayir-kurumu-yonetim"
3. Next.js integration seç

### Environment Variables
```env
# Sentry
SENTRY_DSN=[dsn-url]
SENTRY_ORG=[org-slug]
SENTRY_PROJECT=[project-slug]
SENTRY_AUTH_TOKEN=[auth-token]
```

---

## 8. 📧 SENDGRID EMAIL (Opsiyonel)

### Setup
1. [sendgrid.com](https://sendgrid.com) adresine git
2. Hesap oluştur
3. API key oluştur
4. Domain doğrula

### Environment Variables
```env
# SendGrid
SENDGRID_API_KEY=[api-key]
SENDGRID_FROM_EMAIL=noreply@hayirkurumu.org
SENDGRID_FROM_NAME="Hayır Kurumu"
```

---

## 🔒 GÜVENLİK EN İYİ PRATİKLERİ

### API Key Güvenliği
```bash
# ❌ Yanlış - Kod içinde hardcode
const apiKey = "sk-1234567890abcdef"

# ✅ Doğru - Environment variable
const apiKey = process.env.OPENAI_API_KEY
```

### Rate Limiting
```javascript
// API rate limiting örneği
const rateLimiter = {
  whatsapp: { requests: 1000, per: 'day' },
  openai: { requests: 60, per: 'minute' },
  vision: { requests: 1000, per: 'month' }
}
```

### Error Handling
```javascript
// Robust error handling
try {
  const response = await fetch(apiUrl, options)
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`)
  }
  return await response.json()
} catch (error) {
  console.error('API call failed:', error)
  // Fallback mechanism
  return { error: 'Service temporarily unavailable' }
}
```

---

## 📊 MALIYET TAHMİNİ

### Aylık Maliyet Projeksiyonu
```
🔥 Kritik Servisler:
- Supabase Pro: $25/ay
- WhatsApp Business API: $0.005/mesaj (~$50/ay)
- Google Cloud Vision: $1.50/1000 request (~$30/ay)

🔶 Önemli Servisler:
- OpenAI API: ~$50/ay (kullanıma bağlı)
- Firebase: Ücretsiz (başlangıç)
- Vercel Pro: $20/ay

🔵 Opsiyonel:
- Sentry: $26/ay
- SendGrid: $15/ay

TOPLAM: ~$200-250/ay (tam özellikli)
```

---

## ✅ API SETUP KONTROL LİSTESİ

### Kritik API'ler
- [ ] Supabase hesabı oluşturuldu
- [ ] Supabase database kuruldu
- [ ] WhatsApp Business API aktif
- [ ] Google Cloud Vision API aktif
- [ ] Tüm API keyler alındı ve güvenli yerde saklandı

### Test Edilmesi Gerekenler
- [ ] Supabase bağlantısı test edildi
- [ ] WhatsApp mesaj gönderimi test edildi
- [ ] OCR işlemi test edildi
- [ ] Push notification test edildi

### Production Hazırlığı
- [ ] Rate limiting ayarlandı
- [ ] Error handling eklendi
- [ ] Monitoring kuruldu
- [ ] Backup stratejisi belirlendi

---

## 📞 DESTEK VE KAYNAKLAR

### Dokümantasyon
- [Supabase Docs](https://supabase.com/docs)
- [WhatsApp Business API](https://developers.facebook.com/docs/whatsapp)
- [Google Cloud Vision](https://cloud.google.com/vision/docs)
- [OpenAI API](https://platform.openai.com/docs)

### Community
- [Supabase Discord](https://discord.supabase.com)
- [Next.js Discord](https://nextjs.org/discord)

**API'ler hazır olduğunda, entegrasyon kodlarını yazabiliriz!**