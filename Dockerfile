# Specify the base image
FROM node:14-alpine

# Install openssh-client package
RUN apk add --no-cache openssh-client

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and yarn.lock files to the container
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the source code to the container
COPY . .

# Start the application
CMD ["yarn", "start"]
