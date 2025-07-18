// Quantum Vouchers System for NeoFood

document.addEventListener('DOMContentLoaded', () => {
    setupTabs();
    loadVouchers();
    setupRedeemSystem();
});

// Sample voucher data - in a real app, this would come from a server
const sampleVouchers = [
    {
        id: 'QV-2023-001',
        type: 'Discount',
        value: '20% OFF',
        description: 'Get 20% off your next order',
        expiry: '2023-12-31',
        code: 'NEOFOOD20',
        used: false
    },
    {
        id: 'QV-2023-002',
        type: 'Free Delivery',
        value: 'FREE',
        description: 'Free delivery on your next order',
        expiry: '2023-12-15',
        code: 'FREESHIP',
        used: false
    },
    {
        id: 'QV-2023-003',
        type: 'Special Offer',
        value: '$10 OFF',
        description: '$10 off when you spend $50 or more',
        expiry: '2023-11-30',
        code: 'SAVE10',
        used: true
    }
];

function setupTabs() {
    const tabs = document.querySelectorAll('.tab');
    const panels = document.querySelectorAll('.tab-panel');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and panels
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            tab.classList.add('active');
            const panel = document.getElementById(`${tab.dataset.tab}-panel`);
            if (panel) panel.classList.add('active');
        });
    });
}

function loadVouchers() {
    // Get vouchers from localStorage or use sample data
    let vouchers = JSON.parse(localStorage.getItem('neoFoodVouchers'));
    
    if (!vouchers) {
        // Initialize with sample data
        vouchers = sampleVouchers;
        localStorage.setItem('neoFoodVouchers', JSON.stringify(vouchers));
    }
    
    // Display available vouchers
    const availableVouchers = document.getElementById('availableVouchers');
    const activeVouchers = vouchers.filter(v => !v.used);
    
    if (availableVouchers) {
        if (activeVouchers.length === 0) {
            availableVouchers.innerHTML = `
                <div class="empty-vouchers">
                    <p>You don't have any available vouchers.</p>
                    <p>Redeem a code to get started!</p>
                </div>
            `;
        } else {
            availableVouchers.innerHTML = activeVouchers.map(voucher => `
                <div class="voucher-card glass">
                    <div class="voucher-header">
                        <div class="voucher-type">${voucher.type}</div>
                        <div class="voucher-value">${voucher.value}</div>
                    </div>
                    <div class="voucher-description">${voucher.description}</div>
                    <div class="voucher-expiry">Valid until ${formatDate(voucher.expiry)}</div>
                    <div class="voucher-actions">
                        <span class="voucher-code">${voucher.code}</span>
                        <button class="use-voucher-btn" onclick="useVoucher('${voucher.id}')">Use Now</button>
                    </div>
                </div>
            `).join('');
        }
    }
    
    // Display used vouchers
    const usedVouchers = document.getElementById('usedVouchers');
    const expiredVouchers = vouchers.filter(v => v.used);
    
    if (usedVouchers) {
        if (expiredVouchers.length === 0) {
            usedVouchers.innerHTML = `
                <div class="empty-vouchers">
                    <p>You haven't used any vouchers yet.</p>
                </div>
            `;
        } else {
            usedVouchers.innerHTML = expiredVouchers.map(voucher => `
                <div class="voucher-card glass used">
                    <div class="voucher-header">
                        <div class="voucher-type">${voucher.type}</div>
                        <div class="voucher-value">${voucher.value}</div>
                    </div>
                    <div class="voucher-description">${voucher.description}</div>
                    <div class="voucher-expiry">Used on ${formatDate(new Date())}</div>
                    <div class="voucher-actions">
                        <span class="voucher-code">${voucher.code}</span>
                        <span class="used-badge">Used</span>
                    </div>
                </div>
            `).join('');
        }
    }
}

function setupRedeemSystem() {
    const redeemBtn = document.getElementById('redeemBtn');
    const voucherCodeInput = document.getElementById('voucherCode');
    
    if (redeemBtn && voucherCodeInput) {
        redeemBtn.addEventListener('click', () => {
            const code = voucherCodeInput.value.trim();
            
            if (!code) {
                alert('Please enter a voucher code');
                return;
            }
            
            // Simulate quantum verification process
            redeemBtn.disabled = true;
            redeemBtn.innerHTML = '<span>Verifying...</span>';
            
            setTimeout(() => {
                // Check if code is valid (in a real app, this would be a server request)
                const isValid = validateVoucherCode(code);
                
                if (isValid) {
                    // Get voucher details from validation
                    const voucherDetails = validateVoucherCode(code);
                    
                    // Add new voucher
                    const newVoucher = {
                        id: `QV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
                        type: voucherDetails.type || 'Quantum Discount',
                        value: voucherDetails.value || '15% OFF',
                        description: voucherDetails.description || 'Quantum discount on your next order',
                        expiry: voucherDetails.expiry || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                        code: code,
                        used: false
                    };
                    
                    // Add to localStorage
                    const vouchers = JSON.parse(localStorage.getItem('neoFoodVouchers') || '[]');
                    vouchers.push(newVoucher);
                    localStorage.setItem('neoFoodVouchers', JSON.stringify(vouchers));
                    
                    // Show success modal
                    showVoucherModal(newVoucher);
                    
                    // Reset form
                    voucherCodeInput.value = '';
                } else {
                    alert('Invalid voucher code or already redeemed');
                }
                
                redeemBtn.disabled = false;
                redeemBtn.innerHTML = '<span>Verify & Redeem</span><div class="button-glow"></div>';
            }, 2000);
        });
    }
    
    // Close modal button
    const closeModalBtn = document.querySelector('.close-modal-btn');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            document.getElementById('voucherModal').style.display = 'none';
            loadVouchers(); // Reload vouchers list
        });
    }
}

function validateVoucherCode(code) {
    // Hide the predefined codes and only validate based on length
    // This makes the codes more exclusive and mysterious
    return code.length >= 8;
}

function showVoucherModal(voucher) {
    const modal = document.getElementById('voucherModal');
    const details = document.getElementById('voucherDetails');
    const expiry = document.getElementById('voucherExpiry');
    
    if (modal && details && expiry) {
        details.textContent = voucher.description;
        expiry.textContent = formatDate(voucher.expiry);
        modal.style.display = 'flex';
    }
}

function useVoucher(voucherId) {
    // Get vouchers from localStorage
    const vouchers = JSON.parse(localStorage.getItem('neoFoodVouchers') || '[]');
    const voucherIndex = vouchers.findIndex(v => v.id === voucherId);
    
    if (voucherIndex !== -1) {
        // Mark as used
        vouchers[voucherIndex].used = true;
        localStorage.setItem('neoFoodVouchers', JSON.stringify(vouchers));
        
        // Store in cart for checkout
        localStorage.setItem('activeVoucher', JSON.stringify(vouchers[voucherIndex]));
        
        // Redirect to cart
        window.location.href = 'cart.html';
    }
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Make functions global
window.useVoucher = useVoucher;