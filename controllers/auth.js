import bscrypt from "bcryptjs";
import { User } from "../models/index.js";
import { jwt } from "../utils/jwt.js";

function register(req, res){

    const { email, password } = req.body;

    const user = new User({
        email: email.toLowerCase(),
    });
    
    const salt = bscrypt.genSaltSync(10);
    const hashPassword = bscrypt.hashSync(password, salt);
    user.password = hashPassword; 
    
    user
         .save()    
         .then((data) => res.json(data))
         .catch((error)=> res.status(400).send({message: "Error al registrar el usuario"}));  
}

async function login(req, res){
    const { email, password } = req.body;

    const user = new User({
        email: email.toLowerCase(),
        password: password
    })
            
    const salt = bscrypt.genSaltSync(10);
    const hashPassword = bscrypt.hashSync(password, salt);
    user.password = hashPassword;

    const emaillowerCase = email.toLowerCase();
    try {
            const userStorage = await User.findOne({email:emaillowerCase}).exec();
            const check = await bscrypt.compare(password, userStorage.password);
            if (!check){
                res.status(400).send({message: "Contraseña incorreta"});
            } else {
                res.status(200).send({
                    access: jwt.createAccessToken(userStorage),
                    refresh: jwt.createRefreshToken(userStorage),
                });
            }
    } catch (error) {
            res.status(500).send({mesage: "Error del servicio"});
    }

               
 }    

function refreshAccessToken(req, res){
    const { refreshToken } = req.body;
    //console.log(refreshToken);

    if (!refreshToken ) {
       res.status(400).send({ message : "Token requerido"});
    }

    const hasEspired = jwt.hasExpireToken(refreshToken);

    if (hasEspired) {
        res.status(400).send({ message : "Toeken expirado"});
    }

    const { user_id } = jwt.decoded(refreshToken);

    User
        .findById(user_id)
        .then((data) => res.json({
            accessToken: jwt.createAccessToken(data),
         }))
        .catch((error)=> res.json({
             message: "Error del servidor",
        }));   
    
   
}

export const AutController = {
    register,
    login,
    refreshAccessToken,
};

