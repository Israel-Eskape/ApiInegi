const express = require('express');
const app = express()
const cors = require('cors');
const dbService = require('./inegidb');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.get('/', (req, res) => {
    res.send("Bievenido a mi aplicación")
})

app.get('/search/:field/:name', (request, response) => {
    const { name, field } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.searchByName(name, field);

    result.then(data => response.json(data))
        .catch(err => console.log(err));
})

app.listen(8000, function () {
    console.log('Aplicación escuchando el puerto 8000!');
});

