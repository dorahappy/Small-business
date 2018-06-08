var connect_mongo = require("../connect_mongo")
//处理前台请求添加商品到购物车的操作

const addGood = ({uid,goodid,num},res)=>{
    //找到这个用户在carts集合里对应的文档
    num = parseFloat(num)
    connect_mongo((db)=>{
      let carts = db.collection("carts")
      carts.find({uid}).toArray((err,results)=>{
        if(err) throw err
        if(!results.length){//在cars集合里没有此用户的文档
          //创建一个文档放入
          carts.insertOne({uid:uid,goods:[{goodid,num:num?num:1}]},(err,results)=>{
            if(err) throw err;
              res.send('1')
          })

        }else{//如果有这个用户的文档
          let ucart = results[0]    
          let isHas = false  
          ucart.goods=ucart.goods.map((item,i)=>{
              if(item.goodid==goodid){
                isHas = true
                item.num+=num?num:1
              }
              return item
          })
          if(!isHas){
            ucart.goods.push({goodid,num:num?num:1})
          }
          //更新用户的购物车数据
          carts.update({uid},{$set:{goods:ucart.goods}},(err,results)=>{
            if(err) throw err;
            console.log(results,"aaaa")
              res.send('1')
          })
        }
        
      })

    })


}

module.exports = addGood






