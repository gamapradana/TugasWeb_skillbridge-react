import CareerTips from "./components/CareerTips";
import { useState } from "react";
import Header from "./components/Header";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      posisi: "Frontend Developer",
      perusahaan: "SkillBridge Tech",
      lokasi: "Bandung",
      tipe: "Full-time",
    },
    {
      id: 2,
      posisi: "Backend Developer Intern",
      perusahaan: "Digital Nusantara",
      lokasi: "Jakarta",
      tipe: "Internship",
    },
  ]);

  function handleAddJob(newJob) {
    setJobs((currentJobs) => [newJob, ...currentJobs]);
  }

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <section className="hero">
          <p className="eyebrow">CAREER OPPORTUNITIES</p>
          <h2>Temukan peluang yang tepat untukmu.</h2>
          <p>
            Kelola dan jelajahi lowongan kerja dalam satu tempat
            bersama SkillBridge.
          </p>
        </section>

        <JobForm onAddJob={handleAddJob} />

        <JobList jobs={jobs} />

        <CareerTips />
      </main>

      <Footer />
    </div>
  );
}

export default App;
