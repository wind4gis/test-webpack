"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.WebpackBuilder = void 0;
var path_1 = __importDefault(require("path"));
var config_1 = __importDefault(require("./config"));
var webpack_1 = __importDefault(require("webpack"));
var WebpackBuilder = /** @class */ (function () {
    function WebpackBuilder(props) {
        this.showName = '';
        this.ctxDir = process.cwd();
        this.init(props);
    }
    WebpackBuilder.prototype.getEntry = function (name) {
        return {
            'test': {
                name: 'test',
                path: path_1["default"].join(this.ctxDir, name, 'index.ts'),
                originalName: 'test'
            }
        };
    };
    WebpackBuilder.prototype.init = function (props) {
        var entry = this.getEntry(props.nameList);
        this.args = __assign(__assign({}, props.options), { entry: entry, ctxDir: this.ctxDir });
        if (entry) {
            this.compiler = (0, webpack_1["default"])(config_1["default"]);
        }
    };
    WebpackBuilder.prototype.run = function () {
        var _this = this;
        this.compiler.run(function (err, stats) {
            if (err) {
                console.error("".concat(_this.showName));
                return;
            }
            if (stats === null || stats === void 0 ? void 0 : stats.hasErrors()) {
                var json = stats.toJson();
                if (json.errors) {
                    json.errors.forEach(function (item) {
                        console.error(item.message);
                    });
                }
                else {
                    console.error("".concat(_this.showName));
                }
                return;
            }
            _this.compiler.close(function () {
                console.log("".concat(_this.showName));
            });
        });
    };
    WebpackBuilder.prototype.start = function () {
        this.run();
    };
    return WebpackBuilder;
}());
exports.WebpackBuilder = WebpackBuilder;
