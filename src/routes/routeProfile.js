import express from "express";

import controllerProfile from "../controller/controllerProfile";
const getProfile = controllerProfile
const profileRoute = express.Router()

profileRoute.get('/profile',  getProfile)

export default profileRoute