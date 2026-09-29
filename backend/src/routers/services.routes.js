import express from "express";
import isAuthenticated from "../middlewares/isauth.middleware.js";
import { create_services, deleteService, listof_Services, updateService } from "../controllers/service.controller.js";


const serviceRoutes = express.Router();
serviceRoutes.get("/", isAuthenticated, listof_Services);
serviceRoutes.get("/", isAuthenticated, create_services);
serviceRoutes.get("/:id", isAuthenticated, updateService);
serviceRoutes.get("/:id", isAuthenticated, deleteService);

export default serviceRoutes;