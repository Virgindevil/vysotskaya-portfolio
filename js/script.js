/**
 * Основной скрипт инициализации
 * Практические работы №4, №5
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ===== Валидация формы комиссии (если есть на странице) =====
    const commissionForm = document.getElementById('commissionForm');
    const successModal = document.getElementById('successModal');
    
    if (commissionForm) {
        commissionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            
            // Простая валидация
            const name = commissionForm.querySelector('#name');
            const email = commissionForm.querySelector('#email');
            const consent = commissionForm.querySelector('[name="consent"]');
            
            if (name && name.value.trim().length < 2) {
                alert('Введите корректное имя');
                isValid = false;
            }
            
            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                alert('Введите корректный email');
                isValid = false;
            }
            
            if (consent && !consent.checked) {
                alert('Необходимо согласие на обработку данных');
                isValid = false;
            }
            
            if (isValid) {
                // Показать модальное окно успеха
                if (successModal) {
                    successModal.hidden = false;
                    document.body.style.overflow = 'hidden';
                } else {
                    alert('Спасибо! Заявка отправлена.');
                }
                
                commissionForm.reset();
            }
        });
    }
    
    // ===== Плавная прокрутка к якорям =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    console.log('✅ Site initialized');
});