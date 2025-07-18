// Login functionality for NeoFood

document.addEventListener('DOMContentLoaded', () => {
    setupLoginModal();
    setupAuthForms();
});

function setupLoginModal() {
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeBtn = document.querySelector('.close-btn');
    const getStartedBtn = document.getElementById('getStarted');
    
    // Open modal on login button click
    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.style.display = 'flex';
        });
    }
    
    // Open modal on get started button click
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', () => {
            loginModal.style.display = 'flex';
        });
    }
    
    // Close modal on close button click
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            loginModal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });
}

function setupAuthForms() {
    const authForm = document.querySelector('.auth-form');
    const switchToRegister = document.getElementById('switchToRegister');
    
    if (authForm) {
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple login - in a real app, this would validate with a server
            const email = authForm.querySelector('input[type="email"]').value;
            const password = authForm.querySelector('input[type="password"]').value;
            
            if (email && password) {
                // Store user info
                localStorage.setItem('neoFoodUser', JSON.stringify({
                    email: email,
                    name: email.split('@')[0]
                }));
                
                // Redirect to home page
                window.location.href = 'home.html';
            }
        });
    }
    
    // Switch between login and register (not implemented fully)
    if (switchToRegister) {
        switchToRegister.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Registration functionality coming soon!');
        });
    }
}