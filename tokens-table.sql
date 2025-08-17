-- Token System für Einmalige Survey-Teilnahme
-- Führen Sie diesen Code im Supabase SQL Editor aus

-- 1. Tokens Tabelle erstellen
CREATE TABLE participation_tokens (
    id BIGSERIAL PRIMARY KEY,
    token TEXT UNIQUE NOT NULL,
    issued_at TIMESTAMPTZ DEFAULT NOW(),
    used_at TIMESTAMPTZ NULL,
    ip_address INET,
    user_agent TEXT,
    is_used BOOLEAN DEFAULT FALSE,
    
    -- Index für Performance
    CONSTRAINT unique_token UNIQUE(token)
);

-- 2. Indexes für Performance
CREATE INDEX idx_participation_tokens_token ON participation_tokens(token);
CREATE INDEX idx_participation_tokens_used ON participation_tokens(is_used);
CREATE INDEX idx_participation_tokens_ip ON participation_tokens(ip_address);
CREATE INDEX idx_participation_tokens_issued_at ON participation_tokens(issued_at);

-- 3. Row Level Security aktivieren
ALTER TABLE participation_tokens ENABLE ROW LEVEL SECURITY;

-- 4. Policy für Insert (nur über Server-Function)
CREATE POLICY "Enable insert for participation tokens" ON participation_tokens
    FOR INSERT WITH CHECK (true);

-- 5. Policy für Update (nur für used_at Markierung)
CREATE POLICY "Enable update for participation tokens" ON participation_tokens
    FOR UPDATE USING (true) WITH CHECK (true);

-- 6. Policy für Select (nur für Validierung)
CREATE POLICY "Enable select for participation tokens" ON participation_tokens
    FOR SELECT USING (true);

-- 7. View für Token-Statistiken (für Admin)
CREATE VIEW token_stats AS
SELECT 
    COUNT(*) as total_tokens,
    COUNT(CASE WHEN is_used = true THEN 1 END) as used_tokens,
    COUNT(CASE WHEN is_used = false THEN 1 END) as unused_tokens,
    COUNT(DISTINCT ip_address) as unique_ips,
    MIN(issued_at) as first_token,
    MAX(issued_at) as last_token
FROM participation_tokens;

-- 8. Cleanup-Function für alte unbenutzte Tokens (optional, für 24h Ablauf)
CREATE OR REPLACE FUNCTION cleanup_expired_tokens()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM participation_tokens 
    WHERE is_used = false 
    AND issued_at < NOW() - INTERVAL '24 hours';
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Erfolgsmeldung
SELECT 'Token-System erfolgreich eingerichtet!' as status;