const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const AdminRouter = require('./routes/AdminRoute');

// Express app setup
const app = express();

// Enable CORS for all routes
app.use(cors());

// Configure Express to parse JSON request bodies
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect('mongodb+srv://lafabriquesas:XiymFcS4MeR63ZXi@cluster0.2haff.mongodb.net/')
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('MongoDB connection error:', error));

// Handle MongoDB connection error
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Middleware for CORS headers
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Use Admin routes
app.use('/api/Admin', AdminRouter);

// Start the server
//const PORT = process.env.PORT || 5000;
//app.listen(PORT, () => {
  //console.log(`Server is running on port ${PORT}`);
//});

module.exports = app;
