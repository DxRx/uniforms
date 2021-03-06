'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BaseForm = require('./BaseForm');

var _BaseForm2 = _interopRequireDefault(_BaseForm);

var _nothing = require('./nothing');

var _nothing2 = _interopRequireDefault(_nothing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Quick = function Quick(parent) {
    var _class, _temp;

    return _temp = _class = function (_parent) {
        (0, _inherits3.default)(_class, _parent);

        function _class() {
            (0, _classCallCheck3.default)(this, _class);
            return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
        }

        (0, _createClass3.default)(_class, [{
            key: 'getNativeFormProps',
            value: function getNativeFormProps() {
                var _get$call = (0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'getNativeFormProps', this).call(this),
                    autoField = _get$call.autoField,
                    errorsField = _get$call.errorsField,
                    submitField = _get$call.submitField,
                    props = (0, _objectWithoutProperties3.default)(_get$call, ['autoField', 'errorsField', 'submitField']);

                return props;
            }
        }, {
            key: 'render',
            value: function render() {
                var nativeFormProps = this.getNativeFormProps();
                if (nativeFormProps.children) {
                    return (0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'render', this).call(this);
                }

                var AutoField = this.props.autoField || this.getAutoField();
                var ErrorsField = this.props.errorsField || this.getErrorsField();
                var SubmitField = this.props.submitField || this.getSubmitField();

                return _react2.default.createElement(
                    'form',
                    nativeFormProps,
                    this.getChildContextSchema().getSubfields().map(function (key) {
                        return _react2.default.createElement(AutoField, { key: key, name: key });
                    }),
                    _react2.default.createElement(ErrorsField, null),
                    _react2.default.createElement(SubmitField, null)
                );
            }
        }, {
            key: 'getAutoField',
            value: function getAutoField() {
                return function () {
                    return _nothing2.default;
                };
            }
        }, {
            key: 'getErrorsField',
            value: function getErrorsField() {
                return function () {
                    return _nothing2.default;
                };
            }
        }, {
            key: 'getSubmitField',
            value: function getSubmitField() {
                return function () {
                    return _nothing2.default;
                };
            }
        }]);
        return _class;
    }(parent), _class.Quick = Quick, _class.displayName = 'Quick' + parent.displayName, _class.propTypes = (0, _extends3.default)({}, parent.propTypes, {

        autoField: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
        errorsField: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
        submitField: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string])
    }), _temp;
};

exports.default = Quick(_BaseForm2.default);