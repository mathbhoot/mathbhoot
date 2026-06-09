// ==================== PAGE NAVIGATION ==================== //

/**
 * This script handles:
 * 1. Scene/Page transitions
 * 2. Button click events
 * 3. Smooth animations between pages
 */

// Get all scene elements
const scenes = document.querySelectorAll('.scene');
const enterBtn = document.getElementById('enterBtn');
const navButtons = document.querySelectorAll('[data-scene]');

/**
 * FUNCTION: showScene
 * Hides all scenes and shows the requested scene with animation
 * 
 * @param {string} sceneId - The ID of the scene to display
 */
function showScene(sceneId) {
    // Hide all scenes
    scenes.forEach(scene => {
        scene.classList.remove('active');
    });

    // Show the requested scene
    const targetScene = document.getElementById(sceneId);
    if (targetScene) {
        targetScene.classList.add('active');
        // Scroll to top for better UX
        window.scrollTo(0, 0);
    }
}

/**
 * EVENT LISTENER: Enter Button
 * When user clicks "ENTER AT YOUR OWN RISK" button
 * Navigate to the Protagonist page
 */
enterBtn.addEventListener('click', () => {
    showScene('protagonist');
});

/**
 * EVENT LISTENERS: Navigation Buttons
 * When user clicks any navigation button (← BACK or → NEXT)
 * Navigate to the specified scene using data-scene attribute
 */
navButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const targetScene = e.target.dataset.scene;
        showScene(targetScene);
    });
});

/**
 * KEYBOARD NAVIGATION (BONUS FEATURE)
 * Allow users to navigate using arrow keys
 * Arrow Left = Go Back
 * Arrow Right = Go Forward
 */
const sceneOrder = ['home', 'protagonist', 'antagonist', 'escape', 'about'];

document.addEventListener('keydown', (e) => {
    const currentScene = document.querySelector('.scene.active').id;
    const currentIndex = sceneOrder.indexOf(currentScene);

    if (e.key === 'ArrowLeft' && currentIndex > 0) {
        // Go to previous scene
        showScene(sceneOrder[currentIndex - 1]);
    } else if (e.key === 'ArrowRight' && currentIndex < sceneOrder.length - 1) {
        // Go to next scene
        showScene(sceneOrder[currentIndex + 1]);
    }
});

/**
 * SCROLL BEHAVIOR
 * Smooth scroll effect when navigating between pages
 */
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar && window.scrollY > 50) {
        navbar.style.opacity = '0.8';
    } else if (navbar) {
        navbar.style.opacity = '1';
    }
});

/**
 * PAGE LOAD INITIALIZATION
 * Ensure the home page is displayed on page load
 */
document.addEventListener('DOMContentLoaded', () => {
    showScene('home');
    console.log('🖤 Welcome to Mathbhoot - Where Math Meets The Unknown 🖤');
});

// ==================== EASTER EGGS & INTERACTIVITY ==================== //

/**
 * EASTER EGG: Console message
 * Just a fun message for developers who inspect the page
 */
console.log('%c🖤 Welcome to Mathbhoot 🖤', 'color: #8a2be2; font-size: 20px; font-weight: bold;');
console.log('%cWhere Math Meets The Unknown', 'color: #b22222; font-size: 14px; font-style: italic;');
console.log('%cCan you escape?', 'color: #e0e0e0; font-size: 12px;');
