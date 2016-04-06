
var cMctrl = angular.module('courier_medicine', []);

cMctrl.controller('courierCtrl',['$scope','$http','$window',function($scope,$http,$window){
console.log("Controller");
var base="http://shopkare.com";
$scope.order={};
$scope.MedicineDetails={};

$scope.courierSubmission=function(){
  console.log($scope.order);
      $http.post(base+'/api/Customer/NewCourierOrder/?order='+JSON.stringify($scope.order))
      .success(function(response){
        $scope.MessageCourrierSuccess="Your Request has been Submitted";
	console.log(response);
        $scope.order={};
    })  
    .error(function(response){
      console.log(response);
        $scope.MessageCourrierError="Action Cant be Completed. Network Error";
    })

};

$scope.medi=function(){
console.log("function");  
};


}]);




    
    
   
 
 
   
  
   
   






 

          

 


