/**
 * Main Application Entry Point
 */

console.log('GigDial App Initialized');

// Initialize any global state or listeners here
document.addEventListener('DOMContentLoaded', () => {
    // Check for cookie consent
    const cookieBanner = document.getElementById('cookieBanner');
    if (cookieBanner && localStorage.getItem('cookieConsent') === 'true') {
        cookieBanner.style.display = 'none';
    }
});
