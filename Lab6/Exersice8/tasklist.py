from flask import Flask, render_template, request, redirect, url_for
app = Flask(__name__)

tasks = []

@app.route('/')
def tasklist():
    return render_template('tasklist.html', tasks=tasks)

@app.route('/add_task', methods=['POST'])
def add_task():
    task = request.form.get('task')
    if task:
        tasks.append(task)
    return redirect(url_for('tasklist'))

if __name__ == '__main__':
    app.run(debug=True)
