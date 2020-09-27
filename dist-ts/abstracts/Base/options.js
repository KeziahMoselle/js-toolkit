"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setOptions = exports.getOptions = void 0;
var deepmerge_1 = __importDefault(require("deepmerge"));
/**
 * Get a component's options.
 *
 * @param  {Base}        instance The component's instance.
 * @param  {HTMLElement} element  The component's root element.
 * @param  {Object}      config   The component's default config.
 * @return {Object}               The component's merged options.
 */
function getOptions(instance, element, config) {
    var options = {};
    if (element.dataset.options) {
        try {
            options = JSON.parse(element.dataset.options);
        }
        catch (err) {
            throw new Error('Can not parse the `data-options` attribute. Is it a valid JSON string?');
        }
    }
    options = deepmerge_1.default(config, options);
    instance.$emit('get:options', options);
    return options;
}
exports.getOptions = getOptions;
/**
 * Set a component instance options.
 *
 * @param {Base}        instance   The component's instance.
 * @param {HTMLElement} element    The component's root element.
 * @param {Object}      newOptions The new options object.
 */
function setOptions(instance, element, newOptions) {
    var options = {};
    if (element.dataset.options) {
        try {
            options = JSON.parse(element.dataset.options);
        }
        catch (err) {
            throw new Error('Can not parse the `data-options` attribute. Is it a valid JSON string?');
        }
    }
    options = deepmerge_1.default(options, newOptions);
    element.dataset.options = JSON.stringify(options);
}
exports.setOptions = setOptions;
exports.default = {
    getOptions: getOptions,
    setOptions: setOptions,
};
//# sourceMappingURL=options.js.map