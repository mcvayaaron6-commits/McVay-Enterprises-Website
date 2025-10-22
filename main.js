// McVay Enterprises Faith Commerce - Main Script

const CHATGPT_STORE_URL = 'https://chat.openai.com/';

const selectors = {
    mobileMenuBtn: document.getElementById('mobile-menu-btn'),
    mobileMenu: document.getElementById('mobile-menu'),
    newsletterModal: document.getElementById('newsletter-modal'),
    modalClose: document.getElementById('modal-close'),
    successToast: document.getElementById('success-message'),
    newsletterForm: document.getElementById('newsletter-form'),
    currentYear: document.getElementById('current-year')
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
        price: '$19.99 retail',
        profit: '$11.93 profit (84%)',
        dailyTarget: '58 units/day to hit $250K run rate',
        tags: ['Top Seller', 'High Margin'],
        automation: 'AutoDS • Ultimate Shield • TikTok organic'
    },
    {
        name: 'Blessed & Chosen Tee Collection',
        description: 'Printify direct-to-garment tees with 7 colorways and seasonal scripture drops.',
        price: '$24.99 retail',
        profit: '$10.34 profit (41%)',
        dailyTarget: '67 tees/day = $20.8K monthly revenue',
        tags: ['Trending', 'Print-on-Demand'],
        automation: 'Printify • Shopify Flow • Klaviyo'
    },
    {
        name: 'Sterling Cross Necklace Line',
        description: 'Hypoallergenic stainless-steel crosses with premium packaging and handwritten note option.',
        price: '$15.99 retail',
        profit: '$8.54 profit (53%)',
        dailyTarget: '81 necklaces/day for $250K annually',
        tags: ['Evergreen', 'Gift Ready'],
        automation: 'AutoDS • Branded packaging inserts'
    },
    {
        name: 'Scripture Canvas Wall Art',
        description: '12x18 gallery-wrapped canvases with AI-generated art variations for seasonal drops.',
        price: '$29.99 retail',
        profit: '$7.99 profit (27%)',
        dailyTarget: '87 canvases/day to unlock $1M run rate',
        tags: ['Premium', 'Seasonal'],
        automation: 'Printify • Scheduled releases'
    },
    {
        name: 'Daily Faith Planner',
        description: '90-day devotional planner with gratitude prompts and QR-linked worship playlists.',
        price: '$34.99 retail',
        profit: '$14.80 profit (42%)',
        dailyTarget: '42 planners/day to cross $180K per year',
        tags: ['Subscription Ready', 'Bundled'],
        automation: 'AutoDS • Notion fulfillment SOP'
    },
    {
        name: 'Family Devotional Starter Box',
        description: 'Monthly devotionals, sticker sheets, and bracelet trio packaged for family worship nights.',
        price: '$49.00 retail',
        profit: '$24.00 profit (49%)',
        dailyTarget: '28 boxes/day for $20K monthly profit',
        tags: ['Recurring', 'Community'],
        automation: 'Recharge Subscriptions • Klaviyo flows'
    }
];

const bundles = [
    {
        name: 'Launch Day Conversion Bundle',
        price: '$59 AOV',
        stats: 'Bracelet stack + devotional + email upsell',
        bullets: ['Auto applies 10% chat-exclusive discount', 'Includes 7-day SMS nurture sequence', 'Optimized for TikTok Live drops']
    },
    {
        name: 'Women’s Ministry Pack',
        price: '$149 wholesale',
        stats: '12 bracelets + 12 devotionals',
        bullets: ['Pre-built fundraiser landing page', 'Bulk order automation via AutoDS', 'Church partner outreach email templates']
    },
    {
        name: 'Seasonal Wall Art Series',
        price: '$34.99/mo subscription',
        stats: 'Quarterly limited-edition canvas releases',
        bullets: ['AI art prompts delivered monthly', 'Countdown timers embedded via ReConvert', 'Members-only community challenges']
    },
    {
        name: 'New Believer Welcome Kit',
        price: '$79 bundle',
        stats: 'Bible study, bracelet, journal, welcome letter',
        bullets: ['Automated personalization survey', 'Dynamic cross-sell emails', 'Gift note printing on demand']
    },
    {
        name: 'Corporate Gifting Set',
        price: '$42 per set',
        stats: 'Desk scripture art + leather bracelet',
        bullets: ['Bulk invoicing workflow in Shopify', 'Zapier integration with HubSpot', 'Custom engraving option ready']
    },
    {
        name: 'Faith Kids Surprise Pack',
        price: '$39 quarterly',
        stats: 'Stickers, devotionals, mini bracelets',
        bullets: ['Gamified loyalty program', 'Parent email curriculum', 'Pre-built unboxing script for UGC']
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
    mobileMenuOpen: false
};

document.addEventListener('DOMContentLoaded', () => {
    populateProducts();
    populateBundles();
    populateAutomation();
    populateTimeline();
    setupEventListeners();
    setCurrentYear();
});

function populateProducts() {
    const container = document.getElementById('product-grid');
    if (!container) return;
    container.innerHTML = products.map(createProductCard).join('');
}

function createProductCard(product) {
    const tags = product.tags.map(tag => `<span class="product-tag"><i class="fas fa-star"></i>${tag}</span>`).join('');
    return `
        <div class="product-card">
            <div class="flex items-center justify-between">
                <h3 class="text-2xl font-bold text-mcvay-navy">${product.name}</h3>
                <span class="metric-pill text-mcvay-gray"><i class="fas fa-coins"></i> ${product.profit}</span>
            </div>
            <p class="text-mcvay-gray leading-relaxed">${product.description}</p>
            <div class="space-y-2 text-sm text-mcvay-gray">
                <p><i class="fas fa-tag text-mcvay-blue mr-2"></i>${product.price}</p>
                <p><i class="fas fa-bullseye text-mcvay-blue mr-2"></i>${product.dailyTarget}</p>
                <p><i class="fas fa-gears text-mcvay-blue mr-2"></i>${product.automation}</p>
            </div>
            <div class="flex flex-wrap gap-2">${tags}</div>
            <button class="btn-primary w-full" data-product="${product.name}">Add to Shopify Queue</button>
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
            <button class="btn-secondary w-full" data-bundle="${bundle.name}">Load Bundle SOP</button>
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

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            hideNewsletterModal();
        }
    });

    document.addEventListener('click', (event) => {
        if (event.target.matches('[data-product]')) {
            const name = event.target.getAttribute('data-product');
            trackAction(`Product queued: ${name}`);
            showNotification(`${name} added to your Shopify queue.`);
        }
        if (event.target.matches('[data-bundle]')) {
            const name = event.target.getAttribute('data-bundle');
            trackAction(`Bundle SOP requested: ${name}`);
            showNotification(`${name} SOP sent to your inbox.`);
        }
    });
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
    if (state.newsletterSubscribed) {
        hideNewsletterModal();
        showNotification('You are already subscribed. Check your email for updates.');
        return;
    }

    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    try {
        await simulateSubscription();
        state.newsletterSubscribed = true;
        localStorage.setItem('mcvay_faith_commerce_subscriber', 'true');
        hideNewsletterModal();
        showNotification("Starter pack sent! Watch your inbox in the next 2 minutes.");
        form.reset();
    } catch (error) {
        console.error('Subscription error', error);
        showNotification('Something went wrong. Please try again.');
    } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
}

function simulateSubscription() {
    return new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
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
    window.open(CHATGPT_STORE_URL, '_blank');
}

function trackAction(message) {
    console.log(message);
}

function setCurrentYear() {
    if (selectors.currentYear) {
        selectors.currentYear.textContent = new Date().getFullYear();
    }
}

// Restore subscription state on load
if (localStorage.getItem('mcvay_faith_commerce_subscriber') === 'true') {
    state.newsletterSubscribed = true;
}
