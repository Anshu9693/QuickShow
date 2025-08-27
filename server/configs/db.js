import mongoose from "mongoose";
console.log(process.env.MONGODB_URI);
const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("database connected successfully")
    );
    await mongoose.connect(`${process.env.MONGODB_URI}/quickshow`);
  } catch (error) {
    console.log(
      `Error connecting to MongoDB fileNmae{db.js}: ${error.message}`
    );
  }
};
export default connectDB;
