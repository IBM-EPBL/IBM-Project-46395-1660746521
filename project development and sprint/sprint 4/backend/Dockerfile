FROM python:3.10.8
WORKDIR /app

COPY ./config.py ./requirements.txt ./server.py ./DigiCertGlobalRootCA.crt ./template.py ./
RUN pip install --upgrade pip setuptools wheel
RUN pip install -r ./requirements.txt

EXPOSE 5000
CMD ["python", "./server.py"]
