"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Event management class.
 *
 * @method $on    Bind a given function to the given event.
 * @method $off   Unbind the given function from the given event.
 * @method $once  Bind a given function to the given event once.
 * @method $emit  Emit an event with custom props.
 */
var EventManager = /** @class */ (function () {
    function EventManager() {
        /** @type {Object} An object to store the events */
        this._events = {};
    }
    /**
     * Bind a listener function to an event.
     *
     * @param  {String}   event    Name of the event.
     * @param  {String}   listener Function to be called.
     * @return {Function}          A function to unbind the listener.
     */
    EventManager.prototype.$on = function (event, listener) {
        var _this = this;
        if (!Array.isArray(this._events[event])) {
            this._events[event] = [];
        }
        this._events[event].push(listener);
        return function () { return _this.$off(event, listener); };
    };
    /**
     * Unbind a listener function from an event.
     *
     * @param  {String}       event    Name of the event.
     * @param  {String}       listener Function to be removed.
     * @return {EventManager}          The current instance.
     */
    EventManager.prototype.$off = function (event, listener) {
        // If no event specified, we remove them all.
        if (!event) {
            this._events = {};
            return this;
        }
        // If no listener have been specified, we remove all
        // the listeners for the given event.
        if (!listener) {
            this._events[event] = [];
            return this;
        }
        var index = this._events[event].indexOf(listener);
        if (index > -1) {
            this._events[event].splice(index, 1);
        }
        return this;
    };
    /**
     * Emits an event.
     *
     * @param  {String}       event Name of the event.
     * @param  {Array}        args  The arguments to apply to the functions bound to this event.
     * @return {EventManager}       The current instance.
     */
    EventManager.prototype.$emit = function (event) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!Array.isArray(this._events[event])) {
            return this;
        }
        this._events[event].forEach(function (listener) {
            listener.apply(_this, args);
        });
        return this;
    };
    /**
     * Bind a listener function to an event for one execution only.
     *
     * @param  {String}       event    Name of the event.
     * @param  {String}       listener Function to be called.
     * @return {EventManager}          The current instance.
     */
    EventManager.prototype.$once = function (event, listener) {
        var _this = this;
        var handler = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            _this.$off(event, handler);
            listener.apply(_this, args);
        };
        this.$on(event, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return handler.apply(void 0, args);
        });
        return this;
    };
    return EventManager;
}());
exports.default = EventManager;
//# sourceMappingURL=EventManager.js.map