# Active Context

## Current Project Prompt
Build a DBMS-focused "Student Attendance and Grade Management System" mini-project with a heavy focus on clear SQL queries and simple UI execution.

## Tech Stack Decisions
- **Frontend**: React, Tailwind CSS (via Vite)
- **Backend**: Node.js, Express
- **Database**: MySQL
- **Animations**: Minimal CSS

## Folder Structure
```
student-dbms-project/
 ├── frontend/       (React, Vite)
 ├── backend/        (Node.js, queries)
 ├── animations/
 ├── public/assets/
```

## Features
- Add Students
- Mark Attendance
- Record Grades
- View Dashboard / Reports (Attendance %, Avg Marks)

## Database Design
1. `students` (id PK, name, roll_number)
2. `attendance` (id PK, student_id FK, date, status)
3. `grades` (id PK, student_id FK, subject, marks)

## Future Scope
- Filtering by student
- Displaying top performers
