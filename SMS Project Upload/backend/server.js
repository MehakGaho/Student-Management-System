const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const studentRoutes = require('./routes/studentRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Student APIs
app.use('/api/students', studentRoutes);

// Test Route
app.get('/', (req, res) => {
    res.send('Student Management System Backend is Running!');
});

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/Student_Management_System')
    .then(() => {
        console.log('MongoDB Connected Successfully!');

        const PORT = 5000;

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log('MongoDB Connection Error:', error);
    });