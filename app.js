'use strict';
const express = require('express');
const bodyParse= require('body-parser');
const path = require('path')
const app=express();
const rendertron = require('rendertron-middleware');

//cargar rutas
const user_routes = require('./routes/user');
const animal_routes = require('./routes/animal');



//middleware de body-parser
//render
app.use(rendertron.makeMiddleware({
  proxyUrl: 'https://render-tron.appspot.com/render',
}));


app.use(bodyParse.urlencoded({extended:false}));
app.use(bodyParse.json());

//configurar cabeceras y cors
app.use((req, res, next)=>{
   res.header('Access-Control-Allow-Origin','*');
   res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
   res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');
   next();
});


//rutas base
app.use('/',express.static('client',{redirect:false})); //cargando archivos staticos en carpeta
app.use('/api',user_routes);
app.use('/api',animal_routes);

//cargando rutas que no estan configuradas
app.get('*',function(req, res, next){
    res.sendFile(path.resolve('client/index.html'));
});

// Read the link below about express behind a proxy
app.set('trust proxy', true);
app.set('trust proxy', 'loopback');



module.exports= app;