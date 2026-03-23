/**
 * Фильтрация работ по категориям
 * Практическая работа №5
 */

function initWorksFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryGrid = document.querySelector('.gallery-grid');
    
    if (!filterButtons.length || !galleryGrid) return;
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.dataset.filter;
            
            if (category === 'all') {
                renderWorks('.gallery-grid', portfolioWorks);
            } else {
                const filtered = portfolioWorks.filter(work => work.category === category);
                renderWorks('.gallery-grid', filtered);
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', initWorksFilter);