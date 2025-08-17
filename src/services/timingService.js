// Time-based Quality Control Service
// Tracks completion times to filter out low-quality responses

class TimingService {
  constructor() {
    this.startTime = null;
    this.frameworkStartTime = null;
    this.surveyStartTime = null;
  }

  // Start timing when user begins the study
  startStudy() {
    this.startTime = Date.now();
    localStorage.setItem('study_start_time', this.startTime.toString());
    console.log('Study timing started');
  }

  // Start timing for framework usage
  startFramework() {
    this.frameworkStartTime = Date.now();
    localStorage.setItem('framework_start_time', this.frameworkStartTime.toString());
    console.log('Framework timing started');
  }

  // End framework, start survey timing
  startSurvey() {
    this.surveyStartTime = Date.now();
    localStorage.setItem('survey_start_time', this.surveyStartTime.toString());
    console.log('Survey timing started');
  }

  // Calculate completion times
  getCompletionTimes() {
    const startTime = this.startTime || parseInt(localStorage.getItem('study_start_time') || '0');
    const frameworkStartTime = this.frameworkStartTime || parseInt(localStorage.getItem('framework_start_time') || '0');
    const surveyStartTime = this.surveyStartTime || parseInt(localStorage.getItem('survey_start_time') || '0');
    const endTime = Date.now();

    if (!startTime) {
      console.warn('No start time found, timing data incomplete');
      return null;
    }

    let totalMinutes = (endTime - startTime) / (1000 * 60);
    let frameworkMinutes = null;
    let surveyMinutes = null;
    
    // Calculate framework time: from framework start to survey start (or end if no survey)
    if (frameworkStartTime) {
      const frameworkEndTime = surveyStartTime || endTime;
      frameworkMinutes = (frameworkEndTime - frameworkStartTime) / (1000 * 60);
    }
    
    // Calculate survey time: from survey start to end
    if (surveyStartTime) {
      surveyMinutes = (endTime - surveyStartTime) / (1000 * 60);
    }

    // Cap times to reasonable maximums to prevent database overflow
    totalMinutes = Math.min(totalMinutes, 999.99); // Max ~16 hours
    frameworkMinutes = frameworkMinutes ? Math.min(frameworkMinutes, 999.99) : null;
    surveyMinutes = surveyMinutes ? Math.min(surveyMinutes, 999.99) : null;

    const timingData = {
      totalMinutes: Math.round(totalMinutes * 100) / 100, // Round to 2 decimals
      frameworkMinutes: frameworkMinutes ? Math.round(frameworkMinutes * 100) / 100 : null,
      surveyMinutes: surveyMinutes ? Math.round(surveyMinutes * 100) / 100 : null,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString()
    };

    console.log('Completion times calculated:', timingData);
    return timingData;
  }

  // Quality indicators based on timing
  getQualityIndicators(timingData) {
    if (!timingData) return { quality: 'unknown', reasons: ['No timing data'] };

    const { totalMinutes, frameworkMinutes, surveyMinutes } = timingData;
    const reasons = [];
    let quality = 'good';

    // Total time too short (likely rushed)
    if (totalMinutes < 2) {
      quality = 'poor';
      reasons.push(`Total time too short: ${totalMinutes.toFixed(1)} minutes`);
    }

    // Total time extremely long (likely distracted/multiple sessions)
    if (totalMinutes > 60) {
      quality = 'questionable';
      reasons.push(`Total time very long: ${totalMinutes.toFixed(1)} minutes`);
    }

    // Framework time too short (didn't engage properly)
    if (frameworkMinutes && frameworkMinutes < 0.5) {
      quality = 'poor';
      reasons.push(`Framework time too short: ${frameworkMinutes.toFixed(1)} minutes`);
    }

    // Survey time too short (didn't read questions)
    if (surveyMinutes && surveyMinutes < 1) {
      quality = 'poor';
      reasons.push(`Survey time too short: ${surveyMinutes.toFixed(1)} minutes`);
    }

    // Good quality indicators
    if (totalMinutes >= 3 && totalMinutes <= 30) {
      if (frameworkMinutes && frameworkMinutes >= 1) {
        if (surveyMinutes && surveyMinutes >= 2) {
          quality = 'excellent';
          reasons.push('Appropriate time spent on all sections');
        }
      }
    }

    return { quality, reasons, timingData };
  }

  // Clear timing data (e.g., for new session)
  clearTiming() {
    this.startTime = null;
    this.frameworkStartTime = null;
    this.surveyStartTime = null;
    localStorage.removeItem('study_start_time');
    localStorage.removeItem('framework_start_time');
    localStorage.removeItem('survey_start_time');
    console.log('Timing data cleared');
  }

  // Restore timing from localStorage (for page reloads)
  restoreTiming() {
    this.startTime = parseInt(localStorage.getItem('study_start_time') || '0') || null;
    this.frameworkStartTime = parseInt(localStorage.getItem('framework_start_time') || '0') || null;
    this.surveyStartTime = parseInt(localStorage.getItem('survey_start_time') || '0') || null;
    
    if (this.startTime) {
      console.log('Timing data restored from localStorage');
    }
  }
}

// Singleton export
export const timingService = new TimingService();
export default timingService;