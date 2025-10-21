// McVay Enterprises - Main JavaScript File

// Configuration
const CONFIG = {
    emailEndpoint: 'mailto:aaron@mcvayenterprises.com', // Fallback for email notifications
    exitIntentDelay: 30000, // 30 seconds
    scrollThreshold: 0.1,
    animationDuration: 300
};

// State Management
const state = {
    modalShown: false,
    exitIntentTriggered: false,
    newsletterSubscribed: false,
    currentPage: 1,
    rankings: [],
    blogPosts: []
};

// DOM Elements
const elements = {
    mobileMenuBtn: document.getElementById('mobile-menu-btn'),
    mobileMenu: document.getElementById('mobile-menu'),
    newsletterModal: document.getElementById('newsletter-modal'),
    bookingModal: document.getElementById('booking-modal'),
    modalClose: document.getElementById('modal-close'),
    bookingModalClose: document.getElementById('booking-modal-close'),
    successMessage: document.getElementById('success-message'),
    newsletterForm: document.getElementById('newsletter-form'),
    modalNewsletterForm: document.getElementById('modal-newsletter-form'),
    consultationForm: document.getElementById('consultation-form'),
    modalConsultationForm: document.getElementById('modal-consultation-form'),
    rankingsTable: document.getElementById('rankings-table'),
    blogPosts: document.getElementById('blog-posts'),
    calendlyWidget: document.getElementById('calendly-widget'),
    modalCalendlyWidget: document.getElementById('modal-calendly-widget')
};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    loadLLMRankings();
    loadBlogPosts();
    setupScrollIndicator();
    setupExitIntent();
    setupSmoothScrolling();
    loadCalendlyWidget();
    console.log('McVay Enterprises website initialized successfully');
}

// Event Listeners Setup
function setupEventListeners() {
    // Mobile menu toggle
    elements.mobileMenuBtn?.addEventListener('click', toggleMobileMenu);
    
    // Newsletter modal triggers
    document.getElementById('newsletter-btn')?.addEventListener('click', showNewsletterModal);
    document.getElementById('mobile-newsletter-btn')?.addEventListener('click', showNewsletterModal);
    document.getElementById('hero-cta')?.addEventListener('click', showNewsletterModal);
    
    // Booking modal triggers
    document.getElementById('book-meeting-btn')?.addEventListener('click', showBookingModal);
    document.getElementById('mobile-book-meeting-btn')?.addEventListener('click', showBookingModal);
    document.getElementById('hero-book-consultation')?.addEventListener('click', showBookingModal);
    
    // Modal close
    elements.modalClose?.addEventListener('click', hideNewsletterModal);
    elements.bookingModalClose?.addEventListener('click', hideBookingModal);
    elements.newsletterModal?.addEventListener('click', (e) => {
        if (e.target === elements.newsletterModal) {
            hideNewsletterModal();
        }
    });
    elements.bookingModal?.addEventListener('click', (e) => {
        if (e.target === elements.bookingModal) {
            hideBookingModal();
        }
    });
    
    // Form submissions
    elements.newsletterForm?.addEventListener('submit', handleNewsletterSubmission);
    elements.modalNewsletterForm?.addEventListener('submit', handleNewsletterSubmission);
    elements.consultationForm?.addEventListener('submit', handleConsultationSubmission);
    elements.modalConsultationForm?.addEventListener('submit', handleConsultationSubmission);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // Window events
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
}

// Mobile Menu Functions
function toggleMobileMenu() {
    const isHidden = elements.mobileMenu.classList.contains('hidden');
    if (isHidden) {
        elements.mobileMenu.classList.remove('hidden');
        elements.mobileMenuBtn.innerHTML = '<i class="fas fa-times text-xl"></i>';
    } else {
        elements.mobileMenu.classList.add('hidden');
        elements.mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-xl"></i>';
    }
}

// Newsletter Modal Functions
function showNewsletterModal() {
    if (!state.newsletterSubscribed) {
        elements.newsletterModal?.classList.remove('hidden');
        state.modalShown = true;
        document.body.style.overflow = 'hidden';
        
        // Focus on first input
        const firstInput = elements.newsletterModal?.querySelector('input');
        firstInput?.focus();
    }
}

function hideNewsletterModal() {
    elements.newsletterModal?.classList.add('hidden');
    document.body.style.overflow = '';
}

// Booking Modal Functions
function showBookingModal() {
    elements.bookingModal?.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Load Calendly widget if not already loaded
    if (!elements.modalCalendlyWidget?.querySelector('.calendly-inline-widget')) {
        loadCalendlyInModal();
    }
}

function hideBookingModal() {
    elements.bookingModal?.classList.add('hidden');
    document.body.style.overflow = '';
}

// Newsletter Submission Handler
async function handleNewsletterSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Get form values
    const firstName = form.querySelector('input[type="text"]')?.value || '';
    const email = form.querySelector('input[type="email"]')?.value || '';
    const company = form.querySelectorAll('input[type="text"]')[1]?.value || '';
    
    if (!email || !firstName) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Subscribing...';
    submitBtn.disabled = true;
    
    try {
        // Simulate newsletter subscription (in real implementation, this would call your backend)
        await simulateNewsletterSubscription({ firstName, email, company });
        
        // Store subscription in localStorage
        localStorage.setItem('mcvay_newsletter_subscribed', 'true');
        localStorage.setItem('mcvay_subscriber_email', email);
        
        state.newsletterSubscribed = true;
        hideNewsletterModal();
        showNotification('Successfully subscribed! Check your email for confirmation.', 'success');
        
        // Clear form
        form.reset();
        
    } catch (error) {
        console.error('Newsletter subscription error:', error);
        showNotification('Subscription failed. Please try again.', 'error');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

// Simulate newsletter subscription (replace with actual API call)
async function simulateNewsletterSubscription(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Newsletter subscription data:', data);
            // In production, send email notification to aaron@mcvayenterprises.com
            resolve(true);
        }, 1000);
    });
}

// Load LLM Rankings Data
function loadLLMRankings() {
    const rankings = [
        { rank: 1, model: 'GPT-4 Turbo', provider: 'OpenAI', score: 94, category: 'General Purpose' },
        { rank: 2, model: 'Claude 3 Opus', provider: 'Anthropic', score: 92, category: 'Analysis & Reasoning' },
        { rank: 3, model: 'Gemini Ultra', provider: 'Google', score: 91, category: 'Multimodal' },
        { rank: 4, model: 'GPT-4', provider: 'OpenAI', score: 89, category: 'General Purpose' },
        { rank: 5, model: 'Claude 3 Sonnet', provider: 'Anthropic', score: 87, category: 'Creative Writing' },
        { rank: 6, model: 'Gemini Pro', provider: 'Google', score: 85, category: 'Code Generation' },
        { rank: 7, model: 'LLaMA 2 70B', provider: 'Meta', score: 82, category: 'Open Source' },
        { rank: 8, model: 'PaLM 2', provider: 'Google', score: 80, category: 'Research' },
        { rank: 9, model: 'Claude 2', provider: 'Anthropic', score: 78, category: 'Safety Focused' },
        { rank: 10, model: 'GPT-3.5 Turbo', provider: 'OpenAI', score: 76, category: 'Cost Effective' }
    ];
    
    state.rankings = rankings;
    renderRankingsTable(rankings);
}

function renderRankingsTable(rankings) {
    if (!elements.rankingsTable) return;
    
    const tableHTML = rankings.map(item => `
        <tr class="rankings-row border-b border-gray-100 hover:bg-gray-50">
            <td class="py-4 px-4 font-bold text-mcvay-blue">#${item.rank}</td>
            <td class="py-4 px-4 font-semibold">${item.model}</td>
            <td class="py-4 px-4 text-gray-600">${item.provider}</td>
            <td class="py-4 px-4">
                <span class="score-badge ${getScoreClass(item.score)}">
                    ${item.score}/100
                </span>
            </td>
            <td class="py-4 px-4 text-sm text-gray-500">${item.category}</td>
        </tr>
    `).join('');
    
    elements.rankingsTable.innerHTML = tableHTML;
}

function getScoreClass(score) {
    if (score >= 90) return 'score-excellent';
    if (score >= 80) return 'score-good';
    if (score >= 70) return 'score-average';
    return 'score-poor';
}

// Load Blog Posts
function loadBlogPosts() {
    const posts = [
        {
            id: 1,
            title: 'The Future of Large Language Models in Enterprise',
            excerpt: 'Exploring how Fortune 500 companies are leveraging LLMs for competitive advantage and operational efficiency.',
            date: '2025-01-10',
            author: 'McVay Research Team',
            category: 'Analysis',
            readTime: '5 min read',
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop'
        },
        {
            id: 2,
            title: 'GPT-4 vs Claude 3: Comprehensive Performance Analysis',
            excerpt: 'Deep dive comparison of the two leading language models across multiple benchmarks and real-world applications.',
            date: '2025-01-08',
            author: 'Aaron McVay',
            category: 'Comparison',
            readTime: '8 min read',
            image: 'https://images.unsplash.com/photo-1676299081847-824916de030a?w=400&h=250&fit=crop'
        },
        {
            id: 3,
            title: 'AI Safety and Evaluation: Best Practices for 2025',
            excerpt: 'Essential guidelines and methodologies for evaluating AI systems safely and effectively in production environments.',
            date: '2025-01-05',
            author: 'McVay Research Team',
            category: 'Safety',
            readTime: '6 min read',
            image: 'https://images.unsplash.com/photo-1675557009792-f490b4e04733?w=400&h=250&fit=crop'
        }
    ];
    
    state.blogPosts = posts;
    renderBlogPosts(posts);
}

function renderBlogPosts(posts) {
    if (!elements.blogPosts) return;
    
    const postsHTML = posts.map(post => `
        <article class="blog-card bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="aspect-w-16 aspect-h-9">
                <img 
                    src="${post.image}" 
                    alt="${post.title}"
                    class="w-full h-48 object-cover"
                    loading="lazy"
                >
            </div>
            <div class="p-6">
                <div class="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span class="bg-mcvay-light text-mcvay-navy px-2 py-1 rounded">${post.category}</span>
                    <span>${post.readTime}</span>
                </div>
                <h3 class="text-xl font-bold text-mcvay-navy mb-3 line-clamp-2">
                    ${post.title}
                </h3>
                <p class="text-gray-600 mb-4 line-clamp-3">
                    ${post.excerpt}
                </p>
                <div class="flex items-center justify-between">
                    <div class="flex items-center text-sm text-gray-500">
                        <span>By ${post.author}</span>
                        <span class="mx-2">•</span>
                        <time datetime="${post.date}">${formatDate(post.date)}</time>
                    </div>
                    <a 
                        href="#" 
                        class="text-mcvay-blue hover:text-blue-700 font-semibold text-sm"
                        onclick="openBlogPost(${post.id})"
                    >
                        Read More →
                    </a>
                </div>
            </div>
        </article>
    `).join('');
    
    elements.blogPosts.innerHTML = postsHTML;
}

// Utility Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

function openBlogPost(id) {
    // Placeholder for blog post functionality
    console.log('Opening blog post:', id);
    showNotification('Blog post feature coming soon!', 'info');
}

// Exit Intent Detection
function setupExitIntent() {
    let exitIntentTimer = null;
    
    // Show modal after 30 seconds if not already shown
    exitIntentTimer = setTimeout(() => {
        if (!state.modalShown && !state.newsletterSubscribed) {
            showNewsletterModal();
            state.exitIntentTriggered = true;
        }
    }, CONFIG.exitIntentDelay);
    
    // Mouse leave detection for desktop
    document.addEventListener('mouseleave', (e) => {
        if (e.clientY <= 0 && !state.modalShown && !state.newsletterSubscribed) {
            clearTimeout(exitIntentTimer);
            showNewsletterModal();
            state.exitIntentTriggered = true;
        }
    });
}

// Scroll Indicator
function setupScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    document.body.appendChild(indicator);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        indicator.style.transform = `scaleX(${scrolled / 100})`;
    });
}

// Smooth Scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll Handler
function handleScroll() {
    // Add scroll-based animations or effects here
    const scrollY = window.scrollY;
    
    // Navigation background opacity
    const nav = document.querySelector('nav');
    if (nav) {
        if (scrollY > 50) {
            nav.classList.add('backdrop-blur-sm');
        } else {
            nav.classList.remove('backdrop-blur-sm');
        }
    }
}

// Resize Handler
function handleResize() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth >= 768) {
        elements.mobileMenu?.classList.add('hidden');
        elements.mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-xl"></i>';
    }
}

// Keyboard Shortcuts
function handleKeyboardShortcuts(e) {
    // ESC key to close modal
    if (e.key === 'Escape') {
        hideNewsletterModal();
    }
    
    // Ctrl/Cmd + K to open newsletter modal
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        showNewsletterModal();
    }
}

// Notification System
function showNotification(message, type = 'success') {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(el => el.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 success-slide-in ${getNotificationClass(type)}`;
    
    const icon = getNotificationIcon(type);
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="${icon} mr-2"></i>
            <span>${message}</span>
            <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

function getNotificationClass(type) {
    const classes = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
        warning: 'bg-yellow-500 text-white',
        info: 'bg-blue-500 text-white'
    };
    return classes[type] || classes.info;
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    return icons[type] || icons.info;
}

// Performance Monitoring
function trackPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        });
    }
}

// Check subscription status on load
function checkSubscriptionStatus() {
    const subscribed = localStorage.getItem('mcvay_newsletter_subscribed');
    if (subscribed === 'true') {
        state.newsletterSubscribed = true;
    }
}

// Initialize subscription check
checkSubscriptionStatus();
trackPerformance();

// Calendly Integration
function loadCalendlyWidget() {
    // Load Calendly script if not already loaded
    if (!window.Calendly) {
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.onload = () => {
            initializeCalendlyWidgets();
        };
        document.head.appendChild(script);
        
        // Load Calendly CSS
        const link = document.createElement('link');
        link.href = 'https://assets.calendly.com/assets/external/widget.css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    } else {
        initializeCalendlyWidgets();
    }
}

function initializeCalendlyWidgets() {
    // Replace 'your-calendly-username' with your actual Calendly username
    const calendlyUrl = 'https://calendly.com/aaron-mcvay/ai-consultation'; // Update this URL
    
    // Main consultation section widget
    if (elements.calendlyWidget && window.Calendly) {
        try {
            window.Calendly.initInlineWidget({
                url: calendlyUrl,
                parentElement: elements.calendlyWidget,
                prefill: {},
                utm: {
                    utmSource: 'mcvay-enterprises',
                    utmMedium: 'website',
                    utmCampaign: 'consultation-booking'
                }
            });
        } catch (error) {
            console.log('Calendly widget loading error:', error);
            showFallbackBookingForm();
        }
    }
}

function loadCalendlyInModal() {
    const calendlyUrl = 'https://calendly.com/aaron-mcvay/ai-consultation'; // Update this URL
    
    if (elements.modalCalendlyWidget && window.Calendly) {
        try {
            window.Calendly.initInlineWidget({
                url: calendlyUrl,
                parentElement: elements.modalCalendlyWidget,
                prefill: {},
                utm: {
                    utmSource: 'mcvay-enterprises',
                    utmMedium: 'website-modal',
                    utmCampaign: 'consultation-booking'
                }
            });
        } catch (error) {
            console.log('Modal Calendly widget loading error:', error);
            showFallbackModalBookingForm();
        }
    }
}

function showFallbackBookingForm() {
    if (elements.calendlyWidget) {
        elements.calendlyWidget.style.display = 'none';
    }
    const fallbackForm = document.getElementById('booking-form');
    if (fallbackForm) {
        fallbackForm.classList.remove('hidden');
    }
}

function showFallbackModalBookingForm() {
    if (elements.modalCalendlyWidget) {
        elements.modalCalendlyWidget.style.display = 'none';
    }
    const fallbackForm = document.getElementById('modal-booking-form');
    if (fallbackForm) {
        fallbackForm.classList.remove('hidden');
    }
}

// Consultation Booking Handler
async function handleConsultationSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Get form values
    const firstName = form.querySelector('input[placeholder="First Name"]')?.value || '';
    const lastName = form.querySelector('input[placeholder="Last Name"]')?.value || '';
    const email = form.querySelector('input[type="email"]')?.value || '';
    const company = form.querySelector('input[placeholder*="Company"]')?.value || '';
    const phone = form.querySelector('input[type="tel"]')?.value || '';
    const preferredTime = form.querySelector('select')?.value || '';
    const message = form.querySelector('textarea')?.value || '';
    
    if (!email || !firstName || !lastName || !company) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Scheduling...';
    submitBtn.disabled = true;
    
    try {
        // Simulate consultation booking (replace with actual backend integration)
        await simulateConsultationBooking({ 
            firstName, 
            lastName, 
            email, 
            company, 
            phone, 
            preferredTime, 
            message 
        });
        
        hideBookingModal();
        showNotification('Consultation request received! We\'ll contact you within 24 hours to confirm your appointment.', 'success');
        
        // Clear form
        form.reset();
        
    } catch (error) {
        console.error('Consultation booking error:', error);
        showNotification('Booking failed. Please try again or contact us directly.', 'error');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

// Simulate consultation booking (replace with actual API call)
async function simulateConsultationBooking(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Consultation booking data:', data);
            // In production, this would:
            // 1. Send email to aaron@mcvayenterprises.com
            // 2. Create calendar event
            // 3. Send confirmation email to client
            // 4. Store booking in database
            resolve(true);
        }, 1500);
    });
}

// Enhanced Keyboard Shortcuts
function handleKeyboardShortcuts(e) {
    // ESC key to close modals
    if (e.key === 'Escape') {
        hideNewsletterModal();
        hideBookingModal();
    }
    
    // Ctrl/Cmd + K to open newsletter modal
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        showNewsletterModal();
    }
    
    // Ctrl/Cmd + B to open booking modal
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        showBookingModal();
    }
}

// Export functions for global access
window.McVayEnterprises = {
    showNewsletterModal,
    hideNewsletterModal,
    showBookingModal,
    hideBookingModal,
    showNotification,
    openBlogPost
};