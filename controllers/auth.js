const express = require('express');

module.exports = (authService) => {
    const router = express.Router();

    router.post('/register',(req, res) =>
    {
        authService.register(req.body)
        .then(()=>{
            authService.login(req.body)})
        .then(token=>{
                res.cookie('x-access-token',token);
                res.json({ success: true });
            })
        .catch(err=>res.send(err));
     });
    router.post('/login', (req, res) =>
    {
        authService.login(req.body).then(token=>{
             res.cookie('x-access-token',token);
             res.json({ success: true });
        }).catch(err=>res.send(err));
    });
    router.get('/logout',(req, res) =>
    {
        res.cookie('x-access-token',"");
        res.json({ success: true });
    });
    return router;
}