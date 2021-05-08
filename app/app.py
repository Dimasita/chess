from flask import Flask, render_template, redirect, request, session, jsonify
from config import APP_SECRET_KEY
import auth

app = Flask(__name__)
app.secret_key = APP_SECRET_KEY


@app.route('/')
def hello_world():
    if 'user' not in session:
        return render_template('index.html')
    return render_template('game.html')


@app.route('/login')
def login():
    uri = auth.login()
    return redirect(uri)


@app.route('/authorize')
def authorize():
    if not request.args.get('state') or not request.args.get('code'):
        return redirect('/error')

    auth.authorize(request.args.get('state'), request.args.get('code'))
    return redirect('/')


@app.route('/error')
def error():
    return 'Yeba ti che delaesh???!'
