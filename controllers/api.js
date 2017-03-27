const express = require('express');

module.exports = (userService, authService) => {
    const router = express.Router();
    const userController = require('./user')(userService);
    const authController = require('./auth')(authService);
   

    router.use('/user', userController);
    router.use('/auth', authController);

    return router;
};

function promiseHandler(res, promise) {
    promise
        .then((data) => res.json(data))
        .catch((err) => res.error(err));
}