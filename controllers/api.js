const express = require('express');

module.exports = (userService, authService, domainService) => {
    const router = express.Router();
    const userController = require('./user')(userService);
    const authController = require('./auth')(authService);
    const domainController= require('./domain')(domainService);
   

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