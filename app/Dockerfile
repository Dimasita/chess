FROM python:3.9.4
EXPOSE 5000
COPY ./wait-for-it.sh ./wait-for-it.sh
WORKDIR /app
COPY ./requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt