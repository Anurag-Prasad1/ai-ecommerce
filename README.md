# 🚀 NovaCart

A modern full-stack AI-powered e-commerce web application built using React, Node.js, Express, and MongoDB Atlas.

NovaCart is designed with scalable backend architecture, reusable frontend components, responsive UI design, AI-powered shopping features, and production-ready development practices.

---

# 📌 Project Overview

NovaCart simulates a real-world scalable e-commerce platform.

The project currently includes:

## ✅ Backend Features

* JWT Authentication
* Protected Routes
* Role-Based Authorization
* Product Management APIs
* Order Management APIs
* Razorpay Payment Integration
* Search & Filtering
* Pagination
* Sorting Optimization
* Product Image Upload System
* MongoDB Atlas Integration
* RESTful API Architecture
* API Rate Limiting

## ✅ Frontend Features

* Responsive React UI
* Reusable Components
* Product Grid Layout
* Product Cards
* Product Details Page
* Shopping Cart
* Checkout Flow
* Order History
* Admin Dashboard
* Responsive Styling
* Dynamic Product Fetching using Axios

## ✅ AI Features

* AI Product Recommendation System
* Smart Search Engine
* Trending Product Analytics
* Conversational Shopping Assistant

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Axios
* CSS3

## Backend

* Node.js
* Express.js

## Database

* MongoDB Atlas
* Mongoose

## Authentication & Security

* JWT (JSON Web Token)
* bcryptjs
* dotenv
* express-rate-limit

## Payment Gateway

* Razorpay

## Development Tools

* Nodemon
* Git & GitHub
* Postman
* VS Code

---

# 📂 Project Structure

```bash
ai-ecommerce/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── styles.css
│   │
│   ├── package.json
│   └── .env
│
├── .gitignore
├── README.md
└── DEPLOYMENT_CHECKLIST.md
```

---

# ⚙️ Setup Instructions

## 1️⃣ Clone Repository

```bash
git clone https://github.com/Anurag-Prasad1/ai-ecommerce.git
```

---

## 2️⃣ Navigate Into Project

```bash
cd ai-ecommerce
```

---

## 3️⃣ Install Backend Dependencies

```bash
cd backend
npm install
```

---

## 4️⃣ Install Frontend Dependencies

Open another terminal:

```bash
cd frontend
npm install
```

---

## 5️⃣ Setup Environment Variables

### Backend

Create:

```bash
backend/.env
```

Example:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
PORT=5000
```

### Frontend

Create:

```bash
frontend/.env
```

Example:

```env
REACT_APP_API_URL=http://localhost:5000
```

---

# ▶️ Running the Application

## Start Backend Server

📍 Run from:

```bash
backend/
```

```bash
npm run dev
```

---

## Start Frontend Server

📍 Run from:

```bash
frontend/
```

```bash
npm start
```

---

# 🌐 Core API Endpoints

## Authentication

### Register User

```http
POST /api/users/register
```

### Login User

```http
POST /api/users/login
```

### User Profile

```http
GET /api/users/profile
```

---

## Products

### Get Products

```http
GET /api/products
```

### Product Search

```http
GET /api/products?keyword=iphone
```

### Category Filter

```http
GET /api/products?category=Electronics
```

### Price Filter

```http
GET /api/products?minPrice=100&maxPrice=1000
```

### Pagination

```http
GET /api/products?pageNumber=2
```

### Sorting

```http
GET /api/products?sort=-price
```

---

## Orders

```http
POST /api/orders
```

```http
GET /api/orders/myorders
```

---

## Payments

```http
POST /api/payments/create-order
```

---

## Uploads

```http
POST /api/upload
```

---

## Chatbot

```http
POST /api/chatbot
```

---

# 🧠 Major Features Implemented

## Authentication & Security

* JWT Authentication
* Password Encryption using bcryptjs
* Protected Routes
* Admin Authorization
* Environment Variable Management
* API Rate Limiting

## E-Commerce Features

* Product Catalog
* Product Details Page
* Shopping Cart
* Order Placement
* Order History
* Inventory Management

## Payment System

* Razorpay Payment Gateway Integration
* Secure Payment Verification

## Admin Features

* Admin Dashboard
* Product Management
* Order Management
* User Management Ready Architecture

## Media Management

* Product Image Upload System
* Public Image Serving

## AI Features

* AI Product Recommendations
* Smart Search Engine
* Trending Product Analytics
* Conversational Shopping Assistant

## Production Readiness

* Environment-Based Configuration
* API Rate Limiting
* Structured Git Workflow
* Deployment Preparation

---

# ⚡ Performance Optimizations

The backend includes multiple optimization techniques:

* Pagination using `.limit()` and `.skip()`
* Dynamic filtering
* Sorting optimization
* Optimized MongoDB queries
* Reduced API payload size
* Efficient API architecture

---

# 🔐 Security Practices

* Password hashing using bcryptjs
* JWT-based authentication
* Protected private routes
* Sensitive data stored in `.env`
* `.env` excluded using `.gitignore`
* No hardcoded credentials
* API Rate Limiting
* Production-ready backend practices

---

# 🚧 Future Improvements

* Gemini AI Integration
* Semantic Product Search
* AI Review Summarizer
* AI Product Description Generator
* Personalized Recommendation Engine
* Email Notifications
* Wishlist System
* Product Reviews & Ratings
* Docker Deployment
* CI/CD Pipeline

---

# 👨‍💻 Author

## Anurag Prasad

* CSE Engineering Student
* Passionate about Full-Stack Development & AI
* Building scalable production-style web applications
* Exploring backend architecture and modern AI systems

---

# 📈 Current Project Status

## Backend

✅ MongoDB Atlas Integration

✅ JWT Authentication

✅ Protected APIs

✅ Product Management

✅ Order Management

✅ Razorpay Integration

✅ Image Upload System

✅ AI Recommendation Engine

✅ Smart Search

✅ Trending Analytics

✅ Shopping Assistant API

✅ Rate Limiting

## Frontend

✅ Product Catalog

✅ Product Details Page

✅ Shopping Cart

✅ Checkout Flow

✅ Order History

✅ Admin Dashboard

✅ Smart Search UI

✅ Trending Products Section

✅ Shopping Assistant Interface

## Deployment

🚀 Deployment Preparation Completed

🚀 Render + Vercel Deployment Coming Next

---

# ⭐ Support

If you found this project useful:

* Star the repository ⭐
* Fork and improve 🔧
* Share with others 🚀
