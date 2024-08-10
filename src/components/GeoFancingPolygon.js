import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useLoadScript, DrawingManager, Circle } from '@react-google-maps/api';

const libraries = ['drawing', 'geometry', 'places'];
const mapContainerStyle = {
  width: '60vw',
  height: '50vh',
};

const options = {
  drawingControl: true,
  drawingControlOptions: {
    position: window.google?.maps?.ControlPosition.TOP_CENTER,
    drawingModes: ['circle'],
  },
  circleOptions: {
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    strokeWeight: 2,
    clickable: true,
    draggable: true,  // Allow the circle to be draggable
    editable: true,
    zIndex: 1,
  },
};

const GeoFencingPolygon = () => {
  const [selectedCircle, setSelectedCircle] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyChe49SyZJZYPXiyZEey4mvgqxO1lagIqQ', // Replace with your actual API key
    libraries,
  });

  const onCircleComplete = useCallback((circle) => {
    if (selectedCircle) {
      // Remove the previous circle if one already exists
      selectedCircle.setMap(null);
    }

    setSelectedCircle(circle);

    // Extract circle data
    const circleData = {
      center: {
        lat: circle.getCenter().lat(),
        lng: circle.getCenter().lng(),
      },
      radius: circle.getRadius(),
    };

    // Log the circle data
    console.log('Circle Data:', circleData);

    // Here you can also store `circleData` in your database
    // e.g., make an API call to save the circle data
    // fetch('/api/save-circle', { method: 'POST', body: JSON.stringify(circleData) });

    // Disable further drawing after the first circle is drawn
    circle.setOptions({
      draggable: true, // Enable dragging for the circle
      editable: true,
    });

  }, [selectedCircle]);

  useEffect(() => {
    if (selectedCircle && window.google?.maps) {
      const userLocation = new window.google.maps.LatLng(19.07006722752391, 72.84356385459118); // Replace with actual user location
      const isInside = window.google.maps.geometry.spherical.computeDistanceBetween(
        userLocation,
        selectedCircle.getCenter()
      ) <= selectedCircle.getRadius();

      if (isInside) {
        console.log('User is inside the geofence');
      } else {
        console.log('User is outside the geofence');
      }
    }
  }, [selectedCircle]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <GoogleMap
      id="map"
      mapContainerStyle={mapContainerStyle}
      zoom={8}
      center={{ lat: 19.455666328809723, lng: 72.81736910574212 }}
    >
      <DrawingManager
        options={options}
        onCircleComplete={onCircleComplete}
      />
    </GoogleMap>
  );
};

export default GeoFencingPolygon;
