
//处理登陆操作的函数，第一个参数是库对象，第二个是响应对象，第三个是参数
const login = (db,res,params)=>{
    //获取到对应的集合collection
    let users = db.collection('user')
    //从users里查找username为params.username且password为params.password数据，并转换成数组
    users.find({username:params.username,password:params.password}).toArray((err,results)=>{
        if(err) throw err;
        if(results.length){//判断有没有此用户
          res.send({uid:results[0]._id,nickname:results[0].nickname})//express会处理为字符串
        }else{
          res.send('0')
        }

        db.close()//断开数据库连接
    })
}

module.exports = login