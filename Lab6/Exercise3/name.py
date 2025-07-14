from flask import Flask, redirect, url_for, request, render_template

# Initialize the Flask application
app = Flask(__name__)

# This route will display the form to the user.
@app.route('/')
def index():
   """Renders the initial form page."""
   return render_template('index.html')

# This route will be called when the form is submitted.
# It handles the POST request, gets the name, and then redirects
# to a new URL to display the welcome message.
@app.route('/login', methods=['POST', 'GET'])
def login():
   """Handles the form submission and redirects to the success page."""
   if request.method == 'POST':
      # Get the value from the form input field with name='nm'
      user_name = request.form['nm']
      # Redirect to the 'success' URL, passing the user's name
      return redirect(url_for('success', name=user_name))
   else:
      # If the user navigates to /login via GET, get the name from URL params
      user_name = request.args.get('nm')
      # Redirect to the 'success' URL, passing the user's name
      return redirect(url_for('success', name=user_name))


# This route displays the welcome message.
# It takes the name from the URL.
@app.route('/success/<name>')
def success(name):
   """Displays a welcome message to the user."""
   return f'<main>Welcome {name}!</main>'


if __name__ == '__main__':
   # Run the app in debug mode
   app.run(debug=True)
