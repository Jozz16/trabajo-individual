// Declaracion de variables a usar
const nombreInput = document.getElementById('nombre');
const emailInput = document.querySelector('#email');
const mensajeInput = document.getElementById('mensaje');
const formulario = document.querySelector('.formulario')
const datos = {
    nombre:'',
    email:'',
    mensaje:''
}

nombreInput.addEventListener('input', leerTexto)
emailInput.addEventListener('input', leerTexto)
mensajeInput.addEventListener('input', leerTexto)

// Evento submit 
formulario.addEventListener('submit', function(e){
    e.preventDefault()
    
    // Validar el formulario

    const {nombre, email, mensaje} = datos
    if(nombre == '' || email == '' || mensaje == ''){
        mostrarError('Todos los campos son obligatorios*')
        return
    }
    mostrarAprobacion('Formulario enviado correctamente')
    limpiarFormulario()
})

function mostrarError(mensaje){
    let error = document.createElement('P')
    error.textContent = mensaje
    console.log(error)
    error.classList.add('error')
    formulario.appendChild(error)
    //ocultar alerta
    setTimeout(() => {
        error.remove()
    }, 4000);
}
function mostrarAprobacion(mensaje){
    let check = document.createElement('P')
    check.textContent = mensaje
    check.classList.add('check')
    formulario.appendChild(check)
    //ocultar check
    setTimeout(() => {
        check.remove()
    }, 5000);
}

function limpiarFormulario(){
    nombreInput.value =''
    emailInput.value =''
    mensajeInput.value =''
}

function leerTexto(e) {
    // console.log('Escribiendo..')
    // console.log(e.target.value)
    datos[e.target.id] = e.target.value
    // console.log(datos)
}