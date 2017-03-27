const express = require('express');
module.exports = (userService) => {
    const router = express.Router();
    console.log("controller User");
    router.get('/:id',(req, res) =>
    {
        console.log('get+/user/:id');
        userService.readUser(1,req.params.id).then(data=>res.send(data));
    });
    router.put('/:id',(req, res) =>
    {
        console.log('put+/user/:id');
        userService.updateUser(1,req.params.id,req.body).then(data=>res.send(data));
    });
    router.get('/',(req, res) =>
    {
        console.log('get+/user');
        userService.readAllUser().then(data=>res.send(data));
    });
    router.delete('/:id',(req, res) =>
    {
        console.log('delete+/user/:id');
        userService.deleteUser(1, req.params.id).then(data=>res.send(data));
    });

    return router;
}