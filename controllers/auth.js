const express = require('express');
module.exports = (authService) => {
    const router = express.Router();

    /*router.post('/register',(req, res) =>
    {
        switch(req.body.type)
        {
            case "dean": authService.registrationDean(req.body).then(text=>res.send(text)); break;
            case "teacher": authService.registrationTeacher(req.body).then(text=>res.send(text)); break;
        }
    });*/
    return router;
}