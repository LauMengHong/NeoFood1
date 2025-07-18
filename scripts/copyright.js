// Copyright footer injection script
document.addEventListener('DOMContentLoaded', () => {
    injectCopyright();
});

function injectCopyright() {
    // Create a container for the copyright footer
    const copyrightFooter = document.createElement('footer');
    copyrightFooter.className = 'copyright-footer';
    
    // Add copyright content
    copyrightFooter.innerHTML = `
        <div class="copyright-text">
            © 2025 NeoFood. All rights reserved. Developed by Lau Meng Hong.
        </div>
        <div class="copyright-contact">
            Contact: 011-18580620 | 012-4107210 | <a href="mailto:laumenghong01@gmail.com" class="social-link">laumenghong01@gmail.com</a>
            | Instagram: <a href="https://instagram.com/jaydenlaumenghong" target="_blank" class="social-link">@jaydenlaumenghong</a>
        </div>
    `;
    
    // Append to the end of the body
    document.body.appendChild(copyrightFooter);
}