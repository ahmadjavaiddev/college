import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // const conn = await mongoose.connect(process.env.MONGO_URI);
        const conn = await mongoose.connect(
            "mongodb+srv://ahmadjavaiddev:justNothing@cluster0.uyh4woy.mongodb.net/college-management"
        );
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("Error in DB : ", error);
        process.exit(1);
    }
};

export default connectDB;
