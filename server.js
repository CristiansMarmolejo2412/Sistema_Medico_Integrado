import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './config/db.js';
import userRoutes from './routes/userRoutes.js';

// Recrear __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inicializar Express
const app = express();
const PORT = process.env.PORT || 3000;

// Configurar Pug como motor de vistas
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Carpeta pública
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares para lectura de datos (Forms / JSON)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Definición de Rutas Directas
app.get('/', (req, res) => {
  res.render('auth/login', { title: 'Inicio - Sistema Médico' });
});

app.get('/dashboard', (req, res) => {
  res.render('viewsMedico/dashboardMedical', { title: 'Dashboard - Sistema Médico' });
});

app.get('/login', (req, res) => {
  res.render('auth/login', { title: 'Iniciar Sesión' });
});

app.get('/registro', (req, res) => {
  res.render('auth/register', { title: 'Crear Cuenta' });
});

app.get('/recover-password', (req, res) => {
  res.render('auth/recover-password', { title: 'Recuperar Contraseña' });
});

app.post('/login', (req, res) => {
  // Nota: Aquí posteriormente irá la lógica de autenticación (JWT/Sessions)
  res.redirect('/dashboard');
});

// Usar el enrutador modularizado si manejas subrutas en userRoutes
app.use('/users', userRoutes);

// Conexión a la BD e inicio del servidor
const startServer = async () => {
  try {
    await db.authenticate();
    await db.sync(); // Sincroniza modelos con MySQL
    console.log('✅ Conexión exitosa a MySQL mediante Sequelize');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor listo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos:', error);
    process.exit(1);
  }
};

startServer();