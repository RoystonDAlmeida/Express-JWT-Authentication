# Express Authentication API

This is a simple authentication API built with Node.js, Express, and MongoDB. It provides endpoints for user signup and login, as well as token-based access to protected resources.

## Features

- User registration (signup)
- User login with JWT authentication
- Protected route to access user details
- Error handling for various scenarios

## Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose)
- JSON Web Tokens (JWT)
- dotenv for environment variable management

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (or a MongoDB Atlas account)

### Installation

1. Clone the repository:

```bash
git clone git@github.com:RoystonDAlmeida/Express-JWT-Authentication.git
cd Express-JWT-Authentication/
```

2. Install the required packages:

```bash
npm install
```

3. Create a `.env` file in the root directory of the project and add the following environment variables:

```bash
PORT = 
MONGODB_CONNECTION_URL = 
JWT_SECRET_KEY = 
```

### Running the Application

- To start the server, run:

```bash
node app.js
```

The server will listen on the port specified in your `.env` file (default is 5000).

### API Endpoints

#### 1. User Signup

**Endpoint:** `POST /signup`

**Request Body:**

```json
{
"name": " ",
"email": " ",
"password": " "
}
```

**Response:**

```json
{
"success": true,
    "data": {
        "userId": " ",
        "email": " ",
        "token": " "
    }
}
```

#### 2. User Login

**Endpoint:** `POST /login`

**Request Body:**

```json
{
"email": " ",
"password": " "
}
```

**Response:**

```json
{
"success": true,
"data": {
    "userId": " ",
    "email": " ",
    "token": " "
}
}
```

#### 3. Access Protected Resource

**Endpoint:** `GET /accessResource`

**Headers:**

```bash
Authorization: Bearer <jwt_token>
```

**Response:**

```json
{
"success": true,
"data": {
    "userId": " ",
    "email": " "
}
}
```

## Error Handling

The API returns appropriate HTTP status codes and error messages for various scenarios such as missing fields, incorrect login details, and server errors.