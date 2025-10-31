# 🎨 TASARIM GEREKSİNİMLERİ VE BRAND KİMLİĞİ

Bu dokümanda Hayır Kurumu Yönetim Sistemi için gerekli tasarım öğeleri ve brand kimliği detayları yer almaktadır.

## 🎯 BRAND KİMLİĞİ

### Misyon ve Değerler
- **Güven**: Şeffaf ve güvenilir yönetim
- **Şefkat**: İnsani değerler odaklı yaklaşım  
- **Verimlilik**: Teknoloji ile optimize edilmiş süreçler
- **Kapsayıcılık**: Çok dilli ve kültürlerarası erişim

### Hedef Kitle
- Hayır kurumu yöneticileri ve personeli
- Sponsorlar ve bağışçılar
- Yetim aileler
- Saha çalışanları
- Muhasebe ve finans ekipleri

## 🎨 LOGO VE GÖRSEL KİMLİK

### Logo Gereksinimleri

#### Ana Logo
- **Format**: SVG (vektör), PNG (raster)
- **Boyutlar**: 
  - Yatay: 300x100px (3:1 oran)
  - Dikey: 150x200px 
  - Kare: 200x200px
- **Varyasyonlar**:
  - Renkli versiyon (ana kullanım)
  - Beyaz versiyon (koyu arka planlar için)
  - Siyah versiyon (tek renk baskılar için)
  - Sadece ikon (favicon, mobil)

#### Logo Öğeleri
- **Sembol**: Kalp, el, çocuk figürü, ev gibi sembolik öğeler
- **Tipografi**: Modern, okunabilir, güven veren
- **Stil**: Minimal, profesyonel, sıcak

#### Kullanım Alanları
- Web sitesi header
- Mobil uygulama ikonu
- Email imzaları
- Resmi belgeler
- WhatsApp profil fotoğrafı
- Sosyal medya profilleri

### Favicon ve App Icons
```
📁 icons/
├── favicon.ico (32x32px)
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png (180x180px)
├── android-chrome-192x192.png
├── android-chrome-512x512.png
└── mstile-150x150.png
```

## 🌈 RENK PALETİ

### Ana Renkler
```css
/* Lütfen aşağıdaki renk kategorilerinden tercihlerinizi belirtin */

/* Seçenek 1: Güven ve Profesyonellik */
--primary: #2563eb;      /* Mavi - güven, teknoloji */
--secondary: #10b981;    /* Yeşil - büyüme, umut */
--accent: #f59e0b;       /* Turuncu - enerji, sıcaklık */

/* Seçenek 2: Şefkat ve Sıcaklık */
--primary: #dc2626;      /* Kırmızı - sevgi, şefkat */
--secondary: #059669;    /* Yeşil - doğa, huzur */
--accent: #d97706;       /* Turuncu - neşe, enerji */

/* Seçenek 3: Modern ve Temiz */
--primary: #6366f1;      /* İndigo - modern, teknoloji */
--secondary: #06b6d4;    /* Cyan - temizlik, berraklık */
--accent: #f59e0b;       /* Amber - dikkat, önem */
```

### Destek Renkleri
```css
/* Durum Renkleri */
--success: #22c55e;      /* Başarı - yeşil */
--warning: #f59e0b;      /* Uyarı - turuncu */
--error: #ef4444;        /* Hata - kırmızı */
--info: #3b82f6;         /* Bilgi - mavi */

/* Gri Tonları */
--gray-50: #f9fafb;      /* Çok açık gri */
--gray-100: #f3f4f6;     /* Açık gri */
--gray-200: #e5e7eb;     /* Açık gri */
--gray-300: #d1d5db;     /* Orta açık gri */
--gray-400: #9ca3af;     /* Orta gri */
--gray-500: #6b7280;     /* Orta gri */
--gray-600: #4b5563;     /* Orta koyu gri */
--gray-700: #374151;     /* Koyu gri */
--gray-800: #1f2937;     /* Çok koyu gri */
--gray-900: #111827;     /* En koyu gri */
```

### Renk Kullanım Alanları
- **Primary**: Ana butonlar, linkler, vurgular
- **Secondary**: İkincil butonlar, yan menü
- **Accent**: CTA butonlar, önemli bildirimler
- **Success**: Başarılı işlemler, onay mesajları
- **Warning**: Uyarılar, eksik bilgiler
- **Error**: Hatalar, silme işlemleri
- **Info**: Bilgilendirme mesajları

## 🔤 TİPOGRAFİ

### Font Aileleri

#### Seçenek 1: Google Fonts (Ücretsiz)
```css
/* Ana Font - Okunabilirlik */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

/* Başlık Font - Karakter */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

/* Arapça Font */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@300;400;500;600;700&display=swap');
```

#### Seçenek 2: Sistem Fontları (Performans)
```css
/* Sistem Font Stack */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
             'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 
             'Helvetica Neue', sans-serif;
```

### Font Boyutları ve Ağırlıkları
```css
/* Başlıklar */
.text-4xl { font-size: 2.25rem; font-weight: 700; } /* Ana başlık */
.text-3xl { font-size: 1.875rem; font-weight: 600; } /* Sayfa başlığı */
.text-2xl { font-size: 1.5rem; font-weight: 600; }   /* Bölüm başlığı */
.text-xl { font-size: 1.25rem; font-weight: 500; }   /* Alt başlık */

/* Gövde Metni */
.text-base { font-size: 1rem; font-weight: 400; }    /* Normal metin */
.text-sm { font-size: 0.875rem; font-weight: 400; }  /* Küçük metin */
.text-xs { font-size: 0.75rem; font-weight: 400; }   /* Çok küçük metin */

/* Vurgular */
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
```

## 🖼️ GÖRSEL STIL REHBERİ

### İkonlar
- **Stil**: Outline (çizgi) veya Filled (dolu)
- **Kaynak**: Heroicons, Lucide, Feather Icons
- **Boyut**: 16px, 20px, 24px, 32px
- **Renk**: Mevcut renk paletinden

### Fotoğraflar
- **Stil**: Doğal, samimi, gerçek
- **Konu**: Çocuklar, aileler, yardım faaliyetleri
- **Kalite**: Yüksek çözünürlük (min 1920x1080)
- **Format**: WebP (modern), JPEG (fallback)

### İllüstrasyonlar
- **Stil**: Minimal, flat design
- **Renk**: Brand renkleri ile uyumlu
- **Konu**: Yardım, teknoloji, toplum

## 📱 UI/UX TASARIM PRENSİPLERİ

### Layout Yapısı
```
┌─────────────────────────────────────────┐
│ Header (Logo, Kullanıcı, Bildirimler)   │
├─────────────┬───────────────────────────┤
│             │                           │
│  Sidebar    │     Ana İçerik Alanı      │
│  (Menü)     │                           │
│             │                           │
│             │                           │
├─────────────┴───────────────────────────┤
│ Footer (Copyright, Linkler)             │
└─────────────────────────────────────────┘
```

### Bileşen Stilleri

#### Butonlar
```css
/* Ana Buton */
.btn-primary {
  background: var(--primary);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s;
}

/* İkincil Buton */
.btn-secondary {
  background: transparent;
  color: var(--primary);
  border: 2px solid var(--primary);
  padding: 10px 22px;
  border-radius: 8px;
}

/* Tehlike Butonu */
.btn-danger {
  background: var(--error);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
}
```

#### Kartlar
```css
.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 24px;
  border: 1px solid var(--gray-200);
}
```

#### Form Elemanları
```css
.input {
  border: 2px solid var(--gray-200);
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 16px;
  transition: border-color 0.2s;
}

.input:focus {
  border-color: var(--primary);
  outline: none;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}
```

### Responsive Breakpoints
```css
/* Mobil First Yaklaşım */
/* Mobil: 0px - 640px */
/* Tablet: 641px - 1024px */
/* Desktop: 1025px+ */

@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

## 🌍 ÇOK DİLLİ TASARIM

### RTL (Right-to-Left) Desteği
- Arapça için sağdan sola layout
- Menü ve butonların yer değiştirmesi
- İkon yönlerinin tersine çevrilmesi

### Font Desteği
- **Türkçe**: Inter, Poppins
- **Arapça**: Noto Sans Arabic, Amiri
- **İngilizce**: Inter, Poppins

## 📋 TASARIM DOSYALARI LİSTESİ

### Gerekli Dosyalar
```
📁 design-assets/
├── 📁 logos/
│   ├── logo-horizontal.svg
│   ├── logo-vertical.svg
│   ├── logo-icon.svg
│   ├── logo-white.svg
│   └── logo-black.svg
├── 📁 icons/
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   └── android-chrome-*.png
├── 📁 colors/
│   ├── color-palette.css
│   └── color-swatches.png
├── 📁 fonts/
│   ├── font-specimens.pdf
│   └── web-fonts.css
├── 📁 mockups/
│   ├── dashboard-desktop.png
│   ├── dashboard-mobile.png
│   ├── login-page.png
│   └── orphan-profile.png
└── 📁 guidelines/
    ├── brand-guidelines.pdf
    └── ui-style-guide.pdf
```

## 🎨 TASARIM ARAÇLARI

### Önerilen Araçlar
- **Figma** (UI/UX tasarım)
- **Adobe Illustrator** (Logo tasarımı)
- **Canva** (Hızlı grafikler)
- **Coolors.co** (Renk paleti)
- **Google Fonts** (Font seçimi)

### Tasarım Kaynakları
- **Unsplash** (Ücretsiz fotoğraflar)
- **Heroicons** (İkonlar)
- **Tailwind UI** (Bileşen örnekleri)
- **Dribbble** (İlham)

---

## ✅ TASARIM ONAY LİSTESİ

### Tamamlanması Gerekenler
- [ ] Logo tasarımı (tüm varyasyonlar)
- [ ] Renk paleti seçimi
- [ ] Font seçimi ve test
- [ ] Ana sayfa mockup
- [ ] Dashboard mockup
- [ ] Mobil responsive tasarım
- [ ] RTL (Arapça) layout test
- [ ] İkon seti seçimi
- [ ] Brand guidelines dokümanı

### Onay Süreci
1. **Konsept Sunumu**: İlk tasarım fikirleri
2. **Revizyon**: Geri bildirimler doğrultusunda düzeltmeler
3. **Final Onay**: Son tasarımın onaylanması
4. **Asset Hazırlama**: Tüm dosyaların hazırlanması
5. **Developer Handoff**: Geliştirici ekibine teslim

---

## 📞 TASARIM DESTEĞİ

Bu tasarım gereksinimlerini karşılamak için:
- Profesyonel tasarımcı ile çalışabilirsiniz
- Hazır template'leri özelleştirebilirsiniz  
- AI araçları (Midjourney, DALL-E) kullanabilirsiniz
- Açık kaynak tasarım kaynaklarından yararlanabilirsiniz

**Tasarım dosyaları hazır olduğunda, geliştirme sürecine entegre edeceğiz!**