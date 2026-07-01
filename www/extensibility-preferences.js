var exec = require('cordova/exec');

function parseBoolean(value, defaultValue) {
    if (value === null || value === undefined) {
        return defaultValue === true;
    }
    if (typeof value === 'boolean') {
        return value;
    }
    return value === 'true' || value === '1';
}

module.exports = {
    /**
     * Batch-read multiple preferences in one native round-trip.
     * @param {string[]} keys - Preference names to read
     * @param {function(Object)} success - Receives { "KeyName": "value", ... }
     * @param {function(string)} error
     */
    get: function (keys, success, error) {
        exec(success, error, 'ExtensibilityPreferences', 'get', [keys]);
    },

    /**
     * Read a single preference as a string (null if missing).
     * @param {string} key
     * @param {function(string|null)} success
     * @param {function(string)} error
     */
    getString: function (key, success, error) {
        exec(success, error, 'ExtensibilityPreferences', 'getString', [key]);
    },

    /**
     * Read a single preference as a boolean.
     * @param {string} key
     * @param {boolean} defaultValue - Returned when the preference is missing
     * @param {function(boolean)} success
     * @param {function(string)} error
     */
    getBoolean: function (key, defaultValue, success, error) {
        this.getString(key, function (value) {
            success(parseBoolean(value, defaultValue));
        }, error);
    }
};
