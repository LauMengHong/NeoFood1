// Random Restaurant Picker with Futuristic Animation
document.addEventListener('DOMContentLoaded', () => {
    // Create the random button
    createRandomButton();
});

function createRandomButton() {
    // Create the button container
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'random-button-container';
    buttonContainer.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 30px;
        z-index: 1000;
    `;
    
    // Create the button
    const randomButton = document.createElement('button');
    randomButton.className = 'random-restaurant-btn';
    randomButton.innerHTML = `
        <span class="btn-icon">🎲</span>
        <span class="btn-text">Surprise Me!</span>
    `;
    randomButton.style.cssText = `
        background: linear-gradient(45deg, #00f5ff, #8a2be2);
        border: none;
        border-radius: 50px;
        padding: 12px 20px;
        color: white;
        font-weight: bold;
        font-size: 16px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        box-shadow: 0 0 15px rgba(0, 245, 255, 0.5);
        transition: all 0.3s ease;
    `;
    
    // Add hover effect
    randomButton.addEventListener('mouseover', () => {
        randomButton.style.transform = 'scale(1.05)';
        randomButton.style.boxShadow = '0 0 20px rgba(0, 245, 255, 0.8)';
    });
    
    randomButton.addEventListener('mouseout', () => {
        randomButton.style.transform = 'scale(1)';
        randomButton.style.boxShadow = '0 0 15px rgba(0, 245, 255, 0.5)';
    });
    
    // Add click event
    randomButton.addEventListener('click', () => {
        pickRandomRestaurant();
    });
    
    // Add button to container
    buttonContainer.appendChild(randomButton);
    
    // Add container to body
    document.body.appendChild(buttonContainer);
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }
        
        .random-restaurant-card {
            animation: pulse 0.5s ease, float 3s ease infinite;
            box-shadow: 0 0 30px rgba(0, 245, 255, 0.8) !important;
            position: relative;
            z-index: 100;
        }
        
        .btn-icon {
            display: inline-block;
            animation: spin 3s linear infinite;
        }
        
        .random-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.7);
            z-index: 2000;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
        
        .random-result {
            background: linear-gradient(45deg, rgba(0, 245, 255, 0.2), rgba(138, 43, 226, 0.2));
            backdrop-filter: blur(15px);
            border: 2px solid #00f5ff;
            border-radius: 20px;
            padding: 30px;
            text-align: center;
            color: white;
            max-width: 400px;
            animation: pulse 0.5s ease;
        }
        
        .random-result h2 {
            color: #00f5ff;
            margin-bottom: 20px;
        }
        
        .random-result .restaurant-name {
            font-size: 28px;
            margin: 15px 0;
            color: white;
        }
        
        .random-result .restaurant-icon {
            font-size: 50px;
            margin: 20px 0;
            animation: float 3s ease infinite;
            display: inline-block;
        }
        
        .random-result button {
            background: linear-gradient(45deg, #00f5ff, #8a2be2);
            border: none;
            border-radius: 50px;
            padding: 12px 25px;
            color: white;
            font-weight: bold;
            margin-top: 20px;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);
}

function pickRandomRestaurant() {
    // Get all restaurants from the searchableRestaurants array in direct-search.js
    let restaurants = [];
    
    // Check if searchableRestaurants exists
    if (typeof searchableRestaurants !== 'undefined') {
        restaurants = searchableRestaurants;
    } else {
        // Fallback to hardcoded restaurants
        restaurants = [
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
    }
    
    // Create restaurant icons map
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
    
    // Create overlay with scanning animation
    const overlay = document.createElement('div');
    overlay.className = 'random-overlay';
    overlay.innerHTML = `
        <div style="text-align: center; color: white;">
            <h2 style="color: #00f5ff; margin-bottom: 20px;">Scanning Your Taste Preferences</h2>
            <div style="font-size: 50px; margin: 20px 0;">🔍</div>
            <p style="margin-bottom: 30px;">Analyzing your cravings...</p>
            <div class="scanning-progress" style="width: 300px; height: 6px; background: rgba(255,255,255,0.2); border-radius: 3px; overflow: hidden;">
                <div class="progress-bar" style="width: 0%; height: 100%; background: linear-gradient(90deg, #00f5ff, #8a2be2);"></div>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
    
    // Animate progress bar
    const progressBar = overlay.querySelector('.progress-bar');
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 2;
        progressBar.style.width = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            showRandomResult();
        }
    }, 30);
    
    // Show random result
    function showRandomResult() {
        // Pick a random restaurant
        const randomIndex = Math.floor(Math.random() * restaurants.length);
        const restaurant = restaurants[randomIndex];
        const icon = restaurantIcons[restaurant.name] || "🍽️";
        
        // Update overlay with result
        overlay.innerHTML = `
            <div class="random-result">
                <h2>Perfect Match Found!</h2>
                <div class="restaurant-icon">${icon}</div>
                <div class="restaurant-name">${restaurant.name}</div>
                <p>${restaurant.cuisine} Cuisine</p>
                <button onclick="window.location.href='${restaurant.url}'">Let's Go!</button>
                <button onclick="document.querySelector('.random-overlay').remove()" style="background: rgba(255,255,255,0.2); margin-left: 10px;">Try Again</button>
            </div>
        `;
    }
}