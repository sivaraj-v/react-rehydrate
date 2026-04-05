"use strict";
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.rehydrateChildren = exports.rehydratableToReactElement = void 0;
var dom_element_to_react_1 = require("@sivaraj-v/dom-element-to-react");
var ReactDOM = require("react-dom");
var client_1 = require("react-dom/client");
var reactRoots = new WeakMap();
var rehydratableToReactElement = function (el, rehydrators, options) { return __awaiter(void 0, void 0, void 0, function () {
    var rehydratorName, rehydrator;
    return __generator(this, function (_a) {
        rehydratorName = el.getAttribute("data-rehydratable");
        if (!rehydratorName) {
            throw new Error("Rehydrator name is missing from element.");
        }
        rehydrator = rehydrators[rehydratorName];
        if (!rehydrator) {
            throw new Error("No rehydrator found for type ".concat(rehydratorName));
        }
        return [2 /*return*/, rehydrator(el, function (children) { return rehydrateChildren(children, rehydrators, options); }, options.extra)];
    });
}); };
exports.rehydratableToReactElement = rehydratableToReactElement;
var createCustomHandler = function (rehydrators, options) { return function (node) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // This function will run on _every_ node that domElementToReact encounters.
        // Make sure to keep the conditional highly performant.
        if (node.nodeType === Node.ELEMENT_NODE &&
            node.hasAttribute("data-rehydratable")) {
            return [2 /*return*/, rehydratableToReactElement(node, rehydrators, options)];
        }
        return [2 /*return*/, false];
    });
}); }; };
var rehydrateChildren = function (el, rehydrators, options) { return (0, dom_element_to_react_1.default)(el, createCustomHandler(rehydrators, options)); };
exports.rehydrateChildren = rehydrateChildren;
var render = function (_a) {
    var rehydrated = _a.rehydrated, root = _a.root;
    if (!rehydrated || !root) {
        return;
    }
    var reactRoot = reactRoots.get(root) || (0, client_1.createRoot)(root);
    reactRoots.set(root, reactRoot);
    var flushSync = ReactDOM.flushSync;
    if (flushSync) {
        flushSync(function () { return reactRoot.render(rehydrated); });
        return;
    }
    reactRoot.render(rehydrated);
};
exports.default = (function (container, rehydrators, options) { return __awaiter(void 0, void 0, void 0, function () {
    var roots, renders, _loop_1, _i, roots_1, root;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                roots = Array.from(
                // TODO: allow setting a container identifier so multiple rehydration instances can exist
                container.querySelectorAll("[data-react-from-markup-container]")).reduce(function (acc, root) {
                    // filter roots that are contained within other roots
                    if (!acc.some(function (r) { return r.contains(root); })) {
                        acc.push(root);
                    }
                    return acc;
                }, []);
                renders = [];
                _loop_1 = function (root) {
                    // It's possible that this root was detached by a previous render in this loop
                    if (container.contains(root)) {
                        renders.push(function () { return __awaiter(void 0, void 0, void 0, function () {
                            var rehydrated, e_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, rehydrateChildren(root, rehydrators, options)];
                                    case 1:
                                        rehydrated = _a.sent();
                                        return [2 /*return*/, { root: root, rehydrated: rehydrated }];
                                    case 2:
                                        e_1 = _a.sent();
                                        /* tslint:disable-next-line no-console */
                                        console.error("Rehydration failure", e_1);
                                        return [3 /*break*/, 3];
                                    case 3: return [2 /*return*/, {}];
                                }
                            });
                        }); });
                    }
                };
                for (_i = 0, roots_1 = roots; _i < roots_1.length; _i++) {
                    root = roots_1[_i];
                    _loop_1(root);
                }
                return [4 /*yield*/, Promise.all(renders.map(function (r) { return r().then(render); }))];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=rehydrator.js.map