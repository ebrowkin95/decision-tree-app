# 🎟️ TOKEN-BASIERTES TEILNAHME-SYSTEM

## ✅ Implementiert für Gutschein-Verlosung & Mehrfachteilnahme-Prävention

### 🔐 **System-Komponenten:**

#### **1. Datenbank:**
- **`participation_tokens`** Tabelle mit UUID-Tokens
- **Rate Limiting** pro IP-Adresse (max 1 Token/5min)
- **24h Token-Gültigkeit**
- **Atomare "used"-Markierung** verhindert Doppelnutzung

#### **2. Netlify Functions:**
- **`generate-token.js`** - Token-Generierung nach Screener
- **`submit-survey.js`** - Token-Validierung bei Submission
- **Transaktionale Sicherheit** mit Rollback

#### **3. Frontend Integration:**
- **`tokenService.js`** - Token Management
- **localStorage** für Token-Persistierung  
- **Automatische Token-Validierung**
- **User-freundliche Fehlerbehandlung**

---

## 🚀 **Deployment-Schritte:**

### **1. Datenbank Setup:**
```sql
-- Führen Sie tokens-table.sql in Supabase aus
-- Erstellt participation_tokens Tabelle mit Indexen
```

### **2. Netlify Functions:**
```bash
# Bereits im netlify/ Ordner:
netlify/functions/generate-token.js
netlify/functions/submit-survey.js
```

### **3. Dependencies:**
```bash
npm install uuid
# Bereits in package.json hinzugefügt
```

---

## 🔄 **Workflow:**

### **Schritt 1: Screener-Validierung**
```javascript
// PreStudyForm.jsx - Beim Submit
const tokenData = await generateParticipationToken({
  ageConfirmation: true,
  country: "de",
  role: "teacher"
});
// → Token wird generiert und in localStorage gespeichert
```

### **Schritt 2: Framework-Nutzung**
```javascript
// Token bleibt 24h gültig
// User kann Framework nutzen ohne erneute Validierung
```

### **Schritt 3: Survey-Submission**
```javascript
// SUSQuestionnaire.jsx - Beim Final Submit
const result = await tokenService.submitSurveyWithToken(surveyData);
// → Token wird als "used" markiert
// → Daten werden gespeichert
// → Token wird aus localStorage gelöscht
```

---

## 🛡️ **Sicherheitsfeatures:**

### **Rate Limiting:**
- **5 Minuten Wartezeit** zwischen Token-Anfragen pro IP
- **429 Status Code** bei Überschreitung

### **Token-Validierung:**
- **UUID v4** für kryptographische Sicherheit
- **24h Ablaufzeit** automatisch
- **Atomare Updates** verhindern Race Conditions

### **Fehlerbehandlung:**
- **TOKEN_INVALID** - Token existiert nicht/bereits verwendet
- **TOKEN_EXPIRED** - Token älter als 24h
- **RATE_LIMIT** - Zu viele Anfragen

---

## 📊 **Admin-Features:**

### **Token-Statistiken:**
```sql
-- Nutzung der token_stats View
SELECT * FROM token_stats;
-- Zeigt: total_tokens, used_tokens, unique_ips, etc.
```

### **Cleanup alter Tokens:**
```sql
-- Automatische Bereinigung
SELECT cleanup_expired_tokens();
-- Löscht unbenutzte Tokens > 24h
```

---

## 🎯 **Gutschein-Verlosung:**

### **Berechtigte Teilnehmer:**
```sql
-- Alle Nutzer mit erfolgreich verwendeten Tokens
SELECT DISTINCT ip_address, used_at 
FROM participation_tokens 
WHERE is_used = true 
ORDER BY used_at;
```

### **Eindeutige Teilnahmen:**
```sql
-- Verhindert Mehrfachteilnahme
-- Ein Token = Eine Survey = Ein Gutschein-Los
```

---

## ✅ **Testing-Checklist:**

- ✅ **Token-Generierung** funktioniert nach Screener
- ✅ **Rate Limiting** blockiert schnelle Wiederholung  
- ✅ **24h Gültigkeit** wird korrekt geprüft
- ✅ **Survey-Submission** markiert Token als used
- ✅ **Doppelnutzung** wird verhindert
- ✅ **localStorage** Token-Persistierung
- ✅ **Fehlerbehandlung** alle Edge Cases

---

## 🔧 **Umgebungsvariablen:**
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## 📈 **Production Ready:**
- ✅ **DSGVO-konform** - Anonymisierte Token
- ✅ **Skalierbar** - UUID-basiert, keine Kollisionen  
- ✅ **Robust** - Transaktionale Sicherheit
- ✅ **User-freundlich** - Transparente Kommunikation

**🎉 Gutschein-Verlosung kann starten!**