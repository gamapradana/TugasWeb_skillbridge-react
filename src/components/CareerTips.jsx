
import { useState, useEffect, useCallback } from "react";

function CareerTips() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=5"
      );

      if (!response.ok) {
        throw new Error("Gagal mengambil data dari server.");
      }

      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  
  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();

    async function loadPosts() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=5",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Gagal mengambil data dari server.");
        }

        const data = await response.json();

        if (!ignore) {
          setPosts(data);
        }
      } catch (err) {
        if (!ignore && err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadPosts();

    return () => {
      ignore = true;
      controller.abort();
    };
  }, []);

  return (
    <section className="career-tips">
      <div className="career-header">
        <h2>Informasi dan Tips Karier</h2>
        <p>
          Temukan informasi untuk mendukung perjalanan kariermu
          bersama SkillBridge.
        </p>
      </div>

      
      {loading && (
        <div className="api-loading">
          <p>Memuat informasi karier...</p>
        </div>
      )}

      
      {!loading && error && (
        <div className="api-error">
          <p>{error}</p>
          <button onClick={fetchPosts}>
            Coba Lagi
          </button>
        </div>
      )}

      
      {!loading && !error && (
        <div className="career-grid">
          {posts.length > 0 ? (
            posts.map((post) => (
              <article className="career-card" key={post.id}>
                <span className="career-label">
                  Informasi Karier
                </span>

                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </article>
            ))
          ) : (
            <p>Belum ada informasi karier tersedia.</p>
          )}
        </div>
      )}
    </section>
  );
}

export default CareerTips;
