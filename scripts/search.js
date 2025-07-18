// Simple search functionality for NeoFood
document.addEventListener('DOMContentLoaded', () => {
    setupSearch();
});

function setupSearch() {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('aiSearch');
    
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                searchRestaurants(query);
            }
        });
    }
}

function searchRestaurants(query) {
    // Show loading animation
    const restaurantsGrid = document.getElementById('restaurantsGrid');
    restaurantsGrid.innerHTML = '<div style="text-align: center; width: 100%; padding: 40px;"><p>Searching...</p></div>';
    
    // Simulate search delay
    setTimeout(() => {
        // Get all restaurants from the page
        const allRestaurants = [];
        document.querySelectorAll('.restaurant-card').forEach(card => {
            const name = card.querySelector('.restaurant-name').textContent;
            const cuisine = card.querySelector('.restaurant-cuisine').textContent;
            const url = card.getAttribute('onclick').replace("window.location.href='", "").replace("')", "");
            
            allRestaurants.push({ name, cuisine, url });
        });
        
        // Filter restaurants by query
        const matchingRestaurants = allRestaurants.filter(restaurant => 
            restaurant.name.toLowerCase().includes(query.toLowerCase()) || 
            restaurant.cuisine.toLowerCase().includes(query.toLowerCase())
        );
        
        // Display results
        if (matchingRestaurants.length > 0) {
            restaurantsGrid.innerHTML = matchingRestaurants.map(restaurant => `
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