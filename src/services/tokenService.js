// Token Service - Frontend Integration für Token-basierte Survey-Kontrolle

class TokenService {
  constructor() {
    this.baseUrl = '/.netlify/functions'
    this.currentToken = this.getStoredToken()
  }

  // Token aus localStorage laden
  getStoredToken() {
    try {
      const tokenData = localStorage.getItem('survey_token')
      if (!tokenData) return null
      
      const parsed = JSON.parse(tokenData)
      
      // Prüfen ob Token abgelaufen ist
      if (new Date(parsed.expiresAt) < new Date()) {
        this.clearToken()
        return null
      }
      
      return parsed
    } catch (error) {
      console.error('Error loading stored token:', error)
      this.clearToken()
      return null
    }
  }

  // Token im localStorage speichern
  storeToken(tokenData) {
    try {
      localStorage.setItem('survey_token', JSON.stringify(tokenData))
      this.currentToken = tokenData
    } catch (error) {
      console.error('Error storing token:', error)
    }
  }

  // Token aus localStorage entfernen
  clearToken() {
    localStorage.removeItem('survey_token')
    this.currentToken = null
  }

  // Neuen Token nach Screener anfordern
  async generateToken(screenerData) {
    try {
      console.log('Requesting token from:', `${this.baseUrl}/generate-token`)
      console.log('Screener data:', screenerData)
      
      const response = await fetch(`${this.baseUrl}/generate-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(screenerData)
      })

      console.log('Response status:', response.status)
      console.log('Response headers:', response.headers)

      // Check if response has content
      const responseText = await response.text()
      console.log('Response text:', responseText)

      if (!responseText || responseText.trim() === '') {
        throw new Error(`Empty response from server (Status: ${response.status})`)
      }

      let data
      try {
        data = JSON.parse(responseText)
      } catch (parseError) {
        console.error('JSON parse error:', parseError)
        throw new Error(`Invalid JSON response: ${responseText.substring(0, 100)}...`)
      }

      console.log('Response data:', data)

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}: Failed to generate token`)
      }

      if (data.success && data.token) {
        const tokenData = {
          token: data.token,
          expiresAt: data.expiresAt,
          generatedAt: new Date().toISOString()
        }
        
        this.storeToken(tokenData)
        return tokenData
      }

      throw new Error('Invalid token response')

    } catch (error) {
      console.error('Token generation error:', error)
      
      // Fallback für alle Function-Probleme
      if (error.message.includes('Empty response') || 
          error.message.includes('Invalid JSON') || 
          error.message.includes('Failed to fetch') ||
          error.message.includes('404')) {
        
        console.log('Function error detected, using fallback token generation...')
        
        // Lokaler Fallback-Token
        const fallbackToken = {
          token: `fallback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          generatedAt: new Date().toISOString(),
          isFallback: true
        }
        
        this.storeToken(fallbackToken)
        return fallbackToken
      }
      
      throw error
    }
  }

  // Survey mit Token-Validierung submitten
  async submitSurveyWithToken(surveyData) {
    if (!this.currentToken) {
      throw new Error('No valid token available. Please restart the survey.')
    }

    try {
      const response = await fetch(`${this.baseUrl}/submit-survey`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: this.currentToken.token,
          surveyData: surveyData
        })
      })

      const responseText = await response.text()
      
      if (!responseText || responseText.trim() === '') {
        throw new Error(`Empty response from submit endpoint (Status: ${response.status})`)
      }

      let data
      try {
        data = JSON.parse(responseText)
      } catch (parseError) {
        throw new Error(`Invalid JSON response from submit: ${responseText.substring(0, 100)}...`)
      }

      if (!response.ok) {
        // Token-spezifische Fehlerbehandlung
        if (data.code === 'TOKEN_INVALID' || data.code === 'TOKEN_EXPIRED') {
          this.clearToken()
        }
        throw new Error(data.error || 'Failed to submit survey')
      }

      if (data.success) {
        // Token nach erfolgreicher Submission entfernen
        this.clearToken()
        return data
      }

      throw new Error('Invalid submission response')

    } catch (error) {
      console.error('Survey submission error:', error)
      
      // Bei Function-Problemen: Fallback trigger
      if (error.message.includes('Empty response') || 
          error.message.includes('Invalid JSON') || 
          error.message.includes('Failed to fetch')) {
        // Trigger fallback in dataService.js
        error.message = 'Functions unavailable: ' + error.message
      }
      
      throw error
    }
  }

  // Prüfen ob gültiger Token vorhanden
  hasValidToken() {
    return this.currentToken !== null
  }

  // Token-Status für UI
  getTokenStatus() {
    if (!this.currentToken) {
      return { valid: false, reason: 'no_token' }
    }

    const now = new Date()
    const expiresAt = new Date(this.currentToken.expiresAt)
    
    if (expiresAt < now) {
      this.clearToken()
      return { valid: false, reason: 'expired' }
    }

    const timeLeft = expiresAt - now
    const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60))
    const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))

    return {
      valid: true,
      expiresAt: this.currentToken.expiresAt,
      timeLeft: { hours: hoursLeft, minutes: minutesLeft },
      timeLeftText: `${hoursLeft}h ${minutesLeft}m`
    }
  }

  // Für Admin/Debug: Alle Tokens anzeigen
  async getTokenStats() {
    try {
      const response = await fetch(`${this.baseUrl}/token-stats`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch token stats')
      }

      return await response.json()

    } catch (error) {
      console.error('Token stats error:', error)
      throw error
    }
  }
}

// Singleton Export
export const tokenService = new TokenService()
export default tokenService