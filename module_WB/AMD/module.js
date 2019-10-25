// 1.
define(["require", "exports"], function (require, exports) {
    "use strict";
    var UserModule = /** @class */ (function () {
        function UserModule() {
        }
        UserModule.prototype.ugo = function () { };
        return UserModule;
    }());
    var TalkModule = /** @class */ (function () {
        function TalkModule() {
        }
        TalkModule.prototype.tgo = function () { };
        return TalkModule;
    }());
    return TalkModule;
});
// 2.
// export class UserModule {
//     ugo() {}
// }
// export class TalkModule {
//     tgo() {}
// }
