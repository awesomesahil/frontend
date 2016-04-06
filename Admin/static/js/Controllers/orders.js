(function(){
var app= angular.module('ShopKare_Backend-master',[]);

var base="http://shopkare.com";
app.controller('orders', function($scope,$http){


var AdminType=localStorage.getItem("ShopkareAdminType");
console.log(AdminType);
if(AdminType=='Super Admin'){
$scope.AdminSuper=true;
}
else{
$scope.AdminSuper=false;
}



	$http.post(base+'/api/Admin/reterieveDeliveryBoys/')
	.success(function(data){
	console.log(data);      
       	$scope.deliveryBoys=data;
	 })
	.error(function(response){
	console.log(response);
	});	
	$http.post(base+'/api/Admin/FetchOrders/')
	.success(function(data){
	$scope.OrdersProducts=data;
	console.log(data);
	for(var i in $scope.OrdersProducts){
	$scope.OrdersProducts[i]['Status']="Fresh";
	}
	})
	.error(function(response){
	console.log(response);
	});

	$scope.db="None";
	
	
	$scope.dbOperation=function(order,dbBoy,index){
	
	console.log(order);
	console.log(dbBoy);
	
	$scope.OrdersProducts[index].Status='Pending';
	$scope.OrdersProducts[index].Delivery_Boy=dbBoy;	
	};

});


})();
