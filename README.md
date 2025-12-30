# 🚗 Meen Ywasalny – Ride Hailing Platform

Meen Ywasalny is a full-stack ride-hailing platform developed as a final university project.
The system simulates the core functionality of ride-hailing applications such as Uber, allowing passengers to request rides and captains to manage trips, view statistics, and track earnings.

The project demonstrates integration between a web-based frontend, a RESTful backend API, and a relational database.

---

## 🎯 Project Overview

This project was developed as part of the requirements for the Bachelor’s degree.
It aims to apply practical knowledge of:
- Full Stack Web Development
- RESTful API Architecture
- Relational Database Design
- SQL Queries and Data Analysis
- Backend and Frontend Integration

---

## 🧰 Technologies Used

- Backend: Node.js, Express.js
- Frontend: HTML, CSS, JavaScript (jQuery)
- Database: Microsoft SQL Server
- Tools: SQL Server Management Studio (SSMS), Visual Studio Code

---

## ⚙️ Prerequisites

- Node.js (v14 or higher)
- Microsoft SQL Server (2017 or higher)
- SQL Server Management Studio (optional)

---

## 🛠️ Installation & Setup

### 1. Database Setup
- Open SQL Server Management Studio (SSMS)
- Execute the provided SQL script
- A database named Meen_Ywasalny will be created with all required tables and sample data

### 2. Backend Setup
- Navigate to the backend directory
- Install dependencies using npm install
- Create a .env file with the following variables:

DB_USER=your_username  
DB_PASSWORD=your_password  
DB_SERVER=localhost  
DB_NAME=Meen_Ywasalny  
PORT=3000  

- Start the backend server using npm start
- The API server will run on http://localhost:3000

### 3. Frontend Setup
- Navigate to the frontend directory
- Run a local server using:
  python -m http.server 8000
- Open the application in the browser at:
  http://localhost:8000

---

## 🔑 Demo Accounts

Passenger Account:
- Email: Bothina.Elhaw@mail.com
- Password: p1

Captain Account:
- Email: khaled.reda@mail.com
- Password: pass123

---

## 🔌 API Endpoints

Authentication:
- POST /api/auth/passenger/login
- POST /api/auth/captain/login

Rides:
- POST /api/rides (Create a new ride)
- GET /api/rides/:rideId (Get ride details)
- PUT /api/rides/:rideId/status (Update ride status)
- PUT /api/rides/:rideId/rating (Add ride rating)

Captains:
- GET /api/captains/active (Get active captains)
- GET /api/captains/nearest (Get nearest captains)

---

## ✨ Features

Passenger Features:
- User authentication
- Request new rides
- View ride history
- Rate completed rides

Captain Features:
- User authentication
- View assigned rides
- View statistics (total rides, earnings, average rating)

Database Features:
- Insert and update operations
- Complex SQL queries using JOINs
- Aggregate functions (COUNT, AVG, SUM)
- Stored procedures
- Views and user-defined functions

---

## 📁 Project Structure

meen-ywasalny/
├── backend/
│   ├── server.js
│   ├── app.js
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   └── config/
└── frontend/
    ├── index.html
    ├── css/
    ├── js/
    └── assets/

---

## 📝 Notes

- This project was developed as a final university project for educational purposes
- Currency used: Egyptian Pound (EGP)
- Ratings range from 1 to 5
- Session Storage is used to manage authentication state

---

## 📄 License

-This project was developed as a final university project for educational purposes.


This project is intended for educational and academic use only.
