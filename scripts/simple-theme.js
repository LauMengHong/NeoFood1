// Simple theme and address autofill functionality

document.addEventListener('DOMContentLoaded', () => {
    // Apply theme if saved
    applyTheme();
    
    // Setup theme selector
    setupThemeSelector();
    
    // Auto-fill address on checkout page
    autoFillAddress();
});

// Apply saved theme
function applyTheme() {
    const savedTheme = localStorage.getItem('neoFoodTheme') || 'dark';
    
    // Remove existing theme classes
    document.body.classList.remove('dark-theme', 'light-theme', 'neon-theme');
    
    // Add selected theme class
    document.body.classList.add(`${savedTheme}-theme`);
    
    // Update theme colors
    if (savedTheme === 'light') {
        document.documentElement.style.setProperty('--bg-color', '#f5f5f5');
        document.documentElement.style.setProperty('--text-light', '#121212');
        document.documentElement.style.setProperty('--text-secondary', '#555555');
        document.documentElement.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.7)');
    } else if (savedTheme === 'neon') {
        document.documentElement.style.setProperty('--neon-blue', '#ff00ff');
        document.documentElement.style.setProperty('--neon-purple', '#00ffff');
    }
}

// Setup theme selector
function setupThemeSelector() {
    const themeOptions = document.querySelectorAll('.theme-option');
    if (!themeOptions.length) return;
    
    // Get saved theme
    const savedTheme = localStorage.getItem('neoFoodTheme') || 'dark';
    
    // Set active theme
    themeOptions.forEach(option => {
        if (option.dataset.theme === savedTheme) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
        
        // Add click handler
        option.addEventListener('click', () => {
            // Update active class
            themeOptions.forEach(o => o.classList.remove('active'));
            option.classList.add('active');
            
            // Save theme preference
            localStorage.setItem('neoFoodTheme', option.dataset.theme);
            
            // Apply theme
            applyTheme();
            
            // Show notification
            showThemeNotification(`Theme changed to ${option.dataset.theme}`);
        });
    });
}

// Auto-fill address on checkout page
function autoFillAddress() {
    // Check if we're on checkout page
    const addressInput = document.querySelector('.checkout-form input[placeholder="Street Address"]');
    const cityInput = document.querySelector('.checkout-form input[placeholder="City"]');
    const zipInput = document.querySelector('.checkout-form input[placeholder="ZIP Code"]');
    const instructionsInput = document.querySelector('.checkout-form textarea');
    
    if (!addressInput) return;
    
    // Get saved address
    const savedAddress = JSON.parse(localStorage.getItem('neoFoodAddress') || '{}');
    
    // Fill in address fields if saved
    if (savedAddress.street) {
        addressInput.value = savedAddress.street;
    }
    
    if (savedAddress.city) {
        cityInput.value = savedAddress.city;
    }
    
    if (savedAddress.zip) {
        zipInput.value = savedAddress.zip;
    }
    
    if (savedAddress.instructions) {
        instructionsInput.value = savedAddress.instructions;
    }
}

// Save address from profile page
function saveAddress() {
    const addressInput = document.querySelector('input[placeholder="Enter your address"]');
    const instructionsInput = document.querySelector('textarea[placeholder="Special instructions..."]');
    
    if (!addressInput) return;
    
    // Parse address into parts (simple version)
    const addressParts = addressInput.value.split(',');
    const street = addressParts[0] ? addressParts[0].trim() : '';
    const city = addressParts[1] ? addressParts[1].trim() : '';
    const zip = addressParts[2] ? addressParts[2].trim() : '';
    
    // Save address
    const addressData = {
        street: street,
        city: city,
        zip: zip,
        instructions: instructionsInput ? instructionsInput.value : ''
    };
    
    localStorage.setItem('neoFoodAddress', JSON.stringify(addressData));
    
    // Show notification
    showThemeNotification('Address saved successfully');
}

// Show notification
function showThemeNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: rgba(0, 245, 255, 0.1);
        backdrop-filter: blur(15px);
        border: 1px solid #00f5ff;
        border-radius: 15px;
        padding: 15px 20px;
        color: white;
        z-index: 9999;
    `;
    
    notification.innerHTML = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Make functions global
window.saveAddress = saveAddress;