# Forever Backend

**Forever Backend** is the core of the *Forever* e-commerce system, designed to provide a secure, scalable, and efficient shopping experience. This backend handles user authentication, payment processing, order management, and exposes a robust RESTful API to communicate with the frontend.

## 🌐 Live URL

[https://forever-backend-livid-sigma.vercel.app](https://forever-backend-livid-sigma.vercel.app)

## 🚀 Key Features

- **Secure Authentication**: User registration and login using JWT tokens.
- **Order Management**: Create, track, and update orders efficiently.
- **Payment Processing**: Integrated with Stripe for secure transactions.
- **RESTful API**: Well-structured endpoints for easy frontend integration.
- **Scalability**: Architecture built to handle continuous growth.

## 🛠️ Tech Stack

- **Node.js** and **Express.js**: For building a fast and modular server.
- **MongoDB** with **Mongoose**: Flexible and powerful NoSQL database.
- **JWT (JSON Web Tokens)**: For secure auth.
- **Stripe API**: To handle payments securely.
- **Vercel**: Cloud deployment and CI/CD.

## 📁 Project Structure

Forever-Backend/
├── config/ # App and DB configuration
├── controllers/ # Business logic and route controllers
├── middleware/ # Custom middleware (auth, error handling, etc.)
├── models/ # Mongoose data models
├── routes/ # API route definitions
├── server.js # App entry point
├── package.json # Project dependencies and scripts
└── vercel.json # Deployment configuration for Vercel


## ⚙️ Installation & Local Setup

1. **Clone the repository**:

```bash
git clone https://github.com/mirchez/Forever-Backend.git
cd Forever-Backend
```
2. pnpm install

3. Set enviroment variables
```
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```
Server runs on http://localhost:3000

📄 Main Endpoints
POST /api/auth/register – Register a new user

POST /api/auth/login – Log in and receive JWT token

GET /api/orders – Get list of orders (requires auth)

POST /api/orders – Create a new order

POST /api/payments – Process a Stripe payment

🧪 Testing
Use tools like Postman or Insomnia to test the API. Make sure to send the JWT token in protected routes.
