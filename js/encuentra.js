
const nombre = [
    {id:1, nombre: "sofia", telefono:923876452, email:"admin@admin"}
]




function imprimir(){
const alert = `
<div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Datos de la usueario</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Nombre: ${nombre[0].nombre} </p>
                    <p>telefono: ${nombre[0].telefono} </p>
                    <p>correo: ${nombre[0].email} </p>
                    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>`

document.getElementById("divModal").innerHTML=alert
}





