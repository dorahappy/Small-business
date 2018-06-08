

var app = angular.module("app",['ui.router','service'])

app.config(['$stateProvider', '$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.when("",'/main')
    $stateProvider.state('main', {
        url:'/main',
        templateUrl: '../../template/main.html',
        controller:'navController'
    }).state('banner', {
        url:'/banner',
        templateUrl: '../../template/banner.html',
        controller:'bannerController'
    }).state('goods', {
        url:'/goods',
        templateUrl: '../../template/goods.html',
        controller:"goodsController"
    }).state('orders', {
        url:'/orders',
        templateUrl: '../../template/orders.html',
        controller:"ordersController"
    })
}])