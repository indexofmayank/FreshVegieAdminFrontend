import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Polygon, DrawingManager } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 19.079638510059272, // Example latitude
  lng: 72.90870867662348,  // Example longitude
};

const GeoFancingPolygon = ({ onPolygonComplete }) => {
  const [polygons, setPolygons] = useState([]);

  const handlePolygonComplete = useCallback((polygon) => {
    const path = polygon.getPath().getArray().map(latLng => ({
      lat: latLng.lat(),
      lng: latLng.lng(),
    }));
    setPolygons([...polygons, path]);
    onPolygonComplete(path);
    polygon.setMap(null); // Remove the polygon from the drawing manager
  }, [polygons, onPolygonComplete]);

  const handleLoad = (map) => {
    const drawingManagerOptions = {
      drawingControl: true,
      drawingControlOptions: {
        position: window.google.maps.ControlPosition.TOP_CENTER,
        drawingModes: ['polygon'],
      },
    };

    const drawingManager = new window.google.maps.drawing.DrawingManager(drawingManagerOptions);
    drawingManager.setMap(map);

    window.google.maps.event.addListener(drawingManager, 'polygoncomplete', handlePolygonComplete);
  };

  const isPointInPolygon = (latLng, polygon) => {
    const googlePolygon = new window.google.maps.Polygon({ paths: polygon });
    return window.google.maps.geometry.poly.containsLocation(latLng, googlePolygon);
  };

  // Example usage
  const checkPoint = { lat: 79.070062970612454, lng: 72.8427992642967 }; // Replace with the point you want to check
  const isInside = polygons.some(polygon => isPointInPolygon(new window.google.maps.LatLng(checkPoint.lat, checkPoint.lng), polygon));

  console.log('Is the point inside any polygon?', isInside);

  return (
    <LoadScript googleMapsApiKey="AIzaSyChe49SyZJZYPXiyZEey4mvgqxO1lagIqQ" libraries={['drawing', 'geometry']}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={handleLoad}
      >
        {polygons.map((polygon, index) => (
          <Polygon key={index} paths={polygon} options={{ fillColor: '#FF0000', fillOpacity: 0.5 }} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default GeoFancingPolygon;
