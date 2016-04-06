from flask import Blueprint, session, request, send_from_directory
from database import loginAdmin, registerAdmin, registerProduct, removeProduct, ProductImagePath, RemoveBatch, AddBatch, addlevel1Category, removelevel1Category, addMainCategory, removeMainCategory, addSubCategory, removeSubCategory, reteriveCategories, reteriveProducts, reteriveBatches, updateBatch, loginDeliveryBoy, registerDeliveryBoy, updateOrderStatus, FetchOrders, VerifyOrder, UpdateBatch, updateProduct, reterieveDeliveryBoys, removeDeliveryBoy
import json, os
from werkzeug import secure_filename

def allowed_file(filename):
  if filename.rsplit('.', 1)[-1].lower() in ['png', 'jpg', 'jpeg', 'gif', 'bmp']:
    return True
  return False

def add_routes(app=None):
  Admin = Blueprint('Admin', __name__, static_url_path='/Admin/static', static_folder='./static', template_folder='./templates')
  
  @Admin.route('/api/Admin')
  def home():
    try:
      return send_from_directory(os.getcwd()+'/Admin/static/', 'signup.html')
    except Exception as e:
      print str(e)
      return 'Unable to load'
  
  @Admin.route('/api/Admin/dashboard/')
  def dashboard():
    try:
      return send_from_directory(os.getcwd()+'/Admin/static/', 'products.html')
    except Exception as e:
      print str(e)
      return 'Unable to load'
  
  @Admin.route('/api/Admin/login/', methods=['GET','POST'])
  def login():
    if request.method == 'POST':
      if request.args.get('adminType') == 'Super Admin':
	reply, user = loginAdmin(request.args.get('user'), 'Super Admin')
	if reply == 'Login Sucess':
	  session['id'] = user['_id']
	  session['Email'] = user['Email']
	  session['user'] = 'Super Admin'
	  user['response']='Login Successfull'
	  return json.dumps(user)
	return reply
      elif request.args.get('adminType') == 'Normal Admin':
	reply, user = loginAdmin(request.args.get('user'), 'Normal Admin')
	if reply == 'Login Sucess':
	  session['id'] = user['_id']
	  session['Email'] = user['Email']
	  session['user'] = 'Normal Admin'
	  user['response']='Login Successfull'
	  return json.dumps(user)
	return reply
      return 'Authentication failed'
    return 'Invalid Request'
  
  @Admin.route('/api/Admin/signup/', methods=['GET','POST'])
  def signup():
    if request.method == 'POST':
      if request.args.get('secretkey') == 'cmclogoAdmin':
	reply = registerAdmin(request.args.get('user'), 'Super Admin')
      elif request.args.get('secretkey') == 'NormalAdmin':
	reply = registerAdmin(request.args.get('user'), 'Normal Admin')
      else:
	return 'Authentication Failed'
      return reply
    return 'Invalid Request'
  
  @Admin.route('/api/Admin/addProduct/', methods=['GET','POST'])
  def addproduct():
    try:
      if request.method == 'POST':
	if session['user'] == 'Super Admin':
	  file = request.files.getlist('uploadedFile')
	  for f in file:
	    if not allowed_file(f.filename):
	      return f.filename + ' File Note Allowed'
	  product = json.loads(request.args.get('product'))
	  reply, pid = registerProduct(product['Main Category'], product['Sub Category'], request.args.get('product'))
	  if reply == 'Registered':
	    path = ProductImagePath(product['Level1 Category'], product['Main Category'], product['Sub Category'], pid) 
	    if not path == 'Unable to fetch':
	      file = request.files.getlist('uploadedFile')
	      for f in file:
		f.save(os.path.join(path, secure_filename(f.filename)))
	      return 'Product Registered with Images'
	    return 'Product Registerd but unable to upload images'
	  return reply
	return 'Authentication Failed'
      return 'Invalid Request'
    except Exception as e:
      return str(e)
      return 'Unable to Add'
  
  @Admin.route('/api/Admin/removeProduct/', methods=['GET','POST'])
  def removeproduct():
    if request.method == 'POST':
      if session['user'] == 'Super Admin':
	product = json.loads(request.args.get('product'))
	del product['$$hashKey']
	reply = removeProduct(product['Main Category'], product['Sub Category'], product['_id'])
	if reply =='Registered':
	  path = ProductImagePath(product['_id'])
	return reply
      return 'Authentication Failed'
    return 'Invalid Request'
  
  @Admin.route('/api/Admin/updateProduct/', methods=['GET','POST'])
  def Updateproduct():
    if request.method == 'POST':
      if session['user'] == 'Super Admin':
	product = json.loads(request.args.get('product'))
	return updateProduct(product, product['Main Category'], product['Sub Category'])
      return 'Authentication Failed'
    return 'Invalid Request'
  
  @Admin.route('/api/Admin/imageUpload/', methods=['GET','POST'])
  def imageUpload():
    try:
      if request.method == 'POST':
	file = request.files.getlist('uploadedFile')
	print request.args.get('Product')
	for f in file:
	  f.save(os.path.join('/home/sahil/my/', secure_filename(f.filename)))
	return 'Uploaded'
	if session['user'] == 'Super Admin':
	  file = request.files['file']
	  if allowed_file(file.filename):
	    product = json.loads(request.args.get('product'))
	    path = ProductImagePath(product['_id']) 
	    if not path == 'Unable to fetch':
	      file.save(os.path.join(path, secure_filename(file.filename)))
	      return 'Image Uploaded'
	    return 'Unable to Upload'
	  return 'Invalid Image format'
	return 'Authentication Failed'
      return 'Invalid Request'
    except Exception as e:
      print str(e)
      return str(e)
  
  @Admin.route('/api/Admin/removeBatch/', methods=['GET','POST'])
  def removeBatch():
    if request.method == 'POST':
      if session['user'] == 'Normal Admin' or session['user'] == 'Super Admin':
	pid = request.args.get('pid')
	BatchID = request.args.get('bid')
	reply = RemoveBatch(pid, BatchID)
	return reply
      return 'Authentication Failed'
    return 'Invalid Request'
  
  @Admin.route('/api/Admin/addatch/', methods=['GET','POST'])
  def addBatch():
    if request.method == 'POST':
      if session['user'] == 'Normal Admin' or session['user'] == 'Super Admin':
	reply = AddBatch(request.args.get('pid'), request.args.get('Batch'))
	return reply
      return 'Authentication Failed'
    return 'Invalid Request'
  
  @Admin.route('/api/Admin/UpdateBatch/', methods=['GET','POST'])
  def updateBatch():
    if request.method == 'POST':
      if session['user'] == 'Normal Admin' or session['user'] == 'Super Admin':
	reply = UpdateBatch(request.args.get('pid'), request.args.get('Batch'))
	return reply
      return 'Authentication Failed'
    return 'Invalid Request'
  
  @Admin.route('/api/Admin/addlevel1category/', methods=['GET','POST'])
  def addlevel1category():
    try:
      if request.method == 'POST':
	if session['user'] == 'Super Admin':
	  reply = addlevel1Category(request.args.get('level1category'))
	  return reply
	return 'Authentication Failed'
      return 'Invalid Request'
    except Exception as e:
      print str(e)
      return 'Unable to add right now'
    
  @Admin.route('/api/Admin/removelevel1Category/', methods=['GET','POST'])
  def removelevel1category():
    if request.method == 'POST':
      if session['user'] == 'Super Admin':
	reply = removelevel1Category(request.args.get('level1category'))
	return reply
      return 'Authentication Failed'
    return 'Invalid Request'
  
  @Admin.route('/api/Admin/addMainCategory/', methods=['GET','POST'])
  def addmainCategory():
    if request.method == 'POST':
      if session['user'] == 'Super Admin':
	reply = addMainCategory(request.args.get('level1category'), request.args.get('MainCategory'))
	return reply
      return 'Authentication Failed'
    return 'Invalid Request'
  
  @Admin.route('/api/Admin/removeMainCategory/', methods=['GET','POST'])
  def removemainCategory():
    if request.method == 'POST':
      if session['user'] == 'Super Admin':
	reply = removeMainCategory(request.args.get('level1category'), request.args.get('MainCategory'))
	return reply
      return 'Authentication Failed'
    return 'Invalid Request'
  
  @Admin.route('/api/Admin/addSubCategory/', methods=['GET','POST'])
  def addSubcategory():
    if request.method == 'POST':
      if session['user'] == 'Super Admin':
	reply = addSubCategory(request.args.get('level1category'), request.args.get('MainCategory'), request.args.get('subCategory'))
	return reply
      return 'Authentication Failed'
    return 'Invalid Request'
  
  @Admin.route('/api/Admin/removeSubCategory/', methods=['GET','POST'])
  def removeSubcategory():
    if request.method == 'POST':
      if session['user'] == 'Super Admin':
	reply = removeSubCategory(request.args.get('level1category'), request.args.get('MainCategory'), request.args.get('subCategory'))
	return reply
      return 'Authentication Failed'
    return 'Invalid Request'
  
  @Admin.route('/api/Admin/reteriveCategories/', methods=['GET','POST'])
  def reterivecategories():
    if request.method == 'POST':
      reply = reteriveCategories()
      return reply
    return 'Invalid Request'
  
  @Admin.route('/api/admin/getProducts/', methods=['GET','POST'])
  def ReteriveProducts():
    try:
      if request.method == 'POST':
	if session['user'] == 'Normal Admin' or session['user'] == 'Super Admin':
	  reply = reteriveProducts(request.args.get('maincategory'), request.args.get('subcategory'))
	  return reply
	return 'Authentication Failed'
      return 'Invalid Request'
    except Exception as e:
      print str(e)
      return 'Unable to Fetch'
    
  @Admin.route('/api/Admin/reteriveBatches/', methods=['GET','POST'])
  def reterivebatches():
    try:
      if request.method == 'POST':
	if session['user'] == 'Normal Admin' or session['user'] == 'Super Admin':
	  reply = reteriveBatches(request.args.get('pid'))
	  return reply
	return 'Authentication Failed'
      return 'Invalid Request'
    except Exception as e:
      print str(e)
      return 'Unable to Fetch'

  @Admin.route('/api/Admin/updateBatch/', methods=['GET','POST'])
  def UpdateBatch():
    try:
      if request.method == 'POST':
	if session['user'] == 'Normal Admin' or session['user'] == 'Super Admin':
	  reply = updateBatch(request.args.get('pid'), request.args.get('batch'))
	  return reply
	return 'Authentication Failed'
      return 'Invalid Request'
    except Exception as e:
      print str(e)
      return 'Unable to Fetch'
    
  @Admin.route('/api/Admin/DeliveryBoylogin/', methods=['GET','POST'])
  def DeliveryBoylogin():
    if request.method == 'POST':
      reply, user = loginDeliveryBoy(request.args.get('user'))
      if reply == 'Login Sucess':
	session['id'] = user['_id']
	session['Email'] = user['Email']
	session['user'] = 'Delivery Boy'
	user['response']='Login Successfull'
	return json.dumps(user)
      else:
	return reply
    return 'Invalid Request'
  
  @Admin.route('/api/Admin/DeliveryBoysignup/', methods=['GET','POST'])
  def DeliveryBoysignup():
    if request.method == 'POST':
      if session['user'] == 'Admin':
	reply = registerDeliveryBoy(request.args.get('user'))
	return reply
      return 'Authentication Failed'
    return 'Invalid Request'
  
  @Admin.route('/api/Admin/removeDeliveryBoy/', methods=['GET','POST'])
  def RemoveDeliveryBoy():
    if request.method == 'POST':
      if session['user'] == 'Super Admin':
	reply = removeDeliveryBoy(request.args.get('id'))
	return reply
      return 'Authentication Failed'
    return 'Invalid Request'
  
  @Admin.route('/api/Admin/reterieveDeliveryBoys/', methods=['GET','POST'])
  def ReterieveDeliveryBoys():
    if request.method == 'POST':
      if session['user'] == 'Normal Admin' or session['user'] == 'Super Admin':
	reply = reterieveDeliveryBoys()
	return reply
      return 'Authentication Failed'
    return 'Invalid Request'
  
  @Admin.route('/api/Admin/UpdateOrderStatus/', methods=['GET','POST'])
  def UpdateOrderStatus():
    if request.method == 'POST':
      if session['user'] == 'Delivery Boy':
	reply = updateOrderStatus(session['id'], request.args.get('orderID'), request.args.get('status'))
	return reply
      return 'Authentication Failed'
    return 'Invalid Request'
  
  @Admin.route('/api/Admin/FetchOrders/', methods=['GET','POST'])
  def fetchOrders():
    if request.method == 'POST':
      if session['user'] == 'Delivery Boy':
	reply = FetchOrders('DeliveryBoy', session['id'])
	return reply
      elif session['user'] == 'Normal Admin' or session['user'] == 'Super Admin':
	reply = FetchOrders('Admin', 'Orders')
	return reply
      return 'Authentication Failed'
    return 'Invalid Request'
  
  @Admin.route('/api/Admin/verifyorder/', methods=['GET','POST'])
  def verifyOrder():
    if request.method == 'POST':
      if session['user'] == 'Delivery Boy':
	reply = VerifyOrder(session['id'],request.args.get('orderID'), request.args.get('otp'))
	return reply
      return 'Authentication Failed'
    return 'Invalid Request'
  
  app.register_blueprint(Admin)
