(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var User = /** @class */ (function () {
        function User() {
        }
        User.prototype.ugo = function () {
            alert(1);
        };
        return User;
    }());
    ;
    return User;
});
