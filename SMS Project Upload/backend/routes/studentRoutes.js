const express = require('express');
const router = express.Router();

const Student = require('../models/Student');

// Add Student
router.post('/', async (req, res) => {
    try {
        const student = new Student(req.body);
        const savedStudent = await student.save();

        res.status(201).json({
            message: 'Student added successfully!',
            student: savedStudent
        });

    } catch (error) {
        res.status(400).json({
            message: 'Student could not be added',
            error: error.message
        });
    }
});

// Get All Students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Edit Student
router.put('/:id', async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        res.status(200).json({
            message: 'Student updated successfully!',
            student: updatedStudent
        });

    } catch (error) {
        res.status(400).json({
            message: 'Student update failed',
            error: error.message
        });
    }
});

// Delete Student
router.delete('/:id', async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(
            req.params.id
        );

        if (!deletedStudent) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        res.status(200).json({
            message: 'Student deleted successfully!'
        });

    } catch (error) {
        res.status(400).json({
            message: 'Student delete failed',
            error: error.message
        });
    }
});

module.exports = router;