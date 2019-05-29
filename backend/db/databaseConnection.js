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

const connection = {
    value: pg(dbConnection)
}

const DataBase = {
    dbConnection() {
        return connection.value;
    }
};

module.exports = DataBase;
