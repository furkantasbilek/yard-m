# Hayır Kurumu Yönetim Sistemi

Yetim/ihtiyaç sahibi aileler, bağışçılar, projeler ve ayni/nakdi yardımları takip eden, multi-currency destekli, WhatsApp entegrasyonlu, OCR ve otomatik bildirim sistemli tam entegre hayır kurumu yönetim platformu.

## 🎯 Proje Hedefleri

- Yetim ve aile kayıtlarının merkezi yönetimi
- Sponsor eşleştirme ve ödeme takibi
- Depo ve ayni yardım stok yönetimi
- Proje yönetimi ve etap takibi
- PDF teslim belgesi otomatik okuma (OCR)
- WhatsApp entegrasyonu
- Çok dilli destek (Türkçe, Arapça, İngilizce)
- Rol bazlı yetkilendirme sistemi
- Otomatik bildirimler ve hatırlatmalar

## 🏗️ Teknoloji Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS + shadcn/ui
- React Query (veri yönetimi)
- Zustand (state management)
- React Hook Form + Zod (form validasyon)
- Recharts (grafikler)

### Backend
- Supabase (PostgreSQL + Auth + Storage + Realtime)
- Edge Functions (serverless API)
- Supabase Storage (PDF, resim, video)

### Entegrasyonlar
- WhatsApp Business API (Twilio/Meta)
- Tesseract.js veya Google Cloud Vision API (OCR)
- n8n (self-hosted automation) - opsiyonel
- Firebase Cloud Messaging (push notifications)

## 📂 Proje Yapısı

```
hayir-kurumu-yonetim/
├── frontend/          # Next.js App
├── backend/           # Supabase Edge Functions
├── automation/        # n8n workflows
├── scripts/           # Migration ve utility scripts
└── docs/             # Dokümantasyon
```

## 🚀 Kurulum

1. Repository'yi klonlayın
2. Frontend kurulumu için `frontend/` klasörüne gidin
3. Backend kurulumu için `backend/` klasörüne gidin
4. Detaylı kurulum talimatları için `docs/DEPLOYMENT.md` dosyasını inceleyin

## 📋 Geliştirme Planı

Proje 12 haftalık bir geliştirme planı ile tasarlanmıştır:
- Week 1: Altyapı ve Auth
- Week 2: Yetim ve Aile Yönetimi
- Week 3: Sponsor Yönetimi
- Week 4: Ödeme Takibi
- Week 5: Proje Yönetimi
- Week 6: Depo Yönetimi
- Week 7: Teslim Belgesi ve OCR
- Week 8: WhatsApp ve İletişim
- Week 9: Bildirimler ve Otomasyon
- Week 10: Sponsor ve Aile Portali
- Week 11: Muhasebe ve Raporlama
- Week 12: Tercüme ve Final

## 🔐 Güvenlik

- Row Level Security (RLS) politikaları
- JWT tabanlı authentication
- Rol bazlı yetkilendirme
- API rate limiting
- File upload güvenliği

## 📞 Destek

Proje ile ilgili sorularınız için GitHub Issues kullanabilirsiniz.