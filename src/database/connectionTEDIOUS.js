var Connection = require('tedious').Connection;
//var Request = require('tedious').Request;
//var TYPES = require('tedious').TYPES;

var config ={
    server: 'localhost',
    authentication: {
        type: 'default',
        options: {
            userName: 'sa',
            password: '123'
        },

    },
    options:{
        trustServerCertificate: true,
        database: 'bd_flamas'
    }
}

var connection = new Connection(config);

connection.on('connect', function(err){
    if (err) {
        console.log(err);
    } else {
        console.log('Conectado ctmre')
    }
});

connection.connect()


