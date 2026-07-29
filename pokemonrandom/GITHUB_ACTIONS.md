# 🤖 GitHub Actions — النشر التلقائي

تم تجهيز 3 workflows للنشر التلقائي على GitHub Actions:

## 📁 ملفات الـ Workflows

```
.github/workflows/
├── deploy-cloudflare.yml    ← النشر على Cloudflare Pages (الرئيسي)
├── deploy-vercel.yml        ← النشر على Vercel (بديل)
└── code-quality.yml         ← فحص الكود قبل الدمج
```

---

## 🌩️ 1. النشر على Cloudflare Pages

### متى يعمل؟
- عند كل push إلى `main`
- عند كل Pull Request (preview deployment)
- يدوياً من تبويب Actions

### المتغيرات المطلوبة في GitHub Secrets:

اذهب إلى: **GitHub repo → Settings → Secrets and variables → Actions → New repository secret**

| Secret | مطلوب؟ | الوصف |
|--------|--------|--------|
| `CLOUDFLARE_API_TOKEN` | ✅ نعم | Cloudflare API token |
| `CLOUDFLARE_ACCOUNT_ID` | ✅ نعم | Cloudflare Account ID |
| `NEXT_PUBLIC_SITE_URL` | ✅ نعم | `https://pokemonrandom.com` |
| `ADMIN_PASSWORD` | ✅ نعم | كلمة مرور الأدمن |
| `NEXT_PUBLIC_GA_ID` | اختياري | Google Analytics ID |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | اختياري | AdSense Publisher ID |
| `NEXT_PUBLIC_AD_SLOT_HEADER` | اختياري | Slot ID للإعلان العلوي |
| `NEXT_PUBLIC_AD_SLOT_INCONTENT` | اختياري | Slot ID للإعلان داخل المحتوى |
| `NEXT_PUBLIC_AD_SLOT_SIDEBAR` | اختياري | Slot ID للإعلان الجانبي |
| `NEXT_PUBLIC_AD_SLOT_FOOTER` | اختياري | Slot ID للإعلان السفلي |
| `NEXT_PUBLIC_AD_SLOT_MOBILE` | اختياري | Slot ID للإعلان على الجوال |
| `NEXT_PUBLIC_SEARCH_CONSOLE` | اختياري | Search Console verification token |

### كيفية الحصول على Cloudflare API Token:

1. اذهب إلى **[dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)**
2. اضغط **"Create Token"**
3. اختر template: **"Edit Cloudflare Workers"** (أو أنشئ مخصص)
4. الصلاحيات المطلوبة:
   - **Account** → **Cloudflare Pages** → **Edit**
5. انسخ الـ Token وأضفه كـ GitHub Secret باسم `CLOUDFLARE_API_TOKEN`

### كيفية الحصول على Cloudflare Account ID:

1. في Cloudflare Dashboard، انظر إلى الـ URL:
   ```
   https://dash.cloudflare.com/ACCOUNT_ID
   ```
2. أو: **Workers & Pages → أي مشروع → Settings**
3. انسخ الـ Account ID وأضفه باسم `CLOUDFLARE_ACCOUNT_ID`

---

## ▲ 2. النشر على Vercel (بديل)

> 💡 **ملاحظة**: Vercel يوفر GitHub integration أصلي أبسط من Actions.
> استخدم هذا الـ workflow فقط لو تريد تحكماً كاملاً.

### المتغيرات المطلوبة:

| Secret | الوصف |
|--------|--------|
| `VERCEL_TOKEN` | من [vercel.com/account/tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | من Vercel Project Settings |
| `VERCEL_PROJECT_ID` | من Vercel Project Settings |

---

## 🔍 3. فحص جودة الكود

### متى يعمل؟
- عند كل push
- عند كل Pull Request

### ماذا يفحص؟
1. **TypeScript types** (tsc --noEmit)
2. **ESLint** (lint)
3. **Build success** (محاولة build)

### النتيجة:
- ✅ إذا نجح → جاهز للدمج
- ❌ إذا فشل ESLint → يمنع الدمج
- ⚠️ إذا فشل TypeScript/Build → تحذير فقط (لا يمنع)

---

## 🚀 خطوات التفعيل (5 دقائق)

### 1️⃣ ارفع الكود إلى GitHub

```bash
cd pokemonrandom
git init
git add .
git commit -m "Initial release - Pokemon Random"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/pokemonrandom.git
git push -u origin main
```

### 2️⃣ أضف GitHub Secrets

اذهب إلى: **GitHub repo → Settings → Secrets and variables → Actions**

أضف على الأقل:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `NEXT_PUBLIC_SITE_URL` = `https://pokemonrandom.com`
- `ADMIN_PASSWORD` = `ضع_كلمة_مرور_قوية`

### 3️⃣ فعّل Workflows

بمجرد رفع الكود، GitHub سيكتشف الـ workflows تلقائياً. اذهب إلى:
**GitHub repo → Actions tab**

سترى:
- ✅ Deploy to Cloudflare Pages
- ✅ Deploy to Vercel
- ✅ Code Quality

### 4️⃣ استعرض النشر

1. اذهب إلى **Actions** tab
2. اضغط على أحدث workflow run
3. سترى خطوات البناء خطوة بخطوة
4. عند النجاح، ستجد رابط النشر في **Job Summary**

---

## 📊 مراقبة الـ Workflows

### في GitHub:
- **Actions tab** → تاريخ كل النشرات
- أخضر ✅ = نجح
- أحمر ❌ = فشل (اضغط لرؤية اللوجز)
- أصفر 🟡 = قيد التنفيذ

### في Cloudflare:
- **Workers & Pages → pokemonrandom**
- تبويب **Deployments** → كل النشرات
- تبويب **Analytics** → الإحصائيات

---

## 🔄 النشر التلقائي عند التعديل

كل ما عليك بعد أي تعديل:

```bash
git add .
git commit -m "وصف التعديل"
git push origin main
```

GitHub Actions سيتكفل بالباقي:
1. ✅ فحص جودة الكود
2. 🔨 بناء المشروع
3. 🚀 نشره على Cloudflare Pages
4. 📝 إضافة Deployment Summary

**الوقت المتوقع**: 3-5 دقائق من الـ push حتى يكون الموقع محدّثاً.

---

## ⚠️ مشاكل شائعة وحلولها

### 1. "CLOUDFLARE_API_TOKEN not found"
**الحل**: أضف الـ Secret في GitHub repo settings.

### 2. "Build failed: Cannot find module @cloudflare/next-on-pages"
**الحل**: الـ workflow يُثبّته تلقائياً عبر `npx`. لو استمر الخطأ، أضفه كـ dependency:
```bash
bun add -D @cloudflare/next-on-pages
```

### 3. "Project not found: pokemonrandom"
**الحل**: أنشئ المشروع في Cloudflare Pages أولاً (Connect to Git مرة واحدة)، ثم الـ workflow سيتعرف عليه.

### 4. النشر ينجح لكن الموقع فارغ
**الحل**: تأكد أن `output: "standalone"` موجود في `next.config.ts`.

### 5. متغيرات البيئة لا تظهر في الموقع
**الحل**: أضفها في GitHub Secrets، الـ workflow سيُمررها تلقائياً للبناء.

---

## 📝 سكربت التحقق قبل النشر

تم إضافة سكربت `scripts/pre-deploy-check.js` يفحص 61 نقطة قبل النشر:

```bash
bun scripts/pre-deploy-check.js
# أو
bun run predeploy
```

### ماذا يفحص؟
- ✅ الملفات الأساسية موجودة
- ✅ الصفحات القانونية موجودة (مطلوبة لـ AdSense)
- ✅ أصول SEO موجودة (OG image, favicons, manifest)
- ✅ ملفات الإعداد موجودة (next.config, tsconfig, إلخ)
- ✅ كل المكونات (17 مكوّن)
- ✅ ملفات lib (5 ملفات)
- ✅ متغيرات البيئة في .env.example

النتيجة الحالية:
```
✅ Passed:   61
⚠️  Warnings: 0
❌ Failed:   0
🎉 All checks passed! Ready to deploy.
```

---

## 🎯 workflow النشر الأمثل

```
أنت تعدّل الكود
       ↓
git commit + git push
       ↓
GitHub Actions يعمل تلقائياً
       ↓
┌───────────────────────────────────┐
│ 1. Checkout code                  │
│ 2. Setup Bun + Node.js            │
│ 3. Install dependencies           │
│ 4. Lint check                     │
│ 5. Build for Cloudflare Pages     │
│ 6. Deploy to Cloudflare Pages     │
│ 7. Output deployment summary      │
└───────────────────────────────────┘
       ↓
بعد 3-5 دقائق
       ↓
موقعك محدّث على pokemonrandom.com 🎉
```

---

## 💡 نصائح احترافية

### 1. استخدم Branch Protection
- **Settings → Branches → Add rule**
- Require status checks to pass before merging
- اختر `Code Quality` كـ required check

### 2. فعّل Deployment Status في GitHub
- الـ workflow يُضيف deployment status تلقائياً
- سترى ✓ أحمر/أخضر بجانب كل commit

### 3. أضف Slack/Discord Notifications (اختياري)
أضف هذا في نهاية workflow:
```yaml
- name: Notify Slack
  if: always()
  uses: slackapi/slack-github-action@v1
  with:
    slack-message: "Deploy status: ${{ job.status }}"
  env:
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
```

### 4. استخدم Preview Deployments لكل PR
الـ workflow يدعمها تلقائياً — كل PR يُنشئ preview URL في Cloudflare Pages.

---

## ✅ قائمة التحقق النهائية

- [ ] رفعت الكود إلى GitHub
- [ ] أضفت `CLOUDFLARE_API_TOKEN` كـ Secret
- [ ] أضفت `CLOUDFLARE_ACCOUNT_ID` كـ Secret
- [ ] أضفت `NEXT_PUBLIC_SITE_URL` = `https://pokemonrandom.com`
- [ ] أضفت `ADMIN_PASSWORD` قوية
- [ ] ذهبت إلى Actions tab ورأيت الـ workflows
- [ ] أول نشر نجح (أخضر ✅)
- [ ] الموقع يعمل على `xxx.pages.dev`
- [ ] ربطت `pokemonrandom.com` في Cloudflare
- [ ] اختبرت جميع الصفحات

🎉 **مبروك! نشر تلقائي يعمل.**

---

## 📢 4. الإشعارات (Slack + Discord)

### كيف تعمل؟
- الـ workflow `notify.yml` هو **reusable workflow** يمكن استدعاؤه من أي workflow آخر
- الـ workflow `deploy-cloudflare.yml` يستدعيه تلقائياً بعد كل نشر

### الإعداد:
1. أنشئ webhook في Slack أو Discord (انظر التعليمات في `notify.yml`)
2. أضف الـ webhook URL كـ GitHub Secret:
   - `SLACK_WEBHOOK_URL` (لـ Slack)
   - `DISCORD_WEBHOOK_URL` (لـ Discord)

### ماذا سترى؟
- ✅ عند نجاح النشر: رسالة خضراء مع رابط الموقع
- ❌ عند فشل النشر: رسالة حمراء مع رابط اللوجز
- 🚫 عند الإلغاء: رسالة رمادية

### شكل الرسالة (Slack):
```
🚀 Deploy Succeeded

Repository:  pokemonrandom
Environment: production
Branch:      main
Commit:      abc1234

Commit Message: Add new Pokemon tool

[🌐 Visit Site] [📊 View Workflow]
```

---

## 📨 5. إرسال Sitemap لـ Google تلقائياً

### متى يعمل؟
- تلقائياً بعد كل نشر ناجح
- كل يوم اثنين الساعة 9 صباحاً UTC (resubmission للـ crawls الجديدة)
- يدوياً من تبويب Actions

### ماذا يفعل؟
1. ✅ يتحقق أن `sitemap.xml` قابل للوصول
2. 📨 يرسل ping إلى Google
3. 📨 يرسل ping إلى Bing
4. 📨 (اختياري) يُرسل عبر Search Console API

### الإعداد الاختياري (Search Console API):
لتفعيل الـ API (أقوى من الـ ping)، أضف:
- `GOOGLE_CLIENT_EMAIL` — service account email
- `GOOGLE_PRIVATE_KEY` — service account private key
- `SEARCH_CONSOLE_PROPERTY` — `https://pokemonrandom.com`

بدون هذه، الـ workflow يستخدم الـ ping endpoints فقط (لا يزال يعمل).

---

## 🔦 6. Lighthouse Audit تلقائي

### متى يعمل؟
- تلقائياً بعد كل نشر ناجح
- كل يوم أحد الساعة 2 صباحاً UTC
- يدوياً من تبويب Actions

### ماذا يفعل؟
- يفحص 7 صفحات (Homepage + 6 أقسام)
- يقيس 4 مقاييس:
  - **Performance** (>= 80%)
  - **Accessibility** (>= 90%)
  - **Best Practices** (>= 90%)
  - **SEO** (>= 90%)

### النتائج:
- 📊 تُعرض في **Job Summary**
- 📁 تُرفع كـ artifact (تبقى 30 يوم)
- ❌ يفشل الـ workflow لو نزل Accessibility أو SEO تحت 90%

### الإعداد:
لا يحتاج أي secrets — يستخدم Lighthouse CI action جاهز.

---

## 📝 7. GitHub Issue Templates

تم إضافة 4 قوالب للـ Issues:

### 📋 القوالب المتاحة:
| القالب | الاستخدام |
|--------|----------|
| 🐛 **Bug Report** | للإبلاغ عن أخطاء |
| ✨ **Feature Request** | لطلب ميزات جديدة |
| 🎮 **New Tool Suggestion** | لاقتراح أدوات بوكيمون جديدة |
| 📧 **Contact Links** | روابط لصفحات التواصل |

### كيف يظهر للمستخدمين:
عند الضغط على **"New Issue"** في GitHub، سيرى المستخدم:
- 3 خيارات واضحة (Bug, Feature, New Tool)
- روابط سريعة (Contact, FAQ, DMCA, Privacy)

كل قالب يحتوي على:
- ✅ حقول منظمة (dropdowns, checkboxes)
- ✅ خطوات واضحة للإعادة (للـ bugs)
- ✅ checklist للتأكد من جودة البلاغ
- ✅ Labels تلقائية (bug, enhancement, etc.)

---

## 🔄 8. Pull Request Template

تم إضافة قالب PR شامل يحتوي على:
- 📋 وصف التغييرات
- 🎯 نوع التغيير (bug, feature, breaking, إلخ)
- 🧪 خطوات الاختبار
- 📸 لقطات شاشة
- ✅ Checklist قبل الدمج (lint, responsive, dark mode, accessibility)
- 📊 تأثير الأداء

---

## 📊 ملخص كل الـ Workflows

| Workflow | الوظيفة | التشغيل |
|----------|---------|---------|
| `code-quality.yml` | فحص الكود | عند كل push/PR |
| `deploy-cloudflare.yml` | النشر على Cloudflare | عند كل push لـ main |
| `deploy-vercel.yml` | النشر على Vercel (بديل) | عند كل push لـ main |
| `notify.yml` | إشعارات Slack/Discord | يُستدعى من workflows أخرى |
| `submit-sitemap.yml` | إرسال sitemap لـ Google | بعد كل نشر + أسبوعياً |
| `lighthouse-audit.yml` | فحص الأداء | بعد كل نشر + أسبوعياً |

---

## 🎯 سيناريو كامل للنشر التلقائي

```
1. أنت تعدّل الكود محلياً
2. git commit + git push
3. GitHub Actions يعمل تلقائياً:
   ┌─────────────────────────────────────┐
   │ 1. Code Quality (lint + types)      │
   │ 2. Build + Deploy to Cloudflare     │
   │ 3. Notify Slack + Discord           │
   │ 4. Submit Sitemap to Google + Bing  │
   │ 5. Run Lighthouse Audit             │
   └─────────────────────────────────────┘
4. بعد 5-10 دقائق، تتلقى:
   ✅ إشعار Slack: "Deploy Succeeded"
   ✅ إشعار Discord: نفس الشيء
   ✅ Search Console: تم تحديث الـ sitemap
   ✅ Lighthouse Report: متاح في Actions tab
5. موقعك محدّث ومُراقب تلقائياً 🎉
```

---

## ⚠️ ملاحظات مهمة

1. **notify.yml يحتاج slack/discord secrets** — بدونه لا يرسل إشعارات
2. **submit-sitemap.yml يعمل بدون API** — يستخدم ping endpoints فقط
3. **lighthouse-audit.yml لا يحتاج secrets** — جاهز للعمل فوراً
4. **Issue Templates تعمل تلقائياً** — بمجرد رفعها على GitHub

