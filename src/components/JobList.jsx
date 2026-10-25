
import JobCard from "./JobCard";

function JobList({ jobs }) {
  if (jobs.length === 0) {
    return (
      <div className="empty-state">
        <h3>Belum ada data lowongan</h3>
        <p>Silakan tambahkan lowongan kerja melalui formulir di atas.</p>
      </div>
    );
  }

  return (
    <section className="job-list">
      <div className="section-heading">
        <h2>Daftar Lowongan</h2>
        <span>{jobs.length} lowongan tersedia</span>
      </div>

      <div className="job-grid">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  );
}

export default JobList;
