// =========================================================================
// --- CONTROL DE APERTURA Y CIERRE DEL MODAL (TURNERO) ---
// =========================================================================

/**
 * Muestra la ventana flotante del turnero.
 * Cambia el display a 'flex' para que actúen las reglas de centrado del CSS.
 */
function abrirTurnero() {
    const modal = document.getElementById('modal-turnero');
    if (modal) {
        modal.style.display = 'flex';
        
        // Detalle de calidad: Bloqueamos el scroll del fondo mientras el modal está abierto
        document.body.style.overflow = 'hidden';
        
        // Autoseleccionar la fecha de hoy por defecto en el calendario (Opcional, mejora UX)
        const inputFecha = document.getElementById('turno-fecha');
        if (inputFecha && !inputFecha.value) {
            const hoy = new Date().toISOString().split('T')[0];
            inputFecha.min = hoy; // Evita que saquen turnos en días pasados
        }
    }
}

/**
 * Oculta la ventana flotante del turnero.
 */
function cerrarTurnero() {
    const modal = document.getElementById('modal-turnero');
    if (modal) {
        modal.style.display = 'none';
        
        // Devolvemos el scroll normal a la página de fondo
        document.body.style.overflow = 'auto';
    }
}

// Cierre de seguridad: Si el usuario hace clic fuera de la caja blanca del modal, también se cierra
window.addEventListener('click', function(e) {
    const modal = document.getElementById('modal-turnero');
    if (e.target === modal) {
        cerrarTurnero();
    }
});


// =========================================================================
// --- PROCESAMIENTO DEL FORMULARIO DE TURNOS ---
// =========================================================================
document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('form-solicitar-turno');

    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            // 1. Frenamos el comportamiento nativo (evita que la página se reinicie y se pierdan los datos)
            e.preventDefault();

            // 2. Capturamos los valores ingresados por el paciente
            const nombre = document.getElementById('paciente-nombre').value;
            const dni = document.getElementById('paciente-dni').value;
            const telefono = document.getElementById('paciente-telefono').value;
            const fecha = document.getElementById('turno-fecha').value;
            const hora = document.getElementById('turno-hora').value;

            // 3. Formateamos la fecha para que se lea más amigable (Ej: de 2026-05-20 a 20/05/2026)
            const fechaFormateada = fecha.split('-').reverse().join('/');

            // 4. Armamos el mensaje de éxito profesional
            // En un proyecto real avanzado, aquí enviarías estos datos a una base de datos o API.
            const mensajeExito = `
¡TURNO RESERVADO CON ÉXITO!
---------------------------------------
Paciente: ${nombre}
DNI: ${dni}
Fecha: ${fechaFormateada}
Horario: ${hora} hs.

El registro quedó asentado en el sistema del Consultorio. 
Se enviará un recordatorio al teléfono: ${telefono}.
            `;

            // 5. Mostramos la alerta al usuario
            alert(mensajeExito);

            // 6. Limpiamos las cajas de texto del formulario y cerramos el modal
            formulario.reset();
            cerrarTurnero();
        });
    }
});