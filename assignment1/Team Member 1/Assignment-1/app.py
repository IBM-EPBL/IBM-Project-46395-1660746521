import email
from flask import Flask, render_template, request, redirect, url_for
app = Flask(__name__)


@app.route('/')
def register():
    return render_template('register.html')


@app.route('/welcome', methods=['GET', 'POST'])
def welcome():
    if request.method == "POST":
        name = request.form['name']
        phone_no = request.form['phone_no']
        email_id = request.form['email_id']
        return render_template('welcome.html', name=name, phone_no=phone_no, email_id=email_id)


@app.route('/register')
def register1():
    return redirect(url_for('register'))


if __name__ == "__main__":
    app.run(debug=True)
