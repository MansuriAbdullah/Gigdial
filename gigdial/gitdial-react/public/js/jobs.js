// Jobs Data - Sample posted jobs
const jobsData = [
    {
        id: 1,
        title: "Need Expert Web Developer for E-commerce Site",
        description: "Looking for an experienced web developer to build a modern e-commerce website with payment gateway integration. Must have experience with React and Node.js.",
        category: "digital",
        location: "Mumbai",
        price: "₹25,000",
        priceRange: "₹20,000 - ₹30,000",
        duration: "2-3 weeks",
        skills: ["React", "Node.js", "Payment Gateway"],
        postedTime: "2 hours ago",
        urgent: false,
        featured: true
    },
    {
        id: 2,
        title: "Yoga Instructor for Home Sessions",
        description: "Need a certified yoga instructor for daily morning sessions at home. Should have experience with Hatha and Vinyasa yoga styles.",
        category: "wellness",
        location: "Delhi",
        price: "₹500/session",
        priceRange: "₹400 - ₹600/session",
        duration: "Ongoing",
        skills: ["Hatha Yoga", "Vinyasa", "Pranayama"],
        postedTime: "5 hours ago",
        urgent: false,
        featured: false
    },
    {
        id: 3,
        title: "Plumber Needed for Bathroom Renovation",
        description: "Urgent requirement for experienced plumber for complete bathroom renovation including pipeline work and fixture installation.",
        category: "home",
        location: "Bangalore",
        price: "₹15,000",
        priceRange: "₹12,000 - ₹18,000",
        duration: "1 week",
        skills: ["Plumbing", "Bathroom Fitting"],
        postedTime: "1 hour ago",
        urgent: true,
        featured: false
    },
    {
        id: 4,
        title: "Math Tutor for Class 10 CBSE",
        description: "Looking for experienced math tutor for my daughter preparing for Class 10 board exams. Need someone with proven track record.",
        category: "tutoring",
        location: "Pune",
        price: "₹800/hour",
        priceRange: "₹700 - ₹1,000/hour",
        duration: "6 months",
        skills: ["CBSE Mathematics", "Board Exam Prep"],
        postedTime: "3 hours ago",
        urgent: false,
        featured: true
    },
    {
        id: 5,
        title: "Event Photographer for Wedding",
        description: "Need professional photographer for destination wedding in Goa. Should have portfolio of previous wedding photography work.",
        category: "events",
        location: "Goa",
        price: "₹40,000",
        priceRange: "₹35,000 - ₹50,000",
        duration: "3 days",
        skills: ["Wedding Photography", "Photo Editing"],
        postedTime: "6 hours ago",
        urgent: false,
        featured: false
    },
    {
        id: 6,
        title: "Mobile App Developer - Startup Project",
        description: "Early-stage startup looking for Flutter developer to build cross-platform mobile app. Equity options available.",
        category: "digital",
        location: "Hyderabad",
        price: "₹50,000",
        priceRange: "₹40,000 - ₹60,000",
        duration: "2 months",
        skills: ["Flutter", "Firebase", "REST APIs"],
        postedTime: "4 hours ago",
        urgent: true,
        featured: true
    },
    {
        id: 7,
        title: "Personal Fitness Trainer Required",
        description: "Looking for certified personal trainer for weight loss program. Should provide customized diet and workout plans.",
        category: "wellness",
        location: "Chennai",
        price: "₹1,200/session",
        priceRange: "₹1,000 - ₹1,500/session",
        duration: "3 months",
        skills: ["Weight Training", "Nutrition Planning"],
        postedTime: "7 hours ago",
        urgent: false,
        featured: false
    },
    {
        id: 8,
        title: "Electrician for Office Wiring",
        description: "Need experienced electrician for commercial office space wiring and electrical panel installation.",
        category: "home",
        location: "Mumbai",
        price: "₹18,000",
        priceRange: "₹15,000 - ₹20,000",
        duration: "1-2 weeks",
        skills: ["Commercial Wiring", "Panel Installation"],
        postedTime: "30 minutes ago",
        urgent: true,
        featured: false
    },
    {
        id: 9,
        title: "English Speaking Tutor for IELTS",
        description: "Need expert English tutor for IELTS preparation. Target score is 7.5+. Prefer someone with overseas experience.",
        category: "tutoring",
        location: "Delhi",
        price: "₹1,500/hour",
        priceRange: "₹1,200 - ₹2,000/hour",
        duration: "2 months",
        skills: ["IELTS", "English Speaking", "Test Prep"],
        postedTime: "8 hours ago",
        urgent: false,
        featured: true
    }
];

// Get category icon based on category
function getCategoryIcon(category) {
    const icons = {
        digital: 'monitor',
        wellness: 'heart',
        home: 'home',
        tutoring: 'book-open',
        events: 'calendar'
    };
    return icons[category] || 'briefcase';
}

// Get category display name
function getCategoryName(category) {
    const names = {
        digital: 'Digital Services',
        wellness: 'Wellness',
        home: 'Home Services',
        tutoring: 'Tutoring',
        events: 'Events'
    };
    return names[category] || category;
}

// Create job card HTML
function createJobCard(job) {
    const urgentClass = job.urgent ? 'job-urgent' : '';
    const featuredClass = job.featured ? 'featured' : '';

    return `
        <div class="job-card ${urgentClass} ${featuredClass}" data-category="${job.category}" data-location="${job.location.toLowerCase()}">
            <div class="job-card-header">
                <div class="job-category-badge">
                    <i data-lucide="${getCategoryIcon(job.category)}"></i>
                    ${getCategoryName(job.category)}
                </div>
            </div>
            
            <div class="job-card-body">
                <h3 class="job-title">${job.title}</h3>
                <p class="job-description">${job.description}</p>
                
                <div class="job-meta">
                    <div class="job-meta-item">
                        <i data-lucide="map-pin"></i>
                        <strong>${job.location}</strong>
                    </div>
                    <div class="job-meta-item">
                        <i data-lucide="clock"></i>
                        <span>${job.duration}</span>
                    </div>
                </div>
            </div>
            
            <div class="job-card-footer">
                <div class="job-posted-time">
                    <i data-lucide="calendar"></i>
                    ${job.postedTime}
                </div>
                <button class="job-apply-btn" onclick="applyToJob(${job.id})">
                    Apply Now
                </button>
            </div>
        </div>
    `;
}

// Filter jobs
function filterJobs(category = 'all', location = '') {
    const jobsGrid = document.getElementById('jobsGrid');

    let filteredJobs = jobsData;

    // Filter by category
    if (category !== 'all') {
        filteredJobs = filteredJobs.filter(job => job.category === category);
    }

    // Filter by location
    if (location) {
        filteredJobs = filteredJobs.filter(job => job.location.toLowerCase() === location.toLowerCase());
    }

    // Render jobs
    if (filteredJobs.length === 0) {
        jobsGrid.innerHTML = `
            <div class="jobs-empty-state" style="grid-column: 1 / -1;">
                <i data-lucide="briefcase"></i>
                <h3>No jobs found</h3>
                <p>Try adjusting your filters or check back later for new opportunities.</p>
            </div>
        `;
    } else {
        jobsGrid.innerHTML = filteredJobs.map(job => createJobCard(job)).join('');
    }

    // Reinitialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Apply to job
function applyToJob(jobId) {
    const job = jobsData.find(j => j.id === jobId);
    if (job) {
        alert(`Applying to: ${job.title}\n\nThis would redirect to an application form in a real implementation.`);
    }
}

// Initialize jobs section
function initializeJobs() {
    // Render all jobs initially
    filterJobs();

    // Setup filter button event listeners
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Get category and filter
            const category = this.dataset.category;
            const locationSelect = document.querySelector('.location-filter');
            const location = locationSelect ? locationSelect.value : '';

            filterJobs(category, location);
        });
    });

    // Setup location filter
    const locationFilter = document.querySelector('.location-filter');
    if (locationFilter) {
        locationFilter.addEventListener('change', function () {
            const activeFilterBtn = document.querySelector('.filter-btn.active');
            const category = activeFilterBtn ? activeFilterBtn.dataset.category : 'all';

            filterJobs(category, this.value);
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeJobs);
} else {
    initializeJobs();
}
