const promise = require("bluebird");
const pgPromise = require("pg-promise");

// check exists environment variables
if (!process.env.DB_HOST) { throw new Error("environment DB_HOST not exists"); }
if (!process.env.DB_PORT) { throw new Error("environment DB_PORT not exists"); }
if (!process.env.DB_DATABASE) { throw new Error("environment DB_DATABASE not exists"); }
if (!process.env.DB_USER) { throw new Error("environment DB_USER not exists"); }
if (!process.env.DB_PASSWORD) { throw new Error("environment DB_PASSWORD not exists"); }

const dbConnection = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

const options = {
    promiseLib: promise
};

const pg = pgPromise(options);

const connectionsArray = [];

/**
 * Create connection to data base if not exists
 * Return data base connection
 */
function getConnection(dbName) {
    let connection = connectionsArray.find(m => m.key === dbName);

    if (!connection) {
        connection = { key: dbName, value: pg(dbConnection) };
        connectionsArray.push(connection);
    }

    if (!connection) {
        throw new Error("Doesn't connet to database");
    }

    return connection.value;
}

const DataBase = {
    dbConnection(dbName) {
        return getConnection(dbName);
    }
};

module.exports = DataBase;
