# 🚀 NovaCart

A modern AI-powered full-stack e-commerce platform built using React, Node.js, Express, MongoDB Atlas, Gemini AI, Razorpay, and Brevo Email Services.

NovaCart combines traditional e-commerce functionality with intelligent AI-driven shopping experiences including product recommendations, review summarization, product generation, smart buying assistance, conversational shopping support, and product comparison tools.

---

# 🌟 Live Project Overview

NovaCart is a production-ready e-commerce application that demonstrates:

* Full-Stack MERN Architecture
* AI-Powered Commerce Features
* Secure Authentication & Authorization
* Payment Gateway Integration
* Email Notification System
* Admin Product Management
* Shopping Cart & Order Management
* Production Deployment (Render + Vercel)
* Modern Responsive UI/UX

---

# 🌐 Live Deployment

## Frontend (Vercel)

NovaCart Frontend is deployed on Vercel:

https://novacart-eta.vercel.app/

---

## Backend API (Render)

NovaCart Backend API is deployed on Render:

https://novacart-backend-hcyt.onrender.com

---

## Production Status

✅ Frontend Successfully Deployed on Vercel

✅ Backend Successfully Deployed on Render

✅ MongoDB Atlas Connected

✅ Razorpay Payment Gateway Integrated

✅ Gemini AI Features Active

✅ Brevo Email Service Active

✅ Welcome Email System Working

✅ Product Image Upload System Working

✅ Secure JWT Authentication Enabled

✅ Production Ready

===

# ✨ Features

## 🔐 Authentication & Security

* User Registration
* User Login
* JWT Authentication
* Password Hashing using bcryptjs
* Protected Routes
* Admin Authorization
* Role-Based Access Control
* Environment Variable Security
* API Rate Limiting
* Production Security Configuration
* CORS Protection

---

## 📧 Email Notification System

* Welcome Email on Registration
* Brevo SMTP Integration
* Nodemailer Integration
* HTML Email Templates
* Production SMTP Verification
* Email Delivery Logging

---

## 🛒 E-Commerce Features

### Product Catalog

* Dynamic Product Listing
* Product Details Page
* Product Cards
* Product Search
* Category Filtering
* Price Filtering
* Product Sorting
* Pagination
* Responsive Product Grid

### Shopping Cart

* Add To Cart
* Remove From Cart
* Update Quantity
* Cart Persistence
* Cart Summary

### Checkout Flow

* Shipping Information
* Order Placement
* Order Details
* Order History
* My Orders Page

### Order Management

* Create Orders
* Fetch Orders
* User Order History
* Order Details View

---

## 💳 Payment Integration

### Razorpay

* Razorpay Order Creation
* Secure Payment Flow
* Payment Verification
* Checkout Integration

---

## 🤖 AI Commerce Features

### 1. AI Shopping Assistant

* Conversational Shopping Support
* Product Discovery Assistance
* Shopping Guidance
* Gemini AI Powered

### 2. AI Review Summarizer

* Product Review Analysis
* Customer Sentiment Summary
* Pros & Cons Extraction
* Quick Buying Insights

### 3. AI Product Description Generator

* AI Generated Product Descriptions
* Marketing Copy Generation
* Product Content Enhancement

### 4. AI Smart Buying Assistant

* Personalized Buying Suggestions
* Budget-Based Recommendations
* Feature-Based Product Guidance

### 5. AI Product Comparison

* Side-by-Side Product Analysis
* Feature Comparison
* Recommendation Generation

### 6. AI Product Recommendations

* Smart Product Suggestions
* Recommendation Engine
* User-Friendly Product Discovery

### 7. Trending Product Analytics

* Trending Product Section
* Dynamic Product Insights

---

## 👨‍💼 Admin Features

### Admin Dashboard

* Product Management Interface
* Product Editing
* Product Updates
* Product Deletion
* Product Creation
* Inventory Management Architecture

### Product Image Management

* Image Upload System
* Multer Integration
* Public Image Serving
* Product Thumbnail Management

---

## 🎨 UI / UX Features

### Modern Responsive Design

* Responsive Navigation Bar
* Hero Banner
* Trending Products Section
* Product Cards
* Loading Skeletons
* AI Result Cards
* Smart AI Interface Components
* Mobile-Friendly Design

### User Experience Enhancements

* React Hot Toast Notifications
* SweetAlert2 Alerts
* Loading Spinners
* Markdown Rendering
* Improved Checkout Flow
* Premium Navigation Experience

---

# 🛠️ Technology Stack

## Frontend

* React.js
* React Router DOM
* Axios
* React Icons
* React Hot Toast
* React Loading Skeleton
* React Markdown
* Remark GFM
* SweetAlert2
* CSS3

---

## Backend

* Node.js
* Express.js
* REST APIs

---

## Database

* MongoDB Atlas
* Mongoose

---

## AI

* Google Gemini AI
* @google/generative-ai

---

## Authentication & Security

* JWT
* bcryptjs
* dotenv
* express-rate-limit
* CORS

---

## Payments

* Razorpay

---

## Email Services

* Nodemailer
* Brevo SMTP

---

## File Uploads

* Multer

---

## 🚀 Deployment

## Frontend

- Vercel
- Live URL: https://novacart-eta.vercel.app/

## Backend

- Render
- Live URL: https://novacart-backend-hcyt.onrender.com

## Database

- MongoDB Atlas

## Email Service

- Brevo SMTP

---

# 📂 Project Structure

```text
ai-ecommerce/

├── backend
│   ├── config
│   ├── controllers
│   │   ├── aiController.js
│   │   ├── cartController.js
│   │   ├── chatbotController.js
│   │   ├── orderController.js
│   │   ├── paymentController.js
│   │   ├── productController.js
│   │   └── userController.js
│   │
│   ├── middleware
│   ├── models
│   ├── routes
│   │   ├── aiRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── chatbotRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── paymentRoutes.js
│   │   ├── productRoutes.js
│   │   ├── uploadRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── services
│   ├── templates
│   ├── uploads
│   └── server.js
│
├── frontend
│   ├── public
│   └── src
│       ├── components
│       ├── context
│       ├── pages
│       └── styles
│
└── README.md
```

---

# 🌐 Core API Endpoints

## Authentication

```http
POST /api/users/register
POST /api/users/login
```

## Products

```http
GET /api/products
GET /api/products/:id
POST /api/products
PUT /api/products/:id
DELETE /api/products/:id
```

## Cart

```http
GET /api/cart
POST /api/cart
DELETE /api/cart/:id
```

## Orders

```http
POST /api/orders
GET /api/orders/myorders
GET /api/orders/:id
```

## Payments

```http
POST /api/payments/create-order
```

## Uploads

```http
POST /api/upload
```

## AI

```http
POST /api/ai/recommend
POST /api/ai/review-summary
POST /api/ai/product-generator
POST /api/ai/compare
POST /api/ai/buying-assistant
```

## Chatbot

```http
POST /api/chatbot
```

---

# ⚡ Performance Optimizations

* Pagination using skip() and limit()
* Dynamic Filtering
* Optimized Search Queries
* Efficient MongoDB Queries
* API Rate Limiting
* Reusable React Components
* Production Deployment Optimization
* Lazy Backend Processing

---

# 🔐 Security Practices

* Password Hashing
* JWT Authentication
* Protected Routes
* Admin Authorization
* Environment Variables
* Secure Payment Flow
* API Rate Limiting
* CORS Protection
* SMTP Credential Protection
* Production Deployment Security

---

# 🚀 Deployment

## Frontend

* Vercel Deployment

## Backend

* Render Deployment

## Database

* MongoDB Atlas

## Email Service

* Brevo SMTP

---

# 📈 Current Project Status

## Backend

✅ MongoDB Atlas Integration

✅ JWT Authentication

✅ User Registration & Login

✅ Role-Based Authorization

✅ Product APIs

✅ Cart APIs

✅ Order APIs

✅ Razorpay Integration

✅ Product Image Upload

✅ Email Notification System

✅ Gemini AI Integration

✅ AI Recommendation Engine

✅ AI Review Summarizer

✅ AI Product Generator

✅ AI Buying Assistant

✅ AI Product Comparison

✅ Chatbot System

✅ API Rate Limiting

✅ Production Deployment

---

## Frontend

✅ Responsive UI

✅ Authentication Pages

✅ Product Listing

✅ Product Details

✅ Cart System

✅ Checkout Flow

✅ Order History

✅ Admin Dashboard

✅ Product Editing

✅ Hero Banner

✅ Trending Products

✅ Smart Search

✅ AI Recommendation UI

✅ AI Review Summarizer UI

✅ AI Product Generator UI

✅ AI Buying Assistant UI

✅ AI Comparison UI

✅ Chatbot UI

---

# 👨‍💻 Author

## Anurag Prasad

CSE Engineering Student

Focused on:

* Full-Stack Development
* Artificial Intelligence
* Scalable Backend Systems
* Modern Web Applications
* Production-Ready Software Engineering

---

# ⭐ Support

If you found this project useful:

* Star the Repository ⭐
* Fork the Project 🍴
* Share with Others 🚀
* Contribute New Features 🔥

---

## NovaCart v1.0.0

Production-ready AI-powered E-Commerce Platform with MERN Stack, Gemini AI, Razorpay Payments, MongoDB Atlas, Brevo Email Integration, and Modern Responsive UI.
