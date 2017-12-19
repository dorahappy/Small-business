var express = require('express');
var router = express.Router();
var connect_mongo = require("../modules/connect_mongo")
var async = require('async')
var ObjectID = require('mongodb').ObjectID;
/* GET home page. */
//当 index路由模块get到url为 
router.get('/', function(req, res, next) {
  //可以给前端返回一个ejs模板编译后的html，第一个参数为要响应的模板的名字，后面对象是渲染模板时使用的数据
  let results = {}
  //获取到轮播图数据后渲染index.ejs模板
  async.waterfall([
    function(next){
      connect_mongo((db)=>{
        next(null,db)
      })
    },
    function(db,next){
      db.collection('banners').find({}).toArray((err,banners)=>{//查找banner
        if(err) throw err;
        results.banners = banners
        next(null,db)
      })
    },
    function(db,next){
      db.collection('cla').find({}).toArray((err,classes)=>{//查找商品分类
        if(err) throw err;
        results.classes = classes
        next(null,db)
      })
    },
    function(db,next){
      db.collection('goods').find({classid:1}).limit(4).toArray((err,goods)=>{//查找对应的商品
        if(err) throw err;
        results.goods = goods
        next(null)
      })
      
    }
  ],function(){
    console.log(results)
    res.render('index',results)
  })





});

//进入登陆界面，渲染login.ejs
router.get('/login', function(req, res, next) {
  res.render('login', {  });
});


//进入注册界面，渲染register.ejs
router.get('/register',(req,res,next)=>{
    res.render('register',{  })
})


//进入列表界面，渲染list.ejs
router.get('/list',(req,res,next)=>{
  let results = {}
  async.waterfall([
    function(next){
      connect_mongo((db)=>{
        next(null,db)
      })
    },
    function(db,next){
      db.collection("goods").find({}).toArray((err,goods)=>{
        if(err) throw err;
        results.goods = goods
        next(null,db)
      })    
    },
    function(db,next){
      db.collection('cla').find({}).toArray((err,classes)=>{//查找商品分类
        if(err) throw err;
        results.classes = classes
        next(null,results)
      })
    }
  ],function(err,results){
    res.render('list',results)
  })
  
})


//进详情界面，渲染show.ejs
router.get('/show',(req,res,next)=>{
  let _id = req.query.id
  console.log("访问者ip:",req.connection.remoteAddress)
  console.log(_id)
  connect_mongo((db)=>{
    db.collection("goods").find({_id:ObjectID(_id)}).toArray((err,results)=>{
      if(err) throw err;

      res.render('show',{ good:results[0] })
    })
    db.close()    
  })
  
})


//进入购物车界面，渲染car.ejs
router.get('/cart', function(req, res, next) {
  let user_info = req.cookies.user_info?JSON.parse(req.cookies.user_info):''
  if(!user_info){
    res.render('cart',{results:'not login'})
    return ;
  }
  connect_mongo((db)=>{

    let cars = db.collection("carts")
    cars.find({uid:user_info.uid}).toArray((err,results)=>{
      if(err) throw err;
      if(!results.length||!results[0].goods.length){
        res.render('cart',{results:'not buy'})
      }else{
 
        
        let goods = results[0].goods
        

       console.time('temp')
        let goodscoll = db.collection("goods")
        let [allnum,allprice]=[0,0]
        goodscoll.find({}).toArray((err,results)=>{
            if(err) throw err;       
            goods=goods.map((item)=>{
              allnum+=item.num
              for(var i = 0;i<results.length;i++){
                if(results[i]._id==item.goodid){
                  item.imgurl = results[i].imgurl
                  item.name = results[i].name
                  item.price = results[i].price
                  allprice+=item.num*item.price
                  break;
                }
              }
              return item              
            })
            goods.allnum=allnum;
            goods.allprice=allprice
            res.render('cart',{results:goods})
            console.timeEnd('temp')
        })
        
        
        

      }

      db.close()
    })

  })

  
  
});




module.exports = router;
