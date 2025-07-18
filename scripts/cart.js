document.addEventListener('DOMContentLoaded', () => {
    loadCart();
});

function loadCart() {
    const cart = JSON.parse(localStorage.getItem('neoFoodCart') || '[]');
    const cartItems = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartContent = document.querySelector('.cart-content');
    
    if (cart.length === 0) {
        cartContent.style.display = 'none';
        emptyCart.style.display = 'block';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}" draggable="true">
            <div class="item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-restaurant">${item.restaurantName}</div>
            </div>
            <div class="item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            <div class="quantity-controls">
                <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span class="qty-display">${item.quantity}</span>
                <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <button class="remove-btn" onclick="removeItem(${item.id})">×</button>
        </div>
    `).join('');
    
    setupDragAndDrop();
    updateSummary();
}

function setupDragAndDrop() {
    const cartItems = document.querySelectorAll('.cart-item');
    
    cartItems.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            item.classList.add('dragging');
            e.dataTransfer.setData('text/plain', item.dataset.id);
        });
        
        item.addEventListener('dragend', () => {
            item.classList.remove('dragging');
        });
        
        // Touch events for mobile
        let startX, startY, isDragging = false;
        
        item.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        item.addEventListener('touchmove', (e) => {
            if (!isDragging) {
                const deltaX = Math.abs(e.touches[0].clientX - startX);
                const deltaY = Math.abs(e.touches[0].clientY - startY);
                
                if (deltaX > 50 && deltaX > deltaY) {
                    isDragging = true;
                    item.classList.add('dragging');
                }
            }
            
            if (isDragging) {
                e.preventDefault();
                const touch = e.touches[0];
                item.style.transform = `translateX(${touch.clientX - startX}px)`;
                
                if (Math.abs(touch.clientX - startX) > 100) {
                    item.style.opacity = '0.5';
                }
            }
        });
        
        item.addEventListener('touchend', (e) => {
            if (isDragging) {
                const deltaX = e.changedTouches[0].clientX - startX;
                
                if (Math.abs(deltaX) > 100) {
                    removeItem(parseInt(item.dataset.id));
                } else {
                    item.style.transform = '';
                    item.style.opacity = '';
                }
                
                item.classList.remove('dragging');
                isDragging = false;
            }
        });
    });
}

function updateQuantity(itemId, delta) {
    let cart = JSON.parse(localStorage.getItem('neoFoodCart') || '[]');
    const item = cart.find(item => item.id === itemId);
    
    if (item) {
        item.quantity = Math.max(1, item.quantity + delta);
        localStorage.setItem('neoFoodCart', JSON.stringify(cart));
        loadCart();
    }
}

// Make functions global
window.updateQuantity = updateQuantity;
window.removeItem = removeItem;

function removeItem(itemId) {
    let cart = JSON.parse(localStorage.getItem('neoFoodCart') || '[]');
    const itemElement = document.querySelector(`[data-id="${itemId}"]`);
    
    itemElement.classList.add('removing');
    
    setTimeout(() => {
        cart = cart.filter(item => item.id !== itemId);
        localStorage.setItem('neoFoodCart', JSON.stringify(cart));
        loadCart();
    }, 500);
}

function updateSummary() {
    const cart = JSON.parse(localStorage.getItem('neoFoodCart') || '[]');
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = subtotal > 0 ? 2.99 : 0;
    const tax = subtotal * 0.08;
    
    // Check for active voucher
    const activeVoucher = JSON.parse(localStorage.getItem('activeVoucher') || 'null');
    let discount = 0;
    let discountText = '';
    
    if (activeVoucher) {
        if (activeVoucher.value.includes('%')) {
            // Percentage discount
            const percentage = parseInt(activeVoucher.value);
            discount = subtotal * (percentage / 100);
            discountText = `${activeVoucher.value} (${activeVoucher.code})`;
        } else if (activeVoucher.value.includes('$')) {
            // Fixed amount discount
            discount = parseFloat(activeVoucher.value.replace('$', ''));
            discountText = `${activeVoucher.value} (${activeVoucher.code})`;
        } else if (activeVoucher.type === 'Free Delivery') {
            // Free delivery
            discount = deliveryFee;
            discountText = `Free Delivery (${activeVoucher.code})`;
        }
    }
    
    const total = subtotal + deliveryFee + tax - discount;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('deliveryFee').textContent = `$${deliveryFee.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    
    // Add discount line if there's an active voucher
    const summaryTotals = document.querySelector('.summary-totals');
    const totalLine = document.querySelector('.summary-line.total');
    
    // Remove any existing discount line
    const existingDiscountLine = document.getElementById('discountLine');
    if (existingDiscountLine) {
        existingDiscountLine.remove();
    }
    
    // Add discount line if applicable
    if (discount > 0) {
        const discountLine = document.createElement('div');
        discountLine.id = 'discountLine';
        discountLine.className = 'summary-line discount';
        discountLine.innerHTML = `
            <span>Discount</span>
            <span>-$${discount.toFixed(2)} <small>${discountText}</small></span>
        `;
        summaryTotals.insertBefore(discountLine, totalLine);
    }
    
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

function proceedToCheckout() {
    const cart = JSON.parse(localStorage.getItem('neoFoodCart') || '[]');
    
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    window.location.href = 'checkout.html';
}

// Make function global
window.proceedToCheckout = proceedToCheckout;