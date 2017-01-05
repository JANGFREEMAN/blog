var User = require('../lib/mongo').User;

module.exports = {
    //新建用户
    create: function(user){
        return User.create(user).exec();
    },
    //查询用户
    findByName: function(name){
        return User.findOne({name:name}).exec();
    }
}
