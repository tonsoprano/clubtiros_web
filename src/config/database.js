const mysql = require( 'mysql' );
const util = require( 'util' );

let credentials = {
    host: '201.217.243.8',
    user: 'test',
    password: 'wDjmu!bmCn-^0F#7|w82k];xo^)S',
    database: 'test_db',
    port: 3306,
}

module.exports = {
    query: ( sql, args) => {
        const connection = mysql.createConnection(credentials);
        let result = util.promisify( connection.query ).call(connection, sql, args);
        connection.end();
        return result;
    }
}