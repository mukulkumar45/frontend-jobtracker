import React, { useState } from 'react';
import JobForm from './components/JobForm';
import JobList from './components/JobList';

const App = () => {
  const [editJob, setEditJob] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => setRefresh(!refresh);

  return (
    <div>
      <JobForm
        editJob={editJob}
        clearEdit={() => setEditJob(null)}
        fetchJobs={triggerRefresh}
      />
      <JobList
        onEdit={(job) => setEditJob(job)}
        refresh={refresh}
      />
    </div>
  );
};

export default App;
