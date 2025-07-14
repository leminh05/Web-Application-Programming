from flask import Flask, render_template, request
app = Flask(__name__)

@app.route('/')
def score():
    return render_template('score.html')

@app.route('/result', methods=['POST'])
def result():
    name = request.form.get('name')
    physic = request.form.get('physic', type=int)
    chemistry = request.form.get('chemistry', type=int)
    math = request.form.get('math', type=int)

    scores = {
        'physic': physic,
        'chemistry': chemistry,
        'math': math
    }
    
    return render_template('result.html', name=name, scores=scores)

if __name__ == '__main__':
    app.run(debug=True)