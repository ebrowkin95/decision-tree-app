import { createClient } from '@supabase/supabase-js';
import { tokenService } from './tokenService.js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://yyzxwutjdeykrataqxmm.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5enh3dXRqZGV5a3JhdGFxeG1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0NDQ3NTYsImV4cCI6MjA3MTAyMDc1Nn0.dXuqWZ6-L_i8F2KNSO5CTTVr224Bl6NjIkwwfKuJYdU';

const supabase = createClient(supabaseUrl, supabaseKey);

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/.netlify/functions' 
  : 'http://localhost:8888/.netlify/functions';

// Generate Token nach Screener-Validierung
export const generateParticipationToken = async (screenerData) => {
  try {
    return await tokenService.generateToken(screenerData);
  } catch (error) {
    console.error('Token generation failed:', error);
    
    // Fallback für Development oder wenn Functions nicht verfügbar sind
    if (error.message.includes('404') || 
        error.message.includes('Failed to fetch') || 
        error.message.includes('Empty response') ||
        error.message.includes('Invalid JSON') ||
        process.env.NODE_ENV === 'development') {
      console.log('Functions not available, using fallback token generation...');
      
      // Einfacher lokaler Token für Development
      const fallbackToken = {
        token: `dev_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        generatedAt: new Date().toISOString(),
        isFallback: true
      };
      
      // Token im localStorage speichern wie normaler Token
      localStorage.setItem('survey_token', JSON.stringify(fallbackToken));
      
      return fallbackToken;
    }
    
    throw error;
  }
};

// Neue Token-basierte Submission
export const submitStudyData = async (data) => {
  try {
    // Token-basierte Submission verwenden
    return await tokenService.submitSurveyWithToken(data);
  } catch (error) {
    console.error('Token-based submission failed:', error);
    
    // Fallback zu alter Methode für Development/Notfall oder Function Errors
    if (process.env.NODE_ENV === 'development' || 
        error.message.includes('404') || 
        error.message.includes('Failed to fetch') ||
        error.message.includes('Functions unavailable') ||
        error.message.includes('Empty response') ||
        error.message.includes('Invalid JSON')) {
      console.log('Falling back to direct Supabase...');
      return await submitStudyDataDirect(data);
    }
    
    throw error;
  }
};

// Legacy-Methode für Development-Fallback
const submitStudyDataDirect = async (data) => {
  try {
    console.log('Attempting to submit data to Supabase directly...');
    
    const { participantData, susResponses, susScore, likertResponses, openResponses, completedAt } = data;
    const { email, ...profileData } = participantData;

    // Generate a unique participant ID
    const participantId = `p_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Store anonymous research data
    const researchData = {
      participant_id: participantId,
      age_confirmation: profileData.ageConfirmation,
      country: profileData.country,
      role: profileData.role,
      gender: profileData.gender,
      school_type: profileData.schoolType,
      teaching_experience: profileData.teachingExperience,
      subjects: profileData.subjects,
      digital_experience: profileData.digitalExperience,
      consent_participation: profileData.consentParticipation,
      consent_data_processing: profileData.consentDataProcessing,
      consent_contact: profileData.consentContact,
      consent_interview: profileData.consentInterview,
      consent_recording: profileData.consentRecording,
      consent_transcription: profileData.consentTranscription,
      consent_quotes: profileData.consentQuotes,
      interview_contact: profileData.interviewContact,
      sus_responses: susResponses,
      sus_score: susScore,
      likert_responses: likertResponses,
      open_responses: openResponses,
      completed_at: completedAt || new Date().toISOString(),
    };

    console.log('Inserting research data:', researchData);

    const { data: researchResult, error: researchError } = await supabase
      .from('research_data')
      .insert([researchData]);

    if (researchError) {
      console.error('Supabase research data error:', researchError);
      throw new Error(`Supabase error: ${researchError.message}`);
    }

    console.log('Research data inserted successfully:', researchResult);

    // Store contact data separately if provided
    if (email && email.trim()) {
      const contactData = {
        participant_id: participantId,
        email: email.trim(),
        consent_contact: participantData.consentContact || false,
      };

      console.log('Inserting contact data:', contactData);

      const { data: contactResult, error: contactError } = await supabase
        .from('contact_data')
        .insert([contactData]);

      if (contactError) {
        console.warn('Contact data insertion failed:', contactError);
      } else {
        console.log('Contact data inserted successfully:', contactResult);
      }
    }

    return { success: true, participantId, method: 'direct_supabase' };

  } catch (error) {
    console.error('Direct Supabase submission failed:', error);
    throw error;
  }
};

// Token-Status Helpers
export const hasValidToken = () => tokenService.hasValidToken();
export const getTokenStatus = () => tokenService.getTokenStatus();
export const clearToken = () => tokenService.clearToken();

// Local storage fallback for development/offline usage
export const saveDataLocally = (data) => {
  try {
    const timestamp = new Date().toISOString();
    const participantId = `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const dataWithId = {
      ...data,
      participantId,
      savedAt: timestamp,
      isLocal: true
    };

    // Get existing data
    const existingData = localStorage.getItem('studyData');
    const allData = existingData ? JSON.parse(existingData) : [];
    
    // Add new data
    allData.push(dataWithId);
    
    // Save back to localStorage
    localStorage.setItem('studyData', JSON.stringify(allData));
    
    return { success: true, participantId, isLocal: true };
  } catch (error) {
    console.error('Error saving data locally:', error);
    throw new Error('Failed to save data locally');
  }
};

// Function to export local data (for manual backup)
export const exportLocalData = () => {
  try {
    const data = localStorage.getItem('studyData');
    if (!data) return null;

    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `study-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('Error exporting local data:', error);
    return false;
  }
};