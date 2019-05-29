/**
 * @file baseClass.js
 * @brief query base class
 */

const pgp = require("pg-promise")();

class BaseQuery {
    constructor(dbConn) {
        this.dbConnection = dbConn;
    }

    static tableData(tableName, schemaName, columnsNames) {
        return {
            tableName: new pgp.helpers.TableName(tableName, schemaName),
            columns: columnsNames
        };
    }
}


module.exports = BaseQuery;
