FROM python:3

WORKDIR /usr/src/server

COPY requirements.txt __init__.py app.py ./
RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install gunicorn

COPY app.py routes ./routes/