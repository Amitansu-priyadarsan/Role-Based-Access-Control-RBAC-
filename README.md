# 🚀  Role-Based Authentication and Authorization System (RBAC)

This project implements a **Role-Based Access Control (RBAC)** system using Node.js, Express, Sequelize, and MySQL. The system supports user registration, login, and access to protected routes based on roles such as Admin, User, and Moderator.

---

## 🌟 Features

- 🔒 **User Registration**: Users can register with a name, email, password, and role.
- 🔑 **User Login**: Users can log in and receive a JWT token.
- 🛡️ **Protected Routes**: Access is restricted based on valid JWT tokens.
- 🧑‍💻 **Role-Based Access Control**: Users' access to routes is determined by their roles (e.g., Admin, User, Moderator).
- 🗄️ **Database Integration**: Uses MySQL for persistence with Sequelize ORM.

---
## ⚙️ Prerequisites

Before running the application, ensure you have the following installed:

- 🟢 **Node.js** (v14 or above)
- 🐬 **MySQL**
- 🛠️ **Postman** (or any API testing tool)

---

## 🛠️ Installation

1. **📂 Clone the repository**:
    ```bash
    git clone https://github.com/your-repository-url.git
    cd rbac-auth-system
    ```

2. **📦 Install dependencies**:
    ```bash
    npm install
    ```

3. **🔧 Set up environment variables**:
    Create a `.env` file in the project root with the following values:
    ```plaintext
    PORT=5001
    DB_NAME=rbac_auth
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_HOST=localhost
    JWT_SECRET=your_secret_key
    ```

4. **🛢️ Set up the database**:
    - Create a database named `rbac_auth` in MySQL.
    - The application will automatically create the required tables on startup.

5. **▶️ Start the server**:
    ```bash
    npm start
    ```

6. **🧪 Test the application**:
    - Use Postman or any API testing tool to interact with the API.

---

## 📋 API Endpoints

### 🔐 Authentication Routes

#### 1️⃣ **Register User**
   **Endpoint**: `POST /api/register`  
   **Request Body**:
   ```json
   {
       "name": "John Doe",
       "email": "john.doe@example.com",
       "password": "password123",
       "role": "User"
   }

```
Response:

```
{
    "message": "User registered successfully"
}
```

2. Login
 ** Endpoint : `POST /api/login`
 ** Request Body 
   ```
   
   {
    "email": "john.doe@example.com",
    "password": "password123"
   }
```
```

Response:
```

{
    "message": "Login successful",
    "token": "<JWT_TOKEN>"
}
```

```
```
# Protected Routes

## 1. Access Protected Route

### Endpoint:
`GET /api/protected`

### Headers:
```plaintext
Authorization: Bearer <JWT_TOKEN>
```
# Response:
### If the token is valid:
```
This is the protected route, accessible only with a valid token!
```
# If the token is invalid or missing:
```
{
    "error": "Invalid or expired token"
}
```
### Database Schema
# Tables
### 1.Roles
```
| Column     | Type               | Description                       |
|------------|--------------------|-----------------------------------|
| id         | INT (Primary Key)  | Role ID                          |
| name       | VARCHAR(255)       | Role name (e.g., Admin, User)     |
| createdAt  | DATETIME           | Timestamp of creation            |
| updatedAt  | DATETIME           | Timestamp of update              |
```
### Users
```
| Column     | Type               | Description                       |
|------------|--------------------|-----------------------------------|
| id         | INT (Primary Key)  | User ID                          |
| name       | VARCHAR(255)       | User's name                      |
| email      | VARCHAR(255)       | User's email (unique)            |
| password   | VARCHAR(255)       | Hashed password                  |
| roleId     | INT (Foreign Key)  | Associated Role ID               |
| createdAt  | DATETIME           | Timestamp of creation            |
| updatedAt  | DATETIME           | Timestamp of update              |

```
## Middleware
## Authentication Middleware (authMiddleware.js)
This middleware verifies the JWT token provided in the Authorization header. If valid, it attaches the user information to the request object.


# How to Test
### Using Postman:
###  Register a user using the /api/register endpoint.
###  Log in using the /api/login endpoint to receive a JWT token.
###  Copy the token and include it in the Authorization header as Bearer <JWT_TOKEN> when accessing the /api/protected route.

# 👤 Author

### Amitansu Priyadarsan


### 🖥️ Skills:: Full Stack Developer, Data Analyst, Expertise in MERN Stack, Spring Boot, Flutter, and SQL.
