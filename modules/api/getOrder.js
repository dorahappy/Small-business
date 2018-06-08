var connect_mongo = require("../connect_mongo")
//处理前台请求添加商品到购物车的操作

const addOrder = (res)=>{
    connect_mongo((db)=>{
      let goodscoll = db.collection("goods")
      let orders = db.collection("orders")
      orders.find({}).toArray((err,orders)=>{
        if(err) throw err
        let user = db.collection('user')
        let goods = db.collection('goods')
        user.find({}).toArray((err,results)=>{
            if(err) throw err;       
            orders=orders.map((item)=>{
              for(var i = 0;i<results.length;i++){
                if(results[i]._id==item.uid){
                  item.username = results[i].nickname
                  break;
                }
              }
              return item              
            })
        goods.find({}).toArray((err,results)=>{
            if(err) throw err;       
            orders=orders.map((item)=>{
              item.order.map(ord=> {
                ord.goods.map(good=> {
                  for(var i = 0;i<results.length;i++){
                    if(results[i]._id==good.goodid){
                      good.imgurl = results[i].imgurl
                      good.name = results[i].name
                      good.price = results[i].price
                      break;
                    }
                  }
                  return good
                })
                return ord
              })
              return item              
            })

          res.send(orders)
        })
      })
    })
  })
}

module.exports = addOrder;