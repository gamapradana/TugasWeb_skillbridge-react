
import { useState } from "react";

function JobForm({ onAddJob, editingJob, onUpdateJob, onCancelEdit }) {
  return (
    <JobFormFields
      key={editingJob?.id ?? "new"}
      editingJob={editingJob}
      onAddJob={onAddJob}
      onUpdateJob={onUpdateJob}
      onCancelEdit={onCancelEdit}
    />
  );
}

function JobFormFields({
  editingJob,
  onAddJob,
  onUpdateJob,
  onCancelEdit,
}) {
  const [posisi, setPosisi] = useState(editingJob?.posisi ?? "");
  const [perusahaan, setPerusahaan] = useState(editingJob?.perusahaan ?? "");
  const [lokasi, setLokasi] = useState(editingJob?.lokasi ?? "");
  const [tipe, setTipe] = useState(editingJob?.tipe ?? "Full-time");
  const [gaji, setGaji] = useState(
    editingJob ? String(editingJob.gaji) : "",
  );
  const [deskripsi, setDeskripsi] = useState(editingJob?.deskripsi ?? "");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const jobData = {
      posisi: posisi.trim(),
      perusahaan: perusahaan.trim(),
      lokasi: lokasi.trim(),
      tipe,
      gaji: Number(gaji),
      deskripsi: deskripsi.trim(),
    };

    try {
      if (editingJob) {
        await onUpdateJob(editingJob.id, jobData);
      } else {
        await onAddJob(jobData);
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="job-form-section">
      <h2>{editingJob ? "Edit Lowongan" : "Tambah Lowongan"}</h2>

      <p>
        {editingJob
          ? "Perbarui informasi lowongan kerja."
          : "Masukkan informasi lowongan kerja baru."}
      </p>

      <form onSubmit={handleSubmit} className="job-form">
        <div className="form-group">
          <label htmlFor="posisi">Posisi Pekerjaan</label>
          <input
            id="posisi"
            type="text"
            value={posisi}
            onChange={(e) => setPosisi(e.target.value)}
            required
            minLength={3}
          />
        </div>

        <div className="form-group">
          <label htmlFor="perusahaan">Nama Perusahaan</label>
          <input
            id="perusahaan"
            type="text"
            value={perusahaan}
            onChange={(e) => setPerusahaan(e.target.value)}
            required
            minLength={2}
          />
        </div>

        <div className="form-group">
          <label htmlFor="lokasi">Lokasi</label>
          <input
            id="lokasi"
            type="text"
            value={lokasi}
            onChange={(e) => setLokasi(e.target.value)}
            required
            minLength={3}
          />
        </div>

        <div className="form-group">
          <label htmlFor="tipe">Tipe Pekerjaan</label>
          <select
            id="tipe"
            value={tipe}
            onChange={(e) => setTipe(e.target.value)}
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="gaji">Gaji (Rp)</label>
          <input
            id="gaji"
            type="number"
            value={gaji}
            onChange={(e) => setGaji(e.target.value)}
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="deskripsi">Deskripsi Pekerjaan</label>
          <textarea
            id="deskripsi"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            required
            minLength={10}
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="submit-button">
          {editingJob ? "Simpan Perubahan" : "+ Tambah Lowongan"}
        </button>

        {editingJob && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="cancel-button"
          >
            Batal Edit
          </button>
        )}
      </form>
    </section>
  );
}

export default JobForm;
