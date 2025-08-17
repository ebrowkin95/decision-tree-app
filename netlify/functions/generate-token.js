// Netlify Function: Token Generation
// Generiert einmalige Participation-Tokens nach Screener-Validierung

const { createClient } = require('@supabase/supabase-js')
const { v4: uuidv4 } = require('uuid')

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
)

exports.handler = async (event, context) => {
  // CORS Headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  }

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' }
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    // Client-Informationen extrahieren
    const clientIP = event.headers['x-forwarded-for'] || 
                    event.headers['x-real-ip'] || 
                    context.clientContext?.identity?.ip || 
                    'unknown'
    
    const userAgent = event.headers['user-agent'] || 'unknown'
    
    // Prüfen auf mehrfache Token-Anfragen von derselben IP (Rate Limiting)
    const { data: recentTokens, error: checkError } = await supabase
      .from('participation_tokens')
      .select('issued_at')
      .eq('ip_address', clientIP)
      .gte('issued_at', new Date(Date.now() - 5 * 60 * 1000).toISOString()) // 5 Minuten
    
    if (checkError) {
      console.error('Database check error:', checkError)
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Database error during validation' })
      }
    }

    // Rate Limiting: Max 1 Token pro 5 Minuten pro IP
    if (recentTokens && recentTokens.length > 0) {
      return {
        statusCode: 429,
        headers,
        body: JSON.stringify({ 
          error: 'Rate limit exceeded. Please wait before requesting a new token.',
          waitTime: 300 // 5 Minuten in Sekunden
        })
      }
    }

    // Screener-Daten validieren (aus Request Body)
    const requestData = JSON.parse(event.body || '{}')
    const { ageConfirmation, country, role } = requestData

    // Screener-Validierung
    if (!ageConfirmation || !country || !role) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Screener validation failed. All fields required.',
          details: { ageConfirmation, country, role }
        })
      }
    }

    // Generiere sicheren Token (UUID v4)
    const token = uuidv4()

    // Token in Datenbank speichern
    const { data: insertedToken, error: insertError } = await supabase
      .from('participation_tokens')
      .insert({
        token: token,
        ip_address: clientIP,
        user_agent: userAgent,
        is_used: false
      })
      .select()
      .single()

    if (insertError) {
      console.error('Token insert error:', insertError)
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to generate token' })
      }
    }

    // Erfolgreiche Response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        token: token,
        message: 'Token generated successfully. Please complete the survey within 24 hours.',
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24h
      })
    }

  } catch (error) {
    console.error('Function error:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    }
  }
}