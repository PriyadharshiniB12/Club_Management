import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import GeoAttendance from "./components/GeoAttendance";
import EventManagement from "./components/EventManagement";
import Announcements from './components/Announcements';
import MemberManagement from './components/MemberManagement';
import BusTiming from "./components/bustiming";
import StudentMonitoring from './components/StudentMonitoring';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <h1>Club Management System</h1>

        {/* Navigation Links */}
        <nav className="nav nav-pills flex-column flex-sm-row mb-4">
          <Link to="/events" className="flex-sm-fill text-sm-center nav-link">Events</Link>
          <Link to="/attendance" className="flex-sm-fill text-sm-center nav-link">Geo Attendance</Link>
          <Link to="/announcements" className="flex-sm-fill text-sm-center nav-link">Announcements</Link>
          <Link to="/members" className="flex-sm-fill text-sm-center nav-link">Member Management</Link>
          <Link to="/bus" className="flex-sm-fill text-sm-center nav-link">Bus Timing</Link>
          <Link to="/monitoring" className="flex-sm-fill text-sm-center nav-link">Student Monitoring</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/events" element={<EventManagement />} />
          <Route path="/attendance" element={<GeoAttendance />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/members" element={<MemberManagement />} />
          <Route path="/bus" element={<BusTiming />} />
          <Route path="/monitoring" element={<StudentMonitoring />} />
          {/* Default route */}
          <Route path="/" element={<h5>Please select a feature from above.</h5>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
