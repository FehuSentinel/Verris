import { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";

export default function Dashboard() {
    const { user } = useContext(AuthContext);

    // 🔹 Obtener la fecha actual en formato "YYYY-MM-DD"
    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split("T")[0]; // Formato YYYY-MM-DD
    };

    // 🔹 Obtener la hora actual en formato "HH:mm"
    const getCurrentTime = () => {
        const now = new Date();
        return now.toTimeString().slice(0, 5);
    };

    // Estado para manejar los datos del formulario
    const [eventData, setEventData] = useState({
        nombre: "",
        descripcion: "",
        fecha: getTodayDate(), // ✅ Se asegura de que inicie con la fecha actual
        hora: getCurrentTime(), // ✅ Se asegura de que inicie con la hora actual
        ubicacion: "",
        precio: "",
        imagen: null,
        estado: "Público" 
    });

    // 🔹 Efecto para establecer la fecha y hora automáticamente al cargar el formulario
    useEffect(() => {
        setEventData((prev) => ({
            ...prev,
            fecha: getTodayDate(),
            hora: getCurrentTime(),
        }));
    }, []);

    // Manejo de cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData({ ...eventData, [name]: value });
    };

    // Manejo de archivo (imagen)
    const handleFileChange = (e) => {
        setEventData({ ...eventData, imagen: e.target.files[0] });
    };

    // Enviar formulario a la API
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!user) {
            alert("Debes iniciar sesión para crear un evento.");
            return;
        }

        console.log("Fecha enviada:", eventData.fecha);
        console.log("Hora enviada:", eventData.hora);

        const formData = new FormData();
        formData.append("nombre", eventData.nombre);
        formData.append("descripcion", eventData.descripcion);
        formData.append("fecha", eventData.fecha);
        formData.append("hora", eventData.hora);
        formData.append("ubicacion", eventData.ubicacion);
        formData.append("precio", eventData.precio);
        formData.append("estado", eventData.estado);
        if (eventData.imagen) {
            formData.append("imagen", eventData.imagen);
        }

        try {
            const response = await fetch("http://localhost:5100/api/eventos", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Error al crear el evento.");
            }

            alert("Evento creado exitosamente.");
            setEventData({
                nombre: "",
                descripcion: "",
                fecha: getTodayDate(),
                hora: getCurrentTime(),
                ubicacion: "",
                precio: "",
                imagen: null,
                estado: "Público"
            });
        } catch (error) {
            console.error("Error:", error);
            alert("No se pudo crear el evento.");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Dashboard - Crear Evento</h2>
            
            {!user ? (
                <p>Debes iniciar sesión para ver esta sección.</p>
            ) : (
                <form className="row g-3" onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="col-md-6">
                        <label className="form-label">Nombre del Evento</label>
                        <input type="text" className="form-control" name="nombre" value={eventData.nombre} onChange={handleChange} required />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Ubicación</label>
                        <input type="text" className="form-control" name="ubicacion" value={eventData.ubicacion} onChange={handleChange} required />
                    </div>

                    <div className="col-12">
                        <label className="form-label">Descripción</label>
                        <textarea className="form-control" name="descripcion" value={eventData.descripcion} onChange={handleChange} required></textarea>
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Fecha</label>
                        <input type="date" className="form-control" name="fecha" value={eventData.fecha} onChange={handleChange} required />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Hora</label>
                        <input type="time" className="form-control" name="hora" value={eventData.hora} onChange={handleChange} required />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Precio</label>
                        <input type="number" className="form-control" name="precio" value={eventData.precio} onChange={handleChange} required />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Estado</label>
                        <select className="form-control" name="estado" value={eventData.estado} onChange={handleChange} required>
                            <option value="Público">Público</option>
                            <option value="Privado">Privado</option>
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Imagen del Evento</label>
                        <input type="file" className="form-control" name="imagen" onChange={handleFileChange} accept="image/*" />
                    </div>

                    <div className="col-12">
                        <button type="submit" className="btn btn-success">Crear Evento</button>
                    </div>
                </form>
            )}
        </div>
    );
}
