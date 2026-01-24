// Pexels API Configuration
const PEXELS_API_KEY = "UT4pM62CrQog6yCzbWvaqjzKFyffb2q0iQfuXYfgdsl0XVtJ3t2dK2JA";

// Data Structure
const categories = [
    { name: "Digital Services", query: "web developer coding" },
    { name: "Digital Repairs", query: "computer repair technician" },
    { name: "Wellness", query: "yoga meditation wellness" },
    { name: "Fitness", query: "personal trainer fitness" },
    { name: "Home Services", query: "home cleaning service" },
    { name: "Tutoring", query: "teacher tutoring student" },
    { name: "Events", query: "event planning party" },
    { name: "Admin Support", query: "virtual assistant office" },
    { name: "Beauty", query: "beauty salon makeup" },
    { name: "Coaching", query: "life coach mentor" },
    { name: "Photography", query: "photographer camera" },
    { name: "Creative", query: "graphic designer creative" }
];

const services = {
    digital: [
        { name: "Web Development", desc: "Full-stack developers, frontend & backend specialists", query: "web developer programming", rating: "4.8", workers: "1,245" },
        { name: "App Development", desc: "iOS, Android & cross-platform mobile developers", query: "mobile app developer", rating: "4.9", workers: "892" },
        { name: "Graphic Design", desc: "Logo, branding, UI/UX & visual design experts", query: "graphic designer working", rating: "4.7", workers: "2,156" },
        { name: "Tech Support", desc: "Computer repair, software troubleshooting", query: "tech support computer", rating: "4.6", workers: "678" }
    ],
    wellness: [
        { name: "Yoga Trainers", desc: "Certified yoga instructors for all levels", query: "yoga instructor teaching", rating: "4.9", workers: "543" },
        { name: "Personal Trainers", desc: "Fitness coaches & gym trainers", query: "personal trainer fitness", rating: "4.8", workers: "789" },
        { name: "Nutritionists", desc: "Diet planning & nutrition counseling", query: "nutritionist consultation", rating: "4.7", workers: "432" },
        { name: "Meditation Coaches", desc: "Mindfulness & stress management", query: "meditation coach", rating: "4.9", workers: "321" }
    ],
    home: [
        { name: "Cleaning Services", desc: "Professional home & office cleaning", query: "cleaning service professional", rating: "4.8", workers: "1,567" },
        { name: "Plumbers", desc: "Plumbing repairs & installations", query: "plumber fixing pipe", rating: "4.7", workers: "892" },
        { name: "Electricians", desc: "Electrical repairs & wiring", query: "electrician working", rating: "4.6", workers: "745" },
        { name: "Painters", desc: "Interior & exterior painting", query: "painter painting wall", rating: "4.8", workers: "634" }
    ],
    tutoring: [
        { name: "Academic Tutors", desc: "Math, Science, English & more", query: "tutor teaching student", rating: "4.9", workers: "2,345" },
        { name: "Music Teachers", desc: "Guitar, piano, vocals & more", query: "music teacher guitar", rating: "4.8", workers: "567" },
        { name: "Language Tutors", desc: "English, Spanish, French & more", query: "language teacher", rating: "4.7", workers: "892" },
        { name: "Coding Instructors", desc: "Programming & software skills", query: "coding instructor programming", rating: "4.9", workers: "1,234" }
    ],
    events: [
        { name: "Event Planners", desc: "Wedding, corporate & party planning", query: "event planner wedding", rating: "4.8", workers: "456" },
        { name: "Photographers", desc: "Event, portrait & commercial photography", query: "photographer camera event", rating: "4.9", workers: "1,123" },
        { name: "Videographers", desc: "Video production & editing", query: "videographer filming", rating: "4.7", workers: "678" },
        { name: "Content Writers", desc: "Blog, copywriting & technical writing", query: "content writer working", rating: "4.8", workers: "2,456" }
    ],
    beauty: [
        { name: "Hair Stylists", desc: "Haircuts, styling & treatments", query: "hair stylist salon", rating: "4.8", workers: "892" },
        { name: "Makeup Artists", desc: "Bridal, party & professional makeup", query: "makeup artist working", rating: "4.9", workers: "567" },
        { name: "Nail Artists", desc: "Manicure, pedicure & nail art", query: "nail artist manicure", rating: "4.7", workers: "423" },
        { name: "Spa Therapists", desc: "Massage & wellness treatments", query: "spa therapist massage", rating: "4.8", workers: "345" }
    ]
};

// Pexels API Functions
async function fetchPexelsImage(query) {
    try {
        const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`, {
            headers: {
                Authorization: PEXELS_API_KEY
            }
        });

        if (!response.ok) {
            throw new Error('Pexels API request failed');
        }

        const data = await response.json();
        return data.photos?.[0]?.src?.medium || null;
    } catch (error) {
        console.error('Error fetching Pexels image:', error);
        return null;
    }
}

// Load Categories with Images
async function loadCategories() {
    const grid = document.getElementById('categoriesGrid');
    if (!grid) return;

    // Show skeleton loading
    grid.innerHTML = categories.map(() => `
        <div class="category-card skeleton" style="min-height: 200px;"></div>
    `).join('');

    // Load actual content
    const categoryCards = await Promise.all(categories.map(async (category) => {
        const imageUrl = await fetchPexelsImage(category.query);

        return `
            <div class="category-card"
                 style="background-image: url('${imageUrl || ''}');"
                 onclick="window.location.href='services-catalog.html'"
                 role="button"
                 tabindex="0"
                 aria-label="${category.name}">
                <div class="category-name">${category.name}</div>
                <div class="category-count">View Services</div>
            </div>
        `;
    }));

    // Add "View More" card at the end
    const viewMoreCard = `
        <div class="category-card view-more-card"
             style="background: linear-gradient(135deg, var(--primary-blue) 0%, #1e40af 100%);"
             onclick="window.location.href='services-catalog.html'"
             role="button"
             tabindex="0"
             aria-label="View All Categories">
            <div class="view-more-icon">
                <i data-lucide="arrow-right" style="width: 32px; height: 32px; color: white;"></i>
            </div>
            <div class="category-name" style="color: white;">View More</div>
            <div class="category-count" style="color: rgba(255,255,255,0.8);">45+ Categories</div>
        </div>
    `;

    grid.innerHTML = categoryCards.join('') + viewMoreCard;
    
    // Re-initialize icons for the new view more card
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Load Services with Images
async function loadServices(containerId, serviceList) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Show skeleton loading
    container.innerHTML = serviceList.map(() => `
        <div class="service-card">
            <div class="service-img skeleton" style="height: 200px;"></div>
            <div class="service-content">
                <div class="skeleton" style="height: 24px; margin-bottom: 8px;"></div>
                <div class="skeleton" style="height: 40px; margin-bottom: 16px;"></div>
                <div class="skeleton" style="height: 40px;"></div>
            </div>
        </div>
    `).join('');

    // Load actual content
    const serviceCards = await Promise.all(serviceList.map(async (service) => {
        const imageUrl = await fetchPexelsImage(service.query);

        return `
            <div class="service-card" role="article">
                <img src="${imageUrl || 'placeholder.jpg'}" 
                     alt="${service.name}" 
                     class="service-img"
                     loading="lazy">
                <div class="service-content">
                    <h3 class="service-name">${service.name}</h3>
                    <p class="service-desc">${service.desc}</p>
                    <div class="service-meta">
                        <span>⭐ ${service.rating}/5</span>
                        <span>• ${service.workers} workers</span>
                    </div>
                    <button class="btn-view-profile" aria-label="View ${service.name} profiles">
                        View Profiles
                    </button>
                </div>
            </div>
        `;
    }));

    container.innerHTML = serviceCards.join('');
}

// Load Hero Background
async function loadHeroBackground() {
    const heroBg = document.getElementById('heroBg');
    if (!heroBg) return;

    const imageUrl = await fetchPexelsImage('urban workers marketplace service');
    if (imageUrl) {
        heroBg.style.backgroundImage = `url('${imageUrl}')`;
    }
}

// Voice Search
function initVoiceSearch() {
    const voiceBtn = document.getElementById('voiceBtn');
    const searchInput = document.getElementById('searchInput');

    if (!voiceBtn || !searchInput) return;

    voiceBtn.addEventListener('click', () => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();

            recognition.lang = 'hi-IN';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            recognition.onstart = () => {
                searchInput.placeholder = '🎤 Listening...';
                voiceBtn.style.background = '#ffebee';
            };

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                searchInput.value = transcript;
                performSearch();
            };

            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                searchInput.placeholder = 'Search for gig workers, services...';
            };

            recognition.onend = () => {
                searchInput.placeholder = 'Search for gig workers, services...';
                voiceBtn.style.background = '';
            };

            recognition.start();
        } else {
            alert('Voice search is not supported in your browser. Please try Chrome or Edge.');
        }
    });
}

// Search Functionality
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput?.value.trim();

    if (query) {
        window.location.href = `services-catalog.html?q=${encodeURIComponent(query)}`;
    }
}

function initSearch() {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');

    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

// Intersection Observer for Fade-in Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all service cards and feature cards
    document.querySelectorAll('.service-card, .feature-card, .category-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize Lucide Icons
function initIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Initialize Everything
async function init() {
    // Initialize icons first
    initIcons();

    // Load hero background
    await loadHeroBackground();

    // Load categories
    await loadCategories();

    // Load all service sections
    await Promise.all([
        loadServices('digitalServices', services.digital),
        loadServices('wellnessServices', services.wellness),
        loadServices('homeServices', services.home),
        loadServices('tutoringServices', services.tutoring),
        loadServices('eventsServices', services.events),
        loadServices('beautyServices', services.beauty)
    ]);

    // Initialize interactive features
    initVoiceSearch();
    initSearch();

    // Initialize scroll animations after content is loaded
    setTimeout(initScrollAnimations, 100);
}

// Run on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Handle keyboard navigation for category cards
document.addEventListener('keydown', (e) => {
    if (e.target.classList.contains('category-card') && e.key === 'Enter') {
        e.target.click();
    }
});
