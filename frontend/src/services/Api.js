import axios from './axios';

export const getAllTarefas = async () => {
  const res = axios.get('http://localhost:3001/tarefas');
  return res.tarefas;
};

export const createTarefa = async () => {
  
};
