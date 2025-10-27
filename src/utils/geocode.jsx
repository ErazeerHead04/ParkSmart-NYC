export async function geocodeCity(cityName) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${cityName}`
    );
    const data = await res.json();
    if (data.length > 0) {
      return { lat: data[0].lat, lon: data[0].lon };
    } else {
      throw new Error("City not found");
    }
  } catch (error) {
    console.error("Geocoding error:", error);
    throw error;
  }
}
