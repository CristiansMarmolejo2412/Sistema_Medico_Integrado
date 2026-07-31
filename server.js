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

// ----------------------------------------------------
// RUTAS
// ----------------------------------------------------

// Rutas de autenticación (Login, Registro, Recuperar contraseña)
app.use('/', userRoutes);

// Ruta principal -> Carga el Dashboard Médico (SIGCMI)
app.get('/dashboard', (req, res) => {
  res.render('dashboardMedical', { title: 'Portal Médico - SIGCMI' });
});

// Ruta del panel alternativo (si lo conservas)
app.get('/panel', (req, res) => {
  res.render('panel', { title: 'Panel de Control' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo con ES Modules en http://localhost:${PORT}`);
});