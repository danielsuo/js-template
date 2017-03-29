FROM node

RUN mkdir /server
COPY . /server

WORKDIR /server

RUN ./bin/install

ENTRYPOINT ["gulp"]
