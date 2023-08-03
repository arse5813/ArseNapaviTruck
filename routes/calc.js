import express from "express";
import multiparty from "connect-multiparty";
import { CalController } from "../controllers/index.js";
import { mdAuth } from "../middlewares/index.js";


const api = express.Router();

// api.post("/calc/data", [mdAuth.asureAuth], ChatMessageController.sendText)
// api.get("/calc/data/:calc_id", [mdAuth.asureAuth], ChatMessageController.getAll);

api.post("/calc/data", CalController.registerCalc)
api.get("/calc/:id", CalController.getCalc);
api.get("/calc/data/:propietario", [mdAuth.asureAuth] ,CalController.getPropietario);



export const calcRouter = api;