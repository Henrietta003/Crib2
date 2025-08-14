// Content Validator for The Crib Content Management System

class ContentValidator {
    constructor() {
        this.minTitleLength = 3;
        this.minContentLength = 10;
    }

    validatePost(title, content) {
        const errors = [];

        if (!this.validateTitle(title)) {
            errors.push(`Title must be at least ${this.minTitleLength} characters long.`);
        }

        if (!this.validateContent(content)) {
            errors.push(`Content must be at least ${this.minContentLength} characters long.`);
        }

        return {
            valid: errors.length === 0,
            errors
        };
    }

    validateTitle(title) {
        return title && title.length >= this.minTitleLength;
    }

    validateContent(content) {
        return content && content.length >= this.minContentLength;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ContentValidator };
}
