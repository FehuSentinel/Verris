import mongoose from "mongoose";
import Eventos from "../schemas/eventos.js";

class EventosModel {
    async create(evento) {
        try {
            return await Eventos.create(evento);
        } catch (error) {
            throw new Error(`Error al crear el evento: ${error.message}`);
        }
    }

    async getAll() {
        try {
            return await Eventos.find({ estado: "Activo" }).sort({ fecha: 1 });
        } catch (error) {
            throw new Error(`Error al obtener eventos: ${error.message}`);
        }
    }

    async getOne(id) {
        try {
            return await Eventos.findById(id).populate("organizador", "username email");
        } catch (error) {
            throw new Error(`Error al obtener el evento: ${error.message}`);
        }
    }

    async update(id, evento) {
        try {
            return await Eventos.findByIdAndUpdate(id, evento, { new: true, runValidators: true });
        } catch (error) {
            throw new Error(`Error al actualizar el evento: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            return await Eventos.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`Error al eliminar el evento: ${error.message}`);
        }
    }
}

export default new EventosModel();
