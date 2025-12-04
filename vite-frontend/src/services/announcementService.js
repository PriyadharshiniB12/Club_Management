import axios from 'axios';

const API_URL = 'http://localhost:5000/api/announcements';

// Fetch all announcements
export const fetchAnnouncements = async () => {
const res = await axios.get(API_URL);
return res.data;
};

// Create a new announcement
export const createAnnouncement = async (announcementData) => {
const res = await axios.post(API_URL, announcementData);
return res.data;
};

// Delete an announcement
export const deleteAnnouncement = async (id) => {
const res = await axios.delete(`${API_URL}/${id}`);
return res.data;
};

// Update an announcement
export const updateAnnouncement = async (id, announcementData) => {
const res = await axios.put(`${API_URL}/${id}`, announcementData);
return res.data;
};