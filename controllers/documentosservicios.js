import bscrypt from "bcryptjs";
import { Servicios } from "../models/index.js";
import { jwt } from "../utils/jwt.js";

function registerServicio(req, res){

    const { fecha,
            propietario,
            Nombre,
            Apellido,
            Rut,
            Empresa,
            MarcaTracto,
            ModeloTractor,
            PatenteTractor,
            SemiRemorqueMarca,
            SemiRemorqueModelo,
            SemiRemorquePatente,
            SemiRemorqueTipo,
            TipoServicio,
            Cliente,
            LugarPresentacipnPT1,
            FechaPresentacionPT1,
            HoraPresentacionPT1,
            NumeroGuia,
            TipoContenedor,
            NumeroContenedor,
            SelloContenedor,
            AgreagacargaTipoCont,
	        AgreagacargaNroConte,
	        AgreagacargaSello,
            LugarPresentacionPT2,
            FechaCargaDescargaPT2,
            HoraPresentacionPT2,
            LugarPresentacionPT3,
            FechaPresentacionPT3,
            HoraPresentacionPT3 } = req.body;

    const servicio = new Servicios({
            fecha:                  fecha                   ,
            propietario:            propietario             ,            
            Nombre:                 Nombre                  ,
            Apellido:               Apellido                ,
            Rut:                    Rut                     ,
            Empresa:                Empresa                 ,
            MarcaTracto:            MarcaTracto             ,
            ModeloTractor:          ModeloTractor           ,
            PatenteTractor:         PatenteTractor          ,
            SemiRemorqueMarca:      SemiRemorqueMarca       ,
            SemiRemorqueModelo:     SemiRemorqueModelo      ,
            SemiRemorquePatente:    SemiRemorquePatente     ,
            SemiRemorqueTipo:       SemiRemorqueTipo        ,
            TipoServicio:           TipoServicio            ,
            Cliente:                Cliente                 ,
            LugarPresentacipnPT1:   LugarPresentacipnPT1    ,
            FechaPresentacionPT1:   FechaPresentacionPT1    ,
            HoraPresentacionPT1:    HoraPresentacionPT1     ,
            NumeroGuia:             NumeroGuia              ,
            TipoContenedor:         TipoContenedor          ,
            NumeroContenedor:       NumeroContenedor        ,
            SelloContenedor:        SelloContenedor         ,
            AgreagacargaTipoCont:   AgreagacargaTipoCont    ,
	        AgreagacargaNroConte:   AgreagacargaNroConte    ,
	        AgreagacargaSello:      AgreagacargaSello       ,      
            LugarPresentacionPT2:   LugarPresentacionPT2    ,
            FechaCargaDescargaPT2:  FechaCargaDescargaPT2   ,
            HoraPresentacionPT2:    HoraPresentacionPT2     ,
            LugarPresentacionPT3:   LugarPresentacionPT3    ,
            FechaPresentacionPT3:   FechaPresentacionPT3    ,
            HoraPresentacionPT3:    HoraPresentacionPT3     ,
    });
    
        
    servicio
                .save()    
                .then((data) => res.json(data))
                .catch((error)=> res.status(400).send({message: "Error al registrar el documento"}));  
}
 
async function getServc(req, res){  
   
    const { id } = req.params;
    try{
        const  response = await Servicios.findById(id)
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
        const  response = await Servicios.find({propietario: propietario})
        if(!response){
            res.status(400).send({message: "No se ha encontrado documentos"});
        }else {
            res.status(200).send(response);
        }
    } catch {
        res.status(500).send({ message: "Error del servidor"});
    }

}

export const ServController = {
    registerServicio,
    getServc,
    getPropietario,
};