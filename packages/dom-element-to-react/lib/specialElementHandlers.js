"use strict";
// For information on defaultValue vs. value, defaultChecked vs. checked,
// and defaultValue vs. selected, see React's documentation on uncontrolled
// form elements: https://reactjs.org/docs/uncontrolled-components.html
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
Object.defineProperty(exports, "__esModule", { value: true });
var specialElementHandlers = {
    input: function (el, attributes) {
        var toReturn = __assign({}, attributes);
        // Never pass value or checked. These props would switch React form
        // elements into controlled mode.
        if (typeof toReturn.checked !== "undefined") {
            delete toReturn.checked;
        }
        if (typeof toReturn.value !== "undefined") {
            delete toReturn.value;
        }
        // Use the DOM element properties instead of attributes. These may reflect
        // changes the user has already made before we could rehydrate.
        if (el.checked) {
            toReturn.defaultChecked = el.checked;
        }
        if (el.value) {
            toReturn.defaultValue = el.value;
        }
        return toReturn;
    },
    option: function (_, attributes) {
        var toReturn = __assign({}, attributes);
        // <option> elements will have their "selected" attribute hoisted to the
        // <select> element that contains them, as a defaultValue.
        if (typeof toReturn.selected !== "undefined") {
            delete toReturn.selected;
        }
        return toReturn;
    },
    select: function (el, attributes) {
        var toReturn = __assign({}, attributes);
        // Passing value would switch <select> into controlled mode.
        if (typeof toReturn.value !== "undefined") {
            delete toReturn.value;
        }
        // Use the DOM element properties instead of attributes. These may reflect
        // changes the user has already made before we could rehydrate.
        if (el.value) {
            toReturn.defaultValue = el.value;
        }
        return toReturn;
    },
    textarea: function (el, attributes) {
        var toReturn = __assign({}, attributes);
        // Passing value would switch <textarea> into controlled mode.
        if (typeof toReturn.value !== "undefined") {
            delete toReturn.value;
        }
        // Use the DOM element properties instead of attributes. These may reflect
        // changes the user has already made before we could rehydrate.
        if (el.value) {
            toReturn.defaultValue = el.value;
        }
        return toReturn;
    }
};
exports.default = specialElementHandlers;
//# sourceMappingURL=specialElementHandlers.js.map