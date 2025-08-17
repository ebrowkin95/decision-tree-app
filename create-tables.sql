-- SQL Script für Supabase - Tabellen für Bachelor Thesis Study erstellen
-- Führen Sie diesen Code im Supabase SQL Editor aus

-- 1. Research Data Table (Anonyme Forschungsdaten)
CREATE TABLE research_data (
    id BIGSERIAL PRIMARY KEY,
    participant_id TEXT UNIQUE NOT NULL,
    
    -- Eligibility Data
    age_confirmation BOOLEAN,
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
    consent_contact BOOLEAN,
    consent_interview BOOLEAN,
    consent_recording BOOLEAN,
    consent_transcription BOOLEAN,
    consent_quotes BOOLEAN,
    interview_contact TEXT,
    
    -- SUS Data
    sus_responses JSONB,
    sus_score DECIMAL(5,2),
    likert_responses JSONB,
    open_responses JSONB,
    
    -- Zeit-basierte Qualitätskontrolle
    completion_time_total_minutes DECIMAL(8,2),
    completion_time_framework_minutes DECIMAL(8,2),
    completion_time_survey_minutes DECIMAL(8,2),
    
    -- Timestamps
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Contact Data Table (Separate für DSGVO Compliance)
CREATE TABLE contact_data (
    id BIGSERIAL PRIMARY KEY,
    participant_id TEXT NOT NULL,
    email TEXT,
    consent_contact BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Indexes für Performance
CREATE INDEX idx_research_data_participant_id ON research_data(participant_id);
CREATE INDEX idx_research_data_created_at ON research_data(created_at);
CREATE INDEX idx_contact_data_participant_id ON contact_data(participant_id);

-- 4. Row Level Security (RLS) aktivieren
ALTER TABLE research_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_data ENABLE ROW LEVEL SECURITY;

-- 5. Policies für Insert (nur anonyme Daten einfügen erlauben)
CREATE POLICY "Enable insert for research data" ON research_data
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable insert for contact data" ON contact_data
    FOR INSERT WITH CHECK (true);

-- 6. View für Datenanalyse (ohne Kontaktdaten)
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
    completion_time_total_minutes,
    completion_time_framework_minutes,
    completion_time_survey_minutes,
    completed_at,
    created_at
FROM research_data
ORDER BY created_at;

-- 7. View für Interview-Kontakte (nur für berechtigte Forscher)
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
WHERE consent_interview = true AND interview_contact IS NOT NULL AND trim(interview_contact) != ''
ORDER BY created_at;

-- Erfolgsmeldung
SELECT 'Tabellen erfolgreich erstellt! Ihr Framework ist bereit für die Datensammlung.' as status;