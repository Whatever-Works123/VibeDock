// Load 'profile' by default since we know you created that one
window.onload = () => {
    // We simulate a click on the Profile button to start
    // Find the button that says 'loadSection("profile"...)'
    const profileBtn = document.querySelector("button[onclick*='profile']");
    loadSection('profile', profileBtn);
};

async function loadSection(sectionName, buttonElement) {
    const contentDiv = document.getElementById('main-content');
    
    // 1. Highlight the active button
    if (buttonElement) {
        document.querySelectorAll('.sidebar-btn').forEach(btn => btn.classList.remove('active'));
        buttonElement.classList.add('active');
    }

    // 2. Load the content
    try {
        contentDiv.innerHTML = '<p>Loading...</p>'; // Temporary Loading text

        const response = await fetch(`sections/${sectionName}/content.html`);
        
        if (!response.ok) {
            throw new Error(`Folder or file not found: sections/${sectionName}/content.html`);
        }
        
        const html = await response.text();
        contentDiv.innerHTML = html;

    } catch (error) {
        // THIS IS THE DIAGNOSTIC PART
        console.error(error);
        
        // Check if it is the specific "CORS" security error
        if (window.location.protocol === 'file:') {
            contentDiv.innerHTML = `
                <h2 style="color:red">Security Error</h2>
                <p><strong>The code is correct, but your browser blocked it.</strong></p>
                <p>Browsers do not allow <code>fetch()</code> commands when you open a file directly (file://).</p>
                <p><strong>The Fix:</strong> You must use the "Live Server" extension in VS Code.</p>
            `;
        } else {
            // It's just a missing folder/file
            contentDiv.innerHTML = `
                <h2 style="color:red">Error 404</h2>
                <p>Could not find the file.</p>
                <p>Check that you have a folder named <strong>sections/${sectionName}</strong></p>
                <p>And a file inside it named <strong>content.html</strong></p>
            `;
        }
    }
}