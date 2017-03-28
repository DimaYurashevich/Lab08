const express = require('express');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


const config = require('./config');
const errors = require('./utils/errors');

const dbcontext = require('./context/db')(Sequelize, config);
const userService = require('./services/user')(dbcontext.user, errors);
const authService = require('./services/auth')(dbcontext.user, errors);
const domainService = require('./services/domain')(dbcontext.domain,dbcontext.user, errors);
const apiController = require('./controllers/api')(userService, authService, domainService);

const app = express();

app.use(express.static('public'));
app.use(cookieParser("pskpdm"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', apiController);

dbcontext.sequelize.sync()
    .then(() => {
        app.listen(3000, () => console.log('Running'));
    })
    .catch((err) => console.log(err));