// Restaurant 5 - Sweet Circuits
const restaurantData = {
    id: 5,
    name: "Sweet Circuits",
    cuisine: "Desserts",
    rating: 4.5,
    deliveryTime: "30-40 min",
    deliveryFee: "$2.49",
    icon: "🍰",
    items: {
        501: { id: 501, name: "Neon Cheesecake", description: "Creamy cheesecake with glowing berry topping", price: 8.99, rating: 4.7 },
        502: { id: 502, name: "Chocolate Overload", description: "Rich chocolate cake with fudge frosting", price: 7.99, rating: 4.8 },
        503: { id: 503, name: "Cyber Sundae", description: "Vanilla ice cream with futuristic toppings", price: 6.99, rating: 4.5 },
        504: { id: 504, name: "Matrix Milkshake", description: "Thick shake with cookies and cream", price: 5.99, rating: 4.6 }
    }
};

let currentQuantity = 1;

// Make functions global
window.addToCart = addToCart;
window.openItemModal = openItemModal;
window.showCategory = showCategory;
window.changeQuantity = changeQuantity;
window.closeModal = closeModal;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
    setupModalClose();
});

function showCategory(categoryId) {
    // Hide all categories
    document.querySelectorAll('.menu-category').forEach(category => {
        category.style.display = 'none';
    });
    
    // Show selected category
    document.getElementById(categoryId).style.display = 'block';
    
    // Update active tab
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Smooth scroll to menu section
    document.querySelector('.menu-section').scrollIntoView({
        behavior: 'smooth'
    });
}

function openItemModal(itemId) {
    const item = restaurantData.items[itemId];
    if (!item) return;
    
    const itemDetail = document.getElementById('itemDetail');
    itemDetail.innerHTML = `
        <div class="item-detail-header">
            <h2>${item.name}</h2>
            <div class="item-detail-price">$${item.price}</div>
        </div>
        <p class="item-detail-description">${item.description}</p>
        <div class="quantity-selector">
            <button class="quantity-btn" onclick="changeQuantity(-1)">-</button>
            <span class="quantity-display" id="quantityDisplay">1</span>
            <button class="quantity-btn" onclick="changeQuantity(1)">+</button>
        </div>
        <button class="modal-add-to-cart" data-item-id="${itemId}" onclick="addToCart(${itemId}, currentQuantity); closeModal(); return false;">
            Add to Cart - $${(item.price * currentQuantity).toFixed(2)}
        </button>
    `;
    
    currentQuantity = 1;
    document.getElementById('itemModal').classList.add('active');
}

function changeQuantity(delta) {
    currentQuantity = Math.max(1, currentQuantity + delta);
    document.getElementById('quantityDisplay').textContent = currentQuantity;
    
    // Update modal button price
    const modalBtn = document.querySelector('.modal-add-to-cart');
    const itemId = modalBtn.dataset.itemId;
    const item = restaurantData.items[itemId];
    
    modalBtn.innerHTML = `Add to Cart - $${(item.price * currentQuantity).toFixed(2)}`;
}

function closeModal() {
    document.getElementById('itemModal').classList.remove('active');
}

function addToCart(itemId, quantity) {
    const item = restaurantData.items[itemId];
    if (!item) return;
    
    let cart = JSON.parse(localStorage.getItem('neoFoodCart') || '[]');
    
    // Check if item already exists in cart
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: itemId,
            name: item.name,
            price: item.price,
            quantity: quantity,
            restaurantName: restaurantData.name
        });
    }
    
    localStorage.setItem('neoFoodCart', JSON.stringify(cart));
    
    // Show add to cart animation
    let addBtn;
    if (event && event.target) {
        addBtn = event.target;
        addBtn.classList.add('added');
        addBtn.textContent = 'Added!';
        
        setTimeout(() => {
            addBtn.classList.remove('added');
            addBtn.textContent = 'Add to Cart';
        }, 1000);
    }
    
    // Update cart display
    updateCartDisplay();
    
    // Show floating notification
    showAddToCartNotification(item.name, quantity);
}

function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('neoFoodCart') || '[]');
    const cartCount = document.querySelector('.cart-count');
    const floatingCart = document.getElementById('floatingCart');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    
    if (totalItems > 0) {
        cartCount.style.display = 'inline';
        floatingCart.style.display = 'block';
        
        document.querySelector('.cart-items-count').textContent = `${totalItems} item${totalItems > 1 ? 's' : ''}`;
        document.querySelector('.cart-total').textContent = `$${totalPrice.toFixed(2)}`;
    } else {
        cartCount.style.display = 'none';
        floatingCart.style.display = 'none';
    }
}

function showAddToCartNotification(itemName, quantity) {
    const notification = document.createElement('div');
    notification.className = 'add-notification';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--glass-bg);
        backdrop-filter: blur(15px);
        border: 1px solid var(--neon-blue);
        border-radius: 15px;
        padding: 15px 20px;
        color: var(--text-light);
        z-index: 3000;
        animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="color: var(--neon-blue); font-size: 1.2rem;">✓</span>
            <div>
                <div style="font-weight: bold;">${itemName}</div>
                <div style="font-size: 0.9rem; opacity: 0.8;">Added ${quantity} to cart</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function setupModalClose() {
    const closeBtn = document.querySelector('.close-btn');
    const itemModal = document.getElementById('itemModal');
    
    closeBtn.addEventListener('click', closeModal);
    
    itemModal.addEventListener('click', (e) => {
        if (e.target.id === 'itemModal') {
            closeModal();
        }
    });
}

// Add notification animations to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes addToCartPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); background: var(--neon-pink); }
        100% { transform: scale(1); }
    }
    
    .add-to-cart-btn.added {
        animation: addToCartPulse 0.6s ease;
    }
`;
document.head.appendChild(style);