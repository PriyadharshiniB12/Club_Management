import axios from "axios";

const API_URL = "http://localhost:5000/api/buses"; // Change port if needed

export const fetchBuses = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addBus = async (busData) => {
  const res = await axios.post(`${API_URL}/add`, busData);
  return res.data;
};

export const deleteBus = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
