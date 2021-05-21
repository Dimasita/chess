import functools
import uuid
import urllib.parse
import requests
import services.vk_api_worker as vk_api
from typing import Optional
from flask import session
from config import VK_OAUTH_CONFIG
from services.exceptions import *
from db_init import session as db
from models.user import User


def is_auth(func):
    """Декоратор для проверки авторизован ли пользователь"""
    @functools.wraps(func)
    def wrapper():
        data = dict()
        user_name = _check_user_session()
        if user_name is not None:
            data['user'] = user_name
        return func(data=data)
    return wrapper


def login() -> str:
    """Создает и возвращает уникальную ссылку на страницу авторизации (Vk OAuth)"""
    params = {
        'client_id': VK_OAUTH_CONFIG['client_id'],
        'redirect_uri': VK_OAUTH_CONFIG['redirect_uri'],
        'display': VK_OAUTH_CONFIG['display'],
        'scope': VK_OAUTH_CONFIG['scope'],
        'response_type': VK_OAUTH_CONFIG['response_type'],
        'state': _generate_state()
    }
    return f'{VK_OAUTH_CONFIG["authorize_url"]}?{urllib.parse.urlencode(params)}'


def logout() -> None:
    """Удаляет сессию пользователя"""
    _remove_user_session()


def authorize(state: str, code: str) -> None:
    """Получает токен доступа для vk api, сохраняет его в бд и начинает сессию пользователя"""
    _check_state(state)
    params = {
        'client_id': VK_OAUTH_CONFIG['client_id'],
        'client_secret': VK_OAUTH_CONFIG['client_secret'],
        'redirect_uri': VK_OAUTH_CONFIG['redirect_uri'],
        'code': code
    }
    user_id, token = _get_vk_token(params)
    name, surname = _get_user_name(user_id, token)
    _update_token(user_id, token)
    _save_user_session(name, surname)


def _generate_state() -> str:
    """Генерирует и сохраняет uuid для последующей проверки на подмену"""
    state = uuid.uuid4().hex
    session['state'] = state
    return state


def _check_state(state: str) -> None:
    """Проверяет не изменен ли uuid и затем удаляет его"""
    if 'state' not in session or session['state'] != state:
        raise BadRequest
    del session['state']


def _get_vk_token(params: dict[str, str]) -> (int, str):
    """Делает запрос к серверу авторизации vk и возвращает токен доступа"""
    resp = requests.get(VK_OAUTH_CONFIG['access_token_url'], params=params)
    response = resp.json()
    if 'error' in response:
        raise ServerError('error')
    return response['user_id'], response['access_token']


def _update_token(user_id: str, token: str) -> None:
    """Обновляет токен доступа к vk api для пользователя"""
    user = db.query(User).filter_by(id=user_id).scalar()
    user.token = token
    db.add(user)
    db.commit()


def _get_user_name(user_id: str, token: str) -> (str, str):
    """Получает имя пользователя из бд по user id.
    Если запись отсутствует, получает имя пользователя из vk и сохраняет в бд"""

    user = db.query(User).filter_by(id=user_id).scalar()
    if user is None:
        user_info = vk_api.get_single_value('get_users', token)
        name = user_info['first_name']
        surname = user_info['last_name']
        user = User(id=user_id, name=name, surname=surname)
        db.add(user)
        db.commit()
    return user.name, user.surname


def _save_user_session(name, surname) -> None:
    """Ставит сессию для пользователя"""
    session['user'] = f'{name} {surname}'


def _remove_user_session() -> None:
    """Удаляет пользовательскую сессию"""
    session.clear()


def _check_user_session() -> Optional[str]:
    """Проверяет авторизован ли пользователь"""
    if 'user' not in session:
        return None
    return session['user']
