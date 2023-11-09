import mysqlConnection from 'mysql2/promise'; // Importa el módulo 'mysql2/promise' para interactuar con la base de datos 
// propiedades necesarias
const properties = {
    host: 'localhost', 
    user: 'root', 
    password: '', 
    database: 'axony_f' 
};

export const pool = mysqlConnection.createPool(properties); // Crea una agrupacion de conexiones (pool) a la base de datos utilizando 'properties' y lo almacena en su respectiva variable.