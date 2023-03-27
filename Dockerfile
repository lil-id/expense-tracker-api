# Dijalankan saat membuat image

FROM node:latest

WORKDIR /app

# COPY package.json and package-lock.json files
COPY package*.json ./

# generated prisma files
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

# COPY
COPY . .

RUN npm install

EXPOSE 8000

CMD [ "npm", "run", "migration" ]