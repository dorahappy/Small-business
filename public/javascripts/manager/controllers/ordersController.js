app.controller("ordersController",function($scope,_http){
  
    _http({
        url:'/manager/getOrder',
        success:function(results){
            $scope.orders = results
        }
    })

})