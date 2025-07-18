// Direct search functionality for NeoFood
// This is a simplified version that works directly with the restaurant data

// Restaurant keywords for search
const restaurantKeywords = {
    "restaurant-1.html": ["sushi", "japanese", "roll", "dragon", "rainbow", "tempura", "sashimi", "ramen"],
    "restaurant-2.html": ["pizza", "italian", "pasta", "margherita", "carbonara", "garlic bread"],
    "restaurant-3.html": ["salad", "healthy", "bowl", "greens", "quinoa"],
    "restaurant-4.html": ["bubble tea", "smoothie", "drink", "beverage"],
    "restaurant-5.html": ["dessert", "cake", "sweet", "ice cream"],
    "restaurant-6.html": ["fusion", "bowl", "taco", "korean", "thai"],
    "restaurant-7.html": ["chinese", "wok", "kung pao", "sweet and sour", "beef"],
    "restaurant-8.html": ["thai", "noodle", "pad thai", "curry", "tom yum"],
    "restaurant-9.html": ["burger", "american", "fries", "chicken"],
    "restaurant-10.html": ["taco", "mexican", "quesadilla", "burrito"],
    "restaurant-11.html": ["organic", "vegan", "vegetarian", "kale", "buddha bowl"],
    "restaurant-12.html": ["juice", "smoothie", "fruit", "green"],
    "restaurant-13.html": ["ice cream", "dessert", "sweet", "vanilla", "chocolate"],
    "restaurant-14.html": ["indian", "curry", "spicy", "biryani", "naan"]
};

// Restaurant data for search
const searchableRestaurants = [
    { name: "Cyber Sushi", cuisine: "Japanese", url: "restaurant-1.html" },
    { name: "Neon Pizza Co.", cuisine: "Italian", url: "restaurant-2.html" },
    { name: "Quantum Greens", cuisine: "Healthy", url: "restaurant-3.html" },
    { name: "Bubble Matrix", cuisine: "Beverages", url: "restaurant-4.html" },
    { name: "Sweet Circuits", cuisine: "Desserts", url: "restaurant-5.html" },
    { name: "Fire Fusion", cuisine: "Trending", url: "restaurant-6.html" },
    { name: "Dragon Wok", cuisine: "Chinese", url: "restaurant-7.html" },
    { name: "Noodle Matrix", cuisine: "Thai", url: "restaurant-8.html" },
    { name: "Burger Nexus", cuisine: "American", url: "restaurant-9.html" },
    { name: "Taco Cyber", cuisine: "Mexican", url: "restaurant-10.html" },
    { name: "Vita Green", cuisine: "Organic", url: "restaurant-11.html" },
    { name: "Juice Lab", cuisine: "Smoothies", url: "restaurant-12.html" },
    { name: "Ice Dream", cuisine: "Ice Cream", url: "restaurant-13.html" },
    { name: "Spice Storm", cuisine: "Indian", url: "restaurant-14.html" }
];

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('aiSearch');
    
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchInput.value.trim().toLowerCase();
            if (query) {
                performSearch(query);
            }
        });
    }
});

function performSearch(query) {
    // Show loading animation
    const restaurantsGrid = document.getElementById('restaurantsGrid');
    restaurantsGrid.innerHTML = '<div style="text-align: center; width: 100%; padding: 40px;"><p>Searching...</p></div>';
    
    // Simulate search delay
    setTimeout(() => {
        // Search by restaurant name or cuisine
        let results = searchableRestaurants.filter(restaurant => 
            restaurant.name.toLowerCase().includes(query) || 
            restaurant.cuisine.toLowerCase().includes(query)
        );
        
        // If no results, search by keywords
        if (results.length === 0) {
            results = searchableRestaurants.filter(restaurant => {
                const keywords = restaurantKeywords[restaurant.url];
                return keywords && keywords.some(keyword => keyword.includes(query));
            });
        }
        
        // Display results
        if (results.length > 0) {
            restaurantsGrid.innerHTML = results.map(restaurant => `
                <div class="restaurant-card" onclick="window.location.href='${restaurant.url}'">
                    <div class="restaurant-info">
                        <h3 class="restaurant-name">${restaurant.name}</h3>
                        <p class="restaurant-cuisine">${restaurant.cuisine}</p>
                    </div>
                </div>
            `).join('');
        } else {
            restaurantsGrid.innerHTML = `
                <div style="text-align: center; width: 100%; padding: 40px;">
                    <h3>No matches found for "${query}"</h3>
                    <p>Try another search term</p>
                </div>
            `;
        }
        
        // Scroll to results
        document.querySelector('.restaurants-section').scrollIntoView({
            behavior: 'smooth'
        });
    }, 1000);
}