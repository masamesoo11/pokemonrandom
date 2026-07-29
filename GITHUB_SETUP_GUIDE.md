# 📚 دليل إنشاء حساب GitHub من الصفر

دعنا نبدأ من الصفر تماماً — حتى لو لم يكن لديك حساب GitHub.

---

## 🎯 الخطوة 1: إنشاء حساب GitHub (3 دقائق)

### 1.1 اذهب لصفحة التسجيل
افتح: **[github.com/signup](https://github.com/signup)**

### 1.2 املأ البيانات

| الحقل | ماذا تكتب |
|-------|-----------|
| **Enter your email** | بريدك الإلكتروني (يفضل Gmail) |
| **Create a password** | كلمة مرور قوية (8+ أحرف + أرقام + رموز) |
| **Enter a username** | اختر username قصيراً (مثل: `ahmed1990`) |
| **Email preferences** | ألغِ التحديد (لا نحتاج إعلانات) |

### 1.3 تحقق من البريد
- ستصلك رسالة من GitHub على بريدك
- اضغط على رابط التحقق فيها
- ✅ تم! حسابك جاهز

### 1.4 (اختياري) فعّل 2FA للأمان
- **Settings → Password and authentication → Two-factor authentication**
- اختر: Authenticator app (مثل Google Authenticator)
- امسح QR code
- أدخل الكود من التطبيق
- احفظ recovery codes في مكان آمن

---

## 🎯 الخطوة 2: إنشاء مستودع جديد (2 دقيقة)

### 2.1 اذهب لصفحة المستودع الجديد
افتح: **[github.com/new](https://github.com/new)**

أو من أي صفحة في GitHub:
- اضغط **`+`** في أعلى اليمين
- اختر **New repository**

### 2.2 املأ إعدادات المستودع

| الحقل | القيمة |
|-------|--------|
| **Owner** | حسابك (مكتوب تلقائياً) |
| **Repository name** | `pokemonrandom` |
| **Description** | `Free Random Pokemon Generator — 1025 Pokemon, 9 Generations` |
| **Visibility** | ⬤ Public (موصى به — مجاني + AdSense يحبه) |
| **Add a README file** | ❌ لا تختره (المشروع يحتوي README) |
| **Add .gitignore** | ❌ لا تختره (المشروع يحتوي .gitignore) |
| **Choose a license** | ❌ لا تختره (المشروع يحتوي MIT) |

### 2.3 اضغط **Create repository**

✅ سترى صفحة المستودع الفارغة مع روابط جاهزة للنسخ

---

## 🎯 الخطوة 3: إنشاء Personal Access Token (2 دقيقة)

> ⚠️ **مهم**: GitHub توقف عن قبول كلمات المرور في الـ Terminal. تحتاج Token.

### 3.1 اذهب لإعدادات الـ Tokens
1. اضغط صورة حسابك في أعلى اليمين → **Settings**
2. من القائمة الجانبية: **Developer settings** (في آخر القائمة)
3. **Personal access tokens** → **Tokens (classic)**
4. اضغط **Generate new token** → **Generate new token (classic)**

### 3.2 املأ إعدادات الـ Token

| الحقل | القيمة |
|-------|--------|
| **Note** | `Pokemon Random deployment` |
| **Expiration** | `90 days` (أو No expiration لو تريد) |
| **Select scopes** | ✅ حدد `repo` (كل البطاقة) — هذا يُفعّل كل ما يلزم |
| **workflow** | ✅ حدده أيضاً (لو سترفع GitHub Actions) |
| **read:org** | ✅ (اختياري) |

### 3.3 احفظ الـ Token
- اضغط **Generate token** في آخر الصفحة
- **انسخ الـ Token فوراً** (لن تراه مرة أخرى!)
- احفظه في مكان آمن (مثل password manager)
- شكله مثل: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

---

## 🎯 الخطوة 4: تثبيت Git على جهازك (3 دقائق)

### لو تستخدم Windows:
1. نزّل من: **[git-scm.com/download/win](https://git-scm.com/download/win)**
2. شغّل الـ installer
3. اترك كل الإعدادات افتراضية → Next → Next → Install
4. افتح **Command Prompt** أو **PowerShell**

### لو تستخدم Mac:
1. افتح Terminal
2. اكتب: `git --version`
3. لو طُلب منك تثبيت Xcode Command Line Tools، وافق
4. أو نزّل من: **[git-scm.com/download/mac](https://git-scm.com/download/mac)**

### لو تستخدم Linux:
```bash
# Ubuntu/Debian
sudo apt update && sudo apt install git

# Fedora
sudo dnf install git

# Arch
sudo pacman -S git
```

### تحقق من التثبيت:
```bash
git --version
# يجب أن ترى: git version 2.XX.X
```

---

## 🎯 الخطوة 5: إعداد Git (30 ثانية)

افتح Terminal/CMD واكتب (مرة واحدة فقط):

```bash
git config --global user.name "اسمك الحقيقي أو username"
git config --global user.email "your-email@example.com"
git config --global init.defaultBranch main
```

مثال:
```bash
git config --global user.name "Ahmed Ali"
git config --global user.email "ahmed@gmail.com"
git config --global init.defaultBranch main
```

---

## 🎯 الخطوة 6: رفع المشروع لـ GitHub (3 دقائق)

### 6.1 انسخ ملف المشروع لجهازك
1. حمّل `pokemonrandom-deploy.zip` من المعاينة
2. أنشئ مجلداً على جهازك: `C:\projects\pokemonrandom` (أو أي مكان)
3. فك ضغط الـ ZIP داخل هذا المجلد

### 6.2 شغّل سكربت الإعداد
في Terminal/CMD (داخل مجلد المشروع):

```bash
# لو على Windows/Mac/Linux:
cd path/to/pokemonrandom
./setup-github.sh

# لو على Windows والـ .sh لا يعمل:
# استخدم Git Bash (يُثبّت مع Git)
```

✅ السكربت سيعمل تلقائياً ويجهز كل شيء

### 6.3 اربط المستودع بـ GitHub
انسخ هذا الأمر مع تعديل `YOUR_USERNAME`:

```bash
git remote add origin https://github.com/YOUR_USERNAME/pokemonrandom.git
git branch -M main
git push -u origin main
```

### 6.4 أدخل بيانات الاعتماد
عند الطلب:

| الحقل | القيمة |
|-------|--------|
| **Username** | اسم المستخدم في GitHub |
| **Password** | الـ Token الذي نسخته في الخطوة 3 (وليس كلمة مرور حسابك!) |

✅ **مبروك!** المشروع الآن على GitHub

---

## 🎯 الخطوة 7: التحقق (30 ثانية)

1. افتح: `https://github.com/YOUR_USERNAME/pokemonrandom`
2. سترى كل الملفات
3. تأكد أن:
   - ✅ ملف `README.md` يُعرض تلقائياً
   - ✅ مجلد `.github/workflows` يحتوي على 6 ملفات
   - ✅ مجلد `src/app/admin` موجود
   - ✅ ملف `.env.example` موجود

---

## 🆘 حل المشاكل الشائعة

### ❌ "Authentication failed"
- تأكد أنك تستخدم الـ **Token** وليس كلمة المرور
- تأكد أن الـ Token لم تنتهِ صلاحيته
- تأكد أن الـ Token يملك صلاحية `repo`

### ❌ "Permission denied (publickey)"
أنت تستخدم SSH بدلاً من HTTPS. استخدم HTTPS:
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/pokemonrandom.git
```

### ❌ "Repository not found"
- تأكد أن اسم المستخدم صحيح
- تأكد أنك أنشأت المستودع باسم `pokemonrandom`
- تأكد أن الـ Token يملك صلاحية `repo`

### ❌ "fatal: not a git repository"
أنت لست في المجلد الصحيح. انتقل لمجلد المشروع:
```bash
cd path/to/pokemonrandom
```

### ❌ "git: command not found"
Git غير مثبت. ارجع للخطوة 4.

### ❌ "error: failed to push some refs"
المستودع البعيد يحتوي على ملفات (README مثلاً). احذفها أولاً:
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```
أو احذف المستودع على GitHub وأنشئه فارغاً بدون README.

---

## 💡 نصائح احترافية

### 1. استخدم GitHub Desktop (للمبتدئين)
لو Terminal صعب، نزّل **[desktop.github.com](https://desktop.github.com)** — واجهة رسومية سهلة.

### 2. استخدم Git Credential Manager
على Windows، Git يأتي معه. يحفظ بياناتك تلقائياً.

### 3. احفظ الـ Token بشكل آمن
- ❌ لا تضعه في الكود
- ❌ لا تشاركه مع أحد
- ✅ استخدم password manager (1Password, Bitwarden)
- ✅ أو ضعه في `~/.git-credentials` (محمي)

### 4. فعّل 2FA على GitHub
- **Settings → Password and authentication → Two-factor authentication**
- مهم جداً لحسابات المطورين

---

## ✅ بعد النجاح، الخطوة التالية

بمجرد أن يصبح الكود على GitHub، اذهب لـ:

### 🌩️ ربط Cloudflare Pages
1. [dash.cloudflare.com](https://dash.cloudflare.com) → Workers & Pages
2. Create → Pages → Connect to Git
3. اختر مستودع `pokemonrandom`
4. اتبع الإعدادات في `CLOUDFLARE_DEPLOY.md`

### 🤖 تفعيل GitHub Actions
1. في مستودع GitHub → **Settings → Secrets → Actions**
2. أضف: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `NEXT_PUBLIC_SITE_URL`, `ADMIN_PASSWORD`
3. اذهب لـ **Actions tab** → شوف الـ workflows تعمل

---

## 📞 لو احتجت مساعدة

أخبرني بـ:
1. **رسالة الخطأ الكاملة** (نسخ/لصق)
2. **في أي خطوة وقفت**
3. **نظام التشغيل** (Windows/Mac/Linux)

سأساعدك فوراً! 🚀
