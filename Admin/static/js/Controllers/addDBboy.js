
(function() {
  var app = angular.module('ShopKare_Backend-master', []);
   // var base = 'http://127.0.0.1:55240';
   var base = 'http://shopkare.com';


	app.controller('DBboy_Store',function($scope,$http){

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
        $scope.deliveryBoys=data;
         })
        .error(function(response){
        console.log(response);
        });

	$scope.DBboy={};
	$scope.registerDBboyResult="";
	$scope.Store={};
	$scope.registerStore="";
	$scope.RMdbBoyMsg="";
	$scope.RMdbBoyMsgError="";
    
	  $scope.registerDeliveryBoy=function(){
	console.log($scope.DBboy);
        $http.post(base+'/api/Admin/DeliveryBoysignup/?user='+JSON.stringify($scope.DBboy))
        .success(function(response){
          console.log(response);
	$scope.registerDBboyResult=response;
        $scope.DBboy={};
	})
        .error(function(response){
          console.log(response);
	$scope.registerDBboyResult=response;
        });
      }; 
	
	$scope.regsterStore=function(){
	console.log($scope.Store);
	$http.post(base+'?user='+JSON.stringify($scope.Store))
	.success(function(response){
	console.log(response);
	$scope.registerStore=response;
	$scope.Store={};
	})
	.error(function(response){
	console.log(response);
	$scope.registerStore=response;
	});
	};

	$scope.removeDBboy=function(id){
	console.log(id);
	$http.post(base +'Url?user='+id._id)
	.success(function(response){
	console.log(response);
	var x=$scope.deliveryBoys.indexOf(id);
	$scope.deliveryBoys.splice(x,1);
	$scope.RMdbBoyMsg="Removed";
	$scope.RDBboy="";
	})
	.error(function(response){
	console.log(response);
	$scope.RMdbBoyMsgError="Action Cant be Completed..!! Network Error";
	});
	
	}

});




})();
