const express = require('express');

module.exports = (userService, authService, domainService) => {
    const router = express.Router();
    const userController = require('./user')(userService, promiseHandler);
    const authController = require('./auth')(authService, promiseHandler);
    const domainController= require('./domain')(domainService, promiseHandler);
   

    router.use('/user', userController);
    router.use('/auth', authController);
    router.use("/domain", domainController);

    return router;
};

function promiseHandler(res, promise) {
    promise
        .then((data) => res.json(data))
        .catch((err) => res.error(err));
}