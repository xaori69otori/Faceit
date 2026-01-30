/*
- Code by Xaori69otori
- Telegram: @Xaori69otori
- Code is like coffee - just as beautiful
*/

(function() {
    'use strict';

    const modalBackdrop = document.querySelector('.fixed.inset-0.z-50.cursor-pointer');
    const modalDialog = document.querySelector('div[role="dialog"]');
    const closeButton = modalDialog ? modalDialog.querySelector('button[aria-label="Close"]') : null;

    function openModal() {
        if (!modalBackdrop || !modalDialog) return;

        modalBackdrop.style.display = 'block';
        modalBackdrop.setAttribute('data-state', 'open');
        modalBackdrop.style.pointerEvents = 'auto';
        modalBackdrop.setAttribute('aria-hidden', 'false');

        modalDialog.style.display = 'block';
        modalDialog.setAttribute('data-state', 'open');
        modalDialog.style.pointerEvents = 'auto';

        document.body.style.overflow = 'hidden';

        requestAnimationFrame(() => {
            modalBackdrop.style.opacity = '1';
            modalDialog.style.opacity = '1';
            modalDialog.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    }

    function closeModal() {
        if (!modalBackdrop || !modalDialog) return;

        modalBackdrop.style.opacity = '0';
        modalDialog.style.opacity = '0';
        modalDialog.style.transform = 'translate(-50%, -50%) scale(0.95)';

        setTimeout(() => {
            modalBackdrop.style.display = 'none';
            modalBackdrop.setAttribute('data-state', 'closed');
            modalBackdrop.style.pointerEvents = 'none';
            modalBackdrop.setAttribute('aria-hidden', 'true');

            modalDialog.style.display = 'none';
            modalDialog.setAttribute('data-state', 'closed');
            modalDialog.style.pointerEvents = 'none';

            document.body.style.overflow = '';
        }, 200);
    }

    function init() {
        if (modalBackdrop && modalDialog) {
            modalBackdrop.style.display = 'none';
            modalBackdrop.style.opacity = '0';
            modalBackdrop.style.transition = 'opacity 0.2s ease';
            modalBackdrop.setAttribute('data-state', 'closed');
            modalBackdrop.setAttribute('aria-hidden', 'true');

            modalDialog.style.display = 'none';
            modalDialog.style.opacity = '0';
            modalDialog.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
            modalDialog.style.transform = 'translate(-50%, -50%) scale(0.95)';
            modalDialog.setAttribute('data-state', 'closed');
        }

        const allButtons = document.querySelectorAll('button');
        const registrationButtons = [];

        allButtons.forEach(button => {
            const isInGameModal = button.closest('div[role="dialog"]:not(#radix-_r_0_)');
            if (isInGameModal) {
                return;
            }

            const text = button.textContent.trim().toUpperCase();
            if (text === 'РЕГИСТРАЦИЯ' || text === 'REGISTRATION' || text.includes('РЕГИСТРАЦИЯ')) {
                registrationButtons.push(button);
            }
        });

        const allSpans = document.querySelectorAll('span');
        allSpans.forEach(span => {
            const isInGameModal = span.closest('div[role="dialog"]:not(#radix-_r_0_)');
            if (isInGameModal) {
                return; 
            }

            const isInGameCard = span.closest('.relative.cursor-pointer.flex.flex-col.items-center') ||
                                span.closest('.relative.cursor-pointer.rounded-lg.overflow-hidden.transition-all.duration-200.ease-out.group');
            if (isInGameCard) {
                return; 
            }

            const text = span.textContent.trim();
            if (text === 'Регистрация' || text === 'РЕГИСТРАЦИЯ') {
                let parent = span.parentElement;
                while (parent && parent !== document.body) {
                    if (parent.classList.contains('relative') && 
                        (parent.classList.contains('cursor-pointer') && 
                         (parent.classList.contains('flex') || parent.classList.contains('rounded-lg')))) {
                        break; 
                    }
                    
                    if (parent.classList.contains('cursor-pointer') || 
                        parent.tagName === 'BUTTON' || 
                        parent.onclick !== null ||
                        parent.getAttribute('onclick')) {
                        registrationButtons.push(parent);
                        break;
                    }
                    parent = parent.parentElement;
                }
            }
        });

        const uniqueButtons = [...new Set(registrationButtons)];

        uniqueButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                openModal();
            });
        });

        if (modalBackdrop) {
            modalBackdrop.addEventListener('click', function(e) {
                if (e.target === modalBackdrop) {
                    closeModal();
                }
            });
        }

        if (closeButton) {
            closeButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                closeModal();
            });
        }

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modalDialog && modalDialog.getAttribute('data-state') === 'open') {
                closeModal();
            }
        });

        console.log(`Найдено кнопок регистрации: ${uniqueButtons.length}`);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.openRegistrationModal = openModal;

})();