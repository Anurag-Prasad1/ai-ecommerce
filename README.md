# 🚀 NovaCart

A modern full-stack AI-inspired e-commerce web application built using React, Node.js, Express, and MongoDB.

NovaCart is designed with scalable backend architecture, reusable frontend components, responsive UI design, and production-style development practices.

---

# 📌 Project Overview

NovaCart simulates a real-world scalable e-commerce platform.

The project currently includes:

## ✅ Backend Features

- JWT Authentication
- Protected Routes
- Product APIs
- Search & Filtering
- Pagination
- Sorting Optimization
- MongoDB Integration
- RESTful API Architecture

## ✅ Frontend Features

- Responsive React UI
- Reusable Components
- Product Grid Layout
- Product Cards
- Modern Navbar
- Responsive Styling
- Dynamic Product Fetching using Axios

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Axios
- CSS3

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
- VS Code

---

# 📂 Project Structure

```bash
ai-ecommerce/
│
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
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── ProductCard.js
│   │   │   └── ProductList.js
│   │   │
│   │   ├── App.js
│   │   ├── styles.css
│   │   └── index.js
│   │
│   ├── package.json
│   └── README.md
│
├── .gitignore
├── .env.example
└── README.md
```

---

# ⚙️ Setup Instructions

# 1️⃣ Clone Repository

```bash
git clone https://github.com/Anurag-Prasad1/ai-ecommerce.git
```

---

# 2️⃣ Navigate Into Project

```bash
cd ai-ecommerce
```

---

# 3️⃣ Install Backend Dependencies

```bash
cd backend
npm install
```

---

# 4️⃣ Install Frontend Dependencies

Open another terminal:

```bash
cd frontend
npm install
```

---

# 5️⃣ Setup Environment Variables

Create a `.env` file inside:

```bash
backend/
```

Add:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

---

# ▶️ Running the Application

## Start Backend Server

📍 Run from:

```bash
backend/
```

Command:

```bash
npm run dev
```

OR

```bash
nodemon server.js
```

---

## Start Frontend Server

📍 Run from:

```bash
frontend/
```

Command:

```bash
npm start
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
  "image": "https://example.com/image.jpg",
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

# 🧠 Frontend Features

## ✅ Navbar

- Modern responsive navbar
- Branding support
- Search input UI
- Navigation structure

---

## ✅ Product Cards

- Reusable React components
- Dynamic product rendering
- Responsive product layout
- Product images and pricing

---

## ✅ Responsive Layout

- CSS Grid system
- Mobile-friendly structure
- Responsive card sizing
- Clean ecommerce styling

---

# 🧠 Features Implemented

## Backend

- JWT Authentication
- Password Encryption
- Protected Routes Middleware
- MongoDB Models & Schemas
- Product Creation API
- Search Functionality
- Filtering System
- Pagination
- Sorting Optimization
- RESTful API Architecture

## Frontend

- React Component Architecture
- Reusable Components
- Axios API Integration
- Responsive UI Design
- Product Grid Layout
- CSS Styling System
- Dynamic Product Rendering

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

- Product Details Page
- React Router Integration
- Shopping Cart Functionality
- Redux / Context API State Management
- Admin Dashboard
- Order Management System
- Payment Gateway Integration
- AI Product Recommendation Engine
- Image Upload Support
- Cloud Deployment (Render / AWS)

---

# 👨‍💻 Author

## Anurag Prasad

- CSE Engineering Student
- Passionate about Full-Stack Development & AI
- Building scalable production-style web applications
- Exploring backend architecture and modern frontend systems

---

# 📈 Current Progress

## ✅ Backend Completed

- MongoDB Integration
- Authentication System
- Protected Routes
- Product APIs
- Search & Filtering
- Pagination & Optimization

## ✅ Frontend Progress

- React Setup
- Navbar Component
- Product Cards
- Responsive Layout
- Styling System
- Dynamic Product Fetching

🚀 Product Details Page Coming Next

---

# ⭐ Support

If you found this project useful:

- Star the repository ⭐
- Fork and improve 🔧
- Share with others 🚀