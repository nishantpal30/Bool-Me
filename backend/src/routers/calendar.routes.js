import express from "express";
import { getGoogleConnectUrl,handleGoogleCallback } from "../controllers/integartingCalendar.controller.js";

import isAuthenticated from "../middlewares/isauth.middleware.js";

const calendarRoutes = express.Router();

calendarRoutes.get("/google/connect",isAuthenticated,getGoogleConnectUrl);
calendarRoutes.get("/google/callback",  handleGoogleCallback);

export default calendarRoutes;