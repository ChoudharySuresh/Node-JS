const mongoose = require("mongoose");

// Define the MongoDB Connection URL
const mongoURL = "mongodb://localhost:27017/hotels"; //Replace 'mydatabase' with your database name

// Set up MongoDB connection

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the default Connection
// Mongoose maintains a default connection object representing the mongoDB connection.

const db = mongoose.connection;

// Define event listeners for database connection

db.on("connected", () => {
  console.log("Connected to MongoDB Server");
});

db.on("error", (err) => {
  console.log("MongoDB Connection Error:", err);
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

// Export the database connection
module.exports = db;
