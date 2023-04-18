const express = require('express');
const { Pool } = require('pg');
const { sequelize } = require('./service/connection_db.js');
const app = express();
const puerto = 3000;
const hbs = require('hbs');
const path = require('path');
const bcrypt = require('bcrypt');
const saltRounds = 10;

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.set('views', './views');

//middlewares

const userRouter =require("./routes/user.routes.js")
app.use('/api/usuarios',userRouter)

app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use(express.static(path.join(__dirname, 'public')));

(async () => {
  await sequelize.sync({logging:false});
  console.log('Tabla Publicacion sincronizada');
})();

// rutas

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/contactanos', (req, res) => {
  res.render('contacto');
});

app.get('/encuentra', (req, res) => {
  res.render('encuentra');
});

app.post('/regala', async (req, res) => {
   try {
     const { nombreProducto, titulo, url, descripcion } = req.body;
     const usuario = await Usuario.findByPk(req.user.id);
     const publicacion = await usuario.createPublicacion({ nombreProducto, titulo, url, descripcion });
     res.status(201).send(publicacion);
   } catch (error) {
     console.error(error);
     res.status(500).send('Ha ocurrido un error');
   }
 });
 app.get('/registrate', (req, res) => {
   res.render('registrate');
 });
app.post('/registrate', async (req, res) => {
   // try {
   //   const { nombre, email, password } = req.body;
   //   const hashedPassword = await bcrypt.hash(password, saltRounds);
   //   const usuario = await Usuario.create({ nombre, email, password: hashedPassword });
   //   res.status(201).send(usuario);
   // } catch (error) {
   //   console.error(error);
   //   res.status(500).send('Ha ocurrido un error');
   // }
 });

// middleware para manejar 404
app.use((req, res, next) => {
  res.status(404).send('Página no encontrada');
});

app.listen(puerto, () => {
  console.log('servicio levantado');
});
