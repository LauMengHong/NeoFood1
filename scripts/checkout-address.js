// Checkout address management
document.addEventListener('DOMContentLoaded', () => {
    loadSavedAddresses();
});

// Load saved addresses on checkout page
function loadSavedAddresses() {
    const addressSelect = document.getElementById('addressSelect');
    if (!addressSelect) return;
    
    // Get saved addresses
    const addresses = JSON.parse(localStorage.getItem('neoFoodAddresses') || '[]');
    const defaultAddressIndex = parseInt(localStorage.getItem('neoFoodDefaultAddress') || '0');
    
    // Clear existing options except the first one (new address)
    while (addressSelect.options.length > 1) {
        addressSelect.remove(1);
    }
    
    // Add saved addresses as options
    addresses.forEach((address, index) => {
        const option = document.createElement('option');
        option.value = index;
        
        // Format address for display
        const addressText = [
            address.street,
            address.city,
            address.zip
        ].filter(Boolean).join(', ');
        
        option.text = `${address.name} - ${addressText}`;
        option.selected = index === defaultAddressIndex;
        addressSelect.add(option);
    });
    
    // Fill in default address
    if (addresses.length > 0) {
        fillAddressFields(addresses[defaultAddressIndex]);
    }
}

// Select address from dropdown
function selectAddressFromDropdown() {
    const addressSelect = document.getElementById('addressSelect');
    const index = parseInt(addressSelect.value);
    
    // If new address selected
    if (index === -1) {
        clearAddressFields();
        return;
    }
    
    // Get address and fill fields
    const addresses = JSON.parse(localStorage.getItem('neoFoodAddresses') || '[]');
    if (addresses[index]) {
        fillAddressFields(addresses[index]);
    }
}

// Fill address fields
function fillAddressFields(address) {
    const streetInput = document.getElementById('streetAddress');
    const cityInput = document.getElementById('cityInput');
    const zipInput = document.getElementById('zipInput');
    const instructionsInput = document.getElementById('instructionsInput');
    
    if (streetInput) streetInput.value = address.street || '';
    if (cityInput) cityInput.value = address.city || '';
    if (zipInput) zipInput.value = address.zip || '';
    if (instructionsInput) instructionsInput.value = address.instructions || '';
}

// Clear address fields
function clearAddressFields() {
    const streetInput = document.getElementById('streetAddress');
    const cityInput = document.getElementById('cityInput');
    const zipInput = document.getElementById('zipInput');
    const instructionsInput = document.getElementById('instructionsInput');
    
    if (streetInput) streetInput.value = '';
    if (cityInput) cityInput.value = '';
    if (zipInput) zipInput.value = '';
    if (instructionsInput) instructionsInput.value = '';
}

// Make functions global
window.selectAddressFromDropdown = selectAddressFromDropdown;