import React, { useEffect, useState } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function fetchRepos() {
    try {
      const repos = await api.get("/repositories");

      setRepositories(repos.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAddRepository() {
    try {
      const repository = await api.post("/repositories", {
        url: "https://github.com/Rocketseat/umbriel",
        title: "Umbriel",
        techs: ["Node", "Express", "TypeScript"],
      });

      setRepositories([...repositories, repository.data]);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);

      setRepositories(repositories.filter((repo) => repo.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchRepos();
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
