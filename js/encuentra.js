// const boton = document.getElementById("Botton1")
// let idBo = boton.dataset.id

// const boton2 = document.getElementById("Botton2")
// let idBo2 = boton2.dataset.id

// const boton3 = document.getElementById("Botton3")
// let idBo3 = boton3.dataset.id



const nombre = [
    { id: 1, nombre: "Sofia", telefono: 923876452, email: "admin@admin" },
    { id: 2, nombre: "Gato", telefono: 923876452, email: "admin2@admin" },
    { id: 3, nombre: "Erick", telefono: 9238352352, email: "admin3@admin" }
]


function array(a) {
    let info = nombre.filter(nombre => nombre.id == a)

    console.log(info)
    const alert1 = `
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Datos de la usueario</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Nombre: ${info[0].nombre} </p>
                    <p>telefono: ${info[0].telefono} </p>
                    <p>correo: ${info[0].email} </p>
                    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>`

        document.getElementById("divModal").innerHTML = alert1
}