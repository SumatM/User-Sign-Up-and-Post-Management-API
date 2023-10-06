
# User Sign-Up and Post Management API

## Introduction

This project is a Node.js API for user sign-up and post management. It provides endpoints for user registration, login, post creation, post deletion, and fetching user's posts.

## Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT for authentication
- Bcrypt for password hashing
- Dotenv for environment variables

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/SumatM/User-Sign-Up-and-Post-Management-API.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add the necessary variables:

   ```env
   MONGO_ATLAS_DRIVE_LINK=your-mongo-db-uri
   SECRET_KEY=your-secret-key
   ```

4. Start the server:

   ```bash
   npm run server
   ```

## API Endpoints

1. **User Sign-Up API**
   - Endpoint: `POST /api/signup`
   - Request Body:
     ```json
     {
       "name": "User Name",
       "email": "user@example.com",
       "password": "userpassword"
     }
     ```
   - Response: 200 OK

2. **User Login API**
   - Endpoint: `POST /api/login`
   - Request Body:
     ```json
     {
       "email": "user@example.com",
       "password": "userpassword"
     }
     ```
   - Response: 200 OK

3. **Create Post API**
   - Endpoint: `POST /api/posts`
   - Request Body:
     ```json
     {
       "userId": "user-id",
       "content": "Post content"
     }
     ```
   - Response: 200 OK

4. **Delete Post API**
   - Endpoint: `DELETE /api/deletepost/:postId`
   - Request Params:
     - `postId`: ID of the post to be deleted
     - `userId`: ID of the user who created the post
   - Response: 200 OK

5. **Fetch User's Posts API**
   - Endpoint: `GET /api/posts/:userId`
   - Request Params:
     - `userId`: ID of the user whose posts are to be fetched
   - Response: 200 OK with an array of posts

Thank you for exploring my User Sign-Up and Post Management API! If you have any questions or feedback, feel free to [reach out](https://sumatm.github.io/). Happy coding!

