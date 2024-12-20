let pickupPlaceId = null;
let destinationPlaceId = null;

function initializePlacesAutocomplete() {
    const pickupInput = document.getElementById('pickup');
    const destinationInput = document.getElementById('destination');

    const pickupAutocomplete = new google.maps.places.Autocomplete(pickupInput, {
        types: ['geocode', 'establishment'],
        componentRestrictions: { country: 'pt' }
    });

    pickupAutocomplete.addListener('place_changed', function () {
        const pickupPlace = pickupAutocomplete.getPlace();
        pickupPlaceId = pickupPlace.place_id; // Save the Place ID
        console.log('Pickup Place ID:', pickupPlaceId);

        checkAndCalculateDistance(); // Single function call
    });

    const destinationAutocomplete = new google.maps.places.Autocomplete(destinationInput, {
        types: ['geocode', 'establishment'],
        componentRestrictions: { country: 'pt' }
    });

    destinationAutocomplete.addListener('place_changed', function () {
        const destinationPlace = destinationAutocomplete.getPlace();
        destinationPlaceId = destinationPlace.place_id; // Save the Place ID
        console.log('Destination Place ID:', destinationPlaceId);

        checkAndCalculateDistance(); // Single function call
    });
}

function checkAndCalculateDistance() {
    if (pickupPlaceId && destinationPlaceId) {
        calculateDistance(pickupPlaceId, destinationPlaceId); // Call function from distance.js
    }
}



// Ensure this runs only after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializePlacesAutocomplete);
window.initializePlacesAutocomplete = initializePlacesAutocomplete;
