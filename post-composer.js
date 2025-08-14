function handleTextInput() {
    // Handle text input changes
    const content = document.getElementById('postContent').value;
    // Additional logic for handling text input can be added here
}

// Global variables
let currentPostType = 'text';
let uploadedFiles = [];
let authToken = localStorage.getItem('authToken') || null;

// Initialize post composer
document.addEventListener('DOMContentLoaded', () => {
    initializePostComposer();
    setupEventListeners();
});

function initializePostComposer() {
    // Check if user is logged in
    if (authToken) {
        updateUIForLoggedInUser();
    }
    
    // Initialize content type selector
    initializeContentTypeSelector();
    
    // Initialize upload system
    initializeUploadSystem();
}

function setupEventListeners() {
    // Content type selector
    const contentTypeBtns = document.querySelectorAll('.post-type-btn');
    contentTypeBtns.forEach(btn => {
        btn.addEventListener('click', handleContentTypeChange);
    });

    // Form submission
    const postForm = document.getElementById('postForm');
    if (postForm) {
        postForm.addEventListener('submit', handlePostSubmit);
    }

    // Upload system
    const uploadInputs = document.querySelectorAll('input[type="file"]');
    uploadInputs.forEach(input => {
        input.addEventListener('change', handleFileUpload);
    });

    // Text formatting
    const textEditor = document.getElementById('postContent');
    if (textEditor) {
        textEditor.addEventListener('input', handleTextInput);
    }
}

function initializeContentTypeSelector() {
    const contentTypeBtns = document.querySelectorAll('.post-type-btn');
    contentTypeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            handleContentTypeChange(e);
        });
    });
}

function handleContentTypeChange(e) {
    const contentTypeBtns = document.querySelectorAll('.post-type-btn');
    contentTypeBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    
    e.target.classList.add('active');
    currentPostType = e.target.dataset.type;
    
    // Show/hide relevant fields
    showContentFields(currentPostType);
}

function showContentFields(type) {
    const contentFields = document.querySelectorAll('.content-field');
    contentFields.forEach(field => {
        field.classList.add('hidden');
    });
    
    const targetField = document.getElementById(type + 'Content');
    if (targetField) {
        targetField.classList.remove('hidden');
    }
}

function initializeUploadSystem() {
    const uploadInputs = document.querySelectorAll('input[type="file"]');
    uploadInputs.forEach(input => {
        input.addEventListener('change', handleFileUpload);
    });
}

function handleFileUpload(e) {
    const files = e.target.files;
    const uploadContainer = e.target.closest('.upload-container');
    
    if (files && files.length > 0) {
        processFiles(files, uploadContainer);
    }
}

function processFiles(files, container) {
    const fileList = Array.from(files);
    
    fileList.forEach(file => {
        const fileItem = createFileItem(file);
        container.appendChild(fileItem);
    });
}

function createFileItem(file) {
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item bg-gray-50 p-4 rounded-lg mb-4';
    fileItem.innerHTML = `
        <div class="flex items-center justify-between">
            <div class="flex items-center">
                <i class="fas fa-file text-gray-500 mr-2"></i>
                <span class="text-sm text-gray-700">${file.name}</span>
            </div>
            <button type="button" onclick="removeFile(this)" class="text-red-500 hover:text-red-700">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    return fileItem;
}

function removeFile(button) {
    const fileItem = button.closest('.file-item');
    fileItem.remove();
}

function handlePostSubmit(e) {
    e.preventDefault();
    
    const title = document.getElementById('postTitle').value.trim();
    const content = document.getElementById('postContent').value.trim();
    const type = currentPostType;
    
    // Validate form
    if (!validatePostForm(title, content, type)) {
        return;
    }
    
    showLoading();
    
    try {
        // Simulate API call
        const postData = {
            title,
            content,
            type,
            files: uploadedFiles
        };
        
        // Simulate success
        showNotification('Post created successfully!', 'success');
        closeModal();
        
    } catch (error) {
        console.error('Post creation error:', error);
        showNotification('Post creation failed. Please try again.', 'error');
    } finally {
        hideLoading();
    }
}

function validatePostForm(title, content, type) {
    let isValid = true;
    
    if (!title || title.length < 3) {
        showError('titleError', 'Title must be at least 3 characters');
        isValid = false;
    }
    
    if (!content || content.length < 10) {
        showError('contentError', 'Content must be at least 10 characters');
        isValid = false;
    }
    
    return isValid;
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

function showLoading() {
    document.getElementById('loadingOverlay').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loadingOverlay').classList.add('hidden');
}

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
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidFile(file) {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/mov', 'audio/mp3', 'audio/wav'];
    return validTypes.includes(file.type);
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

// File upload handler
function handleFileUpload(e) {
    const files = e.target.files;
    const uploadContainer = e.target.closest('.upload-container');
    
    if (files && files.length > 0) {
        processFiles(files, uploadContainer);
    }
}

function processFiles(files, container) {
    const fileList = Array.from(files);
    
    fileList.forEach(file => {
        const fileItem = createFileItem(file);
        container.appendChild(fileItem);
    });
}

function createFileItem(file) {
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item bg-gray-50 p-4 rounded-lg mb-4';
    fileItem.innerHTML = `
        <div class="flex items-center justify-between">
            <div class="flex items-center">
                <i class="fas fa-file text-gray-500 mr-2"></i>
                <span class="text-sm text-gray-700">${file.name}</span>
            </div>
            <button type="button" onclick="removeFile(this)" class="text-red-500 hover:text-red-700">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    return fileItem;
}

function removeFile(button) {
    const fileItem = button.closest('.file-item');
    fileItem.remove();
}

// Initialize post composer
initializePostComposer();
