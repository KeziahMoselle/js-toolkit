"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Service2 = _interopRequireDefault(require("../abstracts/Service"));

var _utils = require("../utils");

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
  (0, _inherits2["default"])(Resize, _Service);

  function Resize() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, Resize);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(Resize)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "breakpointElement", null);
    return _this;
  }

  (0, _createClass2["default"])(Resize, [{
    key: "init",

    /**
     * Bind the handler to the resize event.
     *
     * @return {void}
     */
    value: function init() {
      var _this2 = this;

      this.handler = (0, _utils.debounce)(function () {
        _this2.trigger(_this2.props);
      }).bind(this);
      window.addEventListener('resize', this.handler);
      this.breakpointElement = document.querySelector('[data-breakpoint]') || null;
    }
    /**
     * Unbind the handler from the resize event.
     *
     * @return {void}
     */

  }, {
    key: "kill",
    value: function kill() {
      window.removeEventListener('resize', this.handler);
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
     * Get the current breakpoint.
     * @return {String}
     */

  }, {
    key: "breakpoint",
    get: function get() {
      return window.getComputedStyle(this.breakpointElement, '::before').getPropertyValue('content').replace(/"/g, '') || '';
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
  }]);
  return Resize;
}(_Service2["default"]);

var resize = null;

var _default = function _default() {
  if (!resize) {
    resize = new Resize();
  }

  var add = resize.add.bind(resize);
  var remove = resize.remove.bind(resize);

  var props = function props() {
    return resize.props;
  };

  return {
    add: add,
    remove: remove,
    props: props
  };
};

exports["default"] = _default;
//# sourceMappingURL=resize.js.map