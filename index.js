'use strict';

const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 3789;
var http = require('http');
var https = require('https');
var fs = require('fs');

var ssl = {
    key: fs.readFileSync('/etc/letsencrypt/live/pablo384.com-0001/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/pablo384.com-0001/fullchain.pem'),
    ca: fs.readFileSync('/etc/letsencrypt/live/pablo384.com-0001/chain.pem')
}
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/zoo', {useMongoClient: true})
    .then(() => {
        console.log('la conexion a la base de datos esta correcta...');
        app.listen(port,() => {
            console.log('Servidor local con NOde y express Corre correctamente...');
        });
        // http.createServer(app).listen(port);
        https.createServer(ssl, app).listen(process.env.PORT || 3443);

    })
    .catch(err => console.log(err));