import psycopg2

# Connect to the PostgreSQL database
connection = psycopg2.connect(
    host="localhost",
    database="group_snap",
    user="postgres",
    password="Rahul@75"
)
cursor = connection.cursor()

# Read the image file in binary mode
with open(r'C:\Users\rahul\Downloads\favicon.png', 'rb') as file:
    binary_data = file.read()

# Insert binary data into the database
query = "UPDATE users SET profile_image = %s WHERE user_id = %s;"
cursor.execute(query, (psycopg2.Binary(binary_data), 1))
cursor.execute(query, (psycopg2.Binary(binary_data), 2))
cursor.execute(query, (psycopg2.Binary(binary_data), 3))
cursor.execute(query, (psycopg2.Binary(binary_data), 4))
cursor.execute(query, (psycopg2.Binary(binary_data), 5))
# Commit the changes and close the connection
connection.commit()
cursor.close()
connection.close()

print("Image uploaded successfully")
