"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _Service2 = _interopRequireDefault(require("../abstracts/Service"));

var _debounce = _interopRequireDefault(require("../utils/debounce"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Resize service
 *
 * ```
 * import { useResize } from '@studiometa/js/services';
 * const { add, remove, props } = useResize();
 * add(key, (props) => {});
 * remove(key);
 * props();
 * ```
 */
var Resize = /*#__PURE__*/function (_Service) {
  (0, _inherits2.default)(Resize, _Service);

  var _super = _createSuper(Resize);

  function Resize() {
    (0, _classCallCheck2.default)(this, Resize);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(Resize, [{
    key: "init",

    /**
     * Bind the handler to the resize event.
     *
     * @return {void}
     */
    value: function init() {
      var _this = this;

      this.handler = (0, _debounce.default)(function () {
        _this.trigger(_this.props);
      }).bind(this);

      if (this.canUseResizeObserver) {
        this.resizeObserver = new ResizeObserver(this.handler);
        this.resizeObserver.observe(document.documentElement);
      } else {
        window.addEventListener('resize', this.handler);
      }
    }
    /**
     * Unbind the handler from the resize event.
     *
     * @return {void}
     */

  }, {
    key: "kill",
    value: function kill() {
      if (this.canUseResizeObserver) {
        this.resizeObserver.disconnect();
      } else {
        window.removeEventListener('resize', this.handler);
      }

      delete this.resizeObserver;
    }
    /**
     * Get resize props.
     *
     * @type {Object}
     */

  }, {
    key: "props",
    get: function get() {
      var props = {
        width: window.innerWidth,
        height: window.innerHeight,
        ratio: window.innerWidth / window.innerHeight,
        orientation: 'square'
      };

      if (props.ratio > 1) {
        props.orientation = 'landscape';
      }

      if (props.ratio < 1) {
        props.orientation = 'portrait';
      }

      if (this.breakpointElement) {
        props.breakpoint = this.breakpoint;
        props.breakpoints = this.breakpoints;
      }

      return props;
    }
    /**
     * The element holding the breakpoints data.
     * @return {HTMLElement}
     */

  }, {
    key: "breakpointElement",
    get: function get() {
      return document.querySelector('[data-breakpoint]') || null;
    }
    /**
     * Get the current breakpoint.
     * @return {String}
     */

  }, {
    key: "breakpoint",
    get: function get() {
      return window.getComputedStyle(this.breakpointElement, '::before').getPropertyValue('content').replace(/"/g, '');
    }
    /**
     * Get all breakpoints.
     * @return {Array}
     */

  }, {
    key: "breakpoints",
    get: function get() {
      var breakpoints = window.getComputedStyle(this.breakpointElement, '::after').getPropertyValue('content').replace(/"/g, '');
      return breakpoints.split(',');
    }
    /**
     * Test if we can use the `ResizeObserver` API.
     * @return {Boolean}
     */

  }, {
    key: "canUseResizeObserver",
    get: function get() {
      return typeof window.ResizeObserver !== 'undefined';
    }
  }]);
  return Resize;
}(_Service2.default);

var resize = null;

var _default = function _default() {
  if (!resize) {
    resize = new Resize();
  }

  var add = resize.add.bind(resize);
  var remove = resize.remove.bind(resize);
  var has = resize.has.bind(resize);

  var props = function props() {
    return resize.props;
  };

  return {
    add: add,
    remove: remove,
    has: has,
    props: props
  };
};

exports.default = _default;
//# sourceMappingURL=resize.js.map