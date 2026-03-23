import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [joke, setJoke] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchJoke = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(
        "https://v2.jokeapi.dev/joke/Any?type=single",
      );
      const data = await response.json();

      if (data.joke) {
        setJoke(data.joke);
      } else if (data.setup) {
        setJoke(`${data.setup} ... ${data.delivery}`);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      setError(true);
      setJoke("Could not fetch a joke. Try again.");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <>
      <section id="center">
        <h1 id="title">Random Joke</h1>
        <p id="description">Click the button to get a fresh one!</p>

        <button
          id="fetch-joke-btn"
          className="fetch-btn"
          onClick={fetchJoke}
          disabled={loading}
        >
          {loading ? "Fetching..." : "Fetch Joke"}
        </button>

        <div className="joke-container">
          <section id="joke-card">
            {error ? (
              <div className="error-wrapper">
                <p className="joke-text error-text">{joke}</p>
                <button
                  className="retry-link"
                  onClick={fetchJoke}
                  disabled={loading}
                >
                  Try again
                </button>
              </div>
            ) : (
              <p className="joke-text">{joke}</p>
            )}
          </section>
        </div>
      </section>
    </>
  );
}

export default App;
