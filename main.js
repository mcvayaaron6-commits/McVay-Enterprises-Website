// McVay Enterprises Faith Commerce - Production Script

const config = {
    chatgptStoreUrl: 'resources/faith-commerce-assistant-setup.html',
    newsletterEndpoint: 'https://formsubmit.co/ajax/aaron@mcvayenterprises.com',
    orderEndpoint: 'https://formsubmit.co/ajax/aaron@mcvayenterprises.com'
};

const storageKeys = {
    newsletter: 'mcvay_faith_commerce_subscriber',
    cart: 'mcvay_faith_commerce_cart'
};

const selectors = {
    mobileMenuBtn: document.getElementById('mobile-menu-btn'),
    mobileMenu: document.getElementById('mobile-menu'),
    newsletterModal: document.getElementById('newsletter-modal'),
    modalClose: document.getElementById('modal-close'),
    successToast: document.getElementById('success-message'),
    newsletterForm: document.getElementById('newsletter-form'),
    currentYear: document.getElementById('current-year'),
    cartToggle: document.getElementById('cart-toggle'),
    mobileCartBtn: document.getElementById('mobile-cart-btn'),
    cartDrawer: document.getElementById('cart-drawer'),
    cartOverlay: document.getElementById('cart-overlay'),
    cartClose: document.getElementById('cart-close'),
    cartItems: document.getElementById('cart-items'),
    cartCount: document.getElementById('cart-count'),
    mobileCartCount: document.getElementById('mobile-cart-count'),
    cartTotal: document.getElementById('cart-total'),
    checkoutBtn: document.getElementById('checkout-btn'),
    orderModal: document.getElementById('order-modal'),
    orderModalClose: document.getElementById('order-modal-close'),
    orderForm: document.getElementById('order-form'),
    orderSummaryList: document.getElementById('order-summary-list'),
    orderSummaryTotal: document.getElementById('order-summary-total'),
    orderItemsField: document.getElementById('order-items-field')
};

const buttons = {
    newsletter: [
        'newsletter-btn',
        'mobile-newsletter-btn',
        'hero-newsletter-btn',
        'footer-newsletter-btn',
        'final-newsletter-btn'
    ],
    chatgpt: [
        'open-chatgpt-btn',
        'mobile-chatgpt-btn',
        'final-chatgpt-btn'
    ]
};

const products = [
    {
        name: 'Faith Over Fear Bracelet Stack',
        description: 'Three-piece bracelet set with scripture charms and affirmation cards. Ships from Ultimate Shield in 48 hours.',
        price: 19.99,
        priceLabel: '$19.99 retail',
        profit: '$11.93 profit (84%)',
        dailyTarget: '58 units/day to hit $250K run rate',
        tags: ['Top Seller', 'High Margin'],
        automation: 'AutoDS • Ultimate Shield • TikTok organic',
        sheet: 'resources/products/faith-over-fear-bracelet-stack.html',
        image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=800&q=80',
        imageAlt: 'Stack of gold and silver bracelets resting on a fabric surface'
    },
    {
        name: 'Blessed & Chosen Tee Collection',
        description: 'Printify direct-to-garment tees with 7 colorways and seasonal scripture drops.',
        price: 24.99,
        priceLabel: '$24.99 retail',
        profit: '$10.34 profit (41%)',
        dailyTarget: '67 tees/day = $20.8K monthly revenue',
        tags: ['Trending', 'Print-on-Demand'],
        automation: 'Printify • Shopify Flow • Klaviyo',
        sheet: 'resources/products/blessed-and-chosen-tee-collection.html',
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
        imageAlt: 'Person wearing a light blue t-shirt with text design'
    },
    {
        name: 'Sterling Cross Necklace Line',
        description: 'Hypoallergenic stainless-steel crosses with premium packaging and handwritten note option.',
        price: 15.99,
        priceLabel: '$15.99 retail',
        profit: '$8.54 profit (53%)',
        dailyTarget: '81 necklaces/day for $250K annually',
        tags: ['Evergreen', 'Gift Ready'],
        automation: 'AutoDS • Branded packaging inserts',
        sheet: 'resources/products/sterling-cross-necklace-line.html',
        image: 'https://images.unsplash.com/photo-1542293787938-4d2226c2f00d?auto=format&fit=crop&w=800&q=80',
        imageAlt: 'Silver cross necklace displayed against a light background'
    },
    {
        name: 'Scripture Canvas Wall Art',
        description: '12x18 gallery-wrapped canvases with AI-generated art variations for seasonal drops.',
        price: 29.99,
        priceLabel: '$29.99 retail',
        profit: '$7.99 profit (27%)',
        dailyTarget: '87 canvases/day to unlock $1M run rate',
        tags: ['Premium', 'Seasonal'],
        automation: 'Printify • Scheduled releases',
        sheet: 'resources/products/scripture-canvas-wall-art.html',
        image: 'https://images.unsplash.com/photo-1462212210333-335063b676d3?auto=format&fit=crop&w=800&q=80',
        imageAlt: 'Minimal living room with framed wall art featuring a quote'
    },
    {
        name: 'Daily Faith Planner',
        description: '90-day devotional planner with gratitude prompts and QR-linked worship playlists.',
        price: 34.99,
        priceLabel: '$34.99 retail',
        profit: '$14.80 profit (42%)',
        dailyTarget: '42 planners/day to cross $180K per year',
        tags: ['Subscription Ready', 'Bundled'],
        automation: 'AutoDS • Notion fulfillment SOP',
        sheet: 'resources/products/daily-faith-planner.html',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
        imageAlt: 'Open devotional planner with pen and coffee cup nearby'
    },
    {
        name: 'Family Devotional Starter Box',
        description: 'Monthly devotionals, sticker sheets, and bracelet trio packaged for family worship nights.',
        price: 49.00,
        priceLabel: '$49.00 retail',
        profit: '$24.00 profit (49%)',
        dailyTarget: '28 boxes/day for $20K monthly profit',
        tags: ['Recurring', 'Community'],
        automation: 'Recharge Subscriptions • Klaviyo flows',
        sheet: 'resources/products/family-devotional-starter-box.html',
        image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
        imageAlt: 'Gift box filled with stationery and devotion materials'
    }
];

const bundles = [
    {
        name: 'Launch Day Conversion Bundle',
        price: '$59 AOV',
        stats: 'Bracelet stack + devotional + email upsell',
        bullets: ['Auto applies 10% chat-exclusive discount', 'Includes 7-day SMS nurture sequence', 'Optimized for TikTok Live drops'],
        document: 'resources/bundle-playbooks.html#launch-day-conversion-bundle'
    },
    {
        name: 'Women’s Ministry Pack',
        price: '$149 wholesale',
        stats: '12 bracelets + 12 devotionals',
        bullets: ['Pre-built fundraiser landing page', 'Bulk order automation via AutoDS', 'Church partner outreach email templates'],
        document: 'resources/bundle-playbooks.html#womens-ministry-pack'
    },
    {
        name: 'Seasonal Wall Art Series',
        price: '$34.99/mo subscription',
        stats: 'Quarterly limited-edition canvas releases',
        bullets: ['AI art prompts delivered monthly', 'Countdown timers embedded via ReConvert', 'Members-only community challenges'],
        document: 'resources/bundle-playbooks.html#seasonal-wall-art-series'
    },
    {
        name: 'New Believer Welcome Kit',
        price: '$79 bundle',
        stats: 'Bible study, bracelet, journal, welcome letter',
        bullets: ['Automated personalization survey', 'Dynamic cross-sell emails', 'Gift note printing on demand'],
        document: 'resources/bundle-playbooks.html#new-believer-welcome-kit'
    },
    {
        name: 'Corporate Gifting Set',
        price: '$42 per set',
        stats: 'Desk scripture art + leather bracelet',
        bullets: ['Bulk invoicing workflow in Shopify', 'Zapier integration with HubSpot', 'Custom engraving option ready'],
        document: 'resources/bundle-playbooks.html#corporate-gifting-set'
    },
    {
        name: 'Faith Kids Surprise Pack',
        price: '$39 quarterly',
        stats: 'Stickers, devotionals, mini bracelets',
        bullets: ['Gamified loyalty program', 'Parent email curriculum', 'Pre-built unboxing script for UGC'],
        document: 'resources/bundle-playbooks.html#faith-kids-surprise-pack'
    }
];

const automationStack = [
    {
        icon: 'fa-box-open',
        title: 'AutoDS + Ultimate Shield',
        description: '1-click product imports, automated stock syncing, and hands-free order routing to the fastest supplier.',
        highlight: 'Enable price automation at 2.5x cost for instant profit control.'
    },
    {
        icon: 'fa-print',
        title: 'Printify POD Network',
        description: 'Launch tees, hoodies, and wall art with no inventory. Sync directly to Shopify and ChatGPT.',
        highlight: 'Activate premium providers for 2-3 day shipping in the US.'
    },
    {
        icon: 'fa-robot',
        title: 'Faith Commerce Assistant GPT',
        description: 'Custom GPT recommending products, bundling upsells, and capturing leads straight into Klaviyo.',
        highlight: 'Use GPT actions to push checkout links and apply discounts.'
    },
    {
        icon: 'fa-bolt',
        title: 'Zapier + Klaviyo Automations',
        description: 'Recover carts, trigger nurture emails, and send UGC reminders without lifting a finger.',
        highlight: 'Seven-email welcome flow pre-loaded with scripture reflections.'
    },
    {
        icon: 'fa-comments',
        title: 'Tidio AI Support',
        description: '24/7 chatbot resolves FAQs, tracks orders, and books fundraiser partnerships.',
        highlight: 'Escalations routed to SMS so you only handle high-value conversations.'
    }
];

const testimonials = [
    {
        name: 'Jessica Lee',
        role: 'Founder, Grace & Grit Co.',
        quote: 'We turned on the bracelet stack, let the GPT handle upsells, and closed $18K in 58 days. The automation SOPs saved us 40+ hours a month.',
        metric: '$18K in 58 days',
        avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Jessica%20Lee&radius=50',
        highlight: 'AutoDS bracelets + ChatGPT concierge'
    },
    {
        name: 'Marco Alvarez',
        role: 'Director, Ignite Youth Ministries',
        quote: 'The Women’s Ministry Pack funded our summer retreat in one weekend. Pre-built Klaviyo flows and bundle playbooks kept volunteers focused on ministry.',
        metric: 'Retreat funded in 72 hours',
        avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Marco%20Alvarez&radius=50',
        highlight: 'Women’s pack + Klaviyo automations'
    },
    {
        name: 'Brianna Carter',
        role: 'Creator, FaithFit Collective',
        quote: 'We synced the ChatGPT store to Shopify and saw 27% of sales come straight from the assistant in week one. No more DMs about inventory or pricing.',
        metric: '27% sales via GPT',
        avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Brianna%20Carter&radius=50',
        highlight: 'GPT checkout + TikTok live drops'
    }
];

const faqs = [
    {
        question: 'How does fulfillment stay “hands-off”?',
        answer: 'AutoDS routes orders to vetted suppliers, Printify handles POD items, and Zapier updates customers automatically. You just approve the occasional escalation.'
    },
    {
        question: 'Can I swap in my own Christian products?',
        answer: 'Absolutely. Edit the product array in main.js or import your catalog into Shopify, then update the ChatGPT assistant data file so recommendations stay current.'
    },
    {
        question: 'What happens after someone submits an order request?',
        answer: 'A draft Shopify checkout is created and emailed within 12 hours. The customer receives tracking updates automatically once the supplier confirms shipment.'
    },
    {
        question: 'Do I need to be on every live Zoom call?',
        answer: 'Replays are uploaded to the training vault. Live attendance is encouraged for Q&A, but the SOPs and GPT scripts cover every rollout step if you can’t attend.'
    }
];

const timeline = [
    {
        day: 'Days 1 - 3',
        focus: 'Store Foundation',
        tasks: ['Spin up Shopify + Dawn theme', 'Install AutoDS, Printify, Klaviyo, Tidio', 'Connect custom domain & tracking pixels']
    },
    {
        day: 'Days 4 - 7',
        focus: 'Catalog Activation',
        tasks: ['Import 15 proven Christian SKUs', 'Write AI-optimized product descriptions', 'Create bundle offers & upsell flows']
    },
    {
        day: 'Days 8 - 11',
        focus: 'ChatGPT Commerce',
        tasks: ['Publish Faith Commerce Assistant GPT', 'Sync Shopify inventory to ChatGPT store', 'Add checkout call-to-actions on website']
    },
    {
        day: 'Days 12 - 16',
        focus: 'Marketing Engine',
        tasks: ['Launch TikTok + Instagram short-form calendar', 'Automate welcome & cart recovery emails', 'Set up paid retargeting audiences']
    },
    {
        day: 'Days 17 - 19',
        focus: 'Optimization Sprints',
        tasks: ['Run pricing A/B tests', 'Collect first 20 product reviews', 'Record UGC unboxing videos using AI scripts']
    },
    {
        day: 'Days 20 - 21',
        focus: 'Launch Weekend',
        tasks: ['Host 3 live-selling sessions', 'Push ChatGPT store notifications', 'Secure 5 partnership commitments']
    }
];

const state = {
    newsletterSubscribed: false,
    mobileMenuOpen: false,
    cart: []
};

document.addEventListener('DOMContentLoaded', () => {
    loadStoredState();
    populateProducts();
    populateBundles();
    populateAutomation();
    populateTestimonials();
    populateFaq();
    populateTimeline();
    setupEventListeners();
    renderCart();
    setCurrentYear();
});

function populateProducts() {
    const container = document.getElementById('product-grid');
    if (!container) return;
    container.innerHTML = products.map((product, index) => createProductCard(product, index)).join('');
}

function createProductCard(product, index) {
    const tags = product.tags.map(tag => `<span class="product-tag"><i class="fas fa-star"></i>${tag}</span>`).join('');
    const imageMarkup = product.image
        ? `<div class="product-media"><img src="${product.image}" alt="${product.imageAlt || product.name}" loading="lazy"></div>`
        : '';
    return `
        <div class="product-card">
            ${imageMarkup}
            <div class="flex items-center justify-between">
                <h3 class="text-2xl font-bold text-mcvay-navy">${product.name}</h3>
                <span class="metric-pill text-mcvay-gray"><i class="fas fa-coins"></i> ${product.profit}</span>
            </div>
            <p class="text-mcvay-gray leading-relaxed">${product.description}</p>
            <div class="space-y-2 text-sm text-mcvay-gray">
                <p><i class="fas fa-tag text-mcvay-blue mr-2"></i>${product.priceLabel}</p>
                <p><i class="fas fa-bullseye text-mcvay-blue mr-2"></i>${product.dailyTarget}</p>
                <p><i class="fas fa-gears text-mcvay-blue mr-2"></i>${product.automation}</p>
            </div>
            <div class="flex flex-wrap gap-2">${tags}</div>
            <div class="grid sm:grid-cols-2 gap-3">
                <button class="btn-primary w-full" data-product-index="${index}">Add to Drop Order</button>
                <a class="btn-secondary w-full text-center" href="${product.sheet}" target="_blank" rel="noopener">View Product Sheet</a>
            </div>
        </div>
    `;
}

function populateBundles() {
    const container = document.getElementById('bundle-grid');
    if (!container) return;
    container.innerHTML = bundles.map(createBundleCard).join('');
}

function createBundleCard(bundle) {
    const listItems = bundle.bullets.map(item => `<li class="text-sm text-mcvay-gray">${item}</li>`).join('');
    return `
        <div class="bundle-card space-y-4">
            <div class="flex items-center justify-between">
                <h3 class="text-xl font-bold text-mcvay-navy">${bundle.name}</h3>
                <span class="metric-pill text-mcvay-blue"><i class="fas fa-basket-shopping"></i> ${bundle.price}</span>
            </div>
            <p class="text-mcvay-gray text-sm">${bundle.stats}</p>
            <ul class="space-y-2">${listItems}</ul>
            <a class="btn-secondary w-full text-center" href="${bundle.document}" target="_blank" rel="noopener">Open Bundle Playbook</a>
        </div>
    `;
}

function populateAutomation() {
    const list = document.getElementById('automation-list');
    if (!list) return;
    list.innerHTML = automationStack.map(item => `
        <li class="automation-item">
            <i class="fas ${item.icon}"></i>
            <div>
                <h4 class="font-semibold text-mcvay-navy">${item.title}</h4>
                <p class="text-sm text-mcvay-gray">${item.description}</p>
                <p class="text-xs text-mcvay-blue font-semibold mt-2">${item.highlight}</p>
            </div>
        </li>
    `).join('');
}

function populateTestimonials() {
    const container = document.getElementById('testimonial-grid');
    if (!container) return;
    container.innerHTML = testimonials.map(createTestimonialCard).join('');
}

function createTestimonialCard(testimonial) {
    return `
        <article class="testimonial-card">
            <div class="testimonial-header">
                <img src="${testimonial.avatar}" alt="${testimonial.name}" class="testimonial-avatar" loading="lazy">
                <div>
                    <p class="testimonial-name">${testimonial.name}</p>
                    <p class="testimonial-role">${testimonial.role}</p>
                </div>
            </div>
            <p class="testimonial-quote">“${testimonial.quote}”</p>
            <div class="testimonial-footer">
                <span class="testimonial-metric"><i class="fas fa-chart-line"></i>${testimonial.metric}</span>
                <span class="testimonial-highlight">${testimonial.highlight}</span>
            </div>
        </article>
    `;
}

function populateFaq() {
    const container = document.getElementById('faq-list');
    if (!container) return;
    container.innerHTML = faqs.map(createFaqItem).join('');
}

function createFaqItem(faq, index) {
    return `
        <div class="faq-item" data-faq-item="${index}">
            <button type="button" class="faq-question" data-faq-toggle="${index}">
                <span>${faq.question}</span>
                <i class="fas fa-plus"></i>
            </button>
            <div class="faq-answer">
                <p>${faq.answer}</p>
            </div>
        </div>
    `;
}

function populateTimeline() {
    const container = document.getElementById('timeline');
    if (!container) return;
    container.innerHTML = timeline.map(item => {
        const tasks = item.tasks.map(task => `<li class="text-sm text-mcvay-gray flex items-start"><i class="fas fa-check text-green-500 mr-2 mt-1"></i>${task}</li>`).join('');
        return `
            <div class="timeline-card space-y-4">
                <div class="timeline-badge">${item.day}</div>
                <h3 class="text-xl font-bold text-mcvay-navy">${item.focus}</h3>
                <ul class="space-y-2">${tasks}</ul>
            </div>
        `;
    }).join('');
}

function setupEventListeners() {
    selectors.mobileMenuBtn?.addEventListener('click', toggleMobileMenu);

    buttons.newsletter.forEach(id => {
        const btn = document.getElementById(id);
        btn?.addEventListener('click', showNewsletterModal);
    });

    buttons.chatgpt.forEach(id => {
        const btn = document.getElementById(id);
        btn?.addEventListener('click', openChatGPTStore);
    });

    selectors.modalClose?.addEventListener('click', hideNewsletterModal);
    selectors.newsletterModal?.addEventListener('click', (event) => {
        if (event.target === selectors.newsletterModal) {
            hideNewsletterModal();
        }
    });

    selectors.newsletterForm?.addEventListener('submit', handleNewsletterSubmit);

    selectors.cartToggle?.addEventListener('click', toggleCart);
    selectors.mobileCartBtn?.addEventListener('click', toggleCart);
    selectors.cartClose?.addEventListener('click', closeCart);
    selectors.cartOverlay?.addEventListener('click', closeCart);

    selectors.checkoutBtn?.addEventListener('click', openOrderModal);

    selectors.orderModalClose?.addEventListener('click', closeOrderModal);
    selectors.orderModal?.addEventListener('click', (event) => {
        if (event.target === selectors.orderModal) {
            closeOrderModal();
        }
    });

    selectors.orderForm?.addEventListener('submit', handleOrderSubmit);

    document.addEventListener('click', handleGlobalClick);
    document.addEventListener('keydown', handleKeydown);
}

function handleGlobalClick(event) {
    const productBtn = event.target.closest('[data-product-index]');
    if (productBtn) {
        const index = parseInt(productBtn.getAttribute('data-product-index'), 10);
        addToCart(index);
        return;
    }

    const faqToggle = event.target.closest('[data-faq-toggle]');
    if (faqToggle) {
        const index = parseInt(faqToggle.getAttribute('data-faq-toggle'), 10);
        if (Number.isInteger(index)) {
            toggleFaqItem(index);
        }
        return;
    }

    const quantityBtn = event.target.closest('[data-cart-action]');
    if (quantityBtn) {
        const action = quantityBtn.getAttribute('data-cart-action');
        const index = parseInt(quantityBtn.getAttribute('data-cart-index'), 10);
        if (Number.isInteger(index)) {
            if (action === 'increment') incrementCartItem(index);
            if (action === 'decrement') decrementCartItem(index);
        }
        return;
    }

    const removeBtn = event.target.closest('[data-cart-remove]');
    if (removeBtn) {
        const index = parseInt(removeBtn.getAttribute('data-cart-remove'), 10);
        if (Number.isInteger(index)) {
            removeCartItem(index);
        }
    }
}

function handleKeydown(event) {
    if (event.key === 'Escape') {
        hideNewsletterModal();
        closeOrderModal();
        closeCart();
    }
}

function toggleMobileMenu() {
    if (!selectors.mobileMenu) return;
    state.mobileMenuOpen = !state.mobileMenuOpen;
    selectors.mobileMenu.classList.toggle('hidden');
    selectors.mobileMenuBtn.innerHTML = state.mobileMenuOpen
        ? '<i class="fas fa-times text-2xl"></i>'
        : '<i class="fas fa-bars text-2xl"></i>';
}

function showNewsletterModal() {
    if (state.newsletterSubscribed) {
        showNotification('You are already on the product drop list. Watch your inbox for updates.');
        return;
    }

    if (!selectors.newsletterModal) return;
    selectors.newsletterModal.classList.remove('hidden');
    selectors.newsletterModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function hideNewsletterModal() {
    if (!selectors.newsletterModal) return;
    selectors.newsletterModal.classList.add('hidden');
    selectors.newsletterModal.classList.remove('active');
    document.body.style.overflow = '';
}

async function handleNewsletterSubmit(event) {
    event.preventDefault();
    if (!selectors.newsletterForm) return;

    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton?.textContent;

    submitButton && (submitButton.textContent = 'Sending...');
    submitButton && (submitButton.disabled = true);

    const formData = new FormData(form);
    formData.append('_subject', 'New Faith Commerce subscriber');
    formData.append('_template', 'table');
    formData.append('_captcha', 'false');
    formData.append('source', 'Website product drops modal');

    try {
        await submitForm(config.newsletterEndpoint, formData);
        state.newsletterSubscribed = true;
        persistNewsletterState();
        hideNewsletterModal();
        form.reset();
        showNotification('Starter pack sent! Check your inbox within a few minutes.');
    } catch (error) {
        console.error('Newsletter submission failed', error);
        showNotification('We could not subscribe you. Please email aaron@mcvayenterprises.com.');
    } finally {
        if (submitButton) {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    }
}

async function submitForm(endpoint, formData) {
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            Accept: 'application/json'
        },
        body: formData
    });

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json();
}

function showNotification(message) {
    if (!selectors.successToast) return;
    selectors.successToast.querySelector('span').textContent = message;
    selectors.successToast.classList.remove('success-slide-in');
    void selectors.successToast.offsetWidth;
    selectors.successToast.classList.remove('hidden');
    selectors.successToast.classList.add('success-slide-in');
    setTimeout(() => {
        selectors.successToast.classList.add('hidden');
        selectors.successToast.classList.remove('success-slide-in');
    }, 3500);
}

function openChatGPTStore() {
    if (!config.chatgptStoreUrl) {
        showNotification('ChatGPT store link will be published shortly.');
        return;
    }
    const url = config.chatgptStoreUrl;
    window.open(url, '_blank', 'noopener');
}

function toggleFaqItem(index) {
    const target = document.querySelector(`[data-faq-item="${index}"]`);
    if (!target) return;
    const isOpen = target.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(item => item.classList.remove('open'));
    if (!isOpen) {
        target.classList.add('open');
    }
}

function loadStoredState() {
    try {
        const subscribed = localStorage.getItem(storageKeys.newsletter);
        state.newsletterSubscribed = subscribed === 'true';
    } catch (error) {
        console.warn('Unable to load newsletter state', error);
    }

    try {
        const storedCart = localStorage.getItem(storageKeys.cart);
        if (storedCart) {
            const parsed = JSON.parse(storedCart);
            if (Array.isArray(parsed)) {
                state.cart = parsed.filter(item => typeof item === 'object' && 'productIndex' in item && 'quantity' in item);
            }
        }
    } catch (error) {
        console.warn('Unable to load cart state', error);
    }
}

function persistNewsletterState() {
    try {
        localStorage.setItem(storageKeys.newsletter, state.newsletterSubscribed ? 'true' : 'false');
    } catch (error) {
        console.warn('Unable to persist newsletter state', error);
    }
}

function persistCart() {
    try {
        localStorage.setItem(storageKeys.cart, JSON.stringify(state.cart));
    } catch (error) {
        console.warn('Unable to persist cart', error);
    }
}

function addToCart(index) {
    if (!products[index]) return;
    const existing = state.cart.find(item => item.productIndex === index);
    if (existing) {
        existing.quantity += 1;
    } else {
        state.cart.push({ productIndex: index, quantity: 1 });
    }
    persistCart();
    renderCart();
    openCart();
    showNotification(`${products[index].name} added to your drop order.`);
}

function incrementCartItem(index) {
    const item = state.cart[index];
    if (!item) return;
    item.quantity += 1;
    persistCart();
    renderCart();
}

function decrementCartItem(index) {
    const item = state.cart[index];
    if (!item) return;
    if (item.quantity > 1) {
        item.quantity -= 1;
        persistCart();
        renderCart();
    } else {
        removeCartItem(index);
    }
}

function removeCartItem(index) {
    if (!state.cart[index]) return;
    const productName = products[state.cart[index].productIndex]?.name;
    state.cart.splice(index, 1);
    persistCart();
    renderCart();
    if (productName) {
        showNotification(`${productName} removed from your drop order.`);
    }
}

function renderCart() {
    if (!selectors.cartItems) return;

    if (!state.cart.length) {
        selectors.cartItems.innerHTML = '<p class="cart-empty">Your cart is empty. Add a product to begin a drop order.</p>';
    } else {
        selectors.cartItems.innerHTML = state.cart.map((item, index) => createCartItemMarkup(item, index)).join('');
    }

    const total = state.cart.reduce((sum, item) => {
        const product = products[item.productIndex];
        if (!product) return sum;
        return sum + product.price * item.quantity;
    }, 0);

    if (selectors.cartTotal) {
        selectors.cartTotal.textContent = formatCurrency(total);
    }

    updateCartCount();
    updateCheckoutButton();
    updateOrderSummary();
}

function createCartItemMarkup(item, index) {
    const product = products[item.productIndex];
    if (!product) return '';
    const imageMarkup = product.image
        ? `<img src="${product.image}" alt="${product.imageAlt || product.name}" class="cart-item-image" loading="lazy">`
        : '';
    return `
        <div class="cart-item">
            <div class="cart-item-header">
                ${imageMarkup}
                <div>
                    <p class="font-semibold text-mcvay-navy">${product.name}</p>
                    <p class="text-xs text-mcvay-gray">${product.priceLabel} • ${product.profit}</p>
                </div>
            </div>
            <div class="cart-item-controls">
                <div class="cart-quantity">
                    <button class="cart-qty-btn" data-cart-action="decrement" data-cart-index="${index}" aria-label="Decrease quantity"><i class="fas fa-minus"></i></button>
                    <span>${item.quantity}</span>
                    <button class="cart-qty-btn" data-cart-action="increment" data-cart-index="${index}" aria-label="Increase quantity"><i class="fas fa-plus"></i></button>
                </div>
                <div class="cart-item-meta">
                    <span>${formatCurrency(product.price * item.quantity)}</span>
                    <button class="cart-remove" data-cart-remove="${index}"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        </div>
    `;
}

function updateCartCount() {
    const count = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    if (selectors.cartCount) {
        selectors.cartCount.textContent = count.toString();
    }
    if (selectors.mobileCartCount) {
        selectors.mobileCartCount.textContent = count.toString();
    }
}

function updateCheckoutButton() {
    const hasItems = state.cart.length > 0;
    if (selectors.checkoutBtn) {
        selectors.checkoutBtn.disabled = !hasItems;
    }
}

function updateOrderSummary() {
    if (!selectors.orderSummaryList || !selectors.orderSummaryTotal) return;

    if (!state.cart.length) {
        selectors.orderSummaryList.innerHTML = '<li class="text-sm text-mcvay-gray">Add at least one product to request a checkout link.</li>';
        selectors.orderSummaryTotal.textContent = '$0.00';
        if (selectors.orderItemsField) selectors.orderItemsField.value = '';
        return;
    }

    const summaryLines = state.cart.map(item => {
        const product = products[item.productIndex];
        if (!product) return null;
        return {
            name: product.name,
            quantity: item.quantity,
            unitPrice: product.price,
            lineTotal: product.price * item.quantity
        };
    }).filter(Boolean);

    selectors.orderSummaryList.innerHTML = summaryLines.map(line => `
        <li class="flex items-center justify-between"><span>${line.quantity} × ${line.name}</span><span>${formatCurrency(line.lineTotal)}</span></li>
    `).join('');

    const subtotal = summaryLines.reduce((sum, line) => sum + line.lineTotal, 0);
    selectors.orderSummaryTotal.textContent = formatCurrency(subtotal);

    if (selectors.orderItemsField) {
        selectors.orderItemsField.value = JSON.stringify(summaryLines);
    }
}

function toggleCart() {
    if (!selectors.cartDrawer || !selectors.cartOverlay) return;
    if (selectors.cartDrawer.classList.contains('active')) {
        closeCart();
    } else {
        openCart();
    }
}

function openCart() {
    if (!selectors.cartDrawer || !selectors.cartOverlay) return;
    selectors.cartDrawer.classList.add('active');
    selectors.cartDrawer.classList.remove('hidden');
    selectors.cartOverlay.classList.remove('hidden');
    selectors.cartOverlay.classList.add('active');
}

function closeCart() {
    if (!selectors.cartDrawer || !selectors.cartOverlay) return;
    selectors.cartDrawer.classList.remove('active');
    selectors.cartDrawer.classList.add('hidden');
    selectors.cartOverlay.classList.add('hidden');
    selectors.cartOverlay.classList.remove('active');
}

function openOrderModal() {
    if (!state.cart.length) {
        showNotification('Add at least one product before requesting checkout.');
        return;
    }
    if (!selectors.orderModal) return;
    updateOrderSummary();
    selectors.orderModal.classList.remove('hidden');
    selectors.orderModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeOrderModal() {
    if (!selectors.orderModal) return;
    selectors.orderModal.classList.add('hidden');
    selectors.orderModal.classList.remove('active');
    document.body.style.overflow = '';
}

async function handleOrderSubmit(event) {
    event.preventDefault();
    if (!selectors.orderForm) return;

    if (!state.cart.length) {
        showNotification('Your cart is empty. Add a product before submitting.');
        return;
    }

    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton?.textContent;

    submitButton && (submitButton.textContent = 'Submitting...');
    submitButton && (submitButton.disabled = true);

    updateOrderSummary();

    const formData = new FormData(form);
    formData.append('cartTotal', selectors.orderSummaryTotal?.textContent || '');
    formData.append('cartItemsReadable', generateReadableCart());

    try {
        await submitForm(config.orderEndpoint, formData);
        form.reset();
        clearCart();
        closeOrderModal();
        showNotification('Order request received! Watch your email for a Shopify checkout link.');
    } catch (error) {
        console.error('Order submission failed', error);
        showNotification('We could not send your order. Please email aaron@mcvayenterprises.com.');
    } finally {
        if (submitButton) {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    }
}

function clearCart() {
    state.cart = [];
    persistCart();
    renderCart();
    closeCart();
}

function generateReadableCart() {
    if (!state.cart.length) return '';
    return state.cart.map(item => {
        const product = products[item.productIndex];
        if (!product) return '';
        return `${item.quantity} x ${product.name} (${formatCurrency(product.price)} ea)`;
    }).join(', ');
}

function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(value);
}

function setCurrentYear() {
    if (selectors.currentYear) {
        selectors.currentYear.textContent = new Date().getFullYear();
    }
}
