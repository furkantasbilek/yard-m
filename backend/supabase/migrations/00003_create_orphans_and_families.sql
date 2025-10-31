-- Yetim ve Aile Yönetimi Tabloları

-- AİLELER
CREATE TABLE families (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_number TEXT UNIQUE NOT NULL, -- AZ-00001
  region_id UUID REFERENCES regions(id),
  address TEXT,
  city TEXT,
  notes TEXT,
  auth_user_id UUID REFERENCES profiles(id), -- Aile giriş hesabı
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- YETİMLER
CREATE TABLE orphans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  orphan_number TEXT UNIQUE NOT NULL, -- AZ-Y-00001
  family_id UUID REFERENCES families(id) ON DELETE SET NULL,
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
  is_active BOOLEAN DEFAULT true, -- Öldü, taşındı vs. için
  termination_reason TEXT,
  termination_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- YETİM BELGE TESLİMLERİ
CREATE TABLE orphan_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  orphan_id UUID REFERENCES orphans(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL, -- 'kimlik', 'okul_belgesi', 'saglik_raporu'
  file_url TEXT NOT NULL,
  upload_date TIMESTAMPTZ DEFAULT NOW(),
  uploaded_by UUID REFERENCES profiles(id)
);

-- Trigger'lar
CREATE TRIGGER update_families_updated_at
  BEFORE UPDATE ON families
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orphans_updated_at
  BEFORE UPDATE ON orphans
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- İndeksler
CREATE INDEX idx_families_region ON families(region_id);
CREATE INDEX idx_families_number ON families(family_number);
CREATE INDEX idx_orphans_family ON orphans(family_id);
CREATE INDEX idx_orphans_number ON orphans(orphan_number);
CREATE INDEX idx_orphans_sponsored ON orphans(is_sponsored);
CREATE INDEX idx_orphans_active ON orphans(is_active);
CREATE INDEX idx_orphan_documents_orphan ON orphan_documents(orphan_id);

-- Yetim numarası otomatik oluşturma fonksiyonu
CREATE OR REPLACE FUNCTION generate_orphan_number()
RETURNS TRIGGER AS $$
DECLARE
  region_code TEXT;
  next_sequence INT;
BEGIN
  -- Bölge kodunu al
  SELECT r.code INTO region_code
  FROM regions r
  JOIN families f ON f.region_id = r.id
  WHERE f.id = NEW.family_id;
  
  -- Eğer bölge bulunamazsa varsayılan kod kullan
  IF region_code IS NULL THEN
    region_code := 'XX';
  END IF;
  
  -- Sonraki sıra numarasını hesapla
  SELECT COALESCE(MAX(CAST(SUBSTRING(orphan_number FROM '[0-9]+$') AS INT)), 0) + 1
  INTO next_sequence
  FROM orphans
  WHERE orphan_number LIKE region_code || '-Y-%';
  
  -- Yetim numarasını oluştur
  NEW.orphan_number := region_code || '-Y-' || LPAD(next_sequence::TEXT, 5, '0');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aile numarası otomatik oluşturma fonksiyonu
CREATE OR REPLACE FUNCTION generate_family_number()
RETURNS TRIGGER AS $$
DECLARE
  region_code TEXT;
  next_sequence INT;
BEGIN
  -- Bölge kodunu al
  SELECT r.code INTO region_code
  FROM regions r
  WHERE r.id = NEW.region_id;
  
  -- Eğer bölge bulunamazsa varsayılan kod kullan
  IF region_code IS NULL THEN
    region_code := 'XX';
  END IF;
  
  -- Sonraki sıra numarasını hesapla
  SELECT COALESCE(MAX(CAST(SUBSTRING(family_number FROM '[0-9]+$') AS INT)), 0) + 1
  INTO next_sequence
  FROM families
  WHERE family_number LIKE region_code || '-%';
  
  -- Aile numarasını oluştur
  NEW.family_number := region_code || '-' || LPAD(next_sequence::TEXT, 5, '0');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger'ları ekle (sadece numara boşsa)
CREATE TRIGGER generate_orphan_number_trigger
  BEFORE INSERT ON orphans
  FOR EACH ROW
  WHEN (NEW.orphan_number IS NULL OR NEW.orphan_number = '')
  EXECUTE FUNCTION generate_orphan_number();

CREATE TRIGGER generate_family_number_trigger
  BEFORE INSERT ON families
  FOR EACH ROW
  WHEN (NEW.family_number IS NULL OR NEW.family_number = '')
  EXECUTE FUNCTION generate_family_number();