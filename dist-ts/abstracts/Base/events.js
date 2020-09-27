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
var getAllProperties_1 = __importDefault(require("../../utils/object/getAllProperties"));
var utils_1 = require("./utils");
/**
 * Bind event handler methods to the root HTML element.
 *
 * @param  {Base}  instance     A Base instance.
 * @param  {Array} eventMethods A list of methods to bind.
 * @return {Array}              A list of unbind functions.
 */
function bindRootEvents(instance, eventMethods) {
    return eventMethods.map(function (eventMethod) {
        var eventName = eventMethod.replace(/^on/, '').toLowerCase();
        var handler = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            utils_1.debug.apply(void 0, __spreadArrays([instance, eventMethod, instance.$el], args));
            instance[eventMethod].apply(instance, args);
        };
        instance.$el.addEventListener(eventName, handler);
        return function () {
            instance.$el.removeEventListener(eventName, handler);
        };
    });
}
/**
 * Test if a ref is an HTMLElement or a Base class.
 * @param  {BaseElement | BaseInterface} ref The ref to check.
 * @return {boolean}                         Returns true if ref is a Base instance.
 */
function isBase(ref) {
    return ref.$isMounted !== undefined;
}
/**
 * Bind event handler methods to refs HTML element.
 *
 * @param  {Base}  instance     A Base instance.
 * @param  {Array} eventMethods A list of methods to bind.
 * @return {Array}              A list of unbind functions.
 */
function bindRefsEvents(instance, eventMethods) {
    var unbindMethods = [];
    Object.entries(instance.$refs).forEach(function (_a) {
        var refName = _a[0], $refOrRefs = _a[1];
        var $refs = Array.isArray($refOrRefs) ? $refOrRefs : [$refOrRefs];
        var refEventMethod = "on" + refName.replace(/^\w/, function (c) { return c.toUpperCase(); });
        eventMethods
            .filter(function (eventMethod) { return eventMethod.startsWith(refEventMethod); })
            .forEach(function (eventMethod) {
            $refs.forEach(function ($ref, index) {
                var eventName = eventMethod.replace(refEventMethod, '').toLowerCase();
                var handler = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    utils_1.debug.apply(void 0, __spreadArrays([instance, eventMethod, $ref], args, [index]));
                    instance[eventMethod].apply(instance, __spreadArrays(args, [index]));
                };
                utils_1.debug(instance, 'binding ref event', refName, eventName);
                // eslint-disable-next-line no-param-reassign
                $ref = isBase($ref) ? $ref.$el : $ref;
                $ref.addEventListener(eventName, handler);
                var unbindMethod = function () {
                    utils_1.debug(instance, 'unbinding ref event', eventMethods);
                    (isBase($ref) ? $ref.$el : $ref).removeEventListener(eventName, handler);
                };
                unbindMethods.push(unbindMethod);
            });
        });
    });
    return unbindMethods;
}
/**
 * Bind event handler methods to children Base instance.
 * @param  {Base}  instance     A Base instance.
 * @param  {Array} eventMethods A list of methods to bind.
 * @return {Array}              A list of unbind functions.
 */
function bindChildrenEvents(instance, eventMethods) {
    var unbindMethods = [];
    Object.entries(instance.$children).forEach(function (_a) {
        var childName = _a[0], $children = _a[1];
        var childEventMethod = "on" + childName.replace(/^\w/, function (c) { return c.toUpperCase(); });
        eventMethods
            .filter(function (eventMethod) { return eventMethod.startsWith(childEventMethod); })
            .forEach(function (eventMethod) {
            $children.forEach(function ($child, index) {
                var eventName = eventMethod.replace(childEventMethod, '').toLowerCase();
                var handler = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    utils_1.debug.apply(void 0, __spreadArrays([instance, eventMethod, $child], args, [index]));
                    instance[eventMethod].apply(instance, __spreadArrays(args, [index]));
                };
                utils_1.debug(instance, 'binding child event', childName, eventName);
                var unbindMethod = $child.$on(eventName, handler);
                unbindMethods.push(function () {
                    utils_1.debug(instance, 'unbinding child event', childName, eventName);
                    unbindMethod();
                });
            });
        });
    });
    return unbindMethods;
}
/**
 * Bind ref and children component's events to their corresponding method.
 *
 * @param  {Base} instance  A Base instance.
 * @return {Array}          A list of methods to unbind the events.
 */
function bindEvents(instance) {
    var ROOT_EVENT_REGEX = /^on[A-Z][a-z]+$/;
    var REFS_CHILDREN_EVENT_REGEX = /^on([A-Z][a-z]+)([A-Z][a-z]+)+$/;
    // Get all event methods
    var start = { root: [], refsOrChildren: [] };
    var eventMethods = getAllProperties_1.default(instance).reduce(function (acc, _a) {
        var name = _a[0];
        // Testing camelCase with one word: onEvent.
        if (ROOT_EVENT_REGEX.test(name)) {
            acc.root.push(name);
            return acc;
        }
        // Testing camelCase with more than two words: onRefEvent.
        if (REFS_CHILDREN_EVENT_REGEX.test(name)) {
            acc.refsOrChildren.push(name);
        }
        return acc;
    }, start);
    var unbindMethods = __spreadArrays(bindRootEvents(instance, eventMethods.root), bindRefsEvents(instance, eventMethods.refsOrChildren), bindChildrenEvents(instance, eventMethods.refsOrChildren));
    return unbindMethods;
}
exports.default = bindEvents;
//# sourceMappingURL=events.js.map