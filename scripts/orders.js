// Order history page functionality
document.addEventListener('DOMContentLoaded', () => {
    loadOrderHistory();
    setupFilters();
    setupSearch();
});

function loadOrderHistory(filter = 'all', searchQuery = '') {
    const ordersList = document.getElementById('ordersList');
    const emptyOrders = document.getElementById('emptyOrders');
    
    // Get order history from localStorage
    let orderHistory = JSON.parse(localStorage.getItem('neoFoodOrderHistory') || '[]');
    
    // Sort by date (newest first)
    orderHistory.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    // Apply filter
    if (filter !== 'all') {
        orderHistory = orderHistory.filter(order => order.status === filter);
    }
    
    // Apply search
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        orderHistory = orderHistory.filter(order => {
            // Search by order number
            if (order.orderNumber.toLowerCase().includes(query)) return true;
            
            // Search by restaurant name
            const hasRestaurant = order.items.some(item => 
                item.restaurantName.toLowerCase().includes(query)
            );
            if (hasRestaurant) return true;
            
            // Search by item name
            const hasItem = order.items.some(item => 
                item.name.toLowerCase().includes(query)
            );
            if (hasItem) return true;
            
            return false;
        });
    }
    
    // Display orders or empty message
    if (orderHistory.length === 0) {
        ordersList.innerHTML = '';
        emptyOrders.style.display = 'flex';
    } else {
        emptyOrders.style.display = 'none';
        
        // Display orders
        ordersList.innerHTML = orderHistory.map(order => `
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
                
                <div class="order-footer">
                    <div class="order-total">
                        <span>Total:</span>
                        <span>${order.total}</span>
                    </div>
                    <div class="order-actions">
                        <button class="delete-btn" onclick="deleteOrder('${order.orderNumber}')">
                            Delete
                        </button>
                        <button class="reorder-btn" onclick="reorder(${JSON.stringify(order).replace(/"/g, '&quot;')})">
                            Reorder
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

function setupFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Apply filter
            const filter = tab.dataset.filter;
            const searchQuery = document.getElementById('orderSearch').value;
            loadOrderHistory(filter, searchQuery);
        });
    });
}

function setupSearch() {
    const searchInput = document.getElementById('orderSearch');
    const searchBtn = document.querySelector('.search-btn');
    
    // Search on button click
    searchBtn.addEventListener('click', () => {
        const activeFilter = document.querySelector('.filter-tab.active').dataset.filter;
        loadOrderHistory(activeFilter, searchInput.value);
    });
    
    // Search on enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const activeFilter = document.querySelector('.filter-tab.active').dataset.filter;
            loadOrderHistory(activeFilter, searchInput.value);
        }
    });
}

function reorder(order) {
    // Clear current cart
    localStorage.removeItem('neoFoodCart');
    
    // Add all items to cart
    let cart = [];
    order.items.forEach(item => {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            restaurantName: item.restaurantName
        });
    });
    
    // Save cart
    localStorage.setItem('neoFoodCart', JSON.stringify(cart));
    
    // Redirect to cart
    window.location.href = 'cart.html';
}