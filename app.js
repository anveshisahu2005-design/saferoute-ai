document.addEventListener('DOMContentLoaded', () => {
    // Initialize Map centered on Uttar Pradesh (Lucknow)
    const map = L.map('map').setView([26.8467, 80.9462], 7);

    // Premium Dark Mode Tiles from CartoDB
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);

    // Mock Safety Heatmap Data
    // Format: [latitude, longitude, intensity (0 to 1)]
    const heatData = [
        // High Risk Zones (Red) around Lucknow
        [26.85, 80.95, 1.0],
        [26.84, 80.93, 0.9],
        [26.86, 80.92, 0.85],
        [26.82, 80.96, 0.95],
        
        // Moderate Risk Zones (Yellow)
        [26.845, 80.94, 0.6],
        [26.855, 80.945, 0.5],
        [26.83, 80.955, 0.65],
        
        // Safe Zones (Green)
        [26.835, 80.935, 0.2],
        [26.865, 80.955, 0.1],
        [26.848, 80.948, 0.3],
        
        // Broader UP points
        [26.4499, 80.3319, 0.8], // Kanpur
        [25.4358, 81.8463, 0.7], // Prayagraj
        [27.1767, 78.0081, 0.9], // Agra
        [28.6139, 77.2090, 0.95], // Noida
        [25.3176, 82.9739, 0.6]   // Varanasi
    ];

    // Add Heatmap Layer
    const heat = L.heatLayer(heatData, {
        radius: 25, // Optimized for less lag
        blur: 15,   // Optimized for less lag
        maxZoom: 12,
        gradient: {
            0.2: '#00ff00', // Green - Safe
            0.5: '#ffff00', // Yellow - Moderate Risk
            0.8: '#ff0000', // Red - High Risk
            1.0: '#8b0000'  // Dark Red - Danger
        }
    }).addTo(map);

    // Mock Routing and Prediction Logic
    const findRouteBtn = document.getElementById('findRouteBtn');
    const predictionResult = document.getElementById('predictionResult');
    const safetyScore = document.getElementById('safetyScore');
    const safetyDetails = document.getElementById('safetyDetails');
    let currentRoute = null;

    findRouteBtn.addEventListener('click', () => {
        const originVal = document.getElementById('origin').value || 'Lucknow';
        const destVal = document.getElementById('destination').value || 'Kanpur';

        findRouteBtn.textContent = 'Analyzing Route...';
        findRouteBtn.style.opacity = '0.7';

        // Simulate network delay for AI prediction
        setTimeout(() => {
            // Remove old route if exists
            if (currentRoute) map.removeLayer(currentRoute);

            // Mock route from Lucknow to Kanpur
            const latlngs = [
                [26.8467, 80.9462], // Lucknow
                [26.7500, 80.8000], 
                [26.6500, 80.6000],
                [26.5500, 80.4500],
                [26.4499, 80.3319]  // Kanpur
            ];

            // Draw polyline
            currentRoute = L.polyline(latlngs, {color: '#4facfe', weight: 5, opacity: 0.8}).addTo(map);
            
            // Zoom to route
            map.fitBounds(currentRoute.getBounds(), { padding: [50, 50] });

            // Display Prediction UI
            predictionResult.style.display = 'block';
            
            // Calculate a mock safety score based on the "heatData" collision
            // We'll simulate a 78% Safe score for this route
            safetyScore.textContent = '78% Safe';
            safetyScore.style.color = '#00ff00';
            safetyDetails.innerHTML = `
                <strong>Analysis:</strong> The AI detected moderate risk zones near the Kanpur outskirts. 
                <br><br>
                ✅ Route avoids major dark spots.<br>
                ⚠️ Suggest caution on Highway 27 after 10 PM.
            `;

            findRouteBtn.textContent = 'Find Safe Route';
            findRouteBtn.style.opacity = '1';
        }, 1500);
    });

    // Safety Tips Rotation Logic
    const tips = [
        "Always share your live location with a trusted contact when traveling late.",
        "Stay in well-lit areas and avoid taking shortcuts through dark alleys.",
        "Keep your phone charged and easily accessible at all times.",
        "If you feel you are being followed, change direction and head to a crowded area like a store or cafe.",
        "Trust your instincts. If a route feels unsafe, take an alternative path even if it takes longer.",
        "Avoid wearing headphones on empty streets so you can hear your surroundings.",
        "Keep emergency numbers (e.g., 1091 Women Helpline) on speed dial."
    ];

    const tipText = document.getElementById('tipText');
    const tipsBox = document.getElementById('tipsBox');
    let currentTipIndex = 0;

    setInterval(() => {
        // Fade out animation
        tipsBox.style.opacity = '0';
        
        setTimeout(() => {
            // Change text while invisible
            currentTipIndex = (currentTipIndex + 1) % tips.length;
            tipText.textContent = tips[currentTipIndex];
            // Fade in animation
            tipsBox.style.opacity = '1';
        }, 500); // Wait for fade out to complete
    }, 8000); // Rotate every 8 seconds
});
