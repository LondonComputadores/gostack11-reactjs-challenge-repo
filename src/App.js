import React, { useState, useEffect } from "react";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState("");
  const [techs, setTechs] = useState("");

  useEffect(() => {
    const fetchRepositories = () => {
      api.get("/repositories").then((res) => {
        setRepositories(res.data);
      });
    };
    fetchRepositories();
  }, []);

  async function handleAddRepository(e) {
    e.preventDefault();
    const newRepository = {
      title,
      url: "",
      techs,
    };
    const { data } = await api.post("/repositories", newRepository);
    setRepositories((prevState) => [...prevState, data]);
  }

  async function handleRemoveRepository(id) {
    const { status } = await api.delete(`/repositories/${id}`);
    if (status === 204) {
      setRepositories(() => repositories.filter((repo) => repo.id !== id));
    }
  }

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleTechsChange(e) {
    const techsStr = e.target.value;
    const techsArr = techsStr.split(", ");
    setTechs(techsArr);
  }

  return (
    <section>
      <form onSubmit={handleAddRepository}>
        <input type="text" onChange={handleTitleChange} placeholder="Title" />
        <input type="text" onChange={handleTechsChange} placeholder="Techs" />
        <button type="submit">Adicionar</button>
      </form>

      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            <h3>
              <a
                href={repository.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {repository.title}
              </a>
            </h3>

            <span>{repository.likes}</span>

            <ul>
              {repository.techs.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default App;