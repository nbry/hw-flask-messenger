
## Local Installation - Backend Instructions:

1. **Clone the repository**

2. **Create a virtual environment with the name "venv**"

	`python -m venv venv`

	If this is your first time encountering the venv module or virtual environments, I highly recommend reading the Python docs or 	learning about them first.

4. **Activate the virtual environment:**

	`source venv/bin/activate`

	A different command may be required for windows users.
	Could possibly be:
	
	`source venv/Scripts/activate`

5. **Ensure your virtual environment is activated.**
	If you followed the previous instructions, you might see `(venv)` in your CLI.

6. **Install dependencies from the requirements.txt file**

	`pip install -r requirements.txt`

	You can verify installation by using the command

	`pip freeze`

	You should see a list of dependencies that matches the requirements.txt file.
	For quick visual comparison:

	`cat requirements.txt`

7. **Open PostgreSQL interactive terminal.**
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

8. **Create the database:**

	`CREATE DATABASE forleti_db;`

	For testing environment, create the following database:

	`CREATE DATABASE forleti_db_test;`

9. **Exit PostgreSQL**

10. **Seed the tables in the database.**

	`python seed.py`

	...or if in ipython:

	`%run seed.py`


11. **Run flask server.** Your virtual environment should still be activated. If not, repeat step 4.

	Run the following command in your Terminal:

	`flask run`

	You can run flask in different environments. Refer to Flask docs for more info

	You should see the server running on localhost:5000. You can now utilize forleti REST API. Try the following in your browser:

	`localhost:5000/poke`
	You should receive the JSON message:

	`{"Poke you back!"}`
