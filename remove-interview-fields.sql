-- Script to remove interview-related columns from existing database
-- Run this in your Supabase SQL console if you already have interview columns

-- 1. Drop the interview contacts view first (if it exists)
DROP VIEW IF EXISTS interview_contacts_view;

-- 2. Remove interview-related columns from research_data table
ALTER TABLE research_data DROP COLUMN IF EXISTS consent_interview;
ALTER TABLE research_data DROP COLUMN IF EXISTS consent_recording;
ALTER TABLE research_data DROP COLUMN IF EXISTS consent_transcription;
ALTER TABLE research_data DROP COLUMN IF EXISTS consent_quotes;
ALTER TABLE research_data DROP COLUMN IF EXISTS interview_contact;

-- 3. Recreate analysis_view without interview fields
DROP VIEW IF EXISTS analysis_view;

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
    completed_at,
    created_at
FROM research_data
ORDER BY created_at;

-- 4. Confirm successful removal
SELECT 'Interview fields successfully removed!' as status;

-- 5. Check remaining columns in research_data table
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'research_data'
ORDER BY ordinal_position;