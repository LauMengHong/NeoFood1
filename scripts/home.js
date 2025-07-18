// Sample restaurant data
const restaurants = [
    {
        id: 1,
        name: "Cyber Sushi",
        cuisine: "Japanese",
        rating: 4.8,
        deliveryTime: "25-35 min",
        deliveryFee: "$2.99",
        icon: "🍣",
        category: "asian",
        url: "restaurant-1.html"
    },
    {
        id: 2,
        name: "Neon Pizza Co.",
        cuisine: "Italian",
        rating: 4.6,
        deliveryTime: "20-30 min",
        deliveryFee: "$1.99",
        icon: "🍕",
        category: "fastfood",
        url: "restaurant-2.html"
    },
    {
        id: 3,
        name: "Quantum Greens",
        cuisine: "Healthy",
        rating: 4.9,
        deliveryTime: "15-25 min",
        deliveryFee: "$3.49",
        icon: "🥗",
        category: "healthy",
        url: "restaurant-3.html"
    },
    {
        id: 4,
        name: "Bubble Matrix",
        cuisine: "Beverages",
        rating: 4.7,
        deliveryTime: "10-20 min",
        deliveryFee: "$1.49",
        icon: "🧋",
        category: "drinks",
        url: "restaurant-4.html"
    },
    {
        id: 5,
        name: "Sweet Circuits",
        cuisine: "Desserts",
        rating: 4.5,
        deliveryTime: "30-40 min",
        deliveryFee: "$2.49",
        icon: "🍰",
        category: "desserts",
        url: "restaurant-5.html"
    },
    {
        id: 6,
        name: "Fire Fusion",
        cuisine: "Trending",
        rating: 4.9,
        deliveryTime: "20-30 min",
        deliveryFee: "$2.99",
        icon: "🔥",
        category: "hotpicks",
        url: "restaurant-6.html"
    },
    {
        id: 7,
        name: "Dragon Wok",
        cuisine: "Chinese",
        rating: 4.7,
        deliveryTime: "20-30 min",
        deliveryFee: "$2.49",
        icon: "🥢",
        category: "asian",
        url: "restaurant-7.html"
    },
    {
        id: 8,
        name: "Noodle Matrix",
        cuisine: "Thai",
        rating: 4.6,
        deliveryTime: "25-35 min",
        deliveryFee: "$2.99",
        icon: "🍜",
        category: "asian",
        url: "restaurant-8.html"
    },
    {
        id: 9,
        name: "Burger Nexus",
        cuisine: "American",
        rating: 4.4,
        deliveryTime: "15-25 min",
        deliveryFee: "$1.99",
        icon: "🍔",
        category: "fastfood",
        url: "restaurant-9.html"
    },
    {
        id: 10,
        name: "Taco Cyber",
        cuisine: "Mexican",
        rating: 4.5,
        deliveryTime: "18-28 min",
        deliveryFee: "$2.29",
        icon: "🌮",
        category: "fastfood",
        url: "restaurant-10.html"
    },
    {
        id: 11,
        name: "Vita Green",
        cuisine: "Organic",
        rating: 4.8,
        deliveryTime: "20-30 min",
        deliveryFee: "$3.99",
        icon: "🌱",
        category: "healthy",
        url: "restaurant-11.html"
    },
    {
        id: 12,
        name: "Juice Lab",
        cuisine: "Smoothies",
        rating: 4.6,
        deliveryTime: "8-15 min",
        deliveryFee: "$1.99",
        icon: "🥤",
        category: "drinks",
        url: "restaurant-12.html"
    },
    {
        id: 13,
        name: "Ice Dream",
        cuisine: "Ice Cream",
        rating: 4.7,
        deliveryTime: "25-35 min",
        deliveryFee: "$2.99",
        icon: "🍦",
        category: "desserts",
        url: "restaurant-13.html"
    },
    {
        id: 14,
        name: "Spice Storm",
        cuisine: "Indian",
        rating: 4.8,
        deliveryTime: "30-40 min",
        deliveryFee: "$3.49",
        icon: "🍛",
        category: "hotpicks",
        url: "restaurant-14.html"
    }
];

// AI Search suggestions
const searchSuggestions = [
    "spicy ramen", "crispy pizza", "fresh salad", "bubble tea", 
    "chocolate cake", "sushi rolls", "burger combo", "smoothie bowl",
    "pad thai", "chicken wings", "ice cream", "coffee"
];

// Load restaurants on page load
document.addEventListener('DOMContentLoaded', () => {
    loadRestaurants();
    setupSearch();
    setupCategoryCards();
    updateCartCount();
    setupSearchForm();
});

// Setup search form
function setupSearchForm() {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('aiSearch');
    
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                showAIResponse(query);
            }
        });
    }
}

function loadRestaurants(filter = null) {
    const restaurantsGrid = document.getElementById('restaurantsGrid');
    const filteredRestaurants = filter ? 
        restaurants.filter(r => r.category === filter) : restaurants;
    
    restaurantsGrid.innerHTML = filteredRestaurants.map(restaurant => `
        <div class="restaurant-card" onclick="openRestaurant('${restaurant.url}')">
            <div class="restaurant-image">
                ${restaurant.icon}
            </div>
            <div class="restaurant-info">
                <h3 class="restaurant-name">${restaurant.name}</h3>
                <p class="restaurant-cuisine">${restaurant.cuisine}</p>
                <div class="restaurant-rating">
                    <span class="stars">${'★'.repeat(Math.floor(restaurant.rating))}${restaurant.rating % 1 ? '☆' : ''}</span>
                    <span>${restaurant.rating}</span>
                </div>
                <div class="restaurant-delivery">
                    <span>🕒 ${restaurant.deliveryTime}</span>
                    <span>🚚 ${restaurant.deliveryFee}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function setupSearch() {
    const searchInput = document.getElementById('aiSearch');
    const suggestionsDiv = document.getElementById('suggestions');
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        
        if (query.length > 0) {
            // Get matching suggestions
            const matches = searchSuggestions.filter(s => 
                s.toLowerCase().includes(query)
            ).slice(0, 5);
            
            // Get matching restaurant names
            const restaurantMatches = restaurants
                .filter(r => r.name.toLowerCase().includes(query) || r.cuisine.toLowerCase().includes(query))
                .map(r => r.name)
                .slice(0, 3);
            
            // Combine both types of suggestions
            const allMatches = [...restaurantMatches, ...matches].slice(0, 5);
            
            if (allMatches.length > 0) {
                suggestionsDiv.innerHTML = allMatches.map(match => 
                    `<div class="suggestion-item" onclick="selectSuggestion('${match}')">${match}</div>`
                ).join('');
                suggestionsDiv.style.display = 'block';
            } else {
                suggestionsDiv.style.display = 'none';
            }
        } else {
            suggestionsDiv.style.display = 'none';
        }
    });
    
    // Hide suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            suggestionsDiv.style.display = 'none';
        }
    });
}

function selectSuggestion(suggestion) {
    document.getElementById('aiSearch').value = suggestion;
    document.getElementById('suggestions').style.display = 'none';
    
    // Simulate AI search with typing animation
    showAIResponse(suggestion);
}

// This section was moved to setupSearchForm()

function showAIResponse(query) {
    // Create AI response popup
    const aiResponse = document.createElement('div');
    aiResponse.className = 'ai-response glass';
    aiResponse.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 30px;
        border-radius: 20px;
        z-index: 3000;
        max-width: 400px;
        text-align: center;
    `;
    
    document.body.appendChild(aiResponse);
    
    // Typing animation
    const messages = [
        "🤖 Analyzing your craving...",
        `Found perfect matches for "${query}"!`,
        "Filtering restaurants..."
    ];
    
    let messageIndex = 0;
    const typeMessage = () => {
        if (messageIndex < messages.length) {
            aiResponse.innerHTML = `<p>${messages[messageIndex]}</p>`;
            messageIndex++;
            setTimeout(typeMessage, 1000);
        } else {
            aiResponse.remove();
            
            // Search for matching restaurants
            const matchingRestaurants = restaurants.filter(r => 
                r.cuisine.toLowerCase().includes(query.toLowerCase()) || 
                r.name.toLowerCase().includes(query.toLowerCase()) ||
                searchMenuItems(query.toLowerCase(), r.id)
            );
            
            if (matchingRestaurants.length > 0) {
                // Display matching restaurants
                const restaurantsGrid = document.getElementById('restaurantsGrid');
                restaurantsGrid.innerHTML = matchingRestaurants.map(restaurant => `
                    <div class="restaurant-card" onclick="window.location.href='${restaurant.url}'">
                        <div class="restaurant-image">
                            ${restaurant.icon}
                        </div>
                        <div class="restaurant-info">
                            <h3 class="restaurant-name">${restaurant.name}</h3>
                            <p class="restaurant-cuisine">${restaurant.cuisine}</p>
                            <div class="restaurant-rating">
                                <span class="stars">${'★'.repeat(Math.floor(restaurant.rating))}${restaurant.rating % 1 ? '☆' : ''}</span>
                                <span>${restaurant.rating}</span>
                            </div>
                            <div class="restaurant-delivery">
                                <span>🕒 ${restaurant.deliveryTime}</span>
                                <span>🚚 ${restaurant.deliveryFee}</span>
                            </div>
                        </div>
                    </div>
                `).join('');
                
                // Scroll to restaurants section
                document.querySelector('.restaurants-section').scrollIntoView({
                    behavior: 'smooth'
                });
            } else {
                // No matches found
                const restaurantsGrid = document.getElementById('restaurantsGrid');
                restaurantsGrid.innerHTML = `
                    <div style="text-align: center; width: 100%; padding: 40px;">
                        <h3 style="color: var(--neon-blue);">No matches found for "${query}"</h3>
                        <p style="color: rgba(255,255,255,0.7); margin-top: 10px;">Try another search term</p>
                    </div>
                `;
                
                document.querySelector('.restaurants-section').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    };
    
    typeMessage();
}

// Helper function to search menu items
function searchMenuItems(query, restaurantId) {
    // Define some common menu items for each restaurant
    const menuKeywords = {
        1: ["sushi", "roll", "japanese", "dragon", "rainbow", "tempura", "sashimi", "ramen"],
        2: ["pizza", "italian", "pasta", "margherita", "carbonara", "garlic bread"],
        3: ["salad", "healthy", "bowl", "greens", "quinoa"],
        4: ["bubble tea", "smoothie", "drink", "beverage"],
        5: ["dessert", "cake", "sweet", "ice cream"],
        6: ["fusion", "bowl", "taco", "korean", "thai"],
        7: ["chinese", "wok", "kung pao", "sweet and sour", "beef"],
        8: ["thai", "noodle", "pad thai", "curry", "tom yum"],
        9: ["burger", "american", "fries", "chicken"],
        10: ["taco", "mexican", "quesadilla", "burrito"],
        11: ["organic", "vegan", "vegetarian", "kale", "buddha bowl"],
        12: ["juice", "smoothie", "fruit", "green"],
        13: ["ice cream", "dessert", "sweet", "vanilla", "chocolate"],
        14: ["indian", "curry", "spicy", "biryani", "naan"]
    };
    
    return menuKeywords[restaurantId] && menuKeywords[restaurantId].some(keyword => keyword.includes(query));
}

function setupCategoryCards() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        const exploreBtn = card.querySelector('.explore-btn');
        exploreBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const category = card.dataset.category;
            loadRestaurants(category);
            
            // Smooth scroll to restaurants section
            document.querySelector('.restaurants-section').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

function openRestaurant(url) {
    // Add transition effect
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        window.location.href = url;
    }, 500);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('neoFoodCart') || '[]');
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    if (totalItems > 0) {
        cartCount.style.display = 'inline';
    } else {
        cartCount.style.display = 'none';
    }
}

// Time-based meal suggestions
function getTimeBasedSuggestions() {
    const hour = new Date().getHours();
    let suggestions = [];
    
    if (hour >= 6 && hour < 11) {
        suggestions = ["breakfast burrito", "coffee", "pancakes", "smoothie bowl"];
    } else if (hour >= 11 && hour < 16) {
        suggestions = ["pizza", "burger", "salad", "sandwich"];
    } else if (hour >= 16 && hour < 21) {
        suggestions = ["pasta", "sushi", "curry", "steak"];
    } else {
        suggestions = ["dessert", "ice cream", "late night snacks", "bubble tea"];
    }
    
    return suggestions;
}

// Update search suggestions based on time
document.addEventListener('DOMContentLoaded', () => {
    const timeBasedSuggestions = getTimeBasedSuggestions();
    searchSuggestions.unshift(...timeBasedSuggestions);
});