const { ObjectId } = require('mongodb');
const router = require('express').Router();
const { create, update, getAll, exclude } = require('../models/tarefasModel');

router.get('/', async (req, res)  => {
  try {
    const tarefas = await getAll();
    res.status(200).json(tarefas);
  } catch (error) {
    console.log(error);
    return res.status().json({message: 'Deu ruim meu filho ao busca as tarefas.'});
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, description, status } = req.body;
    const resposta = await create(name, description, status);
    if (!resposta) return { err: { code: 'deu_ruim', message: 'não foi possivel criar a tarefa.' } };
    return res.status(201).json(resposta);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Deu ruim ao cadastrar uma tarefa.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, status } = req.body;
    const resposta = await update(name, description, status, id);
    return res.status(204).json(resposta);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Deu ruim ao atualizar uma tarefa.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return { err: { code: 'deu_ruim', message: 'id formato invalido.' } };
    }
    const resposta = await exclude(id);
    return res.status(204).json(resposta);
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: 'Deu ruim ao atualizar uma tarefa.' });
  }
});

module.exports = router;
