import React, { useState, useEffect } from 'react';
import { getAllTarefas } from '../services/Api';

function ListaDeTarefas() {
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    getAllTarefas()
      .then((data) => setTarefas(data));
  }, []);

  if (!tarefas) return <p>Carregando tarefas...</p>;

  return (
    <ul>
      {
        tarefas.map(({ id, name, description, status }) => (
          <li key={id}>Nome: {name}, Descrição: {description}, Status: {status}</li>
        ))
      }
    </ul>
  );
}

export default ListaDeTarefas;
