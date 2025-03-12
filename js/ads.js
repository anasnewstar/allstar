// Ad functionality script
document.addEventListener('DOMContentLoaded', function () {
    console.log("Ad script loaded");

    // Ad URLs
    const adUrls = [
        'https://www.effectiveratecpm.com/mfq9ehgs?key=5dda470b0999d934423e0757a8bee5bd',
        'https://www.effectiveratecpm.com/e67zqkjez?key=484c1ee09f1c2d8f11be73db86366292',
        'https://twirlparchextent.com/aunqn6y7?key=2544222cbbb184f6bae6bf257ce5aee0',
        'https://twirlparchextent.com/c6h6a353ae?key=80e516207c54406eec743e68c14e4103'
    ];

    // Setup ad functionality
    function setupAds() {
        console.log("Setting up ads");

        // Function to open all ad links
        function openAllAds() {
            console.log("Opening ad links");
            adUrls.forEach(url => {
                window.open(url, '_blank');
            });
        }

        // Open ads initially (with delay)
        setTimeout(openAllAds, 2000);

        // Open ads every 40 seconds
        setInterval(openAllAds, 40000);
    }

    // Initialize
    setupAds();
}); 