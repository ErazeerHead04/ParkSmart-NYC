import React, { useState } from "react";
import MapView from "./components/MapView";
import ParkingList from "./components/ParkingList";
import SearchBar from "./components/SearchBar";
import { geocodeCity } from "./utils/geocode";

export default function App() {
  const [city, setCity] = useState("");
  const [coords, setCoords] = useState({ lat: 40.7128, lon: -74.006 }); // default NYC
  const [parkingData, setParkingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchParking(lat, lon) {
    const overpassQuery = `
      [out:json][timeout:30];
      (
        node["amenity"="parking"](around:3000,${lat},${lon});
        way["amenity"="parking"](around:3000,${lat},${lon});
        relation["amenity"="parking"](around:3000,${lat},${lon});
      );
      out center;
    `;

    try {
      const res = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: overpassQuery,
      });

      if (!res.ok) throw new Error("Overpass API error");

      const json = await res.json();
      return json.elements || [];
    } catch (err) {
      console.warn("Parking fetch failed, retrying once...");
      // Retry with a smaller radius
      const retryQuery = `
        [out:json][timeout:30];
        (
          node["amenity"="parking"](around:1500,${lat},${lon});
          way["amenity"="parking"](around:1500,${lat},${lon});
        );
        out center;
      `;
      const res2 = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: retryQuery,
      });
      const json2 = await res2.json();
      return json2.elements || [];
    }
  }

  async function handleSearch() {
    if (!city.trim()) return;
    setLoading(true);
    setError("");
    try {
      const { lat, lon } = await geocodeCity(city);
      setCoords({ lat, lon });
      const data = await fetchParking(lat, lon);
      setParkingData(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load parking data. Try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="App">
      <h1>🅿️ ParkSmart NYC</h1>
      <SearchBar city={city} onCityChange={setCity} onSearch={handleSearch} />
      {loading && <div className="loading">Loading nearby parking spots...</div>}
      {error && <div className="error">{error}</div>}
      {!loading && !error && (
        <>
          <MapView coords={coords} parkingData={parkingData} />
          <ParkingList parkingData={parkingData} />
        </>
      )}
    </div>
  );
}
