import express from "express";
import multiparty from "connect-multiparty";
import { ServController } from "../controllers/index.js";
import { mdAuth } from "../middlewares/index.js";


const api = express.Router();

// api.post("/calc/data", [mdAuth.asureAuth], ChatMessageController.sendText)
// api.get("/calc/data/:calc_id", [mdAuth.asureAuth], ChatMessageController.getAll);

api.post("/serv/data",[mdAuth.asureAuth],ServController.registerServicio);
api.get("/serv/:id",[mdAuth.asureAuth],ServController.getServc);
api.get("/serv/data/:propietario",[mdAuth.asureAuth],ServController.getPropietario);



export const servRouter = api;