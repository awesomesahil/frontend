from flask import Blueprint, session, request
from database import loginAdmin, registerAdmin, registerProduct, removeProduct, ProductImagePath, RemoveBatch, AddBatch
import json
from werkzeug import secure_filename

def allowed_file(filename):
  return filename.rsplit('.', 1)[-1].lower() in ['png', 'jpg', 'jpeg', 'gif', 'bmp']

def add_routes(app=None):
  Admin = Blueprint('Admin', __name__, static_url_path='/Admin/static', static_folder='./static', template_folder='./templates')
  
  @Admin.route('/api/Admin')
  def home():
    return 'Admin page'
  
  @Admin.route('/api/Admin/login/', methods=['GET','POST'])
  def login():
    if request.method == 'POST':
      reply, user = loginAdmin(request.args.get('user'))
      if reply == 'Login Sucess':
	session['id'] = user['_id']
	session['Email'] = user['Email']
	session['user'] = 'Admin'
	return json.dumps(user)
      else:
	return reply
    return 'Invalid Request'
  
  @Admin.route('/api/Admin/signup/', methods=['GET','POST'])
  def signup():
    if request.method == 'POST':
      if request.args.get('secretkey') == 'cmclogo':
	reply = registerAdmin(request.args.get('user'))
	return reply
      return 'Authentication Failed'
    return 'Invalid Request'
  
  @Admin.route('/api/Admin/addProduct/', methods=['GET','POST'])
  def addproduct():
    if request.method == 'POST':
      if session['user'] == 'Admin':
	product = json.loads(request.args.get('product'))
	reply = registerProduct(product['Main Category'], product['Sub Category'], request.args.get('product'))
	return reply
      return 'Authentication Failed'
    return 'Invalid Request'
  
  @Admin.route('/api/Admin/removeProduct/', methods=['GET','POST'])
  def removeproduct():
    if request.method == 'POST':
      if session['user'] == 'Admin':
	product = json.loads(request.args.get('product'))
	reply = registerProduct(product['Main Category'], product['Sub Category'], product['_id'])
	return reply
      return 'Authentication Failed'
    return 'Invalid Request'
  
  @Admin.route('/api/Admin/imageUpload/', methods=['GET','POST'])
  def imageUpload():
    if request.method == 'POST':
      if session['user'] == 'Admin':
	file = request.files['file']
	if allowed_file(file.filename):
	  product = json.loads(request.args.get('product'))
	  path = ProductImagePath(product['Main Category'], product['Sub Category'], product['_id']) 
	  if not path == 'Unable to fetch':
	    file.save(os.path.join(path, secure_filename(file.filename)))
	    return 'Image Uploaded'
	  return 'Unable to Upload'
	return 'Invalid Image format'
      return 'Authentication Failed'
    return 'Invalid Request'
  
  @Admin.route('/api/Admin/removeBatch/', methods=['GET','POST'])
  def removeBatch():
    if request.method == 'POST':
      if session['user'] == 'Admin':
	pid = request.args.get('pid')
	BatchID = request.args.get('bid')
	reply = RemoveBatch(pid, BatchID)
	return reply
      return 'Authentication Failed'
    return 'Invalid Request'
  
  @Admin.route('/api/Admin/addatch/', methods=['GET','POST'])
  def addBatch():
    if request.method == 'POST':
      if session['user'] == 'Admin':
	reply = AddBatch(request.args.get('pid'), request.args.get('Batch'))
	return reply
      return 'Authentication Failed'
    return 'Invalid Request'
  
  app.register_blueprint(Admin)