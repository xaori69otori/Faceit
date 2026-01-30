/*
- Code by Xaori69otori
- Telegram: @Xaori69otori
- Code is like coffee - just as beautiful
*/

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