FROM node:12.18.3
    
WORKDIR /usr/src/client
COPY . .
run npm install --production
EXPOSE 3000
CMD ["npm", "start"]