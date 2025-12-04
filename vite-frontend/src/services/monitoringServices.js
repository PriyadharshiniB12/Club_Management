import axios from 'axios';

export const fetchFrequentAbsentees = async () => {
  const response = await axios.get('/api/monitoring/frequent-absentees');
  return response.data;
};
