import express from "express";
import { AutController } from "../controllers/index.js"


const api = express.Router();

api.post("/auth/register", AutController.register);
api.post("/auth/login", AutController.login);
api.post("/auth/refresh_access_token", AutController.refreshAccessToken);



export const autRouter = api;