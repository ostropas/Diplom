/**
 * @file methodsQueries.js
 * @brief Query method from database
 */

const BaseQuery = require("./baseQuery.js");

class MethodsQueries extends BaseQuery {
  constructor(dbConn) {
    super(dbConn);
    this.tablesInfo = {
      data: BaseQuery.tableData("method_additional_info_data", "methods", [
        "id",
        "type",
        "data",
        "method_id"
      ]),
      method: BaseQuery.tableData("method", "methods", [
        "id",
        "title",
        "description"
      ]),
      type: BaseQuery.tableData("method_additional_info_types", "methods", [
        "id",
        "title"
      ])
    };
  }

  async getMethodMainInfo(id) {
    return this.dbConnection.one(
      "select title, description from $1 where id = $2",
      [this.tablesInfo.method.tableName, id]
    );
  }

  async addMethodMainInfo(title, desc) {
    return this.dbConnection.one(
      "INSERT INTO $1(title, description) VALUES($2, $3) RETURNING id",
      [this.tablesInfo.method.tableName, title, desc]
    );
  }

  async addMethodAdditionalInfo(methodId, typeId, data) {
    return this.dbConnection.none(
      "INSERT INTO $1(type, data, method_id) VALUES($2, $3, $4)",
      [this.tablesInfo.data.tableName, typeId, data, methodId]
    );
  }

  async getMethodAdditionalInfo(id) {
    return this.dbConnection.any(
      'select maid."data", mait.title as type, mait.id as typeId from $1 as maid ' +
        'inner join $2 as mait on mait.id = maid."type" ' +
        "where maid.method_id = $3;",
      [this.tablesInfo.data.tableName, this.tablesInfo.type.tableName, id]
    );
  }

  async searchMethods(searchString) {
    return this.dbConnection.any(
      "select DISTINCT m.id, m.title, m.description " +
        "from $1 as m " +
        "inner join $2 as maid " +
        "on maid.method_id = m.id " +
        "where " +
        `title ilike '%${searchString}%' or ` +
        `description ilike '%${searchString}%' or ` +
        `maid."data" ilike '%${searchString}%' ` +
        "order by m.id;",
      [this.tablesInfo.method.tableName, this.tablesInfo.data.tableName]
    );
  }

  async deleteMethod(id) {
    return this.dbConnection.none("DELETE FROM $1 " + "WHERE id = $2;", [
      this.tablesInfo.method.tableName,
      id
    ]);
  }
}

module.exports = MethodsQueries;
