import axios from 'axios';

const BASE_URL = "http://localhost:5000/api/monitoring";

export const fetchFrequentAbsentees = async () => {
  const response = await axios.get(`${BASE_URL}/frequent-absentees`);
  return response.data;
};
