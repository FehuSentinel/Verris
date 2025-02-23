import mongoose from "mongoose";

const eventosSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100  
        },
        descripcion: {
            type: String,
            required: true,
            trim: true,
            maxlength: 500 
        },
        fecha: {
            type: Date,  // ✅ Se permite cualquier fecha sin restricciones
            required: true
        },
        hora: {
            type: String, // ✅ Se permite cualquier hora sin restricciones
            required: true
        },
        ubicacion: {
            type: String,
            required: true,
            trim: true
        },
        organizador: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario",
            required: true
        },
        precio: {
            type: Number,
            required: true,
            default: 0,
            min: [0, "El precio no puede ser negativo"]
        },
        Images: {
            type: [String],  
            default: []
        },
        estado: {
            type: String,
            enum: ["Público", "Privado"], // Solo acepta estos dos valores
            default: "Público"
        }
    },
    { timestamps: true }
);

export default mongoose.model("Eventos", eventosSchema);
