import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "http://localhost:5000/api/members";

const MemberManagement = () => {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    rollNumber: "",
    email: "",
    phone: "",
    department: "",
    year: "",
    role: "Member",
    avatarUrl: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch members safely
  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      if (Array.isArray(res.data)) setMembers(res.data);
      else setMembers([]);
    } catch (err) {
      console.error("Error fetching members:", err);
      setError("Failed to load members");
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, form);
      } else {
        await axios.post(API_URL, form);
      }
      setForm({
        name: "",
        rollNumber: "",
        email: "",
        phone: "",
        department: "",
        year: "",
        role: "Member",
        avatarUrl: ""
      });
      setEditingId(null);
      fetchMembers();
    } catch (err) {
      console.error("Error saving member:", err);
      setError("Failed to save member");
    }
  };

  const deleteMember = async (id) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchMembers();
    } catch (err) {
      console.error("Error deleting member:", err);
      setError("Failed to delete member");
    }
  };

  const editMember = (member) => {
    setForm(member);
    setEditingId(member._id);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 fw-bold">Member Management</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card shadow-sm p-4 mb-5">
        <h4 className="mb-3">{editingId ? "Update Member" : "Add Member"}</h4>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">

            <div className="col-md-6">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="col-md-6">
              <input
                type="text"
                name="rollNumber"
                placeholder="Roll Number"
                value={form.rollNumber}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="col-md-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="col-md-4">
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="col-md-4">
              <input
                type="text"
                name="department"
                placeholder="Department"
                value={form.department}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="col-md-4">
              <input
                type="number"
                name="year"
                placeholder="Year"
                value={form.year}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="col-md-4">
              <select
                name="role"
                className="form-select"
                value={form.role}
                onChange={handleChange}
              >
                <option>President</option>
                <option>Vice President</option>
                <option>Secretary</option>
                <option>Member</option>
              </select>
            </div>

            <div className="col-md-4">
              <input
                type="text"
                name="avatarUrl"
                placeholder="Avatar URL"
                value={form.avatarUrl}
                onChange={handleChange}
                className="form-control"
              />
            </div>

          </div>
          <button type="submit" className="btn btn-primary w-100 mt-3">
            {editingId ? "Update Member" : "Add Member"}
          </button>
        </form>
      </div>

      <div className="card shadow-sm p-4">
        <h4 className="mb-3">All Members</h4>

        {loading ? (
          <div className="text-center py-5">Loading...</div>
        ) : members.length === 0 ? (
          <div className="text-center py-5">No members found.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Roll No</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Dept</th>
                  <th>Year</th>
                  <th>Role</th>
                  <th>Avatar</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m) => (
                  <tr key={m._id || Math.random()}>
                    <td>{m.name || "—"}</td>
                    <td>{m.rollNumber || "—"}</td>
                    <td>{m.email || "—"}</td>
                    <td>{m.phone || "—"}</td>
                    <td>{m.department || "—"}</td>
                    <td>{m.year || "—"}</td>
                    <td>{m.role || "Member"}</td>
                    <td>
                      {m.avatarUrl ? (
                        <img
                          src={m.avatarUrl}
                          alt="avatar"
                          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                        />
                      ) : (
                        "—"
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => editMember(m)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteMember(m._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberManagement;
