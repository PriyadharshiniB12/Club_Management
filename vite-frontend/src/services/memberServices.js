// src/services/memberServices.jsx
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/members';

export const getAllMembers = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createMember = async (member) => {
  const res = await axios.post(API_URL, member);
  return res.data;
};

export const updateMember = async (id, updatedData) => {
  const res = await axios.put(`${API_URL}/${id}`, updatedData);
  return res.data;
};

export const deleteMember = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};

