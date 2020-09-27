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
/**
 * Tabs class.
 */
var Tabs = /** @class */ (function (_super) {
    __extends(Tabs, _super);
    function Tabs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Tabs.prototype, "config", {
        /**
         * Tabs options.
         */
        get: function () {
            return {
                name: 'Tabs',
                styles: {
                    content: {
                        closed: {
                            position: 'absolute',
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
    /**
     * Initialize the component's behaviours.
     *
     * @return {Tabs} The current instance.
     */
    Tabs.prototype.mounted = function () {
        var _this = this;
        this.items = this.$refs.btn.map(function (btn, index) {
            var id = _this.$id + "-" + index;
            var content = _this.$refs.content[index];
            btn.setAttribute('id', id);
            content.setAttribute('aria-labelledby', id);
            var item = { btn: btn, content: content, isEnabled: index > 0 };
            if (index > 0) {
                _this.disableItem(item);
            }
            else {
                _this.enableItem(item);
            }
            return item;
        });
        return this;
    };
    /**
     * Switch tab on button click.
     *
     * @param  {Event}  event The click event object.
     * @param  {Number} index The index of the clicked button.
     * @return {void}
     */
    Tabs.prototype.onBtnClick = function (event, index) {
        var _this = this;
        this.items.forEach(function (item, i) {
            if (i !== index) {
                _this.disableItem(item);
            }
        });
        this.enableItem(this.items[index]);
    };
    /**
     * Enable the given tab and its associated content.
     *
     * @param  {HTMLElement} btn     The tab element.
     * @param  {HTMLElement} content The content element.
     * @return {Tabs}                The Tabs instance.
     */
    Tabs.prototype.enableItem = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var btn, content, btnStyles, contentStyles;
            var _this = this;
            return __generator(this, function (_a) {
                if (!item || item.isEnabled) {
                    return [2 /*return*/, Promise.resolve(this)];
                }
                item.isEnabled = true;
                btn = item.btn, content = item.content;
                btnStyles = this.$options.styles.btn || {};
                contentStyles = this.$options.styles.content || {};
                content.setAttribute('aria-hidden', 'false');
                this.$emit('enable', item);
                return [2 /*return*/, Promise.all([
                        transition_1.default(btn, {
                            from: btnStyles.closed,
                            active: btnStyles.active,
                            to: btnStyles.open,
                        }, 'keep'),
                        transition_1.default(content, {
                            from: contentStyles.closed,
                            active: contentStyles.active,
                            to: contentStyles.open,
                        }, 'keep'),
                    ]).then(function () { return Promise.resolve(_this); })];
            });
        });
    };
    /**
     * Disable the given tab and its associated content.
     *
     * @param  {HTMLElement} btn     The tab element.
     * @param  {HTMLElement} content The content element.
     * @return {Tabs}                The Tabs instance.
     */
    Tabs.prototype.disableItem = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var btn, content, btnStyles, contentStyles;
            var _this = this;
            return __generator(this, function (_a) {
                if (!item || !item.isEnabled) {
                    return [2 /*return*/, Promise.resolve(this)];
                }
                item.isEnabled = false;
                btn = item.btn, content = item.content;
                btnStyles = this.$options.styles.btn || {};
                contentStyles = this.$options.styles.content || {};
                content.setAttribute('aria-hidden', 'true');
                this.$emit('disable', item);
                return [2 /*return*/, Promise.all([
                        transition_1.default(btn, {
                            from: btnStyles.open,
                            active: btnStyles.active,
                            to: btnStyles.closed,
                        }, 'keep'),
                        transition_1.default(content, {
                            from: contentStyles.open,
                            active: contentStyles.active,
                            to: contentStyles.closed,
                        }, 'keep'),
                    ]).then(function () { return Promise.resolve(_this); })];
            });
        });
    };
    return Tabs;
}(Base_1.default));
exports.default = Tabs;
//# sourceMappingURL=Tabs.js.map