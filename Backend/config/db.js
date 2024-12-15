/**
 * Connects to the MongoDB database using Mongoose.
 * The MongoDB URI is retrieved from the environment variable `MONGO_URI`.
 * 
 * @async
 * @function connectDB
 * @throws Will throw an error if the connection to the database fails.
 */
const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
module.exports = connectDB;
