import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/index.js";

dotenv.config();

connectDB()
    .then(() => {
        console.log("Connected to MongoDB");

        app.listen(5000, () => {
            console.log("Server is running on PORT :: 5000");
        });
    })
    .catch((error) => console.log("Error in DB : ", error));
