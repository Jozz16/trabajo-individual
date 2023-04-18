const {Router} = require('express');
const router = Router();
const { User } = require('../service/connection_db')
// router.get('/:email', (req, res) => {
// //   res.send('si')
// });

router.get('/', async (req, res) => {
    try {
        
      const users = await users.findAll(); // Busca todos los usuarios
      res.json(users, "holas"); // Devuelve los usuarios como respuesta en formato JSON
    } catch (error) {
      console.log(error);
      res.status(500).json({ mensaje: 'Error al buscar los usuarios.' });
    }
  });


  router.post('/', async (req, res) => {
    try {
      const { name, email, password } = req.body; // Obtiene los datos del usuario del cuerpo de la solicitud HTTP.
      const newUser = await User.create({ name, email, password }); // Crea un nuevo objeto de usuario y lo guarda en la base de datos.
      res.json(newUser); // Devuelve el nuevo usuario como respuesta en formato JSON.
    } catch (error) {
      console.log(error);
      res.status(500).json({ mensaje: 'Error al crear el usuario.' });
    }
  });

// router.put('/:id', (req, res) => {

// });

// router.delete('/:id', (req, res) => {

// });

module.exports = router;
