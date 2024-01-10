//Navigation
function showTab(tabName) {
    var tabs = document.querySelectorAll('.tab');
    
    tabs.forEach(function(tab) {
        tab.style.display = 'none';
    });

    var selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.style.display = 'block';
    }
}


//People
function showMemberDetails(card) {
    // Implement logic to display a modal with detailed information
    card.classList.toggle('expanded');
}


//Research
function toggleCard(card) {
    card.classList.toggle('expanded');
  }


//Publications
function editPublications() {
    // Prompt the admin to enter a DOI
    var doi = prompt('Enter the DOI for the publication:');

    // Check if the admin entered a DOI
    if (doi) {
        // Call the updatePublicationFromDOI function with the provided DOI
        updatePublicationFromDOI(doi);
    } else {
        alert('Please enter a DOI.'); // Optionally, provide a message if the admin didn't enter a DOI
    }

    // Reload the page to reflect the changes

}


function updatePublicationFromDOI(doi) {
    // Make a request to the Crossref Metadata API
    fetch(`https://api.crossref.org/works/${doi}`)
        .then(response => response.json())
        .then(data => {
            // Extract relevant information from the API response
            const title = data.message.title[0];
            const authors = data.message.author.map(author => author.given + ' ' + author.family).join(', ');
            const journal = data.message['container-title'][0];
            const year = data.message.issued['date-parts'][0][0];

            // Create the APA citation
            const apaCitation = `${authors} (${year}). ${title}. ${journal}. <a href="https://doi.org/${doi}" target="_blank">Link</a>`;

            // Display the APA citation (you can modify this based on your layout)
            const publicationsDiv = document.getElementById('publications');
            const citationDiv = document.createElement('div');
            citationDiv.className = 'citation';
            citationDiv.innerHTML = `<p>${apaCitation}</p>`;
        
            publicationsDiv.appendChild(citationDiv);
        })
        .catch(error => {
            console.error('Error fetching DOI information:', error);
        });
}

// Show the default tab (Home) on page load
window.onload = function() {
    showTab('home');
};