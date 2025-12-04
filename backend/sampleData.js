// sampleData.js

// --------- SAMPLE MEMBERS (50) ----------
const sampleMembers = Array.from({ length: 50 }).map((_, i) => ({
  name: `Student ${i + 1}`,
  rollNumber: `CS${String(i + 1).padStart(3, "0")}`, // CS001, CS002...
  email: `student${i + 1}@gmail.com`,
  phone: `98765${String(10000 + i)}`,
  department: "CSE",
  year: ["I", "II", "III", "IV"][i % 4],
  role: i % 10 === 0 ? "admin" : "member"
}));


// ---------- SAMPLE EVENTS (20) ----------
const sampleEvents = Array.from({ length: 20 }).map((_, i) => ({
  title: `Club Event ${i + 1}`,
  description: `This is the description for Event ${i + 1}`,
  date: new Date(2025, 0, i + 1),
  venue: ["Auditorium", "Seminar Hall", "Lab 1", "Lab 2"][i % 4]
}));


// -------- SAMPLE ANNOUNCEMENTS (10) ---------
const sampleAnnouncements = Array.from({ length: 10 }).map((_, i) => ({
  title: `Announcement ${i + 1}`,
  message: `This is announcement message number ${i + 1}`,
  createdAt: new Date()
}));


module.exports = {
  sampleMembers,
  sampleEvents,
  sampleAnnouncements
};
