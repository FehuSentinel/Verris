import 'dotenv/config';
import jsonwebtoken from 'jsonwebtoken';
import Usuarios from '../schemas/usuarios.js'; // 🔹 Importar el modelo de usuarios

// ✅ Generar un Token JWT
export function generarToken(usuario) {
    return jsonwebtoken.sign(
        { id: usuario._id, email: usuario.email },
        process.env.JWT_TOKEN_SECRET,
        { expiresIn: '1h' }
    );
}

// ✅ Middleware para verificar Token
export async function verificarToken(req, res, next) {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '').trim();

        if (!token) {
            return res.status(401).json({ error: 'Token no proporcionado' });
        }

        const dataToken = jsonwebtoken.verify(token, process.env.JWT_TOKEN_SECRET);
        
        // 🔹 Buscar usuario en la base de datos si es necesario
        const usuario = await Usuarios.findById(dataToken.id).select('-password');

        if (!usuario) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        req.user = usuario; // 🔹 Asigna usuario autenticado a `req.user`
        console.log("🔹 Usuario autenticado:", req.user);

        next();
    } catch (error) {
        console.error("🔴 Error en la verificación del token:", error);
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }
}
