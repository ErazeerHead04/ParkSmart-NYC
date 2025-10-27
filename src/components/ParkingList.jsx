import React from "react";

const ParkingList = ({ parkingData }) => {
  return (
    <div className="parking-list-container">
      <h3>Available Parking Spots ({parkingData.length})</h3>
      <ul className="parking-list">
        {parkingData.slice(0, 15).map((spot) => (
          <li key={spot.id}>
            📍 {spot.tags.name || "Unnamed Parking"} —{" "}
            {spot.tags.parking || "Type unknown"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParkingList;
