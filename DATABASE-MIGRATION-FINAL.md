# 🗄️ DATENBANK-MIGRATION ANLEITUNG

## ✅ **Migration von Token-System zu Zeit-basierter Qualitätskontrolle**

---

## 🚨 **WICHTIG: Führen Sie diese Migration aus!**

Das neue System benötigt andere Datenbank-Spalten. Die Migration:
- ❌ **Entfernt Token-System** (participation_tokens Tabelle)
- ✅ **Fügt Zeit-Spalten hinzu** für Qualitätskontrolle
- ✅ **Aktualisiert Views** für bessere Datenanalyse

---

## 📋 **MIGRATIONS-SCHRITTE:**

### **1. Supabase SQL Editor öffnen:**
- Gehen Sie zu Ihrem Supabase Dashboard
- Klicken Sie auf "SQL Editor"
- Erstellen Sie eine neue Query

### **2. Migration ausführen:**
```sql
-- Kopieren Sie den kompletten Inhalt von database-migration.sql
-- und führen Sie ihn aus
```

### **3. Erwartetes Ergebnis:**
```
✅ Token-System entfernt
✅ Zeit-Spalten hinzugefügt  
✅ Views aktualisiert
✅ "Zeit-basierte Qualitätskontrolle erfolgreich eingerichtet!"
```

---

## 🔍 **Was die Migration macht:**

### **Entfernt (Token-System):**
```sql
DROP TABLE participation_tokens CASCADE;
DROP VIEW token_stats;
DROP FUNCTION cleanup_expired_tokens();
```

### **Fügt hinzu (Zeit-System):**
```sql
ALTER TABLE research_data ADD COLUMN completion_time_total_minutes DECIMAL(8,2);
ALTER TABLE research_data ADD COLUMN completion_time_framework_minutes DECIMAL(8,2);  
ALTER TABLE research_data ADD COLUMN completion_time_survey_minutes DECIMAL(8,2);
```

### **Neue Quality-Analysis View:**
```sql
CREATE VIEW quality_analysis AS
SELECT 
    participant_id,
    completion_time_total_minutes,
    CASE 
        WHEN completion_time_total_minutes < 2 THEN 'Poor'
        WHEN completion_time_total_minutes > 60 THEN 'Questionable'
        WHEN completion_time_framework_minutes >= 1 
         AND completion_time_survey_minutes >= 2 THEN 'Excellent'
        ELSE 'Good'
    END as quality_rating
FROM research_data;
```

---

## 🎯 **Nach der Migration verfügbar:**

### **Qualitäts-Queries:**
```sql
-- Alle hochwertigen Antworten
SELECT * FROM quality_analysis WHERE quality_rating = 'Excellent';

-- Durchschnittliche Zeiten
SELECT AVG(completion_time_total_minutes) FROM research_data;

-- Qualitätsverteilung
SELECT quality_rating, COUNT(*) FROM quality_analysis GROUP BY quality_rating;
```

### **Datenanalyse:**
```sql
-- Framework-Engagement vs. SUS-Score
SELECT 
    completion_time_framework_minutes,
    AVG(sus_score) as avg_sus_score
FROM research_data 
WHERE completion_time_framework_minutes IS NOT NULL
GROUP BY completion_time_framework_minutes
ORDER BY completion_time_framework_minutes;
```

---

## ⚠️ **Hinweise:**

### **Bestehende Daten:**
- Alte Daten behalten alle bisherigen Spalten
- Zeit-Spalten sind NULL für alte Einträge
- Neue Submissions haben automatisch Zeit-Daten

### **Backup (optional):**
```sql
-- Vor Migration: Backup erstellen
CREATE TABLE research_data_backup AS SELECT * FROM research_data;
```

### **Rollback (falls nötig):**
```sql
-- Falls etwas schiefgeht, alten Zustand wiederherstellen
DROP TABLE research_data;
ALTER TABLE research_data_backup RENAME TO research_data;
```

---

## 🎉 **Bereit für neue Datenqualität!**

Nach der Migration sammelt das System automatisch:
- ✅ **Engagement-Zeiten** für wissenschaftliche Auswertung
- ✅ **Qualitätsbewertungen** für Datenfilterung  
- ✅ **Bessere Insights** für Bachelor-Thesis
- ✅ **Automatische Fake-Detection**

**Migration ausführen → Deployment → Datensammlung kann beginnen! 🚀**