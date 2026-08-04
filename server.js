import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Importamos el enrutador de usuarios (¡No olvides el .js al final!)
import userRoutes from './routes/userRoutes.js';

// Recreamos __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inicializar Express
const app = express();
const PORT = process.env.PORT || 3000;

// Configurar Pug como motor de vistas
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Configurar la carpeta pública (para CSS, imágenes, JS del navegador)
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares para procesar datos de formularios POST / JSON
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

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo con ES Modules en http://localhost:${PORT}`);
});