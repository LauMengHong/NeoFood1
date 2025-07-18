// Sample menu data
const menuData = {
    1: { // Cyber Sushi
        name: "Cyber Sushi",
        cuisine: "Japanese",
        rating: 4.8,
        deliveryTime: "25-35 min",
        deliveryFee: "$2.99",
        icon: "🍣",
        categories: {
            "Signature Rolls": [
                { id: 101, name: "Neon Dragon Roll", description: "Spicy tuna, avocado, topped with eel and neon sauce", price: 18.99, rating: 4.9 },
                { id: 102, name: "Cyber Rainbow Roll", description: "California roll topped with assorted sashimi", price: 16.99, rating: 4.7 },
                { id: 103, name: "Matrix Tempura Roll", description: "Shrimp tempura, cucumber, spicy mayo", price: 14.99, rating: 4.6 }
            ],
            "Sashimi": [
                { id: 104, name: "Premium Sashimi Set", description: "Chef's selection of 12 pieces", price: 24.99, rating: 4.8 },
                { id: 105, name: "Salmon Sashimi", description: "Fresh Atlantic salmon, 6 pieces", price: 12.99, rating: 4.7 }
            ],
            "Hot Dishes": [
                { id: 106, name: "Ramen Fusion", description: "Tonkotsu broth with cyber-enhanced toppings", price: 15.99, rating: 4.8 },
                { id: 107, name: "Teriyaki Chicken", description: "Grilled chicken with house teriyaki sauce", price: 13.99, rating: 4.5 }
            ]
        }
    },
    2: { // Neon Pizza Co.
        name: "Neon Pizza Co.",
        cuisine: "Italian",
        rating: 4.6,
        deliveryTime: "20-30 min",
        deliveryFee: "$1.99",
        icon: "🍕",
        categories: {
            "Signature Pizzas": [
                { id: 201, name: "Neon Supreme", description: "Pepperoni, sausage, mushrooms, peppers, olives", price: 19.99, rating: 4.8 },
                { id: 202, name: "Cyber Margherita", description: "Fresh mozzarella, basil, premium tomato sauce", price: 16.99, rating: 4.6 },
                { id: 203, name: "Matrix Meat Lovers", description: "Pepperoni, sausage, bacon, ham", price: 21.99, rating: 4.7 }
            ],
            "Pasta": [
                { id: 204, name: "Laser Carbonara", description: "Creamy pasta with bacon and parmesan", price: 14.99, rating: 4.5 },
                { id: 205, name: "Quantum Alfredo", description: "Fettuccine in rich alfredo sauce", price: 13.99, rating: 4.4 }
            ],
            "Sides": [
                { id: 206, name: "Garlic Bread Deluxe", description: "Toasted bread with garlic butter and herbs", price: 6.99, rating: 4.3 },
                { id: 207, name: "Mozzarella Sticks", description: "Crispy breaded mozzarella with marinara", price: 8.99, rating: 4.6 }
            ]
        }
    },
    3: { // Quantum Greens
        name: "Quantum Greens",
        cuisine: "Healthy",
        rating: 4.9,
        deliveryTime: "15-25 min",
        deliveryFee: "$3.49",
        icon: "🥗",
        categories: {
            "Salads": [
                { id: 301, name: "Quantum Power Bowl", description: "Kale, quinoa, avocado, roasted vegetables", price: 14.99, rating: 4.9 },
                { id: 302, name: "Cyber Greek Salad", description: "Cucumber, tomato, olives, feta cheese", price: 12.99, rating: 4.7 }
            ],
            "Bowls": [
                { id: 303, name: "Protein Fusion Bowl", description: "Grilled chicken, brown rice, vegetables", price: 15.99, rating: 4.8 },
                { id: 304, name: "Vegan Delight", description: "Plant-based protein, fresh vegetables, tahini", price: 13.99, rating: 4.6 }
            ]
        }
    },
    4: { // Bubble Matrix
        name: "Bubble Matrix",
        cuisine: "Beverages",
        rating: 4.7,
        deliveryTime: "10-20 min",
        deliveryFee: "$1.49",
        icon: "🧋",
        categories: {
            "Bubble Tea": [
                { id: 401, name: "Classic Milk Tea", description: "Black tea with milk and tapioca pearls", price: 5.99, rating: 4.8 },
                { id: 402, name: "Taro Bubble Tea", description: "Creamy taro flavor with chewy pearls", price: 6.49, rating: 4.7 }
            ],
            "Smoothies": [
                { id: 403, name: "Berry Blast", description: "Mixed berries with yogurt", price: 7.99, rating: 4.9 },
                { id: 404, name: "Tropical Paradise", description: "Mango, pineapple, coconut", price: 7.49, rating: 4.6 }
            ]
        }
    },
    5: { // Sweet Circuits
        name: "Sweet Circuits",
        cuisine: "Desserts",
        rating: 4.5,
        deliveryTime: "30-40 min",
        deliveryFee: "$2.49",
        icon: "🍰",
        categories: {
            "Cakes": [
                { id: 501, name: "Neon Cheesecake", description: "Creamy cheesecake with glowing berry topping", price: 8.99, rating: 4.7 },
                { id: 502, name: "Chocolate Overload", description: "Rich chocolate cake with fudge frosting", price: 7.99, rating: 4.8 }
            ],
            "Ice Cream": [
                { id: 503, name: "Cyber Sundae", description: "Vanilla ice cream with futuristic toppings", price: 6.99, rating: 4.5 },
                { id: 504, name: "Matrix Milkshake", description: "Thick shake with cookies and cream", price: 5.99, rating: 4.6 }
            ]
        }
    },
    6: { // Fire Fusion
        name: "Fire Fusion",
        cuisine: "Trending",
        rating: 4.9,
        deliveryTime: "20-30 min",
        deliveryFee: "$2.99",
        icon: "🔥",
        categories: {
            "Fusion Bowls": [
                { id: 601, name: "Korean BBQ Bowl", description: "Marinated beef, rice, kimchi", price: 16.99, rating: 4.9 },
                { id: 602, name: "Thai Curry Ramen", description: "Spicy curry broth with noodles", price: 15.99, rating: 4.8 }
            ],
            "Tacos": [
                { id: 603, name: "Sushi Tacos", description: "Sushi-grade fish in crispy wonton shells", price: 14.99, rating: 4.7 },
                { id: 604, name: "Korean Fried Chicken Tacos", description: "Crispy chicken with gochujang sauce", price: 13.99, rating: 4.8 }
            ]
        }
    }
};

let currentRestaurant = null;
let currentQuantity = 1;

// Load restaurant and menu on page load
document.addEventListener('DOMContentLoaded', () => {
    const restaurantId = localStorage.getItem('selectedRestaurant');
    console.log('Selected restaurant ID:', restaurantId);
    
    if (restaurantId && menuData[restaurantId]) {
        currentRestaurant = menuData[restaurantId];
        console.log('Loading restaurant:', currentRestaurant.name);
        loadRestaurantHeader();
        loadMenuCategories();
        loadMenuItems();
        updateCartDisplay();
    } else {
        console.log('No restaurant selected, redirecting to home');
        // Add a small delay to see what's happening
        setTimeout(() => {
            window.location.href = 'home.html';
        }, 1000);
    }
});

function loadRestaurantHeader() {
    document.getElementById('restaurantName').textContent = currentRestaurant.name;
    document.getElementById('restaurantDetails').textContent = currentRestaurant.cuisine + " • Premium Quality";
    document.getElementById('restaurantIcon').textContent = currentRestaurant.icon;
    
    const stats = document.getElementById('restaurantStats');
    stats.innerHTML = `
        <span class="rating">⭐ ${currentRestaurant.rating}</span>
        <span class="delivery-time">🕒 ${currentRestaurant.deliveryTime}</span>
        <span class="delivery-fee">🚚 ${currentRestaurant.deliveryFee}</span>
    `;
}

function loadMenuCategories() {
    const categoryTabs = document.getElementById('categoryTabs');
    const categories = Object.keys(currentRestaurant.categories);
    
    categoryTabs.innerHTML = categories.map((category, index) => 
        `<div class="category-tab ${index === 0 ? 'active' : ''}" onclick="showCategory('${category}')">${category}</div>`
    ).join('');
}

function loadMenuItems(selectedCategory = null) {
    const menuContainer = document.getElementById('menuContainer');
    const categories = selectedCategory ? 
        { [selectedCategory]: currentRestaurant.categories[selectedCategory] } : 
        currentRestaurant.categories;
    
    menuContainer.innerHTML = Object.entries(categories).map(([categoryName, items]) => `
        <div class="menu-category">
            <h2 class="category-title">${categoryName}</h2>
            <div class="menu-grid">
                ${items.map(item => `
                    <div class="menu-item" onclick="openItemModal(${item.id})">
                        <div class="item-header">
                            <div class="item-info">
                                <h3>${item.name}</h3>
                                <p class="item-description">${item.description}</p>
                            </div>
                            <div class="item-price">$${item.price}</div>
                        </div>
                        <div class="item-actions">
                            <div class="item-rating">⭐ ${item.rating}</div>
                            <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart(${item.id}, 1)">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function showCategory(categoryName) {
    // Update active tab
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Load items for selected category
    loadMenuItems(categoryName);
    
    // Smooth scroll to menu section
    document.querySelector('.menu-section').scrollIntoView({
        behavior: 'smooth'
    });
}

function openItemModal(itemId) {
    const item = findItemById(itemId);
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
        <button class="modal-add-to-cart" data-item-id="${itemId}" onclick="addToCart(${itemId}, currentQuantity); closeModal()">
            Add to Cart - $${(item.price * currentQuantity).toFixed(2)}
        </button>
    `;
    
    currentQuantity = 1;
    document.getElementById('itemModal').classList.add('active');
}

function findItemById(itemId) {
    for (const category of Object.values(currentRestaurant.categories)) {
        const item = category.find(item => item.id === itemId);
        if (item) return item;
    }
    return null;
}

function changeQuantity(delta) {
    currentQuantity = Math.max(1, currentQuantity + delta);
    const quantityDisplay = document.getElementById('quantityDisplay');
    if (quantityDisplay) {
        quantityDisplay.textContent = currentQuantity;
    }
    
    // Update modal button price
    const modalBtn = document.querySelector('.modal-add-to-cart');
    if (modalBtn && modalBtn.dataset.itemId) {
        const item = findItemById(parseInt(modalBtn.dataset.itemId));
        if (item) {
            modalBtn.innerHTML = `Add to Cart - $${(item.price * currentQuantity).toFixed(2)}`;
        }
    }
}

function closeModal() {
    document.getElementById('itemModal').classList.remove('active');
}

function addToCart(itemId, quantity) {
    const item = findItemById(itemId);
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
            restaurantName: currentRestaurant.name
        });
    }
    
    localStorage.setItem('neoFoodCart', JSON.stringify(cart));
    
    // Show add to cart animation
    const addBtn = event.target;
    addBtn.classList.add('added');
    addBtn.textContent = 'Added!';
    
    setTimeout(() => {
        addBtn.classList.remove('added');
        addBtn.textContent = 'Add to Cart';
    }, 1000);
    
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
`;
document.head.appendChild(style);

// Modal close functionality
document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.querySelector('.close-btn');
    const itemModal = document.getElementById('itemModal');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (itemModal) {
        itemModal.addEventListener('click', (e) => {
            if (e.target.id === 'itemModal') {
                closeModal();
            }
        });
    }
});