-- Hayır Kurumu Yönetim Sistemi - Temel Şema
-- Bu dosya temel enum'ları ve extension'ları oluşturur

-- UUID extension'ı etkinleştir
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enum tanımları
CREATE TYPE user_role AS ENUM (
  'admin',
  'muhasebe', 
  'personel',
  'saha_personeli',
  'tercuman',
  'proje_sorumlusu',
  'sponsor',
  'aile'
);

CREATE TYPE currency AS ENUM ('TRY', 'USD', 'EUR');

CREATE TYPE education_level AS ENUM (
  'okul_oncesi',
  'ilkokul', 
  'ortaokul',
  'lise',
  'universite',
  'mezun',
  'okula_gitmiyor'
);

CREATE TYPE health_status AS ENUM (
  'saglikli',
  'kronik_hastalik', 
  'engelli',
  'ozel_bakim'
);

CREATE TYPE payment_type AS ENUM ('nakdi', 'ayni');

CREATE TYPE payment_method AS ENUM (
  'banka_transferi',
  'kredi_karti',
  'nakit', 
  'havale'
);

CREATE TYPE payment_status AS ENUM (
  'bekleniyor',
  'alindi',
  'eksik',
  'iptal'
);

CREATE TYPE project_type AS ENUM (
  'su_kuyusu',
  'konut_insaati',
  'gida_dagitim',
  'nakdi_yardim',
  'egitim',
  'saglik',
  'diger'
);

CREATE TYPE project_status AS ENUM (
  'planlaniyor',
  'devam_ediyor', 
  'tamamlandi',
  'iptal'
);

CREATE TYPE stock_movement_type AS ENUM (
  'giris',
  'cikis',
  'transfer',
  'fire'
);

CREATE TYPE distribution_type AS ENUM (
  'toplu',
  'bireysel',
  'duzenli'
);

CREATE TYPE document_status AS ENUM (
  'yuklendi',
  'isleniyor',
  'tamamlandi', 
  'hata'
);

CREATE TYPE message_status AS ENUM (
  'gonderildi',
  'teslim_edildi',
  'okundu',
  'hata'
);

CREATE TYPE notification_type AS ENUM (
  'odeme_hatirlatma',
  'odeme_alindi',
  'yetim_degisikligi',
  'proje_guncelleme',
  'belge_eksikligi',
  'stok_uyarisi',
  'gorev_atama'
);

CREATE TYPE notification_status AS ENUM (
  'okunmadi',
  'okundu', 
  'arsivlendi'
);

CREATE TYPE translation_status AS ENUM (
  'bekliyor',
  'yapiliyor',
  'tamamlandi'
);

CREATE TYPE expense_category AS ENUM (
  'personel_maaslari',
  'kira',
  'uretim_maliyeti',
  'nakliye',
  'hizmet_bedeli',
  'diger'
);

-- Temel fonksiyonlar
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';