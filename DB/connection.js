import mongoose from "mongoose"
const connectDB = async () =>{
    return await mongoose.connect(process.env.MONGO_URI).then(() => console.log('Database connection is established ...'))
    .catch (err => console.log('Database connection error: ', err));
};

export default connectDB;