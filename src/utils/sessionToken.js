/**
 * Session Token Management
 * Creates unique tokens per browser session to identify multiple submissions
 */

// Generate a unique session token
export const generateSessionToken = () => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    const userAgent = navigator.userAgent.substring(0, 10).replace(/\W/g, '');
    return `ST_${timestamp}_${random}_${userAgent}`;
};

// Get or create session token (persistent across page reloads)
export const getSessionToken = () => {
    let token = sessionStorage.getItem('research_session_token');
    
    if (!token) {
        token = generateSessionToken();
        sessionStorage.setItem('research_session_token', token);
        
        // Also store creation timestamp
        sessionStorage.setItem('session_created_at', new Date().toISOString());
        console.log('New session token created:', token);
    }
    
    return token;
};

// Get session metadata
export const getSessionMetadata = () => {
    const token = getSessionToken();
    const createdAt = sessionStorage.getItem('session_created_at');
    const currentTime = new Date().toISOString();
    
    // Calculate session duration in minutes
    const sessionDuration = createdAt 
        ? Math.round((new Date(currentTime) - new Date(createdAt)) / 1000 / 60) 
        : 0;
    
    return {
        sessionToken: token,
        sessionCreatedAt: createdAt,
        sessionDurationMinutes: sessionDuration,
        browserInfo: {
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            cookieEnabled: navigator.cookieEnabled,
            screenResolution: `${screen.width}x${screen.height}`
        }
    };
};

// Clear session token (for testing purposes)
export const clearSessionToken = () => {
    sessionStorage.removeItem('research_session_token');
    sessionStorage.removeItem('session_created_at');
};

// Check if this is a repeated submission
export const getSubmissionCount = () => {
    const submissions = parseInt(sessionStorage.getItem('submission_count') || '0');
    return submissions;
};

// Increment submission counter
export const incrementSubmissionCount = () => {
    const currentCount = getSubmissionCount();
    const newCount = currentCount + 1;
    sessionStorage.setItem('submission_count', newCount.toString());
    
    if (newCount > 1) {
        console.warn(`Multiple submissions detected: ${newCount} submissions from same session`);
    }
    
    return newCount;
};

// Get comprehensive session tracking data
export const getSessionTrackingData = () => {
    const metadata = getSessionMetadata();
    const submissionCount = getSubmissionCount();
    
    return {
        ...metadata,
        submissionCount: submissionCount,
        isRepeatedSubmission: submissionCount > 0,
        sessionId: metadata.sessionToken // Alias for easier access
    };
};