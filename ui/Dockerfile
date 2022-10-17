FROM node:18.10.0-alpine3.15

WORKDIR /app

COPY ./package*json .

RUN npm i 

RUN npm install -g @angular/cli 

CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]