FROM python:3.9-buster as build-stage

WORKDIR /build
COPY . ./

RUN python setup.py bdist_wheel

FROM python:3.9-buster

WORKDIR /usr/src/server
COPY --from=build-stage /build/dist/*.whl .
RUN pip install --find-links=/usr/src/server fivethreeonecalc
RUN pip install gunicorn
CMD gunicorn -w 2 --bind 0.0.0.0:5000 fivethreeonecalc:create_app
