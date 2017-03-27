const express = require('express');

module.exports = (authService, config) => {
    const router = express.Router();
    /*const authController = require('./auth')(authService);
   

    router.use('/auth', authController);*/

    return router;
};

function promiseHandler(res, promise) {
    promise
        .then((data) => res.json(data))
        .catch((err) => res.error(err));
}