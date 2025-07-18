// Quantum Voucher Codes for NeoFood
// These codes can be redeemed in the voucher system

// Pre-defined voucher codes with their details
const voucherCodes = [
    {
        code: "NEOFOOD20",
        type: "Discount",
        value: "20% OFF",
        description: "Get 20% off your next order",
        expiry: "2023-12-31"
    },
    {
        code: "FREESHIP2023",
        type: "Free Delivery",
        value: "FREE",
        description: "Free delivery on your next order",
        expiry: "2023-12-31"
    },
    {
        code: "WELCOME10",
        type: "Discount",
        value: "$10 OFF",
        description: "$10 off your first order",
        expiry: "2023-12-31"
    },
    {
        code: "QUANTUM25",
        type: "Discount",
        value: "25% OFF",
        description: "25% off your next quantum order",
        expiry: "2023-12-31"
    },
    {
        code: "NEOLAUNCH",
        type: "Discount",
        value: "15% OFF",
        description: "15% off to celebrate our launch",
        expiry: "2023-12-31"
    },
    {
        code: "CYBERFOOD",
        type: "Discount",
        value: "$15 OFF",
        description: "$15 off orders over $50",
        expiry: "2023-12-31"
    },
    {
        code: "MATRIX2023",
        type: "Special Offer",
        value: "30% OFF",
        description: "30% off selected restaurants",
        expiry: "2023-12-31"
    },
    {
        code: "FOODHACK",
        type: "Discount",
        value: "20% OFF",
        description: "20% off your next order",
        expiry: "2023-12-31"
    },
    {
        code: "DIGITALEAT",
        type: "Free Delivery",
        value: "FREE",
        description: "Free delivery on your next 3 orders",
        expiry: "2023-12-31"
    },
    {
        code: "NEOYEAR2023",
        type: "Discount",
        value: "$20 OFF",
        description: "$20 off orders over $60",
        expiry: "2023-12-31"
    },
    {
        code: "FUTUREFOOD",
        type: "Discount",
        value: "15% OFF",
        description: "15% off your next order",
        expiry: "2023-12-31"
    },
    {
        code: "NEONIGHTS",
        type: "Special Offer",
        value: "25% OFF",
        description: "25% off night deliveries (after 8pm)",
        expiry: "2023-12-31"
    },
    {
        code: "CYBERMONDAY",
        type: "Discount",
        value: "40% OFF",
        description: "40% off for Cyber Monday",
        expiry: "2023-12-31"
    },
    {
        code: "FLASHFOOD",
        type: "Discount",
        value: "30% OFF",
        description: "30% off flash sale (today only)",
        expiry: "2023-12-31"
    },
    {
        code: "QUANTUMLEAP",
        type: "Special Offer",
        value: "$25 OFF",
        description: "$25 off orders over $75",
        expiry: "2023-12-31"
    },
    {
        code: "NEOTASTE",
        type: "Discount",
        value: "20% OFF",
        description: "20% off your first order",
        expiry: "2023-12-31"
    },
    {
        code: "MATRIXMEAL",
        type: "Free Item",
        value: "FREE ITEM",
        description: "Free dessert with orders over $40",
        expiry: "2023-12-31"
    },
    {
        code: "PIXELFOOD",
        type: "Discount",
        value: "15% OFF",
        description: "15% off your next order",
        expiry: "2023-12-31"
    },
    {
        code: "VIRTUALFEAST",
        type: "Discount",
        value: "$12 OFF",
        description: "$12 off orders over $45",
        expiry: "2023-12-31"
    },
    {
        code: "NEOFOODELITE",
        type: "Special Offer",
        value: "35% OFF",
        description: "35% off premium restaurants",
        expiry: "2023-12-31"
    }
];

// Initialize voucher codes in the system - but keep them hidden
document.addEventListener('DOMContentLoaded', () => {
    initializeVoucherCodes();
});

function initializeVoucherCodes() {
    // Store codes in localStorage but don't expose them
    localStorage.setItem('neoFoodValidCodes', JSON.stringify(voucherCodes.map(v => v.code)));
    
    // Override the validateVoucherCode function with a more mysterious one
    window.validateVoucherCode = function(code) {
        // Secret validation - check if it's one of our predefined codes
        const voucherDetails = voucherCodes.find(v => v.code === code);
        if (voucherDetails) {
            return voucherDetails;
        }
        
        // For any code with 8+ characters, create a random voucher
        if (code.length >= 8) {
            // Generate a random discount
            const discountTypes = ["10% OFF", "15% OFF", "20% OFF", "$5 OFF", "$10 OFF"];
            const randomDiscount = discountTypes[Math.floor(Math.random() * discountTypes.length)];
            
            return {
                code: code,
                type: "Discount",
                value: randomDiscount,
                description: `${randomDiscount} your next order with quantum code`,
                expiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
            };
        }
        
        return false;
    };
}