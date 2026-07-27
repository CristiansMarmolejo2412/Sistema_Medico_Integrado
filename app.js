const express = require('express');
const path = require('path');

const app = express();

// Motor de vistas
app.set('view engine', 'pug');

// Carpeta de vistas
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal
app.get('/', (req, res) => {
    res.render('dashboardMedical');
});

app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});