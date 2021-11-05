const { ObjectId } = require('mongodb');
const connection = require('../models/connection');

const getAll = async () => {
  const db = await connection();
  const tarefas = await db.collection('tarefas').find().toArray();
  return tarefas;
};

const create = async (name, description, status) => {
  const db = await connection();
  const inserted = await db.collection('tarefas').insertOne({ name, description, status });
  return inserted;
};

const update = async (name, description, status, id) => {
  const db = await connection();
  await db
    .collection('tarefas').updateOne({ _id: ObjectId(id) }, { $set: { name, description, status } });
  return { name, description, status, id };
};

const exclude = async (id) => {
  const db = await connection();
  const productExclude = await db.collection('tarefas').findOne(ObjectId(id));
  await db.collection('tarefas').deleteOne({ _id: ObjectId(id) });
  return productExclude;
};

module.exports = { create, update, getAll, exclude };
