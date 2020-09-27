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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Service_1 = __importDefault(require("../abstracts/Service"));
var keyCodes_1 = __importDefault(require("../utils/keyCodes"));
var autoBind_1 = __importDefault(require("../utils/object/autoBind"));
// eslint-disable-next-line no-shadow
var KeyServiceDirection;
(function (KeyServiceDirection) {
    KeyServiceDirection["Up"] = "up";
    KeyServiceDirection["Down"] = "down";
    KeyServiceDirection["None"] = "none";
})(KeyServiceDirection || (KeyServiceDirection = {}));
/**
 * Scroll service
 *
 * ```
 * import { useKey } from '@studiometa/js-toolkit/services';
 * const { add, remove, props } = useKey();
 * add(key, (props) => {});
 * remove(key);
 * props();
 * ```
 */
var Key = /** @class */ (function (_super) {
    __extends(Key, _super);
    function Key() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @type {KeyboardEvent|null} The event object. */
        _this.event = null;
        /** @type {KeyboardEvent|null} The previousEvent object. */
        _this.previousEvent = null;
        /**
         * Used to accumulate the number of times the `keydown` event has been triggered.
         * @type {Number}
         */
        _this.triggered = 0;
        return _this;
    }
    /**
     * Bind the handler to the keyboard event.
     *
     * @return {void}
     */
    Key.prototype.init = function () {
        var _this = this;
        this.handler = function (event) {
            _this.event = event;
            _this.trigger(_this.props);
        };
        autoBind_1.default(this, { include: ['handler'] });
        document.addEventListener('keydown', this.handler, { passive: false });
        document.addEventListener('keyup', this.handler, { passive: false });
    };
    /**
     * Unbind the handler from the keyboard event.
     *
     * @return {void}
     */
    Key.prototype.kill = function () {
        document.removeEventListener('keydown', this.handler);
        document.removeEventListener('keyup', this.handler);
    };
    Object.defineProperty(Key.prototype, "props", {
        /**
         * Get keyboard props.
         *
         * @type {Object}
         */
        get: function () {
            var _this = this;
            if (!this.event) {
                var props = {
                    event: this.event,
                    triggered: this.triggered,
                    direction: KeyServiceDirection.None,
                    isUp: false,
                    isDown: false,
                };
                return props;
            }
            var keys = Object.entries(keyCodes_1.default).reduce(function (acc, _a) {
                var name = _a[0], code = _a[1];
                acc[name] = code === (_this.event || {}).keyCode;
                return acc;
            }, {});
            if (!this.previousEvent) {
                this.triggered = 0;
            }
            if (this.event.type === 'keydown' && (this.previousEvent || {}).type === 'keydown') {
                this.triggered += 1;
            }
            else {
                this.triggered = 1;
            }
            this.previousEvent = this.event;
            return __assign({ event: this.event, triggered: this.triggered, direction: this.event.type === 'keydown' ? KeyServiceDirection.Down : KeyServiceDirection.Up, isUp: this.event.type === 'keyup', isDown: this.event.type === 'keydown' }, keys);
        },
        enumerable: false,
        configurable: true
    });
    return Key;
}(Service_1.default));
var key;
exports.default = (function () {
    if (!key) {
        key = new Key();
    }
    var add = key.add.bind(key);
    var remove = key.remove.bind(key);
    var has = key.has.bind(key);
    var props = function () { return key.props; };
    return {
        add: add,
        remove: remove,
        has: has,
        props: props,
    };
});
//# sourceMappingURL=key.js.map