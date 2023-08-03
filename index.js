import mongooseDb from "mongoose";
import { server } from "./app.js";
import { IP_SERVER, PORT, DB_USER, DB_PASSWORD, DB_HOST } from "./constants.js";
import { io } from "./utils/index.js";


const mongoDbUrl = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/dbArse`

//const mongoDbUrl = "mongodb://127.0.0.1:27017/dbArse";
console.log(mongoDbUrl);
mongooseDb.connect(mongoDbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
     .then((result) => { // Successfully connected
    
    server.listen(PORT, () =>{
        console.log("####################")
        console.log("##### API REST######")
        console.log("####################")
        console.log(`http://${IP_SERVER}:${PORT}/api`)
        console.log(mongoDbUrl);

        io.sockets.on("connection", (socket) =>{
           console.log("NUEVO USUARIO CONECTADO"); 

           socket.on("disconnect", () => {
                 console.log("USUARIO DESCONECTADO");
            });

            socket.on("subscribe", (room) => {
                 socket.join(room);
            });

            socket.on("unsubdcribe", (room) => {
                 socket.leave(room);
            });

        });

    });


  }).catch((err) => {
    // Catch any potential error
    console.log(mongoose.version);
    console.log("Unable to connect to MongoDB. Error: " + err);
  });

