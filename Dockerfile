# Step 1: Use the official Node.js image from Docker Hub
FROM node:20

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json into the container
COPY package*.json ./

# Step 4: Install the dependencies inside the container
RUN npm install

# Step 5: Copy the rest of the application code into the container
COPY . .

# Step 6: Expose the port your app will run on (default for Node.js is usually 3000)
EXPOSE 3000

# Step 7: Define the command to run your app
CMD ["node", "app.js"]
