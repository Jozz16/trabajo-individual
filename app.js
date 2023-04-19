const express = require("express");
const { Pool } = require("pg");

const app = express();
const puerto = 3001;
const hbs = require("hbs");
const path = require("path");
const { METHODS } = require("http");
const { json } = require("sequelize");

hbs.registerPartials(__dirname + "/views/partials");

app.set("view engine", "hbs");
app.set("views", "./views");

//midlawares
app.use("/js", express.static("/js"));
app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist")));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta para mostrar la página principal
app.get("/", (req, res) => {
  res.render("index");
});

// Ruta para mostrar la página de contacto
app.get("/contactanos", (req, res) => {
  res.render("contacto");
});

// Ruta para mostrar la página de búsqueda de productos
app.get("/encuentra", (req, res) => {
  res.render("encuentra");
});

// Ruta para mostrar la página de regalos
app.get("/regala", (req, res) => {
  res.render("regala");
});

app.post("/publicaciones", async (req, res) => {
    const { nombre_producto, titulo, url, descripcion } = req.body;
  
    try {
      const response = await fetch("http://localhost:3002/publicacion/v1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre_producto,
          titulo,
          url,
          descripcion,
        }),
      });
  
      if (response.ok) {
        console.log(`La publicación de ${nombre_producto} ha sido creada`);
        res.status(201).send(`La publicación de ${nombre_producto} ha sido creada`);
      } else {
        console.error("Error al crear la publicación");
        res.status(500).send("Error al crear la publicación");
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
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

    if (response.ok) {
      console.log(`El usuario con email ${email} se ha logueado`);
      res.status(200).send(`El usuario con email ${email} se ha logueado`);
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
      res.status(201).send(`El usuario ${name} ha sido creado`);
    } else {
      console.error("Error al crear el usuario");
      res.status(500).send("Error al crear el usuario");
    }
  } catch (error) {
    console.error(error.message);
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
