/**
 * Логика бургер-меню
 * Практическая работа №5
 */

document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('navBurger');
    const mobileNav = document.getElementById('navMobile');
    
    if (!burger || !mobileNav) return;
    
    burger.addEventListener('click', () => {
        const isExpanded = burger.getAttribute('aria-expanded') === 'true';
        
        burger.setAttribute('aria-expanded', !isExpanded);
        mobileNav.hidden = isExpanded;
        
        document.body.classList.toggle('menu-open', !isExpanded);
        
        if (!isExpanded) {
            const firstLink = mobileNav.querySelector('a');
            firstLink?.focus();
        }
    });
    
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            burger.setAttribute('aria-expanded', 'false');
            mobileNav.hidden = true;
            document.body.classList.remove('menu-open');
        });
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !mobileNav.hidden) {
            burger.setAttribute('aria-expanded', 'false');
            mobileNav.hidden = true;
            document.body.classList.remove('menu-open');
            burger.focus();
        }
    });
    
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && !mobileNav.hidden) {
            mobileNav.hidden = true;
            document.body.classList.remove('menu-open');
            burger.setAttribute('aria-expanded', 'false');
        }
    });
});