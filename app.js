// Load the dashboard by default when page opens
window.onload = () => loadSection('dashboard');

async function loadSection(sectionName, buttonElement) {
    const contentDiv = document.getElementById('main-content');
    
    // 1. Handle Visual Highlight (Active State)
    if (buttonElement) {
        // Remove 'active' class from all sidebar buttons
        const allButtons = document.querySelectorAll('.sidebar-btn');
        allButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add 'active' class to the clicked button
        buttonElement.classList.add('active');
    }

    // 2. Fetch Content
    try {
        // Add a temporary loading state
        contentDiv.style.opacity = '0.5';

        const response = await fetch(`sections/${sectionName}/content.html`);
        
        if (!response.ok) throw new Error('Section not found');
        
        const html = await response.text();
        contentDiv.innerHTML = html;
        
        // Fade content back in
        contentDiv.style.opacity = '1';

    } catch (error) {
        contentDiv.innerHTML = `<h1>Error</h1><p>Could not load ${sectionName}.</p>`;
        contentDiv.style.opacity = '1';
    }
}
