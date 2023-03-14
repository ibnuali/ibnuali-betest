const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const userRoutes = require('./routes/userRoutes');
const accountRoutes = require('./routes/accountRoutes');

// 1) MiddleWare
app.use(express.json());
app.use(cors('*'));
app.use(bodyParser.json());

// 2) Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/account', accountRoutes);


module.exports = app;
