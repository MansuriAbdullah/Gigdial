/**
 * Advanced Voice Search with NLP and Multi-Intent Recognition
 */

class AdvancedVoiceSearch {
    constructor() {
        this.btn = document.getElementById('voiceSearchBtn');
        this.input = document.getElementById('serviceSearch');
        this.locationSelect = document.getElementById('locationSelect');
        this.isListening = false;

        // Advanced search parameters
        this.searchContext = {
            service: '',
            location: '',
            priceRange: { min: null, max: null },
            experience: null,
            rating: null,
            availability: null,
            skills: [],
            language: [],
            gender: null,
            timePreference: null,
            urgency: 'normal'
        };

        // NLP patterns for intent recognition
        this.patterns = {
            price: {
                range: /(\d+)\s*(?:to|till|through|-)\s*(\d+)\s*(?:rupees?|rs?|inr)?/gi,
                max: /(?:under|below|less than|maximum|max|upto|up to)\s*(\d+)\s*(?:rupees?|rs?|inr)?/gi,
                min: /(?:above|over|more than|minimum|min|at least)\s*(\d+)\s*(?:rupees?|rs?|inr)?/gi,
                budget: /budget\s*(?:of|is)?\s*(\d+)/gi,
                cheap: /\b(cheap|affordable|budget|economical|low cost|inexpensive)\b/gi,
                expensive: /\b(premium|expensive|high end|luxury|professional)\b/gi
            },
            experience: {
                years: /(\d+)\s*(?:\+|plus)?\s*years?\s*(?:of\s*)?(?:experience|exp)?/gi,
                level: /\b(beginner|fresher|junior|mid|senior|expert|professional|experienced)\b/gi,
                veteran: /\b(veteran|seasoned|skilled|qualified)\b/gi
            },
            rating: {
                stars: /(\d+(?:\.\d+)?)\s*(?:star|stars|\*)/gi,
                min: /(?:above|over|minimum|min|at least)\s*(\d+(?:\.\d+)?)\s*(?:star|stars|\*|rating)/gi,
                quality: /\b(top rated|highly rated|best|excellent|good)\b/gi
            },
            availability: {
                immediate: /\b(immediate|urgent|asap|right now|now|today|emergency)\b/gi,
                specific: /(?:available\s*)?(?:on|this|next)?\s*(monday|tuesday|wednesday|thursday|friday|saturday|sunday|weekend|weekday)/gi,
                time: /(morning|afternoon|evening|night|anytime)/gi
            },
            location: {
                near: /\b(?:near|around|close to|nearby|in|at)\s+([a-z\s]+?)(?:\s+(?:area|city|locality|sector|zone))?\b/gi,
                within: /within\s*(\d+)\s*(?:km|kilometer|kilometre)/gi
            },
            skills: {
                required: /(?:who\s*)?(?:knows?|skilled in|expert in|specializes? in)\s+([a-z0-9\s,&+]+)/gi,
                multiple: /\b(and|with|plus|\+)\b/gi
            },
            language: {
                speaks: /(?:speaks?|knows?|fluent in)\s+(hindi|english|gujarati|marathi|tamil|telugu|kannada|malayalam|bengali|punjabi)/gi
            },
            gender: {
                preference: /\b(male|female|woman|man|lady|gentleman)\b/gi
            },
            time: {
                flexible: /\b(flexible|any time|anytime)\b/gi,
                parttime: /\b(part time|parttime|part-time)\b/gi,
                fulltime: /\b(full time|fulltime|full-time)\b/gi
            },
            urgency: {
                urgent: /\b(urgent|emergency|asap|immediately|right now)\b/gi,
                soon: /\b(soon|quickly|fast)\b/gi
            }
        };

        // Service synonyms and related terms (English + Hindi)
        this.serviceSynonyms = {
            'ac': ['ac service', 'ac repair', 'air conditioning', 'ac installation', 'ac maintenance', 'एसी', 'एसी रिपेयर', 'एयर कंडीशनर'],
            'plumber': ['plumbing', 'pipe repair', 'water leak', 'tap repair', 'bathroom repair', 'प्लंबर', 'नल की मरम्मत', 'पाइप रिपेयर'],
            'electrician': ['electrical', 'wiring', 'light', 'fan', 'switch repair', 'इलेक्ट्रीशियन', 'बिजली', 'वायरिंग', 'लाइट'],
            'carpenter': ['wood work', 'furniture', 'cabinet', 'door repair', 'woodwork', 'बढ़ई', 'लकड़ी का काम', 'फर्नीचर'],
            'painter': ['painting', 'wall painting', 'house painting', 'color', 'पेंटर', 'रंगाई', 'दीवार पेंटिंग'],
            'cleaner': ['cleaning', 'house cleaning', 'maid', 'housekeeping', 'sweeper', 'सफाई', 'क्लीनर', 'झाड़ू', 'घर की सफाई'],
            'cook': ['cooking', 'chef', 'food', 'meal preparation', 'kitchen help', 'रसोइया', 'खाना बनाना', 'शेफ'],
            'driver': ['driving', 'car driver', 'chauffeur', 'cab', 'ड्राइवर', 'गाड़ी चालक'],
            'tutor': ['teaching', 'teacher', 'education', 'coaching', 'trainer', 'instructor', 'ट्यूटर', 'शिक्षक', 'पढ़ाई'],
            'yoga': ['yoga teacher', 'yoga trainer', 'meditation', 'fitness', 'योग', 'योग शिक्षक', 'ध्यान'],
            'developer': ['programmer', 'coder', 'software', 'web dev', 'app dev', 'डेवलपर', 'प्रोग्रामर'],
            'designer': ['graphic design', 'ui ux', 'creative', 'graphics', 'डिज़ाइनर', 'ग्राफिक डिजाइन'],
            'photographer': ['photography', 'photo', 'camera', 'videography', 'फोटोग्राफर', 'फोटो'],
            'beautician': ['beauty', 'makeup', 'salon', 'hair', 'spa', 'ब्यूटीशियन', 'मेकअप', 'सैलून'],
            'gardener': ['gardening', 'plants', 'lawn', 'landscaping', 'माली', 'बागवानी', 'पौधे'],
            'mechanic': ['car repair', 'auto', 'vehicle repair', 'bike repair', 'मैकेनिक', 'गाड़ी रिपेयर']
        };

        if ('webkitSpeechRecognition' in window) {
            this.recognition = new webkitSpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = true;
            this.recognition.maxAlternatives = 5; // Get multiple alternatives for better NLP

            // Multi-language support - default to English (India)
            this.currentLang = 'en-IN';
            this.recognition.lang = this.currentLang;

            // Supported languages
            this.supportedLanguages = {
                'en-IN': 'English (India)',
                'hi-IN': 'Hindi (India)',
                'en-US': 'English (US)'
            };

            this.setupListeners();
        } else {
            if (this.btn) this.btn.style.display = 'none';
            console.warn('Web Speech API not supported');
        }
    }

    setupListeners() {
        if (!this.btn) return;

        this.recognition.onstart = () => {
            this.isListening = true;
            this.btn.classList.add('listening');
            this.btn.innerHTML = '<i data-lucide="mic-off"></i>';
            lucide.createIcons();

            if (this.input) {
                this.input.classList.add('listening');
                this.input.placeholder = `🎤 Listening (${this.supportedLanguages[this.currentLang]})... Try: "Find a plumber" or "मुझे प्लंबर चाहिए"`;
            }
        };

        this.recognition.onend = () => {
            this.isListening = false;
            this.btn.classList.remove('listening');
            this.btn.innerHTML = '<i data-lucide="mic"></i>';
            lucide.createIcons();

            if (this.input) {
                this.input.classList.remove('listening');
                this.input.placeholder = 'Search for gig workers, services (e.g., Web Developer, Yoga Trainer)';
            }
        };

        this.recognition.onresult = (event) => {
            let finalTranscript = '';
            let interimTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript;
                } else {
                    interimTranscript += transcript;
                }
            }

            if (this.input) {
                // Show interim results
                if (interimTranscript) {
                    this.input.value = interimTranscript;
                }

                // Process final result with advanced NLP
                if (finalTranscript) {
                    const processedQuery = this.processAdvancedQuery(finalTranscript);
                    this.input.value = processedQuery.displayText;

                    // Show what was understood
                    this.showUnderstanding(processedQuery);

                    // Trigger advanced search
                    setTimeout(() => {
                        this.triggerAdvancedSearch(processedQuery);
                    }, 800);
                }
            }
        };

        this.recognition.onerror = (event) => {
            this.handleError(event.error);
        };

        this.btn.addEventListener('click', () => {
            if (this.isListening) {
                this.recognition.stop();
            } else {
                this.recognition.start();
            }
        });
    }

    processAdvancedQuery(transcript) {
        const query = transcript.toLowerCase();

        console.log('Voice transcript:', transcript);
        console.log('Processed query:', query);

        // Only extract service/profession
        const service = this.extractService(query);

        console.log('Extracted service:', service);

        // Build display text (simplified query for input field)
        const displayText = service || transcript || 'Search...';

        return {
            originalQuery: transcript,
            displayText: displayText,
            context: {
                service: service
            }
        };
    }

    extractService(query) {
        const normalizedQuery = query.toLowerCase().trim();

        // Try direct match first (case-insensitive)
        for (const [service, synonyms] of Object.entries(this.serviceSynonyms)) {
            // Check exact service name
            if (normalizedQuery.includes(service.toLowerCase())) {
                return service;
            }
            // Check synonyms (case-insensitive)
            for (const syn of synonyms) {
                if (normalizedQuery.includes(syn.toLowerCase())) {
                    return service;
                }
            }
        }

        // Fallback: if no match, return first meaningful words
        const words = normalizedQuery.split(/\s+/).filter(word =>
            word.length > 2 && !['need', 'want', 'looking', 'find', 'search', 'hire', 'book', 'for', 'a', 'an', 'the'].includes(word)
        );

        return words.slice(0, 2).join(' ') || normalizedQuery;
    }

    extractLocation(query) {
        const match = query.match(this.patterns.location.near);
        if (match) {
            const location = match[1].trim();
            // Update dropdown if exists
            if (this.locationSelect) {
                const options = Array.from(this.locationSelect.options);
                const matchingOption = options.find(opt =>
                    opt.text.toLowerCase().includes(location) ||
                    location.includes(opt.text.toLowerCase())
                );
                if (matchingOption) {
                    this.locationSelect.value = matchingOption.value;
                    return matchingOption.text;
                }
            }
            return location;
        }
        return '';
    }

    extractPriceRange(query) {
        // Check for price range (e.g., "500 to 1000 rupees")
        let match = query.match(this.patterns.price.range);
        if (match) {
            this.searchContext.priceRange.min = parseInt(match[1]);
            this.searchContext.priceRange.max = parseInt(match[2]);
            return;
        }

        // Check for maximum price
        match = query.match(this.patterns.price.max);
        if (match) {
            this.searchContext.priceRange.max = parseInt(match[1]);
        }

        // Check for minimum price
        match = query.match(this.patterns.price.min);
        if (match) {
            this.searchContext.priceRange.min = parseInt(match[1]);
        }

        // Check for budget keywords
        match = query.match(this.patterns.price.budget);
        if (match) {
            this.searchContext.priceRange.max = parseInt(match[1]);
        }

        // Check for cheap/affordable
        if (this.patterns.price.cheap.test(query)) {
            this.searchContext.priceRange.max = 500;
        }

        // Check for premium/expensive
        if (this.patterns.price.expensive.test(query)) {
            this.searchContext.priceRange.min = 2000;
        }
    }

    extractExperience(query) {
        // Check for years of experience
        let match = query.match(this.patterns.experience.years);
        if (match) {
            return parseInt(match[1]);
        }

        // Check for experience level keywords
        match = query.match(this.patterns.experience.level);
        if (match) {
            const level = match[1].toLowerCase();
            const experienceMap = {
                'fresher': 0,
                'beginner': 0,
                'junior': 1,
                'mid': 3,
                'senior': 5,
                'expert': 8,
                'professional': 5,
                'experienced': 3
            };
            return experienceMap[level] || null;
        }

        return null;
    }

    extractRating(query) {
        // Check for specific star rating
        let match = query.match(this.patterns.rating.stars);
        if (match) {
            return parseFloat(match[1]);
        }

        // Check for minimum rating
        match = query.match(this.patterns.rating.min);
        if (match) {
            return parseFloat(match[1]);
        }

        // Check for quality keywords
        if (this.patterns.rating.quality.test(query)) {
            return 4.0; // Assume high rating for quality keywords
        }

        return null;
    }

    extractAvailability(query) {
        // Check for immediate availability
        if (this.patterns.availability.immediate.test(query)) {
            return 'immediate';
        }

        // Check for specific days
        const dayMatch = query.match(this.patterns.availability.specific);
        if (dayMatch) {
            return dayMatch[1];
        }

        // Check for time of day
        const timeMatch = query.match(this.patterns.availability.time);
        if (timeMatch) {
            return timeMatch[1];
        }

        return null;
    }

    extractSkills(query) {
        const skills = [];
        const match = query.match(this.patterns.skills.required);
        if (match) {
            const skillText = match[1];
            // Split by common delimiters
            const splitSkills = skillText.split(/[,&\+]|\s+and\s+/).map(s => s.trim());
            skills.push(...splitSkills);
        }
        return skills;
    }

    extractLanguage(query) {
        const languages = [];
        let match;
        const regex = this.patterns.language.speaks;
        while ((match = regex.exec(query)) !== null) {
            languages.push(match[1]);
        }
        return languages;
    }

    extractGender(query) {
        const match = query.match(this.patterns.gender.preference);
        if (match) {
            const gender = match[1].toLowerCase();
            if (['male', 'man', 'gentleman'].includes(gender)) return 'male';
            if (['female', 'woman', 'lady'].includes(gender)) return 'female';
        }
        return null;
    }

    extractUrgency(query) {
        if (this.patterns.urgency.urgent.test(query)) return 'urgent';
        if (this.patterns.urgency.soon.test(query)) return 'high';
        return 'normal';
    }

    buildDisplayText() {
        const parts = [];

        if (this.searchContext.service) {
            parts.push(this.searchContext.service);
        }

        if (this.searchContext.location) {
            parts.push(`in ${this.searchContext.location}`);
        }

        if (this.searchContext.priceRange.min || this.searchContext.priceRange.max) {
            if (this.searchContext.priceRange.min && this.searchContext.priceRange.max) {
                parts.push(`₹${this.searchContext.priceRange.min}-${this.searchContext.priceRange.max}`);
            } else if (this.searchContext.priceRange.max) {
                parts.push(`under ₹${this.searchContext.priceRange.max}`);
            } else if (this.searchContext.priceRange.min) {
                parts.push(`above ₹${this.searchContext.priceRange.min}`);
            }
        }

        if (this.searchContext.experience) {
            parts.push(`${this.searchContext.experience}+ yrs exp`);
        }

        if (this.searchContext.rating) {
            parts.push(`${this.searchContext.rating}+ ⭐`);
        }

        return parts.join(' • ') || 'Search...';
    }

    showUnderstanding(processedQuery) {
        // Create a visual feedback showing what was understood
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = 'voice-feedback';
        feedbackDiv.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 20px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 10000;
            max-width: 400px;
            font-size: 14px;
            animation: slideIn 0.3s ease-out;
        `;

        let feedbackHTML = '<div style="font-weight: bold; margin-bottom: 10px;">✅ Understood:</div>';

        if (processedQuery.context.service) {
            feedbackHTML += `<div>🔧 Service: <strong>${processedQuery.context.service}</strong></div>`;
        }
        if (processedQuery.context.location) {
            feedbackHTML += `<div>📍 Location: <strong>${processedQuery.context.location}</strong></div>`;
        }
        if (processedQuery.context.priceRange.min || processedQuery.context.priceRange.max) {
            feedbackHTML += `<div>💰 Price: <strong>${processedQuery.context.priceRange.min || '0'} - ${processedQuery.context.priceRange.max || '∞'} ₹</strong></div>`;
        }
        if (processedQuery.context.experience) {
            feedbackHTML += `<div>📊 Experience: <strong>${processedQuery.context.experience}+ years</strong></div>`;
        }
        if (processedQuery.context.rating) {
            feedbackHTML += `<div>⭐ Rating: <strong>${processedQuery.context.rating}+</strong></div>`;
        }
        if (processedQuery.context.urgency !== 'normal') {
            feedbackHTML += `<div>⚡ Urgency: <strong>${processedQuery.context.urgency}</strong></div>`;
        }
        if (processedQuery.context.skills.length > 0) {
            feedbackHTML += `<div>🎯 Skills: <strong>${processedQuery.context.skills.join(', ')}</strong></div>`;
        }

        feedbackDiv.innerHTML = feedbackHTML;
        document.body.appendChild(feedbackDiv);

        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);

        // Remove after 5 seconds
        setTimeout(() => {
            feedbackDiv.style.animation = 'slideIn 0.3s ease-out reverse';
            setTimeout(() => feedbackDiv.remove(), 300);
        }, 5000);
    }

    triggerAdvancedSearch(processedQuery) {
        // Store search context for use by search function
        window.advancedSearchContext = processedQuery.context;

        // Trigger the search button
        const searchBtn = document.getElementById('searchBtn');
        if (searchBtn && this.input.value.trim()) {
            searchBtn.click();
        }

        // Log for debugging
        console.log('Advanced Search Context:', processedQuery.context);
    }

    handleError(error) {
        const errorMessages = {
            'no-speech': 'No speech detected. Please try again.',
            'audio-capture': 'Microphone not available. Check permissions.',
            'not-allowed': 'Microphone access denied. Please allow access.',
            'network': 'Network error. Check your connection.'
        };

        const message = errorMessages[error] || 'Voice recognition error';

        if (this.input) {
            this.input.placeholder = '❌ ' + message;
            setTimeout(() => {
                this.input.placeholder = 'Search for gig workers, services (e.g., Web Developer, Yoga Trainer)';
            }, 3000);
        }
    }

    // Toggle between Hindi and English
    toggleLanguage() {
        const languages = Object.keys(this.supportedLanguages);
        const currentIndex = languages.indexOf(this.currentLang);
        const nextIndex = (currentIndex + 1) % languages.length;
        this.currentLang = languages[nextIndex];
        this.recognition.lang = this.currentLang;

        console.log(`Voice language switched to: ${this.supportedLanguages[this.currentLang]}`);

        // Show notification
        if (this.input) {
            const originalPlaceholder = this.input.placeholder;
            this.input.placeholder = `🌐 Language: ${this.supportedLanguages[this.currentLang]}`;
            setTimeout(() => {
                this.input.placeholder = originalPlaceholder;
            }, 2000);
        }
    }

    // Set specific language
    setLanguage(langCode) {
        if (this.supportedLanguages[langCode]) {
            this.currentLang = langCode;
            this.recognition.lang = this.currentLang;
            console.log(`Voice language set to: ${this.supportedLanguages[this.currentLang]}`);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.voiceSearch = new AdvancedVoiceSearch();
});

// Export for external use
window.AdvancedVoiceSearch = AdvancedVoiceSearch;