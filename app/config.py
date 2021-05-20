import os

APP_SECRET_KEY = os.getenv('APP_SECRET_KEY')

DATABASE_CONFIG = {
    'drivername': 'postgresql+psycopg2',
    'host': os.getenv('DB_HOST'),
    'port': os.getenv('DB_PORT'),
    'username': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD'),
    'database': os.getenv('DB_NAME')
}


VK_OAUTH_CONFIG = {
    'authorize_url': 'https://oauth.vk.com/authorize',
    'access_token_url': 'https://oauth.vk.com/access_token',

    'client_id': os.getenv('VK_OAUTH_CLIENT_ID'),
    'client_secret': os.getenv('VK_OAUTH_CLIENT_SECRET'),
    'redirect_uri': 'http://localhost/authorize',

    'display': 'page',
    'scope': 'friends offline email',
    'response_type': 'code'
}

VK_API_CONFIG = {
    'v': 5.89,
    'lang': 'ru',
    'urls': {
        'get_users': 'https://api.vk.com/method/users.ggg'
    }
}
