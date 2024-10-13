import mongoose from "mongoose";

export const connectMongoDB = async () => {
  //process.env.MONGODB_URI
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log("Erro connecting to database: ", error);
  }
};