const express = require('express');
var jwt = require('jsonwebtoken');

module.exports = (domainService, promiseHandler) => {
    const router = express.Router();

    router.get('/check',(req, res) =>
    {
        promiseHandler(res,domainService.checkDomain(req.query.domain));    
    });
    router.post('/',(req, res) =>
    {
        promiseHandler(res,domainService.checkDomain(req.body.domain)
        .then(data=>{
            if(data.status=="true"){
                return getId(req.cookies["x-access-token"]);
            }
            else throw("error");
        })
        .then(id=>domainService.registr(req.body.domain, req.body.ip, id)));
    });
    router.post('/pay',(req, res) =>
    {
        promiseHandler(res,getId(req.cookies["x-access-token"])
        .then(id=>domainService.pay(req.body.id, id)));
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