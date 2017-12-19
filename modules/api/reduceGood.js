var connect_mongo = require("../connect_mongo")
//处理前台请求减少购物车商品的操作
const reduceGood = ({uid,goodid,num},res)=>{
    //找到这个用户在cars集合里对应的文档
    num = parseFloat(num)
    connect_mongo((db)=>{
      let carts = db.collection("carts")
      carts.find({uid}).toArray((err,results)=>{
        if(err) throw err
          let ucart = results[0]   
          let  goods = ucart.goods
          for(var i =0;i<goods.length;i++) {
            if(goods[i].goodid==goodid){
              goods[i].num--;
              if(goods[i].num==0){
                goods.splice(i,1)
              }
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

module.exports = reduceGood



