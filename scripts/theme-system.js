// Theme system for NeoFood
// This script applies the selected theme across all pages

document.addEventListener('DOMContentLoaded', () => {
    // Apply saved theme on page load
    applyTheme();
});

// Apply the saved theme
function applyTheme() {
    const savedTheme = localStorage.getItem('neoFoodTheme') || 'dark';
    
    // Remove existing theme classes
    document.body.classList.remove('dark-theme', 'light-theme', 'neon-theme');
    
    // Add selected theme class
    document.body.classList.add(`${savedTheme}-theme`);
    
    // Apply theme-specific CSS variables
    if (savedTheme === 'light') {
        document.documentElement.style.setProperty('--bg-color', '#f5f5f5');
        document.documentElement.style.setProperty('--text-light', '#121212');
        document.documentElement.style.setProperty('--text-secondary', '#555555');
        document.documentElement.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.7)');
    } else if (savedTheme === 'neon') {
        document.documentElement.style.setProperty('--bg-color', '#121212');
        document.documentElement.style.setProperty('--text-light', '#ffffff');
        document.documentElement.style.setProperty('--text-secondary', '#aaaaaa');
        document.documentElement.style.setProperty('--glass-bg', 'rgba(0, 0, 0, 0.7)');
        document.documentElement.style.setProperty('--neon-blue', '#ff00ff');
        document.documentElement.style.setProperty('--neon-purple', '#00ffff');
    } else {
        // Default dark theme
        document.documentElement.style.setProperty('--bg-color', '#121212');
        document.documentElement.style.setProperty('--text-light', '#ffffff');
        document.documentElement.style.setProperty('--text-secondary', '#aaaaaa');
        document.documentElement.style.setProperty('--glass-bg', 'rgba(0, 0, 0, 0.7)');
    }
}