// JavaScript for The Crib Landing Page

// Toggle mobile menu
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Footer JavaScript Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Back to top button functionality
    const backToTopBtn = document.getElementById('backToTop');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    // Show/hide back to top button based on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.remove('opacity-0', 'invisible');
            backToTopBtn.classList.add('opacity-100', 'visible');
        } else {
            backToTopBtn.classList.add('opacity-0', 'invisible');
            backToTopBtn.classList.remove('opacity-100', 'visible');
        }
    });
    
    // Back to top button click handler
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Newsletter form submission
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // Here you would typically send the email to your backend
                alert(`Thank you for subscribing with email: ${email}`);
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address');
            }
        });
    }
    
    // Initialize creatives on page load
    loadCreatives();
    
    // Add staggered animation
    const cards = document.querySelectorAll('.card-hover');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 100}ms`;
        card.classList.add('animate-fadeInUp');
    });
});

// Enhanced button functionality
const getStartedBtn = document.getElementById('getStartedBtn');
getStartedBtn.addEventListener('click', () => {
    alert('Get Started button clicked!');
});

// Login button functionality
const loginBtn = document.getElementById('loginBtn');
loginBtn.addEventListener('click', () => {
    alert('Login button clicked!');
});

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function loadCreatives() {
    // Placeholder function for loading creatives
    console.log('Loading creatives...');
}
