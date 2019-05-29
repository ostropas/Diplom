/**
 * @file src/commonFuncs/regexFuncs.js
 * @brief Help function for regular expression
 */

/**
 * Filter and replace source object params
 * @param {Object} sourceObject source object
 * @param {RegExp} regex filter regular expression
 * @return {Object} new object with filtered and replaced parameters names
 */
function regexParamObject(sourceObject, regex) {
    const resultObject = {};
    const filteredKeys = Object.keys(sourceObject).filter(m => regex.test(m));
    filteredKeys.forEach((k) => {
        resultObject[k.replace(regex, "")] = sourceObject[k];
    });

    return resultObject;
}

/**
 * Remove properties like regex
 * @param {Object} sourceObject source object
 * @param {RegExp} regex filter regular expression
 * @return {Object} new object without properties by regex
 */
function regexRemoveProperties(sourceObject, regex) {
    const resultObject = JSON.parse(JSON.stringify(sourceObject));
    const filteredKeys = Object.keys(sourceObject).filter(m => regex.test(m));

    filteredKeys.forEach((k) => {
        delete resultObject[k];
    });

    return resultObject;
}

function regexSeparateObjectToArray(rewardData, regex) {
    const resultArray = [];

    Object.keys(rewardData).forEach((k) => {
        const r = regex.exec(k);
        if (r) {
            const paramName = r[1];
            const index = +r[2];

            let el = resultArray[index];
            if (!el) {
                el = { };
            }
            el[paramName] = rewardData[k];
            resultArray[index] = el;
        }
    });

    return resultArray;
}

function regexSeparateDataArrayToObject(rewardData, regex) {
    const result = {};

    Object.keys(rewardData).forEach((k) => {
        const r = regex.exec(k);
        const paramName = r[1];

        result[paramName] = rewardData[k];
    });

    return result;
}

/**
 * Convert object to array of objects
 */
function arrayOfParametersToObjectArray(objectArray) {
    const result = [];
    for (let k = 0; k < objectArray.length; k += 1) {
        const rewardParametersArray = objectArray[k];

        const tmpKeys = Object.keys(rewardParametersArray);

        for (let j = 0; j < tmpKeys.length; j += 1) {
            const tmpKey = tmpKeys[j];

            const paramArray = rewardParametersArray[tmpKey];

            for (let i = 0; i < paramArray.length; i += 1) {
                if (!result[i]) {
                    result[i] = { };
                }
                result[i][tmpKey] = paramArray[i];
            }
        }
    }
    return result;
}

module.exports = {
    regexParamObject,
    regexRemoveProperties,
    regexSeparateObjectToArray,
    regexSeparateDataArrayToObject,
    arrayOfParametersToObjectArray
};
