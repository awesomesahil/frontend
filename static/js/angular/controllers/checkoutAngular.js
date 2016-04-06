var app7=angular.module('CheckoutHandler',[]);


app7.controller('checkout',['$scope','$http','$window','$rootScope',function($scope,$http,$window,$rootScope){
      $scope.messageEmptyCart=false;
      $scope.checkoutMessage=false;
      $scope.order={};
      var storedData =localStorage.getItem("product");
        if(storedData){
          $scope.order.CartProducts=[];
          $scope.order.CartProducts.push(JSON.parse(storedData));
          $scope.messageEmptyCart=false;
           $scope.acTiveButton=true;
           $scope.TotalPrice=0;
          for(var i in $scope.order.CartProducts){
           for(var x in $scope.order.CartProducts[i]){             
              $scope.TotalPrice=$scope.TotalPrice+($scope.order.CartProducts[i][x][3] * $scope.order.CartProducts[i][x][5]);        
              }
           }
        }

        else{
         $scope.messageEmptyCart=true; 
        }

      $scope.checkOutFunction=function(){
        console.log("function called");
           localStorage.removeItem("product");
		$rootScope.COUNTcartItems=0;

        $scope.checkoutMessage=true;
      }

}]);
