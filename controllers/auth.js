const express = require('express');

module.exports = (authService) => {
    const router = express.Router();

    router.post('/register',(req, res) =>
    {
        authService.register(req.body).then(data=>res.send(data));
    });
    return router;
}