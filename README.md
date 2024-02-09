# News Aggregator API - Contd.

## **Objective:**

Build a RESTful API that allows users to fetch news articles from multiple sources based on their preferences.

This assignment will be on top of the previous week’s work. You need to make changes accordingly.

1. Review the project from Week 2 and identify potential security vulnerabilities.

2. Implement input validation and sanitization for user registration, event creation, and updates.

3. Optimize performance by implementing caching, if not done in the previous week's optional extension.

4. Set up unit testing and write test cases for the API endpoints, focusing on testing input validation and proper functioning of CRUD operations. Make sure to achieve good test coverage and test edge cases.

5. Refactor the API code to improve error handling, ensuring that appropriate error messages are returned for different types of errors (e.g., validation errors, authentication errors, authorization errors, and server errors).

6. Test the API using Postman or Curl to ensure it works as expected and that the implemented security measures are effective.

### 1. **Set up Project:**

   - Initialize a new Node.js project.
   - Install necessary dependencies, including Express.js and Mongoose.

### 2. **Implement RESTful API:**

   - Create the following endpoints:

     - `POST /register`: Register a new user.
     - `POST /login`: Log in a user.
     - `GET /preferences`: Retrieve the news preferences for the logged-in user.
     - `PUT /preferences`: Update the news preferences for the logged-in user.
     - `GET /news`: Fetch news articles based on the logged-in user's preferences.

   - Use external news APIs to fetch news articles from multiple sources. Incorporate async/await and Promises in the process of fetching news data and filtering it based on user preferences.

   - Implement proper error handling for invalid requests.

   - Add input validation for user registration and news preference updates.

### 3. **Testing:**

   - Test the API using Postman or Curl to ensure it works as expected.

### 4. **Submission Guidelines:**

   - Initialize a new Node.js project.

   - Develop your News Aggregator API according to the project requirements and optional extensions (if implemented) in the project brief.

   - Write a clear and concise `README.md` file.

   - Provide a link to your GitHub repository for submission. Ensure the repository is public.

---

# Step-by-Step Guide:

## Step 1: Initialize a new Node.js project

 Create a new directory for your project

mkdir news-aggregator-api---contd
cd news-aggregator-api---contd

Initialize a new Node.js project

npm init -y

## Step 2: Install Dependencies
Install necessary packages like Express and body-parser.
npm install express body-parser

## Step 3: Implementing the API

## Step 4: Testing

## Run the application
node src/app.js
