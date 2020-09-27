"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pointer_1 = __importDefault(require("../../services/pointer"));
var raf_1 = __importDefault(require("../../services/raf"));
var resize_1 = __importDefault(require("../../services/resize"));
var scroll_1 = __importDefault(require("../../services/scroll"));
var key_1 = __importDefault(require("../../services/key"));
var utils_1 = require("./utils");
/**
 * Init the given service and bind it to the given instance.
 *
 * @param  {Base}     instance The Base instance.
 * @param  {String}   method   The instance to test for binding
 * @param  {Function} service  The service `use...` function
 * @return {Function}          A function to unbind the service
 */
function initService(instance, method, service) {
    if (!utils_1.hasMethod(instance, method)) {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        return function () { };
    }
    var _a = service(), add = _a.add, remove = _a.remove;
    add(instance.$id, function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        utils_1.callMethod.apply(void 0, __spreadArrays([instance, method], args));
    });
    return function () { return remove(instance.$id); };
}
/**
 * Use the services.
 * @param  {Base} instance A Base class instance.
 * @return {Array}         A list of unbind methods.
 */
function bindServices(instance) {
    var unbindMethods = [
        initService(instance, 'scrolled', scroll_1.default),
        initService(instance, 'resized', resize_1.default),
        initService(instance, 'ticked', raf_1.default),
        initService(instance, 'moved', pointer_1.default),
        initService(instance, 'keyed', key_1.default),
    ];
    // Fire the `loaded` method on window load
    // @todo remove this? or move it elsewhere?
    if (utils_1.hasMethod(instance, 'loaded')) {
        var loadedHandler_1 = function (event) {
            utils_1.callMethod(instance, 'loaded', { event: event });
        };
        window.addEventListener('load', loadedHandler_1);
        unbindMethods.push(function () {
            window.removeEventListener('load', loadedHandler_1);
        });
    }
    return unbindMethods;
}
exports.default = bindServices;
//# sourceMappingURL=services.js.map