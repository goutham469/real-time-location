import React , {useState , useEffect} from 'react'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SERVER_URL);

function Details() {
    const [coOrd, setCoOrd] = useState({ latitude: 17.385, longitude: 78.4867 });
    const [others , setOthers] = useState([])

    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            setCoOrd({ latitude, longitude });
            const obj = { latitude:latitude, longitude:longitude , username:localStorage.getItem("username") }
            socket.emit("update-location" , obj );
        },
        (err) => console.error(err),
        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 5000,
        }
        );

        socket.on("locations" , (data) => {
          setOthers(data)
        })

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

  return (
    <div>
        <p>Your location is being updated every second using watchPosition</p>
          <b>Your coordinates: {coOrd.latitude}, {coOrd.longitude}</b>
    
          <br /><br />
          <b>Your map location:</b>
          <br />
    
          <MapContainer center={[coOrd.latitude, coOrd.longitude]} zoom={7} style={{ height: "70vh" , width:"100%" }}>
            <TileLayer
              url={`https://maps.geoapify.com/v1/tile/osm-carto/{z}/{x}/{y}.png?apiKey=${import.meta.env.VITE_GEO_APIFY_KEY}`}
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            <Marker position={[coOrd.latitude, coOrd.longitude]}>
              <Popup>You are here</Popup>
            </Marker>

            {
              others.map( (user , idx) => 
              <Marker key={user.username} position={[user.latitude, user.longitude]}>
                <Popup>User {idx + 1}</Popup>
              </Marker>
           )
            }

          </MapContainer>
    </div>
  )
}

export default Details