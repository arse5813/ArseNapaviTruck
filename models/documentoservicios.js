import mongoose from "mongoose";

const Servicioschema = mongoose.Schema (
    {
        fecha: {
            type: Date,
            required:true,
        },
        propietario: {
            type: String,
            required:true,
        },
        Nombre: {
            type: String,
            required:true,
        },
        Apellido: {
            type: String,
            required:true,
        },
        Rut: {
            type: String,
            required:true,
        },
        Empresa: {
            type: String,
            required:true,
        },
        MarcaTracto:  {
            type: String,
            required:true,
        },
        ModeloTractor: {
            type: String,
            required:true,
        },
        PatenteTractor: { 
            type: String,
            required:true,
        },
        SemiRemorqueMarca: {
            type: String,
            required:true,
        },
        SemiRemorqueModelo: {
            type: String,
            required:true,
        },
        SemiRemorquePatente: {
            type: String,
            required:true,
        },
        SemiRemorqueTipo: {
            type: String,
            required:true,
        },
        TipoServicio: {
            type: String,
            required:true,
        },
        Cliente: {
            type: String,
            required:true,
        },
        LugarPresentacipnPT1: {
            type: String,
            required:true,
        },
        FechaPresentacionPT1: {
            type: Date,
            required:true,
        },
        HoraPresentacionPT1: {
            type: Date,
            required:true,
        },
        NumeroGuia: {
            type: String,
            required:true,
        },
        TipoContenedor: {
            type: String,
            required:true,
        },
        NumeroContenedor: {
            type: String,
            required:true,
        },
        SelloContenedor: {
            type: String,
            required:true,
        },
        AgreagacargaTipoCont:{
            type: String,
            required:true,
        },
        AgreagacargaSello: {
            type: String,
            required:true,
        },
        LugarPresentacionPT2: {
            type: String,
            required:true,
        },
        FechaCargaDescargaPT2: {
            type: Date,
            required:true,
        },
        HoraPresentacionPT2: {
            type: Date,
            required:true,
        },
        LugarPresentacionPT3: {
            type: String,
            required:true,
        },
        FechaPresentacionPT3: {
            type: Date,
            required:true,
        },
        HoraPresentacionPT3: {
            type: Date,
            required:true,
        },
    },
    {
        timestamps: true,
    }
)

export const Servicios = mongoose.model("Servicios", Servicioschema);