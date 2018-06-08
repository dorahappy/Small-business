var connect_mongo = require("../connect_mongo")
//处理前台请求添加商品到购物车的操作

const addOrder = ({uid,address,phone,name},res)=>{
    connect_mongo((db)=>{
      let carts = db.collection("carts")
      let orders = db.collection("orders")
      let goods = []
      carts.find({uid:uid}).toArray((err,cart)=>{//查找banner
          if(err) throw err;
          goods = cart[0]["goods"]
      })
      orders.find({uid}).toArray((err,results)=>{
        if(err) throw err
        if(!results.length){//在orders集合里没有此用户的文档
          //创建一个文档放入
          orders.insertOne({uid:uid,order:[{goods, address, phone, name}]},(err,results)=>{
            if(err) throw err;
              res.send('1')
          })

        }else{//如果有这个用户的文档
          let uorder = results[0]  
            uorder.order.push({goods,address,phone,name})
          //更新用户的订单数据
          orders.update({uid},{$set:{order:uorder.order}},(err,results)=>{
            if(err) throw err;
              res.send('1')
          })
        }
        

    })
  })
}

module.exports = addOrder;