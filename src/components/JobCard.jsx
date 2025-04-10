const JobCard = ({ job, onDelete, onUpdate }) => {
  return (
    <div className="job-card">
      <h3>{job.company}</h3>
      <p>
        <strong>Role:</strong> {job.role}
      </p>
      <p>
        <strong>Status:</strong>
        <select
          value={job.status}
          onChange={(e) => onUpdate(job._id, e.target.value)}
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
      </p>

      <p><strong>Date:</strong> {job.appliedDate ? new Date(job.appliedDate).toLocaleDateString() : 'N/A'}</p>

      {job.link && (
        <a href={job.link} target="_blank">
          Job Link
        </a>
      )}
      <button onClick={() => onDelete(job._id)}>Delete</button>
    </div>
  );
};

export default JobCard;
