// geoattendanceService.js
const API_BASE_URL = "http://localhost:5000/api";

export const markAttendance = async (studentId, latitude, longitude, attendance) => {
  try {
    const response = await fetch(`${API_BASE_URL}/attendance/mark`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentId,
        latitude,
        longitude,
        attendance,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ Error in markAttendance:", error);
    throw error;
  }
};
