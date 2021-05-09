from flask import render_template, Blueprint, abort, session

bp = Blueprint('client', __name__)


@bp.route('/')
def index():
    data = {'title': 'ZAGOLOVOK'}
    if 'user' in session:
        data['user'] = 'Valera'
    return render_template('index.html', data=data)


@bp.route('/game')
def game():
    return render_template('game.html')


@bp.route('/error')
def error():
    abort(404)
