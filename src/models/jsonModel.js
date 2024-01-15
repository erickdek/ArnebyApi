/**
 * Clase para representar una respuesta JSON estructurada.
 * @class
 */
class JsonModel {
    /**
     * Crea una instancia de la clase JsonModel.
     * @constructor
     * @param {number} status - El código de estado HTTP de la respuesta.
     * @param {boolean} success - Indica si la operación fue exitosa.
     * @param {string} code - Un código personalizado para la respuesta.
     * @param {string} msg - Un mensaje descriptivo de la respuesta.
     * @param {Object} data - Los datos adicionales de la respuesta.
     * @throws {Error} Lanza un error si los tipos de los parámetros son incorrectos.
     */
    constructor(status, success, code, msg, data) {
        if (typeof status !== 'number' || typeof success !== 'boolean') {
            throw new Error('status debe ser un número y success debe ser un valor booleano (true o false).');
        }

        /**
         * El código de estado HTTP de la respuesta.
         * @member {number}
         */
        this.status = status;

        /**
         * Indica si la operación fue exitosa.
         * @member {boolean}
         */
        this.success = success;

        /**
         * Un código personalizado para la respuesta.
         * @member {string}
         */
        this.code = code;

        /**
         * Un mensaje descriptivo de la respuesta.
         * @member {string}
         */
        this.msg = msg;

        /**
         * Los datos adicionales de la respuesta.
         * @member {Object}
         */
        this.data = data;
    }
}

export default JsonModel;
