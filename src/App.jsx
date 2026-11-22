import CareerTips from "./components/CareerTips";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import Footer from "./components/Footer";
import "./App.css";

const API_URL = "http://localhost:3000/jobs";

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingJob, setEditingJob] = useState(null);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Gagal mengambil data lowongan.");
        }

        const data = await response.json();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  async function handleAddJob(newJob) {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        Array.isArray(data.message)
          ? data.message.join(", ")
          : data.message || "Gagal menambahkan lowongan.",
      );
    }

    setJobs((currentJobs) => [data, ...currentJobs]);
  }

  async function handleUpdateJob(id, updatedJob) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedJob),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        Array.isArray(data.message)
          ? data.message.join(", ")
          : data.message || "Gagal memperbarui lowongan.",
      );
    }

    setJobs((currentJobs) =>
      currentJobs.map((job) => (job.id === id ? data : job)),
    );

    setEditingJob(null);
  }
  function handleEditJob(job) {
  console.log("Tombol Edit diklik:", job);
  setEditingJob(job);
}

  async function handleDeleteJob(id) {
    const confirmed = window.confirm(
      "Apakah kamu yakin ingin menghapus lowongan ini?",
    );

    if (!confirmed) return;

    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Gagal menghapus lowongan.");
    }

    setJobs((currentJobs) => currentJobs.filter((job) => job.id !== id));
  }

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <section className="hero">
          <p className="eyebrow">CAREER OPPORTUNITIES</p>
          <h2>Temukan peluang yang tepat untukmu.</h2>
          <p>
            Kelola dan jelajahi lowongan kerja dalam satu tempat bersama
            SkillBridge.
          </p>
        </section>

        <JobForm
          onAddJob={handleAddJob}
          editingJob={editingJob}
          onUpdateJob={handleUpdateJob}
          onCancelEdit={() => setEditingJob(null)}
        />

        {loading && <p>Memuat data lowongan...</p>}

        {error && <p className="error-message">{error}</p>}

        {!loading && !error && (
          <JobList
            jobs={jobs}
            onEdit={handleEditJob}
            onDelete={handleDeleteJob}
          />
        )}

        <CareerTips />
      </main>

      <Footer />
    </div>
  );
}

export default App;
