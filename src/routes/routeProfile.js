import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import controllerGetProfile from "../controller/controllerProfile.js";
const getProfile = controllerGetProfile
const profileRoute = express.Router()

profileRoute.get('/profile', authMiddleware, getProfile)

export default profileRoute