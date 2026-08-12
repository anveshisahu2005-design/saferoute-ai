// src/data/mockSafetyData.ts
// Format: [latitude, longitude, intensity (0 to 1)]
// High intensity (closer to 1) = Danger
// Low intensity (closer to 0) = Safe

export const mockSafetyHeatmap: [number, number, number][] = [
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
  
  // Broader UP points for visual effect
  [26.4499, 80.3319, 0.8], // Kanpur (High Risk area simulated)
  [25.4358, 81.8463, 0.7], // Prayagraj
  [27.1767, 78.0081, 0.9], // Agra
  [28.6139, 77.2090, 0.95], // Noida
  [25.3176, 82.9739, 0.6],  // Varanasi
];
