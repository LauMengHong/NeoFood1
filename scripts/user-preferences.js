// User preferences management for NeoFood
// Handles theme settings and delivery addresses

// Default user preferences
const defaultPreferences = {
    theme: 'dark',
    notifications: {
        orderUpdates: true,
        promotions: true
    },
    deliveryAddresses: [
        {
            name: 'Home',
            address: '123 Cyber Street, Neo City',
            instructions: 'Ring doorbell twice'
        }
    ],
    defaultAddressIndex: 0
};

// Initialize user preferences
document.addEventListener('DOMContentLoaded', () => {
    initializePreferences();
    
    // Apply theme on page load
    applyTheme();
    
    // Setup theme selector if on profile page
    setupThemeSelector();
    
    // Setup address management if on profile page
    setupAddressManagement();
    
    // Auto-fill address on checkout page
    autoFillCheckoutAddress();
});

// Initialize preferences if not already set
function initializePreferences() {
    if (!localStorage.getItem('neoFoodPreferences')) {
        localStorage.setItem('neoFoodPreferences', JSON.stringify(defaultPreferences));
    }
}

// Get user preferences
function getUserPreferences() {
    return JSON.parse(localStorage.getItem('neoFoodPreferences') || JSON.stringify(defaultPreferences));
}

// Save user preferences
function saveUserPreferences(preferences) {
    localStorage.setItem('neoFoodPreferences', JSON.stringify(preferences));
}

// Apply theme based on user preference
function applyTheme() {
    const preferences = getUserPreferences();
    const theme = preferences.theme;
    
    // Remove any existing theme classes
    document.body.classList.remove('dark-theme', 'light-theme', 'neon-theme');
    
    // Add selected theme class
    document.body.classList.add(`${theme}-theme`);
    
    // Update theme colors
    switch (theme) {
        case 'light':
            document.documentElement.style.setProperty('--bg-color', '#f5f5f5');
            document.documentElement.style.setProperty('--text-light', '#121212');
            document.documentElement.style.setProperty('--text-secondary', '#555555');
            document.documentElement.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.7)');
            break;
        case 'neon':
            document.documentElement.style.setProperty('--bg-color', '#121212');
            document.documentElement.style.setProperty('--text-light', '#ffffff');
            document.documentElement.style.setProperty('--text-secondary', '#aaaaaa');
            document.documentElement.style.setProperty('--glass-bg', 'rgba(0, 0, 0, 0.7)');
            document.documentElement.style.setProperty('--neon-blue', '#ff00ff');
            document.documentElement.style.setProperty('--neon-purple', '#00ffff');
            break;
        default: // dark
            document.documentElement.style.setProperty('--bg-color', '#121212');
            document.documentElement.style.setProperty('--text-light', '#ffffff');
            document.documentElement.style.setProperty('--text-secondary', '#aaaaaa');
            document.documentElement.style.setProperty('--glass-bg', 'rgba(0, 0, 0, 0.7)');
            break;
    }
}

// Setup theme selector
function setupThemeSelector() {
    const themeOptions = document.querySelectorAll('.theme-option');
    if (!themeOptions.length) return;
    
    const preferences = getUserPreferences();
    
    // Set active theme
    themeOptions.forEach(option => {
        if (option.dataset.theme === preferences.theme) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
        
        // Add click handler
        option.addEventListener('click', () => {
            // Update active class
            themeOptions.forEach(o => o.classList.remove('active'));
            option.classList.add('active');
            
            // Update preferences
            const newTheme = option.dataset.theme;
            preferences.theme = newTheme;
            saveUserPreferences(preferences);
            
            // Apply theme
            applyTheme();
            
            // Show notification
            showNotification(`Theme changed to ${newTheme}`);
        });
    });
}

// Setup address management
function setupAddressManagement() {
    const addressContainer = document.getElementById('addressContainer');
    if (!addressContainer) return;
    
    // Load addresses
    loadAddresses();
    
    // Setup add address button
    const addAddressBtn = document.getElementById('addAddressBtn');
    if (addAddressBtn) {
        addAddressBtn.addEventListener('click', () => {
            showAddAddressModal();
        });
    }
}

// Load addresses
function loadAddresses() {
    const addressContainer = document.getElementById('addressContainer');
    if (!addressContainer) return;
    
    const preferences = getUserPreferences();
    const addresses = preferences.deliveryAddresses;
    const defaultIndex = preferences.defaultAddressIndex;
    
    // Display addresses
    addressContainer.innerHTML = addresses.map((address, index) => `
        <div class="address-card glass ${index === defaultIndex ? 'default' : ''}">
            <div class="address-header">
                <div class="address-name">${address.name}</div>
                ${index === defaultIndex ? '<div class="default-badge">Default</div>' : ''}
            </div>
            <div class="address-content">
                <div class="address-text">${address.address}</div>
                <div class="address-instructions">${address.instructions}</div>
            </div>
            <div class="address-actions">
                ${index !== defaultIndex ? 
                    `<button class="set-default-btn" onclick="setDefaultAddress(${index})">Set as Default</button>` : ''}
                <button class="edit-btn" onclick="editAddress(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteAddress(${index})">Delete</button>
            </div>
        </div>
    `).join('');
}

// Set default address
function setDefaultAddress(index) {
    const preferences = getUserPreferences();
    preferences.defaultAddressIndex = index;
    saveUserPreferences(preferences);
    
    // Reload addresses
    loadAddresses();
    
    // Show notification
    showNotification('Default address updated');
}

// Edit address
function editAddress(index) {
    const preferences = getUserPreferences();
    const address = preferences.deliveryAddresses[index];
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content glass">
            <h2>Edit Address</h2>
            <div class="input-group">
                <label>Name</label>
                <input type="text" id="editAddressName" value="${address.name}">
            </div>
            <div class="input-group">
                <label>Address</label>
                <input type="text" id="editAddressText" value="${address.address}">
            </div>
            <div class="input-group">
                <label>Delivery Instructions</label>
                <textarea id="editAddressInstructions">${address.instructions}</textarea>
            </div>
            <div class="modal-actions">
                <button class="cancel-btn" onclick="closeModal()">Cancel</button>
                <button class="save-btn" onclick="saveEditedAddress(${index})">Save</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Save edited address
function saveEditedAddress(index) {
    const preferences = getUserPreferences();
    
    preferences.deliveryAddresses[index] = {
        name: document.getElementById('editAddressName').value,
        address: document.getElementById('editAddressText').value,
        instructions: document.getElementById('editAddressInstructions').value
    };
    
    saveUserPreferences(preferences);
    
    // Close modal
    closeModal();
    
    // Reload addresses
    loadAddresses();
    
    // Show notification
    showNotification('Address updated');
}

// Delete address
function deleteAddress(index) {
    if (!confirm('Are you sure you want to delete this address?')) {
        return;
    }
    
    const preferences = getUserPreferences();
    
    // Don't delete if it's the only address
    if (preferences.deliveryAddresses.length <= 1) {
        alert('You must have at least one delivery address');
        return;
    }
    
    // Remove address
    preferences.deliveryAddresses.splice(index, 1);
    
    // Update default index if needed
    if (index === preferences.defaultAddressIndex) {
        preferences.defaultAddressIndex = 0;
    } else if (index < preferences.defaultAddressIndex) {
        preferences.defaultAddressIndex--;
    }
    
    saveUserPreferences(preferences);
    
    // Reload addresses
    loadAddresses();
    
    // Show notification
    showNotification('Address deleted');
}

// Show add address modal
function showAddAddressModal() {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content glass">
            <h2>Add New Address</h2>
            <div class="input-group">
                <label>Name</label>
                <input type="text" id="newAddressName" placeholder="Home, Work, etc.">
            </div>
            <div class="input-group">
                <label>Address</label>
                <input type="text" id="newAddressText" placeholder="Enter your address">
            </div>
            <div class="input-group">
                <label>Delivery Instructions</label>
                <textarea id="newAddressInstructions" placeholder="Special instructions..."></textarea>
            </div>
            <div class="modal-actions">
                <button class="cancel-btn" onclick="closeModal()">Cancel</button>
                <button class="save-btn" onclick="saveNewAddress()">Save</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Save new address
function saveNewAddress() {
    const name = document.getElementById('newAddressName').value;
    const address = document.getElementById('newAddressText').value;
    const instructions = document.getElementById('newAddressInstructions').value;
    
    if (!name || !address) {
        alert('Please enter a name and address');
        return;
    }
    
    const preferences = getUserPreferences();
    
    preferences.deliveryAddresses.push({
        name,
        address,
        instructions
    });
    
    saveUserPreferences(preferences);
    
    // Close modal
    closeModal();
    
    // Reload addresses
    loadAddresses();
    
    // Show notification
    showNotification('New address added');
}

// Close modal
function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
}

// Auto-fill address on checkout page
function autoFillCheckoutAddress() {
    const addressInput = document.querySelector('input[name="address"]');
    const instructionsInput = document.querySelector('textarea[name="instructions"]');
    
    if (!addressInput) return;
    
    const preferences = getUserPreferences();
    const defaultAddress = preferences.deliveryAddresses[preferences.defaultAddressIndex];
    
    if (defaultAddress) {
        addressInput.value = defaultAddress.address;
        if (instructionsInput) {
            instructionsInput.value = defaultAddress.instructions;
        }
    }
}

// Show notification
function showNotification(message) {
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
window.setDefaultAddress = setDefaultAddress;
window.editAddress = editAddress;
window.saveEditedAddress = saveEditedAddress;
window.deleteAddress = deleteAddress;
window.showAddAddressModal = showAddAddressModal;
window.saveNewAddress = saveNewAddress;
window.closeModal = closeModal;