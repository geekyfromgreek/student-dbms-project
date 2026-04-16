const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

// Student Routes
router.get('/students', mainController.getStudents);
router.post('/students', mainController.addStudent);

// Attendance Routes
router.get('/attendance', mainController.getAttendance);
router.post('/attendance', mainController.markAttendance);

// Grade Routes
router.get('/grades', mainController.getGrades);
router.post('/grades', mainController.addGrade);

// Report Route
router.get('/reports', mainController.getReports);

module.exports = router;
