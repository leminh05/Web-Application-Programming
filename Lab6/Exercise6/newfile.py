from flask import Flask, render_template, request, redirect, url_for
app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        if 'file' not in request.files:
            return 'no file part'
        file = request.files['file']
        if file.filename == '':
            return 'no selected file'
        if file:
            filepate = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
            file.save(filepate) 
            return f'File {file.filename} uploaded successfully!'
    return render_template('newfile.html')

if __name__ == '__main__':
    app.run(debug=True)
