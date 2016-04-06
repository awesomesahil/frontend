from flask import Blueprint, session, url_for, request
from database import categoryProducts, newProducts, randomProducts, randomMainCategoryProducts, categoryProductDetail, retrieveAllProducts, searchProduct
import json, gc


def add_routes(app=None):
  Product = Blueprint('Product', __name__, static_url_path='/Product/static', static_folder='./static', template_folder='./templates')
  
  @Product.route('/api/Product')
  def owner():
    return 'Product page'
  
  @Product.route('/api/Product/getCategoryProducts/')
  def getCategoryProducts():
    return categoryProducts(request.args.get('level1Category'), request.args.get('MainCategory'), request.args.get('SubCategory'))
  
  @Product.route('/api/Product/getNewProducts/')
  def getNewProducts():
    return newProducts(request.args.get('level1Category'), request.args.get('MainCategory'), request.args.get('SubCategory'))

  @Product.route('/api/Product/categoryProductDetail/')
  def CategoryProductDetail():
    return categoryProductDetail(request.args.get('level1Category'), request.args.get('MainCategory'), request.args.get('SubCategory'), request.args.get('pid'))
  
  @Product.route('/api/Product/getRandomMainCategoryProducts/')
  def getRandomMainCategoryProducts():
    return randomMainCategoryProducts(request.args.get('level1category'), request.args.get('mainCategory'))
  
  @Product.route('/api/Product/getAllProducts/')
  def getAllProducts():
    return retrieveAllProducts(request.args.get('level1category'))
  
  @Product.route('/api/Product/getRandomProducts/')
  def getRandomProducts():
    return randomProducts(request.args.get('level1category'))
  
  @Product.route('/api/Product/searchProduct/')
  def SearchProduct():
    return searchProduct(request.args.get('level1category'), request.args.get('query'))
  
  app.register_blueprint(Product)
