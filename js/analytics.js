/**
 * SimpleAnalytics — система отслеживания кликов и событий
 * Практическая работа №7
 */

const SimpleAnalytics = {
    events: [],
    MAX_EVENTS: 100,
    STORAGE_KEY: 'vysotskaya_analytics',
    
    init() {
        this.loadEvents();
        this.setupClickTracking();
        this.setupFormTracking();
        this.setupPageViewTracking();
        console.log('✅ SimpleAnalytics initialized');
    },
    
    setupClickTracking() {
        document.addEventListener('click', (event) => {
            const target = event.target;
            const eventData = {
                type: 'click',
                elementType: target.tagName.toLowerCase(),
                elementId: target.id || null,
                elementClass: target.className || null,
                elementText: this.truncateText(target.innerText, 50),
                url: window.location.href,
                timestamp: new Date().toISOString(),
                selector: this.getElementSelector(target)
            };
            this.trackEvent(eventData);
        });
    },
    
    setupFormTracking() {
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', (event) => {
                const eventData = {
                    type: 'form_submit',
                    formId: form.id || 'unnamed',
                    formAction: form.action || 'N/A',
                    url: window.location.href,
                    timestamp: new Date().toISOString()
                };
                this.trackEvent(eventData);
            });
        });
    },
    
    setupPageViewTracking() {
        const eventData = {
            type: 'page_view',
            url: window.location.href,
            title: document.title,
            timestamp: new Date().toISOString()
        };
        this.trackEvent(eventData);
    },
    
    trackEvent(eventData) {
        this.events.unshift(eventData);
        if (this.events.length > this.MAX_EVENTS) {
            this.events = this.events.slice(0, this.MAX_EVENTS);
        }
        this.saveEvents();
    },
    
    saveEvents() {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.events));
        } catch (e) {
            console.error('Failed to save analytics');
        }
    },
    
    loadEvents() {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            if (stored) {
                this.events = JSON.parse(stored);
            }
        } catch (e) {
            this.events = [];
        }
    },
    
    truncateText(text, maxLength) {
        if (!text) return '';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    },
    
    getElementSelector(element) {
        if (element.id) return `#${element.id}`;
        if (element.className) {
            const classes = element.className.split(' ').filter(c => c).slice(0, 2);
            if (classes.length) return `${element.tagName}.${classes.join('.')}`;
        }
        return element.tagName;
    },
    
    getStats() {
        const stats = {
            totalEvents: this.events.length,
            clicks: this.events.filter(e => e.type === 'click').length,
            formSubmits: this.events.filter(e => e.type === 'form_submit').length,
            pageViews: this.events.filter(e => e.type === 'page_view').length,
            topElements: this.getTopElements()
        };
        return stats;
    },
    
    getTopElements() {
        const elementCounts = {};
        this.events
            .filter(e => e.type === 'click')
            .forEach(e => {
                const key = e.selector || e.elementType;
                elementCounts[key] = (elementCounts[key] || 0) + 1;
            });
        
        return Object.entries(elementCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);
    },
    
    exportStats() {
        console.table(this.getStats());
        return this.getStats();
    },
    
    clearEvents() {
        this.events = [];
        localStorage.removeItem(this.STORAGE_KEY);
        console.log('🗑️ Analytics cleared');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    SimpleAnalytics.init();
});