import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const parkingIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

export default function MapView({ coords, parkingData }) {
  const [userLocation, setUserLocation] = useState(null);
  const mapRef = useRef();

  // ✅ Detect user’s actual GPS location
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation({ lat: latitude, lon: longitude });
      },
      (err) => console.warn("Location unavailable:", err),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  // ✅ When coords (search result) changes, re-center the map
  useEffect(() => {
    if (mapRef.current && coords.lat && coords.lon) {
      mapRef.current.setView([coords.lat, coords.lon], 13);
    }
  }, [coords]);

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
      <div
        style={{
          width: "80vw",
          height: "70vh",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
        }}
      >
        <MapContainer
          center={[coords.lat, coords.lon]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />

          {/* ✅ Show your real GPS-based location */}
          {userLocation && (
            <Marker position={[userLocation.lat, userLocation.lon]} icon={userIcon}>
              <Popup>Your current location 📍</Popup>
            </Marker>
          )}

          {/* ✅ Show parking markers for searched area */}
          {parkingData.map((spot) => {
            const lat = spot.lat || (spot.center && spot.center.lat);
            const lon = spot.lon || (spot.center && spot.center.lon);
            if (!lat || !lon) return null;

            const cost =
              spot.tags?.fee === "yes"
                ? "Paid"
                : spot.tags?.fee === "no"
                ? "Free"
                : "Unknown";
            const type = spot.tags?.parking || "unknown";

            return (
              <Marker key={spot.id} position={[lat, lon]} icon={parkingIcon}>
                <Popup>
                  <b>{spot.tags.name || "Unnamed Parking"}</b>
                  <br />
                  Type: {type}
                  <br />
                  Cost: {cost}
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}
