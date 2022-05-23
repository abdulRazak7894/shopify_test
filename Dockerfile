FROM node:current-alpine

ENV NODE_ENV=production

RUN mkdir /app
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --production

COPY . .

WORKDIR /app/frontend
# COPY ./frontend /app/frontend
RUN npm install
RUN npm run build
RUN cp -R ./build/* ../public

WORKDIR /app

CMD ["npm", "run", "dev"]
