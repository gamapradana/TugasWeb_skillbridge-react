
function JobCard({ job }) {
  return (
    <article className="job-card">
      <div className="job-card-info">
        <h3>{job.posisi}</h3>
        <p className="company">{job.perusahaan}</p>
        <p className="job-location">{job.lokasi}</p>
      </div>

      <div className="job-card-footer">
        <span className="job-type">{job.tipe}</span>
      </div>
    </article>
  );
}

export default JobCard;
