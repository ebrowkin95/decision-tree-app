-- Initial Schema für Decision Tree App
-- Erstellt alle notwendigen Tabellen und Views

-- 1. Research Data Table (Anonyme Forschungsdaten)
CREATE TABLE IF NOT EXISTS research_data (
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
    completion_time_total_minutes DECIMAL(10,2),
    completion_time_framework_minutes DECIMAL(10,2),
    completion_time_survey_minutes DECIMAL(10,2),
    
    -- Timestamps
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Contact Data Table (Separate für DSGVO Compliance)
CREATE TABLE IF NOT EXISTS contact_data (
    id BIGSERIAL PRIMARY KEY,
    participant_id TEXT NOT NULL,
    email TEXT,
    consent_contact BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Indexes für Performance
CREATE INDEX IF NOT EXISTS idx_research_data_participant_id ON research_data(participant_id);
CREATE INDEX IF NOT EXISTS idx_research_data_created_at ON research_data(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_data_participant_id ON contact_data(participant_id);

-- 4. Row Level Security (RLS) aktivieren
ALTER TABLE research_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_data ENABLE ROW LEVEL SECURITY;

-- 5. Policies für Insert (nur anonyme Daten einfügen erlauben)
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Enable insert for research data') THEN
        CREATE POLICY "Enable insert for research data" ON research_data
            FOR INSERT WITH CHECK (true);
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Enable insert for contact data') THEN
        CREATE POLICY "Enable insert for contact data" ON contact_data
            FOR INSERT WITH CHECK (true);
    END IF;
END $$;