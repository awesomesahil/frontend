var app2=angular.module('HeaderOperation',['FactoryHandler']);

app2.controller('HEADctrl',['$scope','$state','$http','$window','cartService','$rootScope',function($scope,$state,$http,$window,cartService,$rootScope){

$scope.ldata={};
$scope.rdata={};
$scope.messageLogin="";
//   var base = 'http://127.0.0.1:5000';

var base = 'http://shopkare.com';
$scope.login=false;
$scope.ProdtmessageError=true;
$scope.CartProductsCheck=true;
$rootScope.COUNTcartItems=0;
$rootScope.COUNTcartItems=cartService.cartQuantity();

var userData = localStorage.getItem("SHOPKAREuser");
if (JSON.parse(userData)){
  y= JSON.parse(userData);
  $scope.login=true;
}

// Retrieve Categories

//var p=cartService.allCategories();
//console.log(p);
$scope.level1Categories=[];
var categories = [];
var level1keys= [];
$scope.level2CategoriesWTF=[];
$scope.level2Categories=[];
$scope.level3Categories=[];   
  
    

  $http.post(base+'/api/Admin/reteriveCategories/')
    .success(function(data){
              categories = data;
              level1keys = Object.keys(data)
              for (key in level1keys)
              {
                level1keys[key] = data[key]._id;
                if(data[key]._id=='Grocery'){
                   $scope.level1Categories.push(data[key]._id); 
                   var obj=data[key].Categories;
                  for(x in obj){
                       result = Object.keys(obj[x]); 
                       var z=obj[x];
                       for(var t in z){
                           $scope.level3Categories.push(z[t]);
                       }
                       $scope.level2Categories.push(result[0]);
                  }         
                }
              }
              for (var z in $scope.level2Categories){
                $scope.level2CategoriesWTF.push(($scope.level2Categories[z].replace(/\s/g,'')));
              }
             $scope.categories = categories;
      })
  .error(function(err){
      console.log(err);
  });



    


      $scope.searchOperation=function(){
	var level1category="Grocery";
        console.log($scope.searchKey);
	$http.get(base+'/api/Product/searchProduct/?level1category='+level1category+'&query='+$scope.searchKey)
	.success(function(data){
	$scope.products=data;	
	 console.log(data);
	if($scope.products.length>0){
		$scope.ProdtmessageError=false;

       for(var i in $scope.products){
                 $scope.products[i]['cart']=[];
     	         $scope.products[i]['cartQty']=[];
       	 var QArray=JSON.parse(JSON.stringify($scope.products[i].Quantity));                var Qarray=QArray[0].Quantities;
                for(var z in Qarray){
                 $scope.products[i]['cart'].push("Add to Cart");
                 $scope.products[i]['cartQty'].push(1);
                 }
		}
	   }
	else {
		$scope.ProdtmessageError=true;	
        	$scope.searchKey="";
	   }
	})
	.error(function(response){
	console.log(response);
	});

 }







        $scope.postldata=function(){
       
        $scope.ldata['Mobile']="";
        console.log(JSON.stringify($scope.ldata));
        $http.post(base+'/api/Customer/login/?user='+JSON.stringify($scope.ldata))
        .success(function(response){
          console.log(response);
          console.log($scope.ldata);
          $scope.messageLogin=response; 
          if(response=='Login Success'){
            $scope.login=true;
		$scope.LOGINFIRSTMSG="";
            localStorage.setItem("SHOPKAREuser",  JSON.stringify($scope.ldata));
            if(localStorage.setItem("SHOPKAREuser",  JSON.stringify($scope.ldata))){
            $window.location.href = 'home.html';
          return true;
          }         
        }
        })
        .error(function(response){
          console.log(response);
        });
      };



      $scope.postrdata=function(){
        $scope.messageSignUP="";
         $scope.messagePASSWORD="";
        if($scope.rdata.Password != $scope.password2){
          $scope.messagePASSWORD="Password Doesnt match..!! Try Again";
          return false;
        }
        $http.post(base+'/api/Customer/signup/?user='+JSON.stringify($scope.rdata))
        .success(function(response){
          console.log(response);
          $scope.messageSignUP=response;
          $scope.login=true;
        })
        .error(function(response){
          console.log(response);
        });
      };



      $scope.logOUT=function(){
        $http.get(base+'/api/Customer/logout')
        .success(function(response){
          console.log(response);
          $scope.messageLOGOUT=response;
          localStorage.removeItem("SHOPKAREuser");
          alert(response);
          $scope.login=false;
          $scope.ldata={};
          $scope.rdata={};
          $scope.messageLogin="";
          $scope.messageSignUP="";
            
         })
        .error(function(response){
          console.log(response);
        });

      };





        $scope.GETProducts=function(c1,c2){
          var category1=c1;
	$scope.searchKey="";
          var category2=c2;
          $scope.products=[]; 

        $http.get("http://shopkare.com/api/Product/getCategoryProducts/?level1Category=Grocery&MainCategory="+category1+"&SubCategory="+category2)
        .success(function(response){
	console.log(response);
          $scope.Pindex=0;  
	console.log(response.length);    
      $scope.prodt=response;
          if(response.length>0){

            for(var i in $scope.prodt){
	$scope.prodt[i]['cart']=[];
	$scope.prodt[i]['cartQty']=[];
	 var QArray=JSON.parse(JSON.stringify($scope.prodt[i].Quantity));           
        var Qarray=QArray[0].Quantities;

                for(var z in Qarray){
                 $scope.prodt[i]['cart'].push("Add to Cart");
              	 $scope.prodt[i]['cartQty'].push(1);
		 }

            $scope.products.push($scope.prodt[i]);  
          }
        
               $scope.ProdtmessageError=false;
          }

          else{
            $scope.ProdtmessageError=true;
          }
          
          if($scope.products.length>0){
              $scope.NO_PAGES=[];
              var x=$scope.products.length/18;
              if(x % 1 != 0){
                x=parseInt(x);
                x++;
                  console.log(x); 
                for(var z=0; z<x; z++){
                 $scope.NO_PAGES.push(z);   
                }
              }
            }
       
        })
        .error(function(response){
          console.log(response);
        });
      };


$scope.loginError=function(){
$rootScope.LOGINFIRSTMSG="To Continue You Have to Login First";
}
	


$scope.NormalLogin=function(){
$scope.LOGINFIRSTMSG="";
}
	
 $scope.addQuantity=function(id,k){
 var x=$scope.products.indexOf(id);
 console.log(x);
 $scope.products[x].cartQty[k]=$scope.products[x].cartQty[k]+1;

}

$scope.subQuantity=function(id,k){
 var x=$scope.products.indexOf(id);
 $scope.products[x].cartQty[k]--;
}



 $scope.pdetail=function(id){
        console.log(id);
        $state.go('main.pdetails',{pID:JSON.stringify(id)});
      }



        $scope.setIndexp=function(id){

            console.log(id);
            $scope.Pindex=id*18;
            console.log($scope.Productsindex);
        }

$scope.addCart=function(id,k){ 
	var cartItem={};
	console.log(id,k);
	cartItem=id;
	cartItem["QuantityType"]=id.Quantity[0].Quantities[k][0];
	cartItem["Price"]=id.Quantity[0].Quantities[k][1];       
	cartItem["QuantityIndex"]=k;
	cartItem["cartQuantity"]=id.cartQty[k];
	cartItem["ProductID"]=id._id;
		console.log(cartItem);
        
	$http.post(base+'/api/Customer/addToCart/?cartItem='+JSON.stringify(cartItem))
	.success(function(data){
	console.log(data);	
	for(var i in $scope.products){
            if (id.product_name == $scope.products[i].product_name) {
            $scope.products[i].cart[k]="Added in Your Cart";
          }
        }
	})
	.error(function(response){
	console.log(response);
	})
	
        $rootScope.COUNTcartItems=$rootScope.COUNTcartItems+1;
        };


}]);
