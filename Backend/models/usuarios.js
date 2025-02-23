import mongoose from 'mongoose';
import Usuarios from '../schemas/usuarios.js';

class usuariosModel {

    async create(usuarios) {
        return await Usuarios.create(usuarios);
    }

    async getAll() {
        return await Usuarios.find();
    }

    async getOne(filtro) {
        return await Usuarios.findOne(filtro);
    }

    async getOneById(id) {
        return await Usuarios.findById(id);
    }

    // ✅ CORREGIDO: Actualizar usuario correctamente
    async update(id, data) {
        return await Usuarios.findByIdAndUpdate(id, data, { new: true });
    }

    // ✅ CORREGIDO: Eliminar usuario correctamente
    async delete(id) {
        return await Usuarios.findByIdAndDelete(id);
    }
}

export default new usuariosModel();
