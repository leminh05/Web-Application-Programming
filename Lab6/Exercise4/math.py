from flask import Flask, render_template, request

# Initialize the Flask application
app = Flask(__name__)

# Define a route for the main page, which displays the form
@app.route('/')
def main():
    """Renders the main page with the input form."""
    return render_template('math.html')

# Define a route to handle the calculation
@app.route('/square')
def square():
    """
    Handles the form submission, calculates the square,
    and displays the result.
    """
    # Check if a number was submitted in the URL query string
    if 'num' in request.args:
        try:
            # Get the number from the form, convert it to an integer
            number = int(request.args.get('num'))
            # Calculate the square
            result = number * number
            # Render the result page with the original number and the result
            return render_template('result.html', number=number, result=result)
        except ValueError:
            # Handle cases where the input is not a valid number
            return "Error: Please enter a valid number."
    else:
        # If no number is provided, just show the form again
        return render_template('math.html')

# This block runs the app when the script is executed
if __name__ == "__main__":
    app.run(debug=True)
