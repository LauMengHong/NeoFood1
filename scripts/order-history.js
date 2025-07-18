// Order history management for NeoFood
// This script handles saving orders and displaying them in the profile

// Save order to history when an order is placed
function saveOrderToHistory(orderData) {
    // Get existing order history
    let orderHistory = JSON.parse(localStorage.getItem('neoFoodOrderHistory') || '[]');
    
    // Add new order to history
    orderHistory.push(orderData);
    
    // Save updated history
    localStorage.setItem('neoFoodOrderHistory', JSON.stringify(orderHistory));
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