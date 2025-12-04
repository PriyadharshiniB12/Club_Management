import React, { useState, useEffect } from "react";

const GeoAttendance = () => {
  const [location, setLocation] = useState(null);
  const [attendance, setAttendance] = useState("Checking...");

  // Define Club Location (Latitude, Longitude)
  const clubLatitude = 12.9716;  // Change this to your club's actual latitude
  const clubLongitude = 77.5946; // Change this to your club's actual longitude
  const radius = 500; // 500 meters geofence range

  // Function to get user's current location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });

          // Calculate distance from club location
          const distance = getDistanceFromLatLonInMeters(latitude, longitude, clubLatitude, clubLongitude);

          // Check if inside geofence
          if (distance <= radius) {
            setAttendance("Present ✅");
          } else {
            setAttendance("Absent ❌");
          }
        },
        (error) => {
          setAttendance("Location access denied ❌");
        }
      );
    } else {
      setAttendance("Geolocation not supported ❌");
    }
  }, []);

  // Function to calculate distance between two coordinates
  function getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
    const R = 6371000; // Radius of Earth in meters
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in meters
  }

  return (
    <div>
      <h2>📍 Geofencing Attendance</h2>
      <p>Location: {location ? `${location.latitude}, ${location.longitude}` : "Fetching..."}</p>
      <h3>Attendance Status: {attendance}</h3>
    </div>
  );
};

export default GeoAttendance;
