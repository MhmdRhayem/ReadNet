# ReadNet

## Overview
This project is a Node.js-based API that allows authors to manage their books while enabling readers to explore books and add them to their favorites. The system includes JWT authentication to secure endpoints and ensure proper access control.

## Features
- **User Authentication**: Uses JWT-based authentication for secure access.
- **Role-Based Access Control (RBAC)**: Different levels of permissions for authors and readers, ensuring better security and functionality.
- **Authors**:
  - Register/Login.
  - Upload and manage books (Create, Update, Delete).
  - Book Cover Image Uploads: Authors can upload cover images for their books, enhancing visual appeal.
- **Readers**:
  - Browse available books.
  - View book details.
  - Add books to their favorites.
- **Middleware**: Implements authentication and authorization.
- **RESTful API**: Organized and structured API endpoints.

## Technologies Used
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JSON Web Token (JWT)
- **Frontend (Public Directory)**: HTML, CSS, BootStrap

## Project Structure
```
├── controllers
│   ├── authController.js
│   ├── authorController.js
│   ├── readerController.js
│
├── middleware
│   ├── auth.js
│
├── models
│   ├── Book.js
│   ├── Genre.js
│   ├── User.js
│
├── public
│   ├── author
│   ├── cover_pages
│   ├── css
│   ├── reader
│   ├── login.html
│   ├── signup.html
│
├── routes
│   ├── authorRoutes.js
│   ├── authRoutes.js
│   ├── generalRoutes.js
│   ├── readerRoutes.js
│
├── node_modules
```

## Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/MhmdRhayem/ReadNet
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add the following variables:
   ```env
   JWT_SECRET=jwt_secret
   DB_USER=db_username
   DB_PASSWORD=db_password
   DB_HOST=host
   DB_DATABASE=db_projectname
   ```

4. **Run the project**
   ```sh
   npm start
   ```

## Future Enhancements
- Develop a frontend UI for enhanced user experience.

