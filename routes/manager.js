var express = require('express');
var router = express.Router();
var connect_mongo = require('../modules/connect_mongo')
var api_handler = require("../modules/api")
let ObjectID = require('mongodb').ObjectID
/* GET users listing. */

router.get('/', function(req, res, next) {
    res.render('manager/login')
});
router.get('/main', function(req, res, next) {
    res.render('manager/main')
});

router.get('/getBanner', function(req, res, next) {
    api_handler.getBanner(res)
});

router.get('/getOrder', function(req, res, next) {
    api_handler.getOrder(res)
});

router.get('/removeBanner', function(req, res, next) {
    let params = req.query
    api_handler.removeBanner(params, res)
});

router.post('/addBanner', function(req, res, next) {
    let params = req.body
    api_handler.addBanner(params, res)
});


router.get('/removeGood', function(req, res, next) {
    let params = req.query
    connect_mongo((db)=>{
        db.collection("goods").remove({_id:ObjectID(params._id)},(err)=>{
            if(err) throw err;
            res.send('1')
        })
        db.close()
    })
});

router.post('/addNewGood', function(req, res, next) {
    let params = req.body
    api_handler.addNewGood(params,res)
});

router.get('/getClasses', function(req, res, next) {
    console.log('getClasses')
    connect_mongo((db)=>{
        db.collection("cla").find({}).toArray((err,results)=>{
            if(err) throw err;
            console.log(results)
            res.send(results)
        })
    })
});
router.get('/addClasses', function(req, res, next) {
    let params = req.query
    connect_mongo((db)=>{
        db.collection("cla").insertOne({class:params.newclass,classid:parseFloat(params.classid)},(err,results)=>{
            if(err) throw err;
            res.send(results.ops)
        })
        db.close()
    })
});
router.get('/getGoodById', function(req, res, next) {
    let params = req.query
    connect_mongo((db)=>{
        db.collection("goods").find({_id:ObjectID(params._id)}).toArray((err,results)=>{
            if(err) throw err;
            res.send(results[0])
        })
        db.close()
    })
});
router.post('/updateGood', function(req, res, next) {
    let params = req.body
    api_handler.updateGood(params,res)
});

router.get('/login.do', function(req, res, next) {

let params = req.query
    
if(params.username=='dreamweaver'&&params.password=='123shangtian'){
        res.send('ok')
    }
});



module.exports = router;
