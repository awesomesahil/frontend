var app9=angular.module('ProductsHandler',['FactoryHandler']);

var base="http://shopkare.com";
app9.controller('HOT_DEALS',['$scope','$http','$rootScope',function($scope,$http,$rootScope){
$http.get(base+'/api/Product/getRandomProducts/?level1category=Grocery')
.success(function(data){
$scope.HotDeals=data;i

    for(var i in $scope.HotDeals){
        $scope.HotDeals[i]['cart']=[];
	$scope.HotDeals[i]['cartQty']=[]; 
        var QArray=JSON.parse(JSON.stringify($scope.HotDeals[i].Quantity));
        var Qarray=QArray[0].Quantities;

                for(var z in Qarray){
                 $scope.HotDeals[i]['cart'].push("Add to Cart");
               $scope.HotDeals[i]['cartQty'].push(1);
		 }
          }



})
.error(function(response){
console.log(response);
});



$http.get(base+'/api/Product/getRandomProducts/?level1category=Grocery')
.success(function(data){
$scope.Featured_Products=data;


    for(var i in $scope.Featured_Products){
        $scope.Featured_Products[i]['cart']=[];
	$scope.Featured_Products[i]['cartQty']=[];
         var QArray=JSON.parse(JSON.stringify($scope.Featured_Products[i].Quantity));
        var Qarray=QArray[0].Quantities;

                for(var z in Qarray){
                 $scope.Featured_Products[i]['cart'].push("Add to Cart");
		$scope.Featured_Products[i]['cartQty'].push(1); 
              }

          }

})
.error(function(response){
console.log(response);
});


$http.get(base+'/api/Product/getRandomProducts/?level1category=Grocery')
.success(function(data){
$scope.New_Products=data;


    for(var i in $scope.New_Products){
        $scope.New_Products[i]['cart']=[];
	$scope.New_Products[i]['cartQty']=[];
         var QArray=JSON.parse(JSON.stringify($scope.New_Products[i].Quantity));
        var Qarray=QArray[0].Quantities;

                for(var z in Qarray){
                 $scope.New_Products[i]['cart'].push("Add to Cart");
        	$scope.New_Products[i]['cartQty'].push(1);     
	 }
          }

})
.error(function(response){
console.log(response);
});





$scope.addCart=function(id,k,Product){
        var cartItem={};
	var Pcategory=[];
	var index=0;
        console.log(id,k); 
	switch(Product){
	case 'HotDeals':
		Pcategory=$scope.HotDeals;
		index=$scope.HotDeals.indexOf(id);
		break;
	case 'New_Products':
		Pcategory=$scope.New_Products;
		index=$scope.New_Products.indexOf(id);
		break;
	case 'Featured_Products':
		Pcategory=$scope.Featured_Products;
		index=$scope.Featured_Products.indexOf(id);
		break;
	case 'McategoryProducts':
		Pcategory=$scope.McategoryProducts;
		index=$scope.McategoryProducts.indexOf(id);
		break;
	}
	console.log(Product,index);
	 cartItem=id;
     //   cartItem["QuantityType"]=id.Quantity[0].Quantities[k][0];
   //     cartItem["Price"]=id.Quantity[0].Quantities[k][1];
 //       cartItem["QuantityIndex"]=k;
//        cartItem["cartQuantity"]=id.cartQty[k];
        console.log(cartItem);

        $http.post(base+'/api/Customer/addToCart/?cartItem='+JSON.stringify(cartItem))
	 .success(function(data){
        console.log(data);
        
	Pcategory[index].cart[k]="Added in Your Cart";
        })
        .error(function(response){
        console.log(response);
        })

        $rootScope.COUNTcartItems=$rootScope.COUNTcartItems+1;
        };


$scope.clickAction=false; 

$http.get(base+'/api/Product/getRandomProducts/?level1category=Grocery')
.success(function(data){
	$scope.McategoryProducts=data;

         for(var i in $scope.McategoryProducts){
        $scope.McategoryProducts[i]['cart']=[] ;
	$scope.McategoryProducts[i]['cartQty']=[];
         var QArray=JSON.parse(JSON.stringify($scope.McategoryProducts[i].Quantity));        
        var Qarray=QArray[0].Quantities;

                for(var z in Qarray){
                 $scope.McategoryProducts[i]['cartQty'].push(1);
		$scope.McategoryProducts[i]['cart'].push("Add to Cart");
              
		}
          }

	$scope.NEW_Products=$scope.McategoryProducts;
	console.log($scope.McategoryProducts);
})
.error(function(response){
	console.log(response);
});


$scope.getProducts=function(id){
  console.log(id);
  if(id=='NewProduct'){
	$scope.clickAction=false;
	$scope.McategoryProducts=$scope.NEW_Products;
 	console.log($scope.McategoryProducts);
  } 
  else{
	$scope.clickAction=true;
	$http.get(base+"/api/Product/getRandomMainCategoryProducts/?level1category=Grocery&mainCategory="+id)
  	.success(function(data){
    	console.log(data);
   	 $scope.McategoryProducts=data;
    

	 for(var i in $scope.McategoryProducts){
        $scope.McategoryProducts[i]['cart']=[];
	$scope.McategoryProducts[i]['cartQty']=[];
         var QArray=JSON.parse(JSON.stringify($scope.McategoryProducts[i].Quantity));
        var Qarray=QArray[0].Quantities;

                for(var z in Qarray){
                 $scope.McategoryProducts[i]['cart'].push("Add to Cart");
		$scope.McategoryProducts[i]['cartQty'].push(1);
               }

          }


	})
  	.error(function(response){
    	console.log(response);
 	 });
  }
};

$scope.loginError=function(){
$rootScope.LOGINFIRSTMSG="To Continue You Have to Login First";
}

}]);
