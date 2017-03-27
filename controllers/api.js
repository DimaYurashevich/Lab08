const express = require('express');

module.exports = (userService) => {
    const router = express.Router();
    const userController = require('./user')(userService);
   

    router.use('/user', userController);

    return router;
};

function promiseHandler(res, promise) {
    promise
        .then((data) => res.json(data))
        .catch((err) => res.error(err));
}