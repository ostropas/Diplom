/**
 * @file methodModel.js
 * @brief method class
 */

class MethodModel {
    constructor() {
        this.methodsQueries = {};
    }

    /**
     * Get method
     */
    async getMethod(id) {
        const method = await this.methodsQueries.getMethodMainInfo(id);
        method.additionalInfo = await this.methodsQueries.getMethodAdditionalInfo(id);
        return method;
    }

    /**
     * Find methods
     */
    async findMethods(search) {
        return await this.methodsQueries.searchMethods(search);
    }

    /**
     * Add method
     */
    async addMethod(method) {
        const resultMethod = await this.methodsQueries.addMethodMainInfo(method.title, method.description);
        for (let index = 0; index < method.additionalInfo.length; index++) {
            const element = method.additionalInfo[index];
            await this.methodsQueries.addMethodAdditionalInfo(Number(resultMethod.id), Number(element.typeid), element.data);
        }

        return resultMethod.id;
    }

    /**
     * Remove method
     */
    async deleteMethod(id) {
        return await this.methodsQueries.deleteMethod(id);
    }
}


module.exports = MethodModel;
