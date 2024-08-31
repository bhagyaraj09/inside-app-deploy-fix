#base image
FROM node:18.18.0-alpine

#Create and change to the app directory
WORKDIR /usr/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY . .

RUN npm install

RUN npm run build

CMD ["npm", "start"]