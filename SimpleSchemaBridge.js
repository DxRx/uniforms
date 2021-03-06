'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _Bridge2 = require('./Bridge');

var _Bridge3 = _interopRequireDefault(_Bridge2);

var _joinName = require('./joinName');

var _joinName2 = _interopRequireDefault(_joinName);

var _filterDOMProps = require('./filterDOMProps');

var _filterDOMProps2 = _interopRequireDefault(_filterDOMProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Match = ((typeof global === 'undefined' ? 'undefined' : (0, _typeof3.default)(global)) === 'object' ? global : window).Match; /* global Package */

var SimpleSchema = ((typeof global === 'undefined' ? 'undefined' : (0, _typeof3.default)(global)) === 'object' ? global : window).SimpleSchema;

/* istanbul ignore next */
try {
    if (Match === undefined && (typeof Package === 'undefined' ? 'undefined' : (0, _typeof3.default)(Package)) === 'object') {
        Match = Package['check'].Match;
    }

    if (SimpleSchema === undefined && (typeof Package === 'undefined' ? 'undefined' : (0, _typeof3.default)(Package)) === 'object') {
        SimpleSchema = Package['aldeed:simple-schema'].SimpleSchema;
    }
} catch (_) {/* Ignore it. */}

try {
    var r = require; // Silence Meteor missing module warning

    if (Match === undefined) {
        Match = r('meteor/check').Match;
    }

    if (SimpleSchema === undefined) {
        SimpleSchema = r('meteor/aldeed:simple-schema').SimpleSchema;
    }
} catch (_) {/* Ignore it. */}

if (SimpleSchema && Match) {
    SimpleSchema.extendOptions({
        uniforms: Match.Optional(Match.OneOf(String, Function, Match.ObjectIncluding({
            component: Match.Optional(Match.OneOf(String, Function))
        })))
    });

    // There's no possibility to retrieve them at runtime
    _filterDOMProps2.default.register('allowedValues', 'autoValue', 'blackbox', 'custom', 'decimal', 'defaultValue', 'exclusiveMax', 'exclusiveMin', 'label', 'max', 'maxCount', 'min', 'minCount', 'optional', 'regEx', 'trim', 'type');
}

var SimpleSchemaBridge = function (_Bridge) {
    (0, _inherits3.default)(SimpleSchemaBridge, _Bridge);

    function SimpleSchemaBridge(schema) {
        (0, _classCallCheck3.default)(this, SimpleSchemaBridge);

        var _this = (0, _possibleConstructorReturn3.default)(this, (SimpleSchemaBridge.__proto__ || Object.getPrototypeOf(SimpleSchemaBridge)).call(this));

        _this.schema = schema;
        return _this;
    }

    (0, _createClass3.default)(SimpleSchemaBridge, [{
        key: 'getError',
        value: function getError(name, error) {
            return error && error.details && error.details.find && error.details.find(function (error) {
                return error.name === name;
            }) || null;
        }
    }, {
        key: 'getErrorMessage',
        value: function getErrorMessage(name, error) {
            var scopedError = this.getError(name, error);
            return !scopedError ? '' : this.schema.messageForError(scopedError.type, scopedError.name, null, scopedError.details && scopedError.details.value);
        }
    }, {
        key: 'getErrorMessages',
        value: function getErrorMessages(error) {
            var _this2 = this;

            if (error) {
                if (Array.isArray(error.details)) {
                    return error.details.map(function (error) {
                        return _this2.schema.messageForError(error.type, error.name, null, error.details && error.details.value);
                    });
                }

                if (error.message) {
                    return [error.message];
                }
            }

            if (error !== undefined) {
                return [error];
            }

            return [];
        }
    }, {
        key: 'getField',
        value: function getField(name) {
            var definition = this.schema.getDefinition(name);

            (0, _invariant2.default)(definition, 'Field not found in schema: "%s"', name);

            return definition;
        }
    }, {
        key: 'getInitialValue',
        value: function getInitialValue(name) {
            var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var field = this.getField(name);

            if (field.type === Array) {
                var item = this.getInitialValue((0, _joinName2.default)(name, '0'));
                var items = Math.max(props.initialCount || 0, field.minCount || 0);

                return [].concat((0, _toConsumableArray3.default)(Array(items))).map(function () {
                    return item;
                });
            }

            if (field.type === Object) {
                return {};
            }

            return field.defaultValue;
        }

        // eslint-disable-next-line complexity

    }, {
        key: 'getProps',
        value: function getProps(name) {
            var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            // Type should be omitted.
            // eslint-disable-next-line no-unused-vars, prefer-const
            var _getField = this.getField(name),
                optional = _getField.optional,
                type = _getField.type,
                uniforms = _getField.uniforms,
                field = (0, _objectWithoutProperties3.default)(_getField, ['optional', 'type', 'uniforms']);

            field = (0, _extends3.default)({}, field, { required: !optional });

            if (uniforms) {
                if (typeof uniforms === 'string' || typeof uniforms === 'function') {
                    field = (0, _extends3.default)({}, field, { component: uniforms });
                } else {
                    field = (0, _extends3.default)({}, field, uniforms);
                }
            }

            if (type === Array) {
                try {
                    var itemProps = this.getProps(name + '.$', props);
                    if (itemProps.allowedValues && !props.allowedValues) {
                        field.allowedValues = itemProps.allowedValues;
                    }

                    if (itemProps.transform && !props.transform) {
                        field.transform = itemProps.transform;
                    }
                } catch (_) {/* ignore it */}
            }

            var options = props.options || field.options;
            if (options) {
                if (typeof options === 'function') {
                    options = options();
                }

                if (!Array.isArray(options)) {
                    field = (0, _extends3.default)({}, field, {
                        transform: function transform(value) {
                            return options[value];
                        },
                        allowedValues: Object.keys(options)
                    });
                } else {
                    field = (0, _extends3.default)({}, field, {
                        transform: function transform(value) {
                            return options.find(function (option) {
                                return option.value === value;
                            }).label;
                        },
                        allowedValues: options.map(function (option) {
                            return option.value;
                        })
                    });
                }
            }

            return field;
        }
    }, {
        key: 'getSubfields',
        value: function getSubfields(name) {
            return this.schema.objectKeys(SimpleSchema._makeGeneric(name));
        }
    }, {
        key: 'getType',
        value: function getType(name) {
            return this.getField(name).type;
        }
    }, {
        key: 'getValidator',
        value: function getValidator() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { clean: true };

            var validator = this.schema.validator(options);

            // Clean mutate its argument.
            if (options.clean) {
                return function (model) {
                    return validator((0, _cloneDeep2.default)((0, _extends3.default)({}, model)));
                };
            }

            return validator;
        }
    }], [{
        key: 'check',
        value: function check(schema) {
            return SimpleSchema && schema && schema.getDefinition && schema.messageForError && schema.objectKeys && schema.validator && schema.version !== 2;
        }
    }]);
    return SimpleSchemaBridge;
}(_Bridge3.default);

exports.default = SimpleSchemaBridge;