/**
 * @file additionalInfo.js
 * @brief Query method additionalIfno from database
 */

const BaseQuery = require("./baseQuery.js");

class additionalInfoQueries extends BaseQuery {
  constructor(dbConn) {
    super(dbConn);
    this.tablesInfo = {
      type: BaseQuery.tableData("method_additional_info_types", "methods", [
        "id",
        "title"
      ])
    };
  }

  async getAllAdditionalInfoTypes() {
    return this.dbConnection.any("SELECT $1:name " + "FROM $2;", [
      this.tablesInfo.type.columns,
      this.tablesInfo.type.tableName
    ]);
  }

  async getAdditionalInfoType(id) {
    return this.dbConnection.any(
      "SELECT $1:name " + "FROM $2 " + "WHERE id = $3",
      [this.tablesInfo.type.columns, this.tablesInfo.type.tableName, id]
    );
  }

  async createNewAdditionalInfoType(title) {
    return this.dbConnection.one(
      "INSERT INTO $1(title) VALUES($2) RETURNING id",
      [this.tablesInfo.type.tableName, title]
    );
  }
}

module.exports = additionalInfoQueries;
