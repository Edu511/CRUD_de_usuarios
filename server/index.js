const express = require('express');
const bodyParser = require('body-parser');

const apiRouter = require('./routes/api');

const app = express();

require('./db');

app.use(express.json());

app.use('/api', apiRouter);

app.listen(5000, () => {
    console.log('Servidor conectado correctamente');
});