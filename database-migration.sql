-- Migration Script für bestehende Datenbank
-- Führen Sie diese Commands in Ihrer Supabase SQL-Konsole aus

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
ALTER TABLE research_data ADD COLUMN IF NOT EXISTS likert_responses JSONB;
ALTER TABLE research_data ADD COLUMN IF NOT EXISTS open_responses JSONB;

-- 4. interview_contact Spalte ist bereits vorhanden, prüfen
-- ALTER TABLE research_data ADD COLUMN IF NOT EXISTS interview_contact TEXT;

-- 5. Neue Analysis View erstellen (ohne Kontaktdaten)
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

-- 7. Erfolgreiche Migration bestätigen
SELECT 'Datenbank-Migration erfolgreich abgeschlossen!' as status;

-- 8. Prüfen der neuen Struktur
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'research_data'
ORDER BY ordinal_position;