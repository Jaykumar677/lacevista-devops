# 👟 LaceVista

**LaceVista** is a full-stack e-commerce platform for shoes, built using modern web technologies. It features a dynamic product catalog, responsive design, integrated chatbot assistant, and follows the MVC architecture for maintainability and scalability.

---

## 🚀 Features

### 🖥️ Frontend (EJS + Materialize)

- Fully responsive UI with elegant design
- Smooth background transitions with auto-cycling hero images
- Integrated chatbot assistant (LaceBot)

#### Pages Included:

- Home
- Shop
- About Us
- Login
- Signup
- Checkout

---

## 🔐 Authentication

- Signup and login functionality  
- Email-based OTP verification field added during registration

---

## 🛒 Checkout Module

- Checkout form includes:
  - First Name, Last Name
  - Email, Mobile Number
  - Shoe Measurements:
    - Length (cm)
    - Width (cm)
    - Arch (cm)
- All fields validated on the client-side before submission

---

## 🤖 Chatbot Assistant (LaceBot)

- Responds to user queries like:
  - "Shipping"
  - "Returns"
  - "Shoes under $150"

---

## 🧾 Admin Order Panel

- Admin dashboard to view submitted orders
- Columns include:
  - Item Name/Number
  - Quantity
  - Total Amount

---

## 📂 Project Structure (MVC)

- `controllers/` – Application logic (chatbot, orders, etc.)
- `routes/` – Navigation and API endpoints
- `views/` – EJS templates for UI rendering
- `public/` – Static assets: stylesheets, scripts, images
- `app.js` – Main server file

---

## ⚙️ Tech Stack

### Frontend:
- EJS
- Materialize CSS
- JavaScript

### Backend:
- Node.js
- Express.js

### Database:
- MongoDB

### Utilities & Tools:
- express-session
- Git & GitHub (Version Control)
- Trello (Project Management)

---

## 🧪 Testing

This project includes comprehensive testing across both **end-to-end (E2E) functionality** and **automated UI workflows** using **Mocha**, **Chai**, and **Cypress**.

---

### ✅ End-to-End Testing with Mocha & Chai

Mocha and Chai were used to validate the complete backend and controller logic.

These tools support behavior-driven development (BDD) and allow writing structured test suites to verify business logic, route responses, and controller operations. The tests were run in a Node.js environment and covered all core user scenarios like registration, login, and form submission, ensuring accurate backend behavior and security handling.

#### 🧪 Test Coverage:

- ✅ User Authentication (Signup, Login)
- ✅ Admin Order Management
- ✅ Checkout Form Submissions
- ✅ Controller and Route Handling

---

### ✅ Automated UI Testing with Cypress

Cypress was used to implement automated front-end testing to simulate real user interactions in a browser environment.

Cypress is a next-generation testing tool built specifically for modern web applications. It runs directly in the browser, allowing full control over the DOM, network requests, and browser behavior. For this project, Cypress was used to validate UI workflows such as navigating the site, signing up, logging in, viewing products, completing a checkout, and interacting with the chatbot. Its real-time reloading, time-travel debugging, and in-browser test runner made it ideal for verifying the user experience in a dynamic web interface.

#### 🧪 Test Coverage:

- ✅ Home Page Load & Navigation
- ✅ Signup and Login Flow
- ✅ Product Browsing and Shop Page
- ✅ Checkout Process Validation
- ✅ Admin Dashboard Access
- ✅ Chatbot Interaction Testing (LaceBot)


## 🛠️ Setup Instructions

To run the LaceVista application locally, a few simple setup steps are required. These ensure that all necessary dependencies are installed, the application is properly configured, and the development server is running.

### Step 1: Clone the Repository
git clone <https://github.com/Jaykumar677/LaceVista.git>
cd LaceVista

### Step 2: Install Dependencies
npm install

### Step 3: Run the Application
node app.js


