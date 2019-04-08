FROM node:8

MAINTAINER Mario Antonio Lopez Ruiz <marioanloru@correo.ugr.es>

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY src/ ./src/


#EXPOSE 9000

CMD ["npm", "start"]
