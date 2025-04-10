import React, { useEffect, useState } from 'react';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

const JobList = ({ onEdit }) => {
  const [jobs, setJobs] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const fetchJobs = async () => {
    try {
      const params = {};
      if (statusFilter && statusFilter !== 'All') {
        params.status = statusFilter;
      }
      if (dateFilter) {
        params.date = dateFilter;
      }
  
      const res = await axios.get(`${apiUrl}/api/jobs`, { params });
      setJobs(res.data);
    } catch (err) {
      console.error('Error fetching jobs', err);
    }
  };
  

  useEffect(() => {
    fetchJobs();
  }, []); // runs once when component mounts
  
  useEffect(() => {
    if (statusFilter || dateFilter) {
      fetchJobs();
    }
  }, [statusFilter, dateFilter]);

  const deleteJob = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/jobs/${id}`);
      fetchJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <div>
      <h1>Student Job Tracker</h1>

      {/* Filter Bar */}
      <div className="filter-bar">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>

      {/* Job Cards */}
      <div className="job-list">
        {Array.isArray(jobs) && jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job._id} className="job-card">
              <h3>{job.company}</h3>
              <p><strong>Role:</strong> {job.role}</p>
              <p><strong>Date:</strong> {job.date}</p>
              <span className={`status ${job.status}`}>{job.status}</span>

              <div className="card-buttons">
                <button className="edit" onClick={() => onEdit(job)}>Edit</button>
                <button className="delete" onClick={() => deleteJob(job._id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', marginTop: '40px' }}>
            No job applications found.
          </p>
        )}
      </div>
    </div>
  );
};

export default JobList;
