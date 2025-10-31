-- Kullanıcı ve Yetkilendirme Tabloları

-- BÖLGELER
CREATE TABLE regions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL, -- 'AZ', 'SY', 'PS', 'TR'
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- KULLANICI PROFİLLERİ (Supabase Auth ile entegre)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  whatsapp_number TEXT,
  email TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- KULLANICI YETKİLERİ
CREATE TABLE user_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  resource TEXT NOT NULL, -- 'yetimler', 'projeler', 'depo', vs.
  actions TEXT[] NOT NULL, -- ['read', 'write', 'delete']
  regions TEXT[], -- Yetkili olduğu bölgeler
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- KULLANICI NOTLARI
CREATE TABLE user_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  related_entity_type TEXT NOT NULL, -- 'orphan', 'sponsor', 'project'
  related_entity_id UUID NOT NULL,
  note_text TEXT NOT NULL,
  reminder_date TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- BÖLGESEL AYLIK TUTARLAR
CREATE TABLE region_monthly_amounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  region_id UUID REFERENCES regions(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  currency currency NOT NULL,
  effective_from DATE NOT NULL,
  effective_until DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger'lar
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_notes_updated_at
  BEFORE UPDATE ON user_notes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- İndeksler
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_active ON profiles(active);
CREATE INDEX idx_user_permissions_user_id ON user_permissions(user_id);
CREATE INDEX idx_user_permissions_resource ON user_permissions(resource);
CREATE INDEX idx_user_notes_user_id ON user_notes(user_id);
CREATE INDEX idx_user_notes_entity ON user_notes(related_entity_type, related_entity_id);

-- Varsayılan bölgeler
INSERT INTO regions (code, name, country) VALUES
('AZ', 'Azerbaycan', 'Azerbaycan'),
('SY', 'Suriye', 'Suriye'),
('PS', 'Gazze', 'Filistin'),
('TR', 'Türkiye', 'Türkiye');

-- Varsayılan aylık tutarlar
INSERT INTO region_monthly_amounts (region_id, amount, currency, effective_from) 
SELECT 
  r.id,
  CASE 
    WHEN r.code = 'TR' THEN 500.00
    WHEN r.code = 'SY' THEN 50.00
    WHEN r.code = 'PS' THEN 60.00
    WHEN r.code = 'AZ' THEN 40.00
    ELSE 50.00
  END,
  CASE 
    WHEN r.code = 'TR' THEN 'TRY'::currency
    ELSE 'USD'::currency
  END,
  '2024-01-01'::DATE
FROM regions r;