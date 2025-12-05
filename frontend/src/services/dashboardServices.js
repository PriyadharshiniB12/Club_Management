import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/dashboard';

export const fetchDashboardStats = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
};
