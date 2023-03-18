const express = require('express')
const app = express()
const puerto=3000;
const hbs = require('hbs')
const path = require('path');

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs')
app.set('views', './views')
app.use('/js', express.static('/js'))
app.use(express.static( path.join(__dirname , '/node_modules/bootstrap/dist')))
app.use(express.static( path.join(__dirname , 'public')))




app.get("/",(req,res)=>{
   
   res.render("index")

});


// plantilla abajo
app.all("*",(req,res)=>{
    res.status(404).send("pagina no existe")
})
//plantilla abajo
app.listen(puerto,()=>{
    console.log("servicio levantado")
})








