document.addEventListener("DOMContentLoaded", () => {
    const formRegistro = document.getElementById('form-registro');
    const listaEstudiantes = document.getElementById('lista-estudiantes');
    const tablaHorario = document.getElementById('tabla-horario').getElementsByTagName('tbody')[0];
    const estadoClase = document.getElementById('estado');
    const cantidadHembras = document.getElementById('cantidad-hembras');
    const cantidadVarones = document.getElementById('cantidad-varones');
    
    let contadorHembras = 0;
    let contadorVarones = 0;

    if (formRegistro) {
        // Función para enviar un correo electrónico usando EmailJS
        const enviarCorreo = (nombrePadre, nombreMadre, nombreEstudiante, ubicacion, telefono, edad, grado, genero, comentario) => {
            emailjs.send("service_as2f68m", "template_bl5ganb", {
                nombre_padre: nombrePadre,
                nombre_madre: nombreMadre,
                nombre_estudiante: nombreEstudiante,
                ubicacion: ubicacion,
                telefono: telefono,
                edad: edad,
                grado: grado,
                genero: genero,
                comentario: comentario,
                from_name: "Dariel",
                reply_to: telefono
            }).then((response) => {
                console.log('SUCCESS!', response.status, response.text);
            }, (error) => {
                console.error('FAILED...', error);
            });
        };

        // Función para agregar un estudiante a la lista y enviar correo
        formRegistro.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombrePadre = document.getElementById('nombre-padre').value;
            const nombreMadre = document.getElementById('nombre-madre').value;
            const nombreEstudiante = document.getElementById('nombre-estudiante').value;
            const genero = document.getElementById('genero').value;
            const ubicacion = document.getElementById('ubicacion').value;
            const telefono = document.getElementById('telefono').value;
            const edad = document.getElementById('edad').value;
            const grado = document.getElementById('grado').value;
            const comentario = document.getElementById('comentary').value;

            if (genero === "hembra") {
                contadorHembras++;
                cantidadHembras.textContent = contadorHembras;
            } else if (genero === "varon") {
                contadorVarones++;
                cantidadVarones.textContent = contadorVarones;
            }

            formRegistro.reset();

            // Enviar correo
            enviarCorreo(nombrePadre, nombreMadre, nombreEstudiante, ubicacion, telefono, edad, grado, genero, comentario);
        });
    }

    if (tablaHorario) {
        // Función para agregar una clase al horario (ejemplo)
        const agregarClase = (dia, inicio, fin) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${dia}</td><td>${inicio}</td><td>${fin}</td>`;
            tablaHorario.appendChild(tr);
        };

        // Agregar algunas clases de ejemplo
        agregarClase('Lunes', '04:00 PM', '06:00 PM');
        agregarClase('Miércoles', '04:00 PM', '06:00 PM');
        agregarClase('Viernes', '04:00 PM', '06:00 PM');

        // Función para verificar si hay clases hoy
        const verificarClasesHoy = () => {
            const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
            const hoy = new Date();
            const diaHoy = diasSemana[hoy.getDay()];
            const filas = tablaHorario.getElementsByTagName('tr');
            let hayClase = false;

            for (let i = 0; i < filas.length; i++) {
                if (filas[i].getElementsByTagName('td')[0].textContent === diaHoy) {
                    hayClase = true;
                    break;
                }
            }

            estadoClase.textContent = hayClase ? 'Sí' : 'No';
        };

        verificarClasesHoy();
    }
});