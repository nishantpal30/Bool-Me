import express from "express"
import { listAvailabilty,saveAvailability } from "../controllers/availability.controller.js";
import isAuthenticated from "../middlewares/isauth.middleware.js";


const availabilityRoutes = express.Router();

availabilityRoutes.get("/",isAuthenticated,listAvailabilty);
availabilityRoutes.get("/",isAuthenticated,saveAvailability);

export default availabilityRoutes;