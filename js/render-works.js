/**
 * Рендеринг карточек работ с корректными путями
 */

// Определяем базовый путь в зависимости от текущей страницы
const getBasePath = () => {
    // Если мы на странице внутри папки pages/
    if (window.location.pathname.includes('/pages/')) {
        return '../';
    }
    // Если мы в корне сайта
    return '';
};

function renderWorks(containerSelector, works = portfolioWorks) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    
    const basePath = getBasePath();
    
    container.innerHTML = works.map(work => `
        <a href="${basePath}pages/work-detail.html?id=${work.id}" class="gallery-card" data-category="${work.category}">
            <div class="gallery-card__image">
                <img src="${basePath}${work.image}" alt="${work.title}" loading="lazy">
                ${work.status === 'sold' ? '<span class="badge badge--sold">Продано</span>' : ''}
            </div>
            <div class="gallery-card__info">
                <h3 class="gallery-card__title">${work.title}</h3>
                <p class="gallery-card__meta">${work.materials} • ${work.size}</p>
                <p class="gallery-card__price">${work.price}</p>
            </div>
        </a>
    `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    renderWorks('.gallery-grid');
});