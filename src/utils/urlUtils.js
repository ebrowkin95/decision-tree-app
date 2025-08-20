/**
 * Utility functions for URL parameter handling and traffic source tracking
 */

/**
 * Parses URL search parameters and extracts traffic source information
 * @returns {object} Object containing traffic source and other relevant parameters
 */
export function getTrafficSource() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Primary source parameter
    const source = urlParams.get('source');
    
    // Alternative parameter names for flexibility
    const utm_source = urlParams.get('utm_source');
    const ref = urlParams.get('ref');
    const from = urlParams.get('from');
    
    // Get browser referrer as fallback
    const referrer = document.referrer;
    
    // Determine the traffic source with priority order
    let trafficSource = 'direct'; // Default for direct visits
    
    if (source) {
        trafficSource = source;
    } else if (utm_source) {
        trafficSource = `utm_${utm_source}`;
    } else if (ref) {
        trafficSource = `ref_${ref}`;
    } else if (from) {
        trafficSource = `from_${from}`;
    } else if (referrer && referrer !== '') {
        // Parse common referrer domains
        trafficSource = parseReferrer(referrer);
    }
    
    // Additional tracking data
    const trackingData = {
        source: trafficSource,
        originalUrl: window.location.href,
        referrer: referrer || null,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        // Get other useful parameters
        campaign: urlParams.get('campaign') || urlParams.get('utm_campaign'),
        medium: urlParams.get('medium') || urlParams.get('utm_medium'),
        content: urlParams.get('content') || urlParams.get('utm_content')
    };
    
    return trackingData;
}

/**
 * Parses referrer URL to extract meaningful source information
 * @param {string} referrer - The document.referrer value
 * @returns {string} Parsed referrer source
 */
function parseReferrer(referrer) {
    try {
        const url = new URL(referrer);
        const hostname = url.hostname.toLowerCase();
        
        // Map common domains to readable names
        const domainMap = {
            'reddit.com': 'reddit',
            'www.reddit.com': 'reddit',
            'old.reddit.com': 'reddit',
            'facebook.com': 'facebook',
            'www.facebook.com': 'facebook',
            'twitter.com': 'twitter',
            'x.com': 'twitter',
            'google.com': 'google',
            'www.google.com': 'google',
            'google.de': 'google',
            'www.google.de': 'google',
            'lehrer-online.de': 'lehrer_online',
            'www.lehrer-online.de': 'lehrer_online',
            '4teachers.de': 'vier_teachers',
            'www.4teachers.de': 'vier_teachers',
            'lehrerfreund.de': 'lehrerfreund',
            'www.lehrerfreund.de': 'lehrerfreund'
        };
        
        // Check for exact domain match
        if (domainMap[hostname]) {
            return `referrer_${domainMap[hostname]}`;
        }
        
        // Check for subdomain matches
        for (const [domain, name] of Object.entries(domainMap)) {
            if (hostname.includes(domain.replace('www.', ''))) {
                return `referrer_${name}`;
            }
        }
        
        // Extract main domain for unknown sources
        const parts = hostname.split('.');
        if (parts.length >= 2) {
            const mainDomain = parts.slice(-2).join('.');
            return `referrer_${mainDomain.replace('.', '_')}`;
        }
        
        return `referrer_${hostname.replace(/\./g, '_')}`;
        
    } catch (error) {
        console.warn('Error parsing referrer:', error);
        return 'referrer_unknown';
    }
}

/**
 * Stores traffic source data in sessionStorage for persistence across navigation
 * @param {object} trackingData - The tracking data object
 */
export function storeTrafficSource(trackingData) {
    try {
        sessionStorage.setItem('traffic_source_data', JSON.stringify(trackingData));
        console.log('Traffic source stored:', trackingData.source);
    } catch (error) {
        console.warn('Error storing traffic source:', error);
    }
}

/**
 * Retrieves stored traffic source data from sessionStorage
 * @returns {object|null} Stored tracking data or null if not found
 */
export function getStoredTrafficSource() {
    try {
        const stored = sessionStorage.getItem('traffic_source_data');
        return stored ? JSON.parse(stored) : null;
    } catch (error) {
        console.warn('Error retrieving stored traffic source:', error);
        return null;
    }
}

/**
 * Clears stored traffic source data (called after successful form submission)
 */
export function clearStoredTrafficSource() {
    try {
        sessionStorage.removeItem('traffic_source_data');
    } catch (error) {
        console.warn('Error clearing stored traffic source:', error);
    }
}

/**
 * Gets a human-readable description of the traffic source
 * @param {string} source - The traffic source identifier
 * @returns {string} Human-readable description
 */
export function getSourceDescription(source) {
    const descriptions = {
        'direct': 'Direct visit (bookmark, typed URL)',
        'reddit_teachers': 'Reddit - r/Teachers',
        'reddit_lehrerzimmer': 'Reddit - r/Lehrerzimmer', 
        'reddit_de': 'Reddit - r/de',
        'reddit_deutschland': 'Reddit - r/deutschland',
        'reddit_education': 'Reddit - r/education',
        'facebook_lehrergruppe': 'Facebook Teacher Group',
        'facebook_teachers': 'Facebook Teachers Community',
        'lehrer_forum': 'Teachers Forum',
        'lehrer_online': 'Lehrer-Online.de',
        'vier_teachers': '4teachers.de',
        'lehrerfreund': 'Lehrerfreund.de',
        'xing_lehrer': 'XING Teacher Network',
        'linkedin_education': 'LinkedIn Education',
        'twitter_education': 'Twitter Education Community',
        'email_newsletter': 'Email Newsletter',
        'whatsapp_share': 'WhatsApp Share',
        'telegram_share': 'Telegram Share'
    };
    
    // Handle referrer sources
    if (source.startsWith('referrer_')) {
        const domain = source.replace('referrer_', '').replace(/_/g, '.');
        return `Referrer: ${domain}`;
    }
    
    // Handle UTM sources
    if (source.startsWith('utm_')) {
        return `UTM Source: ${source.replace('utm_', '')}`;
    }
    
    return descriptions[source] || `Unknown source: ${source}`;
}