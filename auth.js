// Authentication JavaScript for The Crib

// Global variables
let currentAuthForm = 'login';
let authToken = localStorage.getItem('authToken') || null;

// Initialize authentication
document.addEventListener('DOMContentLoaded', () => {
    initializeAuth();
    setupEventListeners();
});

function initializeAuth() {
    // Check if user is already logged in
    if (authToken) {
        updateUIForLoggedInUser();
    }
}

function setupEventListeners() {
    // Login button click
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', handleLoginButtonClick);
    }

    // Get started button click
    const getStartedBtn = document.getElementById('getStartedBtn');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', handleGetStartedButtonClick);
    }

    // Form submissions
    const loginForm = document.getElementById('loginFormElement');
    const signupForm = document.getElementById('signupFormElement');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }

    // Password strength indicator
    const signupPassword = document.getElementById('signupPassword');
    if (signupPassword) {
        signupPassword.addEventListener('input', checkPasswordStrength);
    }

    // Confirm password validation
    const confirmPassword = document.getElementById('signupConfirmPassword');
    if (confirmPassword) {
        confirmPassword.addEventListener('input', validateConfirmPassword);
    }
}

function handleLoginButtonClick() {
    if (authToken) {
        // User is logged in, show profile dropdown
        showProfileDropdown();
    } else {
        // User is not logged in, show login modal
        openLoginModal();
    }
}

function handleGetStartedButtonClick() {
    if (authToken) {
        // User is logged in, redirect to dashboard
        showNotification('Redirecting to dashboard...', 'info');
    } else {
        // User is not logged in, show signup modal
        openSignupModal();
    }
}

// Modal functions
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

function showLoginForm() {
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('signupForm').classList.add('hidden');
    currentAuthForm = 'login';
}

function showSignupForm() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('signupForm').classList.remove('hidden');
    currentAuthForm = 'signup';
}

// Form handling
async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    // Validate form
    if (!validateLoginForm(email, password)) {
        return;
    }
    
    showLoading();
    
    try {
        // Simulate API call - replace with actual endpoint
        await simulateLogin(email, password);
        
        // Store token
        authToken = 'simulated_token_' + Date.now();
        localStorage.setItem('authToken', authToken);
        
        // Update UI
        updateUIForLoggedInUser();
        closeAuthModal();
        showNotification('Welcome back!', 'success');
        
    } catch (error) {
        console.error('Login error:', error);
        showNotification('Login failed. Please check your credentials.', 'error');
    } finally {
        hideLoading();
    }
}

async function handleSignup(e) {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const username = document.getElementById('signupUsername').value.trim();
    const role = document.getElementById('signupRole').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    // Validate form
    if (!validateSignupForm(name, email, username, role, password, confirmPassword)) {
        return;
    }
    
    showLoading();
    
    try {
        // Simulate API call - replace with actual endpoint
        await simulateSignup({ name, email, username, role, password });
        
        // Auto-login after registration
        authToken = 'simulated_token_' + Date.now();
        localStorage.setItem('authToken', authToken);
        
        updateUIForLoggedInUser();
        closeAuthModal();
        showNotification('Account created successfully!', 'success');
        
    } catch (error) {
        console.error('Signup error:', error);
        showNotification('Registration failed. Please try again.', 'error');
    } finally {
        hideLoading();
    }
}

// Validation functions
function validateLoginForm(email, password) {
    let isValid = true;
    
    // Reset error messages
    hideAllErrors();
    
    // Email validation
    if (!email || !isValidEmail(email)) {
        showError('loginEmailError', 'Please enter a valid email');
        isValid = false;
    }
    
    // Password validation
    if (!password || password.length < 6) {
        showError('loginPasswordError', 'Password must be at least 6 characters');
        isValid = false;
    }
    
    return isValid;
}

function validateSignupForm(name, email, username, role, password, confirmPassword) {
    let isValid = true;
    
    // Reset error messages
    hideAllErrors();
    
    // Name validation
    if (!name || name.length < 2) {
        showError('signupNameError', 'Name must be at least 2 characters');
        isValid = false;
    }
    
    // Email validation
    if (!email || !isValidEmail(email)) {
        showError('signupEmailError', 'Please enter a valid email');
        isValid = false;
    }
    
    // Username validation
    if (!username || username.length < 3) {
        showError('signupUsernameError', 'Username must be at least 3 characters');
        isValid = false;
    }
    
    // Role validation
    if (!role) {
        showError('signupRoleError', 'Please select your role');
        isValid = false;
    }
    
    // Password validation
    if (!password || password.length < 8) {
        showError('signupPasswordError', 'Password must be at least 8 characters');
        isValid = false;
    }
    
    // Confirm password validation
    if (password !== confirmPassword) {
        showError('signupConfirmPasswordError', 'Passwords do not match');
        isValid = false;
    }
    
    // Terms validation
    if (!document.getElementById('terms').checked) {
        showNotification('Please accept the terms and conditions', 'error');
        isValid = false;
    }
    
    return isValid;
}

// Password strength checker
function checkPasswordStrength() {
    const password = document.getElementById('signupPassword').value;
    const strengthIndicator = document.getElementById('passwordStrength');
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
    
    // Reset all bars
    strengthBars.forEach(bar => {
        bar.className = 'w-8 h-1 bg-gray-200 rounded';
    });
    
    // Update bars based on strength
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

function validateConfirmPassword() {
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    if (confirmPassword && password !== confirmPassword) {
        showError('signupConfirmPasswordError', 'Passwords do not match');
    } else {
        hideError('signupConfirmPasswordError');
    }
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

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

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }
}

function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.classList.add('hidden');
    }
}

function hideAllErrors() {
    const errorElements = document.querySelectorAll('.text-red-500');
    errorElements.forEach(element => {
        element.classList.add('hidden');
    });
}

function showLoading() {
    document.getElementById('loadingOverlay').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loadingOverlay').classList.add('hidden');
}

function showNotification(message, type = 'info') {
    // Create notification element
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
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function updateUIForLoggedInUser() {
    // Update login button to show user profile
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.textContent = 'Profile';
    }
    
    // Update get started button
    const getStartedBtn = document.getElementById('getStartedBtn');
    if (getStartedBtn) {
        getStartedBtn.textContent = 'Go to Dashboard';
    }
}

function showProfileDropdown() {
    // Create and show profile dropdown
    const existingDropdown = document.getElementById('profileDropdown');
    if (existingDropdown) {
        existingDropdown.remove();
        return;
    }

    const dropdown = document.createElement('div');
    dropdown.id = 'profileDropdown';
    dropdown.className = 'absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50';
    dropdown.innerHTML = `
        <div class="px-4 py-3 border-b">
            <p class="text-sm font-medium text-gray-900">Welcome!</p>
            <p class="text-xs text-gray-500">You're logged in</p>
        </div>
        <a href="profile.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Profile</a>
        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Projects</a>
        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
        <hr>
        <button onclick="logout()" class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Sign Out</button>
    `;

    const loginBtn = document.getElementById('loginBtn');
    loginBtn.parentElement.style.position = 'relative';
    loginBtn.parentElement.appendChild(dropdown);

    // Position dropdown
    const btnRect = loginBtn.getBoundingClientRect();
    dropdown.style.top = (btnRect.bottom + window.scrollY) + 'px';
    dropdown.style.right = '0';

    // Close dropdown when clicking outside
    setTimeout(() => {
        document.addEventListener('click', closeProfileDropdown);
    }, 100);
}

function closeProfileDropdown(e) {
    const dropdown = document.getElementById('profileDropdown');
    const loginBtn = document.getElementById('loginBtn');
    
    if (dropdown && !dropdown.contains(e.target) && e.target !== loginBtn) {
        dropdown.remove();
        document.removeEventListener('click', closeProfileDropdown);
    }
}

function resetForms() {
    // Reset all form inputs
    const forms = document.querySelectorAll('form');
    forms.forEach(form => form.reset());
    
    // Hide all error messages
    hideAllErrors();
    
    // Reset password strength indicator
    const strengthBars = document.querySelectorAll('[id^="strength"]');
    strengthBars.forEach(bar => {
        bar.className = 'w-8 h-1 bg-gray-200 rounded';
    });
}

function logout() {
    localStorage.removeItem('authToken');
    authToken = null;
    
    // Reset UI
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.textContent = 'Sign In';
        loginBtn.onclick = openLoginModal;
    }
    
    const getStartedBtn = document.getElementById('getStartedBtn');
    if (getStartedBtn) {
        getStartedBtn.textContent = 'Get Started Free';
        getStartedBtn.onclick = openSignupModal;
    }
    
    showNotification('You have been logged out', 'info');
}

// Simulate API calls (replace with actual endpoints)
async function simulateLogin(email, password) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate success/failure
    if (email === 'demo@thecrib.com' && password === 'password123') {
        return { success: true, token: 'demo_token' };
    } else {
        throw new Error('Invalid credentials');
    }
}

async function simulateSignup(userData) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate success
    return { success: true, token: 'demo_token' };
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('authModal');
    if (e.target === modal) {
        closeAuthModal();
    }
});

// Close modal on escape key
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAuthModal();
    }
});
