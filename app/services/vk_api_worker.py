from typing import Union

import requests

from config import VK_API_CONFIG
from services.exceptions import VkApiError


def get_single_value(method: str, token: str, **kwargs) -> dict:
    data = _send_request_to_vk_api(method, token, **kwargs)
    if type(data) == list:
        return data.pop()
    return data


def get_multiple_values(method: str, token: str, **kwargs) -> list:
    return _send_request_to_vk_api(method, token, **kwargs)


def _send_request_to_vk_api(method: str, token: str, **kwargs) -> Union[list, dict]:
    resp = requests.get(
        VK_API_CONFIG['urls'][method],
        params={'access_token': token, 'v': VK_API_CONFIG['v'], 'lang': VK_API_CONFIG['lang'], **kwargs}
    )
    r = resp.json()
    if 'error' in r or 'response' not in r:
        raise VkApiError(r['error'])
    data = resp.json()['response']
    return data
