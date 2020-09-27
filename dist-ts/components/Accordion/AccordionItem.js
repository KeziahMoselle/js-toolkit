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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
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
var Base_1 = __importDefault(require("../../abstracts/Base"));
var styles = __importStar(require("../../utils/css/styles"));
var transition_1 = __importDefault(require("../../utils/css/transition"));
/**
 * AccordionItem class.
 */
var AccordionItem = /** @class */ (function (_super) {
    __extends(AccordionItem, _super);
    function AccordionItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AccordionItem.prototype, "config", {
        /**
         * AccordionItem config
         * @return {Object}
         */
        get: function () {
            return {
                name: 'AccordionItem',
                isOpen: false,
                styles: {
                    container: {
                        open: '',
                        active: '',
                        closed: '',
                    },
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Add aria-attributes on mounted.
     * @return {void}
     */
    AccordionItem.prototype.mounted = function () {
        var _this = this;
        if (this.$parent && this.$parent.$options.item) {
            this.$options = this.$parent.$options.item;
        }
        this.$refs.btn.setAttribute('id', this.$id);
        this.$refs.btn.setAttribute('aria-controls', this.contentId);
        this.$refs.content.setAttribute('aria-labelledby', this.$id);
        this.$refs.content.setAttribute('id', this.contentId);
        this.isOpen = this.$options.isOpen;
        this.updateAttributes(this.isOpen);
        if (!this.isOpen) {
            styles.add(this.$refs.container, { visibility: 'invisible', height: 0 });
        }
        // Update refs styles on mount
        var _a = this.$options.styles, container = _a.container, otherStyles = __rest(_a, ["container"]);
        Object.entries(otherStyles)
            .filter(function (_a) {
            var refName = _a[0];
            return _this.$refs[refName];
        })
            .forEach(function (_a) {
            var refName = _a[0], _b = _a[1], _c = _b === void 0 ? {} : _b, open = _c.open, closed = _c.closed;
            transition_1.default(_this.$refs[refName], { to: _this.isOpen ? open : closed }, 'keep');
        });
    };
    /**
     * Handler for the click event on the `btn` ref.
     * @return {void}
     */
    AccordionItem.prototype.onBtnClick = function () {
        if (this.isOpen) {
            this.close();
        }
        else {
            this.open();
        }
    };
    Object.defineProperty(AccordionItem.prototype, "contentId", {
        /**
         * Get the content ID.
         * @return {String}
         */
        get: function () {
            return "content-" + this.$id;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Update the refs' attributes according to the given type.
     *
     * @param  {Boolean} isOpen The state of the item.
     * @return {void}
     */
    AccordionItem.prototype.updateAttributes = function (isOpen) {
        this.$refs.content.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
        this.$refs.btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    };
    /**
     * Open an item.
     * @return {void}
     */
    AccordionItem.prototype.open = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, container, otherStyles;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.isOpen) {
                            return [2 /*return*/];
                        }
                        this.$log('open');
                        this.$emit('open');
                        this.isOpen = true;
                        this.updateAttributes(this.isOpen);
                        styles.remove(this.$refs.container, { visibility: 'invisible' });
                        _a = this.$options.styles, container = _a.container, otherStyles = __rest(_a, ["container"]);
                        return [4 /*yield*/, Promise.all(__spreadArrays([
                                transition_1.default(this.$refs.container, {
                                    from: { height: 0 },
                                    active: container.active,
                                    to: { height: this.$refs.content.offsetHeight + "px" },
                                }).then(function () {
                                    // Remove style only if the item has not been closed before the end
                                    if (_this.isOpen) {
                                        styles.remove(_this.$refs.content, { position: 'absolute' });
                                    }
                                    return Promise.resolve();
                                })
                            ], Object.entries(otherStyles)
                                .filter(function (_a) {
                                var refName = _a[0];
                                return _this.$refs[refName];
                            })
                                .map(function (_a) {
                                var refName = _a[0], _b = _a[1], _c = _b === void 0 ? {} : _b, open = _c.open, active = _c.active, closed = _c.closed;
                                return transition_1.default(_this.$refs[refName], {
                                    from: closed,
                                    active: active,
                                    to: open,
                                }, 'keep');
                            })))];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Close an item.
     * @return {void}
     */
    AccordionItem.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            var height, _a, container, otherStyles;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.isOpen) {
                            return [2 /*return*/];
                        }
                        this.$log('close');
                        this.$emit('close');
                        this.isOpen = false;
                        height = this.$refs.container.offsetHeight;
                        styles.add(this.$refs.content, { position: 'absolute' });
                        _a = this.$options.styles, container = _a.container, otherStyles = __rest(_a, ["container"]);
                        return [4 /*yield*/, Promise.all(__spreadArrays([
                                transition_1.default(this.$refs.container, {
                                    from: { height: height + "px" },
                                    active: container.active,
                                    to: { height: 0 },
                                }).then(function () {
                                    // Add end styles only if the item has not been re-opened before the end
                                    if (!_this.isOpen) {
                                        styles.add(_this.$refs.container, { height: 0, visibility: 'invisible' });
                                        _this.updateAttributes(_this.isOpen);
                                    }
                                    return Promise.resolve();
                                })
                            ], Object.entries(otherStyles)
                                .filter(function (_a) {
                                var refName = _a[0];
                                return _this.$refs[refName];
                            })
                                .map(function (_a) {
                                var refName = _a[0], _b = _a[1], _c = _b === void 0 ? {} : _b, open = _c.open, active = _c.active, closed = _c.closed;
                                return transition_1.default(_this.$refs[refName], {
                                    from: open,
                                    active: active,
                                    to: closed,
                                }, 'keep');
                            })))];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return AccordionItem;
}(Base_1.default));
exports.default = AccordionItem;
//# sourceMappingURL=AccordionItem.js.map