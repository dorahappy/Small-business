var connect_mongo = require("../connect_mongo")
//获取轮播图信息

const getBanner = (res)=>{
    connect_mongo((db)=>{
        db.collection('banners').find({}).toArray((err,banners)=>{//查找banner
            if(err) throw err;
            res.send(banners)
        })
        db.close()
    })
   


}

module.exports = getBanner






