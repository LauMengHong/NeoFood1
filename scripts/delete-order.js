// Function to delete an order from history
function deleteOrder(orderNumber) {
    // Confirm deletion
    if (!confirm('Are you sure you want to delete this order?')) {
        return;
    }
    
    // Get order history
    let orderHistory = JSON.parse(localStorage.getItem('neoFoodOrderHistory') || '[]');
    
    // Remove the order with matching order number
    orderHistory = orderHistory.filter(order => order.orderNumber !== orderNumber);
    
    // Save updated order history
    localStorage.setItem('neoFoodOrderHistory', JSON.stringify(orderHistory));
    
    // Reload order history display
    const activeFilter = document.querySelector('.filter-tab.active').dataset.filter;
    const searchQuery = document.getElementById('orderSearch').value;
    loadOrderHistory(activeFilter, searchQuery);
    
    // Show confirmation
    showDeleteNotification('Order deleted successfully');
}

// Show notification for delete action
function showDeleteNotification(message) {
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
    `;
    
    notification.innerHTML = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}