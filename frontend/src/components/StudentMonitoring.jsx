//components/StudentMonitoring.jsx
import React, { useEffect, useState } from 'react';
import { fetchFrequentAbsentees } from "../services/monitoringServices.js";
import { Badge, Spinner } from 'react-bootstrap';

const StudentMonitoring = () => {
  const [absentees, setAbsentees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchFrequentAbsentees();
        setAbsentees(data);
      } catch (err) {
        console.error('Failed to fetch frequent absentees:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="container mt-5">
      <h2>🚨 Student Monitoring</h2>
      <p className="text-muted">Students who have been absent 3 or more times</p>

      {loading ? (
        <div className="text-center mt-4">
          <Spinner animation="border" />
        </div>
      ) : absentees.length === 0 ? (
        <div className="alert alert-success mt-4">🎉 No frequent absentees found.</div>
      ) : (
        <table className="table table-bordered table-striped mt-4">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Role</th>
              <th>Absences</th>
            </tr>
          </thead>
          <tbody>
            {absentees.map((student, index) => (
              <tr key={student.studentId}>
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>
                  <Badge bg="info" className="text-uppercase">
                    {student.role}
                  </Badge>
                </td>
                <td>
                  <span className="badge bg-danger">{student.absences}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentMonitoring;
