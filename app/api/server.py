from flask import Blueprint, request, redirect, session

from services import auth

bp = Blueprint('server', __name__, url_prefix='/api')


@bp.route('/login')
def login():
    uri = auth.login()
    return redirect(uri)


@bp.route('/authorize')
def authorize():
    if not request.args.get('state') or not request.args.get('code'):
        return redirect('/error')

    auth.authorize(request.args.get('state'), request.args.get('code'))
    return redirect('/')


@bp.route('/logout')
def logout():
    session.clear()
    return redirect('/')
