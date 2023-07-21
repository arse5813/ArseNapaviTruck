import bscrypt from "bcryptjs";
import { Calculadora } from "../models/index.js";
import { jwt } from "../utils/jwt.js";

function registerCalc(req, res){

    const { fecha,propietario,vuelta,viatico,pesaje, reparacion, combustible } = req.body;

    const calculadora = new Calculadora({
        fecha: fecha,
        propietario: propietario,
        vuelta: vuelta,
        viatico: viatico,
        pesaje: pesaje,
        reparacion: reparacion,
        combustible: combustible
    });
    
        
    calculadora
                .save()    
                .then((data) => res.json(data))
                .catch((error)=> res.status(400).send({message: "Error al registrar el documento"}));  
}
 
async function getCalc(req, res){  
   
    const { id } = req.params;
    try{
        const  response = await Calculadora.findById(id)
        if(!response){
            res.status(400).send({message: "No se ha encontrado el documento"});
        }else {
            res.status(200).send(response);
        }
    } catch {
        res.status(500).send({ message: "Error del servidor"});
    }
}

async function getPropietario(req, res){   
    
    const { propietario } = req.params;
    
    try{
        const  response = await Calculadora.find({propietario: propietario})
        if(!response){
            res.status(400).send({message: "No se ha encontrado documentos"});
        }else {
            res.status(200).send(response);
        }
    } catch {
        res.status(500).send({ message: "Error del servidor"});
    }

}

export const CalController = {
    registerCalc,
    getCalc,
    getPropietario,
};