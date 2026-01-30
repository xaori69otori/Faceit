/*
- Code by Xaori69otori
- Telegram: @Xaori69otori
- Code is like coffee - just as beautiful
*/

(function() {
    'use strict';

    const registrationModalBackdrop = document.querySelector('.fixed.inset-0.z-50.cursor-pointer');
    const registrationModal = document.querySelector('div[role="dialog"]#radix-_r_0_');

    const gameModals = {
        'cs2': 'modal_cs2',
        'dota2': 'modal_dota2',
        'pubg': 'modal_pubg',
        'rust': 'radix-_r_i_',
        'apex': 'radix-_r_o_',
        'deadlock': 'radix-_r_r_',
        'valorant': 'radix-_r_u_',
        'league': 'radix-_r_11_',
        'brawlstars': 'radix-_r_14_',
        'pubg_mobile': 'radix-_r_17_'
    };

    function openGameModal(gameId) {
        let modal = null;
        const modalId = gameModals[gameId];
        
        if (modalId) {
            modal = document.getElementById(modalId);
        }
        
        if (!modal) {
            const gameTitles = {
                'cs2': 'Counter-Strike 2',
                'dota2': 'Defense of the Ancients 2',
                'pubg': 'PlayerUnknown\'s Battlegrounds',
                'rust': 'Rust',
                'apex': 'Apex Legends',
                'deadlock': 'Deadlock',
                'valorant': 'Valorant',
                'league': 'League of Legends',
                'brawlstars': 'Brawl Stars',
                'pubg_mobile': 'PUBG Mobile'
            };
            
            const title = gameTitles[gameId];
            if (title) {
                const allModals = document.querySelectorAll('div[role="dialog"]:not(#radix-_r_0_)');
                allModals.forEach(m => {
                    const h2 = m.querySelector('h2');
                    if (h2 && h2.textContent.trim() === title) {
                        modal = m;
                    }
                });
            }
        }
        
        if (!modal) return;

        let backdrop = document.querySelector('.game-modal-backdrop');
        if (!backdrop) {
            backdrop = document.createElement('div');
            backdrop.className = 'game-modal-backdrop fixed inset-0 z-40 bg-black/90 cursor-pointer';
            backdrop.style.cssText = 'display: none; opacity: 0; transition: opacity 0.2s ease;';
            document.body.appendChild(backdrop);

            backdrop.addEventListener('click', function(e) {
                if (e.target === backdrop) {
                    closeGameModal();
                }
            });
        }

        backdrop.style.display = 'block';
        requestAnimationFrame(() => {
            backdrop.style.opacity = '1';
        });

        modal.style.display = 'grid';
        modal.setAttribute('data-state', 'open');
        modal.style.pointerEvents = 'auto';
        
        requestAnimationFrame(() => {
            modal.style.opacity = '1';
            modal.style.transform = 'translate(-50%, -50%) scale(1)';
        });

        document.body.style.overflow = 'hidden';

        const closeBtn = modal.querySelector('button[aria-label="Close"]');
        if (closeBtn) {
            closeBtn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                closeGameModal();
            };
        }

        const regButton = Array.from(modal.querySelectorAll('button')).find(btn => {
            const text = btn.textContent.trim().toUpperCase();
            return text === 'РЕГИСТРАЦИЯ' || text === 'REGISTRATION';
        });
        
        if (regButton) {
            const newRegButton = regButton.cloneNode(true);
            regButton.parentNode.replaceChild(newRegButton, regButton);
            
            newRegButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                closeGameModal();
                setTimeout(() => {
                    if (window.openRegistrationModal) {
                        window.openRegistrationModal();
                    } else {
                        openRegistrationModal();
                    }
                }, 200);
            }, true);
        }
    }

    function closeGameModal() {
        const backdrop = document.querySelector('.game-modal-backdrop');
        const openModals = document.querySelectorAll('div[role="dialog"][data-state="open"]:not(#radix-_r_0_)');

        openModals.forEach(modal => {
            modal.style.opacity = '0';
            modal.style.transform = 'translate(-50%, -50%) scale(0.95)';
            
            setTimeout(() => {
                modal.style.display = 'none';
                modal.setAttribute('data-state', 'closed');
                modal.style.pointerEvents = 'none';
            }, 200);
        });

        if (backdrop) {
            backdrop.style.opacity = '0';
            setTimeout(() => {
                backdrop.style.display = 'none';
            }, 200);
        }

        document.body.style.overflow = '';
    }

    function openRegistrationModal() {
        if (window.openRegistrationModal) {
            window.openRegistrationModal();
            return;
        }

        if (!registrationModalBackdrop || !registrationModal) return;

        registrationModalBackdrop.style.display = 'block';
        registrationModalBackdrop.setAttribute('data-state', 'open');
        registrationModalBackdrop.style.pointerEvents = 'auto';
        registrationModalBackdrop.setAttribute('aria-hidden', 'false');

        registrationModal.style.display = 'block';
        registrationModal.setAttribute('data-state', 'open');
        registrationModal.style.pointerEvents = 'auto';

        requestAnimationFrame(() => {
            registrationModalBackdrop.style.opacity = '1';
            registrationModal.style.opacity = '1';
            registrationModal.style.transform = 'translate(-50%, -50%) scale(1)';
        });

        document.body.style.overflow = 'hidden';
    }

    function init() {
        const allGameModals = document.querySelectorAll('div[role="dialog"]:not(#radix-_r_0_)');
        allGameModals.forEach(modal => {
            modal.style.display = 'none';
            modal.style.opacity = '0';
            modal.style.transform = 'translate(-50%, -50%) scale(0.95)';
            modal.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
            modal.setAttribute('data-state', 'closed');
            modal.style.pointerEvents = 'none';
        });

        const bigCards = document.querySelectorAll('.relative.cursor-pointer.flex.flex-col.items-center');
        bigCards.forEach(card => {
            const title = card.querySelector('h3');
            if (title) {
                const gameName = title.textContent.trim().toLowerCase();
                let gameId = null;

                if (gameName.includes('cs2') || gameName.includes('counter-strike')) {
                    gameId = 'cs2';
                } else if (gameName.includes('dota')) {
                    gameId = 'dota2';
                } else if (gameName.includes('pubg') && !gameName.includes('mobile')) {
                    gameId = 'pubg';
                }

                if (gameId) {
                    card.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        e.stopImmediatePropagation();
                        openGameModal(gameId);
                    }, true);
                }
            }
        });

        const smallCards = document.querySelectorAll('.relative.cursor-pointer.rounded-lg.overflow-hidden.transition-all.duration-200.ease-out.group');
        smallCards.forEach(card => {
            const img = card.querySelector('img[alt]');
            if (img) {
                const alt = img.getAttribute('alt').toLowerCase();
                let gameId = null;

                if (alt.includes('rust')) {
                    gameId = 'rust';
                } else if (alt.includes('apex')) {
                    gameId = 'apex';
                } else if (alt.includes('deadlock')) {
                    gameId = 'deadlock';
                } else if (alt.includes('valorant')) {
                    gameId = 'valorant';
                } else if (alt.includes('league')) {
                    gameId = 'league';
                } else if (alt.includes('brawl')) {
                    gameId = 'brawlstars';
                } else if (alt.includes('pubg') && alt.includes('mobile')) {
                    gameId = 'pubg_mobile';
                }

                if (gameId) {
                    card.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        e.stopImmediatePropagation();
                        openGameModal(gameId);
                    }, true);
                }
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const openModal = document.querySelector('div[role="dialog"][data-state="open"]:not(#radix-_r_0_)');
                if (openModal) {
                    closeGameModal();
                }
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.openGameModal = openGameModal;
    window.closeGameModal = closeGameModal;

})();