const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./database/connectDB.js");
const cookieParser = require("cookie-parser");
const { userRoutes } = require("./routes/userRoutes.js");
const { postRoutes } = require("./routes/postRoutes.js");
// import { v2 as cloudinary } from "cloudinary";
const { v2: cloudinary } = require("cloudinary");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
connectDB();
const app = express();
const PORT = process.env.PORT;

//middlewares
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(PORT, () => console.log(`Server running in ${PORT}`));
