const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes');
const port = 3001; // Puedes cambiar el puerto si es necesario

app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json()); // Middleware para parsear JSON
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
