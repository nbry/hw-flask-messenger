
## Local Installation - Backend Instructions:

1. **Clone the repository**

2. **Create a virtual environment and install dependencies with `pipenv`**

	If you don't have pipenv:

	`pip install pipenv`

	Then:

	`pipenv install `

3. **Open PostgreSQL interactive terminal.**
	The command may differ depending on your system settings.
	Refer to PostgreSQL docs if you run into issues.

	From my (limited) knowledge, it could be one of the following:
	
	`psql`
	
	or...
	`psql -U postgres`
	
	or...
	`psql -U postgres postgres`

	There are implications behind each command. To better understand them, please refer to the PostgreSQL docs.

	Once you have PostgreSQL open... 

4. **Create the database:**

	`CREATE DATABASE hw_messenger_db;`

	For testing environment, create the following database:

	`CREATE DATABASE hw_messenger_db_test;`

5. **Exit PostgreSQL**

6. **Seed the tables in the database.**

	`pipenv run ipython`

	`%run seed.py`


7. **Run flask server.** Your virtual environment should still be activated. If not, repeat step 4.

	Run the following command in your Terminal:

	`pipenv run flask run`

	You can run flask in different environments. Refer to Flask docs for more info

	You should see the server running on localhost:5000. You can now utilize the REST API. Try the following in your browser:

	`localhost:5000/welcome`
	You should receive the JSON message:

	`{"welcomeMessage": "Welcome!"}`
