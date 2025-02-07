# Use an official Node.js runtime as a parent image
FROM node:20
# Set the working directory in the container
WORKDIR /usr/src/app
# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
# Install app dependencies
RUN npm install
# Bundle app source
COPY . .
# Expose the port your app runs on
EXPOSE 5050
#PM2
RUN npm install pm2 -g
ENV PM2_PUBLIC_KEY y09zo4lb6cz20hn
ENV PM2_SECRET_KEY rd3xfo6grp4uqsm

# Define the command to run your app
CMD [ "node", "index.js" ]