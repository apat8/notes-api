import "dotenv/config"
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import collectionRoutes from "./routes/collectionRoutes.js";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorMiddleware.js";

// Set server Port
const PORT = process.env.PORT || 3500;

const app = express();

// Connect to MongoDB
connectDB();

// CORS middleware
const whitelist = ['http://localhost:3000', 'http://localhost:3500'];
const corsOptions = {
    origin: (origin, callback) =>{
        if(whitelist.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        }
        else{
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

// built-in middleware for json
app.use(express.json());

// build-in middleware to handle ulrencoded form data
app.use(express.urlencoded({extended: true}));

// Cookie parser middleware
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/collections", collectionRoutes);

// Custom error handler
app.use(errorHandler);

// Start server only when connection to MongoDB is successfull
mongoose.connection.once("open", () => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});