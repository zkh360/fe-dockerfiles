FROM zenika/alpine-chrome:with-node

WORKDIR /opt/app
COPY package.json ./
RUN npm install

COPY *.js ./

EXPOSE 3000
CMD ["node", "server.js"]