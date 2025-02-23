import express from "express";
import eventosController from "../controllers/eventos.js";
import multer from "multer";
import mongoose from "mongoose";
import { verificarToken } from "../helpers/autenticacion.js";  // 🔹 Usar middleware de autenticación

const route = express.Router();

// 📌 Configurar multer para manejar imágenes en memoria
const upload = multer({ storage: multer.memoryStorage() });

// 📌 Middleware para validar ID de MongoDB
const validateObjectId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "ID de evento no válido" });
    }
    next();
};

// 📌 Rutas de eventos
route.post("/", verificarToken, upload.single("imagen"), eventosController.create);  // Crear evento
route.get("/", eventosController.getAll);  // Obtener todos los eventos
route.get("/:id", validateObjectId, eventosController.getOne);  // Obtener un evento por ID
route.put("/:id", verificarToken, validateObjectId, upload.single("imagen"), eventosController.update);  // Actualizar evento
route.delete("/:id", verificarToken, validateObjectId, eventosController.delete);  // Eliminar evento

export default route;
