// Global cart functions that work across all pages
window.NeoFoodCart = {
    // Add item to cart
    addItem: function(itemId, itemName, itemPrice, restaurantName) {
        console.log('Adding item:', itemId, itemName, itemPrice, restaurantName);
        
        let cart = JSON.parse(localStorage.getItem('neoFoodCart') || '[]');
        
        // Check if item already exists
        const existingItem = cart.find(item => item.id === itemId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: itemId,
                name: itemName,
                price: itemPrice,
                quantity: 1,
                restaurantName: restaurantName
            });
        }
        
        localStorage.setItem('neoFoodCart', JSON.stringify(cart));
        this.updateCartCount();
        this.showNotification(itemName + ' added to cart!');
        
        console.log('Cart updated:', cart);
        return true;
    },
    
    // Update cart count in navigation
    updateCartCount: function() {
        const cart = JSON.parse(localStorage.getItem('neoFoodCart') || '[]');
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        const cartCountElements = document.querySelectorAll('.cart-count');
        cartCountElements.forEach(element => {
            element.textContent = totalItems;
            element.style.display = totalItems > 0 ? 'inline' : 'none';
        });
        
        // Update floating cart if exists
        const floatingCart = document.getElementById('floatingCart');
        if (floatingCart) {
            if (totalItems > 0) {
                floatingCart.style.display = 'block';
                const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                
                const itemsCountEl = document.querySelector('.cart-items-count');
                const totalEl = document.querySelector('.cart-total');
                
                if (itemsCountEl) itemsCountEl.textContent = `${totalItems} item${totalItems > 1 ? 's' : ''}`;
                if (totalEl) totalEl.textContent = `$${totalPrice.toFixed(2)}`;
            } else {
                floatingCart.style.display = 'none';
            }
        }
    },
    
    // Show notification
    showNotification: function(message) {
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
            animation: slideIn 0.3s ease;
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <span style="color: #00f5ff; font-size: 1.2rem;">✓</span>
                <div style="font-weight: bold;">${message}</div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
};

// Add CSS for notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', () => {
    window.NeoFoodCart.updateCartCount();
});