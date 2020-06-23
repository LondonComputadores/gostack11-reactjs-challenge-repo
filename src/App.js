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
  
    <>
      
      <Header title="Repositories"/>

      <ul>
        {repositories.map(repository => <li key={repository.id}>{repository.title}</li>)}
      </ul>

      <button type='button' onClick={handleAddRepository}>Adicionar</button>
    </>

  );
}

export default App;
