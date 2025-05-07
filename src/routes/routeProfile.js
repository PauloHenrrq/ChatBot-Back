import express from "express";

import controllerGetProfile from "../controller/controllerProfile";
const getProfile = controllerGetProfile
const profileRoute = express.Router()

profileRoute.get('/profile',  getProfile)

export default profileRoute