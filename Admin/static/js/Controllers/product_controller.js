(function(){

var app=angular.module('ShopKare_Backend-master',[]);
  var base = 'http://shopkare.com';



  var categories = [];
  var level1keys= [];
   app.controller('AppCTRL',['$scope','$http', '$window',function($scope, $http, $window){
	$scope.OptionsProduct=['Available','Coming Soon','Out of Stock'];
  
var AdminType=localStorage.getItem("ShopkareAdminType"); 
console.log(AdminType);
if(AdminType=='Super Admin'){
$scope.AdminSuper=true;
}
else{
$scope.AdminSuper=false;
}


	$scope.editD={};
	  console.log('App control');
     $http.post(base+'/api/Admin/reteriveCategories/')
 	.success(function(data){
 	  categories = data;
	  console.log()
	  level1keys = Object.keys(data)
	  for (key in level1keys)
	  {
	    level1keys[key] = data[key]._id;
	    console.log(data[key]._id);
	  }
	  
	  $scope.categories = categories;
	  console.log(data);
 	})
 	.error(function(err){
 	  console.log(err);
 	});
	$scope.mainCategories = [];
	$scope.MAINCATEGORY="";
	$scope.subcategories=[];
	$scope.SUBCATEGORY="";
    $scope.selectLevel1Category = function()
    {
      $scope.mainCategories=[];
      var a = JSON.parse($scope.l1category);
      $scope.MainCategories = a.Categories; 
//       console.log(a.Categories);
      $scope.level1keys = Object.keys(a.Categories);
      
// 	console.log(Object.keys(a.Categories[]));
	for (key in $scope.level1keys)
	{
	  $scope.mainCategories.push(Object.keys(a.Categories[key])[0]);
	}
	//console.log($scope.mainCategories);
    };
    
    $scope.selectmainCategory = function(){
     
      $scope.subcategories = JSON.parse($scope.l1category).Categories[$scope.mainCategory];
      $scope.MAINCATEGORY=$scope.mainCategories[$scope.mainCategory];
      console.log($scope.MAINCATEGORY);
      var mainCategory = $scope.mainCategories[$scope.mainCategory]; 
	console.log($scope.subcategories[mainCategory]);
      $scope.subcategories = $scope.subcategories[mainCategory];
//       console.log(Object.keys(a.Categories[key])[0]); 
    };
    $scope.selectsubcategories=function(){
      $scope.SUBCATEGORY=$scope.subcategories[$scope.subcategoryindex];
      $scope.getProducts();
      console.log($scope.SUBCATEGORY);
      
      
    };
    $scope.getproducts = function()
    {
      var id = level1keys.indexOf(JSON.parse($scope.l1category)._id).toString() + $scope.mainCategory.toString() + $scope.subcategoryindex.toString();
      console.log(id);
    };
    
    $scope.RemoveBatch = function(index)
    {
      console.log($scope.Batches[index]['_id']);
      $http.post(base + '/api/Admin/removeBatch/?pid='+$scope.p_id+'&bid='+$scope.Batches[index]['_id'])
      .success(function(response){
	alert(response);
	$window.location.href = base + "/Admin/static/batches.html";
      })
      .error(function(error){
	$scope.removeReply = 'Unable to Remove Try again later';
	console.log(error);
      });
    };
    
   $scope.getProducts=function(){
    
    $http.get("http://shopkare.com/api/Product/getCategoryProducts/?level1Category=Grocery&MainCategory="+$scope.MAINCATEGORY+"&SubCategory="+$scope.SUBCATEGORY)
	.success(function(response){
	$scope.ImageDATA=response;
	})
	.error(function(response){
	console.log(response);
	})
	 $http.post("/api/admin/getProducts/?maincategory="+$scope.MAINCATEGORY+"&subcategory="+$scope.SUBCATEGORY)
     .success(function(response) {
      $scope.products=response;
              
     })
     .error(function(error){
       $scope.error=error;
    });
   };
   
   
   $scope.delete_Product=function(index){
    console.log(JSON.stringify($scope.products[index]));
    $http.post("/api/Admin/removeProduct/?product="+JSON.stringify($scope.products[index]))
    .success(function(response){
      alert(response);
	if(response == 'Removed')
	{
	  $window.location.href=base+"/Admin/static/products.html";
	}
    })
    .error(function(response){
      console.log(response);
	alert(response);
    });
  };  
  
  
     $scope.selectproducts=function(){
       $scope.product=$scope.products[$scope.productindex];
       console.log($scope.product);
       $scope.quantityBatchUse=JSON.parse(JSON.stringify($scope.products[$scope.productindex].Quantity[0].Quantities));
 console.log($scope.quantityBatchUse);
      $scope.qtyBatchUse=[];
	console.log($scope.quantityBatchUse.length); 
	console.log($scope.quantityBatchUse);
     for(var z in $scope.quantityBatchUse){
          $scope.qtyBatchUse.push($scope.quantityBatchUse[z][0]);
   }



        var x=$scope.productindex;
   console.log(x);
   $scope.p_id=$scope.products[x]._id;  
    console.log($scope.p_id);
   
     };
  
  //Batch fuctions
   $scope.post_batch_data=function(){
     $http.post(base+"/api/Admin/addatch/?pid="+$scope.p_id+"&Batch="+JSON.stringify($scope.Batch_data))
     .success(function(data){
       $scope.BatchReply = data;
    })
     .error(function(data){
       console.log(data);
    });
     
    };
  
 
    
    $scope.getBatches=function(){
	  $http.post(base+"/api/Admin/reteriveBatches/?pid="+$scope.p_id)
	  .success(function(data){
	    console.log(data);
	    $scope.Batches=data;
	  })
	  .error(function(data){
	    console.log(data);
	  });
	
      };
   
	$scope.set_edit=function(product,index){
	console.log(product);
	console.log(index);
	$scope.edit=product;
	$scope.editIndex=index;
};
 

   $scope.getFileDetails = function (e) {

            $scope.files = [];
            $scope.$apply(function () {

                // STORE THE FILE OBJECT IN AN ARRAY.
                for (var i = 0; i < e.files.length; i++) {
                    $scope.files.push(e.files[i])
                }

            });
        };



	  $scope.uploadFiles = function (p) {
	
		console.log(p);
		delete p['$$hashKey'];
             $scope.status="Please while the products are being Uploaded..."
            //FILL FormData WITH FILE DETAILS.
            console.log("Sumitted");
            var data = new FormData();
            console.log($scope.files);
            for (var i in $scope.files) {
		console.log($scope.files[i]);
                data.append("uploadedFile", $scope.files[i]);
            }
		console.log(data);
            // ADD LISTENERS.
         /*   var objXhr = new XMLHttpRequest();
            objXhr.addEventListener("progress", updateProgress, false);
            objXhr.addEventListener("load", transferComplete, false);

 // SEND FILE DETAILS TO THE API.
            objXhr.open("POST", base+"/api/Admin/updateProduct/?product="+JSON.stringify(p));
           objXhr.send(data);
       */ }

   // UPDATE PROGRESS BAR.
        function updateProgress(e) {
//             if (e.lengthComputable) {
//                 document.getElementById('pro').setAttribute('value', e.loaded);
//                 document.getElementById('pro').setAttribute('max', e.total);
//             }
        }

        // CONFIRMATION.
        function transferComplete(e) {
         $scope.products.splice($scope.editIndex,1,$scope.edit);
        $scope.edit={};
        $scope.editD={};

        }


	$scope.saveData=function(p){

	console.log(p);
	delete p['$$hashKey'];

	$http.post(base+'/api/Admin/updateProduct/?product='+JSON.stringify(p)) .success(function(data){
	console.log(data);
	$scope.products.splice($scope.editIndex,1,$scope.edit);
	$scope.edit={};
	$scope.editD={};
	})
.error(function(response){
	console.log(response);
	});
	};


	$scope.deleteQuantity=function(data,key){
	
	console.log(data);
	console.log(key);
	var k=$scope.products.indexOf(data);
	console.log(k);

	$scope.products[k].Quantity[0].Quantities.splice(key,1);
	
	console.log($scope.products[k]);

 	delete $scope.products[k]['$$hashKey'];
	console.log(base+'/api/Admin/updateProduct/?product='+JSON.stringify($scope.products[k]));
	$http.post(base+'/api/Admin/updateProduct/?product='+JSON.stringify($scope.products[k])) .success(function(data){
	console.log(data);
	})
.error(function(response){
	console.log(response);
	});	
	};

	$scope.addNewQuantity=function(id){
	
	console.log(id);	
	
	var k=$scope.products.indexOf(id);
	var q=["","0","0","0","Available"];
	$scope.products[k].Quantity[0].Quantities.push(q);	
	}

   }]);
   
   



})();







 
