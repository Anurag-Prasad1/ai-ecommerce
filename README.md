# 🚀 AI E-commerce Backend

A scalable backend system for an AI-powered e-commerce platform built using Node.js, Express, and MongoDB.

---

# 📌 Project Overview

This project simulates a production-level backend architecture for an intelligent e-commerce system.

The backend currently supports:

- User Authentication (JWT)
- Protected Routes
- Product APIs
- Search & Filtering
- Pagination
- Sorting Optimization
- MongoDB Database Integration
- RESTful API Structure
- Scalable Backend Architecture

---

# 🛠️ Tech Stack

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose

## Authentication & Security

- JWT (JSON Web Token)
- bcryptjs
- dotenv

## Development Tools

- Nodemon
- Git & GitHub
- Postman

---

# 📂 Project Structure

```bash
ai-ecommerce/
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── productController.js
│   │   └── userController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── Product.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── productRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── utils/
│   │   └── generateToken.js
│   │
│   ├── server.js
│   └── package.json
│
├── .env.example
├── .gitignore
└── README.md
```

---

# ⚙️ Setup Instructions

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/Anurag-Prasad1/ai-ecommerce.git
cd ai-ecommerce
```

---

## 2️⃣ Install Dependencies

```bash
cd backend
npm install
```

---

## 3️⃣ Setup Environment Variables

Create a `.env` file inside the `backend/` folder.

Copy the following from `.env.example`:

```env
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_here
PORT=5000
```

---

## 4️⃣ Run the Server

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
node server.js
```

---

# 🌐 API Endpoints

# 🏠 Base Route

```http
GET /
```

### Response

```json
{
  "message": "API running with MongoDB 🚀"
}
```

---

# 👤 User Routes

## Register User

```http
POST /api/users/register
```

### Request Body

```json
{
  "name": "Anurag",
  "email": "anurag@gmail.com",
  "password": "123456"
}
```

---

## Login User

```http
POST /api/users/login
```

### Request Body

```json
{
  "email": "anurag@gmail.com",
  "password": "123456"
}
```

---

## Get User Profile (Protected)

```http
GET /api/users/profile
```

### Headers

```http
Authorization: Bearer YOUR_TOKEN
```

---

# 📦 Product Routes

## Create Product (Protected)

```http
POST /api/products
```

### Request Body

```json
{
  "name": "iPhone 15",
  "price": 999,
  "description": "Latest Apple smartphone",
  "image": "iphone.jpg",
  "countInStock": 10,
  "category": "Electronics"
}
```

---

## Get All Products

```http
GET /api/products
```

---

# 🔍 Product Search

```http
GET /api/products?keyword=iphone
```

---

# 🏷️ Category Filtering

```http
GET /api/products?category=Electronics
```

---

# 💰 Price Filtering

```http
GET /api/products?minPrice=100&maxPrice=1000
```

---

# 📄 Pagination

## Page Number

```http
GET /api/products?pageNumber=2
```

---

## Dynamic Page Size

```http
GET /api/products?limit=2
```

---

# ↕️ Sorting

## Sort by Newest

```http
GET /api/products?sort=-createdAt
```

---

## Sort by Price

```http
GET /api/products?sort=price
```

---

## Sort by Highest Price

```http
GET /api/products?sort=-price
```

---

# 🧠 Features Implemented

- JWT Authentication
- Password Encryption
- Protected Routes Middleware
- MongoDB Models & Schemas
- Product Creation API
- Product Search Functionality
- Category Filtering
- Price Range Filtering
- Pagination System
- Dynamic Page Size
- Sorting Optimization
- Field Selection Optimization
- RESTful API Architecture
- Environment Variable Security
- Git & GitHub Workflow

---

# ⚡ Performance Optimizations

The backend includes multiple optimization techniques:

- Pagination using `.limit()` and `.skip()`
- Dynamic filtering
- Field selection using `.select()`
- Sorting optimization
- Optimized MongoDB queries
- Reduced API payload size

---

# 🔐 Security Practices

- Password hashing using bcryptjs
- JWT-based authentication
- Protected private routes
- Sensitive data stored in `.env`
- `.env` excluded using `.gitignore`
- No hardcoded credentials
- Clean Git workflow maintained

---

# 🚧 Future Improvements

- React Frontend Integration
- Redux State Management
- Admin Dashboard
- Product Reviews & Ratings
- Order Management System
- Payment Gateway Integration
- AI Product Recommendation Engine
- Image Upload Support
- Cloud Deployment (Render / AWS)

---

# 👨‍💻 Author

## Anurag Prasad

- Passionate about AI, Backend Development & Scalable Systems
- Building production-style full-stack applications
- Exploring scalable API architecture and modern web technologies

---

# ⭐ Support

If you found this project useful:

- Star the repository ⭐
- Fork and improve 🔧
- Share with others 🚀

---

# 📈 Current Progress

✅ Backend Setup Completed  
✅ MongoDB Connected  
✅ Authentication System Completed  
✅ Protected Routes Implemented  
✅ Product APIs Implemented  
✅ Search & Filtering Completed  
✅ Pagination & Optimization Completed  

🚀 Frontend Development Starting Next