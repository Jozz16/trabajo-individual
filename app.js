const express = require("express");
const app = express();
const puerto = 3003;
const hbs = require("hbs");
const path = require("path");
const methodOverRide = require('method-override')
const LocalStorage = require("node-localstorage").LocalStorage;
hbs.registerPartials(__dirname + "/views/partials");

app.set("view engine", "hbs");
app.set("views", "./views");

//midlawares
app.use("/js", express.static("/js"));
app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist")));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverRide("_method", {methods: ["GET","POST"]}))
const localStorage = new LocalStorage("./scratch");

// Registra el helper de hbs
hbs.registerHelper('eq', function(a, b, options) {
  return a === b ? options.fn(this) : options.inverse(this);
});

// Ruta para mostrar la página principal
app.get("/", (req, res) => {
  res.render("index");
});
// Ruta para mostrar la página de búsqueda de productos
app.get("/encuentra", async (req, res) => {
  try {
    const response = await fetch(
      "http://localhost:3002/todas-las-publicaciones"
    );
    const data = await response.text();
    const publicaciones = JSON.parse(data);

    res.render("encuentra", { publicaciones });
  } catch (error) {
    console.error(error);
  }
});
// Ruta para mostrar la página de regalos
app.get("/regala", (req, res) => {
  res.render("regala");
});
app.post("/publicaciones", async (req, res) => {
  const { nombre_producto, titulo, url, descripcion } = req.body;
if(localStorage.getItem('rol') == 'user'){
  try {
    const response = await fetch("http://localhost:3002/publicacion/v1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        nombreProducto: nombre_producto,
        Titulo: titulo,
        url,
        descripcion,
      }),
    });

    if (response.ok) {
      console.log(`La publicación de ${nombre_producto} ha sido creada`);
      res
        .status(201)
        .send(`La publicación de ${nombre_producto} ha sido creada`);
    } else {
      console.error("Error al crear la publicación");
      res.status(500).send("Error al crear la publicación");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
} else {
  res.render('inicio-sesion')
}
  
});
// Ruta para mostrar la página de inicio de sesión
app.get("/iniciar-sesion", (req, res) => {
  res.render("inicio-sesion");
});
// Ruta para procesar la petición de inicio de sesión
app.post("/iniciar-sesion", async (req, res) => {
  const { email, password } = req.body;
  try {
    const response = await fetch("http://localhost:3002/login/v1", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const responseBody = await response.json(); // convierte la respuesta a formato JSON
    const token = responseBody.token;
    const rol = responseBody.rolUser; // accede al token en el cuerpo de la respuesta
    localStorage.setItem("token", token);
    localStorage.setItem("rol", rol);
    
    

    if (localStorage.getItem("rol") === "user") {
      res.render("index");
    } else if (localStorage.getItem("rol") === "admin") {
      res.render("admin"); //aqui va la pagina de admin)
    } else {
      console.error("Error al iniciar sesión");
      res.status(500).send("Error al iniciar sesión");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});
// Ruta para mostrar la página de registro de usuario
app.get("/registrate", (req, res) => {
  res.render("registrate");
});
// Ruta para procesar la petición de registro de usuario
app.post("/registrate", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const response = await fetch("http://localhost:3002/register/v1", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    if (response.ok) {
      console.log(`El usuario ${name} ha sido creado`);
      res.status(201).redirect("/iniciar-sesion")
    } else {
      console.error("Error al crear el usuario");
      res.status(500).send("Error al crear el usuario");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});
// Ruta para mostrar todas las publicaciones
app.get("/tablas-publicaciones", async (req, res) => {
    try {
      const response = await fetch("http://localhost:3002/todas-las-publicaciones/autor");
      const publicaciones = await response.json();
      console.log(publicaciones);
      res.render("tabla-publicaciones", { publicaciones }); // Renderiza la plantilla HBS con los datos de las publicaciones
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  });
// Ruta para mostrar todas las usuarios
  app.get('/usuarios', async (req, res) => {
    try {
      const response = await fetch('http://localhost:3002/usuarios');
      const usuarios = await response.json();
      res.render('tabla-usuarios', { usuarios });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  });
// Ruta para traer un usuario por id
  app.get('/editar-usuario/:id', async (req, res) => {
    try {
      const userId = req.params.id; 
      console.log(userId)
      const response = await fetch(`http://localhost:3002/buscar-usuarios/${userId}`);
      const {usuario, roles} = await response.json();
      
      res.render('formulario-edicion-usuario', { usuario, roles });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  });
// Ruta para editar un usuario por id 
  app.post('/editar-usuario-buscado/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const { name, email, tipoRol } = req.body;
      
      const response = await fetch(`http://localhost:3002/actualizar-usuario-buscado/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, tipoRol })
      });
      
      res.render('tabla-usuarios');
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  });
// Ruta para eliminar un usuario por id 
  app.delete('/eliminar-usuario/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      
      const response = await fetch(`http://localhost:3002/eliminar-usuario/${userId}`, {
        method: 'DELETE',
      });
  
      res.redirect('/usuarios');
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  });
  // Ruta para eliminar una publicacion por id 
  app.delete('/eliminar-publicacion/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      
      const response = await fetch(`http://localhost:3002/eliminar-publicacion/${userId}`, {
        method: 'DELETE',
      });
   
      res.redirect('/tablas-publicaciones');
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  });
// Ruta para manejar las peticiones de cualquier otra página que no existe
app.all("*", (req, res) => {
  res.status(404).send("pagina no existe");
});
//plantilla abajo
app.listen(puerto, () => {
  console.log("servicio levantado");
});
