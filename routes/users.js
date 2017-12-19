var express = require('express');
var router = express.Router();
var connect_mongo = require('../modules/connect_mongo')
var api_handler = require("../modules/api")
/* GET users listing. */
router.get('/', function(req, res, next){
  res.send('连接上了')
})

//  登陆路由 /users/login

router.get('/login', function(req, res, next) {
  //1.接收到前台get发送过来的数据
  let params = req.query

  //2. 连接mongodb数据库做判断
  connect_mongo((db)=>{
    api_handler.login(db,res,params)
  })
});


//注册 /users/register
router.post('/register', function(req, res, next) {
  //1.接收到前台post发送过来的数据
  let params = req.body
  //2. 连接mongodb数据库做判断
  connect_mongo((db)=>{
    api_handler.register(db,res,params)
  })
});

module.exports = router;
