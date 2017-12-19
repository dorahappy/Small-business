var connect_mongo = require("../connect_mongo")
//获取轮播图信息

var ObjectID = require('mongoDB').ObjectID

const removeBanner = ({_id}, res)=>{
    connect_mongo((db)=>{
        db.collection('banners').remove({_id:ObjectID(_id)}, (err, results)=>{
            if(err) throw err;
            res.send('1')
        })
        db.close()
    })
   


}

module.exports = removeBanner






