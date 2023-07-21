import  express  from "express";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import morgan from "morgan";
import { initSocketServer } from "./utils/socketServer.js";
import { 
    autRouter,
    userRoutes, 
    chatRoutes, 
    chatMessageRoutes,
    groupRoutes,
    groupMessageRoutes, 
    calcRouter, } 
    from "./routes/index.js";

const app= express();
const server = http.createServer(app);
initSocketServer(server);

// Configure Body Parser
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// Configure static folder
app.use(express.static("uploads"));

// Configure Header HTTP - CORS
app.use(cors());

// Confugure logger HTTP request
app.use(morgan("dev"));

// Configure routing
app.use("/api", autRouter);
app.use("/api", userRoutes);
app.use("/api", chatRoutes);
app.use("/api", chatMessageRoutes);
app.use("/api", groupRoutes);
app.use("/api", groupMessageRoutes);
app.use("/api", calcRouter);

export { server }