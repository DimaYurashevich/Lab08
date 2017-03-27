const express = require('express');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');


const config = require('./config');
const errors = require('./utils/errors');

const dbcontext = require('./context/db')(Sequelize, config);
const authService = require('./services/auth')(dbcontext.user, dbcontext.role,dbcontext.faculty, errors);
const apiController = require('./controllers/api')(authService);

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', apiController);

dbcontext.sequelize.sync()
    .then(() => {
        app.listen(3000, () => console.log('Running'));
    })
    .catch((err) => console.log(err));