const express = require('express');
var jwt = require('jsonwebtoken');
module.exports = (userService) => {
    const router = express.Router();
    console.log("controller User");
    router.get('/:id',(req, res) =>
    {
        getId(req.cookies["x-access-token"])
        .then(id=>userService.readUser(id,req.params.id))
        .then(data=>res.send(data));   
    });
    router.put('/:id',(req, res) =>
    {
        getId(req.cookies["x-access-token"])
        .then(id=>userService.updateUser(id,req.params.id,req.body))
        .then(data=>res.send(data))
        .catch(err=>res.send(err));
    });
    router.get('/',(req, res) =>
    {
        userService.readAllUser().then(data=>res.send(data));
    });
    router.delete('/:id',(req, res) =>
    {
        getId(req.cookies["x-access-token"])
        .then(id=>userService.deleteUser(id, req.params.id))
        .then(data=>res.redirect("/api/auth/logout"))
        .catch(err=>res.send(err));
    });

    function getId(token)
    {
        return new Promise((resolve, reject) => {
            var decoded = jwt.verify(token, 'pskpdm');
            resolve(decoded.__user_id);
        });
    }
    return router;
}