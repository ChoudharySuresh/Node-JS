const mongoose = require("mongoose");
require("dotenv").config();

// Define the MongoDB Connection URL
const mongoURL = "mongodb://0.0.0.0:27017/hotels"; //Replace 'mydatabase' with your database name
// const mongoURL =
//   "mongodb+srv://sureshchoudhary:Suresh8636@cluster0.ukqymad.mongodb.net/";

// const mongoURL = process.env.MONGODB_URL;

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
