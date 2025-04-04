

# SheHope Backend

**SheHope Backend** serves as the server-side application for the SheHope platform, handling data management, user authentication, and business logic.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

SheHope is a platform dedicated to supporting individuals facing unintended pregnancies. The backend serves as the core of the application, managing user data, providing personalized recommendations, and facilitating various support services.

## Features

- **User Authentication**: Secure endpoints for user registration, login, and profile management.
- **Recommendation System**: Provide trimester-based recommendations tailored to user needs.
- **Community Features**: Manage posts, comments, likes, and reports to foster community engagement.
- **Legal Resources**: Serve legal documents and advice to assist users.
- **Event Management**: Handle event scheduling and reminders for important dates.
- **Donation System**: Process donation requests and contributions to support users.
- **Admin Panel**: Admin functionalities to manage users, content, donations, and events.

## Tech Stack

- **Backend Framework**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **API Documentation**: Swagger
- **Deployment**: Render

## Getting Started

To set up the SheHope Backend locally, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (installed locally or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/shehope-backend.git
   cd shehope-backend
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` file in the root directory and add the following variables:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Replace `your_mongodb_connection_string` and `your_jwt_secret` with your actual MongoDB URI and a secret key for JWT.

### Running the Application

1. **Start the Development Server**:

   ```bash
   npm start
   ```

   The server will run on `http://localhost:5000`.

2. **Run in Production Mode**:

   ```bash
   npm run start:prod
   ```

   Ensure that your environment variables are correctly set for production.

## API Endpoints

Here are some of the main API endpoints:
-`POST /api/user/register`: Register a new user.
- `POST /api/admin/register`: Register a new user.
- `POST /api/user/login`: Authenticate a user and receive a JWT.
- `GET /api/recommendations`: Fetch trimester-based recommendations.
- `POST /api/community/posts`: Create a new post.
- `GET /api/community/posts`: Retrieve posts.
- `POST /api/legal`: Submit legal inquiries.
- `POST /api/events`: Schedule a new event.
- `POST /api/donations`: Make a donation.
- `GET /api/admin/users`: List all users (Admin only).



## Deployment

The backend is deployed on [Render](https://render.com/). The live API is accessible at [https://shehope-server.onrender.com](https://shehope-server.onrender.com).

## Contributing

We welcome contributions to improve the SheHope platform. To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Install dependencies (`npm install`).
4. Implement your feature or fix.
5. Run tests (`npm test`).
6. Commit your changes (`git commit -am 'Add feature'`).
7. Push to the branch (`git push origin feature-name`).
8. Create a new Pull Request
