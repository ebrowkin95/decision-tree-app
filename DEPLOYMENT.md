# Netlify Deployment Guide

## 🚀 Bereit für Deployment!

Der `dist` Ordner enthält alle benötigten Dateien für das Netlify-Deployment.

### 📁 Deployment-Dateien:
- `dist/index.html` - Haupt-HTML-Datei
- `dist/assets/` - Alle JS, CSS und Bild-Dateien
- `dist/vite.svg` - Favicon

### 🌐 Netlify Deployment-Optionen:

#### Option 1: Drag & Drop
1. Loggen Sie sich in [Netlify](https://netlify.com) ein
2. Gehen Sie zum Dashboard
3. Ziehen Sie den gesamten `dist` Ordner in das Deployment-Feld
4. Fertig! Ihre App ist live

#### Option 2: Git-Repository
1. Pushen Sie Ihren Code zu GitHub/GitLab
2. Verbinden Sie das Repository mit Netlify
3. Build-Settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node version:** 18 oder höher

### ⚙️ Netlify-Konfiguration

Die `netlify.toml` Datei ist bereits konfiguriert mit:
- Redirects für Single Page Application
- Build-Settings
- Error-Handling

### 🔐 Umgebungsvariablen

Setzen Sie diese in Netlify unter "Site settings" > "Environment variables":
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 📊 Features der App:
- ✅ Framework-Übersicht mit Zoom (0.25x - 8x)
- ✅ DSGVO-konforme Datenerfassung
- ✅ Mehrsprachig (Deutsch/Englisch)
- ✅ Interview-Terminvereinbarung
- ✅ SUS-Fragebogen
- ✅ Responsive Design

### 🗄️ Datenbank-Setup:
Führen Sie die SQL-Skripte aus:
1. `create-tables.sql` (für neue DB)
2. `database-migration.sql` (für bestehende DB)

### 🎯 App-URL wird sein:
`https://your-site-name.netlify.app`

Die App ist production-ready und DSGVO-konform! 🎉