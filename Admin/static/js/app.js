(function() {
	console.log("aPP Js");
  var app = angular.module('ShopKare_Backend-master', []);
//   var base = 'http://127.0.0.1:5000';
  var base = 'http://shopkare.com';
  //survey form controller
  app.controller('survey_data' , ['$scope','$http', function ($scope,$http){
    
    $scope.s_data={};
    
    $scope.postSurveyData=function(){
  		 $http.post("URL ADDRESS",$scope.s_data)
		  .success(function(data, status, headers, config){
            console.log("inserted Successfully");
        });
  	}; 
  }]);


   //Login controller
  app.controller('login_data' , ['$scope','$http', '$window', function ($scope,$http, $window){
    
    $scope.l_data={
      "Mobile": "",
      "Email": "",
      "Password": ""
    };

    $scope.loginData=function(id){
console.log(id);
if(id =='Super Admin'){
localStorage.setItem("ShopkareAdminType", "Super Admin");
}
else{
localStorage.setItem("ShopkareAdminType", "Normal Admin");
}     
 $http.post(base + '/api/Admin/login/?user='+ JSON.stringify($scope.l_data)+'&adminType='+id)
       .success(function(response){
	  if (response.response == 'Login Successfull')
	  {
	    console.log('Logged in');
	    $window.location.href=base+'/Admin/static/products.html';
	  }
	 $scope.reply=response.response;
      })
       .error(function(error){
	console.log(error);
console.log("scsc");	 
$scope.reply=error.response;
      });
 


   }; 
   }]);


   //Register controller
  app.controller('register_data' , ['$scope','$http', '$window', function ($scope, $http, $window){
    
    $scope.register={
        "Email":" ",
        "Name" :"",
        "Mobile":"",
        "Password": ""
    };
         $scope.response='';
    $scope.registerData=function(){
       var user=JSON.stringify($scope.register);
      console.log(JSON.stringify($scope.register));
      $http.post(base+'/api/Admin/signup/?secretkey=' +$scope.secretkey+'&user='+user)
      .success(function(response){
	$scope.response = response;
	if (response == 'Registration Successfull')
	{
	  alert(response);
	  $window.location.href = base + "/Admin/static/signup.html";
	}
      })
      .error(function(error){
	console.log(error);
      })
      ;
    }; 
  }]);

app.controller('ShowAllP',['$scope','$http', function($scope,$http){
console.log("Sjow all");

$http.get(base +'/api/Product/getAllProducts/?level1category=Grocery')
.success(function(data){
console.log(data);
$scope.AllProducts=data;
console.log(JSON.parse(JSON.stringify(data)));

 })
.error(function(response){

console.log(response);
});

}]);



     
})();
