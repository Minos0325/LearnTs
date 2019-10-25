// 导出方式
// 1、
    // class UserModule {
    //     // ...
    // }
    // export { UserModule };  //导出的位置随意
// 2、
    // 直接导出
    // export class UserModule {
    //     //  ...
    // }
// 3、
    // 通过别名输出
    // class UserModule {
    //     // ...
    // }
    // export {UserModule as User};    // UserModule 输出为 User
// 4、
    // 一个 exports 输出 所有同名 定义：
    // interface UserModule {
    //     // ...
    // }
    // class UserModule {
    //     // ...
    // }
    // export { UserModule };      // 输出接口和函数

// 5、
    // 导出多个
    class UserValidator {}
    class TalkValidator {}
    export { UserValidator, TalkValidator };