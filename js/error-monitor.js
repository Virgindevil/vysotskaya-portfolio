/**
 * ErrorMonitor — система мониторинга JavaScript ошибок
 * Практическая работа №7
 */

const ErrorMonitor = {
    errors: [],
    MAX_ERRORS: 10,
    STORAGE_KEY: 'vysotskaya_errors',
    
    init() {
        this.loadErrors();
        this.setupErrorHandlers();
        console.log('✅ ErrorMonitor initialized');
    },
    
    setupErrorHandlers() {
        // Перехват обычных ошибок
        window.addEventListener('error', (event) => {
            this.captureError({
                type: 'error',
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                stack: event.error?.stack || 'N/A',
                timestamp: new Date().toISOString(),
                page: window.location.href
            });
        });
        
        // Перехват ошибок Promise
        window.addEventListener('unhandledrejection', (event) => {
            this.captureError({
                type: 'unhandledrejection',
                message: event.reason?.message || 'Unhandled Promise Rejection',
                stack: event.reason?.stack || 'N/A',
                timestamp: new Date().toISOString(),
                page: window.location.href
            });
        });
    },
    
    captureError(errorData) {
        this.errors.unshift(errorData);
        if (this.errors.length > this.MAX_ERRORS) {
            this.errors = this.errors.slice(0, this.MAX_ERRORS);
        }
        this.saveErrors();
        console.warn('🔴 Error captured:', errorData.message);
    },
    
    saveErrors() {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.errors));
        } catch (e) {
            console.error('Failed to save errors to localStorage');
        }
    },
    
    loadErrors() {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            if (stored) {
                this.errors = JSON.parse(stored);
            }
        } catch (e) {
            this.errors = [];
        }
    },
    
    getErrors() {
        return this.errors;
    },
    
    clearErrors() {
        this.errors = [];
        localStorage.removeItem(this.STORAGE_KEY);
        console.log('🗑️ Errors cleared');
    },
    
    exportErrors() {
        console.table(this.errors);
        return this.errors;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    ErrorMonitor.init();
});