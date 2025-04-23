FROM node:20

WORKDIR /app

COPY . .

RUN npm install && npm install -g serve

EXPOSE 8080

CMD npm run build && serve -s build -l 8080