var connect_mongo = require("../connect_mongo")
//处理前台请求删除购物车商品的操作
const removeGood = ({uid,goodid},res)=>{
    //找到这个用户在carts集合里对应的文档
    connect_mongo((db)=>{
      let carts = db.collection("carts")
      carts.find({uid}).toArray((err,results)=>{
        if(err) throw err
          let ucar = results[0]   
          let  goods = ucart.goods
          for(var i =0;i<goods.length;i++) {
            if(goods[i].goodid==goodid){              
                goods.splice(i,1)
              break;
            }
          }
          //更新用户的购物车数据
          carts.update({uid},{$set:{goods:ucart.goods}},(err,results)=>{
            if(err) throw err;
            console.log(results)
              res.send('1')
          })
        })


    })


}

module.exports = removeGood



