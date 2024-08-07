const express = require('express');
const router = express.Router();
const sql = require('mssql');
const sqlConfig = require('../database/connectionSQL');

// Ruta para obtener datos de tb_security
router.get('/security', async (req, res) => {
    try {
        await sql.connect(sqlConfig);
        const result = await sql.query('SELECT * FROM tb_security');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error al conectar o ejecutar la consulta: ' + err);
    } finally {
        await sql.close();
    }
});

//Obtener datos de tb_mascota
router.get('/mascota', async (req, res) => {
    try {
        await sql.connect(sqlConfig);
        const result = await sql.query('SELECT * FROM tb_mascota');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error al obtener datos de la base de datos' +err);
    } finally{
        await sql.close();
    }
});

//Obtener datos de tb_region
router.get('/region', async (req, res)=>{
    try {
        await sql.connect(sqlConfig);
        const result = await sql.query('SELECT * FROM tb_region');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error al obtener datos de la base de datos '+err);
    }finally{
        await sql.close();
    }
});

module.exports = router;
