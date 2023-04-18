const pgtools = require('pgtools');

const config = {
    user: 'postgres',
    password: '1234',
    port: 5432,
    host: 'localhost'
};

const databaseName = 'teloregaloDB';

pgtools.createdb(config, databaseName, function (err, res) {
    if (err) {
        console.error(err);
        process.exit(-1);
    }
    console.log(`La base de datos "${databaseName}" ha sido creada exitosamente`);
});
