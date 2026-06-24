# Full-Stack E-commerce Web Application

A simple full-stack e-commerce web application built using **Node.js**, **Express.js**, **MongoDB**, **Mongoose**, and **HTML/CSS/JavaScript**.
The project includes user authentication, product listing, cart functionality, order creation, and an admin panel for product management.

## Live Demo

[View Live Project](https://ecommerce-app-ogwd.onrender.com)

## Features

* User registration and login
* JWT-based authentication
* MongoDB database integration
* Product listing
* Add products to cart
* Cart quantity update and remove option
* Checkout and order creation
* Admin panel for adding, editing, and deleting products
* REST API backend using Express.js
* Frontend served through Express
* Deployed on Render

## Tech Stack

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token
* bcryptjs
* dotenv
* cors

## Folder Structure

```bash
ecommerce_app/
│
├── client/
│   ├── css/
│   │   └── styles.css
│   │
│   ├── js/
│   │   ├── admin.js
│   │   ├── auth.js
│   │   ├── cart.js
│   │   ├── common.js
│   │   └── products.js
│   │
│   ├── admin.html
│   ├── cart.html
│   ├── index.html
│   ├── login.html
│   └── register.html
│
├── server/
│   ├── middleware/
│   │   └── auth.js
│   │
│   ├── models/
│   │   ├── Order.js
│   │   ├── Product.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── orders.js
│   │   ├── products.js
│   │   └── users.js
│   │
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
└── README.md
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
```

### 2. Go to the project folder

```bash
cd ecommerce_app
```

### 3. Go to the server folder

```bash
cd server
```

### 4. Install dependencies

```bash
npm install
```

### 5. Create `.env` file

Create a `.env` file inside the `server` folder and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 6. Start the server

```bash
npm start
```

The project will run locally at:

```bash
http://localhost:5000
```

## API Endpoints

### User Routes

```bash
POST /api/users/register
POST /api/users/login
```

### Product Routes

```bash
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

### Order Routes

```bash
GET  /api/orders
POST /api/orders
```

## Admin Access

By default, new users are created with the role:

```json
"role": "user"
```

To access the admin panel, change the user role manually in MongoDB Atlas:

```json
"role": "admin"
```

After changing the role, logout and login again.

Admin panel URL:

```bash
/admin.html
```

## Deployment

This project is deployed on **Render**.

Render settings used:

```bash
Build Command: cd server && npm install
Start Command: cd server && npm start
```

Environment variables added in Render:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## Project Description

This e-commerce application allows users to register, login, browse products, add products to cart, and place orders. Admin users can manage products through a dedicated admin panel. The backend is built with Express.js and MongoDB, while the frontend is built using HTML, CSS, and JavaScript.

## Author

**Koushik Bomma**

* GitHub: https://github.com/bommakoushik-code
* LinkedIn: https://www.linkedin.com/in/koushik-b-6a3707301/
* Email: [bommakoushik@gmail.com](mailto:bommakoushik@gmail.com)
