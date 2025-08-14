// Profile Management JavaScript

// Global variables
let currentUser = null;

// Initialize profile
document.addEventListener('DOMContentLoaded', () => {
    initializeProfile();
    setupEventListeners();
});

function initializeProfile() {
    // Check if user is logged in
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        window.location.href = 'index.html';
        return;
    }

    // Load user data
    loadUserData();
}

// Setup event listeners for profile actions
function setupEventListeners() {
    document.getElementById('editProfileBtn').addEventListener('click', openEditProfileModal);
    document.getElementById('editBioBtn').addEventListener('click', openEditBioModal);
    document.getElementById('editSkillsBtn').addEventListener('click', openEditSkillsModal);
    document.getElementById('editContactBtn').addEventListener('click', openEditContactModal);
    document.getElementById('editSocialBtn').addEventListener('click', openEditSocialModal);
}

// Load user data
function loadUserData() {
    // Simulate loading user data
    const mockUserData = {
        name: 'Alex Johnson',
        email: 'alex@example.com',
        bio: 'Creative professional specializing in photography and design.',
        skills: ['Photography', 'Graphic Design', 'Video Editing'],
        socialLinks: {
            instagram: '@alexjohnson',
            twitter: '@alexjohnson'
        }
    };

    currentUser = mockUserData;
    displayUserData(mockUserData);
}

// Display user data on the profile page
function displayUserData(user) {
    document.getElementById('profileHeaderName').textContent = user.name;
    document.getElementById('profileBio').textContent = user.bio;
    document.getElementById('profileEmail').textContent = user.email;

    // Display skills
    const skillsContainer = document.getElementById('skillsContainer');
    skillsContainer.innerHTML = '';
    user.skills.forEach(skill => {
        const skillTag = document.createElement('span');
        skillTag.className = 'skill-tag';
        skillTag.textContent = skill;
        skillsContainer.appendChild(skillTag);
    });

    // Display social links
    const socialLinksContainer = document.getElementById('socialLinksContainer');
    socialLinksContainer.innerHTML = '';
    Object.entries(user.socialLinks).forEach(([platform, username]) => {
        const link = document.createElement('div');
        link.className = 'flex items-center';
        link.innerHTML = `<i class="fab fa-${platform} text-gray-400 mr-3"></i><span>${username}</span>`;
        socialLinksContainer.appendChild(link);
    });
}

// Open edit profile modal
function openEditProfileModal() {
    // Logic to open the edit profile modal
}

// Open edit bio modal
function openEditBioModal() {
    // Logic to open the edit bio modal
}

// Open edit skills modal
function openEditSkillsModal() {
    // Logic to open the edit skills modal
}

// Open edit contact modal
function openEditContactModal() {
    // Logic to open the edit contact modal
}

// Open edit social links modal
function openEditSocialModal() {
    // Logic to open the edit social links modal
}

// Save changes to user data
function saveUserData() {
    // Logic to save user data
}
