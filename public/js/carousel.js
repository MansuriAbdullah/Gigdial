/**
 * Carousel / Slider Logic
 * Populates the service categories and services lists
 */

const categories = [
    { name: 'Digital Services', icon: 'monitor' },
    { name: 'Digital Repairs', icon: 'wrench' },
    { name: 'Wellness', icon: 'heart' },
    { name: 'Fitness', icon: 'dumbbell' },
    { name: 'Home Services', icon: 'home' },
    { name: 'Tutoring', icon: 'book-open' },
    { name: 'Events', icon: 'calendar' },
    { name: 'Beauty', icon: 'scissors' },
];

// Using Pexels Images
const services = [
    {
        title: 'Web Development',
        rating: 4.8,
        image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        title: 'Graphic Design',
        rating: 4.7,
        image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        title: 'Video Editing',
        rating: 4.9,
        image: 'https://images.pexels.com/photos/257904/pexels-photo-257904.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        title: 'Content Writing',
        rating: 4.6,
        image: 'https://images.pexels.com/photos/210661/pexels-photo-210661.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        title: 'Home Cleaning',
        rating: 4.8,
        image: 'https://images.pexels.com/photos/4108715/pexels-photo-4108715.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        title: 'Plumbing Services',
        rating: 4.5,
        image: 'https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        title: 'Beauty & Spa',
        rating: 4.9,
        image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        title: 'Yoga Trainer',
        rating: 4.9,
        image: 'https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
];

const renderCategories = () => {
    const grid = document.getElementById('categoriesGrid');
    if (!grid) return;

    // Render regular categories
    const categoryCards = categories.map(cat => `
        <a href="services-catalog.html" class="category-card">
            <div class="category-icon">
                <i data-lucide="${cat.icon}"></i>
            </div>
            <h3 class="category-name">${cat.name}</h3>
        </a>
    `).join('');

    // Add "View More" card with premium gradient styling
    const viewMoreCard = `
        <a href="services-catalog.html" class="category-card view-more-card" style="background: linear-gradient(135deg, #003366 0%, #1e40af 100%); border: 2px solid rgba(255,255,255,0.2);">
            <div class="view-more-icon" style="background: rgba(255,255,255,0.2); width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 12px;">
                <i data-lucide="arrow-right" style="width: 32px; height: 32px; color: white;"></i>
            </div>
            <h3 class="category-name" style="color: white; font-size: 18px; font-weight: 800;">View More</h3>
            <span style="color: rgba(255,255,255,0.8); font-size: 13px;">45+ Categories</span>
        </a>
    `;

    grid.innerHTML = categoryCards + viewMoreCard;
};

const renderServices = (elementId) => {
    const container = document.getElementById(elementId);
    if (!container) return;

    // Filter or shuffle services based on section if needed, for now showing all mixed
    // In a real app, we would filter by category

    container.innerHTML = services.map(service => `
        <div class="card" style="min-width: 280px; cursor: pointer;">
            <div style="height: 160px; overflow: hidden;">
                <img src="${service.image}" alt="${service.title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
            </div>
            <div class="card-body">
                <h4 style="margin-bottom: 8px;">${service.title}</h4>
                <div style="display: flex; justify-content: flex-end; align-items: center;">
                    <div class="rating">
                        <i data-lucide="star" style="width: 16px; height: 16px; fill: #FACC15; color: #FACC15;"></i>
                        <span class="rating-value">${service.rating}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
};

document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
    renderServices('digitalServices');
    renderServices('wellnessServices');
    renderServices('homeServices');
    renderServices('tutoringServices');
    renderServices('eventsServices');
    renderServices('beautyServices');

    // Re-initialize icons
    if (window.lucide) lucide.createIcons();
});
