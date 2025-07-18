// Fix order history and add favorites functionality
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on the profile page
    if (document.getElementById('recentOrders')) {
        loadOrderHistory();
    }
    
    // Check if we're on a restaurant page
    if (document.querySelector('.restaurant-name')) {
        addFavoriteButton();
    }
});

// Load order history on profile page
function loadOrderHistory() {
    const recentOrdersContainer = document.getElementById('recentOrders');
    if (!recentOrdersContainer) return;
    
    // Get order history from localStorage
    const orderHistory = JSON.parse(localStorage.getItem('neoFoodOrderHistory') || '[]');
    
    // Update order count
    const totalOrdersElement = document.getElementById('totalOrders');
    if (totalOrdersElement) {
        totalOrdersElement.textContent = orderHistory.length;
    }
    
    // Update total spent
    const totalSpentElement = document.getElementById('totalSpent');
    if (totalSpentElement && orderHistory.length > 0) {
        let totalSpent = 0;
        orderHistory.forEach(order => {
            const total = parseFloat(order.total.replace('$', ''));
            if (!isNaN(total)) {
                totalSpent += total;
            }
        });
        totalSpentElement.textContent = '$' + totalSpent.toFixed(2);
    }
    
    // Display orders
    if (orderHistory.length === 0) {
        recentOrdersContainer.innerHTML = `
            <div style="text-align: center; padding: 30px;">
                <p>You haven't placed any orders yet.</p>
                <a href="home.html" style="color: #00f5ff; text-decoration: none;">Browse Restaurants</a>
            </div>
        `;
    } else {
        // Sort by date (newest first)
        orderHistory.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        // Display orders
        recentOrdersContainer.innerHTML = orderHistory.map(order => `
            <div class="order-card glass" style="margin-bottom: 20px; padding: 20px; border-radius: 10px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                    <div>
                        <div style="font-weight: bold; color: #00f5ff;">#${order.orderNumber}</div>
                        <div style="font-size: 14px; color: #aaa;">${formatDate(order.timestamp)}</div>
                    </div>
                    <div style="background: rgba(0, 255, 0, 0.2); color: #00ff00; padding: 5px 10px; border-radius: 20px; font-size: 14px;">
                        ${order.status}
                    </div>
                </div>
                
                <div style="margin-bottom: 15px;">
                    ${order.items.map(item => `
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <div>
                                <div style="font-weight: bold;">${item.name}</div>
                                <div style="font-size: 14px; color: #aaa;">${item.restaurantName}</div>
                            </div>
                            <div style="display: flex; align-items: center;">
                                <span style="margin-right: 15px; color: #aaa;">x${item.quantity}</span>
                                <span style="font-weight: bold; color: #00f5ff;">$${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div style="display: flex; justify-content: space-between; padding-top: 15px; border-top: 1px solid rgba(255, 255, 255, 0.1); font-weight: bold;">
                    <span>Total:</span>
                    <span>${order.total}</span>
                </div>
            </div>
        `).join('');
    }
    
    // Load favorites
    loadFavorites();
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

// Load favorites on profile page
function loadFavorites() {
    const favoritesGrid = document.getElementById('favoritesGrid');
    if (!favoritesGrid) return;
    
    // Get favorites from localStorage
    const favorites = JSON.parse(localStorage.getItem('neoFoodFavorites') || '[]');
    
    // Update favorites count
    const favCountElement = document.getElementById('favoriteRestaurants');
    if (favCountElement) {
        favCountElement.textContent = favorites.length;
    }
    
    // Display favorites
    if (favorites.length === 0) {
        favoritesGrid.innerHTML = `
            <div style="text-align: center; padding: 30px;">
                <p>You don't have any favorite restaurants yet.</p>
                <a href="home.html" style="color: #00f5ff; text-decoration: none;">Browse Restaurants</a>
            </div>
        `;
    } else {
        favoritesGrid.innerHTML = favorites.map(restaurant => `
            <div class="favorite-card glass" style="padding: 20px; border-radius: 10px; text-align: center; cursor: pointer;" 
                 onclick="window.location.href='${restaurant.url}'">
                <div style="font-size: 40px; margin-bottom: 10px;">${restaurant.icon || '🍽️'}</div>
                <div>
                    <h3 style="margin: 0 0 5px;">${restaurant.name}</h3>
                    <p style="margin: 0; color: #aaa;">${restaurant.cuisine}</p>
                </div>
            </div>
        `).join('');
    }
}

// Add favorite button to restaurant pages
function addFavoriteButton() {
    const restaurantName = document.querySelector('.restaurant-name').textContent;
    const restaurantIcon = document.querySelector('.restaurant-icon')?.textContent || '🍽️';
    const restaurantDetails = document.querySelector('.restaurant-details');
    const cuisine = restaurantDetails ? restaurantDetails.textContent.split('•')[0].trim() : '';
    
    // Create favorite button
    const favoriteBtn = document.createElement('button');
    
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
        z-index: 100;
    `;
    
    // Add click handler
    favoriteBtn.addEventListener('click', () => {
        toggleFavorite(restaurantName, cuisine, restaurantIcon);
        
        // Update button appearance
        const isNowFavorite = !isFavorite;
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

// Toggle favorite status
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