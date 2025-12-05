// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function EventManagement() {
//   const [members, setMembers] = useState([]);
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     role: 'Participant',
//   });

//   useEffect(() => {
//     fetchMembers();
//   }, []);

//   const fetchMembers = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/members');
//       setMembers(res.data);
//     } catch (err) {
//       console.error('Error fetching members:', err);
//     }
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/members', form);
//       setForm({ name: '', email: '', role: 'Participant' });
//       fetchMembers();
//     } catch (err) {
//       console.error('Error adding member:', err);
//     }
//   };

//   const handleDelete = async (id) => {
//   try {
//     await axios.delete(`http://localhost:5000/api/members/${id}`);
//     fetchMembers(); // Refresh the list after deletion
//   } catch (err) {
//     console.error('Error deleting member:', err);
//   }
// };


//   return (
//     <div className="container mt-4">
//       <div className="card p-4 shadow-sm">
//         <h2 className="mb-4">👥 Add Member</h2>
//         <form onSubmit={handleSubmit} className="row g-3">
//           <div className="col-md-4">
//             <input
//               type="text"
//               name="name"
//               className="form-control"
//               placeholder="Name"
//               value={form.name}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="col-md-4">
//             <input
//               type="email"
//               name="email"
//               className="form-control"
//               placeholder="Email"
//               value={form.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="col-md-3">
//             <select
//               name="role"
//               className="form-select"
//               value={form.role}
//               onChange={handleChange}
//             >
//               <option>Admin</option>
//               <option>Organizer</option>
//               <option>Volunteer</option>
//               <option>Participant</option>
//             </select>
//           </div>
//           <div className="col-md-1 d-grid">
//             <button type="submit" className="btn btn-primary">Add</button>
//           </div>
//         </form>
//       </div>

//       <div className="mt-5">
//         <h3>📋 Members List</h3>
//         <table className="table table-bordered mt-3">
//           <thead className="table-light">
//             <tr>
//     <th>Name</th>
//     <th>Email</th>
//     <th>Role</th>
//     <th>Action</th>
//   </tr>
//           </thead>
//           <tbody>
//             {members.map((m) => (
//               <tr key={m._id}>
//   <td>{m.name}</td>
//   <td>{m.email}</td>
//   <td>{m.role}</td>
//   <td>
//     <button className="btn btn-danger btn-sm" onClick={() => handleDelete(m._id)} style={{ backgroundColor: 'red', color: 'white' }}>
//       Delete
//     </button>
//   </td>
// </tr>

//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default EventManagement;


import React, { useState, useEffect } from "react";
import axios from "axios";

function EventManagement() {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", role: "Participant" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch members from backend
  const fetchMembers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/members");
      if (Array.isArray(res.data)) setMembers(res.data);
      else setMembers([]);
    } catch (err) {
      console.error("Error fetching members:", err);
      setMembers([]);
      setError("Failed to load members. Please try again later.");
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.post("http://localhost:5000/api/members", form);
      setForm({ name: "", email: "", role: "Participant" });
      fetchMembers(); // Refresh members
    } catch (err) {
      console.error("Error adding member:", err);
      setError("Failed to add member. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting a member
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;
    setError("");
    try {
      await axios.delete(`http://localhost:5000/api/members/${id}`);
      fetchMembers(); // Refresh members
    } catch (err) {
      console.error("Error deleting member:", err);
      setError("Failed to delete member. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow-sm">
        <h2 className="mb-4">👥 Add Member</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <select
              name="role"
              className="form-select"
              value={form.role}
              onChange={handleChange}
            >
              <option>Admin</option>
              <option>Organizer</option>
              <option>Volunteer</option>
              <option>Participant</option>
            </select>
          </div>
          <div className="col-md-1 d-grid">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-5">
        <h3>📋 Members List</h3>
        {members.length === 0 ? (
          <p className="text-muted">No members found.</p>
        ) : (
          <table className="table table-bordered mt-3">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m._id || Math.random()}>
                  <td>{m.name || "-"}</td>
                  <td>{m.email || "-"}</td>
                  <td>{m.role || "-"}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(m._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default EventManagement;
