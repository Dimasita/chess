from flask import render_template, Blueprint, redirect, request
from services import auth
from services.exceptions.exceptions import handle_exceptions
from services.exceptions import *
from services import stats

bp = Blueprint('client', __name__)


@bp.route('/')
@auth.is_auth
def index(data: dict):
    data['top_rating_users'] = stats.get_top_rating_users()
    return render_template('index.html', data=data)


@bp.route('/login')
def login():
    uri = auth.login()
    return redirect(uri)


@bp.route('/game')
@auth.is_auth
def game(data: dict):
    return render_template('game.html', data=data)


@bp.route('/spectate')
@auth.is_auth
def spectate(data: dict):
    return render_template('not_yet.html', data=data)


@bp.route('/profile')
@auth.is_auth
def profile(data: dict):
    return render_template('not_yet.html', data=data)


@bp.route('/logout')
def logout():
    auth.logout()
    return redirect('/')


@bp.route('/authorize')
@handle_exceptions
def authorize():
    if not request.args.get('state') or not request.args.get('code'):
        raise BadRequest
    auth.authorize(request.args.get('state'), request.args.get('code'))
    return redirect('/')
