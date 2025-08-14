// Upload Handler for The Crib Content Management System

class UploadHandler {
    constructor() {
        this.maxFileSize = {
            image: 10 * 1024 * 1024, // 10MB
            audio: 50 * 1024 * 1024, // 50MB
            video: 100 * 1024 * 1024 // 100MB
        };
        
        this.allowedTypes = {
            image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
            audio: ['audio/mpeg', 'audio/wav', 'audio/mp4', 'audio/ogg'],
            video: ['video/mp4', 'video/mov', 'video/avi', 'video/webm']
        };
        
        this.uploadQueue = [];
        this.uploadProgress = {};
    }

    async uploadFile(file, type) {
        try {
            // Validate file
            const validation = this.validateFile(file, type);
            if (!validation.valid) {
                throw new Error(validation.error);
            }

            // Compress image if needed
            let processedFile = file;
            if (type === 'image') {
                processedFile = await this.compressImage(file);
            }

            // Create upload task
            const uploadTask = {
                file: processedFile,
                type,
                id: this.generateId(),
                progress: 0
            };

            this.uploadQueue.push(uploadTask);
            return await this.performUpload(uploadTask);

        } catch (error) {
            console.error('Upload error:', error);
            throw error;
        }
    }

    validateFile(file, type) {
        // Check file type
        const allowedTypes = this.allowedTypes[type];
        if (!allowedTypes.includes(file.type)) {
            return {
                valid: false,
                error: `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`
            };
        }

        // Check file size
        const maxSize = this.maxFileSize[type];
        if (file.size > maxSize) {
            return {
                valid: false,
                error: `File too large. Maximum size: ${this.formatFileSize(maxSize)}`
            };
        }

        return { valid: true };
    }

    async compressImage(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    // Calculate new dimensions
                    const maxWidth = 1920;
                    const maxHeight = 1080;
                    let { width, height } = img;

                    if (width > maxWidth || height > maxHeight) {
                        const ratio = Math.min(maxWidth / width, maxHeight / height);
                        width *= ratio;
                        height *= ratio;
                    }

                    canvas.width = width;
                    canvas.height = height;

                    // Draw and compress
                    ctx.drawImage(img, 0, 0, width, height);

                    canvas.toBlob((blob) => {
                        const compressedFile = new File([blob], file.name, {
                            type: 'image/jpeg',
                            lastModified: Date.now()
                        });
                        resolve(compressedFile);
                    }, 'image/jpeg', 0.8);
                };
                img.onerror = reject;
                img.src = e.target.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    async performUpload(uploadTask) {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('file', uploadTask.file);
            formData.append('type', uploadTask.type);

            const xhr = new XMLHttpRequest();
            
            xhr.upload.addEventListener('progress', (e) => {
                if (e.lengthComputable) {
                    const progress = Math.round((e.loaded / e.total) * 100);
                    this.updateProgress(uploadTask.id, progress);
                }
            });

            xhr.addEventListener('load', () => {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    resolve({
                        id: uploadTask.id,
                        url: response.url,
                        type: uploadTask.type,
                        size: uploadTask.file.size
                    });
                } else {
                    reject(new Error('Upload failed'));
                }
            });

            xhr.addEventListener('error', () => {
                reject(new Error('Network error'));
            });

            // Simulate upload endpoint
            xhr.open('POST', '/api/upload');
            xhr.send(formData);
        });
    }

    updateProgress(uploadId, progress) {
        this.uploadProgress[uploadId] = progress;
        
        // Update UI
        const progressBar = document.getElementById(`progress-${uploadId}`);
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
    }

    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }

    formatFileSize(bytes) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        if (bytes === 0) return '0 Bytes';
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
    }

    async uploadMultiple(files, type) {
        const uploadPromises = Array.from(files).map(file => this.uploadFile(file, type));
        return Promise.all(uploadPromises);
    }

    cancelUpload(uploadId) {
        // Implementation for canceling upload
        const uploadTask = this.uploadQueue.find(task => task.id === uploadId);
        if (uploadTask && uploadTask.xhr) {
            uploadTask.xhr.abort();
        }
    }

    getUploadStatus(uploadId) {
        return this.uploadProgress[uploadId] || 0;
    }
}

// Global upload handler instance
const uploadHandler = new UploadHandler();

// Drag and drop functionality
class DragDropHandler {
    constructor(dropZone, onDrop) {
        this.dropZone = dropZone;
        this.onDrop = onDrop;
        this.setupDragDrop();
    }

    setupDragDrop() {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            this.dropZone.addEventListener(eventName, this.preventDefaults, false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            this.dropZone.addEventListener(eventName, this.highlight.bind(this), false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            this.dropZone.addEventListener(eventName, this.unhighlight.bind(this), false);
        });

        this.dropZone.addEventListener('drop', this.handleDrop.bind(this), false);
    }

    preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    highlight() {
        this.dropZone.classList.add('dragover');
    }

    unhighlight() {
        this.dropZone.classList.remove('dragover');
    }

    handleDrop(e) {
        const files = e.dataTransfer.files;
        this.onDrop(files);
    }
}

// Image preview generator
class ImagePreview {
    static generate(file) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                resolve(e.target.result);
            };
            reader.readAsDataURL(file);
        });
    }

    static createPreviewElement(file, previewUrl) {
        const container = document.createElement('div');
        container.className = 'file-preview-item';
        
        if (file.type.startsWith('image/')) {
            container.innerHTML = `
                <img src="${previewUrl}" alt="${file.name}">
                <button class="remove-btn" onclick="this.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            `;
        } else if (file.type.startsWith('video/')) {
            container.innerHTML = `
                <video src="${previewUrl}" controls></video>
                <button class="remove-btn" onclick="this.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            `;
        } else if (file.type.startsWith('audio/')) {
            container.innerHTML = `
                <audio src="${previewUrl}" controls></audio>
                <button class="remove-btn" onclick="this.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            `;
        }
        
        return container;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { UploadHandler, DragDropHandler, ImagePreview };
}
