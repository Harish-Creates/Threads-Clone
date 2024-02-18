const express = require('express');
const { signupUser, loginUser, logoutUser, followUnfollowUser, updateUser, getUserProfile } = require('../controllers/userController');
const { protectRoute } = require('../middleware/protectRoute');

const userRoutes = express.Router();

userRoutes.get("/profile/:query", getUserProfile);
userRoutes.post("/signup", signupUser)
userRoutes.post("/login", loginUser)
userRoutes.post("/logout",logoutUser)
userRoutes.post("/follow/:id", protectRoute, followUnfollowUser)
userRoutes.put("/update/:id", protectRoute, updateUser)


module.exports={
    userRoutes
}