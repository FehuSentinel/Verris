const API_URL = "http://localhost:5100/api"; // URL base del Backend

// ✅ Función para manejar las solicitudes a la API con mejor gestión de errores
async function fetchData(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {}), // Permite headers adicionales como Authorization
            },
        });

        // 🔹 Verificar si la respuesta tiene formato JSON antes de intentar parsearla
        const isJson = response.headers.get("Content-Type")?.includes("application/json");
        const responseData = isJson ? await response.json() : null;

        if (!response.ok) {
            throw new Error(responseData?.message || `Error en la API (${response.status})`);
        }

        return responseData;
    } catch (error) {
        console.error(`❌ Error en API (${endpoint}):`, error.message);
        throw error;
    }
}

// ✅ Obtener eventos públicos
export async function getPublicEvents() {
    return await fetchData("eventos");
}

// ✅ Obtener eventos de usuarios seguidos (requiere autenticación)
export async function getFollowingEvents(userId, token) {
    return await fetchData(`usuarios/${userId}/eventos`, {
        headers: { Authorization: `Bearer ${token}` },
    });
}

// ✅ Crear un evento (requiere autenticación y permite subir imágenes)
export async function createEvent(eventData, token) {
    return await fetchData("eventos", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(eventData),
    });
}

// ✅ Obtener un evento por ID
export async function getEventById(eventId) {
    return await fetchData(`eventos/${eventId}`);
}

// ✅ Actualizar un evento (requiere autenticación)
export async function updateEvent(eventId, eventData, token) {
    return await fetchData(`eventos/${eventId}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(eventData),
    });
}

// ✅ Eliminar un evento (requiere autenticación)
export async function deleteEvent(eventId, token) {
    return await fetchData(`eventos/${eventId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });
}
