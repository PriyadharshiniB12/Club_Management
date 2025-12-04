import React, { useEffect, useState } from "react";
import { fetchBuses, addBus, deleteBus } from "../services/bustimingservices";

const BusTiming = () => {
  const [buses, setBuses] = useState([]);
  const [form, setForm] = useState({ routeName: "", departureTime: "", note: "" });

  useEffect(() => {
    loadBuses();
  }, []);

  const loadBuses = async () => {
    const data = await fetchBuses();
    setBuses(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addBus(form);
    setForm({ routeName: "", departureTime: "", note: "" });
    loadBuses();
  };

  const handleDelete = async (id) => {
    await deleteBus(id);
    loadBuses();
  };

  return (
    <div>
      <h2>🚌 Club Bus Timing Alerts</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="routeName"
          placeholder="Route Name"
          value={form.routeName}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="departureTime"
          value={form.departureTime}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="note"
          placeholder="Optional Note"
          value={form.note}
          onChange={handleChange}
        />
        <button type="submit">Add Bus</button>
      </form>

      <ul>
        {buses.map((bus) => (
          <li key={bus._id}>
            <strong>{bus.routeName}</strong> at {bus.departureTime}
            {bus.note && ` (${bus.note})`}
            <button onClick={() => handleDelete(bus._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BusTiming;
