// Define debounce function
function debounce(func, delay) {
    let debounceTimer;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
}
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    const dropdowns = document.querySelectorAll('.dropdown-container .sBtn-text');
    const amenitiesCheckboxes = document.querySelectorAll('.check-container:nth-child(13) .form-check-input');
    const optionsCheckboxes = document.querySelectorAll('.check-container:nth-child(15) .form-check-input');
    const areaSlider = document.querySelector('.area-slider');
    const priceSlider = document.querySelector('.price-slider');
    const searchButton = document.querySelector('.btnSearch');
    const properties = document.querySelectorAll('.cardItems');
    const noMatchMessage = document.querySelector('.no-match-message');

    function filterProperties() {
        let matchCount = 0;

        const status = dropdowns[0].textContent.trim();
        const location = dropdowns[1].textContent.trim();
        const type = dropdowns[2].textContent.trim();
        const style = dropdowns[3].textContent.trim();
        const rooms = dropdowns[4].textContent.trim();
        const bedrooms = dropdowns[5].textContent.trim();
        const bathrooms = dropdowns[6].textContent.trim();
        const parking = dropdowns[7].textContent.trim();
        const area = parseInt(areaSlider.value);
        const price = parseInt(priceSlider.value);
        const selectedAmenities = [...amenitiesCheckboxes].filter(cb => cb.checked).map(cb => cb.parentElement.textContent.trim());
        const selectedOptions = [...optionsCheckboxes].filter(cb => cb.checked).map(cb => cb.parentElement.textContent.trim());

        properties.forEach(property => {
            const propertyStatus = property.getAttribute('data-status');
            const propertyLocation = property.getAttribute('data-location');
            const propertyType = property.getAttribute('data-type');
            const propertyStyle = property.getAttribute('data-style');
            const propertyRooms = parseInt(property.getAttribute('data-rooms'));
            const propertyBedrooms = parseInt(property.getAttribute('data-bedrooms'));
            const propertyBathrooms = parseInt(property.getAttribute('data-bathrooms'));
            const propertyParking = parseInt(property.getAttribute('data-parking'));
            const propertyArea = parseInt(property.getAttribute('data-area'));
            const propertyPrice = parseInt(property.getAttribute('data-price'));
            const propertyAmenities = property.getAttribute('data-amenities').split(',').map(a => a.trim());
            const propertyOptions = property.getAttribute('data-options').split(',').map(o => o.trim());

            if (
                (status !== 'Property Status' && propertyStatus !== status) ||
                (location !== 'Property Location' && propertyLocation !== location) ||
                (type !== 'Property Type' && propertyType !== type) ||
                (style !== 'Property Style' && propertyStyle !== style) ||
                (rooms !== 'Total Rooms' && (rooms.includes('5 or More') ? propertyRooms >= 5 : propertyRooms === parseInt(rooms.match(/\d+/)))) ||
                (bedrooms !== 'Bedrooms' && (bedrooms.includes('5 or More') ? propertyBedrooms >= 5 : propertyBedrooms === parseInt(bedrooms.match(/\d+/)))) ||
                (bathrooms !== 'Bathrooms' && (bathrooms.includes('5 or More') ? propertyBathrooms >= 5 : propertyBathrooms === parseInt(bathrooms.match(/\d+/)))) ||
                (parking !== 'Car Parking' && (parking.includes('5 or More') ? propertyParking >= 5 : propertyParking === parseInt(parking.match(/\d+/)))) ||
                propertyArea <= area || propertyPrice <= price ||
                (selectedAmenities.length > 0 && !selectedAmenities.every(a => propertyAmenities.includes(a))) ||
                (selectedOptions.length > 0 && !selectedOptions.every(o => propertyOptions.includes(o)))
            ) {
                property.style.display = 'none';
            } else {
                property.style.display = 'block';
                matchCount++;
            }
        });

        updateMatchMessage(matchCount);
    }

    function updateMatchMessage(count) {
        if (count === 0) {
            noMatchMessage.style.display = 'block';
        } else {
            noMatchMessage.style.display = 'none';
        }
    }

    function validateSliderValue(value) {
        return !isNaN(value) && value >= 0; 
    }

    searchInput.addEventListener('input', debounce(filterProperties, 300));

    dropdowns.forEach(dropdown => {
        dropdown.parentElement.addEventListener('input', debounce(filterProperties, 300));
    });

    amenitiesCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', debounce(filterProperties, 300));
    });

    optionsCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', debounce(filterProperties, 300));
    });

    areaSlider.addEventListener('input', debounce(filterProperties, 300));
    priceSlider.addEventListener('input', debounce(filterProperties, 300));

    searchButton.addEventListener('click', filterProperties);
});





