// Restaurant favorites functionality
const restaurantIcons = {
    "Cyber Sushi": "🍣",
    "Neon Pizza Co.": "🍕",
    "Quantum Greens": "🥗",
    "Bubble Matrix": "🧋",
    "Sweet Circuits": "🍰",
    "Fire Fusion": "🔥",
    "Dragon Wok": "🥢",
    "Noodle Matrix": "🍜",
    "Burger Nexus": "🍔",
    "Taco Cyber": "🌮",
    "Vita Green": "🌱",
    "Juice Lab": "🥤",
    "Ice Dream": "🍦",
    "Spice Storm": "🍛"
};

// Add favorite button to restaurant pages
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on a restaurant page
    const restaurantName = document.querySelector('.restaurant-name');
    if (restaurantName) {
        addFavoriteButton(restaurantName.textContent);
    }
});

function addFavoriteButton(restaurantName) {
    // Get restaurant details
    const restaurantDetails = document.querySelector('.restaurant-details');
    const cuisine = restaurantDetails ? restaurantDetails.textContent.split('•')[0].trim() : '';
    const icon = document.querySelector('.restaurant-icon') ? 
                document.querySelector('.restaurant-icon').textContent : 
                restaurantIcons[restaurantName] || '🍽️';
    
    // Create favorite button
    const favoriteBtn = document.createElement('button');
    favoriteBtn.className = 'favorite-btn';
    
    // Check if restaurant is already favorited
    const favorites = JSON.parse(localStorage.getItem('neoFoodFavorites') || '[]');
    const isFavorite = favorites.some(fav => fav.name === restaurantName);
    
    // Set button style and text
    favoriteBtn.innerHTML = isFavorite ? '❤️ Favorited' : '🤍 Add to Favorites';
    favoriteBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        background: ${isFavorite ? 'rgba(255, 0, 128, 0.2)' : 'rgba(255, 255, 255, 0.2)'};
        backdrop-filter: blur(5px);
        border: 1px solid ${isFavorite ? '#ff0080' : 'rgba(255, 255, 255, 0.3)'};
        color: white;
        padding: 8px 15px;
        border-radius: 20px;
        cursor: pointer;
        font-weight: bold;
        transition: all 0.3s ease;
    `;
    
    // Add hover effect
    favoriteBtn.addEventListener('mouseover', () => {
        favoriteBtn.style.transform = 'scale(1.05)';
    });
    
    favoriteBtn.addEventListener('mouseout', () => {
        favoriteBtn.style.transform = 'scale(1)';
    });
    
    // Add click handler
    favoriteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(restaurantName, cuisine, icon, window.location.href);
        
        // Update button appearance
        const isNowFavorite = favoriteBtn.innerHTML.includes('🤍');
        favoriteBtn.innerHTML = isNowFavorite ? '❤️ Favorited' : '🤍 Add to Favorites';
        favoriteBtn.style.background = isNowFavorite ? 'rgba(255, 0, 128, 0.2)' : 'rgba(255, 255, 255, 0.2)';
        favoriteBtn.style.border = isNowFavorite ? '1px solid #ff0080' : '1px solid rgba(255, 255, 255, 0.3)';
    });
    
    // Add button to page
    const restaurantHeader = document.querySelector('.restaurant-header');
    if (restaurantHeader) {
        restaurantHeader.style.position = 'relative';
        restaurantHeader.appendChild(favoriteBtn);
    }
}

function toggleFavorite(name, cuisine, icon, url) {
    // Get current favorites
    let favorites = JSON.parse(localStorage.getItem('neoFoodFavorites') || '[]');
    
    // Check if restaurant is already in favorites
    const existingIndex = favorites.findIndex(fav => fav.name === name);
    
    if (existingIndex >= 0) {
        // Remove from favorites
        favorites.splice(existingIndex, 1);
        showNotification(`${name} removed from favorites`);
    } else {
        // Add to favorites
        favorites.push({ name, cuisine, icon, url });
        showNotification(`${name} added to favorites`);
    }
    
    // Save updated favorites
    localStorage.setItem('neoFoodFavorites', JSON.stringify(favorites));
}

function showNotification(message) {
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
        animation: fadeIn 0.3s ease, fadeOut 0.3s ease 2.7s;
    `;
    
    notification.innerHTML = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}