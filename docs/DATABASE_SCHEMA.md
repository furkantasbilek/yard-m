# Database Şema Dokümantasyonu

Bu dokümanda Hayır Kurumu Yönetim Sistemi'nin database şeması detaylı olarak açıklanmaktadır.

## 📋 Genel Bakış

Sistem PostgreSQL database kullanır ve Supabase üzerinde çalışır. Toplam 25+ tablo ile kapsamlı bir veri modeli sunar.

## 🏗️ Şema Yapısı

### 1. Kullanıcı ve Yetkilendirme

#### `profiles`
Supabase Auth ile entegre kullanıcı profilleri.

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  role user_role NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  whatsapp_number TEXT,
  email TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**İlişkiler:**
- `auth.users` ile 1:1 ilişki
- `user_permissions` ile 1:N ilişki

#### `user_permissions`
Kullanıcı yetkileri ve bölgesel erişim kontrolü.

```sql
CREATE TABLE user_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  resource TEXT NOT NULL, -- 'yetimler', 'projeler', 'depo'
  actions TEXT[] NOT NULL, -- ['read', 'write', 'delete']
  regions TEXT[], -- Yetkili olduğu bölgeler
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### `regions`
Coğrafi bölge tanımları.

```sql
CREATE TABLE regions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL, -- 'AZ', 'SY', 'PS', 'TR'
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 2. Yetim ve Aile Yönetimi

#### `families`
Aile kayıtları ve iletişim bilgileri.

```sql
CREATE TABLE families (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_number TEXT UNIQUE NOT NULL, -- AZ-00001
  region_id UUID REFERENCES regions(id),
  address TEXT,
  city TEXT,
  notes TEXT,
  auth_user_id UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Özellikler:**
- Otomatik aile numarası oluşturma
- Bölgesel kodlama sistemi
- Aile giriş hesabı entegrasyonu

#### `orphans`
Yetim kayıtları ve detay bilgileri.

```sql
CREATE TABLE orphans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  orphan_number TEXT UNIQUE NOT NULL, -- AZ-Y-00001
  family_id UUID REFERENCES families(id),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  mother_name TEXT,
  father_name TEXT,
  birth_date DATE NOT NULL,
  education_level education_level,
  health_status health_status,
  health_details TEXT,
  photo_url TEXT,
  is_sponsored BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  termination_reason TEXT,
  termination_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Enum Değerleri:**
- `education_level`: okul_oncesi, ilkokul, ortaokul, lise, universite, mezun, okula_gitmiyor
- `health_status`: saglikli, kronik_hastalik, engelli, ozel_bakim

### 3. Sponsor Yönetimi

#### `sponsors`
Sponsor kayıtları ve iletişim bilgileri.

```sql
CREATE TABLE sponsors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sponsor_number TEXT UNIQUE NOT NULL, -- SP-00001
  auth_user_id UUID REFERENCES profiles(id),
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  whatsapp_number TEXT,
  address TEXT,
  registration_date DATE NOT NULL,
  sponsorship_start_date DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### `sponsorships`
Sponsor-yetim eşleştirme kayıtları.

```sql
CREATE TABLE sponsorships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sponsor_id UUID REFERENCES sponsors(id),
  orphan_id UUID REFERENCES orphans(id),
  project_id UUID REFERENCES projects(id),
  start_date DATE NOT NULL,
  end_date DATE,
  monthly_amount DECIMAL(10, 2) NOT NULL,
  currency currency NOT NULL,
  status TEXT DEFAULT 'active',
  termination_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(sponsor_id, orphan_id, start_date)
);
```

### 4. Ödeme Sistemi

#### `payments`
Tüm ödeme kayıtları (nakdi/ayni).

```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sponsorship_id UUID REFERENCES sponsorships(id),
  sponsor_id UUID REFERENCES sponsors(id),
  orphan_id UUID REFERENCES orphans(id),
  project_id UUID REFERENCES projects(id),
  payment_type payment_type NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency currency NOT NULL,
  payment_method payment_method,
  payment_date DATE NOT NULL,
  payment_month DATE, -- Hangi ay için ödeme
  status payment_status DEFAULT 'alindi',
  receipt_url TEXT,
  bank_iban TEXT,
  notes TEXT,
  recorded_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Enum Değerleri:**
- `payment_type`: nakdi, ayni
- `payment_method`: banka_transferi, kredi_karti, nakit, havale
- `payment_status`: bekleniyor, alindi, eksik, iptal
- `currency`: TRY, USD, EUR

#### `sponsor_balance` (View)
Sponsor borç/alacak durumu hesaplama view'i.

```sql
CREATE VIEW sponsor_balance AS
SELECT 
  s.id AS sponsor_id,
  s.sponsor_number,
  s.full_name,
  COALESCE(SUM(p.amount), 0) AS total_paid,
  COALESCE(expected.total_expected, 0) AS total_expected,
  COALESCE(expected.total_expected, 0) - COALESCE(SUM(p.amount), 0) AS balance
FROM sponsors s
LEFT JOIN payments p ON p.sponsor_id = s.id AND p.status = 'alindi'
LEFT JOIN (
  -- Beklenen toplam tutar hesaplama
  SELECT sponsor_id, SUM(monthly_amount * months_count) AS total_expected
  FROM sponsorships
  GROUP BY sponsor_id
) expected ON expected.sponsor_id = s.id
GROUP BY s.id, s.sponsor_number, s.full_name, expected.total_expected;
```

### 5. Proje Yönetimi

#### `projects`
Proje ana kayıtları.

```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_number TEXT UNIQUE NOT NULL, -- AZ-PRJ-00001
  region_id UUID REFERENCES regions(id),
  project_type project_type NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  target_amount DECIMAL(12, 2),
  currency currency,
  start_date DATE,
  expected_end_date DATE,
  actual_end_date DATE,
  status project_status DEFAULT 'planlaniyor',
  responsible_user_id UUID REFERENCES profiles(id),
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Enum Değerleri:**
- `project_type`: su_kuyusu, konut_insaati, gida_dagitim, nakdi_yardim, egitim, saglik, diger
- `project_status`: planlaniyor, devam_ediyor, tamamlandi, iptal

#### `project_stages`
Proje etap takibi.

```sql
CREATE TABLE project_stages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  stage_number INT NOT NULL,
  stage_name TEXT NOT NULL,
  description TEXT,
  expected_completion_date DATE,
  actual_completion_date DATE,
  is_completed BOOLEAN DEFAULT false,
  completion_notes TEXT,
  completed_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, stage_number)
);
```

### 6. Depo ve Stok Yönetimi

#### `warehouses`
Depo tanımları.

```sql
CREATE TABLE warehouses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  warehouse_code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  region_id UUID REFERENCES regions(id),
  address TEXT,
  responsible_user_id UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### `stock_items`
Stok ürün tanımları.

```sql
CREATE TABLE stock_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES stock_categories(id),
  item_code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  unit TEXT NOT NULL, -- 'adet', 'kg', 'paket', 'koli'
  estimated_cost DECIMAL(10, 2),
  currency currency,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### `stock_movements`
Stok giriş/çıkış hareketleri.

```sql
CREATE TABLE stock_movements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  warehouse_id UUID REFERENCES warehouses(id),
  item_id UUID REFERENCES stock_items(id),
  movement_type stock_movement_type NOT NULL,
  quantity DECIMAL(10, 2) NOT NULL,
  unit TEXT NOT NULL,
  expiry_date DATE,
  size_info TEXT,
  source_info TEXT,
  destination_info TEXT,
  related_family_id UUID REFERENCES families(id),
  related_orphan_id UUID REFERENCES orphans(id),
  notes TEXT,
  recorded_by UUID REFERENCES profiles(id),
  movement_date TIMESTAMPTZ DEFAULT NOW()
);
```

### 7. Belge ve OCR Sistemi

#### `delivery_documents`
Teslim belgesi dosyaları.

```sql
CREATE TABLE delivery_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_number TEXT UNIQUE NOT NULL,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size_bytes BIGINT,
  upload_date TIMESTAMPTZ DEFAULT NOW(),
  uploaded_by UUID REFERENCES profiles(id),
  coverage_start_date DATE NOT NULL,
  coverage_end_date DATE NOT NULL,
  region_id UUID REFERENCES regions(id),
  project_id UUID REFERENCES projects(id),
  ocr_status document_status DEFAULT 'yuklendi',
  ocr_processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### `delivery_records`
OCR ile çıkarılan kayıtlar.

```sql
CREATE TABLE delivery_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID REFERENCES delivery_documents(id),
  page_number INT,
  row_number INT,
  orphan_id UUID REFERENCES orphans(id),
  family_id UUID REFERENCES families(id),
  sponsor_id UUID REFERENCES sponsors(id),
  delivery_date DATE,
  amount DECIMAL(10, 2),
  currency currency,
  items_delivered TEXT,
  signature_present BOOLEAN,
  notes TEXT,
  extracted_text JSONB,
  confidence_score DECIMAL(3, 2),
  verified BOOLEAN DEFAULT false,
  verified_by UUID REFERENCES profiles(id),
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 8. İletişim ve Bildirimler

#### `whatsapp_templates`
WhatsApp mesaj şablonları.

```sql
CREATE TABLE whatsapp_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_name TEXT UNIQUE NOT NULL,
  template_code TEXT NOT NULL,
  category TEXT NOT NULL,
  language TEXT DEFAULT 'tr',
  template_text TEXT NOT NULL,
  variables JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### `notifications`
Sistem bildirimleri.

```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  notification_type notification_type NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  related_entity_type TEXT,
  related_entity_id UUID,
  action_url TEXT,
  status notification_status DEFAULT 'okunmadi',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  read_at TIMESTAMPTZ
);
```

## 🔐 Row Level Security (RLS)

Tüm tablolar için RLS aktif edilmiştir. Temel politikalar:

### Admin Politikası
```sql
CREATE POLICY "Admin tam erişim" ON table_name
FOR ALL TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);
```

### Bölgesel Erişim Politikası
```sql
CREATE POLICY "Bölgesel erişim" ON table_name
FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles p
    JOIN user_permissions up ON up.user_id = p.id
    WHERE p.id = auth.uid()
    AND table_name.region_id::text = ANY(up.regions)
  )
);
```

### Sponsor Kendi Verisi Politikası
```sql
CREATE POLICY "Sponsor kendi verisi" ON table_name
FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM sponsors s
    WHERE s.auth_user_id = auth.uid()
    AND table_name.sponsor_id = s.id
  )
);
```

## 📊 İndeksler

Performans için kritik indeksler:

```sql
-- Yetim arama indeksleri
CREATE INDEX idx_orphans_region ON orphans(region_id);
CREATE INDEX idx_orphans_sponsored ON orphans(is_sponsored);
CREATE INDEX idx_orphans_name ON orphans(first_name, last_name);

-- Ödeme indeksleri
CREATE INDEX idx_payments_sponsor ON payments(sponsor_id);
CREATE INDEX idx_payments_date ON payments(payment_date);
CREATE INDEX idx_payments_month ON payments(payment_month);

-- Proje indeksleri
CREATE INDEX idx_projects_region ON projects(region_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_type ON projects(project_type);

-- Stok indeksleri
CREATE INDEX idx_stock_movements_warehouse ON stock_movements(warehouse_id);
CREATE INDEX idx_stock_movements_item ON stock_movements(item_id);
CREATE INDEX idx_stock_movements_date ON stock_movements(movement_date);
```

## 🔄 Trigger'lar

### Otomatik Numara Oluşturma
```sql
-- Yetim numarası otomatik oluşturma
CREATE TRIGGER generate_orphan_number_trigger
BEFORE INSERT ON orphans
FOR EACH ROW
WHEN (NEW.orphan_number IS NULL OR NEW.orphan_number = '')
EXECUTE FUNCTION generate_orphan_number();
```

### Güncelleme Zamanı
```sql
-- updated_at otomatik güncelleme
CREATE TRIGGER update_orphans_updated_at
BEFORE UPDATE ON orphans
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
```

### Bildirim Oluşturma
```sql
-- Ödeme alındığında bildirim
CREATE TRIGGER payment_received_trigger
AFTER INSERT ON payments
FOR EACH ROW
EXECUTE FUNCTION notify_payment_received();
```

## 📈 View'lar

### Sponsor Özet View
```sql
CREATE VIEW sponsor_summary AS
SELECT 
  s.id,
  s.sponsor_number,
  s.full_name,
  COUNT(sp.id) as total_orphans,
  SUM(sp.monthly_amount) as monthly_commitment,
  MAX(p.payment_date) as last_payment_date
FROM sponsors s
LEFT JOIN sponsorships sp ON sp.sponsor_id = s.id AND sp.status = 'active'
LEFT JOIN payments p ON p.sponsor_id = s.id
GROUP BY s.id, s.sponsor_number, s.full_name;
```

### Stok Durumu View
```sql
CREATE VIEW current_stock_summary AS
SELECT 
  w.name as warehouse_name,
  si.name as item_name,
  SUM(CASE WHEN sm.movement_type IN ('giris') THEN sm.quantity ELSE -sm.quantity END) as current_quantity,
  si.unit
FROM stock_movements sm
JOIN warehouses w ON w.id = sm.warehouse_id
JOIN stock_items si ON si.id = sm.item_id
GROUP BY w.id, w.name, si.id, si.name, si.unit
HAVING SUM(CASE WHEN sm.movement_type IN ('giris') THEN sm.quantity ELSE -sm.quantity END) > 0;
```

## 🔧 Bakım ve Optimizasyon

### Düzenli Bakım Görevleri

1. **Vacuum ve Analyze**
```sql
VACUUM ANALYZE;
```

2. **Eski Bildirimler Temizleme**
```sql
DELETE FROM notifications 
WHERE created_at < NOW() - INTERVAL '6 months' 
AND status = 'arsivlendi';
```

3. **Log Tabloları Temizleme**
```sql
DELETE FROM sent_messages 
WHERE sent_at < NOW() - INTERVAL '1 year';
```

### Performans İzleme

```sql
-- Yavaş sorgular
SELECT query, mean_time, calls 
FROM pg_stat_statements 
ORDER BY mean_time DESC 
LIMIT 10;

-- Tablo boyutları
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```