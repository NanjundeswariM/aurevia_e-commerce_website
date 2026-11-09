# ✨ AUREVIA – Women's Fashion & Beauty E-Commerce Platform

Aurevia is a full-stack women's fashion and beauty e-commerce application designed to provide a seamless and elegant online shopping experience. It brings together fashion, cosmetics, skincare, haircare, accessories, and footwear in one platform.

Built using the **MERN Stack**, Aurevia features user authentication, product management, shopping cart, wishlist, checkout, and order management.

🌐 **Live Demo:** https://aurevia-e-commerce-website.vercel.app/

💻 **GitHub Repository:** https://github.com/NanjundeswariM/aurevia_e-commerce_website

---

## 🛍️ Features

### 👩‍💻 User Features
- User registration and login.
- Google OAuth authentication.
- JWT-based authentication.
- Browse products across multiple categories.
- Search, filter, and sort products.
- View detailed product information.
- Add and remove products from the shopping cart.
- Add and remove products from the wishlist.
- Manage checkout and place orders.
- View order confirmation.

### 🔐 Authentication & Security
- Google OAuth 2.0 integration.
- JWT-based user authentication.
- Password hashing using bcrypt.
- Protected routes and authentication middleware.
- Environment-based configuration for sensitive credentials.

### 🛠️ Admin Features
- Admin dashboard.
- View product information.
- Add new products.
- Update existing products.
- Delete products.
- Manage product data through backend APIs.

### 📦 Backend Features
- RESTful API development using Express.js.
- MongoDB database integration using Mongoose.
- Product CRUD operations.
- User authentication and authorization.
- Centralized API services.
- Environment variable configuration.
- CORS configuration for frontend-backend communication.

---

## 💻 Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, JavaScript, HTML5, CSS3, Bootstrap 5 |
| Routing | React Router |
| State Management | React Context API |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| ODM | Mongoose |
| Authentication | JWT, Google OAuth 2.0, Passport.js |
| Security | bcrypt |
| API Communication | Axios, REST APIs |
| Development Tools | VS Code, Postman / Thunder Client, MongoDB Compass |
| Version Control | Git, GitHub |
| Deployment | Vercel (Frontend), [Backend hosting provider] |

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/NanjundeswariM/aurevia_e-commerce_website.git
```

```bash
cd aurevia_e-commerce_website
```

### 2. Backend Setup

Navigate to the server directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the server directory:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback
```

Add any other environment variables required by your payment gateway or backend configuration.

Start the backend:

```bash
npm run dev
```

### 3. Frontend Setup

Open another terminal and navigate to the client directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the client directory:

```env
VITE_API_URL=http://localhost:3000/api
```

Start the frontend:

```bash
npm run dev
```

### 4. Access the Application

Open your browser:

```text
http://localhost:5173
```

---

## 🗄️ Database

Aurevia uses **MongoDB Atlas** as its cloud database and Mongoose for data modeling.

The database stores application data such as:

- User information.
- Product details.
- Shopping and order-related information.

Product data can be initialized using the backend database seeding script.

---

## 🔑 Authentication Flow

Aurevia supports secure user authentication through:

- Traditional authentication using email and password.
- Google OAuth 2.0 authentication.
- JWT token generation and verification.
- Password hashing using bcrypt.
- Protected backend routes.

---

## 🚀 Deployment

The application uses separate frontend and backend deployments.

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

Production environment variables are configured separately for the frontend and backend.

---

## 🎯 Project Objectives

- Develop a complete full-stack e-commerce application.
- Understand frontend and backend integration.
- Implement secure authentication mechanisms.
- Perform database operations using MongoDB and Mongoose.
- Develop RESTful APIs.
- Gain practical experience in full-stack application deployment.

---

## 👩‍💻 Developed By

**Nanjundeswari M**

- **GitHub:** https://github.com/NanjundeswariM
- **LinkedIn:** https://www.linkedin.com/in/nanjundeswari/

---

**AUREVIA – Where Fashion Meets Elegance.** ✨
