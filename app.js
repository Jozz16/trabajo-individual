const express = require('express')
const { Pool } = require("pg")

const app = express()
const puerto=3001;
const hbs = require('hbs')
const path = require('path');
const { METHODS } = require('http');
const { json } = require('sequelize');

hbs.registerPartials( __dirname + '/views/partials')

app.set('view engine', 'hbs')
app.set('views', './views')

//midlawares
app.use('/js', express.static('/js'))
app.use(express.static( path.join( __dirname , 'node_modules/bootstrap/dist')))
app.use(express.static( path.join( __dirname , 'public')))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static
app.get("/",(req,res)=>{
   res.render("index")
});
app.get("/contactanos",(req,res)=>{
   res.render("contacto")
});
app.get("/encuentra",(req,res)=>{
   res.render("encuentra")
});
app.get("/regala",(req,res)=>{
   res.render("regala")
});
app.get("/registrate",(req,res)=>{

   res.render("registrate")
});
app.post("/registrate", async (req,res)=>{

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

// plantilla abajo
app.all("*",(req,res)=>{
    res.status(404).send("pagina no existe")
})
//plantilla abajo
app.listen(puerto,()=>{
    console.log("servicio levantado")
})








