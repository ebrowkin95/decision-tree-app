# 🌐 NETLIFY SETUP - GitHub Verbindung

## 🎯 **Problem:** Netlify erkennt GitHub Pushes nicht automatisch

**Ursache:** Das GitHub Repository ist noch nicht mit Netlify verbunden.

---

## 🚀 **LÖSUNG: Manuelle Verbindung (2 Minuten)**

### **Schritt 1: Netlify Dashboard öffnen**
1. **Gehen Sie zu:** https://app.netlify.com/
2. **Login** mit Ihrem Account

### **Schritt 2: Site aus GitHub Repository erstellen**
1. **"Add new site"** → **"Import an existing project"**
2. **"Deploy with GitHub"** wählen
3. **Repository auswählen:** `ebrowkin95/decision-tree-app`
4. **Branch:** `main` 
5. **Build settings:**
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. **"Deploy site"** klicken

### **Schritt 3: Environment Variables hinzufügen**
1. **Site Dashboard** → **"Site settings"**
2. **"Environment variables"** → **"Add variable"**
3. **Hinzufügen:**
   ```
   VITE_SUPABASE_URL = https://yyzxwutjdeykrataqxmm.supabase.co
   VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5enh3dXRqZGV5a3JhdGFxeG1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0NDQ3NTYsImV4cCI6MjA3MTAyMDc1Nn0.dXuqWZ6-L_i8F2KNSO5CTTVr224Bl6NjIkwwfKuJYdU
   ```

---

## ✅ **NACH DER VERBINDUNG:**

### **Vollautomatisches System:**
```bash
npm run deploy
```

**Was passiert:**
1. ✅ **Build** (npm run build)
2. ✅ **Git Push** (zu GitHub)
3. ✅ **Netlify erkennt Push** (Auto-Deploy)
4. ✅ **Live App** (in ~2 Minuten)

### **Ihre App wird verfügbar unter:**
- **Netlify URL:** `https://[SITE-NAME].netlify.app`
- **Custom Domain** (optional einstellbar)

---

## 🔧 **Alternative: netlify.toml bereits erstellt**

Die Datei `netlify.toml` in Ihrem Repository enthält bereits die korrekten Build-Einstellungen:

```toml
[build]
  command = "npm run build"
  publish = "dist"
  
[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Netlify wird diese Einstellungen automatisch erkennen!**

---

## 🎯 **ERGEBNIS:**

Nach der Verbindung funktioniert das komplette automatisierte System:

**Lokale Entwicklung:**
```bash
npm run dev  # → http://localhost:5175
```

**Deployment:**
```bash
npm run deploy  # → GitHub → Netlify → Live!
```

**Das ist der letzte Schritt für vollständige Automatisierung!** 🚀