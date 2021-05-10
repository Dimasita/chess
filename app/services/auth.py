import uuid
import urllib.parse
import requests
from redis_init import r
from flask import request, session, jsonify
from config import VK_OAUTH_CONFIG


def login() -> str:
    """Создает уникальную ссылку на страницу авторизации (Vk OAuth)"""

    state = uuid.uuid4().hex
    r.set('state', state, 600)
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
    base_state = r.get('state')
    if base_state != state:
        # log this
        return

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
