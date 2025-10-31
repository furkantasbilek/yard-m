# 🐙 GITHUB REPOSITORY SETUP REHBERİ

Bu dokümanda Hayır Kurumu Yönetim Sistemi için GitHub repository'sinin nasıl oluşturulacağı ve yapılandırılacağı anlatılmaktadır.

## 🚀 REPOSITORY OLUŞTURMA

### 1. GitHub Hesabı ve Repository
```bash
# GitHub'da yeni repository oluştur
Repository name: hayir-kurumu-yonetim
Description: Yetim, sponsor, proje ve depo takibi için kapsamlı hayır kurumu yönetim sistemi
Visibility: Private (başlangıçta)
Initialize with README: ✅
Add .gitignore: Node.js
Add license: MIT License
```

### 2. Repository Ayarları
```bash
# Settings > General
- Allow merge commits: ✅
- Allow squash merging: ✅
- Allow rebase merging: ✅
- Automatically delete head branches: ✅
- Allow auto-merge: ✅
```

### 3. Branch Protection Rules
```bash
# Settings > Branches > Add rule
Branch name pattern: main
Protect matching branches:
- ✅ Require a pull request before merging
- ✅ Require approvals: 1
- ✅ Dismiss stale PR approvals when new commits are pushed
- ✅ Require status checks to pass before merging
- ✅ Require branches to be up to date before merging
- ✅ Require conversation resolution before merging
- ✅ Include administrators
```

---

## 📁 REPOSITORY YAPILANDIRMASI

### Klasör Yapısı
```
hayir-kurumu-yonetim/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml
│   │   ├── deploy-frontend.yml
│   │   └── deploy-backend.yml
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   ├── feature_request.md
│   │   └── question.md
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── CODEOWNERS
├── frontend/
├── backend/
├── scripts/
├── docs/
├── .gitignore
├── .env.example
├── README.md
├── CONTRIBUTING.md
├── CHANGELOG.md
├── LICENSE
└── package.json
```

---

## 🔧 GITHUB ACTIONS WORKFLOWS

### 1. CI/CD Pipeline (.github/workflows/ci.yml)
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [18.x, 20.x]
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
        cache-dependency-path: frontend/package-lock.json
    
    - name: Install dependencies
      run: |
        cd frontend
        npm ci
    
    - name: Run linter
      run: |
        cd frontend
        npm run lint
    
    - name: Run type check
      run: |
        cd frontend
        npm run type-check
    
    - name: Run tests
      run: |
        cd frontend
        npm run test
    
    - name: Build application
      run: |
        cd frontend
        npm run build
      env:
        NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
        NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}
```

### 2. Frontend Deployment (.github/workflows/deploy-frontend.yml)
```yaml
name: Deploy Frontend

on:
  push:
    branches: [ main ]
    paths: [ 'frontend/**' ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
        working-directory: frontend
        vercel-args: '--prod'
```

### 3. Backend Deployment (.github/workflows/deploy-backend.yml)
```yaml
name: Deploy Backend

on:
  push:
    branches: [ main ]
    paths: [ 'backend/**' ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Supabase CLI
      uses: supabase/setup-cli@v1
      with:
        version: latest
    
    - name: Deploy database migrations
      run: |
        cd backend
        supabase link --project-ref ${{ secrets.SUPABASE_PROJECT_REF }}
        supabase db push
      env:
        SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}
    
    - name: Deploy Edge Functions
      run: |
        cd backend
        supabase functions deploy --project-ref ${{ secrets.SUPABASE_PROJECT_REF }}
      env:
        SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}
```

---

## 📝 ISSUE VE PR TEMPLATES

### Bug Report Template (.github/ISSUE_TEMPLATE/bug_report.md)
```markdown
---
name: Bug Report
about: Bir hata bildirmek için bu şablonu kullanın
title: '[BUG] '
labels: bug
assignees: ''
---

## 🐛 Hata Açıklaması
Hatanın net ve kısa bir açıklaması.

## 🔄 Hatayı Yeniden Oluşturma Adımları
1. '...' sayfasına git
2. '...' butonuna tıkla
3. '...' alanını doldur
4. Hatayı gör

## ✅ Beklenen Davranış
Ne olmasını bekliyordunuz?

## 📱 Ekran Görüntüleri
Varsa ekran görüntüleri ekleyin.

## 🖥️ Ortam Bilgileri
- OS: [örn. Windows 10]
- Browser: [örn. Chrome 91]
- Version: [örn. 1.2.3]

## 📋 Ek Bilgiler
Başka eklemek istediğiniz bilgiler.
```

### Feature Request Template (.github/ISSUE_TEMPLATE/feature_request.md)
```markdown
---
name: Feature Request
about: Yeni bir özellik önermek için bu şablonu kullanın
title: '[FEATURE] '
labels: enhancement
assignees: ''
---

## 🚀 Özellik Açıklaması
Önerdiğiniz özelliğin net bir açıklaması.

## 💡 Motivasyon
Bu özellik hangi sorunu çözecek? Neden gerekli?

## 📋 Detaylı Açıklama
Özelliğin nasıl çalışmasını istiyorsunuz?

## 🎨 Mockup/Tasarım
Varsa tasarım önerilerinizi ekleyin.

## 📊 Kabul Kriterleri
- [ ] Kriter 1
- [ ] Kriter 2
- [ ] Kriter 3

## 🔗 İlgili Issue'lar
Bu özellik başka issue'larla ilgili mi?
```

### Pull Request Template (.github/PULL_REQUEST_TEMPLATE.md)
```markdown
## 📋 Değişiklik Özeti
Bu PR'da yapılan değişikliklerin kısa açıklaması.

## 🔗 İlgili Issue
Fixes #(issue numarası)

## 🧪 Test Edilen Durumlar
- [ ] Yeni özellik test edildi
- [ ] Mevcut özellikler etkilenmedi
- [ ] Responsive tasarım kontrol edildi
- [ ] Cross-browser uyumluluk test edildi

## 📱 Ekran Görüntüleri
Varsa UI değişikliklerinin ekran görüntüleri.

## ✅ Kontrol Listesi
- [ ] Kod review yapıldı
- [ ] Testler yazıldı/güncellendi
- [ ] Dokümantasyon güncellendi
- [ ] CHANGELOG.md güncellendi
- [ ] Breaking change yok (varsa açıklayın)

## 🔍 Review Notları
Reviewer'ların dikkat etmesi gereken özel durumlar.
```

---

## 👥 TEAM MANAGEMENT

### CODEOWNERS (.github/CODEOWNERS)
```bash
# Global owners
* @proje-yoneticisi @lead-developer

# Frontend
/frontend/ @frontend-developer @ui-designer

# Backend
/backend/ @backend-developer @database-admin

# Documentation
/docs/ @technical-writer @proje-yoneticisi

# CI/CD
/.github/ @devops-engineer @lead-developer

# Configuration
*.env.example @lead-developer
package.json @lead-developer
```

### Team Roles
```bash
# Repository Settings > Manage access
Roles:
- Admin: Proje Yöneticisi, Lead Developer
- Maintain: Senior Developers
- Write: Developers, Designers
- Triage: QA Engineers, Technical Writers
- Read: Stakeholders, Clients
```

---

## 🏷️ LABELS VE MILESTONES

### Labels
```bash
# Type
bug - Hata raporları
enhancement - Yeni özellik
documentation - Dokümantasyon
question - Soru

# Priority
priority-high - Yüksek öncelik
priority-medium - Orta öncelik
priority-low - Düşük öncelik

# Status
in-progress - Devam ediyor
needs-review - Review bekliyor
blocked - Engellenmiş
wontfix - Düzeltilmeyecek

# Component
frontend - Frontend ile ilgili
backend - Backend ile ilgili
database - Database ile ilgili
api - API ile ilgili
ui-ux - Tasarım ile ilgili

# Effort
effort-small - 1-2 gün
effort-medium - 3-5 gün
effort-large - 1-2 hafta
effort-xl - 2+ hafta
```

### Milestones
```bash
# Week 1: Infrastructure & Auth
Due date: 2024-02-07
Description: Temel altyapı ve authentication sistemi

# Week 2: Orphan & Family Management
Due date: 2024-02-14
Description: Yetim ve aile yönetimi modülü

# Week 3: Sponsor Management
Due date: 2024-02-21
Description: Sponsor yönetimi ve eşleştirme

# ... (12 haftalık plan için devam)
```

---

## 🔒 SECRETS YÖNETİMİ

### Repository Secrets
```bash
# Settings > Secrets and variables > Actions

# Supabase
SUPABASE_PROJECT_REF
SUPABASE_ACCESS_TOKEN
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY

# Vercel
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID

# WhatsApp
WHATSAPP_ACCESS_TOKEN
WHATSAPP_PHONE_NUMBER_ID

# Google Cloud
GOOGLE_CLOUD_PROJECT_ID
GOOGLE_CLOUD_PRIVATE_KEY
GOOGLE_CLOUD_CLIENT_EMAIL

# OpenAI
OPENAI_API_KEY

# Firebase
FIREBASE_SERVER_KEY
FIREBASE_PROJECT_ID
```

### Environment-specific Secrets
```bash
# Development
DEV_SUPABASE_URL
DEV_SUPABASE_ANON_KEY

# Staging
STAGING_SUPABASE_URL
STAGING_SUPABASE_ANON_KEY

# Production
PROD_SUPABASE_URL
PROD_SUPABASE_ANON_KEY
```

---

## 📊 PROJECT MANAGEMENT

### GitHub Projects Setup
```bash
# Projects > New project
Project name: Hayır Kurumu Yönetim Sistemi
Template: Feature planning
Views:
- Board view (Kanban)
- Table view (Spreadsheet)
- Roadmap view (Timeline)

# Custom fields
Priority: Single select (High, Medium, Low)
Effort: Single select (Small, Medium, Large, XL)
Component: Single select (Frontend, Backend, Database, API)
Assignee: Person
Status: Single select (Todo, In Progress, Review, Done)
```

### Automation Rules
```yaml
# Auto-assign labels based on file paths
- if: changed-files contains 'frontend/'
  then: add-label 'frontend'

- if: changed-files contains 'backend/'
  then: add-label 'backend'

# Auto-move cards
- if: pull-request opened
  then: move-to 'In Review'

- if: pull-request merged
  then: move-to 'Done'
```

---

## 📈 ANALYTICS VE INSIGHTS

### Repository Insights
```bash
# Insights > Pulse
- Haftalık aktivite özeti
- Merged PR'lar
- Closed issue'lar
- Yeni contributor'lar

# Insights > Contributors
- Commit istatistikleri
- Code contribution grafiği
- Aktif developer'lar

# Insights > Code frequency
- Eklenen/silinen satır sayısı
- Haftalık kod değişim grafiği

# Insights > Dependency graph
- Kullanılan paketler
- Güvenlik uyarıları
- Dependabot alerts
```

---

## 🔐 GÜVENLİK AYARLARI

### Security Features
```bash
# Settings > Security & analysis
- ✅ Dependency graph
- ✅ Dependabot alerts
- ✅ Dependabot security updates
- ✅ Code scanning alerts
- ✅ Secret scanning alerts

# Settings > Branches
- ✅ Restrict pushes that create files larger than 100MB
- ✅ Restrict pushes that contain private email addresses
```

### Security Policies
```markdown
# SECURITY.md
## Güvenlik Politikası

### Desteklenen Versiyonlar
| Version | Supported |
| ------- | --------- |
| 1.x.x   | ✅        |
| < 1.0   | ❌        |

### Güvenlik Açığı Bildirimi
Güvenlik açığı bulduysanız lütfen security@hayirkurumu.org adresine email gönderin.
```

---

## 📋 CONTRIBUTING GUIDE

### CONTRIBUTING.md
```markdown
# Katkıda Bulunma Rehberi

## 🚀 Başlangıç
1. Repository'yi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📝 Commit Mesaj Formatı
```
type(scope): subject

body

footer
```

Örnekler:
- `feat(auth): add login functionality`
- `fix(dashboard): resolve chart rendering issue`
- `docs(readme): update installation instructions`

## 🧪 Test Gereksinimleri
- Yeni özellikler için test yazın
- Mevcut testlerin geçtiğinden emin olun
- Code coverage %80'in üzerinde olmalı

## 📋 Code Review Süreci
1. Automated checks geçmeli
2. En az 1 approval gerekli
3. Conflicts resolve edilmeli
4. Documentation güncellenmiş olmalı
```

---

## ✅ GITHUB SETUP KONTROL LİSTESİ

### Repository Kurulumu
- [ ] Repository oluşturuldu
- [ ] Branch protection rules ayarlandı
- [ ] Team members eklendi
- [ ] Labels oluşturuldu
- [ ] Milestones oluşturuldu

### CI/CD Pipeline
- [ ] GitHub Actions workflows oluşturuldu
- [ ] Secrets eklendi
- [ ] Automated tests çalışıyor
- [ ] Deployment pipeline aktif

### Documentation
- [ ] README.md güncellendi
- [ ] CONTRIBUTING.md oluşturuldu
- [ ] Issue templates eklendi
- [ ] PR template eklendi
- [ ] SECURITY.md oluşturuldu

### Security
- [ ] Dependabot aktif
- [ ] Secret scanning aktif
- [ ] Code scanning aktif
- [ ] Security policy oluşturuldu

---

## 📞 GITHUB DESTEK KAYNAKLARI

### Dokümantasyon
- [GitHub Docs](https://docs.github.com)
- [GitHub Actions](https://docs.github.com/en/actions)
- [GitHub Security](https://docs.github.com/en/code-security)

### Best Practices
- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)

**GitHub repository hazır olduğunda, kod geliştirme sürecine başlayabiliriz!**