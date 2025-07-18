// Custom cursor tracking
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor-glow');
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Modal functionality
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const closeBtn = document.querySelector('.close-btn');
const getStartedBtn = document.getElementById('getStarted');

loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    loginModal.classList.remove('active');
});

loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.classList.remove('active');
    }
});

// Get Started button - redirect to home page
getStartedBtn.addEventListener('click', () => {
    // Add cinematic transition
    document.body.style.transition = 'transform 0.8s ease';
    document.body.style.transform = 'scale(1.1)';
    
    setTimeout(() => {
        window.location.href = 'home.html';
    }, 800);
});

// Add click ripple effect
document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(0, 245, 255, 0.6)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.left = (e.clientX - 25) + 'px';
    ripple.style.top = (e.clientY - 25) + 'px';
    ripple.style.width = '50px';
    ripple.style.height = '50px';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '9999';
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
});

// Add ripple animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Form validation and submission
document.querySelector('.auth-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;
    
    // Simulate login process
    const authBtn = e.target.querySelector('.auth-btn');
    authBtn.textContent = 'Logging in...';
    authBtn.style.background = 'linear-gradient(45deg, #666, #999)';
    
    setTimeout(() => {
        // Store user session
        localStorage.setItem('neoFoodUser', JSON.stringify({
            email: email,
            loginTime: new Date().toISOString()
        }));
        
        // Redirect to home
        window.location.href = 'home.html';
    }, 1500);
});

// 3D tilt effect for hero content
document.addEventListener('mousemove', (e) => {
    const heroContent = document.querySelector('.hero-content');
    const rect = heroContent.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const rotateX = (y / rect.height) * 10;
    const rotateY = (x / rect.width) * 10;
    
    heroContent.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
});

// Reset tilt when mouse leaves
document.addEventListener('mouseleave', () => {
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
});