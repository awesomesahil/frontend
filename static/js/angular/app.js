var app = angular.module('Shopkare', ['ui.router','courier_medicine','HeaderOperation','CartHandler','CheckoutHandler','ProductsHandler','FactoryHandler']);

    app.config(function($stateProvider, $urlRouterProvider) {
         $urlRouterProvider.otherwise('/main/home');

         $stateProvider
         .state('app',{
          url:'/app',
          templateUrl:'templates/index1.html'
         })
        .state('/courier',{
          url:'/courier',
          templateUrl:'templates/courier.html',
	  controller:'courierCtrl'	 
	 })
        .state('/medicines',{
          url:'/medicines',
          templateUrl:'templates/medicine.html',
      	 controller:'courierCtrl'
           })
         .state('main',{
          url:'/main',
          templateUrl:'templates/main.html'
         })
         .state('main.slider',{
          url:'/slider',
          views:{
            'slider':{
            templateUrl:'templates/slider.html'
              }
            }
           })
       
         .state('main.leftAdd',{
          url:'/adds',
          views:{
            'leftAdd':{
              templateUrl:'templates/leftAdds.html'    
            }
          }
         })
         
         .state('main.indexProd',{
          url:'/productsIndex',
          views:{
            'indexProducts':{
              templateUrl:'templates/indexProduct.html'    
            }
          },
          controller:'indexProducts'
         })


         .state('main.home',{
          url:'/home',
          views:{
            'leftAdd':{
              templateUrl:'templates/leftAdds.html'    
            },
            'slider':{
                templateUrl:'templates/sliderPrev.html'    
            },
            'indexProducts':{
              templateUrl:'templates/indexProduct.html'
            }
          },
         })

         .state('main.products',{
          url:'/products',
          views:{
            'slider':{
              templateUrl:'templates/shop.html'
            },
            'menuOtherOption':{
              templateUrl:'templates/menuBottom.html'
            }
          }
         })

	  .state('main.search',{
          url:'/search',
          views:{
            'slider':{
              templateUrl:'templates/shop.html'
         	   }
              }
       	   })

	 .state('main.pdetails',{
            url:'/pdetails/:pID',
            views:{
              'slider':{
                templateUrl:'templates/productdetails.html'
              }
            },
           
	   controller: function($scope, $http,$stateParams,cartService,$rootScope) {
            $scope.initialImage=0;
            var p = $stateParams.pID;
            $scope.ProductDT=JSON.parse(p);

              $scope.changeImage=function(id){
                $scope.initialImage=id;
              }
         

	$scope.addCart=function(id,k){
        var cartItem={};
        console.log(id,k);
        cartItem=id;
	
        cartItem["QuantityType"]=id.Quantity[0].Quantities[k][0];
        cartItem["Price"]=id.Quantity[0].Quantities[k][1];
        cartItem["QuantityIndex"]=k;
        cartItem["cartQuantity"]=id.cartQty[k];
        console.log(cartItem);

        $http.post(base+'/api/Customer/addToCart/?cartItem='+JSON.stringify(cartItem))
        .success(function(data){
        console.log(data);
        $scope.ProductDT.cart[k]="Added in Your Cart";
        })
        .error(function(response){
        console.log(response);
        })

        $rootScope.COUNTcartItems=$rootScope.COUNTcartItems+1;
        };

$scope.loginError=function(){
$rootScope.LOGINFIRSTMSG="To Continue You Have to Login First";
}


	     $scope.addQuantity=function(index){
		$scope.ProductDT.cartQty[index]++;
	    };
		
		$scope.subQuantity=function(index){
		$scope.ProductDT.cartQty[index]--;
		};

            }
             
          })
/*         .state('main.menu.home',{
          url:'/home',
          views:{
            'hotdeals':{
                templateUrl:'templates/hotdeals.html'    
            },
            'categorywise':{
              templateUrl:'templates/bestcategoryProducts.html'
            },
            'featured':{
              templateUrl:'templates/featured.html'
            },
            'recommended':{
              templateUrl:'templates/recommended.html'
            }
          }
        })  */
         .state('checkout',{
          url:'/checkout',
          templateUrl:'templates/checkout.html'
         })
         .state('cart',{
          url:'/cart',
          templateUrl:'templates/cart.html'
         })
         .state('contactus',{
          url:'/contactus',
          templateUrl:'templates/contact-us.html'
         })
         /* .state('product',{
          url:'/product',
          templateUrl:'templates/shop.html'
         })
          .state('product.menu',{
          url:'/a',
          templateUrl:'templates/rightmenu.html'
         }) */
       });











    
    
   
 
 
   
  
   
   






 

          

 

