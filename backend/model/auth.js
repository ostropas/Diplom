const jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens
const config = require("../config"); // get our config file
const db = require("../db/databaseConnection");
const UsersQueries = require("../db/queries/users");

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

async function getUser(token) {
    const id = await verifyToken(token);
    const usersModel = new UsersQueries(db.dbConnection());
    const user = await usersModel.userById(id);

    if (user.length === 0) {
        // eslint-disable-next-line no-throw-literal
        throw ({ message: "Wrong username of password" });
    }

    return { id, username: user[0].username, connection: db.dbConnection() };
}

module.exports = { getUser };
