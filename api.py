from flask import Flask, request
from flask_restful import Resource, Api
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
import random

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "super-secret-key"
api = Api(app)
jwt = JWTManager(app)


@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,POST')
  return response

class Login(Resource):

    def post(self):
        user = {
            'email': 'right@email.com',
            'password': generate_password_hash('password')
        }
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        if email == user['email'] and check_password_hash(user['password'], password):
            # create and send token
            token = create_access_token(identity=str(user['email']))
            return {"token": token }, 200

        return {"msg": 'Invalid email or password'}, 401

api.add_resource(Login, '/login')

class Table(Resource):

    @jwt_required()
    def get(self):
        token = request.headers.get('Authorization').split()[1]
        print(token)
        nums = random.sample(range(10, 5000), 5)
        nums_list = [x/10 for x in nums]
        return {"values": nums_list}
       
api.add_resource(Table, '/')


if __name__ == '__main__':
    app.run(debug=True)