🚗 Meen Ywasalny – Ride Hailing Platform

Meen Ywasalny is a university full-stack project that simulates a ride-hailing platform similar to Uber.
The system allows passengers to request rides and captains to manage their trips, while providing ride tracking, ratings, and statistical reports.

The project is built using:

Backend: Node.js (Express)

Database: Microsoft SQL Server

Frontend: HTML, CSS, JavaScript (jQuery)

🎯 Project Objective

This project was developed to apply and demonstrate concepts of:

Full Stack Web Development

RESTful API Design

Relational Database Design

SQL Queries (JOINs, Aggregate Functions)

Stored Procedures, Views, and Functions

⚙️ Prerequisites

Node.js (v14 or higher)

Microsoft SQL Server (2017 or higher)

SQL Server Management Studio (optional)

🛠️ Installation & Running the Project
1️⃣ Database Setup

Open SQL Server Management Studio (SSMS)

Execute the provided SQL script

A database named Meen_Ywasalny will be created with all required tables and sample data

2️⃣ Backend Setup
cd backend
npm install
npm start


Create a .env file inside the backend folder:

DB_USER=your_username
DB_PASSWORD=your_password
DB_SERVER=localhost
DB_NAME=Meen_Ywasalny
PORT=3000


The API server will run on:

http://localhost:3000

3️⃣ Frontend Setup
cd frontend
python -m http.server 8000


Then open:

http://localhost:8000


(You may also use VS Code Live Server)

🔑 Demo Accounts
Passenger

Email: Bothina.Elhaw@mail.com

Password: p1

Captain

Email: khaled.reda@mail.com

Password: pass123

🔌 Main API Endpoints
Authentication

POST /api/auth/passenger/login

POST /api/auth/captain/login

Rides

POST /api/rides – Create a new ride

GET /api/rides/:rideId – Get ride details

PUT /api/rides/:rideId/status – Update ride status

PUT /api/rides/:rideId/rating – Add ride rating

Captains

GET /api/captains/active – Get active captains

GET /api/captains/nearest – Get nearest captains

✨ Features
Passenger

Login to the system

Request new rides

View ride history

Rate completed rides

Captain

Login to the system

View assigned rides

View statistics (total rides, earnings, average rating)

Database

Insert and update operations

Complex queries using JOINs

Aggregate functions (COUNT, AVG, SUM)

Stored procedures

Views and user-defined functions

📁 Project Structure
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

📝 Notes

This project is for educational purposes only

Currency used: Egyptian Pound (EGP)

Ratings range from 1 to 5

Session Storage is used to handle authentication state

📄 License

This project was developed as a final university project for educational purposes.

📄 License

This project was developed as a university assignment for educational use.
