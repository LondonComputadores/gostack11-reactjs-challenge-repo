import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";
import Header from './components/Header';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {

    const response = await api.post('repositories', {
      title: 'New Repo'
  });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleUpdateRepository(id) {
    const response = await api.put('repository/:id', {
      title: 'Another Repo'
  });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete('repository/:id', {
      title: 'New Repository'
  });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  return (  
  
    <div>
      <ul data-testid="repository-list">
        <li>
          Repositório 1

          <button onClick={() => handleRemoveRepository(1)}>
            Remover
          </button>
        </li>
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>

  );
}

export default App;
