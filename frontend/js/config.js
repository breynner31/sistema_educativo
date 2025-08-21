// API Configuration
const API_CONFIG = {
    // Base URL for your API
    BASE_URL: 'http://localhost:3001/api',

    // Default headers for all requests
    DEFAULT_HEADERS: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};

// Environment configuration
const ENV_CONFIG = {
    // Set to true for development mode
    DEBUG: true,
    
    // Mock data when API is not available
    USE_MOCK_DATA: false,
    
    // Auto-refresh interval for dashboard (in milliseconds)
    // 0 = disabled, 30000 = 30 seconds
    REFRESH_INTERVAL: 0
};

// UI Configuration
const UI_CONFIG = {
    // Animation durations
    ANIMATION_DURATION: 300,
    
    // Toast notification duration
    TOAST_DURATION: 3000,
    
    // Items per page for pagination
    ITEMS_PER_PAGE: 10,
    
    // Date format
    DATE_FORMAT: 'DD/MM/YYYY'
};