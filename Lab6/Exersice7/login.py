from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)
@app.route('/')
def login():
    return render_template('login.html')
    
@app.route('/login', methods=['POST'])
def do_login():
    username = request.form['username']
    if username == 'admin':
        return redirect(url_for('welcome', username=username))
    else:
        return 'Invalid credentials, please try again.'
    
@app.route('/success')
def welcome():
    return render_template('success.html')

if __name__ == '__main__':
    app.run(debug=True)