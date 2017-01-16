module.exports = {
  port: 3000,
  session: {
    secret: 'myblog',
    key: 'myblog',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/myblog'
  // mongodb: 'mongodb://zhangyx:freeman111@ds111529.mlab.com:11529/myblog'
};
