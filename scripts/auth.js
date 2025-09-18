
let currentAuthForm = 'login';

// Init
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
});

function setupEventListeners() {
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) loginBtn.addEventListener('click', openLoginModal);

    const loginBtn2 = document.getElementById('loginBtn2');
    if (loginBtn2) loginBtn2.addEventListener('click', openLoginModal);

    const loginBtn3 = document.getElementById('loginBtn3');
    if (loginBtn3) loginBtn3.addEventListener('click', openLoginModal);

    const getStartedBtn = document.getElementById('getStartedBtn');
    if (getStartedBtn) getStartedBtn.addEventListener('click', openSignupModal);

    const getStartedBtn2 = document.getElementById('getStartedBtn2');
    if (getStartedBtn2) getStartedBtn2.addEventListener('click', openSignupModal);

    const closeBtns = document.querySelectorAll('.closeModal');
    closeBtns.forEach(btn => btn.addEventListener('click', closeAuthModal));

    // Form validations
    const loginForm = document.getElementById('loginFormElement');
    if (loginForm) loginForm.addEventListener('submit', validateLoginForm);

    const signupForm = document.getElementById('signupFormElement');
    if (signupForm) signupForm.addEventListener('submit', validateSignupForm);

    // Password strength indicator
    const signupPassword = document.getElementById('signupPassword');
    if (signupPassword) signupPassword.addEventListener('input', checkPasswordStrength);
}

// --- Modal functions ---
function openLoginModal() {
    currentAuthForm = 'login';
    showAuthModal();
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('signupForm').classList.add('hidden');
}

function openSignupModal() {
    currentAuthForm = 'signup';
    showAuthModal();
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('signupForm').classList.remove('hidden');
}

function showAuthModal() {
    const modal = document.getElementById('authModal');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
    resetForms();
}

// --- Form validation ---
function validateLoginForm(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    let valid = true;

    if (!isValidEmail(email)) {
        showNotification('Enter a valid email 📧', 'error');
        valid = false;
    }

    if (password.length < 8) {
        showNotification('Password must be at least 8 characters 🔒', 'error');
        valid = false;
    }

    if (valid) {
        showNotification('Login form is valid ✅ (but no real login)', 'success');
        closeAuthModal();
    }
}

function validateSignupForm(e) {
    e.preventDefault();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;

    let valid = true;

    if (!isValidEmail(email)) {
        showNotification('Enter a valid email 📧', 'error');
        valid = false;
    }

    if (password.length < 8) {
        showNotification('Password must be at least 8 characters 🔑', 'error');
        valid = false;
    }

    if (password !== confirmPassword) {
        showNotification('Passwords do not match ❌', 'error');
        valid = false;
    }

    if (valid) {
        showNotification('Signup form is valid 🎉 (but no real signup)', 'success');
        closeAuthModal();
    }
}

// --- Password strength ---
function checkPasswordStrength() {
    const password = document.getElementById('signupPassword').value;
    const strengthBars = [
        document.getElementById('strength1'),
        document.getElementById('strength2'),
        document.getElementById('strength3'),
        document.getElementById('strength4')
    ];

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    // Reset
    strengthBars.forEach(bar => bar.className = 'w-8 h-1 bg-gray-200 rounded');

    // Apply
    for (let i = 0; i < Math.min(strength, 4); i++) {
        if (strength <= 2) {
            strengthBars[i].className = 'w-8 h-1 bg-red-500 rounded';
        } else if (strength === 3) {
            strengthBars[i].className = 'w-8 h-1 bg-yellow-500 rounded';
        } else {
            strengthBars[i].className = 'w-8 h-1 bg-green-500 rounded';
        }
    }
}

// --- Utils ---
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function resetForms() {
    document.querySelectorAll('form').forEach(form => form.reset());
    const strengthBars = document.querySelectorAll('[id^="strength"]');
    strengthBars.forEach(bar => bar.className = 'w-8 h-1 bg-gray-200 rounded');
}

// Password toggle
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling.querySelector('i');
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
    }
}

// Notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
        type === 'success' ? 'bg-green-500' :
        type === 'error' ? 'bg-red-500' : 'bg-blue-500'
    } text-white`;
    
    notification.innerHTML = `
        <div class="flex items-center">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 4000);
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('authModal');
    if (e.target === modal) closeAuthModal();
});

// Close modal on escape key
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAuthModal();
});
