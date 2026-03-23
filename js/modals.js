/**
 * Управление модальными окнами
 * Практическая работа №5
 */

document.addEventListener('DOMContentLoaded', () => {
    // Модальное окно просмотра работы
    const workModal = document.getElementById('workModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalMeta = document.getElementById('modalMeta');
    const modalDesc = document.getElementById('modalDesc');
    
    // Открытие модального окна (пример для галереи)
    document.querySelectorAll('.gallery-card').forEach((card, index) => {
        card.addEventListener('click', (e) => {
            // Если нужно открывать модалку вместо перехода
            // e.preventDefault();
            // const work = portfolioWorks[index];
            // openWorkModal(work);
        });
    });
    
    function openWorkModal(work) {
        if (!workModal) return;
        modalImage.src = work.imageFull;
        modalImage.alt = work.title;
        modalTitle.textContent = work.title;
        modalMeta.textContent = `${work.materials} • ${work.size}`;
        modalDesc.textContent = work.description;
        
        workModal.hidden = false;
        document.body.style.overflow = 'hidden';
    }
    
    // Закрытие модальных окон
    document.querySelectorAll('[data-close]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            if (modal) {
                modal.hidden = true;
                document.body.style.overflow = '';
            }
        });
    });
    
    // Закрытие по клику вне контента
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('modal__overlay')) {
                modal.hidden = true;
                document.body.style.overflow = '';
            }
        });
    });
    
    // Закрытие по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal:not([hidden])').forEach(modal => {
                modal.hidden = true;
                document.body.style.overflow = '';
            });
        }
    });
    
    // Навигация в модальном окне работ (если нужно)
    let currentWorkIndex = 0;
    document.getElementById('prevWork')?.addEventListener('click', () => {
        currentWorkIndex = (currentWorkIndex - 1 + portfolioWorks.length) % portfolioWorks.length;
        openWorkModal(portfolioWorks[currentWorkIndex]);
    });
    
    document.getElementById('nextWork')?.addEventListener('click', () => {
        currentWorkIndex = (currentWorkIndex + 1) % portfolioWorks.length;
        openWorkModal(portfolioWorks[currentWorkIndex]);
    });
    
    // Экспорт функции для глобального доступа
    window.openWorkModal = openWorkModal;
});