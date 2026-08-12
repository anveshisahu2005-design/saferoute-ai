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
        radius: 40,
        blur: 25,
        maxZoom: 10,
        gradient: {
            0.2: '#00ff00', // Green - Safe
            0.5: '#ffff00', // Yellow - Moderate Risk
            0.8: '#ff0000', // Red - High Risk
            1.0: '#8b0000'  // Dark Red - Danger
        }
    }).addTo(map);
});
