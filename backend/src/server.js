import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { serverConfig } from "./config/server.config.ts";
import { connectDB } from "./config/db.config.ts";

// Middleware 

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// middleware
app.listen(serverConfig.PORT, async ()=>{

 console.log(`Server Running Sucessfully at PORT ${serverConfig.PORT}`);
 connectDB();
});
