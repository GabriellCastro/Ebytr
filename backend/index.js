const express = require('express');
const bodyParser = require('body-parser');

const tarefasRoutes = require('./Routes/tarefasRoutes');

const app = express();
app.use(bodyParser.json());
const PORT = 3001;

app.use('/tarefas', tarefasRoutes);

app.listen(PORT, () => console.log(`Servidor rodando ana porta: ${PORT}`));
