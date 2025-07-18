// Profile page functionality
document.addEventListener('DOMContentLoaded', () => {
    setupTabs();
    loadOrderHistory(); // Load real order history from order-history.js
    loadFavorites();
    setupThemeSelector();
    setupAddressManagement();
});

function setupTabs() {
    const tabs = document.querySelectorAll('.tab');
    const panels = document.querySelectorAll('.tab-panel');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and panels
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            tab.classList.add('active');
            const panel = document.getElementById(`${tab.dataset.tab}-panel`);
            if (panel) panel.classList.add('active');
        });
    });
}

function loadFavorites() {
    const favoritesGrid = document.getElementById('favoritesGrid');
    if (!favoritesGrid) return;
    
    // Get favorites from localStorage (or use empty array if none)
    const favorites = JSON.parse(localStorage.getItem('neoFoodFavorites') || '[]');
    
    // Update favorites count
    const favCountElement = document.getElementById('favoriteRestaurants');
    if (favCountElement) {
        favCountElement.textContent = favorites.length;
    }
    
    // Display favorites or empty message
    if (favorites.length === 0) {
        favoritesGrid.innerHTML = `
            <div class="empty-favorites">
                <p>You don't have any favorite restaurants yet.</p>
                <a href="home.html" class="browse-btn">Browse Restaurants</a>
            </div>
        `;
    } else {
        favoritesGrid.innerHTML = favorites.map(restaurant => `
            <div class="favorite-card glass" onclick="window.location.href='${restaurant.url}'">
                <div class="favorite-icon">${restaurant.icon || '🍽️'}</div>
                <div class="favorite-info">
                    <h3>${restaurant.name}</h3>
                    <p>${restaurant.cuisine}</p>
                </div>
            </div>
        `).join('');
    }
}

// Address Management Modal Functions
function showAddAddressModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content glass">
            <h2>Add New Address</h2>
            <div class="input-group">
                <label>Name</label>
                <input type="text" id="addressName" placeholder="Home, Work, etc.">
            </div>
            <div class="input-group">
                <label>Street Address</label>
                <input type="text" id="addressStreet" placeholder="Enter street address">
            </div>
            <div class="input-row">
                <div class="input-group">
                    <label>City</label>
                    <input type="text" id="addressCity" placeholder="City">
                </div>
                <div class="input-group">
                    <label>ZIP Code</label>
                    <input type="text" id="addressZip" placeholder="ZIP Code">
                </div>
            </div>
            <div class="input-group">
                <label>Delivery Instructions</label>
                <textarea id="addressInstructions" placeholder="Special instructions..."></textarea>
            </div>
            <div class="modal-actions">
                <button class="cancel-btn" onclick="closeModal()">Cancel</button>
                <button class="save-btn" onclick="saveNewAddress()">Save</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function editAddress(index) {
    const addresses = JSON.parse(localStorage.getItem('neoFoodAddresses') || '[]');
    const address = addresses[index];
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content glass">
            <h2>Edit Address</h2>
            <div class="input-group">
                <label>Name</label>
                <input type="text" id="addressName" value="${address.name}" placeholder="Home, Work, etc.">
            </div>
            <div class="input-group">
                <label>Street Address</label>
                <input type="text" id="addressStreet" value="${address.street || ''}" placeholder="Enter street address">
            </div>
            <div class="input-row">
                <div class="input-group">
                    <label>City</label>
                    <input type="text" id="addressCity" value="${address.city || ''}" placeholder="City">
                </div>
                <div class="input-group">
                    <label>ZIP Code</label>
                    <input type="text" id="addressZip" value="${address.zip || ''}" placeholder="ZIP Code">
                </div>
            </div>
            <div class="input-group">
                <label>Delivery Instructions</label>
                <textarea id="addressInstructions" placeholder="Special instructions...">${address.instructions || ''}</textarea>
            </div>
            <div class="modal-actions">
                <button class="cancel-btn" onclick="closeModal()">Cancel</button>
                <button class="save-btn" onclick="updateAddress(${index})">Save</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function setupThemeSelector() {
    const themeOptions = document.querySelectorAll('.theme-option');
    
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove active class from all options
            themeOptions.forEach(o => o.classList.remove('active'));
            
            // Add active class to clicked option
            option.classList.add('active');
            
            // Save theme preference
            const theme = option.dataset.theme;
            localStorage.setItem('neoFoodTheme', theme);
            
            // Apply theme
            applyTheme();
            
            // Show notification
            showThemeNotification(`Theme changed to ${theme}`);
        });
    });
    
    // Set active theme option based on saved theme
    const savedTheme = localStorage.getItem('neoFoodTheme') || 'dark';
    themeOptions.forEach(o => {
        if (o.dataset.theme === savedTheme) {
            o.classList.add('active');
        } else {
            o.classList.remove('active');
        }
    });
}

// Show theme change notification
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

// Address action functions
function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) modal.remove();
}

function saveNewAddress() {
    const name = document.getElementById('addressName').value;
    const street = document.getElementById('addressStreet').value;
    const city = document.getElementById('addressCity').value;
    const zip = document.getElementById('addressZip').value;
    const instructions = document.getElementById('addressInstructions').value;
    
    if (!name || !street || !city) {
        alert('Please enter a name, street address, and city');
        return;
    }
    
    // Get existing addresses
    const addresses = JSON.parse(localStorage.getItem('neoFoodAddresses') || '[]');
    
    // Format full address for display
    const fullAddress = `${street}, ${city}${zip ? ', ' + zip : ''}`;
    
    // Add new address
    addresses.push({ 
        name, 
        street, 
        city, 
        zip, 
        address: fullAddress, 
        instructions 
    });
    
    // Save addresses
    localStorage.setItem('neoFoodAddresses', JSON.stringify(addresses));
    
    // Close modal
    closeModal();
    
    // Reload addresses
    loadAddresses();
}

function updateAddress(index) {
    const name = document.getElementById('addressName').value;
    const street = document.getElementById('addressStreet').value;
    const city = document.getElementById('addressCity').value;
    const zip = document.getElementById('addressZip').value;
    const instructions = document.getElementById('addressInstructions').value;
    
    if (!name || !street || !city) {
        alert('Please enter a name, street address, and city');
        return;
    }
    
    // Get existing addresses
    const addresses = JSON.parse(localStorage.getItem('neoFoodAddresses') || '[]');
    
    // Format full address for display
    const fullAddress = `${street}, ${city}${zip ? ', ' + zip : ''}`;
    
    // Update address
    addresses[index] = { 
        name, 
        street, 
        city, 
        zip, 
        address: fullAddress, 
        instructions 
    };
    
    // Save addresses
    localStorage.setItem('neoFoodAddresses', JSON.stringify(addresses));
    
    // Close modal
    closeModal();
    
    // Reload addresses
    loadAddresses();
}

function setDefaultAddress(index) {
    // Save default address index
    localStorage.setItem('neoFoodDefaultAddress', index.toString());
    
    // Reload addresses
    loadAddresses();
}

function deleteAddress(index) {
    if (!confirm('Are you sure you want to delete this address?')) return;
    
    // Get existing addresses
    const addresses = JSON.parse(localStorage.getItem('neoFoodAddresses') || '[]');
    
    // Remove address
    addresses.splice(index, 1);
    
    // Save addresses
    localStorage.setItem('neoFoodAddresses', JSON.stringify(addresses));
    
    // Update default address if needed
    const defaultIndex = parseInt(localStorage.getItem('neoFoodDefaultAddress') || '0');
    if (defaultIndex >= addresses.length) {
        localStorage.setItem('neoFoodDefaultAddress', '0');
    } else if (defaultIndex > index) {
        localStorage.setItem('neoFoodDefaultAddress', (defaultIndex - 1).toString());
    }
    
    // Reload addresses
    loadAddresses();
}

function logout() {
    // Clear user data
    localStorage.removeItem('neoFoodUser');
    alert('Logged out successfully!');
    window.location.href = 'index.html';
}

// Address Management
function setupAddressManagement() {
    const addAddressBtn = document.getElementById('addAddressBtn');
    if (addAddressBtn) {
        addAddressBtn.addEventListener('click', showAddAddressModal);
    }
    
    // Load saved addresses
    loadAddresses();
}

function loadAddresses() {
    const addressContainer = document.getElementById('addressContainer');
    if (!addressContainer) return;
    
    // Get saved addresses
    const addresses = JSON.parse(localStorage.getItem('neoFoodAddresses') || '[]');
    const defaultAddressIndex = parseInt(localStorage.getItem('neoFoodDefaultAddress') || '0');
    
    // If no addresses, keep the default one
    if (addresses.length === 0) return;
    
    // Clear container
    addressContainer.innerHTML = '';
    
    // Add addresses
    addresses.forEach((address, index) => {
        const addressCard = document.createElement('div');
        addressCard.className = `address-card glass ${index === defaultAddressIndex ? 'default' : ''}`;
        
        // Format address details
        const addressDetails = [
            address.street,
            address.city,
            address.zip
        ].filter(Boolean).join(', ');
        
        addressCard.innerHTML = `
            <div class="address-header">
                <div class="address-name">${address.name}</div>
                ${index === defaultAddressIndex ? '<div class="default-badge">Default</div>' : ''}
            </div>
            <div class="address-content">
                <div class="address-text">${addressDetails}</div>
                <div class="address-instructions">${address.instructions || ''}</div>
            </div>
            <div class="address-actions">
                ${index !== defaultAddressIndex ? 
                    `<button class="set-default-btn" onclick="setDefaultAddress(${index})">Set as Default</button>` : ''}
                <button class="edit-btn" onclick="editAddress(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteAddress(${index})">Delete</button>
            </div>
        `;
        
        addressContainer.appendChild(addressCard);
    });
}