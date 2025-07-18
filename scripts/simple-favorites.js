// Simple favorites system for restaurants
document.addEventListener('DOMContentLoaded', () => {
    // Add favorite button to restaurant pages
    addFavoriteButton();
    
    // Load order history if on profile page
    if (document.getElementById('recentOrders')) {
        loadOrderHistory();
    }
});

function addFavoriteButton() {
    // Get restaurant name
    const restaurantNameElement = document.querySelector('.restaurant-name');
    if (!restaurantNameElement) return;
    
    const restaurantName = restaurantNameElement.textContent;
    const restaurantIcon = document.querySelector('.restaurant-icon')?.textContent || '🍽️';
    const restaurantCuisine = document.querySelector('.restaurant-details')?.textContent.split('•')[0].trim() || '';
    
    // Create favorite button
    const favoriteBtn = document.createElement('button');
    favoriteBtn.className = 'favorite-btn';
    
    // Check if restaurant is already favorited
    const favorites = JSON.parse(localStorage.getItem('neoFoodFavorites') || '[]');
    const isFavorite = favorites.some(fav => fav.name === restaurantName);
    
    // Set button style and text
    favoriteBtn.innerHTML = isFavorite ? '❤️ Favorited' : '🤍 Add to Favorites';
    favoriteBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        background: ${isFavorite ? 'rgba(255, 0, 128, 0.2)' : 'rgba(255, 255, 255, 0.2)'};
        backdrop-filter: blur(5px);
        border: 1px solid ${isFavorite ? '#ff0080' : 'rgba(255, 255, 255, 0.3)'};
        color: white;
        padding: 8px 15px;
        border-radius: 20px;
        cursor: pointer;
        font-weight: bold;
        transition: all 0.3s ease;
        z-index: 100;
    `;
    
    // Add click handler
    favoriteBtn.addEventListener('click', () => {
        toggleFavorite(restaurantName, restaurantCuisine, restaurantIcon);
        
        // Update button appearance
        const isNowFavorite = favoriteBtn.innerHTML.includes('🤍');
        favoriteBtn.innerHTML = isNowFavorite ? '❤️ Favorited' : '🤍 Add to Favorites';
        favoriteBtn.style.background = isNowFavorite ? 'rgba(255, 0, 128, 0.2)' : 'rgba(255, 255, 255, 0.2)';
        favoriteBtn.style.border = isNowFavorite ? '1px solid #ff0080' : '1px solid rgba(255, 255, 255, 0.3)';
    });
    
    // Add button to page
    const restaurantHeader = document.querySelector('.restaurant-header');
    if (restaurantHeader) {
        restaurantHeader.style.position = 'relative';
        restaurantHeader.appendChild(favoriteBtn);
    }
}

function toggleFavorite(name, cuisine, icon) {
    // Get current favorites
    let favorites = JSON.parse(localStorage.getItem('neoFoodFavorites') || '[]');
    
    // Check if restaurant is already in favorites
    const existingIndex = favorites.findIndex(fav => fav.name === name);
    
    if (existingIndex >= 0) {
        // Remove from favorites
        favorites.splice(existingIndex, 1);
        showNotification(`${name} removed from favorites`);
    } else {
        // Add to favorites
        favorites.push({ 
            name, 
            cuisine, 
            icon, 
            url: window.location.href 
        });
        showNotification(`${name} added to favorites`);
    }
    
    // Save updated favorites
    localStorage.setItem('neoFoodFavorites', JSON.stringify(favorites));
}

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

// Load and display order history in profile
function loadOrderHistory() {
    const recentOrdersContainer = document.getElementById('recentOrders');
    if (!recentOrdersContainer) return;
    
    // Get order history
    const orderHistory = JSON.parse(localStorage.getItem('neoFoodOrderHistory') || '[]');
    
    // Display orders or empty message
    if (orderHistory.length === 0) {
        recentOrdersContainer.innerHTML = `
            <div class="empty-orders">
                <p>You haven't placed any orders yet.</p>
                <a href="home.html" class="browse-btn">Browse Restaurants</a>
            </div>
        `;
    } else {
        // Sort orders by date (newest first)
        orderHistory.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        // Display orders
        recentOrdersContainer.innerHTML = orderHistory.map(order => `
            <div class="order-card glass">
                <div class="order-header">
                    <div class="order-info">
                        <div class="order-number">#${order.orderNumber}</div>
                        <div class="order-date">${formatDate(order.timestamp)}</div>
                    </div>
                    <div class="order-status ${order.status}">${order.status}</div>
                </div>
                <div class="order-items">
                    ${order.items.map(item => `
                        <div class="order-item">
                            <div class="item-info">
                                <div class="item-name">${item.name}</div>
                                <div class="item-restaurant">${item.restaurantName}</div>
                            </div>
                            <div class="item-quantity">x${item.quantity}</div>
                            <div class="item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                    `).join('')}
                </div>
                <div class="order-total">
                    <span>Total:</span>
                    <span>${order.total}</span>
                </div>
            </div>
        `).join('');
        
        // Update order stats
        updateOrderStats(orderHistory);
    }
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

// Update order statistics in profile
function updateOrderStats(orderHistory) {
    const totalOrdersElement = document.getElementById('totalOrders');
    const totalSpentElement = document.getElementById('totalSpent');
    
    if (totalOrdersElement) {
        totalOrdersElement.textContent = orderHistory.length;
    }
    
    if (totalSpentElement) {
        // Calculate total spent
        let totalSpent = 0;
        orderHistory.forEach(order => {
            const total = parseFloat(order.total.replace('$', ''));
            if (!isNaN(total)) {
                totalSpent += total;
            }
        });
        
        totalSpentElement.textContent = '$' + totalSpent.toFixed(2);
    }
}