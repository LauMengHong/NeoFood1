document.addEventListener('DOMContentLoaded', () => {
    loadOrderDetails();
    startProgressAnimation();
});

function loadOrderDetails() {
    const orderData = JSON.parse(localStorage.getItem('currentOrder'));
    
    if (!orderData) {
        window.location.href = 'home.html';
        return;
    }
    
    document.getElementById('orderNumber').textContent = orderData.orderNumber;
    document.getElementById('orderTotal').textContent = orderData.total;
    
    const orderItems = document.getElementById('orderItems');
    orderItems.innerHTML = orderData.items.map(item => `
        <div class="order-item">
            <div class="item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-qty">Qty: ${item.quantity}</div>
            </div>
            <div class="item-price">$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
    `).join('');
}

function startProgressAnimation() {
    const steps = [
        { step: 1, delay: 0, progress: 25 },
        { step: 2, delay: 5000, progress: 50 },
        { step: 3, delay: 15000, progress: 75 },
        { step: 4, delay: 25000, progress: 100 }
    ];
    
    steps.forEach(({ step, delay, progress }) => {
        setTimeout(() => {
            updateProgress(step, progress);
        }, delay);
    });
}

function updateProgress(currentStep, progressPercent) {
    // Update progress bar
    document.getElementById('progressFill').style.width = progressPercent + '%';
    
    // Update active step
    document.querySelectorAll('.step').forEach((step, index) => {
        if (index + 1 <= currentStep) {
            step.classList.add('active');
        }
    });
    
    // Update estimated time
    const timeRemaining = Math.max(0, 35 - (currentStep - 1) * 8);
    if (timeRemaining > 0) {
        document.getElementById('estimatedTime').textContent = `${timeRemaining} minutes remaining`;
    } else {
        document.getElementById('estimatedTime').textContent = 'Delivered!';
    }
}

function trackOrder() {
    // Create tracking modal
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content glass" style="max-width: 500px; text-align: center;">
            <button class="close-btn" onclick="this.parentElement.parentElement.remove()">&times;</button>
            <h2 style="color: var(--neon-blue); margin-bottom: 20px;">Live Tracking</h2>
            <div style="margin-bottom: 20px;">
                <div style="font-size: 2rem; margin-bottom: 10px;">🚚</div>
                <p>Your order is being prepared with care!</p>
                <p style="color: var(--neon-blue); font-weight: bold;">Driver: Alex Chen</p>
                <p style="color: rgba(255,255,255,0.8);">Phone: (555) 123-4567</p>
            </div>
            <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                <p style="margin-bottom: 10px;">🕒 Estimated arrival: 20-25 minutes</p>
                <p>📍 Currently at: Restaurant kitchen</p>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="background: linear-gradient(45deg, var(--neon-blue), var(--neon-purple)); 
                           border: none; border-radius: 25px; padding: 10px 25px; 
                           color: white; cursor: pointer;">
                Got it!
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
}