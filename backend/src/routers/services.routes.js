import express from "express";
import isAuthenticated from "../middlewares/isauth.middleware.js";
import { create_services, deleteService, listof_Services, updateService } from "../controllers/service.controller.js";


const serviceRoutes = express.Router();
serviceRoutes.get("/", isAuthenticated, listof_Services);
serviceRoutes.post("/", isAuthenticated, create_services);
serviceRoutes.patch("/:id", isAuthenticated, updateService);
serviceRoutes.delete("/:id", isAuthenticated, deleteService);

export default serviceRoutes;