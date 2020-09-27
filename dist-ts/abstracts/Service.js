"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Service = /** @class */ (function () {
    function Service() {
        this.callbacks = new Map();
        this.isInit = false;
    }
    Object.defineProperty(Service.prototype, "props", {
        /**
         * Getter to get the services properties.
         * This getter MUST be implementer by the service extending this class.
         * @return {Object}
         */
        get: function () {
            return {};
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Method to initialize the service behaviors.
     * This method MUST be implemented by the service extending this class.
     *
     * @return {Service} The current instance
     */
    Service.prototype.init = function () {
        throw new Error('The `init` method must be implemented.');
    };
    /**
     * Method to kill the service behaviors.
     * This method MUST be implemented by the service extending this class.
     *
     * @return {Service} The current instance
     */
    Service.prototype.kill = function () {
        throw new Error('The `kill` method must be implemented.');
    };
    /**
     * Add a callback.
     *
     * @param  {String}   key      The callback's identifier
     * @param  {Function} callback The callback function
     * @return {Service}           The current instance
     */
    Service.prototype.add = function (key, callback) {
        if (this.has(key)) {
            throw new Error("A callback with the key `" + key + "` has already been registered.");
        }
        // Initialize the service when we add the first callback
        if (this.callbacks.size === 0 && !this.isInit) {
            this.init();
            this.isInit = true;
        }
        this.callbacks.set(key, callback);
        return this;
    };
    /**
     * Test if a callback with the given key has already been added.
     *
     * @param  {String}  key The identifier to test
     * @return {Boolean}     Whether or not the identifier already exists
     */
    Service.prototype.has = function (key) {
        return this.callbacks.has(key);
    };
    /**
     * Get the callback tied to the given key.
     *
     * @param  {String}   key The identifier to get
     * @return {Function}     The callback function
     */
    Service.prototype.get = function (key) {
        return this.callbacks.get(key);
    };
    /**
     * Remove the callback tied to the given key.
     *
     * @param  {String} key The identifier to remove
     * @return {Service}    The current instance
     */
    Service.prototype.remove = function (key) {
        this.callbacks.delete(key);
        // Kill the service when we remove the last callback
        if (this.callbacks.size === 0 && this.isInit) {
            this.kill();
            this.isInit = false;
        }
        return this;
    };
    /**
     * Trigger each added callback with the given arguments.
     *
     * @param  {Array}   args All the arguments to apply to the callback
     * @return {Service}      The current instance
     */
    Service.prototype.trigger = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.callbacks.forEach(function (callback) {
            callback.apply(void 0, args);
        });
        return this;
    };
    return Service;
}());
exports.default = Service;
//# sourceMappingURL=Service.js.map