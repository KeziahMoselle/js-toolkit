"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Base_1 = __importDefault(require("../../abstracts/Base"));
var AccordionItem_1 = __importDefault(require("./AccordionItem"));
/**
 * Accordion class.
 */
var Accordion = /** @class */ (function (_super) {
    __extends(Accordion, _super);
    function Accordion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Accordion.prototype, "config", {
        /**
         * Accordion config.
         * @return {Object}
         */
        get: function () {
            return {
                name: 'Accordion',
                autoclose: true,
                item: null,
                components: {
                    AccordionItem: AccordionItem_1.default,
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Init autoclose behavior on mounted.
     * @return {void}
     */
    Accordion.prototype.mounted = function () {
        var _this = this;
        this.unbindMethods = this.$children.AccordionItem.map(function (item, index) {
            var unbindOpen = item.$on('open', function () {
                _this.$emit('open', item, index);
                if (_this.$options.autoclose) {
                    _this.$children.AccordionItem.filter(function (el, i) { return index !== i; }).forEach(function (it) { return it.close(); });
                }
            });
            var unbindClose = item.$on('close', function () {
                _this.$emit('close', item, index);
            });
            return function () {
                unbindOpen();
                unbindClose();
            };
        });
    };
    /**
     * Destroy autoclose behavior on destroyed.
     * @return {void}
     */
    Accordion.prototype.destroyed = function () {
        this.unbindMethods.forEach(function (unbind) { return unbind(); });
    };
    return Accordion;
}(Base_1.default));
exports.default = Accordion;
//# sourceMappingURL=index.js.map