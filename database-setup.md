# Database Setup für Bachelor Thesis Study

## Supabase Setup

1. Erstellen Sie ein neues Supabase Projekt auf https://supabase.com
2. Notieren Sie sich die folgenden Werte aus den Project Settings:
   - Project URL
   - Anon/Public API Key

## Environment Variables

Erstellen Sie eine `.env` Datei für lokale Entwicklung:

```
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

Für Netlify Deployment, fügen Sie diese als Environment Variables hinzu.

## Database Schema

Führen Sie die folgenden SQL Commands in der Supabase SQL Editor aus:

### 1. Research Data Table (Anonyme Forschungsdaten)

```sql
CREATE TABLE research_data (
    id BIGSERIAL PRIMARY KEY,
    participant_id TEXT UNIQUE NOT NULL,
    
    -- Eligibility Data
    age INTEGER,
    country TEXT,
    role TEXT,
    
    -- Profile Data
    gender TEXT,
    school_type TEXT,
    teaching_experience TEXT,
    subjects TEXT,
    digital_experience TEXT,
    
    -- Consent (anonymized)
    consent_participation BOOLEAN,
    consent_data_processing BOOLEAN,
    
    -- SUS Data
    sus_responses JSONB,
    sus_score DECIMAL(5,2),
    
    -- Timestamps
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 2. Contact Data Table (Separate für DSGVO Compliance)

```sql
CREATE TABLE contact_data (
    id BIGSERIAL PRIMARY KEY,
    participant_id TEXT NOT NULL,
    email TEXT,
    consent_contact BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Foreign key relationship
    FOREIGN KEY (participant_id) REFERENCES research_data(participant_id)
);
```

### 3. Indexes für Performance

```sql
CREATE INDEX idx_research_data_participant_id ON research_data(participant_id);
CREATE INDEX idx_research_data_created_at ON research_data(created_at);
CREATE INDEX idx_contact_data_participant_id ON contact_data(participant_id);
```

### 4. Row Level Security (RLS) - Optional aber empfohlen

```sql
-- Enable RLS
ALTER TABLE research_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_data ENABLE ROW LEVEL SECURITY;

-- Policy für Insert (nur anonyme Daten)
CREATE POLICY "Enable insert for anonymous data" ON research_data
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable insert for contact data" ON contact_data
    FOR INSERT WITH CHECK (true);

-- Keine Select/Update/Delete Policies für zusätzliche Sicherheit
-- Nur Service Role kann Daten lesen
```

## DSGVO Compliance Features

### Datentrennung
- **research_data**: Enthält alle anonymisierten Forschungsdaten
- **contact_data**: Enthält nur Kontaktdaten (E-Mail) separat gespeichert
- Beide Tabellen sind über `participant_id` verknüpft, aber können unabhängig verwaltet werden

### Löschung von Kontaktdaten
```sql
-- Kontaktdaten eines Teilnehmers löschen (bei Widerspruch)
DELETE FROM contact_data WHERE participant_id = 'participant_id_here';

-- Forschungsdaten bleiben erhalten für wissenschaftliche Zwecke
```

### Datenexport für Teilnehmer
```sql
-- Alle Daten eines Teilnehmers exportieren
SELECT 
    r.*,
    c.email,
    c.consent_contact
FROM research_data r
LEFT JOIN contact_data c ON r.participant_id = c.participant_id
WHERE r.participant_id = 'participant_id_here';
```

## Installation von Dependencies

```bash
npm install @supabase/supabase-js
```

## Backup & Export

### Automatischer Export für Analyse
```sql
-- Alle Forschungsdaten für Analyse exportieren (ohne Kontaktdaten)
SELECT 
    age,
    country,
    role,
    gender,
    school_type,
    teaching_experience,
    subjects,
    digital_experience,
    sus_responses,
    sus_score,
    completed_at
FROM research_data
ORDER BY created_at;
```

### Lokaler Fallback
Die Anwendung speichert Daten automatisch im Browser localStorage wenn der Server nicht erreichbar ist. Verwenden Sie die `exportLocalData()` Funktion für manuellen Export.

## Monitoring

- Überwachen Sie die Supabase Dashboard für API Usage
- Prüfen Sie regelmäßig die Logs in Netlify Functions
- Backup der Datenbank vor wichtigen Meilensteinen

## Sicherheitshinweise

1. **Niemals** Service Role Keys im Frontend verwenden
2. RLS Policies korrekt konfigurieren
3. Environment Variables niemals in Git committen
4. Regelmäßige Backups erstellen
5. API Rate Limits beachten