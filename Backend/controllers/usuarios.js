import usuariosModel from '../models/usuarios.js';
import bcrypt from 'bcrypt';
import { generarToken } from '../helpers/autenticacion.js';

class usuariosController {
    constructor() {}

    async register(req, res) {
        try {
            const { username, nombre, email, password } = req.body;

            const emailExiste = await usuariosModel.getOne({ email });
            if (emailExiste) {
                return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
            }

            const usernameExiste = await usuariosModel.getOne({ username });
            if (usernameExiste) {
                return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
            }

            const passwordHasheada = await bcrypt.hash(password, 12);

            const data = await usuariosModel.create({ username, nombre, email, password: passwordHasheada });

            console.log('Usuario registrado exitosamente')
            return res.status(201).json(data);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Error en el servidor' });
        }
    }

    async login(req, res) {
        try {
            const { email, username, password } = req.body;
    
            const usuario = await usuariosModel.getOne({ 
                $or: [{ email }, { username }]  
            });
    
            if (!usuario) {
                return res.status(400).json({ message: 'El usuario no existe' });
            }
    
            const passwordValid = await bcrypt.compare(password, usuario.password);
            
            if (!passwordValid) {
                return res.status(400).json({ message: 'Contraseña incorrecta' });
            }
    
            const token = generarToken(usuario); // 🔹 Ahora se pasa todo el usuario, no solo el email
    
            return res.status(200).json({ message: 'Inicio de sesión exitoso', usuario, token });
        } catch (error) {
            console.log("❌ Error en login:", error);
            return res.status(500).json({ message: 'Error en el servidor' });
        }
    }
    

    // ✅ Agregar la función getOne para corregir el error
    async getOne(req, res) {
        try {
            const { id } = req.params;
            const usuario = await usuariosModel.getOne({ _id: id }); // Buscar usuario por ID en MongoDB

            if (!usuario) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }

            return res.status(200).json(usuario);
        } catch (error) {
            console.error("❌ Error al obtener usuario:", error);
            return res.status(500).json({ message: "Error en el servidor" });
        }
    }
}

export default new usuariosController();
