// Netlify Function: Survey Submission mit Token-Validierung
// Validiert Token und markiert ihn als "used" bei erfolgreicher Submission

const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
)

exports.handler = async (event, context) => {
  // CORS Headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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
    // Request-Daten extrahieren
    const requestData = JSON.parse(event.body || '{}')
    const { token, surveyData } = requestData

    if (!token) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Participation token required' })
      }
    }

    if (!surveyData) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Survey data required' })
      }
    }

    // Client-Informationen
    const clientIP = event.headers['x-forwarded-for'] || 
                    event.headers['x-real-ip'] || 
                    context.clientContext?.identity?.ip || 
                    'unknown'

    // 1. Token validieren (atomic operation)
    const { data: tokenData, error: tokenError } = await supabase
      .from('participation_tokens')
      .select('*')
      .eq('token', token)
      .eq('is_used', false)
      .single()

    if (tokenError || !tokenData) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ 
          error: 'Invalid or already used token',
          code: 'TOKEN_INVALID'
        })
      }
    }

    // 2. Token-Ablauf prüfen (24 Stunden)
    const tokenAge = Date.now() - new Date(tokenData.issued_at).getTime()
    const maxAge = 24 * 60 * 60 * 1000 // 24 Stunden
    
    if (tokenAge > maxAge) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ 
          error: 'Token has expired. Please request a new one.',
          code: 'TOKEN_EXPIRED'
        })
      }
    }

    // 3. Survey-Daten vorbereiten
    const {
      participantData,
      susResponses,
      susScore,
      likertResponses,
      openResponses,
      completedAt
    } = surveyData

    // Participant ID generieren
    const participantId = `participant_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // 4. Transaktion: Token markieren + Survey speichern
    // Erst Token als verwendet markieren
    const { error: updateError } = await supabase
      .from('participation_tokens')
      .update({
        is_used: true,
        used_at: new Date().toISOString()
      })
      .eq('token', token)
      .eq('is_used', false) // Double-check dass es noch unbenutzt ist

    if (updateError) {
      console.error('Token update error:', updateError)
      return {
        statusCode: 409,
        headers,
        body: JSON.stringify({ 
          error: 'Token already used or invalid',
          code: 'TOKEN_RACE_CONDITION'
        })
      }
    }

    // 5. Survey-Daten speichern
    const surveyRecord = {
      participant_id: participantId,
      // Eligibility Data
      age_confirmation: participantData.ageConfirmation,
      country: participantData.country,
      role: participantData.role,
      
      // Profile Data
      gender: participantData.gender,
      school_type: participantData.schoolType,
      teaching_experience: participantData.teachingExperience,
      subjects: participantData.subjects,
      digital_experience: participantData.digitalExperience,
      
      // Consent Data
      consent_participation: participantData.consentParticipation,
      consent_data_processing: participantData.consentDataProcessing,
      consent_contact: participantData.consentContact,
      consent_interview: participantData.consentInterview,
      consent_recording: participantData.consentRecording,
      consent_transcription: participantData.consentTranscription,
      consent_quotes: participantData.consentQuotes,
      interview_contact: participantData.interviewContact,
      
      // Survey Responses
      sus_responses: susResponses,
      sus_score: susScore,
      likert_responses: likertResponses,
      open_responses: openResponses,
      completed_at: completedAt || new Date().toISOString()
    }

    const { data: surveyResult, error: surveyError } = await supabase
      .from('research_data')
      .insert(surveyRecord)
      .select()
      .single()

    if (surveyError) {
      console.error('Survey insert error:', surveyError)
      
      // Rollback: Token wieder freigeben
      await supabase
        .from('participation_tokens')
        .update({
          is_used: false,
          used_at: null
        })
        .eq('token', token)

      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Failed to save survey data',
          details: surveyError.message
        })
      }
    }

    // 6. Kontaktdaten separat speichern (falls vorhanden)
    if (participantData.email && participantData.consentContact) {
      const { error: contactError } = await supabase
        .from('contact_data')
        .insert({
          participant_id: participantId,
          email: participantData.email,
          consent_contact: participantData.consentContact
        })

      if (contactError) {
        console.error('Contact data error:', contactError)
        // Fehler loggen, aber nicht die Survey-Submission fehlschlagen lassen
      }
    }

    // 7. Erfolgreiche Response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        participantId: participantId,
        message: 'Survey submitted successfully. Thank you for your participation!',
        voucher_eligible: true, // Für Gutschein-Verlosung
        submittedAt: new Date().toISOString()
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