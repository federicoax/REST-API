import express from "express"; 
import morgan from "morgan"; 
import {router} from "./routes.js"; 

const app = express(); // Se crea una instancia de Express llamada app y para ser llamada en el puerto 3000.

app.set('port', 3000);

app.use(morgan('dev')); 
app.use(express.json()); // Se habilita el análisis de datos JSON
app.use(router); // Se usa para manejar las solicitudes entrantes

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
}) 

// En esta parte del código inicializa el servidor Express y muestra en la consola el puerto en el que está ejecutando