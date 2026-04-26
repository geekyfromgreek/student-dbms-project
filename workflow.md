# 🔄 System Architecture & Data Flow

This document provides a technical overview of how data flows through the **Student DBMS** application, from user interaction to permanent storage.

---

### 1. Client-Side Interaction (React Frontend)
**Source:** `frontend/src/pages/`
*   **Interaction:** The process begins when a user interacts with the React-based UI. Data is captured via controlled forms (e.g., adding a student, marking attendance, or entering grades).
*   **Validation:** Basic state management handles input values, ensuring data is correctly formatted before submission.

### 2. Network Layer (Asynchronous API Request)
**Source:** `frontend/src/utils/api.js`
*   **Request:** Upon clicking the action button (e.g., **INSERT**), the frontend utilizes **Axios** to dispatch an asynchronous HTTP request (POST, GET, PUT, or DELETE) to the backend server.
*   **Payload:** Data is serialized into **JSON format** and transmitted across the network to the specific API endpoint defined in the routing layer.

### 3. Server-Side Logic (Node.js & Express)
**Source:** `backend/routes/api.js` & `backend/controllers/mainController.js`
*   **Routing:** The Express router intercepts the incoming request and directs it to the appropriate controller function based on the URL path and HTTP method.
*   **Execution:** The controller extracts the data from the request body or parameters and prepares it for the database operation.

### 4. Database Persistence (MySQL)
**Source:** `backend/queries/`
*   **Query Execution:** The backend communicates with the **MySQL Database** using the `mysql2` driver. It executes raw SQL queries (e.g., `INSERT INTO students...`) defined in the query modules.
*   **Data Storage:** The database engine processes the command, applies constraints, and permanently records the information within the relational table structure.

### 5. Response & UI Synchronization
*   **Feedback:** Once the database operation completes, the server sends a JSON response back to the client indicating success or failure.
*   **State Update:** The frontend receives this response and triggers a re-fetch of the data or updates the local state, ensuring the UI reflects the most recent changes instantly without a full page reload.

---

## 🛠 Technology Stack Summary

| Component | Technology | Responsibility |
| :--- | :--- | :--- |
| **Frontend** | React.js | UI Rendering, State Management, and User Interaction. |
| **API Client** | Axios | Handling HTTP communication between Client and Server. |
| **Backend** | Node.js / Express | Request Routing, Business Logic, and Middleware. |
| **Database** | MySQL | Relational Data Storage and Query Execution. |
| **Interface** | Raw SQL | Precise communication with the Database engine. |
