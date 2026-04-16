# Student Attendance and Grade Management System

A full-stack DBMS-focused project built with Node.js, Express, React, Tailwind CSS, and MySQL. This system provides a comprehensive interface for managing student records, tracking attendance, and recording grades with real-time reporting.

## 🚀 Demo
**Live Hosting Link:** [View Live Site](https://{{GITHUB_USERNAME}}.github.io/student-dbms-project/)

## 🛠 Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Lucide React (Icons)
- **Backend**: Node.js, Express
- **Database**: MySQL (Raw SQL queries)
- **State Management**: React Hooks
- **API Client**: Axios

## ✨ Features
- **Student Management**: Add new students and view the database table.
- **Attendance Tracking**: Mark daily attendance (Present/Absent) with automatic date selection.
- **Grade Management**: Record marks for different subjects per student.
- **Analytical Reports**: 
  - Rank-wise performance dashboard.
  - Automatic attendance percentage calculation.
  - Average marks per student across all subjects.
  - Summary cards for total students and top performers.

## 📂 Project Structure
```text
student-dbms-project/
├── frontend/       # React + Tailwind frontend
│   ├── src/components/
│   ├── src/pages/
│   └── src/utils/
├── backend/        # Node.js + Express backend
│   ├── config/     # DB connection and init logic
│   ├── controllers/
│   ├── queries/    # Raw SQL queries (Student, Attendance, Grade)
│   └── routes/
└── setup_mysql.ps1 # MySQL setup script
```

## 🏗 Database Schema
The project uses three main tables:
1. `students`: Stores personal details.
2. `attendance`: Tracks daily attendance with a Foreign Key to `students`.
3. `grades`: Records subject-wise marks with a Foreign Key to `students`.

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
