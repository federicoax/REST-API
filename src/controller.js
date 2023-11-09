import { pool } from "./database.js"; // Importa el objeto 'pool' de 'database.js'

class LibroController {
    async getAll(req, res) {
        try {
        
            const [result] = await pool.query('SELECT * FROM libros'); // hace la consulta y selecciona todos los libros en la base de datos.
            
            if (result.length === 0) {
                // Si no se encuentran libros en la base de datos, muestra un mensaje sin errores pero vacío.
                return res.json({ message: 'No se encontraron libros.' });
            }
    
            res.json(result); // Responde con los resultados de la consulta en formato JSON.
        } catch (error) {
            // Si tiene un error, registra y responde con un error 500
            console.error(error); 
            res.status(500).json({ error: 'Error al obtener todos los libros' }); // Muestra un mensaje de error, con el numero 500 que significa que hubo un error en el servidor.
        }
    }    

    async getOne(req, res) {
        try {
            const libroId = req.params.id; 
            // Intenta obtener un libro por su ID.
            const [result] = await pool.query('SELECT * FROM libros WHERE id = ?', [libroId]); 

            if (result.length === 0) {
                // Al no encontrarse el ID del libro, devuelve un error.
                return res.status(404).json({ error: 'Libro no encontrado' }); 
            }

            res.json(result[0]); // Responde con el libro encontrado en formato JSON.
        } catch (error) {
            // En el caso de tener un error, muestra el error 500
            console.error(error); 
            res.status(500).json({ error: 'Error al obtener un libro' }); 
        }
    }

    async add(req, res) {
        try {
            const libro = req.body;
    
            // Verifica si el campo 'nombre' está presente y no es nulo
            if (!libro.nombre || libro.nombre.trim() === '') {
                return res.status(400).json({ error: 'El campo "nombre" es obligatorio y no puede estar vacío' });
            }
    
            // Si el campo 'nombre' es válido, procede con la inserción en la base de datos
            const [result] = await pool.query(
                "INSERT INTO libros(nombre, autor, categoria, añoPublicacion, ISBN) VALUES (?, ?, ?, ?, ?)",
                [libro.nombre, libro.autor, libro.categoria, libro.añoPublicacion, libro.ISBN]
            );
    
            res.json({ "Id insertado": result.insertId });
        } catch (error) {
            // Registra el error y responde con un error 500
            console.error(error);
            res.status(500).json({ error: 'Error al agregar un libro' });
        }
    }

    async deleteId(req, res) {
        try {
            const libro = req.body;

            // Intenta eliminar un libro por su ID
            const [result] = await pool.query("DELETE FROM libros WHERE id=?", [libro.id]);
            res.json({ "Registros eliminados": result.affectedRows });
        
        } catch (error) {
            // En caso de un error, registra el error y responde con un error 500
            console.error(error);
            res.status(500).json({ error: 'Error al querer eliminar un libro por el ID' });
        }
    }

    async deleteISBN(req, res) {
        try {
            const libro = req.body;
       
            // Intenta eliminar un libro por su ISBN
            const [result] = await pool.query("DELETE FROM libros WHERE ISBN=?", [libro.ISBN]);
            res.json({ "Registros eliminados": result.affectedRows });
       
        } catch (error) {
            // En caso de un error, registra el error y responde con un error 500
            console.error(error);
            res.status(500).json({ error: 'Error al querer eliminar el libro por ISBN' });
        }
    }

    async update(req, res) {
        try {
            const libro = req.body;
       
            // Intenta actualizar un libro en la base de datos
            const [result] = await pool.query(
                "UPDATE libros SET nombre=?, autor=?, categoria=?, añoPublicacion=?, ISBN=? WHERE id=?",
                [libro.nombre, libro.autor, libro.categoria, libro.añoPublicacion, libro.ISBN, libro.id]
            );
            res.json({ "Registros actualizados": result.changedRows });
       
        } catch (error) {
            // En caso de haber un error, registra el error y muestra el codigo 500 (error en el servidor)
            console.error(error);
            res.status(500).json({ error: 'Error al querer actualizar un libro' });
        }
    }
}

export const libro = new LibroController(); // A la clase LibroController lo exporta como 'libro'