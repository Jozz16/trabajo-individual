


const nav = `
<nav class="navbar navbar-expand-lg ">
<div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03"
        aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="container collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul class="navbar-nav me-auto">
            <li class="nav-item">
                <a class="nav-link" aria-current="page" href="regala.html">Regala</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="encuentra.html">Encuentra</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="contacto.html">Contactanos</a>
            </li>
        </ul>
        
            
            <div class="col-4 col-md-1">
                <a href="#">
                    <button class="btn btn-outline-dark boton-user-name" type="button" data-toggle="tooltip"
                        data-placement="bottom" title="Ingresa"><i
                            class="fa-solid fa-person-walking-arrow-right text-white"></i></button>
                </a>
            </div>
    
            <div class="col-4 col-md-2">
                <a href="registrate.html">
                    <button class="btn btn-outline-dark boton-user-name " type="button" data-toggle="tooltip"
                        data-placement="bottom" title="Registrate"><i class="fa-solid fa-person-circle-plus text-white"></i></button>
                </a>
            </div>
        
    </div>
</div>
</nav>`;

document.getElementById("divNav").innerHTML = nav;