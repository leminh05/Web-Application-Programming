from flask import Flask, render_template, url_for

# Initialize the Flask application
app = Flask(__name__)

# Define a route for the home page ('/')
@app.route("/")
def home():
    """Renders the home page."""
    return render_template("home.html")

# Define a route for the about page ('/about')
@app.route("/about")
def about():
    """Renders the about page."""
    return render_template("about.html")

# This block runs the app when the script is executed
if __name__ == "__main__":
    app.run(debug=True)
