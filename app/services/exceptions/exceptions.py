from flask import abort
import functools


def handle_exceptions(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        try:
            func(*args, **kwargs)
        except BaseHttpException as e:
            abort(e.code, e.message)

    return wrapper


class BaseHttpException(Exception):
    code: int
    message: str

    def __init__(self, message=None):
        if message is not None:
            self.message = message
        print(f'Got {self.code} error: \n\t{self.message}')


class BadRequest(BaseHttpException):
    code = 400
    message = 'Bad request'


class ServerError(BaseHttpException):
    code = 500
    message = 'Server error'


class VkApiError(BaseHttpException):
    code = 500
    message = 'VK api request returned error'
