import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import Service from '../abstracts/Service';
import throttle from '../utils/throttle';
import debounce from '../utils/debounce';
import useRaf from './raf';
/**
 * Pointer service
 *
 * ```
 * import { usePointer } from '@studiometa/js/services';
 * const { add, remove, props } = usePointer();
 * add(key, (props) => {});
 * remove(key);
 * props();
 * ```
 */

var Pointer = /*#__PURE__*/function (_Service) {
  _inherits(Pointer, _Service);

  var _super = _createSuper(Pointer);

  function Pointer() {
    var _this;

    _classCallCheck(this, Pointer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "isDown", false);

    _defineProperty(_assertThisInitialized(_this), "y", window.innerHeight / 2);

    _defineProperty(_assertThisInitialized(_this), "yLast", window.innerHeight / 2);

    _defineProperty(_assertThisInitialized(_this), "x", window.innerWidth / 2);

    _defineProperty(_assertThisInitialized(_this), "xLast", window.innerWidth / 2);

    _defineProperty(_assertThisInitialized(_this), "event", void 0);

    return _this;
  }

  _createClass(Pointer, [{
    key: "init",

    /**
     * Bind the handler to the mousemove and touchmove events.
     * Bind the up and down handler to the mousedown, mouseup, touchstart and touchend events.
     *
     * @return {void}
     */
    value: function init() {
      var _this2 = this;

      var _useRaf = useRaf(),
          add = _useRaf.add,
          remove = _useRaf.remove;

      this.hasRaf = false;
      var debounced = debounce(function (event) {
        _this2.updateValues(event);

        remove('usePointer');

        _this2.trigger(_this2.props);

        _this2.hasRaf = false;
      }, 50);
      this.handler = throttle(function (event) {
        _this2.updateValues(event);

        if (!_this2.hasRaf) {
          add('usePointer', function () {
            _this2.trigger(_this2.props);
          });
          _this2.hasRaf = true;
        } // Reset changed flags at the end of the mousemove or touchmove event


        debounced(event);
      }, 32).bind(this);
      this.downHandler = this.downHandler.bind(this);
      this.upHandler = this.upHandler.bind(this);
      document.documentElement.addEventListener('mouseenter', this.handler, {
        once: true
      });
      document.addEventListener('mousemove', this.handler, {
        passive: true
      });
      document.addEventListener('touchmove', this.handler, {
        passive: true
      });
      document.addEventListener('mousedown', this.downHandler, {
        passive: true
      });
      document.addEventListener('touchstart', this.downHandler, {
        passive: true
      });
      document.addEventListener('mouseup', this.upHandler, {
        passive: true
      });
      document.addEventListener('touchend', this.upHandler, {
        passive: true
      });
    }
    /**
     * Unbind all handlers from their bounded event.
     *
     * @return {void}
     */

  }, {
    key: "kill",
    value: function kill() {
      document.removeEventListener('mousemove', this.handler);
      document.removeEventListener('touchmove', this.handler);
      document.removeEventListener('mousedown', this.downHandler);
      document.removeEventListener('touchstart', this.downHandler);
      document.removeEventListener('mouseup', this.upHandler);
      document.removeEventListener('touchend', this.upHandler);
    }
    /**
     * Handler for the pointer's down action.
     *
     * @return {void}
     */

  }, {
    key: "downHandler",
    value: function downHandler() {
      this.isDown = true;
      this.trigger(this.props);
    }
    /**
     * Handler for the pointer's up action.
     *
     * @return {void}
     */

  }, {
    key: "upHandler",
    value: function upHandler() {
      this.isDown = false;
      this.trigger(this.props);
    }
    /**
     * Update the pointer positions.
     *
     * @param  {Event} event The event object.
     * @return {void}
     */

  }, {
    key: "updateValues",
    value: function updateValues(event) {
      this.event = event;
      this.yLast = this.y;
      this.xLast = this.x; // Check pointer Y
      // We either get data from a touch event `event.touches[0].clientY` or from
      // a mouse event `event.clientY`.

      if (((event.touches || [])[0] || event || {}).clientY !== this.y) {
        this.y = ((event.touches || [])[0] || event || {}).clientY;
      } // Check pointer X
      // We either get data from a touch event `event.touches[0].clientX` or from
      // a mouse event `event.clientX`.


      if (((event.touches || [])[0] || event || {}).clientX !== this.x) {
        this.x = ((event.touches || [])[0] || event || {}).clientX;
      }
    }
    /**
     * Get the pointer props.
     *
     * @type {Object}
     */

  }, {
    key: "props",
    get: function get() {
      return {
        event: this.event,
        isDown: this.isDown,
        x: this.x,
        y: this.y,
        changed: {
          x: this.x !== this.xLast,
          y: this.y !== this.yLast
        },
        last: {
          x: this.xLast,
          y: this.yLast
        },
        delta: {
          x: this.x - this.xLast,
          y: this.y - this.yLast
        },
        progress: {
          x: this.x / window.innerWidth,
          y: this.y / window.innerHeight
        },
        max: {
          x: window.innerWidth,
          y: window.innerHeight
        }
      };
    }
  }]);

  return Pointer;
}(Service);

var pointer = null;
/**
 * Use the pointer.
 *
 * ```js
 * import usePointer from '@studiometa/js-toolkit/services';
 * const { add, remove, props } = usePointer();
 * add('id', () => {});
 * remove('id');
 * props();
 * ```
 */

export default (function () {
  if (!pointer) {
    pointer = new Pointer();
  }

  var add = pointer.add.bind(pointer);
  var remove = pointer.remove.bind(pointer);
  var has = pointer.has.bind(pointer);

  var props = function props() {
    return pointer.props;
  };

  return {
    add: add,
    remove: remove,
    has: has,
    props: props
  };
});
//# sourceMappingURL=pointer.js.map