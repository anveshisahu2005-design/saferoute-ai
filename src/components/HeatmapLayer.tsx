'use client';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { mockSafetyHeatmap } from '../data/mockSafetyData';

export default function HeatmapLayer() {
  const map = useMap();

  useEffect(() => {
    // Dynamically import leaflet.heat client-side only
    require('leaflet.heat');
    
    // @ts-ignore
    const heatLayer = L.heatLayer(mockSafetyHeatmap, {
      radius: 40,
      blur: 25,
      maxZoom: 10,
      gradient: {
        0.2: '#00ff00', // Green - Safe
        0.5: '#ffff00', // Yellow - Moderate Risk
        0.8: '#ff0000', // Red - High Risk
        1.0: '#8b0000'  // Dark Red - Danger
      }
    });

    heatLayer.addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map]);

  return null;
}
