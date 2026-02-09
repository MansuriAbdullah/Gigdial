/**
 * Search Functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const citySelect = document.getElementById('citySelect');

    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            // Check if performSearch function exists (on index.html)
            if (typeof performSearch === 'function') {
                performSearch();
            } else {
                // Fallback for other pages
                const query = searchInput ? searchInput.value : '';
                const city = citySelect ? citySelect.value : '';

                if (query.trim()) {
                    console.log(`Searching for "${query}" in ${city}`);
                    // Redirect to services catalog with search parameters
                    const searchParams = new URLSearchParams();
                    if (query.trim()) searchParams.set('q', query.trim());
                    if (city) searchParams.set('location', city);
                    window.location.href = `services-catalog.html${searchParams.toString() ? '?' + searchParams.toString() : ''}`;
                }
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }
});
