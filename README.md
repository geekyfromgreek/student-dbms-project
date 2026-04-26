# Student Attendance and Grade Management System

A full-stack DBMS-focused project built with Node.js, Express, React, Tailwind CSS, and MySQL.

## 🚀 Demo
**Live Hosting Link:** [View Live Site](https://geekyfromgreek.github.io/student-dbms-project/)

## 🎯 Quick Technical Summary
- **The Stack**: Full-stack **JavaScript** (React + Node.js) with **MySQL** for data storage.
- **The Setup**: Fully automated! A **PowerShell script** configures the local MySQL server, and the **Node.js backend** auto-creates the schema (tables) on first run.
- **The Architecture**: A **3-Tier RESTful system** where Node.js acts as a secure bridge (API) between the React UI and the MySQL engine.
- **The Database**: Relational model using **Foreign Keys** and **Raw SQL** (no ORM) to demonstrate advanced query logic.

## ✨ Features
- **Student Management**: Full CRUD operations (Add, View, Edit, Delete).
- **Attendance Tracking**: Mark and manage attendance records with real-time updates.
- **Advanced Grade Management**: 
  - Dynamic subject selection with "Add New Subject" capability.
  - Record and modify marks per student.
- **Analytical Reports**: 
  - Rank-wise performance dashboard.
  - Automatic attendance percentage calculation using SQL Aggregations.
  - Average marks per student across all subjects.
- **Premium UI**: Cinematic glassmorphism design with interactive spotlights and magnifying lens effects.
- **Teacher's Guide**: Detailed technical walkthrough and terminal demonstration instructions in `TEACHER_GUIDE.md`.

## 📂 Project Structure & Workflow
The application follows a **standard 3-tier architecture**:

1.  **Client Layer (React)**: Uses **JSX** and **Tailwind CSS** to provide a cinematic, interactive UI.
2.  **Server Layer (Node.js/Express)**: Acts as the "Middleman," handling business logic and serving **REST APIs**.
3.  **Data Layer (MySQL)**: Stores relational data and ensures integrity via **Foreign Keys**.

## ⚙️ Backend & Database Automation
This project is designed for **Zero-Config Database Management**. 

### The Automation Workflow:
1.  **Server Start**: When `npm run dev` is executed, the Node.js server initializes.
2.  **`initDB.js` Execution**: The server immediately runs the initialization script.
3.  **Existence Check**: It performs a `SHOW TABLES` check to see if the database is already set up.
4.  **Schema Deployment**: If tables are missing, it executes the `CREATE TABLE` commands with **Foreign Key Constraints** and **Cascade Rules** automatically.
5.  **Ready State**: Only after the database is verified/created does the server begin listening for API requests.

### Technical Implementation:
- **Connection Pooling**: Managed via `mysql2/promise` in `db.js` for high-concurrency handling.
- **Raw SQL Queries**: We explicitly use hand-written SQL in the `queries/` folder to demonstrate precise control over data retrieval and manipulation.

## 🗄 Database Schema
The relational model consists of:
1.  `students`: Parent table for personal records.
2.  `attendance`: Linked via `student_id` (FK) with `ON DELETE CASCADE`.
3.  `grades`: Linked via `student_id` (FK) with `ON DELETE CASCADE`.

## ⚙️ Installation & Setup

### Prerequisites
- Node.js & npm installed.
- MySQL server running locally.

### 1. Database Setup
Ensure you have a MySQL instance. You can run the provided `backend/config/schema.sql` to initialize your tables or let the backend auto-initialize them on first run.

### 2. Backend Setup
```bash
cd backend
npm install
npm run dev
```
By default, the backend runs on `http://localhost:5000`.

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend will be available at `http://localhost:5173`.

## 📄 License
MIT License
