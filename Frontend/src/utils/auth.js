// Simple authentication utilities

// Store the session data
export const setSession = (sessionData) => {
    if (!sessionData) {
        localStorage.removeItem('session');
        return;
    }
    localStorage.setItem('session', JSON.stringify(sessionData));
};

// Check if the user is authenticated
export const isAuthenticated = () => {
    const session = localStorage.getItem('session');
    if (!session) return false;
    
    try {
        const sessionData = JSON.parse(session);
        // Handle case where expires_at might be null
        return sessionData.expires_at ? new Date(sessionData.expires_at) > new Date() : !!sessionData.access_token;
    } catch {
        return false;
    }
};

// Get the current session data
export const getSession = () => {
    try {
        const session = localStorage.getItem('session');
        return session ? JSON.parse(session) : null;
    } catch {
        return null;
    }
};

// Get the access token
export const getAccessToken = () => {
    const session = getSession();
    return session?.access_token;
};



// Clear session data (for logout)
export const clearSession = () => {
    localStorage.removeItem('session');
    localStorage.removeItem('oauth_state');
};

// Generate a secure random state
export const generateOAuthState = () => {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Store OAuth state for CSRF protection with expiration
export const setOAuthState = (state) => {
    const stateData = {
        value: state,
        expires: Date.now() + (5 * 60 * 1000) // State expires in 5 minutes
    };
    sessionStorage.setItem('oauth_state', JSON.stringify(stateData));
};

// Get and verify OAuth state
export const verifyOAuthState = (receivedState) => {
    try {
        const stateData = JSON.parse(sessionStorage.getItem('oauth_state') || '{}');
        sessionStorage.removeItem('oauth_state'); // Clean up immediately

        if (!stateData.value || !stateData.expires) {
            return false;
        }

        // Check if state has expired
        if (Date.now() > stateData.expires) {
            return false;
        }

        return stateData.value === receivedState;
    } catch {
        return false;
    }
};