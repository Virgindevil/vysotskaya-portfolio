/**
 * AnalyticsPanel — скрытая панель для просмотра статистики
 * Активируется комбинацией Ctrl+Shift+A
 * Практическая работа №7
 */

const AnalyticsPanel = {
    panel: null,
    isVisible: false,
    
    init() {
        this.createPanel();
        this.setupKeyboardShortcut();
    },
    
    createPanel() {
        this.panel = document.createElement('div');
        this.panel.id = 'analytics-panel';
        this.panel.innerHTML = `
            <div class="panel-header">
                <h3>📊 Аналитика сайта</h3>
                <button class="panel-close">&times;</button>
            </div>
            <div class="panel-content">
                <div class="stat-card">
                    <span class="stat-label">Всего событий</span>
                    <span class="stat-value" id="stat-total">0</span>
                </div>
                <div class="stat-card">
                    <span class="stat-label">Клики</span>
                    <span class="stat-value" id="stat-clicks">0</span>
                </div>
                <div class="stat-card">
                    <span class="stat-label">Отправки форм</span>
                    <span class="stat-value" id="stat-forms">0</span>
                </div>
                <div class="stat-card">
                    <span class="stat-label">Просмотры страниц</span>
                    <span class="stat-value" id="stat-views">0</span>
                </div>
                <div class="top-elements">
                    <h4>Топ-5 элементов</h4>
                    <ul id="top-elements-list"></ul>
                </div>
                <div class="panel-actions">
                    <button id="export-btn">📥 Экспорт JSON</button>
                    <button id="clear-btn">🗑️ Очистить</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(this.panel);
        this.setupPanelEvents();
    },
    
    setupPanelEvents() {
        this.panel.querySelector('.panel-close').addEventListener('click', () => {
            this.hide();
        });
        
        this.panel.querySelector('#export-btn').addEventListener('click', () => {
            this.exportData();
        });
        
        this.panel.querySelector('#clear-btn').addEventListener('click', () => {
            SimpleAnalytics.clearEvents();
            this.updateStats();
        });
    },
    
    setupKeyboardShortcut() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'A') {
                e.preventDefault();
                this.toggle();
            }
        });
    },
    
    toggle() {
        if (this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
    },
    
    show() {
        this.panel.classList.add('visible');
        this.isVisible = true;
        this.updateStats();
    },
    
    hide() {
        this.panel.classList.remove('visible');
        this.isVisible = false;
    },
    
    updateStats() {
        if (!SimpleAnalytics) return;
        const stats = SimpleAnalytics.getStats();
        document.getElementById('stat-total').textContent = stats.totalEvents;
        document.getElementById('stat-clicks').textContent = stats.clicks;
        document.getElementById('stat-forms').textContent = stats.formSubmits;
        document.getElementById('stat-views').textContent = stats.pageViews;
        
        const topList = document.getElementById('top-elements-list');
        topList.innerHTML = stats.topElements
            .map(([element, count]) => `<li>${element}: ${count} кликов</li>`)
            .join('');
    },
    
    exportData() {
        const data = {
            stats: SimpleAnalytics.getStats(),
            events: SimpleAnalytics.events,
            exportedAt: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `analytics-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    AnalyticsPanel.init();
});