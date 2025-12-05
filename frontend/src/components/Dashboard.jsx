import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { fetchDashboardStats } from '../services/dashboardServices';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {
  const [stats, setStats] = useState({
    members: 0,
    events: 0,
    announcements: 0,
    roles: [],
    eventsPerMonth: []
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchDashboardStats();
        setStats(data);
      } catch (error) {
        console.error('Dashboard stats fetch failed');
      }
    };

    loadStats();
  }, []);

  const monthMap = {
1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr",
5: "May", 6: "Jun", 7: "Jul", 8: "Aug",
9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec"
};
  const formattedEventsPerMonth = stats.eventsPerMonth.map(item => ({
month: monthMap[item._id] || `M${item._id}`,
count: item.count
}));

  return (
    <div className="container mt-4">
      <h2>📊 Admin Dashboard</h2>
        <div className="row mt-4">
    <div className="col-md-4"><div className="card p-3 shadow-sm"><h4>👥 Members</h4><p className="fs-2">{stats.members}</p></div></div>
    <div className="col-md-4"><div className="card p-3 shadow-sm"><h4>📅 Events</h4><p className="fs-2">{stats.events}</p></div></div>
    <div className="col-md-4"><div className="card p-3 shadow-sm"><h4>📢 Announcements</h4><p className="fs-2">{stats.announcements}</p></div></div>
  </div>

  <div className="row mt-5">
    <div className="col-md-6">
      <h4>👤 Member Role Distribution</h4>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={stats.roles}
            dataKey="count"
            nameKey="_id"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {stats.roles.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>

    <div className="col-md-6">
      <h4>📆 Events by Month</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={formattedEventsPerMonth}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#82ca9d" name="Events" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
</div>
  );
};

export default Dashboard;
