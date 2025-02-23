
import usuariosModel from '../models/usuarios.js';
import mongoose from "mongoose";

const usuariosSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [new RegExp(/^\S+@\S+\.\S+$/), "Correo inválido"]
    },
    telefono: {
        type: String,
        trim: true,
        match: [/^\d{9,15}$/, "Teléfono inválido"] // Asegura que tenga entre 9 y 15 dígitos
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'default.png'
    },
    bio: {
        type: String,
        default: '',
        maxLength: 500,
    },
    suscription:{
        type: String,
        default: 'free',
        enum: ['free', 'premium', 'gold']
    }

}, {
    timestamps: true  // Agrega automáticamente createdAt y updatedAt
});

export default mongoose.model('usuarios', usuariosSchema);
