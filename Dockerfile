FROM some-base-image

# Install dependencies
RUN apt-get update && apt-get install -y openssh-client

# Copy your application code to the container
COPY . /app

# Set the working directory
WORKDIR /app

# Run your application
CMD ["yarn", "src/bot.js"]
