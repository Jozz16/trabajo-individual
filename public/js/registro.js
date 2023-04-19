// Declaracion de variables a usar
const nombreInput = document.getElementById('nombre');
const contraseñaInput = document.getElementById('contraseña');
const emailInput = document.querySelector('#email');
const formulario = document.querySelector('.formulario')


const datos = {
    nombre:'',
    email:'', 
    contraseña:''
}

nombreInput.addEventListener('input', leerTexto)
emailInput.addEventListener('input', leerTexto)
contraseñaInput.addEventListener('input', leerTexto)

// Evento submit 
formulario.addEventListener('submit', function(e){
    // e.preventDefault()
    
    // Validar el formulario

    const {nombre, email, contraseña} = datos
    if(nombre == '' || email == ''||contraseña== ''){
        mostrarError('Todos los campos son obligatorios*')
        return
    }
    mostrarAprobacion('Formulario enviado correctamente')
    limpiarFormulario()
})

function mostrarError(mensaje){
    let error = document.createElement('P')
    error.textContent = mensaje
   
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
    
    datos[e.target.id] = e.target.value
    // console.log(datos)
}