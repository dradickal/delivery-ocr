import mysql.connector
from mysql.connector import errorcode
from dotenv import load_dotenv
import os

load_dotenv()

dbConfig = {
  'host': '127.0.0.1',
  'user': os.environ.get("DB_USER"),
  'password': os.environ.get("DB_PASSWORD"),
  'database': os.environ.get("DATABASE"),
  'raise_on_warnings': True
}

def getDB(config):
	try:
		cnx = mysql.connector.connect(**config)
	except mysql.connector.Error as err:
		if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
			print("User could not connect")
		elif err.errno == errorcode.ER_BAD_DB_ERROR:
			print("Database does not exist")
		else:
			print(err)
	
	return cnx


db = getDB(dbConfig)

getActions = ("SELECT * FROM action_types")
insertOCR = ("INSERT ")
cursor = db.cursor()
cursor.execute(getActions)
results = cursor.fetchall()

print(results)

cursor.close()
db.close()
