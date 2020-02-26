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

/**
 * Tick service
 *
 * ```
 * import tick from '@studiometa/js/services/tick';
 * tick.add(id, handler);
 * tick.remove(id);
 * tick.props;
 * ```
 */
var Raf =
/*#__PURE__*/
function (_Service) {
  (0, _inherits2["default"])(Raf, _Service);

  function Raf() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, Raf);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(Raf)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "isLooping", false);
    return _this;
  }

  (0, _createClass2["default"])(Raf, [{
    key: "init",

    /**
     * Start the requestAnimationFrame loop.
     *
     * @return {void}
     */
    value: function init() {
      var _this2 = this;

      var loop = function loop() {
        // todo: add params to the trigger
        _this2.trigger(_this2.props);

        if (!_this2.isLooping) {
          return;
        }

        requestAnimationFrame(loop);
      };

      this.isLooping = true;
      loop();
    }
    /**
     * Stop the requestAnimationFrame loop.
     *
     * @return {void}
     */

  }, {
    key: "kill",
    value: function kill() {
      this.isLooping = false;
    }
    /**
     * Get raf props.
     *
     * @todo Return elapsed time / index?
     * @type {Object}
     */

  }, {
    key: "props",
    get: function get() {
      return {};
    }
  }]);
  return Raf;
}(_Service2["default"]);

var raf = new Raf();
var add = raf.add.bind(raf);
var remove = raf.remove.bind(raf);

var props = function props() {
  return raf.props;
};

var _default = function _default() {
  return {
    add: add,
    remove: remove,
    props: props
  };
};

exports["default"] = _default;
//# sourceMappingURL=raf.js.map