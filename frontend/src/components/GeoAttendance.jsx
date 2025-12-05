import React, { useState, useEffect } from "react";
import { markAttendance } from "../services/geoattendanceService";

const GeoAttendance = () => {
  const [location, setLocation] = useState(null);
  const [attendanceStatus, setAttendanceStatus] = useState("Checking...");
  const [backendMsg, setBackendMsg] = useState("");

  // TEMP: replace with actual logged-in student
  const studentId = "673a9e983bcf00b012345678";   
  const eventId = "673a9e983bcf00b012349999";    

  // Event (Club) Location — change to real coordinates
  const eventLat = 12.9716;
  const eventLng = 77.5946;
  const radius = 500; // meters

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setAttendanceStatus("Geolocation not supported ❌");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        setLocation({ latitude, longitude });

        // Calculate distance
        const distance = getDistance(latitude, longitude, eventLat, eventLng);

        let finalStatus = distance <= radius ? "Present" : "Absent";
        setAttendanceStatus(finalStatus);

        // Call backend API
        try {
          const response = await markAttendance(
            studentId,
            eventId,
            latitude,
            longitude,
            eventLat,
            eventLng
          );

          if (response.success) {
            setBackendMsg(`✔ ${response.message}`);
          } else {
            setBackendMsg(`⚠ ${response.message}`);
          }
        } catch (error) {
          setBackendMsg("❌ Server Error: Could not mark attendance");
        }
      },
      () => {
        setAttendanceStatus("Location access denied ❌");
      }
    );
  }, []);

  // Distance formula
  function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371000;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>📍 Geo-Attendance</h2>

      <p>
        <strong>Your Location:</strong>{" "}
        {location ? `${location.latitude}, ${location.longitude}` : "Fetching..."}
      </p>

      <h3>Attendance Status: {attendanceStatus}</h3>

      <p style={{ marginTop: "10px", color: "green" }}>{backendMsg}</p>
    </div>
  );
};

export default GeoAttendance;

