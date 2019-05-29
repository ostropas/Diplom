const jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens
const config = require("../config"); // get our config file
const db = require("../db/databaseConnection");
const UsersQueries = require("../db/queries/users");
const DBNameQueries = require("../db/queries/dbNames");

const DBNameModel = new DBNameQueries(db.dbConnection("users"));

const TABLE_NAME_ADMIN_PANEL = "users";

async function verifyToken(token) {
    try {
        if (!token) {
            return -1;
        }

        const verifiedJwt = await jwt.verify(token, config.secret);
        return verifiedJwt.id;
    } catch (err) {
        return -1;
    }
}

async function getConnectionByRole(role) {
    const roles = await DBNameModel.getRoles();
    const dbName = roles.find(m => m.id === role);
    return db.dbConnection(dbName.title);
}

async function getUser(token) {
    const id = await verifyToken(token);
    const usersModel = new UsersQueries(db.dbConnection(TABLE_NAME_ADMIN_PANEL));
    let user = undefined;
    if (id !== -1) {
        user = await usersModel.userById(id);
    }
    
    if (!user && user.length === 0) {
        // eslint-disable-next-line no-throw-literal
        throw ({ message: "Wrong username of password" });
    }

    return { id, username: user[0].username, role: user[0].role };
}

module.exports = { getUser, getConnectionByRole };
