/**
 * @file users.js
 * @brief Query users from database
 */

const bcrypt = require("bcryptjs");
const BaseQuery = require("./baseQuery.js");

class usersQueries extends BaseQuery {
    constructor(dbConn) {
        super(dbConn);
        this.tablesInfo = {
            userDataItem: BaseQuery.tableData("user", "users", ["id", "username", "password", "role"])
        };
    }

    async userById(id) {
        return this.dbConnection.any(
            "SELECT id, username, password, role " +
            "FROM $1 " +
            "WHERE id = $2;",
            [this.tablesInfo.userDataItem.tableName, id]
        );
    }

    userByUsername(username) {
        return this.dbConnection.one(
            "SELECT id, username, password, role " +
            "FROM $1 " +
            "WHERE username = $2;",
            [this.tablesInfo.userDataItem.tableName, username]
        ).catch((e) => {
            console.log(e);            
        });
    }

    addUser(user) {
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(user.password, salt);
        const defaultRole = 5;

        const role = user.role || defaultRole;
        return this.dbConnection.one(
            "INSERT INTO $1(username, password, role) " +
            "VALUES($2, $3, $4) " +
            "RETURNING id, username, password, role;",
            [this.tablesInfo.userDataItem.tableName, user.username, hash, role]
        );
    }
}

module.exports = usersQueries;
