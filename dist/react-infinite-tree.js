/*! react-infinite-tree v0.2.2 | (c) 2016 Cheton Wu <cheton@gmail.com> | MIT | https://github.com/cheton/react-infinite-tree */
exports["InfiniteTree"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _infiniteTree = __webpack_require__(3);

	var _infiniteTree2 = _interopRequireDefault(_infiniteTree);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var lcfirst = function lcfirst(str) {
	    str += '';
	    return str.charAt(0).toLowerCase() + str.substr(1);
	};

	module.exports = function (_React$Component) {
	    _inherits(_class2, _React$Component);

	    function _class2() {
	        var _Object$getPrototypeO;

	        var _temp, _this, _ret;

	        _classCallCheck(this, _class2);

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(_class2)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.tree = null, _this.eventHandlers = {
	            onContentWillUpdate: null,
	            onContentDidUpdate: null,
	            onOpenNode: null,
	            onCloseNode: null,
	            onSelectNode: null
	        }, _temp), _possibleConstructorReturn(_this, _ret);
	    }

	    _createClass(_class2, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _this2 = this;

	            var _props = this.props;
	            var children = _props.children;
	            var className = _props.className;

	            var options = _objectWithoutProperties(_props, ['children', 'className']);

	            var el = _reactDom2.default.findDOMNode(this);
	            options.el = el;

	            this.tree = new _infiniteTree2.default(options);

	            Object.keys(this.eventHandlers).forEach(function (key) {
	                if (!_this2.props[key]) {
	                    return;
	                }

	                var eventName = lcfirst(key.substr(2)); // e.g. onContentWillUpdate -> contentWillUpdate
	                _this2.eventHandlers[key] = _this2.props[key];
	                _this2.tree.on(eventName, _this2.eventHandlers[key]);
	            });
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            var _this3 = this;

	            Object.keys(this.eventHandlers).forEach(function (key) {
	                if (!_this3.eventHandlers[key]) {
	                    return;
	                }

	                var eventName = lcfirst(key.substr(2)); // e.g. onUpdate -> update
	                _this3.tree.removeListener(eventName, _this3.eventHandlers[key]);
	                _this3.eventHandlers[key] = null;
	            });

	            this.tree.destroy();
	            this.tree = null;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { className: this.props.className },
	                this.props.children
	            );
	        }
	    }]);

	    return _class2;
	}(_react2.default.Component);

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("react-dom");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("infinite-tree");

/***/ }
/******/ ]);