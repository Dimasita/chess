import os

APP_SECRET_KEY = 'os.getenv(APP_SECRET_KEY)'

DATABASE_CONFIG = {
    'drivername': 'postgresql+psycopg2',
    'host': 'localhost',
    'port': '5432',
    'username': 'Dimas',
    'password': 'Dima12345',
    'database': 'chess'
}


VK_OAUTH_CONFIG = {
    'authorize_url': 'https://oauth.vk.com/authorize',
    'access_token_url': 'https://oauth.vk.com/access_token',

    'client_id': 7846692,
    'client_secret': 'J6HWERzMqZVz6sBs1RC9',
    'redirect_uri': 'http://localhost/authorize',

    'display': 'page',
    'scope': 'friends offline email',
    'response_type': 'code'
}
