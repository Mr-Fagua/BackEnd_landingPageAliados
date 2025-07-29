const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('../config/dotenv');
const emailRoutes = require('./routes/emailRoutes');
const { connectToWhatsApp } = require('../services/whatsappService'); // Importar el servicio de WhatsApp

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conectar a WhatsApp
connectToWhatsApp().catch((err) => {
  console.error('Error al conectar con WhatsApp:', err);
});

// Rutas
app.use('/api/cotizar', emailRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
});
