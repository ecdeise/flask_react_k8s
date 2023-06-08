FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --silent

COPY . .

# Application Environment variables
ENV NODE_ENV production
ENV NODE_CONFIG /app/config.json
RUN echo "NODE_ENV is set to $NODE_ENV"

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
