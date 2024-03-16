#This allows the connection to be established in MySQL
import flask
from flask import jsonify
from flask import request


from sql import create_connection
from sql import execute_read_query
from sql import execute_query

import creds

# setting up an application name
app = flask.Flask(__name__)
app.config['DEBUG'] = True # allow to show error in browser


#-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------#
#-----------------------------------------------------------------------------------------------------------------------


#                                   CRUD Operations API for Captain Table

#-------------------------------------------GET Method----------------------------------------
@app.route('/api/captain', methods=['GET'])
def get_captain():
    myCreds = creds.Creds()
    conn = create_connection(myCreds.connectionstring, myCreds.username, myCreds.passwd, myCreds.dataBase)
    sql = "select * from captain"
    captain = execute_read_query(conn, sql)

    return jsonify(captain)

# --------------------------------------POST Method-----------------------------------------------

#Add a new captain record for the database with POST method
@app.route('/api/captain/post', methods=['POST'])
def post_captain():
    request_data = request.get_json()
    n_firstname = request_data['firstname']
    n_lastname = request_data['lastname']
    n_rank = request_data['c_rank']
    n_homeplanet = request_data['homeplanet']

    myCreds = creds.Creds()
    conn = create_connection(myCreds.connectionstring, myCreds.username, myCreds.passwd, myCreds.dataBase)
    sql = "insert into captain (firstname, lastname, c_rank, homeplanet) values ('%s','%s','%s','%s')" % (n_firstname,n_lastname,n_rank,n_homeplanet)
    execute_query(conn, sql)

    return 'Data Entry Added!'

#------------------------------------ DELETE Method----------------------------------------------

@app.route('/api/captain/delete', methods=['DELETE'])
def delete_captain():
    request_data = request.get_json()
    d_id = request_data['id']

    myCreds = creds.Creds()
    conn = create_connection(myCreds.connectionstring, myCreds.username, myCreds.passwd, myCreds.dataBase)
    sql = "delete from captain where id = %s" % (d_id)
    execute_query(conn, sql)

    return 'Delete Successful'

#------------------------------------ PUT Method----------------------------------------------

#update data entry with PUT
@app.route('/api/captain/put', methods=['PUT'])
def put_captain():
    request_data = request.get_json()
    u_id = request_data['id']
    u_firstname = request_data['firstname']
    u_lastname = request_data['lastname']
    u_rank = request_data['c_rank']
    u_homeplanet = request_data['homeplanet']
    myCreds = creds.Creds()
    conn = create_connection(myCreds.connectionstring, myCreds.username, myCreds.passwd, myCreds.dataBase)
    sql = "update captain set firstname = '%s', lastname = '%s', c_rank = '%s', homeplanet = '%s' where id = %s" % (u_firstname, u_lastname, u_rank, u_homeplanet, u_id)
    execute_query(conn, sql)

    return 'Data Entry Updated!'

#-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------#
#-----------------------------------------------------------------------------------------------------------------------


#                                   CRUD Operations API for Cargo Table

#-------------------------------------------GET Method----------------------------------------

#create a endpoint to get a single user from DB : http://127.0.0.1:5000/api/cargo
#Retrieve all records in the Cargo table
@app.route('/api/cargo', methods=['GET'])
def get_cargo():
    myCreds = creds.Creds()
    conn = create_connection(myCreds.connectionstring, myCreds.username, myCreds.passwd, myCreds.dataBase)
    sql = "select * from cargo where arrival is null or arrival = '0000-00-00';"
    cargo = execute_read_query(conn, sql)

    return jsonify(cargo)

# -----------------------------------POST Method-----------------------------------------------

#Add a new cargo record for the database with POST method
@app.route('/api/cargo/post', methods=['POST'])
def post_cargo():
    request_data = request.get_json()
    NewCargoWeight = request_data['weight']
    NewCargoType = request_data['cargotype']
    NewDepartTime = request_data['departure']
    NewArrivalTime = request_data['arrival']
    NewShipID = request_data['shipid']

    myCreds = creds.Creds()
    conn = create_connection(myCreds.connectionstring, myCreds.username, myCreds.passwd, myCreds.dataBase)
    sql = "insert into cargo (weight, cargotype, departure, arrival, shipid) VALUES (%s, '%s', '%s', '%s', %s)" % (NewCargoWeight, NewCargoType, NewDepartTime, NewArrivalTime, NewShipID)
    execute_query(conn, sql)

    return 'Post cargo successful!'

#------------------------------------ DELETE Method----------------------------------------------

# Delete a cargo record with delete method
@app.route('/api/cargo/delete', methods=['DELETE'])
def delete_cargo():
    request_data = request.get_json()
    idtodelete = request_data['id']

    myCreds = creds.Creds()
    conn = create_connection(myCreds.connectionstring, myCreds.username, myCreds.passwd, myCreds.dataBase)
    sql = "delete from cargo where id = %s" % (idtodelete)
    execute_query(conn, sql)

    return 'Delete cargo successful!'

#-------------------------------------PUT Method-------------------------------------------------

# Updating any cargo record already inputted into the Cargo table with PUT Method
@app.route('/api/cargo/put', methods=['PUT'])
def put_cargo():
    request_data = request.get_json()
    IDupdate = request_data['id']
    weightUpdate = request_data['weight']
    cargotypeUpdate = request_data['cargotype']
    departureUpdate = request_data['departure']
    arrivalUpdate = request_data['arrival']
    shipidUpdate = request_data['shipid']

    myCreds = creds.Creds()
    conn = create_connection(myCreds.connectionstring, myCreds.username, myCreds.passwd, myCreds.dataBase)
    sql = "update cargo set weight = %s, cargotype = '%s', departure = '%s', arrival = '%s', shipid = %s where id = %s" % (weightUpdate, cargotypeUpdate, departureUpdate, arrivalUpdate, IDupdate, shipidUpdate)
    execute_query(conn, sql)

    return 'Update cargo successful!' #  message confirming the update request

#-----------------------------------------------------------------------------------------------------------------------
#-----------------------------------------------------------------------------------------------------------------------

#                                   CRUD Operations API for Spaceship Table

#-------------------------------------------GET Method------------------------------------------------------------------

#create a endpoint to get a single user from DB : http://127.0.0.1:5000/api/spaceship
#Retrieve all records in the spaceship table
@app.route('/api/spaceship', methods=['GET'])
def get_spaceship():
    myCreds = creds.Creds()
    conn = create_connection(myCreds.connectionstring, myCreds.username, myCreds.passwd, myCreds.dataBase)
    sql = "select * from spaceship"
    spaceship = execute_read_query(conn, sql)

    return jsonify(spaceship)

# -----------------------------------POST Method-----------------------------------------------

#adding a new spaceship for the database with POST method
@app.route('/api/spaceship/post', methods=['POST'])
def post_spaceship():
    request_data = request.get_json()
    NewMaxWeight = request_data['maxweight']
    NewCaptainID = request_data['captainid']
    
    myCreds = creds.Creds()
    conn = create_connection(myCreds.connectionstring, myCreds.username, myCreds.passwd, myCreds.dataBase)
    sql = "insert into spaceship (maxweight, captainid) values (%s, %s)" % (NewMaxWeight, NewCaptainID)
    
    execute_query(conn, sql)
    return 'Post spaceship successful!'

#------------------------------------ DELETE Method----------------------------------------------

# Delete a spaceship record with delete method
@app.route('/api/spaceship/delete', methods=['DELETE'])
def delete_spaceship():
    request_data = request.get_json()
    idtodelete = request_data['id']

    myCreds = creds.Creds()
    conn = create_connection(myCreds.connectionstring, myCreds.username, myCreds.passwd, myCreds.dataBase)
    sql = "delete from spaceship where id = %s" % (idtodelete)
    execute_query(conn, sql)
    return 'Delete spaceship successful!'

#-------------------------------------PUT Method-------------------------------------------------

# Updating any spaceship record already inputted into the table with PUT Method
@app.route('/api/spaceship/put', methods=['PUT'])
def update_spaceship():
    request_data = request.get_json()
    IDupdate = request_data['id']
    MaxWeightUpdate = request_data['maxweight']
    CaptainIDUpdate = request_data['captainid']
    myCreds = creds.Creds()
    conn = create_connection(myCreds.connectionstring, myCreds.username, myCreds.passwd, myCreds.dataBase)
    sql = "update spaceship set maxweight = %s, captainid = %s where id = %s" % (MaxWeightUpdate, CaptainIDUpdate, IDupdate)
    execute_query(conn, sql)

    return 'Update spaceship successful.'#  message confirming the update request

#-----------------------------------------------------------------------------------------------------------------------
#-----------------------------------------------------------------------------------------------------------------------



app.run()



# References
# https://www.w3schools.com/sql/sql_foreignkey.asp
# Homework 2
# Module SecurityApi.py