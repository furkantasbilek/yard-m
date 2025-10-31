# Deployment Rehberi

Bu dokümanda Hayır Kurumu Yönetim Sistemi'nin production ortamına nasıl deploy edileceği anlatılmaktadır.

## 🚀 Hızlı Başlangıç

### 1. Gereksinimler

- Node.js 18+ 
- npm veya yarn
- Git
- Supabase hesabı
- Vercel hesabı (frontend için)

### 2. Repository Kurulumu

```bash
git clone https://github.com/username/hayir-kurumu-yonetim.git
cd hayir-kurumu-yonetim
```

### 3. Frontend Kurulumu

```bash
cd frontend
npm install
```

### 4. Backend Kurulumu

```bash
cd backend
npm install -g @supabase/cli
supabase login
```

## 🗄️ Supabase Kurulumu

### 1. Yeni Proje Oluşturma

1. [supabase.com](https://supabase.com) adresine gidin
2. "New Project" butonuna tıklayın
3. Proje adını girin: `hayir-kurumu-yonetim`
4. Güçlü bir database password belirleyin
5. Bölge seçin (Europe West için `eu-west-1`)

### 2. Database Migration

```bash
cd backend
supabase link --project-ref your-project-ref
supabase db push
```

### 3. Storage Buckets Oluşturma

Supabase Dashboard > Storage bölümünden şu bucket'ları oluşturun:

- `orphan-photos` (Public: true)
- `documents` (Public: false) 
- `receipts` (Public: false)
- `project-media` (Public: true)

### 4. Storage Policies

```sql
-- orphan-photos bucket
CREATE POLICY "Authenticated users can upload" ON storage.objects 
FOR INSERT TO authenticated 
WITH CHECK (bucket_id = 'orphan-photos');

CREATE POLICY "Public can view" ON storage.objects 
FOR SELECT TO public 
USING (bucket_id = 'orphan-photos');

-- documents bucket
CREATE POLICY "Authenticated users can upload documents" ON storage.objects 
FOR INSERT TO authenticated 
WITH CHECK (bucket_id = 'documents');

CREATE POLICY "Users can view own documents" ON storage.objects 
FOR SELECT TO authenticated 
USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);
```

## 🌐 Vercel Deployment (Frontend)

### 1. Vercel Hesabı

1. [vercel.com](https://vercel.com) adresine gidin
2. GitHub ile giriş yapın
3. Repository'yi import edin

### 2. Build Settings

- **Framework Preset**: Next.js
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

### 3. Environment Variables

Vercel Dashboard > Settings > Environment Variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 4. Deploy

```bash
git push origin main
```

Vercel otomatik olarak deploy edecektir.

## 🔧 Edge Functions Deployment

### 1. OCR Function

```bash
cd backend
supabase functions deploy ocr-process --project-ref your-project-ref
```

### 2. WhatsApp Function

```bash
supabase functions deploy whatsapp-send --project-ref your-project-ref
```

### 3. Environment Variables

Supabase Dashboard > Edge Functions > Settings:

```env
WHATSAPP_API_TOKEN=your-whatsapp-token
GOOGLE_CLOUD_VISION_API_KEY=your-vision-api-key
OPENAI_API_KEY=your-openai-key
```

## 📱 WhatsApp Business API Kurulumu

### Meta Business (Önerilen)

1. [developers.facebook.com](https://developers.facebook.com) adresine gidin
2. Yeni uygulama oluşturun
3. WhatsApp Business API'yi ekleyin
4. Phone Number ID ve Access Token'ı alın

### Twilio (Alternatif)

1. [console.twilio.com](https://console.twilio.com) adresine gidin
2. WhatsApp Sandbox'ı aktifleştirin
3. Account SID ve Auth Token'ı alın

## 🔐 Güvenlik Ayarları

### 1. RLS Policies

Tüm tablolar için Row Level Security aktif edilmiştir. Policies migration dosyalarında tanımlanmıştır.

### 2. API Keys

- Tüm API key'leri environment variable olarak saklayın
- Production'da `.env` dosyası kullanmayın
- Vercel/Supabase dashboard'larından environment variable'ları yönetin

### 3. CORS Ayarları

Supabase Dashboard > Settings > API:

```json
{
  "origins": [
    "https://your-domain.vercel.app",
    "https://your-custom-domain.com"
  ]
}
```

## 📊 Monitoring ve Logging

### 1. Supabase Logs

- Dashboard > Logs bölümünden database ve API loglarını izleyin
- Error tracking için webhook'lar kurun

### 2. Vercel Analytics

- Vercel Dashboard > Analytics'i aktifleştirin
- Performance metrikleri takip edin

### 3. Uptime Monitoring

- [uptimerobot.com](https://uptimerobot.com) gibi servisleri kullanın
- Critical endpoint'leri izleyin

## 🔄 CI/CD Pipeline

### GitHub Actions

`.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: cd frontend && npm ci
      - run: cd frontend && npm run build
      - run: cd frontend && npm run lint

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npx supabase link --project-ref ${{ secrets.SUPABASE_PROJECT_REF }}
      - run: npx supabase db push
```

## 🚨 Troubleshooting

### Yaygın Sorunlar

1. **Migration Hatası**: Database'de manuel değişiklik yapıldıysa reset gerekebilir
2. **CORS Hatası**: Supabase CORS ayarlarını kontrol edin
3. **Build Hatası**: Environment variable'ları kontrol edin
4. **Storage Hatası**: Bucket policies'i kontrol edin

### Log Kontrolü

```bash
# Supabase logs
supabase logs --project-ref your-project-ref

# Vercel logs
vercel logs your-deployment-url
```

## 📞 Destek

Deployment ile ilgili sorunlar için:

1. GitHub Issues açın
2. Discord kanalımıza katılın
3. Email: support@hayir-kurumu.org

## 🔄 Güncelleme Süreci

### 1. Database Migration

```bash
# Yeni migration oluştur
supabase migration new add_new_feature

# Migration'ı uygula
supabase db push
```

### 2. Frontend Güncelleme

```bash
git push origin main
# Vercel otomatik deploy eder
```

### 3. Edge Functions Güncelleme

```bash
supabase functions deploy function-name --project-ref your-project-ref
```