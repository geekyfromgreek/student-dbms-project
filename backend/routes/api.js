const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

// Student Routes
router.get('/students', mainController.getStudents);
router.post('/students', mainController.addStudent);
router.put('/students/:id', mainController.updateStudent);
router.delete('/students/:id', mainController.deleteStudent);

// Attendance Routes
router.get('/attendance', mainController.getAttendance);
router.post('/attendance', mainController.markAttendance);
router.put('/attendance/:id', mainController.updateAttendance);
router.delete('/attendance/:id', mainController.deleteAttendance);

// Grade Routes
router.get('/grades', mainController.getGrades);
router.post('/grades', mainController.addGrade);
router.put('/grades/:id', mainController.updateGrade);
router.delete('/grades/:id', mainController.deleteGrade);
router.get('/subjects', mainController.getSubjects);

// Report Route
router.get('/reports', mainController.getReports);
// AI Query Route (Gemini-powered natural language → SQL)
router.post('/ai-query', mainController.aiQuery);

module.exports = router;
