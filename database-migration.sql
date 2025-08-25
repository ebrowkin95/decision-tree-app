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

-- 3. Interview-related columns vollständig entfernen
ALTER TABLE research_data DROP COLUMN IF EXISTS consent_interview;
ALTER TABLE research_data DROP COLUMN IF EXISTS consent_recording;  
ALTER TABLE research_data DROP COLUMN IF EXISTS consent_transcription;
ALTER TABLE research_data DROP COLUMN IF EXISTS consent_quotes;
ALTER TABLE research_data DROP COLUMN IF EXISTS interview_contact;

-- 4. Neue Fragebogen-Spalten hinzufügen
ALTER TABLE research_data ADD COLUMN IF NOT EXISTS planning_frequency TEXT;
ALTER TABLE research_data ADD COLUMN IF NOT EXISTS traffic_source TEXT;
-- Situation tracking columns
ALTER TABLE research_data ADD COLUMN IF NOT EXISTS selected_situation_id TEXT;
ALTER TABLE research_data ADD COLUMN IF NOT EXISTS framework_path_taken JSONB;
ALTER TABLE research_data ADD COLUMN IF NOT EXISTS path_matches_situation BOOLEAN;
ALTER TABLE research_data ADD COLUMN IF NOT EXISTS path_match_details JSONB;
ALTER TABLE research_data ADD COLUMN IF NOT EXISTS likert_responses JSONB;
ALTER TABLE research_data ADD COLUMN IF NOT EXISTS open_responses JSONB;

-- Session tracking columns for duplicate detection
ALTER TABLE research_data ADD COLUMN IF NOT EXISTS session_token TEXT;
ALTER TABLE research_data ADD COLUMN IF NOT EXISTS submission_count INTEGER DEFAULT 1;
ALTER TABLE research_data ADD COLUMN IF NOT EXISTS is_repeated_submission BOOLEAN DEFAULT FALSE;
ALTER TABLE research_data ADD COLUMN IF NOT EXISTS session_duration_minutes INTEGER;
ALTER TABLE research_data ADD COLUMN IF NOT EXISTS browser_info JSONB;

-- Email-related fields should not be in research_data (moved to contact_data)
-- Remove email if it exists in research_data to ensure separation
ALTER TABLE research_data DROP COLUMN IF EXISTS email;

-- 5. Zeit-basierte Qualitätskontrolle Spalten hinzufügen (robusteres Format)
ALTER TABLE research_data ADD COLUMN IF NOT EXISTS completion_time_total_minutes DECIMAL(10,2);
ALTER TABLE research_data ADD COLUMN IF NOT EXISTS completion_time_framework_minutes DECIMAL(10,2);
ALTER TABLE research_data ADD COLUMN IF NOT EXISTS completion_time_survey_minutes DECIMAL(10,2);

-- Interview-Felder wurden bereits oben entfernt

-- 6. Neue Analysis View erstellen (ohne Kontaktdaten, mit Zeit-Daten und Session-Tracking)
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
    traffic_source,
    consent_participation,
    consent_data_processing,
    sus_responses,
    sus_score,
    likert_responses,
    open_responses,
    completion_time_total_minutes,
    completion_time_framework_minutes,
    completion_time_survey_minutes,
    selected_situation_id,
    framework_path_taken,
    path_matches_situation,
    path_match_details,
    session_token,
    submission_count,
    is_repeated_submission,
    session_duration_minutes,
    browser_info,
    completed_at,
    created_at
FROM research_data
ORDER BY created_at;

-- 6. Interview-Kontakte View entfernt (nicht mehr benötigt)

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

-- 9. Session-Analyse View für Duplicate Detection
CREATE VIEW session_analysis AS
SELECT
    session_token,
    COUNT(*) as total_submissions,
    MIN(created_at) as first_submission,
    MAX(created_at) as last_submission,
    MAX(submission_count) as highest_submission_count,
    BOOL_OR(is_repeated_submission) as has_repeated_submissions,
    AVG(completion_time_total_minutes) as avg_completion_time,
    STRING_AGG(DISTINCT participant_id, ', ') as participant_ids,
    STRING_AGG(DISTINCT selected_situation_id, ', ') as situations_used
FROM research_data 
WHERE session_token IS NOT NULL
GROUP BY session_token
HAVING COUNT(*) > 1
ORDER BY total_submissions DESC, first_submission DESC;

-- 10. Contact-Tabelle für getrennte E-Mail-Speicherung
CREATE TABLE IF NOT EXISTS contact_data (
    id SERIAL PRIMARY KEY,
    participant_id TEXT NOT NULL,
    email TEXT,
    consent_results_contact BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for efficient lookup
CREATE INDEX IF NOT EXISTS idx_contact_participant_id ON contact_data(participant_id);

-- 11. Erfolgreiche Migration bestätigen
SELECT 'Session-Tracking, Situation-System und getrennte E-Mail-Speicherung erfolgreich eingerichtet!' as status;

-- 10. Prüfen der neuen Struktur
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'research_data'
  AND column_name LIKE '%completion_time%'
ORDER BY ordinal_position;