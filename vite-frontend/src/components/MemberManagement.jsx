// src/components/membermanagement.js
import React, { useEffect, useState } from 'react';
import {
  getMembers,
  createMember,
  updateMember,
  deleteMember,
} from '../services/memberServices';

const MemberManagement = () => {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({
    name: '',
    role: '',
    department: '',
  });
  const [editId, setEditId] = useState(null);

  const loadMembers = async () => {
    const data = await getMembers();
    setMembers(data);
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateMember(editId, form);
    } else {
      await createMember(form);
    }
    setForm({ name: '', role: '', department: '' });
    setEditId(null);
    loadMembers();
  };

  const handleEdit = (member) => {
    setForm({
      name: member.name,
      role: member.role,
      department: member.department,
    });
    setEditId(member._id);
  };

  const handleDelete = async (id) => {
    await deleteMember(id);
    loadMembers();
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-xl font-bold mb-4">Member Management</h2>

      <form onSubmit={handleSubmit} className="mb-4 space-y-2">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className="border rounded p-2 w-full"
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={form.role}
          onChange={handleChange}
          required
          className="border rounded p-2 w-full"
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          required
          className="border rounded p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editId ? 'Update Member' : 'Add Member'}
        </button>
      </form>

      <ul className="space-y-2">
        {members.map((member) => (
          <li key={member._id} className="border rounded p-4 flex justify-between items-center">
            <div>
              <strong>{member.name}</strong> – {member.role}, {member.department}
            </div>
            <div className="space-x-2">
              <button onClick={() => handleEdit(member)} className="text-blue-500">Edit</button>
              <button onClick={() => handleDelete(member._id)} className="text-red-500">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemberManagement;
