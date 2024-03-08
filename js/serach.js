    
function filterAndAutocomplete() {
    filterItems();
    autocomplete();
}

// Get reference to the search button
const searchButton = document.getElementById('searchButton');

// Add click event listener to the search button
searchButton.addEventListener('click', function() {
    filterAndAutocomplete();
});


function filterItems() {
    // Declare variables
    var input, filter, items, i, txtValue, foundMatch;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    items = document.querySelectorAll('.Text-Item'); // Selecting elements with the class "text-item"
    const noMatchMessage = document.getElementById("noMatchMessage");

    // Loop through all items, and hide those that don't match the search query
    for (i = 0; i < items.length; i++) {
        txtValue = items[i].textContent || items[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            items[i].style.display = ""; // Show item
            foundMatch = true;
        } else {
            items[i].style.display = "none"; // Hide item
        }
    }

    // Display a message if no matches are found
    if (!foundMatch) {
        noMatchMessage.textContent = "No matching Content found.";
        noMatchMessage.style.display = "block";
    } else {
        noMatchMessage.style.display = "none";
    }
}


function autocomplete() {
    const autocompleteInput = document.getElementById("searchInput");
    const resultsHTML = document.getElementById("results");
    const data = ["what we do",
                "services", 
                "our story", 
                "our latest projects", 
                "why choose us", 
                "some facts about us", 
                "customer reviews",
                "checkout page",
                "product page",
                "cart page"];

    let results = [];
    const userInput = autocompleteInput.value;
    resultsHTML.innerHTML = "";

    if (userInput.length > 0) {
        results = getResults(userInput);
        resultsHTML.style.display = "block";
        for (let i = 0; i < results.length; i++) {
            resultsHTML.innerHTML += "<p>" + results[i] + "</p>";
        }
    }

    function getResults(input) {
        const results = [];
        for (let i = 0; i < data.length; i++) {
            if (input === data[i].slice(0, input.length)) {
                results.push(data[i]);
            }
        }
        return results;
    }

    resultsHTML.onclick = function (event) {
        const setValue = event.target.innerText;
        autocompleteInput.value = setValue;
        this.innerHTML = "";

        // Add logic to redirect to the corresponding page based on the search result
        switch(setValue) {
            case 'checkout page':
                window.location.href = 'checkout.html';
                break;
            case 'product page':
                window.location.href = 'product.html';
                break;
            case 'cart page':
                window.location.href = 'cart.html';
                break;
            // Add more cases for other search results
            default:
                break;
        }
    };
}


