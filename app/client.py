from flask import render_template, Blueprint, session, redirect, request
from services import auth
from services.exceptions.exceptions import handle_exceptions
from services.exceptions import *

bp = Blueprint('client', __name__)


@bp.route('/')
def index():
    data = {'title': 'Chess Online'}
    if 'user' in session:
        data['user'] = session['user']
    return render_template('index.html', data=data)


@bp.route('/login')
def login():
    uri = auth.login()
    return redirect(uri)


@bp.route('/logout')
def logout():
    session.clear()
    return redirect('/')


@bp.route('/authorize')
@handle_exceptions
def authorize():
    if not request.args.get('state') or not request.args.get('code'):
        raise BadRequest

    auth.authorize(request.args.get('state'), request.args.get('code'))
    return redirect('/')


@bp.route('/game')
def game():
    return render_template('game.html')
