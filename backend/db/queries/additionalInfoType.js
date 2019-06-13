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
        "title",
        "type"
      ])
    };
  }

  async getAllAdditionalInfoTypes() {
    return this.dbConnection.any("SELECT $1:name FROM $2;", [
      this.tablesInfo.type.columns,
      this.tablesInfo.type.tableName
    ]);
  }

  async getAdditionalInfoType(id) {
    return this.dbConnection.any(
      "SELECT $1:name FROM $2 WHERE id = $3",
      [this.tablesInfo.type.columns, this.tablesInfo.type.tableName, id]
    );
  }

  async createNewAdditionalInfoType(info) {
    return this.dbConnection.one(
      "INSERT INTO $1(title, type) VALUES($2, $3) RETURNING id",
      [this.tablesInfo.type.tableName, info.data, Number(info.type)]
    );
  }
}

module.exports = additionalInfoQueries;
