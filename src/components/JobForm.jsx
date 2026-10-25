
import { useState } from "react";

function JobForm({ onAddJob }) {
  const [posisi, setPosisi] = useState("");
  const [perusahaan, setPerusahaan] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [tipe, setTipe] = useState("Full-time");

  function handleSubmit(event) {
    event.preventDefault();

    if (!posisi.trim() || !perusahaan.trim() || !lokasi.trim()) {
      return;
    }

    const newJob = {
      id: Date.now(),
      posisi: posisi.trim(),
      perusahaan: perusahaan.trim(),
      lokasi: lokasi.trim(),
      tipe,
    };

    onAddJob(newJob);

    setPosisi("");
    setPerusahaan("");
    setLokasi("");
    setTipe("Full-time");
  }

  return (
    <section className="job-form-section">
      <h2>Tambah Lowongan</h2>
      <p>Masukkan informasi lowongan kerja baru.</p>

      <form onSubmit={handleSubmit} className="job-form">
        <div className="form-group">
          <label htmlFor="posisi">Posisi Pekerjaan</label>
          <input
            id="posisi"
            type="text"
            placeholder="Contoh: Frontend Developer"
            value={posisi}
            onChange={(event) => setPosisi(event.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="perusahaan">Nama Perusahaan</label>
          <input
            id="perusahaan"
            type="text"
            placeholder="Contoh: PT Teknologi Indonesia"
            value={perusahaan}
            onChange={(event) => setPerusahaan(event.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lokasi">Lokasi</label>
          <input
            id="lokasi"
            type="text"
            placeholder="Contoh: Bandung"
            value={lokasi}
            onChange={(event) => setLokasi(event.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="tipe">Tipe Pekerjaan</label>
          <select
            id="tipe"
            value={tipe}
            onChange={(event) => setTipe(event.target.value)}
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
            <option value="Freelance">Freelance</option>
          </select>
        </div>

        <button type="submit" className="submit-button">
          + Tambah Lowongan
        </button>
      </form>
    </section>
  );
}

export default JobForm;
