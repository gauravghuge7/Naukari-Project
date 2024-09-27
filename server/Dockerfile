FROM ubuntu

RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get upgrade -y
RUN apt-get install -y nodejs



WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5000

ENTRYPOINT [ "node", "./src/index.js" ]



# FROM ubuntu

# RUN apt-get update
# RUN apt-get install -y curl
# RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
# RUN apt-get upgrade -y
# RUN apt-get install -y nodejs


# COPY package.json package.json
# COPY package-lock.json package-lock.json
# # COPY main.js main.js

# RUN npm install

# ENTRYPOINT [ "node", "main.js" ]