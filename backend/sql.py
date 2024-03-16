import mysql.connector
from mysql.connector import Error

# This function is used to create a connection

def create_connection(hostname, uname, pwd, dbname):
    connection = None
    try:
        connection = mysql.connector.connect(
            host = hostname,
            user = uname,
            passwd = pwd,
            database = dbname
        )
        print("Connection has been established!")
    except Error as e:
        print("Unable to establish connection! Error has occurred at : ", e)

    return connection

# This function is used to execute query to update database (insert, update and delete statement)
def execute_query(conn, query):
    cursor = conn.cursor()
    try:
        cursor.execute(query)
        conn.commit()
        print("Query executed successfully")
    except Error as e:
        print("Unable to establish connection! Error has occurred at : ", e)

# This function is used to execute query to retrive records from database (select statement)
def execute_read_query(conn, query):
    cursor = conn.cursor(dictionary=True)
    rows = None
    try:
        cursor.execute(query)
        rows = cursor.fetchall()
        return rows
    except Error as e:
        print("Unable to establish connection! Error has occurred at : ", e)
