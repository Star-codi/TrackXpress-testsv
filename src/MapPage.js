import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';

const MapPage = ({ customers }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [userPath, setUserPath] = useState([]);
  const [trackingActive, setTrackingActive] = useState(true);

  useEffect(() => {
    if (trackingActive) {
      const watchId = navigator.geolocation.watchPosition(
        position => {
          const { latitude, longitude } = position.coords;
          const location = { latitude, longitude };
          setUserLocation(location);
          setUserPath([...userPath, location]);
        },
        error => {
          console.log(error);
        }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    }
  }, [userPath, trackingActive]);

  const stopTracking = () => {
    setTrackingActive(false);
  };

  return (
    <div>
      <h1>Map</h1>
      <MapContainer center={[28.7041, 77.1025]} zoom={13} style={{ height: '500px' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="..."
        />

        {customers.map((customer, index) => (
          <Marker
            key={index}
            position={[customer.location.latitude, customer.location.longitude]}
          >
            <Popup>
              <div>
                <h2>{customer.name}</h2>
                <p>{customer.phoneNumber}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {userLocation && (
          <Marker position={[userLocation.latitude, userLocation.longitude]}>
            <Popup>
              <div>
                <h2>User Location</h2>
                <p>Latitude: {userLocation.latitude}</p>
                <p>Longitude: {userLocation.longitude}</p>
              </div>
            </Popup>
          </Marker>
        )}

        {userPath.length > 1 && (
          <Polyline positions={userPath.map(location => [location.latitude, location.longitude])} />
        )}
      </MapContainer>

      <button onClick={stopTracking}>Stop Tracking</button>
    </div>
  );
};

export default MapPage;
