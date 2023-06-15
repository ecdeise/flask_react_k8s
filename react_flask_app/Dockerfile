FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --silent

COPY . .

# Application Environment variables
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

RUN npm run build:dev

# Install serve globally
RUN npm install -g serve

EXPOSE 3000

# CMD ["npm", "run", "build:dev"]
# Start the application using serve
CMD ["serve", "-s", "build"]

