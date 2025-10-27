# 🅿️ ParkSmart NYC

## Problem Statement
Finding parking in New York City is often frustrating, especially when you’re unsure where parking spaces are located, whether they’re free, and how far they are from your destination.  
Traditional maps don’t focus on parking availability, and constantly circling blocks wastes time, money, and fuel.  

## Solution
**ParkSmart NYC** helps users quickly locate nearby parking spaces anywhere in the city.  
The app fetches live parking location data using the OpenStreetMap (Overpass) API and displays it on an interactive map. Users can:
- Search for any neighborhood or borough in NYC (e.g., *Brooklyn*, *Manhattan*, *Queens*),
- Instantly view available parking spaces in that area,
- See their **real current location** on the same map for easy comparison.

The app provides a practical, visual solution to a daily urban problem — finding convenient and affordable parking spots.

## API Used
- **API Name:** OpenStreetMap Overpass API  
- **API Documentation:** [https://wiki.openstreetmap.org/wiki/Overpass_API](https://wiki.openstreetmap.org/wiki/Overpass_API)  
- **How it's used:**  
  The Overpass API is queried with `amenity=parking` tags to fetch available parking spots (nodes, ways, and relations). The app filters and displays them on the map within a 3 km radius around the searched location.  

Additionally:
- **Geocoding:** Nominatim API (part of OpenStreetMap)  
  Used to convert the searched city or neighborhood name (e.g., “Brooklyn”) into latitude and longitude coordinates for the map center.

## Features
- 🗺️ **Interactive Map** – Built with React Leaflet to visualize real parking spots dynamically.  
- 📍 **Real User Location** – Uses your device’s GPS to display where you are on the map.  
- 🔎 **Search Any NYC Area** – Enter boroughs or neighborhoods to view all parking spaces nearby.  
- 💡 **Parking Info Popups** – Each marker shows name, type, and cost (free/paid).  
- 🧭 **Auto-Center Map** – The map intelligently adjusts to focus on the searched area.

## Setup Instructions
1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/parksmart-nyc.git
   ```
2. Navigate to the project directory:
   ```bash
   cd parksmart-nyc
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and go to:
   [http://localhost:5173](http://localhost:5173)

*(No API key setup needed — all APIs used are open and public.)*


## Challenges

During setup, I initially followed the instructions to create files using the standard .js extension (e.g., App.js, MapView.js, etc.).
However, Vite threw multiple syntax errors, stating:

```"If you are using JSX, make sure to name the file with the .jsx or .tsx extension."```

Despite configuring Vite and Babel correctly, Vite’s import analyzer consistently failed to parse JSX syntax inside .js files.

To fix this:

- I renamed all component files to .jsx (App.jsx, MapView.jsx, ParkingList.jsx, etc.).

- I updated all imports accordingly.

After switching to .jsx, everything worked flawlessly — no more import or transform errors.

This challenge helped me understand that Vite’s parser is stricter about JSX file extensions than Create React App, and that explicit .jsx extensions prevent unexpected compile issues.

## AI Assistance
I used **ChatGPT (GPT-5)** to help with:
- **Debugging Overpass API Integration:** Learned how to properly construct bounding box and radius queries to fetch all NYC parking nodes.  
- **React Leaflet Map Setup:** Modified the map rendering logic to handle user geolocation separately from search results.  
- **UI Layout Improvements:** Adjusted map centering, styling, and responsive sizing for a cleaner layout.  

These suggestions helped refine the logic and improve app stability while keeping the project lightweight and understandable.

## Screenshot

Here’s a preview of the current UI:

![App Screenshot](Output%20Image.png)


## Future Improvements
- Add route and distance calculation between user location and parking spots.    
- Implement local caching to speed up repeated searches.  
- Make the UI fully mobile-responsive for use while driving.  
