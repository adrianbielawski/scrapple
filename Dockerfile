FROM nikolaik/python-nodejs:python3.10-nodejs12 as builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx
COPY --from=builder /app/dist /usr/share/nginx/html
