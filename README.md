# 🔐 MERN Stack Authentication

A full-stack authentication system built with **MongoDB**, **Express.js**, **React**, and **Node.js**.  
Features include user registration, email OTP verification, JWT-based login, access/refresh token rotation, and multi-device logout.

---

## 📁 Project Structure

```
Authentication/
├── client/              # React frontend (Vite)
│   ├── src/
│   │   ├── api/
│   │   │   └── axiosInstance.js   # Axios with interceptors & auto token refresh
│   │   ├── context/
│   │   │   └── AuthContext.jsx    # React auth context
│   │   ├── pages/
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── VerifyEmailPage.jsx
│   │   │   └── GetMePage.jsx
│   │   ├── App.jsx                # Routes definition
│   │   └── main.jsx
│   ├── vite.config.js             # Vite + proxy config
│   └── package.json
│
└── server/              # Express.js backend
    ├── src/
    │   ├── config/                # DB & app config
    │   ├── controllers/
    │   │   └── auth.controller.js # All auth logic
    │   ├── models/
    │   │   ├── user.model.js
    │   │   ├── session.model.js
    │   │   └── otp.model.js
    │   ├── routes/
    │   │   └── auth.routes.js
    │   ├── services/
    │   │   └── email.service.js   # Nodemailer (Gmail OAuth2)
    │   └── utils/
    │       └── util.js            # OTP generator & HTML template
    ├── server.js                  # Entry point
    └── package.json
```

---

## ⚙️ Prerequisites

Make sure the following are installed on your machine:

- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account (or local MongoDB)
- A Gmail account with OAuth2 credentials (for sending OTP emails)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Sudhanshu9155/Authentication-By-Using-MERN-Stack.git
cd Authentication
```

---

### 2. Setup the Server

```bash
cd server
npm install
```

#### Create the `.env` file inside `server/`

```env
# MongoDB connection string
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/authentication

# JWT secret key (use a long random string)
JWT_SECRET=your_jwt_secret_key_here

# Gmail OAuth2 credentials (for sending OTP emails)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REFRESH_TOKEN=your_google_refresh_token
GOOGLE_USER=your_gmail_address@gmail.com
```

> **How to get Gmail OAuth2 credentials:**
> 1. Go to [Google Cloud Console](https://console.cloud.google.com/)
> 2. Create a project → Enable **Gmail API**
> 3. Create **OAuth 2.0 Client ID** (Desktop app)
> 4. Use [OAuth Playground](https://developers.google.com/oauthplayground/) to generate the refresh token for scope `https://mail.google.com/`

#### Start the server

```bash
npm run dev
```

The server runs on **http://localhost:3000**

---

### 3. Setup the Client

```bash
cd client
npm install
npm run dev
```

The client runs on **http://localhost:5173**

> The Vite dev server automatically proxies all `/api` requests to `http://localhost:3000`, so no CORS issues during development.

---

## 🌐 Application Routes (Frontend)

| Path            | Page             | Description                      |
|-----------------|------------------|----------------------------------|
| `/`             | Redirect         | Redirects to `/login`            |
| `/register`     | RegisterPage     | Create a new account             |
| `/login`        | LoginPage        | Sign in with email & password    |
| `/verify-email` | VerifyEmailPage  | Enter the OTP sent to your email |
| `/me`           | GetMePage        | View the currently logged-in user|

---

## 🔌 API Endpoints (Backend)

Base URL: `http://localhost:3000/api/auth`

| Method | Endpoint         | Description                                   | Auth Required |
|--------|------------------|-----------------------------------------------|---------------|
| POST   | `/register`      | Register a new user, sends OTP via email      | ❌            |
| POST   | `/verify-email`  | Verify email using OTP                        | ❌            |
| POST   | `/login`         | Login and receive access + refresh tokens     | ❌            |
| GET    | `/get-me`        | Get current user info from access token       | ✅ Bearer     |
| POST   | `/refresh-token` | Rotate refresh token and get new access token | 🍪 Cookie     |
| GET    | `/logout`        | Revoke current session                        | 🍪 Cookie     |
| GET    | `/logout-all`    | Revoke all sessions (all devices)             | 🍪 Cookie     |

---

## 📋 API Usage Examples

### Register

```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Response:**
```json
{
  "message": "User registered successfully. Check your email for the OTP.",
  "user": { "username": "john_doe", "email": "john@example.com", "verified": false }
}
```

---

### Verify Email

```http
POST /api/auth/verify-email
Content-Type: application/json

{
  "email": "john@example.com",
  "otp": "123456"
}
```

---

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Response:**
```json
{
  "message": "Logged in successfully",
  "accessToken": "<jwt_access_token>",
  "user": { "id": "...", "username": "john_doe", "email": "john@example.com", "verified": true }
}
```

> The `refreshToken` is set as an **httpOnly cookie** automatically.

---

### Get Current User

```http
GET /api/auth/get-me
Authorization: Bearer <accessToken>
```

---

### Refresh Access Token

```http
POST /api/auth/refresh-token
```

> Reads the `refreshToken` cookie automatically. Returns a new `accessToken`.

---

### Logout

```http
GET /api/auth/logout
```

> Revokes the current session. Clears the `refreshToken` cookie.

---

### Logout All Devices

```http
GET /api/auth/logout-all
```

> Revokes all active sessions for the user.

---

## 🔐 Authentication Flow

```
User registers
    ↓
OTP sent to email
    ↓
User verifies OTP  →  account marked as verified
    ↓
User logs in
    ↓
Server returns:
  - accessToken (15 min, in response body)
  - refreshToken (7 days, httpOnly cookie)
    ↓
Client stores accessToken in localStorage
    ↓
Every API request → Authorization: Bearer <accessToken>
    ↓
On 401 response → Axios interceptor auto-calls /refresh-token
    ↓
New accessToken issued, original request retried
```

---

## 🗄️ Database Models

### User
| Field      | Type    | Description                     |
|------------|---------|---------------------------------|
| `username` | String  | Unique username                 |
| `email`    | String  | Unique email address            |
| `password` | String  | SHA-256 hashed password         |
| `verified` | Boolean | Whether email has been verified |

### Session
| Field              | Type     | Description                         |
|--------------------|----------|-------------------------------------|
| `userId`           | ObjectId | Reference to the User               |
| `refreshTokenHash` | String   | SHA-256 hash of the refresh token   |
| `ip`               | String   | IP address of the login             |
| `userAgent`        | String   | Browser/device info                 |
| `revoked`          | Boolean  | Whether the session was revoked     |

### OTP
| Field     | Type     | Description                          |
|-----------|----------|--------------------------------------|
| `email`   | String   | Email the OTP was sent to            |
| `user`    | ObjectId | Reference to the User                |
| `otpHash` | String   | SHA-256 hash of the OTP              |

> OTP documents expire automatically via a TTL index.

---

## 📦 Tech Stack

### Backend
| Package         | Purpose                         |
|-----------------|---------------------------------|
| `express`       | Web framework                   |
| `mongoose`      | MongoDB ODM                     |
| `jsonwebtoken`  | JWT signing & verification      |
| `nodemailer`    | Sending OTP emails via Gmail    |
| `cookie-parser` | Parsing httpOnly cookies        |
| `morgan`        | HTTP request logger             |
| `dotenv`        | Environment variable loading    |
| `nodemon`       | Auto-restart during development |

### Frontend
| Package            | Purpose                        |
|--------------------|--------------------------------|
| `react`            | UI library                     |
| `react-dom`        | DOM rendering                  |
| `react-router-dom` | Client-side routing            |
| `axios`            | HTTP client with interceptors  |
| `vite`             | Fast dev server & bundler      |

---

## 🔒 Security Notes

- Passwords are hashed with **SHA-256** before storing.
- OTPs are stored as **SHA-256 hashes** — never in plaintext.
- The `refreshToken` is stored in an **httpOnly cookie** (not accessible via JS), preventing XSS theft.
- Refresh tokens are **rotated on every use** (refresh token rotation).
- Sessions can be **individually revoked** (logout) or **all revoked at once** (logout-all).
- Before deploying to production:
  - Set `secure: true` on cookies (requires HTTPS).
  - Use a strong random `JWT_SECRET`.
  - Do **not** commit your `.env` file to version control.

---

## 🛠️ Scripts

### Server
```bash
npm run dev     # Start with nodemon (auto-restart)
```

### Client
```bash
npm run dev     # Start Vite dev server
npm run build   # Build for production
npm run preview # Preview production build
```

---

## 📄 License

This project is open-source and available under the [ISC License](https://opensource.org/licenses/ISC).
