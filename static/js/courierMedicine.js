var cMctrl = angular.module('courier_medicine', []);

cMctrl.controller('courierCtrl',['$scope','$http','$window',function($scope,$http,$window){
console.log("Controller");
$scope.CourierDetails={};
$scope.MedicineDetails={};
$scope.checkPassword=function(){
  if($scope.CourierDetails.Password==$scope.password2){
      $scope.PasswordMsg="";
  }
  else{
    $scope.PasswordMsg="Password Doesnt Match";
  }
}

$scope.courierSubmission=function(){
  if($scope.CourierDetails.Password==$scope.password2){
  console.log($scope.CourierDetails);
      $http.post('url')
      .success(function(response){
        $scope.MessageCourrierSuccess="Your Request has been Submitted";
        $scope.CourierDetails={};

    })  
    .error(function(response){
      console.log(response);
        $scope.MessageCourrierError="Action Cant be Completed. Network Error";
    })
  
  }
  else{
    $scope.PasswordMsg="Password Doesnt Match";
  }
  
};

$scope.medi=function(){
console.log("function");  
};


}]);




    
    
   
 
 
   
  
   
   






 

          

 

