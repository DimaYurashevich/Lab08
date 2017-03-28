const express = require('express');

module.exports = (authService,promiseHandler) => {
    const router = express.Router();

    router.post('/register',(req, res) =>
    {
        promiseHandler(res,authService.register(req.body));
     });
    router.post('/login', (req, res) =>
    {
        promiseHandler(res,authService.login(req.body).then(token=>{
             res.cookie('x-access-token',token); return {success: "user login"}}));
    });
    router.get('/logout',(req, res) =>
    {
        res.cookie('x-access-token',"");
        res.json({ success: "user logout"});
    });
    return router;
}