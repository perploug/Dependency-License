"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
Object.defineProperty(exports, "__esModule", { value: true });
var pypi_base_1 = require("./pypi.base");
var Poetry = /** @class */ (function (_super) {
    __extends(Poetry, _super);
    function Poetry() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "Poetry";
        _this.globs = ["pyproject.toml"];
        return _this;
    }
    Poetry.prototype.detect = function (manifest) {
        return __awaiter(this, void 0, void 0, function () {
            var packageSection, packageManifest, deps;
            return __generator(this, function (_a) {
                //simplify the use of [[]]
                manifest = manifest.replace("[[", "[").replace("]]", "]");
                packageSection = manifest
                    .split("[")
                    .filter(function (x) { return x.indexOf("tool.poetry.dependencies]") === 0; });
                if (packageSection.length === 0)
                    return [2 /*return*/, []];
                packageManifest = packageSection.join("\n").replace("tool.poetry.dependencies]", '');
                deps = packageManifest
                    .split("\n")
                    .filter(function (x) { return (x.length > 0 && x.indexOf("#") !== 0 && x.indexOf("-")); })
                    .map(function (x) { return x.split("="); })
                    .map(function (x) {
                    var idep = { name: x[0].trim() };
                    if (x.length == 2) {
                        var versionString = x[1];
                        if (versionString.indexOf("{")) {
                            try {
                                // this is a longshot.. 
                                var obj = JSON.parse(versionString);
                                if (obj && obj.version) {
                                    idep.version = obj.version.replace("^", "");
                                }
                            }
                            catch (ex) {
                            }
                        }
                        else {
                            idep.version = x[1].replace("\"", "").replace("'", "").replace("^", "").trim();
                        }
                    }
                    return idep;
                });
                return [2 /*return*/, deps];
            });
        });
    };
    return Poetry;
}(pypi_base_1.PypiBase));
exports.Poetry = Poetry;
//# sourceMappingURL=poetry.js.map