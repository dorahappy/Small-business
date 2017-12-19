var connect_mongo = require("../connect_mongo")
var fs = require("fs")
//添加banner图片


const addBanner = ({title,imgdata},res)=>{
  console.log(imgdata)
  var base64Data = imgdata.replace(/^data:image\/\w+;base64,/, "");

  var dataBuffer = new Buffer(base64Data, 'base64');
  var reg = /\/(.+?);/g

  var ext = imgdata.match(reg)[0].replace('/','.').replace(';','')
  var time = Date.now()
  fs.writeFile("./public/images/banner/banner"+time+ext, dataBuffer, function(err) {
    if(err){
      console.log(err)
    }else{
      res.send("1");
    }

    connect_mongo(function(db){
      
      db.collection("banners").insertOne({img:'/images/banner/banner'+time+ext,title},(err,results)=>{
        if(err) throw err;
        res.send(results.ops)
      })

    })

  });



    

}

module.exports = addBanner






