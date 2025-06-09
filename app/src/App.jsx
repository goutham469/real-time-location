import { useEffect, useState } from 'react';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import router from './router';
import {RouterProvider} from 'react-router-dom'

function App() {
  

  return (
    <div >
      <RouterProvider router={router} ></RouterProvider>
    </div>
  );
}

export default App;
