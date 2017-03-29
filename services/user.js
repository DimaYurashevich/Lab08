var bcrypt = require('bcryptjs');
const saltRounds = 10;
const Promise = require('bluebird');
module.exports = (userRepository, errors) => {
    const BaseService = require('./base');
    const config = require('../config.json');
    Object.setPrototypeOf(UserService.prototype, BaseService.prototype);

    function UserService(userRepository, errors) {
        BaseService.call(this, userRepository, errors);

        var self = this;

        self.updateUser = updateUser;
        self.readAllUser=readAllUser;
        self.deleteUser=deleteUser;
        self.readUser=readUser;

        function updateUser(id,idUser,data) {
            return new Promise((resolve, reject) => {
                if(id!=idUser) reject(errors.accessDenied)
                else {
                    bcrypt.hash(data.password, saltRounds, function(err, hash) {
                    if (err) {
                        throw err;
                    }
                    self.baseUpdate(id, {password: hash})
                        .then(resolve).catch(reject);
                    })
                }
            })
        }
        function readAllUser()
        {
            return new Promise((resolve, reject) => {
                userRepository.findAll({attributes: ['id','login']})
                .then(users=>resolve({user: users}))
                .catch(reject);
            });
        }
        function deleteUser(id, idUser)
        {
            return new Promise((resolve, reject) => {
                if(id!=idUser) throw (errors.accessDenied)
                else{
                    console.log("delllll");
                    self.delete(id)
                    .then(data=>resolve(data))
                    .catch(reject);
                }
            })
        }
        function readUser(id, idUser)
        {
            console.log(id);
            return new Promise((resolve, reject) => {
                var param;
                if(id==idUser) param =['id','login','money','createdAt'];
                else param =['id','login','createdAt'];
                userRepository.findById(idUser,{attributes: param})
                .then(user=>resolve(user))
                .catch(reject);
            })
        }
    }

    return new UserService(userRepository, errors);
};