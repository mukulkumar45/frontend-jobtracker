import React, { useState, useEffect } from 'react';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;


const initialState = {
  company: '',
  role: '',
  status: 'Applied',
  date: '',
  link: ''
};

const JobForm = ({ fetchJobs, editJob, clearEdit }) => {
  const [job, setJob] = useState(initialState);

  useEffect(() => {
    if (editJob) {
      setJob(editJob);
    }
  }, [editJob]);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editJob) {
        await axios.put(`${apiUrl}/api/jobs/${editJob._id}`, job);
        clearEdit();
      } else {
        await axios.post(`${apiUrl}/api/jobs`, job);
      }
      setJob(initialState);
      fetchJobs();
    } catch (error) {
      console.error('Error submitting job:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editJob ? 'Edit Job' : 'Add Job'}</h2>

      <input
        type="text"
        name="company"
        placeholder="Company Name"
        value={job.company}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="role"
        placeholder="Role"
        value={job.role}
        onChange={handleChange}
        required
      />

      <select name="status" value={job.status} onChange={handleChange}>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>

      <input
        type="date"
        name="date"
        value={job.date}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="link"
        placeholder="Job Link (optional)"
        value={job.link}
        onChange={handleChange}
      />

      <button type="submit">
        {editJob ? 'Update Job' : 'Add Job'}
      </button>
    </form>
  );
};

export default JobForm;
