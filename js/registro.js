// variables
let nombre = document.getElementById("inputNombre")
let correo = document.getElementById("inputEmail")
let contraseña = document.getElementById("inputContraseña")
let boton = document.getElementById("enviar")
let formulario = document.querySelector(".formulario")
let divError = document.querySelector("#textError")

boton.addEventListener("click", validacionNombre)
function validacionNombre(e){
    e.preventDefault()
    if(nombre.value === "" && correo.value === "" && contraseña.value === ""){
        alerta()        
    } else if (nombre.value === "") {
        alerta()
    } else if (correo.value === "") {
        alerta()
    } else if (contraseña.value === "") {
        alerta()
    }
}

function alerta (){

let error = document.createElement('p')
        error.innerHTML="Se necesita todos los campos"
        divError.appendChild(error)
        setTimeout(()=>{
            error.remove()
        },3000);
}