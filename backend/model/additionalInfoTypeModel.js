/**
 * @file additionalInfoTypeModel.js
 * @brief additional info type models class
 */

class AdditionalInfoTypeModel {
    constructor() {
        this.additionalInfoQueries = {};
    }

    /**
     * List of all icons
     */
    async allTypes() {
        return this.additionalInfoQueries.getAllAdditionalInfoTypes();
    }

    /**
     * Get type
     */
    async getType(id) {
        return this.additionalInfoQueries.getAdditionalInfoType(id);
    }

    /**
     * Add type
     */
    async addType(title) {
        return this.additionalInfoQueries.createNewAdditionalInfoType(title);
    }
}


module.exports = AdditionalInfoTypeModel;
