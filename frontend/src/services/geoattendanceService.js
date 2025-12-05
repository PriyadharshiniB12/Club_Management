const API_BASE_URL = "http://localhost:5000/api";

export const markAttendance = async (studentId, eventId, userLat, userLng, eventLat, eventLng) => {
  try {
    const response = await fetch(`${API_BASE_URL}/attendance/mark`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentId,
        eventId,
        userLat,
        userLng,
        eventLat,
        eventLng,
      }),
    });

    return response.json();
  } catch (error) {
    console.error("❌ Error in markAttendance:", error);
    throw error;
  }
};
