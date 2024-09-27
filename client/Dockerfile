
# FROM ubuntu:latest

# RUN apt-get update
# RUN apt-get install -y curl
# RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
# RUN apt-get upgrade -y
# RUN apt-get install -y nodejs 


# WORKDIR /app

# COPY . .


# RUN npm install    # install dependencies in container 


# CMD ["npm", "run", "dev"]



FROM node:18-alpine

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . /app

CMD ["npm", "run", "dev"]  