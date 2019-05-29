let dbConnection = null;

function getRoles() {
    return dbConnection.any(
        "SELECT id, title FROM users.role;"
    );
}

const queries = {
    getRoles
};

const queriesClosure = function queriesClosure(dbConn) {
    if (dbConnection === null) {
        dbConnection = dbConn;
    }

    return queries;
};

module.exports = queriesClosure;
