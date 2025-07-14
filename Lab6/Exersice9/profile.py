from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

@app.route('/')
def profile():
    return render_template('profile.html')

@app.route('/login', methods=['POST'])
def do_login():
    username = request.form['username']
    return redirect(url_for('welcome', username=username))

@app.route('/welcome/<username>')
def welcome(username):
    return render_template('welcome.html', username=username)

if __name__ == '__main__':
    app.run(debug=True)
