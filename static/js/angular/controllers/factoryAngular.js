var factoryApp=angular.module('FactoryHandler',[]);



factoryApp.service('cartService', function($http) {
var y=[];
 var cartItems=0;
 var storedData = localStorage.getItem("product");

  if (JSON.parse(storedData)){
          y= JSON.parse(storedData);
  }




  var addProduct = function(newObj) {
      y.push(newObj);
      localStorage.setItem("product",  JSON.stringify(y));
        if(localStorage.setItem("product",  JSON.stringify(y))){
          cartQuantity();
          return true; 
        }
      return true;
  };


  var cartQuantity = function() {
      cartitems=y.length;
      console.log(y.length); 
      return cartitems;
  };



 var allCategories= function() {

	var level1Categories=[];
	var level2Categories=[];
	var level3Categories=[];
	var level2CategoriesWTF=[];
var categories = [];
var level1keys= [];
$http.post(base+'/api/Admin/reteriveCategories/')
    .success(function(data){
	console.log(data);
              categories = data;
              level1keys = Object.keys(data)
              for (key in level1keys)
              {
                level1keys[key] = data[key]._id;
                if(data[key]._id=='Grocery'){
                   level1Categories.push(data[key]._id);
                   var obj=data[key].Categories;
                  for(x in obj){
                       result = Object.keys(obj[x]);
                       var z=obj[x];
                       for(var t in z){
                           level3Categories.push(z[t]);
                       }
                       level2Categories.push(result[0]);
                  }
                }
              }
              for (var z in level2Categories){
               level2CategoriesWTF.push((level2Categories[z].replace(/\s/g,'')));
              }
	console.log(level2Categories);          
      })
  .error(function(err){
      console.log(err);
  });


return level2Categories;
}


  return {
    addProduct: addProduct,
    cartQuantity:cartQuantity,
    allCategories:allCategories
     
};
});


/*
factoryApp.service('retrieveAllCategories', function() {


  var categories=[];
 var level1keys=[];
var level1Categories=[];
var level2Categories=[];
var level3Categories=[];
var level2CategoriesWTF=[];

  var allCategories= function() {
$http.post(base+'/api/Admin/reteriveCategories/')
    .success(function(data){
              categories = data;
              level1keys = Object.keys(data)
              for (key in level1keys)
              {
                level1keys[key] = data[key]._id;
                if(data[key]._id=='Grocery'){
                   level1Categories.push(data[key]._id);
                   var obj=data[key].Categories;
                  for(x in obj){
                       result = Object.keys(obj[x]);
                       var z=obj[x];
                       for(var t in z){
                           level3Categories.push(z[t]);
                       }
                       level2Categories.push(result[0]);
                  }
                }
              }
              for (var z in level2Categories){
               level2CategoriesWTF.push((level2Categories[z].replace(/\s/g,'')));
              }
          
      })
  .error(function(err){
      console.log(err);
  });

return true;
}

return {
allCategories:allCategories
}
});
*/
