# 🚨 WICHTIG: KOMPLETTES PROJEKT DEPLOYEN

## ❌ **Problem:** Nur dist/ Ordner uploaded

Wenn Sie nur den `dist/` Ordner hochladen:
- ❌ **Keine Functions** werden deployed
- ❌ **Keine netlify.toml** Konfiguration
- ❌ **Keine package.json** für Dependencies

---

## ✅ **LÖSUNG: Git-basiertes Deployment**

### **Option 1: GitHub Integration (Empfohlen)**

1. **GitHub Repository erstellen:**
   ```bash
   cd /Users/eddy/Desktop/decision-tree-app
   git add .
   git commit -m "Complete project with functions"
   git push origin main
   ```

2. **Netlify mit GitHub verbinden:**
   - Netlify Dashboard → "New site from Git"
   - GitHub Repository auswählen
   - **Build Settings:**
     - **Build command:** `npm run build`
     - **Publish directory:** `dist`
     - **Functions directory:** `netlify/functions` (automatisch erkannt)

### **Option 2: Komplettes Projekt-Zip**

1. **Gesamten Projekt-Ordner zippen:**
   ```
   decision-tree-app/
   ├── dist/                    (Build-Ausgabe)
   ├── netlify/
   │   ├── functions/
   │   │   ├── package.json
   │   │   ├── generate-token.js
   │   │   └── submit-survey.js
   ├── src/                     (Source Code)
   ├── netlify.toml             (WICHTIG!)
   ├── package.json             (WICHTIG!)
   └── ...
   ```

2. **Komplettes Zip zu Netlify:**
   - Nicht nur `dist/` sondern **ganzes Projekt**
   - Netlify erkennt `netlify.toml` und deployed Functions

---

## 🗄️ **SUPABASE TOKEN-TABELLE:**

Die Tabelle ist leer weil die Functions nicht laufen. Nach korrektem Deployment:

### **1. Token-Tabelle einrichten:**
```sql
-- Führen Sie tokens-table.sql in Supabase SQL Editor aus:

CREATE TABLE participation_tokens (
    id BIGSERIAL PRIMARY KEY,
    token TEXT UNIQUE NOT NULL,
    issued_at TIMESTAMPTZ DEFAULT NOW(),
    used_at TIMESTAMPTZ NULL,
    ip_address INET,
    user_agent TEXT,
    is_used BOOLEAN DEFAULT FALSE
);

-- + alle anderen Statements aus tokens-table.sql
```

### **2. Umgebungsvariablen in Netlify:**
```
VITE_SUPABASE_URL=https://yyzxwutjdeykrataqxmm.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

---

## 🎯 **ERWARTETES ERGEBNIS:**

Nach korrektem Deployment sollten Sie sehen:

### **Netlify Dashboard:**
- ✅ **"2 functions deployed"**
- ✅ **Build successful**
- ✅ **Headers/Redirects processed**

### **Supabase participation_tokens Tabelle:**
```sql
-- Nach erstem Token-Request:
SELECT * FROM participation_tokens;

-- Zeigt:
id | token | issued_at | used_at | ip_address | is_used
1  | uuid  | timestamp | null    | 1.2.3.4    | false
```

### **Browser Console:**
```
✅ Requesting token from: /.netlify/functions/generate-token
✅ Response status: 200
✅ Token generated successfully
```

---

## 🚀 **EMPFOHLENE SCHRITTE:**

1. **Git Repository erstellen** (falls noch nicht vorhanden)
2. **Netlify Git-Integration** statt Drag&Drop
3. **tokens-table.sql** in Supabase ausführen
4. **Umgebungsvariablen** in Netlify setzen
5. **Erste Survey testen** → Token sollte in DB erscheinen

**Das löst beide Probleme: Functions werden deployed UND Token-System funktioniert!** 🎉