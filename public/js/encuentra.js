function array(name, email) {
    const alert1 = `
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Datos del usuari@</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Nombre: ${name} </p>
                    <p>email: ${email} </p>
                </div>
            </div>`

        document.getElementById("divModal").innerHTML = alert1
}