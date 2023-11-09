import { Router } from "express"; 
import { libro } from "./controller.js"; 

export const router = Router(); // Crea una instancia de Router y se le asigna a la variable "router".

//Las diferentes rutas http, para que llame a los metodos adecuados para cada ruta en el objeto libro y asi obtenga un resultado 
router.get('/libros', libro.getAll); 
router.post('/libros', libro.add); 
router.delete('/libros/:id', libro.deleteId); 
router.delete('/libros/:ISBN', libro.deleteISBN); 
router.put('/libros/:id', libro.update); 
router.get('/libros/:id', libro.getOne); 