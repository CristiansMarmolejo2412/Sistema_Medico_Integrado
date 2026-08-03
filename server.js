// 1. Importar los módulos necesarios
const express = require('express');
const path = require('path');

// 2. Inicializar la aplicación Express
const app = express();
const PORT = 3000;

// 3. Configurar Pug como motor de vistas
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 4. Configurar la carpeta pública (para CSS, imágenes, JS del navegador)
app.use(express.static(path.join(__dirname, 'public')));

// (Opcional por ahora) Middleware para entender datos de formularios POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 5. Crear las rutas básicas

// Ruta para la página principal
app.get('/', (req, res) => {
  res.render('dashboardMedical', { title: 'Inicio - Sistema Médico' });
});

// Ruta para el login
app.get('/login', (req, res) => {
  res.render('login', { title: 'Iniciar Sesión' });
});

//Ruta para register
app.get('/registro', (req, res) => {
  res.render('register', { title: 'Registro' });
});

// Ruta para el panel (dashboard)
app.get('/panel', (req, res) => {
  res.render('panel', { title: 'Panel de Control' });
});

// 6. Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});