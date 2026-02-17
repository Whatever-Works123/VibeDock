// Function to load HTML content from the 'sections' folders
async function loadSection(sectionName) {
    const contentDiv = document.getElementById('main-content');
    
    try {
        // 1. Fetch the HTML file from the specific folder
        const response = await fetch(`sections/${sectionName}/content.html`);
        
        if (!response.ok) {
            throw new Error(`Could not load section: ${sectionName}`);
        }

        // 2. Get the text (HTML) from the file
        const html = await response.text();
        
        // 3. Inject it into the main content area
        contentDiv.innerHTML = html;

        // 4. (Optional) Dynamically load the script for that section if needed
        // loadScript(`sections/${sectionName}/script.js`);

    } catch (error) {
        contentDiv.innerHTML = `<h2>Error</h2><p>${error.message}</p>`;
    }
}

// Optional: Load a default section on startup
// window.onload = () => loadSection('dashboard');