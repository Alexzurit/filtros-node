const sql = require('mssql');
const sqlConfig = require('./connectionSQL');

const connection = async () => {
    try {
        // Conectar a la base de datos
        await sql.connect(sqlConfig);
        console.log('Conexión establecida con SQL Server.');

        // Ejecutar una consulta
        const result = await sql.query('SELECT * FROM tb_mascota');
        console.log(result);
    } catch (err) {
        console.error('Error al conectar o ejecutar la consulta:', err);
    } finally {
        // Cerrar la conexión
        await sql.close();
    }
};

// Llamar a la función de conexión
connection();
