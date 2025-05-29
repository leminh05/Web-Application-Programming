from flask import Flask, render_template, request

app = Flask(__name__)

# Personalized student name
STUDENT_NAME = "Le Quang Minh"  # You can change this name

@app.route('/')
def student_form():
    """Renders the student information form."""
    return render_template('index.html', student_name=STUDENT_NAME)

@app.route('/submit_info', methods=['POST'])
def submit_info():
    """Handles the form submission."""
    if request.method == 'POST':
        # Retrieve data from the form based on the image's input names
        username = request.form.get('username')
        password = request.form.get('password') # Be careful with handling passwords in real apps!
        gender = request.form.get('gender')
        membership = request.form.get('membership')
        favcolor = request.form.get('favcolor')
        correct = request.form.get('correct') # Checkbox value will be 'correct' if checked, else None

        # For demonstration, we'll print it to the console and return a confirmation.
        # In a real application, you would process/save this data securely.
        print(f"Submitted Information for {STUDENT_NAME}:")
        print(f"  Username: {username}")
        print(f"  Password: [HIDDEN]") # Avoid printing passwords
        print(f"  Gender: {gender}")
        print(f"  Membership Level: {membership}")
        print(f"  Favorite Color: {favcolor}")
        print(f"  Correct (Checkbox): {'Yes' if correct else 'No'}")

        return f"""
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Submission Received</title>
                <link rel="stylesheet" href="{request.url_root}static/css/style.css">
                <style>
                    body {{ display: flex; justify-content: center; align-items: center; min-height: 90vh; flex-direction: column; }}
                    .submission-container {{ background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); text-align: left; max-width: 500px; }}
                    h1 {{ color: #0056b3; }}
                    ul li {{ background-color: #f8f9fa; margin-bottom: 5px; padding: 8px; border-radius: 4px; }}
                    a {{ color: #007bff; text-decoration: none; margin-top: 15px; display: inline-block; }}
                    a:hover {{ text-decoration: underline; }}
                </style>
            </head>
            <body>
                <div class="submission-container">
                    <h1>Information Submitted Successfully</h1>
                    <p>Thank you, {username}. The following information for <strong>{STUDENT_NAME}</strong> has been received:</p>
                    <ul>
                        <li><strong>Username:</strong> {username}</li>
                        <li><strong>Gender:</strong> {gender}</li>
                        <li><strong>Membership Level:</strong> {membership}</li>
                        <li><strong>Favorite Color:</strong> <span style="display:inline-block; width: 20px; height: 20px; background-color:{favcolor}; border:1px solid #ccc; vertical-align: middle;"></span> {favcolor}</li>
                        <li><strong>Is Correct:</strong> {'Yes' if correct else 'No'}</li>
                    </ul>
                    <a href="{request.url_root}">Go back to the form</a>
                </div>
            </body>
            </html>
        """
    return "Error processing request", 400

if __name__ == '__main__':
    app.run(debug=True)