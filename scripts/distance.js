function calculateDistance(pickupPlaceId, destinationPlaceId) {
    const service = new google.maps.DistanceMatrixService();

    service.getDistanceMatrix(
        {
            origins: [{ placeId: pickupPlaceId }],
            destinations: [{ placeId: destinationPlaceId }],
            travelMode: google.maps.TravelMode.DRIVING,
        },
        function (response, status) {
            if (status === google.maps.DistanceMatrixStatus.OK) {
                const result = response.rows[0].elements[0];
                const distanceInMeters = result.distance.value; // Distance in meters

                // Duration in seconds
                const durationInSeconds = result.duration.value;
                const durationText = result.duration.text; // Human-readable duration (e.g., "15 mins")

                //console.log('Duration:', durationInSeconds, 'seconds');
                //console.log('Duration (text):', durationText);


                // Update the price using the distance
                updateSummary(distanceInMeters);

                // Call the updateOxygenPrice function
                updateOxygenPrice(durationInSeconds);
            } else {
                console.error("Distance Matrix API error:", status);
            }
        }
    );
}


// Function to update the price of oxygen therapy
function updateOxygenPrice(durationInSeconds) {
    let price;

    if (durationInSeconds <= 1800) {
        // Less than or equal to 30 minutes
        price = 30;
    } else {
        // More than 30 minutes, calculate price as 1 EUR per minute
        const durationInMinutes = Math.ceil(durationInSeconds / 60); // Round up to nearest minute
        price = durationInMinutes;
    }

    // Update the price in the DOM
    const oxygenSection = document.querySelector('[data-extra="oxigenoterapia"] .text h3');
    oxygenSection.innerHTML = `Oxigenoterapia + €${price},00`;

    console.log(`Updated oxygen price: €${price}`);
}


