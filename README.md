# 📰 News Aggregator API

A RESTful API built with **Node.js**, **Express**, **MongoDB**, and **NewsAPI**, providing user authentication, preference management, and news fetching based on user-selected categories and language.

---

## 🚀 Features

* ✅ User registration & login with **JWT** authentication
* 🔒 Secure password hashing using **bcrypt**
* 🎯 Save & manage user preferences (categories, language)
* 🗞️ Fetch personalized news from **NewsAPI**
* 🔐 Protected routes for authenticated users

---

## 📌 API Endpoints

### 👤 Auth & User

* `POST /users/signup`
  Register a new user
  **Body:**

  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "yourpassword",
    "preferences": ["technology", "sports"]
  }
  ```

* `POST /users/login`
  Login and receive JWT token
  **Body:**

  ```json
  {
    "email": "john@example.com",
    "password": "yourpassword"
  }
  ```

---

### ⚙️ Preferences

* `GET /users/preferences`
  Fetch current user preferences
  **Headers:**
  `Authorization: Bearer <token>`

* `PUT /users/preferences`
  Update user preferences
  **Headers:**
  `Authorization: Bearer <token>`
  **Body:**

  ```json
  {
    "preferences": ["business", "science"]
  }
  ```

---

### 📰 News

* `GET /news`
  Get top headlines based on user preferences
  **Headers:**
  `Authorization: Bearer <token>`

---

## 🛠️ Getting Started

### 📦 Prerequisites

* Node.js v18+
* MongoDB instance (local or remote)
* [NewsAPI Key](https://newsapi.org/)

---

### ⚙️ Installation

```bash
git clone <repo-url>
cd news-aggregator-api-AshishJha30
npm install
```

---

### 🧪 Setup `.env`

Create a `.env` file in the root:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/newsdb
JWT_SECRET=your_jwt_secret
NEWS_API_KEY=your_newsapi_key
```

---

### ▶️ Start Server

```bash
npm start
```

---

### ✅ Run Tests

```bash
npm test
```

---

## 🗂️ Project Structure

```
app.js                - App entry point
src/
  controllers/        - Route handlers (users, news)
  models/             - Mongoose schemas
  routes/             - API route definitions
  middlewares/        - Auth, logger, validation middleware
test/                 - TAP-based integration tests
```

---

## 📄 License

[ISC](https://opensource.org/licenses/ISC)

