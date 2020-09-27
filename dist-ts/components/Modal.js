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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Base_1 = __importDefault(require("../abstracts/Base"));
var transition_1 = __importDefault(require("../utils/css/transition"));
var focusTrap_1 = __importDefault(require("../utils/focusTrap"));
var _a = focusTrap_1.default(), trap = _a.trap, untrap = _a.untrap, saveActiveElement = _a.saveActiveElement;
/**
 * Modal class.
 */
var Modal = /** @class */ (function (_super) {
    __extends(Modal, _super);
    function Modal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Modal.prototype, "config", {
        /**
         * Modal options.
         */
        get: function () {
            return {
                name: 'Modal',
                move: false,
                autofocus: '[autofocus]',
                styles: {
                    modal: {
                        closed: {
                            opacity: 0,
                            pointerEvents: 'none',
                            visibility: 'hidden',
                        },
                    },
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Modal.prototype, "onOpenClick", {
        /**
         * Open the modal on click on the `open` ref.
         *
         * @return {Function} The component's `open` method.
         */
        get: function () {
            return this.open;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Modal.prototype, "onCloseClick", {
        /**
         * Close the modal on click on the `close` ref.
         *
         * @return {Function} The component's `close` method.
         */
        get: function () {
            return this.close;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Modal.prototype, "onOverlayClick", {
        /**
         * Close the modal on click on the `overlay` ref.
         *
         * @return {Function} The component's `close` method.
         */
        get: function () {
            return this.close;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Initialize the component's behaviours.
     *
     * @return {Modal} The current instance.
     */
    Modal.prototype.mounted = function () {
        this.isOpen = false;
        this.close();
        if (this.$options.move) {
            var target = document.querySelector(this.$options.move) || document.body;
            var refsBackup_1 = this.$refs;
            this.refModalPlaceholder = document.createComment('');
            this.refModalParentBackup = this.$refs.modal.parentElement || this.$el;
            this.refModalParentBackup.insertBefore(this.refModalPlaceholder, this.$refs.modal);
            this.refModalUnbindGetRefFilter = this.$on('get:refs', function (refs) {
                Object.entries(refsBackup_1).forEach(function (_a) {
                    var key = _a[0], ref = _a[1];
                    if (!refs[key]) {
                        refs[key] = ref;
                    }
                });
            });
            target.appendChild(this.$refs.modal);
        }
        return this;
    };
    /**
     * Unbind all events on destroy.
     *
     * @return {Modal} The Modal instance.
     */
    Modal.prototype.destroyed = function () {
        this.close();
        if (this.$options.move) {
            this.refModalParentBackup.insertBefore(this.$refs.modal, this.refModalPlaceholder);
            this.refModalUnbindGetRefFilter();
            this.refModalPlaceholder.remove();
            delete this.refModalPlaceholder;
            delete this.refModalParentBackup;
            delete this.refModalUnbindGetRefFilter;
        }
        return this;
    };
    /**
     * Close the modal on `ESC` and trap the tabulation.
     *
     * @param  {KeyboardEvent} options.event  The original keyboard event
     * @param  {Boolean}       options.isUp   Is it a keyup event?
     * @param  {Boolean}       options.isDown Is it a keydown event?
     * @param  {Boolean}       options.ESC    Is it the ESC key?
     * @return {void}
     */
    Modal.prototype.keyed = function (_a) {
        var event = _a.event, isUp = _a.isUp, isDown = _a.isDown, ESC = _a.ESC;
        if (!this.isOpen) {
            return;
        }
        if (isDown) {
            trap(this.$refs.modal, event);
        }
        if (ESC && isUp) {
            this.close();
        }
    };
    /**
     * Open the modal.
     *
     * @return {Modal} The Modal instance.
     */
    Modal.prototype.open = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this.isOpen) {
                    return [2 /*return*/, Promise.resolve(this)];
                }
                this.$refs.modal.setAttribute('aria-hidden', 'false');
                document.documentElement.style.overflow = 'hidden';
                this.isOpen = true;
                this.$emit('open');
                return [2 /*return*/, Promise.all(Object.entries(this.$options.styles).map(function (_a) {
                        var refName = _a[0], _b = _a[1], _c = _b === void 0 ? {} : _b, open = _c.open, active = _c.active, closed = _c.closed;
                        return transition_1.default(_this.$refs[refName], {
                            from: closed,
                            active: active,
                            to: open,
                        }, 'keep');
                    })).then(function () {
                        if (_this.$options.autofocus && _this.$refs.modal.querySelector(_this.$options.autofocus)) {
                            saveActiveElement();
                            _this.$refs.modal.querySelector(_this.$options.autofocus).focus();
                        }
                        return Promise.resolve(_this);
                    })];
            });
        });
    };
    /**
     * Close the modal.
     *
     * @return {Modal} The Modal instance.
     */
    Modal.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!this.isOpen) {
                    return [2 /*return*/, Promise.resolve(this)];
                }
                this.$refs.modal.setAttribute('aria-hidden', 'true');
                document.documentElement.style.overflow = '';
                this.isOpen = false;
                untrap();
                this.$emit('close');
                return [2 /*return*/, Promise.all(Object.entries(this.$options.styles).map(function (_a) {
                        var refName = _a[0], _b = _a[1], _c = _b === void 0 ? {} : _b, open = _c.open, active = _c.active, closed = _c.closed;
                        return transition_1.default(_this.$refs[refName], {
                            from: open,
                            active: active,
                            to: closed,
                        }, 'keep');
                    })).then(function () { return Promise.resolve(_this); })];
            });
        });
    };
    return Modal;
}(Base_1.default));
exports.default = Modal;
//# sourceMappingURL=Modal.js.map