-- Migration Script für bestehende Datenbank
-- Führen Sie diese Commands in Ihrer Supabase SQL-Konsole aus

-- 0. Token-System komplett entfernen (falls vorhanden)
DROP TABLE IF EXISTS participation_tokens CASCADE;
DROP VIEW IF EXISTS token_stats;
DROP FUNCTION IF EXISTS cleanup_expired_tokens();

-- 1. Bestehende Views ZUERST löschen (sie blockieren Spalten-Änderungen)
DROP VIEW IF EXISTS analysis_view;
DROP VIEW IF EXISTS interview_contacts_view;

-- 2. Alte age Spalte entfernen und neue age_confirmation hinzufügen
ALTER TABLE research_data DROP COLUMN IF EXISTS age;
ALTER TABLE research_data ADD COLUMN IF NOT EXISTS age_confirmation BOOLEAN;

-- 3. Neue Consent-Spalten hinzufügen
ALTER TABLE research_data ADD COLUMN IF NOT EXISTS consent_interview BOOLEAN;
ALTER TABLE research_data ADD COLUMN IF NOT EXISTS consent_recording BOOLEAN;
ALTER TABLE research_data ADD COLUMN IF NOT EXISTS consent_transcription BOOLEAN;
ALTER TABLE research_data ADD COLUMN IF NOT EXISTS consent_quotes BOOLEAN;

-- 4. Neue Fragebogen-Spalten hinzufügen
ALTER TABLE research_data ADD COLUMN IF NOT EXISTS planning_frequency TEXT;
ALTER TABLE research_data ADD COLUMN IF NOT EXISTS likert_responses JSONB;
ALTER TABLE research_data ADD COLUMN IF NOT EXISTS open_responses JSONB;

-- 5. Zeit-basierte Qualitätskontrolle Spalten hinzufügen (robusteres Format)
ALTER TABLE research_data ADD COLUMN IF NOT EXISTS completion_time_total_minutes DECIMAL(10,2);
ALTER TABLE research_data ADD COLUMN IF NOT EXISTS completion_time_framework_minutes DECIMAL(10,2);
ALTER TABLE research_data ADD COLUMN IF NOT EXISTS completion_time_survey_minutes DECIMAL(10,2);

-- 4. interview_contact Spalte ist bereits vorhanden, prüfen
-- ALTER TABLE research_data ADD COLUMN IF NOT EXISTS interview_contact TEXT;

-- 6. Neue Analysis View erstellen (ohne Kontaktdaten, mit Zeit-Daten)
CREATE VIEW analysis_view AS
SELECT
    age_confirmation,
    country,
    role,
    gender,
    school_type,
    teaching_experience,
    subjects,
    digital_experience,
    planning_frequency,
    consent_participation,
    consent_data_processing,
    consent_interview,
    consent_recording,
    consent_transcription,
    consent_quotes,
    sus_responses,
    sus_score,
    likert_responses,
    open_responses,
    completion_time_total_minutes,
    completion_time_framework_minutes,
    completion_time_survey_minutes,
    completed_at,
    created_at
FROM research_data
ORDER BY created_at;

-- 6. Interview-Kontakte View erstellen (nur für berechtigte Forscher)
CREATE VIEW interview_contacts_view AS
SELECT
    participant_id,
    consent_interview,
    interview_contact,
    consent_recording,
    consent_transcription,
    consent_quotes,
    created_at
FROM research_data
WHERE consent_interview = true
  AND interview_contact IS NOT NULL
  AND trim(interview_contact) != ''
ORDER BY created_at;

-- 8. Neue View für Qualitätsanalyse (Zeit-basiert)
CREATE VIEW quality_analysis AS
SELECT
    participant_id,
    completion_time_total_minutes,
    completion_time_framework_minutes,
    completion_time_survey_minutes,
    CASE 
        WHEN completion_time_total_minutes < 2 THEN 'Poor'
        WHEN completion_time_total_minutes > 60 THEN 'Questionable' 
        WHEN completion_time_framework_minutes >= 1 
         AND completion_time_survey_minutes >= 2 
         AND completion_time_total_minutes BETWEEN 3 AND 30 THEN 'Excellent'
        ELSE 'Good'
    END as quality_rating,
    sus_score,
    created_at
FROM research_data 
WHERE completion_time_total_minutes IS NOT NULL
ORDER BY created_at;

-- 9. Erfolgreiche Migration bestätigen
SELECT 'Zeit-basierte Qualitätskontrolle erfolgreich eingerichtet!' as status;

-- 10. Prüfen der neuen Struktur
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'research_data'
  AND column_name LIKE '%completion_time%'
ORDER BY ordinal_position;