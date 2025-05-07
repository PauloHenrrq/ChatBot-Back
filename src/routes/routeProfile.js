import express from "express";

import authMiddleware from '../middleware/authMiddleware';

import controllerGetProfile from "../controller/controllerProfile";
const getProfile = controllerGetProfile
const profileRoute = express.Router()

profileRoute.get('/profile', authMiddleware, getProfile)

export default profileRoute