// ==================== PAGE NAVIGATION ==================== //

/**
 * This script handles:
 * 1. Navigation link updates (active state)
 * 2. Smooth scrolling to sections
 * 3. Music player toggle
 * 4. Back to home functionality
 */

// ==================== NAVIGATION LINK ACTIVATION ==================== //

/**
 * Update active nav link based on scroll position
 */
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    // Check which section is currently in view
    if (window.scrollY < 500) {
        current = 'home';
    } else if (window.scrollY < 1200) {
        current = 'cards';
    } else {
        current = 'about';
    }

    // Update active state
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// ==================== SMOOTH SCROLLING ==================== //

/**
 * Enable smooth scrolling for all navigation links
 */
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ==================== CTA BUTTON NAVIGATION ==================== //

/**
 * Handle main CTA button click
 * Scroll to protagonist section
 */
const ctaButtons = document.querySelectorAll('.primary-btn');
ctaButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const protagonistSection = document.querySelector('#protagonist');
        if (protagonistSection) {
            protagonistSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ==================== CARD LINK NAVIGATION ==================== //

/**
 * Handle card link clicks
 * Navigate to respective sections
 */
const cardLinks = document.querySelectorAll('.card-link');
cardLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ==================== MUSIC PLAYER ==================== //

/**
 * Toggle music on button click
 * Note: Add your own audio file for background music
 */
const musicBtn = document.getElementById('musicBtn');
let musicPlaying = false;

musicBtn.addEventListener('click', () => {
    musicPlaying = !musicPlaying;
    
    if (musicPlaying) {
        musicBtn.style.background = '#d4af37';
        musicBtn.style.color = '#0a0a0a';
        console.log('🎵 Music started...');
    } else {
        musicBtn.style.background = 'none';
        musicBtn.style.color = '#d4af37';
        console.log('🎵 Music stopped.');
    }
});

// ==================== BACK TO HOME ==================== //

/**
 * Function to navigate back to home
 * Called from hidden sections
 */
function backToHome() {
    const homeSection = document.querySelector('#home');
    if (homeSection) {
        homeSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// ==================== EASTER EGG ==================== //

/**
 * Console messages for developers
 */
console.log('%c🖤 Welcome to Mathbhoot 🖤', 'color: #d4af37; font-size: 20px; font-weight: bold;');
console.log('%cWhere Math Meets The Unknown', 'color: #8a2be2; font-size: 14px; font-style: italic;');
console.log('%cLearn. Solve. Escape.', 'color: #d4af37; font-size: 12px;');

// ==================== PAGE LOAD ==================== //

document.addEventListener('DOMContentLoaded', () => {
    // Ensure home section is active on page load
    const homeLink = document.querySelector('a[href="#home"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }
});

// ==================== KEYBOARD SHORTCUTS ==================== //

/**
 * Add keyboard shortcuts for navigation
 * H = Home
 * P = Protagonist
 * A = Antagonist/About
 * E = Escape Guide
 */
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) return; // Don't interfere with browser shortcuts

    switch(e.key.toLowerCase()) {
        case 'h':
            document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
            break;
        case 'p':
            document.querySelector('#protagonist').scrollIntoView({ behavior: 'smooth' });
            break;
        case 'e':
            document.querySelector('#escape').scrollIntoView({ behavior: 'smooth' });
            break;
        case 'a':
            document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
            break;
    }
});
