
FROM node


WORKDIR /myapp


COPY . .


RUN npm install    # install dependencies in container 


CMD ["npm", "run", "dev"]


#  expose the port for outside the container 

EXPOSE 3000 




# RUN npm run dev    # run the app in development mode


