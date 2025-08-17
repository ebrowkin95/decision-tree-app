-- Views und Functions für Decision Tree App

-- 1. View für Datenanalyse (ohne Kontaktdaten)
CREATE OR REPLACE VIEW analysis_view AS
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
    completion_time_total_minutes,
    completion_time_framework_minutes,
    completion_time_survey_minutes,
    completed_at,
    created_at
FROM research_data
ORDER BY created_at;

-- 2. View für Interview-Kontakte (nur für berechtigte Forscher)
CREATE OR REPLACE VIEW interview_contacts_view AS
SELECT 
    participant_id,
    consent_interview,
    interview_contact,
    consent_recording,
    consent_transcription,
    consent_quotes,
    created_at
FROM research_data
WHERE consent_interview = true AND interview_contact IS NOT NULL AND trim(interview_contact) != ''
ORDER BY created_at;

-- 3. View für Qualitätsanalyse (Zeit-basiert)
CREATE OR REPLACE VIEW quality_analysis AS
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

-- 4. Function für Datenbereinigung (optional)
CREATE OR REPLACE FUNCTION cleanup_old_sessions()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    -- Entferne unvollständige Sessions älter als 24h
    DELETE FROM research_data 
    WHERE sus_responses IS NULL 
    AND created_at < NOW() - INTERVAL '24 hours';
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;