
//连接数据库，传入回调函数来接收库对象
const connect_mongo = (callback)=>{
    var MongoClient = require('mongodb').MongoClient;
    
    // Connection URL
    var url = 'mongodb://10.9.166.56:27017/mall';
    // Use connect method to connect to the Server
    MongoClient.connect(url, function(err, db) {//db就是 mall库对象
        callback(db)
    
        // db.close();//断开连接
    });
}
module.exports = connect_mongo
