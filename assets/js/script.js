/*
- Code by Xaori69otori
- Telegram: @Xaori69otori
- Code is like coffee - just as beautiful
*/

const style = [
    'background: linear-gradient(to right, #e3f2fd, #e8f5ff);',
    'border: 1px solid #bbdefb;',
    'border-left: 5px solid #2196f3;',
    'color: #1565c0;',
    'font-weight: bold;',
    'font-size: 15px;',
    'padding: 10px 18px 10px 14px;',
    'margin: 8px 0;',
    'border-radius: 8px;',
    'box-shadow: 0 2px 8px rgba(33, 150, 243, 0.15);',
].join(' ');

console.log(`%c👨‍💻 AUTHOR XAORI\n🌐 Telegram: https://t.me/xaori69otori`, style);

document.addEventListener('DOMContentLoaded', function() {
  const searchButtons = document.querySelectorAll('.search-button');
  const searchModal = document.getElementById('searchModal');
  const searchModalOverlay = document.getElementById('searchModalOverlay');
  const searchModalClose = document.getElementById('searchModalClose');
  const searchInput = searchModal?.querySelector('input[type="text"]');

  function openSearchModal() {
    if (searchModal && searchModalOverlay) {
      searchModal.classList.remove('hidden');
      searchModalOverlay.classList.remove('hidden');
      
      setTimeout(() => {
        searchModalOverlay.style.opacity = '1';
        searchModal.style.opacity = '1';
        searchModal.style.transform = 'translateY(0px)';
      }, 10);
      
      if (searchInput) {
        setTimeout(() => {
          searchInput.focus();
        }, 100);
      }
      
      document.body.style.overflow = 'hidden';
    }
  }

  function closeSearchModal() {
    if (searchModal && searchModalOverlay) {
      searchModalOverlay.style.opacity = '0';
      searchModal.style.opacity = '0';
      searchModal.style.transform = 'translateY(-10px)';
      
      setTimeout(() => {
        searchModal.classList.add('hidden');
        searchModalOverlay.classList.add('hidden');
      }, 200);
      
      document.body.style.overflow = '';
    }
  }

  searchButtons.forEach(button => {
    button.addEventListener('click', openSearchModal);
  });

  if (searchModalClose) {
    searchModalClose.addEventListener('click', closeSearchModal);
  }

  if (searchModalOverlay) {
    searchModalOverlay.addEventListener('click', function(e) {
      if (e.target === searchModalOverlay) {
        closeSearchModal();
      }
    });
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && searchModal && !searchModal.classList.contains('hidden')) {
      closeSearchModal();
    }
  });

  document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      if (searchModal && searchModal.classList.contains('hidden')) {
        openSearchModal();
      } else {
        closeSearchModal();
      }
    }
  });
});