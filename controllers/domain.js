const express = require('express');
var jwt = require('jsonwebtoken');

module.exports = (domainService) => {
    const router = express.Router();

    router.get('/check',(req, res) =>
    {
        domainService.checkDomain(req.query.domain).then(data=>res.send(data))
        .catch(err=>res.send("err:"+err));
    });
    router.post('/',(req, res) =>
    {
        domainService.checkDomain(req.body.domain)
        .then(data=>{
            console.log(data);
            if(data.status=="true"){
                getId(req.cookies["x-access-token"]).then(id=>domainService.registr(req.body.domain, req.body.ip, id));
            }
            else throw("error");
        })
        .then(data=>{
            res.send("OK");
        })
        .catch("Error");
    });
    router.post('/pay',(req, res) =>
    {
        console.log("controller domain");
        getId(req.cookies["x-access-token"])
        .then(id=>domainService.pay(req.body.id, id))
        .then(data=>res.send("OK"))
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