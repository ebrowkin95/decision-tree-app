# 🔧 GIT SETUP FÜR NETLIFY DEPLOYMENT

## ✅ **Git Repository ist bereit!**

Ihr Projekt ist bereits ein vollständiges Git-Repository mit allen Commits.

---

## 🚀 **OPTIONEN FÜR DEPLOYMENT:**

### **Option A: GitHub Integration (Empfohlen)**

1. **GitHub Repository erstellen:**
   - Gehen Sie zu [GitHub.com](https://github.com)
   - Klicken Sie auf "New Repository"
   - Name: `decision-tree-app` oder Ihren Wunschnamen
   - **Wichtig:** Nicht initialisieren (keine README, .gitignore)

2. **Repository mit GitHub verbinden:**
   ```bash
   git remote add origin https://github.com/USERNAME/REPOSITORY-NAME.git
   git branch -M main
   git push -u origin main
   ```

3. **Netlify mit GitHub verbinden:**
   - Netlify Dashboard → "New site from Git"
   - GitHub Repository auswählen
   - Build Settings werden automatisch erkannt!

### **Option B: Direkte Netlify Git Integration**

1. **Netlify CLI installieren** (optional):
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify init
   ```

2. **Oder via Netlify Dashboard:**
   - "Deploy with Git"
   - Repository URL eingeben
   - Build Settings automatisch

---

## 📋 **NETLIFY BUILD SETTINGS:**

Wenn manuell konfiguriert:
```
Build command: npm run build
Publish directory: dist
Functions directory: netlify/functions
```

**Environment Variables:**
```
VITE_SUPABASE_URL=https://yyzxwutjdeykrataqxmm.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

---

## 🎯 **NACH DEM DEPLOYMENT:**

### **Erwartetes Ergebnis:**
- ✅ **"2 functions deployed"** im Netlify Dashboard
- ✅ **Build successful** 
- ✅ **Site live** mit funktionierendem Token-System

### **Testing:**
1. **Screener ausfüllen** → Token generiert
2. **Framework durchlaufen** → Token bleibt gültig
3. **Survey abschließen** → Token als "used" markiert
4. **Supabase prüfen** → participation_tokens Tabelle gefüllt

---

## 🔍 **TROUBLESHOOTING:**

### **"No functions deployed":**
- ✅ **Bereits gefixt** - Functions verwenden jetzt CommonJS
- ✅ **package.json** in netlify/functions/ vorhanden
- ✅ **netlify.toml** konfiguriert

### **Token-Errors:**
- Umgebungsvariablen in Netlify prüfen
- Supabase URL/Key korrekt gesetzt
- tokens-table.sql ausgeführt

---

## 🎉 **BEREIT FÜR DEPLOYMENT!**

Das Repository ist vollständig vorbereitet:
- ✅ **Alle Dateien committed**
- ✅ **Functions fixed**
- ✅ **Documentation complete**
- ✅ **Token system ready**

**Nächster Schritt:** GitHub Repository erstellen und mit Netlify verbinden!