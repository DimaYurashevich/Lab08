const express = require('express');
var jwt = require('jsonwebtoken');
module.exports = (userService, promiseHandler) => {
    const router = express.Router();
    console.log("controller User");
    router.get('/:id',(req, res) =>
    {
        promiseHandler(res,getId(req.cookies["x-access-token"])
        .then(id=>userService.readUser(id,req.params.id)));   
    });
    router.put('/:id',(req, res) =>
    {
        promiseHandler(res,getId(req.cookies["x-access-token"])
        .then(id=>userService.updateUser(id,req.params.id,req.body)));
    });
    router.get('/',(req, res) =>
    {
        promiseHandler(res,userService.readAllUser());
    });
    router.delete('/:id',(req, res) =>
    {
        promiseHandler(res,getId(req.cookies["x-access-token"])
        .then(id=>userService.deleteUser(id, req.params.id)));
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