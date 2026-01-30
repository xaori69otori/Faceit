/*
- Code by Xaori69otori
- Telegram: @Xaori69otori
- Code is like coffee - just as beautiful
*/

const faceitOverlay = document.getElementById('faceitOverlay');
const faceitCloseBtn = document.getElementById('faceitClose');
const faceitBackBtn = document.getElementById('faceitBack');
const statusTitle = document.getElementById('statusTitle');

function applyFinalState() {
    const items = document.querySelectorAll('.faceit-list li');
    items.forEach((item, index) => {
        const icon = item.querySelector('.icon');
        const statusText = item.querySelector('.status-text');
        const textSpan = item.querySelector('.text');
        
        while (textSpan.childNodes.length > 2) {
            textSpan.removeChild(textSpan.lastChild);
        }
        
        if (index < 4) {
            icon.innerHTML = '✓';
            icon.className = 'icon confirmed';
            statusText.textContent = 'Confirmed';
            statusText.className = 'status-text confirmed-text';
        } else {
            icon.innerHTML = 'ℹ';
            icon.className = 'icon suspicious';
            statusText.textContent = 'Suspicious account 3 day';
            statusText.className = 'status-text suspicious-text';
        }
    });
    
    statusTitle.textContent = 'Application status: Error';
    statusTitle.classList.add('faceit-status-error');
}

function startChecking() {
    const items = document.querySelectorAll('.faceit-list li');
    let delay = 800;
    
    items.forEach((item, index) => {
        setTimeout(() => {
            const icon = item.querySelector('.icon');
            const statusText = item.querySelector('.status-text');
            const textSpan = item.querySelector('.text');
            
            while (textSpan.childNodes.length > 2) {
                textSpan.removeChild(textSpan.lastChild);
            }
            
            if (index < 4) {
                icon.innerHTML = '✓';
                icon.className = 'icon confirmed';
                statusText.textContent = 'Confirmed';
                statusText.className = 'status-text confirmed-text';
            } else {
                icon.innerHTML = 'ℹ';
                icon.className = 'icon suspicious';
                statusText.textContent = 'Suspicious account 3 day';
                statusText.className = 'status-text suspicious-text';
            }
        }, delay);
        
        delay += 800;
    });
    
    setTimeout(() => {
        statusTitle.textContent = 'Application status: Error';
        statusTitle.classList.add('faceit-status-error');
        localStorage.setItem('faceitChecksCompleted', 'true');
    }, delay);
}

faceitCloseBtn.addEventListener('click', () => {
    faceitOverlay.style.display = 'none';
});

faceitBackBtn.addEventListener('click', () => {
    faceitOverlay.style.display = 'none';
});

faceitOverlay.addEventListener('click', (e) => {
    if (e.target === faceitOverlay) {
        faceitOverlay.style.display = 'none';
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && faceitOverlay.style.display === 'flex') {
        faceitOverlay.style.display = 'none';
    }
});

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('verification')) {
    faceitOverlay.style.display = 'flex';
    
    if (localStorage.getItem('faceitChecksCompleted') === 'true') {
        applyFinalState();
    } else {
        startChecking();
    }
}