# 🎉 OurEvents – Full Stack MERN Event Management Platform

## 📌 Overview

**OurEvents** is a modern, full-stack Event Management  platform built using the **MERN Stack**. It enables users to discover events, book tickets securely using OTP verification, receive downloadable PDF tickets, and manage their bookings through an intuitive dashboard. Administrators can efficiently manage events, users, and bookings from a dedicated admin panel.

The project focuses on providing a real-world event booking experience with secure authentication, responsive design, email notifications, and production-ready architecture.

---

# ✨ Features

## 👤 User Features

* User Registration & Login
* JWT Authentication
* Email OTP Verification before Booking
* Browse Upcoming Events
* View Event Details
* Book Event Tickets
* Download Ticket as PDF
* View Booking History
* Cancel Booking
* Responsive UI
* Secure Protected Routes

---

## 🛠 Admin Features

* Admin Authentication
* Create New Events
* Update Existing Events
* Delete Events
* View All Users
* View All Bookings
* Confirm or Reject Bookings
* Manage Available Seats
* Dashboard Statistics

---

## 🎫 Ticket System

* Unique Booking ID
* Automatic Seat Allocation
* PDF Ticket Generation
* Event Details Included
* User Details Included
* Downloadable Ticket
* Confirmation Status Validation

---

## 📧 Email Features

* OTP Verification Email
* Booking Confirmation Email
* SMTP Integration (Brevo)

---

## 🔒 Security

* JWT Authentication
* Password Hashing using bcrypt
* Protected Backend Routes
* OTP Validation
* Role-Based Authorization
* Secure Environment Variables

---

# 🏗 Tech Stack

## Frontend

* React.js
* React Router DOM
* Axios
* Tailwind CSS
* React Icons
* React PDF Renderer

---

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Nodemailer
* Multer

---

## Database

MongoDB Atlas

---

## Email Service

Brevo SMTP

---

## Authentication

* JWT Tokens
* Email OTP Verification

---

# 📂 Project Structure

```text
Eventora
│
├── client
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── layouts
│   │   ├── context
│   │   ├── services
│   │   ├── utils
│   │   └── assets
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   ├── uploads
│   └── server.js
│
├── package.json
└── README.md
```

---

# 🗄 Database Schema

## User

```text
Name
Email
Password
Role
Created At
```

---

## Event

```text
Title
Description
Category
Location
Date
Time
Image
Ticket Price
Total Seats
Available Seats
Created By
```

---

## Booking

```text
User
Event
Booking Status
Seat Number
OTP Verification
Created At
```

---

# 🔄 Booking Workflow

```text
User Login
      │
      ▼
Browse Events
      │
      ▼
Select Event
      │
      ▼
Request Booking
      │
      ▼
Receive OTP
      │
      ▼
Verify OTP
      │
      ▼
Booking Created
      │
      ▼
Admin Confirmation
      │
      ▼
Seat Allocated
      │
      ▼
PDF Ticket Generated
      │
      ▼
Download Ticket
```

---

# 📄 PDF Ticket Generation

Tickets are generated on the client side using **@react-pdf/renderer**.

Each ticket contains:

* Event Name
* Event Date & Time
* Venue
* User Name
* Seat Number
* Booking Status
* Booking ID

Tickets are available for download only after the booking has been confirmed.

---

# 🔑 Authentication Flow

```text
Register
     │
     ▼
Login
     │
     ▼
JWT Generated
     │
     ▼
Protected Routes
     │
     ▼
Authorized Access
```

---

# 📧 OTP Verification Flow

```text
Book Event
      │
      ▼
Generate OTP
      │
      ▼
Send Email
      │
      ▼
User Enters OTP
      │
      ▼
Backend Verification
      │
      ▼
Booking Created
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/eventora.git
```

---

## Backend

```bash
cd server

npm install
```

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

EMAIL_HOST=smtp-relay.brevo.com

EMAIL_PORT=587

EMAIL_USER=your_email

EMAIL_PASS=your_password
```

Run the backend:

```bash
npm run dev
```

---

## Frontend

```bash
cd client

npm install

npm run dev
```

---

# 🌐 Environment Variables

```env
PORT

MONGO_URI

JWT_SECRET

EMAIL_HOST

EMAIL_PORT

EMAIL_USER

EMAIL_PASS
```

---

# 📦 Main Dependencies

### Frontend

```text
react
react-router-dom
axios
tailwindcss
react-icons
@react-pdf/renderer
```

---

### Backend

```text
express
mongoose
jsonwebtoken
bcryptjs
cors
dotenv
multer
nodemailer
```

---

# 📸 Screens

* Home Page
* Event Listing
* Event Details
* Login
* Register
* OTP Verification
* My Bookings
* Admin Dashboard
* PDF Ticket

---

# 🎯 Future Enhancements

* Razorpay Payment Integration
* QR Code Based Ticket Validation
* Live Seat Selection
* Coupon & Discount System
* Event Recommendations using AI
* Push Notifications
* Google Authentication
* Event Analytics Dashboard
* Refund Management
* Calendar Integration
* Multi-language Support
* Dark Mode
* Real-time Seat Availability using Socket.IO

---

# 📈 Learning Outcomes

This project demonstrates practical implementation of:

* Full Stack MERN Development
* RESTful API Design
* JWT Authentication
* OTP Verification
* MongoDB Data Modeling
* Email Integration
* File Upload Handling
* PDF Generation
* Role-Based Access Control
* CRUD Operations
* State Management
* Responsive UI Development

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push the branch.
5. Open a Pull Request.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Vikash Mani Tripathi**

If you found this project useful, consider giving it a ⭐ on GitHub.
