//const sql = require('mssql');
const sqlConfig = {
    user: 'sa',
    password: '123',
    database: 'bd_flamas',
    server: 'localhost',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        trustServerCertificate: true, // Cambia esto según sea necesario
        encrypt: true, // Si estás usando Azure, mantén esto en true
    }
};

module.exports = sqlConfig;
