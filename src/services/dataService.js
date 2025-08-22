import { createClient } from '@supabase/supabase-js';
import { compareFrameworkPaths } from '../data/teachingSituations.js';
import { getSessionTrackingData, incrementSubmissionCount } from '../utils/sessionToken.js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://yyzxwutjdeykrataqxmm.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5enh3dXRqZGV5a3JhdGFxeG1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0NDQ3NTYsImV4cCI6MjA3MTAyMDc1Nn0.dXuqWZ6-L_i8F2KNSO5CTTVr224Bl6NjIkwwfKuJYdU';

const supabase = createClient(supabaseUrl, supabaseKey);

// Direkte Supabase-Submission mit Zeit-basierter Qualitätskontrolle
export const submitStudyData = async (data) => {
  try {
    console.log('Attempting to submit data to Supabase directly...');
    
    const { participantData, susResponses, susScore, likertResponses, openResponses, completedAt, timingData, selectedSituation, frameworkPath } = data;
    const { email, ...profileData } = participantData;

    // Get session tracking data
    const sessionData = getSessionTrackingData();
    const submissionCount = incrementSubmissionCount();
    
    // Generate a unique participant ID with session token
    const participantId = `p_${Date.now()}_${Math.random().toString(36).substr(2, 9)}_${sessionData.sessionToken.substr(-8)}`;
    
    console.log('Session tracking:', {
      sessionToken: sessionData.sessionToken,
      submissionCount: submissionCount,
      isRepeat: sessionData.isRepeatedSubmission
    });

    // Calculate total completion time for quality control
    const totalTimeMinutes = timingData && timingData.totalMinutes ? Math.min(timingData.totalMinutes, 99999.99) : null;
    const frameworkTimeMinutes = timingData && timingData.frameworkMinutes ? Math.min(timingData.frameworkMinutes, 99999.99) : null;
    const surveyTimeMinutes = timingData && timingData.surveyMinutes ? Math.min(timingData.surveyMinutes, 99999.99) : null;

    // Calculate path comparison if situation and framework path are provided
    let pathComparison = null;
    if (selectedSituation && frameworkPath) {
      pathComparison = compareFrameworkPaths(frameworkPath, selectedSituation.id);
    }

    // Store anonymous research data with timing and session tracking
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
      planning_frequency: profileData.planningFrequency,
      traffic_source: profileData.trafficSource,
      consent_participation: profileData.consentParticipation,
      consent_data_processing: profileData.consentDataProcessing,
      consent_contact: profileData.consentContact,
      sus_responses: susResponses,
      sus_score: susScore,
      likert_responses: likertResponses,
      open_responses: openResponses,
      completion_time_total_minutes: totalTimeMinutes,
      completion_time_framework_minutes: frameworkTimeMinutes,
      completion_time_survey_minutes: surveyTimeMinutes,
      selected_situation_id: selectedSituation ? selectedSituation.id : null,
      framework_path_taken: frameworkPath || null,
      path_matches_situation: pathComparison ? pathComparison.matches : null,
      path_match_details: pathComparison || null,
      // Session tracking fields
      session_token: sessionData.sessionToken,
      submission_count: submissionCount,
      is_repeated_submission: submissionCount > 1,
      session_duration_minutes: sessionData.sessionDurationMinutes,
      browser_info: sessionData.browserInfo,
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

    return { 
      success: true, 
      participantId, 
      method: 'direct_supabase',
      timingData: {
        totalMinutes: totalTimeMinutes,
        frameworkMinutes: frameworkTimeMinutes,
        surveyMinutes: surveyTimeMinutes
      }
    };

  } catch (error) {
    console.error('Direct Supabase submission failed:', error);
    throw error;
  }
};

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