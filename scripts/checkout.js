document.addEventListener('DOMContentLoaded', () => {
    loadOrderSummary();
    setupInteractions();
});

function loadOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('neoFoodCart') || '[]');
    const summaryItems = document.getElementById('summaryItems');
    
    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
    
    summaryItems.innerHTML = cart.map(item => `
        <div class="summary-item">
            <div class="item-info">
                <div class="item-name">${item.name}</div>
                <div class="item-qty">Qty: ${item.quantity}</div>
            </div>
            <div class="item-price">$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
    `).join('');
    
    updateTotals();
}

function updateTotals() {
    const cart = JSON.parse(localStorage.getItem('neoFoodCart') || '[]');
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 2.99;
    const tax = subtotal * 0.08;
    const total = subtotal + deliveryFee + tax;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('deliveryFee').textContent = `$${deliveryFee.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

function setupInteractions() {
    // Time selector
    document.querySelectorAll('.time-option').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelectorAll('.time-option').forEach(o => o.classList.remove('active'));
            option.classList.add('active');
            
            const schedulePicker = document.getElementById('schedulePicker');
            if (option.dataset.time === 'scheduled') {
                schedulePicker.style.display = 'block';
                const now = new Date();
                now.setHours(now.getHours() + 1);
                document.getElementById('deliveryTime').min = now.toISOString().slice(0, 16);
            } else {
                schedulePicker.style.display = 'none';
            }
        });
    });
    
    // Payment method selector
    document.querySelectorAll('.payment-option').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('active'));
            option.classList.add('active');
            
            const cardDetails = document.getElementById('cardDetails');
            if (option.dataset.method === 'card') {
                cardDetails.style.display = 'block';
            } else {
                cardDetails.style.display = 'none';
            }
        });
    });
}

function placeOrder() {
    const cart = JSON.parse(localStorage.getItem('neoFoodCart') || '[]');
    
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const placeOrderBtn = document.querySelector('.place-order-btn');
    placeOrderBtn.textContent = 'Processing Order...';
    placeOrderBtn.disabled = true;
    
    setTimeout(() => {
        const orderNumber = 'NF' + Date.now().toString().slice(-6);
        
        const orderData = {
            orderNumber: orderNumber,
            items: cart,
            total: document.getElementById('total').textContent,
            timestamp: new Date().toISOString(),
            status: 'confirmed'
        };
        
        // Save to current order
        localStorage.setItem('currentOrder', JSON.stringify(orderData));
        
        // Save to order history
        let orderHistory = JSON.parse(localStorage.getItem('neoFoodOrderHistory') || '[]');
        orderHistory.push(orderData);
        localStorage.setItem('neoFoodOrderHistory', JSON.stringify(orderHistory));
        
        // Clear cart
        localStorage.removeItem('neoFoodCart');
        
        window.location.href = 'confirmation.html';
    }, 1000);
}

// Make functions global
window.placeOrder = placeOrder;

function placeOrder() {
    // Validate form
    const requiredFields = document.querySelectorAll('input[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#ff1493';
            isValid = false;
        } else {
            field.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        }
    });
    
    if (!isValid) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Show loading state
    const placeOrderBtn = document.querySelector('.place-order-btn');
    placeOrderBtn.textContent = 'Processing Order...';
    placeOrderBtn.disabled = true;
    placeOrderBtn.style.background = 'linear-gradient(45deg, #666, #999)';
    
    // Simulate order processing
    setTimeout(() => {
        // Generate order number
        const orderNumber = 'NF' + Date.now().toString().slice(-6);
        
        // Store order details
        const orderData = {
            orderNumber: orderNumber,
            items: JSON.parse(localStorage.getItem('neoFoodCart') || '[]'),
            total: document.getElementById('total').textContent,
            timestamp: new Date().toISOString(),
            status: 'confirmed'
        };
        
        // Save to current order
        localStorage.setItem('currentOrder', JSON.stringify(orderData));
        
        // Save to order history
        let orderHistory = JSON.parse(localStorage.getItem('neoFoodOrderHistory') || '[]');
        orderHistory.push(orderData);
        localStorage.setItem('neoFoodOrderHistory', JSON.stringify(orderHistory));
        
        // Clear cart
        localStorage.removeItem('neoFoodCart');
        
        // Redirect to confirmation
        window.location.href = 'confirmation.html';
    }, 2000);
}

// Make function global
window.placeOrder = placeOrder;

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--glass-bg);
        backdrop-filter: blur(15px);
        border: 1px solid ${type === 'error' ? 'var(--neon-pink)' : 'var(--neon-blue)'};
        border-radius: 15px;
        padding: 15px 20px;
        color: var(--text-light);
        z-index: 3000;
        animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}