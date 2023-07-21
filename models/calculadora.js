import mongoose from "mongoose";

const CalculadorMessageaSchema = mongoose.Schema (
    {
        fecha: {
            type: Date,
            required:true,
        },
        propietario: {
            type: String,
            required:true,
        },
        vuelta: {
            type: Number,
            required:true,
        },
        viatico: {
            type: Number,
            required:true,
        },
        pesaje: {
            type: Number,
            required:true,
        },
        reparacion: {
            type: Number,
            required:true,
        },
        combustible: {
            type: Number,
            required:true,
        },
    },
    {
        timestamps: true,
    }
)

export const Calculadora = mongoose.model("Calculadora", CalculadorMessageaSchema);
  