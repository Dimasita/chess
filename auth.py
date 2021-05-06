import uuid
import urllib.parse
import requests
from flask import Flask, render_template, redirect, request, session, jsonify
from config import VK_OAUTH_CONFIG


def login() -> str:
    state = uuid.uuid4().hex
    session['state'] = state
    params = {
        'client_id': VK_OAUTH_CONFIG['client_id'],
        'redirect_uri': VK_OAUTH_CONFIG['redirect_uri'],
        'display': VK_OAUTH_CONFIG['display'],
        'scope': VK_OAUTH_CONFIG['scope'],
        'response_type': VK_OAUTH_CONFIG['response_type'],
        'state': state
    }
    return f'{VK_OAUTH_CONFIG["authorize_url"]}?{urllib.parse.urlencode(params)}'


def authorize(state: str, token: str) -> None:
    if not session['state'] or session['state'] != state:
        # log this
        return

    session.pop('state', None)
    params = {
        'client_id': VK_OAUTH_CONFIG['client_id'],
        'client_secret': VK_OAUTH_CONFIG['client_secret'],
        'redirect_uri': VK_OAUTH_CONFIG['redirect_uri'],
        'code': request.args.get('code')
    }

    resp = requests.get(VK_OAUTH_CONFIG['access_token_url'], params=params)
    response = resp.json()
    if 'error' in response:
        # log this
        return

    check_user(response)


def check_user(info: str) -> None:
    session['user'] = 'True'