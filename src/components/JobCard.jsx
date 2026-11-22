function JobCard({ job, onEdit, onDelete }) {
  return (
    <article className="job-card">
      <div className="job-card-info">
        <h3>{job.posisi}</h3>
        <p className="company">{job.perusahaan}</p>
        <p className="job-location">{job.lokasi}</p>
        <p className="job-salary">
          Rp {Number(job.gaji).toLocaleString("id-ID")}
        </p>
        <p>{job.deskripsi}</p>
      </div>

      <div className="job-card-footer">
        <span className="job-type">{job.tipe}</span>

        <div className="job-card-actions">
          <button
            type="button"
            onClick={() => onEdit(job)}
            className="edit-button"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete(job.id)}
            className="delete-button"
          >
            Hapus
          </button>
        </div>
      </div>
    </article>
  );
}

export default JobCard;
