module.exports = (domainRepository, errors) => {
    const BaseService = require('./base');
    var needle = require('needle');
    var Promise = require("bluebird");
    var cost=20;
    Object.setPrototypeOf(DomainService.prototype, BaseService.prototype);

    function DomainService(domainRepository,userRepository, errors) {
        BaseService.call(this, domainRepository, errors);

        var self = this;

        self.checkDomain = checkDomain;
        self.registr= registr;
        self.pay=pay;
      

        function checkDomain(domain) {
            return new Promise((resolve, reject) => {
                if(!(/^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/.test(domain))) return reject("Error domain");
                var options = {
                    headers: {  'Origin': 'https://www.namecheap.com/',
                                'Content-Type': 'application/x-www-form-urlencoded' }
                }
                var url='https://api.domainr.com/v2/status?domain=' + domain + '&client_id=fb7aca826b084569a50cfb3157e924ae';
                needle.get(url,options, function(err, resp) {
                    if(err) {
                        console.log(err);
                        return reject(err);
                    }
                    if((resp.body.status[0].status).indexOf("inactive")>=0)
                    {
                        console.log("needle OK");
                        domainRepository.findOne({where: {domain:domain}})
                        .then(data=>{
                            if(data==null) resolve({status: "true"})
                            else resolve({status: "false"});
                        })
                    }
                    else {
                        resolve({status: "false"});
                    }
                });      
            })
        }
        function registr(domain, ip,userId)
        {
            console.log("registr serv");
            return new Promise((resolve, reject) => {
                Promise.all([
                    domainRepository.findOne({where:{domain:domain}}),
                    domainRepository.findOne({where:{ip:ip}}),
                ]).spread((rezDomain,rezIp)=>
                {
                    console.log(rezDomain);
                    console.log(rezIp);
                    if(rezDomain==null&&rezIp==null)
                    {
                        console.log(typeof ip);
                        domainRepository.create({
                            domain: domain,
                            ip: ip,
                            statusPay: false,
                            userId: userId
                        })
                        .then((data)=>resolve({status: "Domain registr"}))
                        .catch((data)=>{reject(data)});
                    }
                    else
                        reject("This domain or ip alreadi regist");
                })
            })
        }
        function pay(id,idUser)
        {
            return new Promise((resolve, reject) => {
                domainRepository.findById(id,{attributes:["userId","statusPay"]})
                .then(dmn=>{
                    console.log("1then:");
                    console.log(dmn);
                    if(dmn==null||dmn.userId!=idUser) throw ("User error or id domain");
                    else if(dmn.statusPay==true) throw("Already pay");
                    else{
                        console.log("fbi");
                        return userRepository.findById(idUser,{attributes:["id","money"]})
                    }
                })
                .then(user=>{
                    console.log("2then");
                    console.log(user);
                    if(user.money<cost) throw("not enough money");
                    else
                    {
                        Promise.all([
                            user.decrement({money: cost}),
                            domainRepository.update({statusPay: true},{where:{id: id}})
                        ]).spread((user,domain)=>{resolve({success:"true"})})
                    } 
                })
                .catch((err)=>{
                    console.log(err);
                    reject(err)});
            })
        }
    }

    return new DomainService(domainRepository, errors);
};