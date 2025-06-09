import { useEffect, useState } from 'react';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function App() {
  const [coOrd, setCoOrd] = useState({ latitude: 17.385, longitude: 78.4867 });

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoOrd({ latitude, longitude });
      },
      (err) => console.error(err),
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div>
      <p>Your location is being updated every second using watchPosition</p>
      <b>Your coordinates: {coOrd.latitude}, {coOrd.longitude}</b>

      <br /><br />
      <b>Your map location:</b>
      <br />

      <MapContainer center={[coOrd.latitude, coOrd.longitude]} zoom={13} style={{ height: "500px" , width:"800px" }}>
        <TileLayer
          url={`https://maps.geoapify.com/v1/tile/osm-carto/{z}/{x}/{y}.png?apiKey=653f6e0339ea463ab3d6ec6a1cdca608`}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <Marker position={[coOrd.latitude, coOrd.longitude]}>
          <Popup>You are here</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default App;
