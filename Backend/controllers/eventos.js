import eventosModel from "../models/eventos.js";

class EventosController {
    constructor() {}

    // ✅ Crear evento con imagen opcional
    async create(req, res) {
        try {
            const { nombre, descripcion, fecha, hora, ubicacion, precio, estado } = req.body;
            let imagenUrl = "";

            // Verifica si se subió una imagen
            if (req.file) {
                imagenUrl = `data:image/png;base64,${req.file.buffer.toString("base64")}`;
            }

            const nuevoEvento = await eventosModel.create({
                nombre,
                descripcion,
                fecha,
                hora,
                ubicacion,
                precio,
                estado: estado || "Público", // Por defecto es público
                organizador: req.user.id, 
                Images: imagenUrl ? [imagenUrl] : []
            });

            res.status(201).json(nuevoEvento);
        } catch (e) {
            console.error("❌ Error al crear evento:", e);
            res.status(500).json({ message: "Error en el servidor al crear evento" });
        }
    }

    // ✅ Obtener todos los eventos
    async getAll(req, res) {
        try {
            const eventos = await eventosModel.getAll();
            res.status(200).json(eventos);
        } catch (e) {
            console.error("❌ Error al obtener eventos:", e);
            res.status(500).json({ message: "Error en el servidor al obtener eventos" });
        }
    }

    // ✅ Obtener un solo evento por ID
    async getOne(req, res) {
        try {
            const { id } = req.params;
            const evento = await eventosModel.getOne(id);

            if (!evento) {
                return res.status(404).json({ message: "Evento no encontrado" });
            }

            res.status(200).json(evento);
        } catch (e) {
            console.error("❌ Error al obtener evento:", e);
            res.status(500).json({ message: "Error en el servidor al obtener evento" });
        }
    }

    // ✅ Actualizar evento por ID
    async update(req, res) {
        try {
            const { id } = req.params;

            // Verificar si el evento existe
            const eventoExistente = await eventosModel.getOne(id);
            if (!eventoExistente) {
                return res.status(404).json({ message: "Evento no encontrado" });
            }

            // Si hay imagen nueva, convertirla a Base64
            if (req.file) {
                req.body.Images = [`data:image/png;base64,${req.file.buffer.toString("base64")}`];
            } else {
                req.body.Images = eventoExistente.Images; // Mantener imágenes existentes si no se sube una nueva
            }

            const eventoActualizado = await eventosModel.update(id, req.body);

            res.status(200).json(eventoActualizado);
        } catch (e) {
            console.error("❌ Error al actualizar evento:", e);
            res.status(500).json({ message: "Error en el servidor al actualizar evento" });
        }
    }

    // ✅ Eliminar evento por ID
    async delete(req, res) {
        try {
            const { id } = req.params;

            // Verificar si el evento existe antes de eliminarlo
            const eventoExistente = await eventosModel.getOne(id);
            if (!eventoExistente) {
                return res.status(404).json({ message: "Evento no encontrado" });
            }

            await eventosModel.delete(id);
            res.status(200).json({ message: "Evento eliminado exitosamente" });
        } catch (e) {
            console.error("❌ Error al eliminar evento:", e);
            res.status(500).json({ message: "Error en el servidor al eliminar evento" });
        }
    }
}

export default new EventosController();
