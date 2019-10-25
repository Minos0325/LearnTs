
// // // 范型类
// 范型类 同 范型函数 都是为了 帮助我们避免代码重复。
// 如：

// class User {
//     // ...
// }
// class Talk {
//     // ...
// }
// // 需要User类
// class GenericRepository1 {
//     private _uri: string;
//     constructor(uri: string) {
//         this._uri= uri;
//     }
//     public getAsync() {
//         return Q.promise((
//             resolve :(entities: User[])=> void,
//             reject
//             )=> {
//                 $.ajax({
//                     type: 'GET',
//                     url: this._uri,
//                     dataType: 'json',
//                     success: (data)=> {
//                         var list = <User[]>data.items;
//                         resolve(list);
//                     },
//                     error: (e)=> {
//                         reject(e);
//                     }
//                 })
//             })
//     }
// }
// // 需要Talk类
// class GenericRepository2 {
//     private _uri: string;
//     constructor(uri: string) {
//         this._uri= uri;
//     }
//     public getAsync() {
//         return Q.promise((
//             resolve :(entities: Talk[])=> void,
//             reject
//             )=> {
//                 $.ajax({
//                     type: 'GET',
//                     url: this._uri,
//                     dataType: 'json',
//                     success: (data)=> {
//                         var list = <Talk[]>data.items;
//                         resolve(list);
//                     },
//                     error: (e)=> {
//                         reject(e);
//                     }
//                 })
//             })
//     }
// }
// // 优化后 （如果使用any 则会失去类型检查的保护）
// class GenericRepository<T> {
//     private _uri: string;
//     constructor(uri: string) {
//         this._uri= uri;
//     }
//     public getAsync() {
//         return Q.promise((
//             resolve :(entities: T[])=> void,
//             reject
//             )=> {
//                 $.ajax({
//                     type: 'GET',
//                     url: this._uri,
//                     dataType: 'json',
//                     success: (data)=> {
//                         var list = <T[]>data.items;
//                         resolve(list);
//                     },
//                     error: (e)=> {
//                         reject(e);
//                     }
//                 })
//             })
//     }
// }
// // 使用
// var userRepository = new GenericRepository<User>("xxx");
// var talkRepository = new GenericRepository<Talk>("yyy");
// userRepository.getAsync().then((users:User[])=> {
//     console.log('userRepository', users);
// })
// talkRepository.getAsync().then((talks: Talk[])=> {
//     console.log('talkRepository', talks);
// })

// // // 范型约束
// 有时候我们可能会需要约束 范型类。比如上一部分例子中的 范型类，我们的新需求：增加一些变更来验证通过 AJAX请求
// 到的数据并且只有在验证有效后返回。
// 可执行方案1：在范型类或函数内使用 typeof操作符 来 验证 参数反省T的类型
    // 问题是：我们每增加一个有效实例，就必须修改 GenericRepository类增加额外的逻辑
            // 我们不会讲验证逻辑加入到GenericRepository类中，因为一个范型类不应该知道范型的类型。
// 解决方法：
// 可执行方案2：给获取的实例增加一个 isValid方法，此方法在实例验证通过的时候返回 true

// 如：存在问题的 可执行方案1
//     success: (data)=> {
//         var list : T[];
//         var itmes= <T[]>data.items;
//         for(var i= 0; i< itmes.length; i++) {
//             if(items[i] instanceof User) {
//                 // Validate user
//             }
//             if(items[i] instanceof Talk) {
//                 // Validate user
//             }
//         }
//         resolve(list);
//     }

// 如：解决问题的 可执行方案2
//     success: (data)=> {
//         var list : T[];
//         var itmes= <T[]>data.items;
//         for(var i= 0; i< itmes.length; i++) {
            // if(items[i].isValid()) { //error
            //     //...
            // }
                
//         }
//         resolve(list);
//     }
// 可执行方案2: 实现方式遵循SOLID原则中的 开/闭原则，可以在GenericRepository正常工作的情况下增加一个新的实例（对扩展开放）
    // 但是不需要额外地修改代码（对已有的修改封闭）
    // 存在的唯一问题是： 如果在GenericRepository中尝试调用实例的isValid方法，会遇到一个编译错误。
        // 原因：我们允许GenericRepository与任意类型的实体一起使用，但并不是所有类型都有isValid方法。
        // 解决方案：
            // 可以通过范型约束轻易解决。
            // 范型约束会约束 允许 作为范型参数中的T的类型。我们将声明一个范型约束，只有实现了 ValidatableInterface接口的类型可以用于这个范型方法。
// 如：
// interface ValidatableInterface {
//     isValid(): boolean;
// }
// class User implements ValidatableInterface {
//     public name: string;
//     public password: string;
//     public isValid(): boolean {
//         // ...
//         return true;
//     }
// }
// class Talk implements ValidatableInterface {
//     public title: string;
//     public description: string;
//     public language: string;
//     public url: string;
//     public year: string;
//     public isValid(): boolean {
//         // ...
//         return true;
//     }
// }
// class GenericRepositoryWithConstraint<T extends ValidatableInterface> {
//     private _uri: string;
//     constructor(uri: string) {
//         this._uri= uri;
//     }
//     public getAnsyc() {
//         return Q.promise((
//             resolve :(
//                 entities: T[])=> void,
//                 reject
//                 )=> {
//                     $.ajax({
//                         type: 'GET',
//                         url: this._uri,
//                         dataType: 'json',
//                         success: (data)=> {
//                             var list: T[]= [];
//                             var items = <T[]>data.items;
//                             for(var i=0; i< items.length; i++) {
//                                 if(items[i].isValid()) {
//                                     list.push(items[i]);
//                                 }
//                             }
//                             resolve(list);
//                         },
//                         error: (e)=> {
//                             reject(e);
//                         }
//                     })
//             }
//         )
//     }
// }
// class Others {}
// // 使用
//     // 满足条件时：
// var userRepository = new GenericRepositoryWithConstraint<User>('uri');
// userRepository.getAnsyc().then(
//     function(urses: User[]) {
//         console.log(urses);
//     }
// )
//     // 未满足条件时：
// // var others= new GenericRepositoryWithConstraint<Others>("x");

// *** 上面例子中 使用 extends关键字 而不是 implements关键字 去声明范型约束
        // 并无特殊原因，是TypeScript范型约束语法的工作方式。
        // 在使用一个没有实现 ValidatableInterface 的类作为 范型参数 T ,就会得到一个编译错误


// // // 在范型约束中 使用 多重类型
// 当声明范型约束的时候， 我们只能关联一种类型，如果有一个范型类需要被约束 将要实现 两个接口：
// interface IMyInterface {
//     doSomeThing();
// };
// interface IMySecondInterface {
//     doSomeThingElse();
// };
// // 我们要将 多个接口 转变成一个 超接口 来解决问题
// interface IchildInterface extends IMyInterface, IMySecondInterface {};
// // 书上说现在 IMyInterface, IMySecondInterface 现在均为 超接口，因为他们是 IchildInterface 的父接口
// // 使用 IchildInterface 来定义 范型约束：
// class Example<T extends IchildInterface> {
//     private genericProperty: T;
//     useT(){
//         this.genericProperty.doSomeThing();
//         this.genericProperty.doSomeThingElse();
//     }
// }

// // // 范型中的 new 操作
// 要通过范型代码来创建新的对象，我们需要声明范型T拥有构造函数。
// 意味着需要像 type: {new(): T;} 替代 type: T;
// // 如：
// class MyClass {};
// function factoryNotWorking<T>(): T {
//     return new T();     //好不到标识，编译错误
// }
// function factory<T>(): T {
//     var type: { new(): T;};
//     return new type();
// }
// var myClass: MyClass = factory<MyClass>();
// ***自己的理解是 工厂模式返回 T 的实例 关在在 Type 对象的 new 方法中 ， type

// // //********** 遵循SOLID原则
// // //里氏替换原则 LSP
// 表示 派生类对象 能够替换 其他基类对象 被使用。
// 如：
// interface PersistanceServiceInterface {
//     save(entity: any): number;
// }
// //cookie的实现类
// class CookiePersitanceService implements PersistanceServiceInterface{
//     save(entity: any): number {
//         var id = Math.floor(Math.random()*100+1);
//         // cookie 持久化逻辑...
//         return id;
//     }
// }
// // 本地存储 的 实现类
// class LocalStoragePersitanceService implements PersistanceServiceInterface {
//     save(entity: any): number {
//         var id = Math.floor(Math.random()* 100+ 1);
//         // 本地存储持久化逻辑...
//         return id;
//     }
// }
// class CCC extends LocalStoragePersitanceService{}
// class FavouritesController {
//     private _persistanceService : PersistanceServiceInterface;
//     constructor(persistanceService: PersistanceServiceInterface) {
//         this._persistanceService = persistanceService;
//     }
//     public saveAsFavourite(articleId: number) {
//         return this._persistanceService.save(articleId);
//     }
// }
// var  favController = new FavouritesController(new CookiePersitanceService());
// var  fav1Controller = new FavouritesController(new LocalStoragePersitanceService());
// var  fav2Controller = new FavouritesController(new CCC());
// favController.saveAsFavourite(1);
// fav1Controller.saveAsFavourite(2);
// fav2Controller.saveAsFavourite(3);

// // // 接口隔离原则-page 120
// 接口被用来声明 两个或更多的应用组件间是如何互相操作和交换信息的。
// 这种声明也被称作 应用程序接口（API）
// 上个例子中
    // 接口是PersistanceServiceInterface， 他被CookiePersitanceService和LocalStoragePersitanceService类实现。
    // 这个接口也被FavouritesController类消费，因此我们说这个类 是 接口是PersistanceServiceInterface API的客户端。
// 接口隔离原则ISP代表着 任何客户端不应强制依赖于它没有使用到的方法。
// 为了遵循ISP，在应用组件内声明API时，声明多个针对特定客户端的接口，要好过声明一个大而全的接口。
// 如：
// interface VehicleInterface {
//     getSpeed() : number;
//     getVehicleType: string;
//     isTaxPayed(): boolean;
//     isLightsOn(): boolean;
//     isLightsOff(): boolean;
//     startEngine(): void;
//     acelerate(): number;
//     stopEngine(): void;
//     startRadio(): void;
//     playCd: void;
//     stopRadio(): void;
// }
// // 如果一个类有一个类基于VehicleInterface的依赖（客户端），但它只想使用radio方法，就会违背ISP。
// // 解决方法：将VehicleInterface分离成多个针对客户端的接口，这样类就可以通过只依赖RadioInterface接口来遵循ISP
// interface VehicleInterface1 {
//     getSpeed() : number;
//     getVehicleType: string;
//     isTaxPayed(): boolean;
//     isLightsOn(): boolean;
// }
// interface LightsInterface {
//     isLightsOn(): boolean;
//     isLightsOff(): boolean;
// }
// interface RadioInterface {
//     startRadio(): void;
//     playCd: void;
//     stopRadio(): void;
// }
// interface EngineInterface {
//     startEngine(): void;
//     acelerate(): number;
//     stopEngine(): void;
// }

// // // 依赖反转原则
// 依赖反转原则（DIP）表示一个方法应该遵从依赖于抽象而不是一个实例。
// 如上边的代码：
// 我们实现FavouritesController，并且可以不需要对 FavouritesController做任何修改就能 替换 PersistanceServiceInterface 的实现。
// 这种行为成为可能是因为代码遵循DIP，即：FavouritesController 依赖的是PersistanceServiceInterface （抽象）而不是
// LocalStoragePersitanceService 或 CookiePersitanceService（实现）。

// // // 命名空间
// TypeScript提供了 命名空间（内部模块）特性。命名空间主要用于组织代码。
// 代码量增加的时候引入某种代码组织方案避免命名冲突，并使代码更加容易跟踪 和 理解。
// 可以使用命名空间包裹那些有联系的接口、类和对象。比如将所有的程序数据模型包含在名为model 的内部模块中。
// namespace app {
//     export class UserModel {
//         // ...
//     }
// }
// // ***声明一个命名空间时，所有实体部分默认都是私有的，可以使用export关键字导出公共部分。
// // ***也可以在命名空间内声明另一个命名空间。
// // 如:
// namespace app {
//     export namespace models {
//         export class UserModel {
//             // ...
//         }
//         export class TalkModel {
//             // ...
//         }
//     }
// }
// // 如果内部模块变的太大，它应被分成多个文件来增加可维护性，可以通过其他文件中引用 app 给内部模块app 增加更多内容。
// // 如：
//     // ***新建一个 名为validation.ts 的文件并将下面代码加入其中。
// namespace app {
//     export namespace validation {
//         export class A {

//         }
//         export class talkValidator {

//         }
//     }
// }
    // *** 新建一个 名为 main.ts 的文件加入下列代码
// var a = new app.validation.A()；
// var user = new app.models.UserModel();
// var talk = new app.models.TalkModel();
// // app.UserModel
// ***即使命名空间models 和 validation 在两个不同文件中，也可以在第三个文件中 同时 访问到他们。
// ***命名空间可以包含 . 号。 比如，替代在 app 模块中使用嵌套命名空间（validation 和 models）。
// 如：
// namespace app.Minos {
//     export class Minos{}
// }
// var c = new app.Minos.Minos();

// import 关键词 可以 用在内部模块中， 为另一个模块提供别名：
// 如： 设置app.validation.talkValidator 别名为：TalkValidatorAlias 
// import TalkValidatorAlias = app.validation.talkValidator;
// var talk = new TalkValidatorAlias();

// 命名空间案例 见 文件夹 namespace
    //****  /// <reference path="validation.ts" />  **** 
    // 三个斜线，reference标签，path指向引入的文件，引入的文件呢，需要定义一个命名空间来引用定义的东西。

// 编译方法：
    // 1、把所有的输入文件编译为一个输出文件，需要使用--outFile标记：
        // tsc 输入.ts --outFile 输出.js  或 tsc --out 输出.js 输入.ts
        // 或 tsc --outFile sample.js Validation.ts LettersOnlyValidator.ts ZipCodeValidator.ts Test.ts
        // --out 后跟 输出
        // --out 是 --outFile 简写
    // 2、二，我们可以编译每一个文件（默认方式），那么每个源文件都会对应生成一个JavaScript文件。 然后，在页面上通过<script>标签把所有生成的JavaScript文件按正确的顺序引进来
        // tsc Validation.ts  
        // tsc model.ts
        // tsc main.ts
        // <script src="Validation.js" type="text/javascript" />
        // <script src="model.js" type="text/javascript" />
        // <script src="main.js" type="text/javascript" />


// // // 模块
// TypeScript也有 外部模块 或者 模块的概念。
// 模块与命名空间 相比较 最主要的区别是：
    // 在声明了所有模块之后，我们不会使用<script> 标签引入他们，他们通过模块加载器来加载
// 模块加载器：是在模块加载过程中为我们提供更好控制能力的工具，他能优化加载任务，
//     比如异步加载文件或者轻松合并多个模块到单一的高度优化的文件中
// 使用 <script> 标签的方式并不被推荐，因为当浏览器发现一个 <script> 标签时， 它不会使用异步请求加载这个文件。
// 应该尽可能地尝试异步加载文件，因为这样能显著提高Web程序的网络性能。

// ES6 之前版本 并不支持模块， 模块加载器每个都有不一样的模块定义语法。
// RequireJS: 使用了一个被称为 异步模块定义的语法（AMD）。
// Browserify:使用的语法被称为 CommonJS。
// SystemJS:是一个通用模块加载器，这意味着它支持所有的模块定义语法（ES6 CommonJS AMD UMD）。
// **** Node.js 程序也使用CommonJS 语法。

// TypeScript 允许我们 选择 在运行环境中 使用哪一种模块定义语法（ES6 CommonJS AMD UMD）。
// 可以在 编译期 使用 --module 标识来表明 选择哪一种
// 如：
    // tsc --module commonjs main.ts
    // tsc --module amd main.ts
    // tsc --module umd main.ts
    // tsc --module system main.ts
// 与可以选择4种 不同的运行时模块定义语法不同，在程序设计阶段只能选择两种模块定义语法
    // 1、外部模块语法（版本低于1.5的 TypeScript默认的模块定义语法）
    // 2、ES6模块语法（TypeScript 1.5 或更高版本中推荐的模块定义语法）
// 在程序设计阶段使用一种模块定义语法（外部模块语法 或 ES6语法）。
// 在运行时使用另一种模块定义语法（ES6 CommonJS AMD UMD）。
// ***以后可能在 设计阶段 和 运行阶段 都使用ES6模块定义语法。

// ES6模块语法 
    // 案例见 module_ES6 文件夹
    // ES6模块————运行时与程序设计时
    // *****导出exports***** User.ts
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
            // class UserValidator {}
            // class TalkValidator {}
            // export { UserValidator, TalkValidator };
    // *****引入import***** main.ts
        // 引入模块: 必须使用import关键字。
            // import关键字给每一个导入的组件创建一个变量。 
            // 如案例代码中：变量UserModule被声明，并且值为 User.ts 文件中声明并导出的UserModule类的一个引用。
        
        // 导入方式:
        // 1、
            // import { UserModule } from './User';
        // 2、
            // 导出多个 导入多个 
            // export { UserValidator, TalkValidator };                 // User.ts
            // import { UserValidator, TalkValidator } from './User';   // main.ts


// 外部模块语法 
    // 案例见 module_WB 文件夹
    // 外部模块语法————仅在程序设计阶段可用
    // TypeScript 1.5 以前， 模块必须使用 外部模块 语法 的方式声明。这种语法只在程序设计阶段使用（TypeScript代码中）。
    // 一旦编译称JavaScript， 它们会被转换成 AMD、CommonJS、UMD 或 SystemJS模块执行
    // ***应避免上述问题使用 ES6 语法来 替代。
    // 导出---module.ts
        // export interface UserInterface {}
        // export class UserModule {}
    // 导入---main.ts
        // import User = require('./module');
    // import User 等于声明了一个新的变量 User， User变量将使用module模块（文件）输出的内容作为自身的值。
    // 要输出一个模块，需要使用 export关键字
        // export class UserModule {}
    // 可以在类和接口上直接使用export;
        // class UserModule {}
        // export = UserModule;
// 外部模块定义可以被编译成任意可用的模块定义语法（AMD、 CommonJS 、SystemJS、UMD）；


// AMD模块定义语法————仅在运行时使用
    // ****详见-AMD文件夹****
// 将初始化的外部模块语法编译成AMD模块（使用标识 --cpmpile amd）
// 命令：tsc --module amd module.ts
// 生成：
    // 1、
        // 文件--module.ts
            // class UserModule {}
            // class TalkModule {}
            // export = UserModule;
        // 输出--module.js
            // define(["require", "exports"], function (require, exports) {
            //     "use strict";
            //     var UserModule = /** @class */ (function () {
            //         function UserModule() {
            //         }
            //         return UserModule;
            //     }());
            //     var TalkModule = /** @class */ (function () {
            //         function TalkModule() {
            //         }
            //         return TalkModule;
            //     }());
            //     return UserModule;
            // });
        // *****只导出了 UserModule， TalkModule未导出
        // 使用---main.ts
            // import User = require('./module');
            // var a = new User();
            // a.ugo();
    // 2、
        // 文件---module.ts
            // export class UserModule {
            //     ugo() {}
            // }
            // export class TalkModule {
            //     tgo() {}
            // }
        // 输出---module.js
            // define(["require", "exports"], function (require, exports) {
            //     "use strict";
            //     exports.__esModule = true;
            //     // 1.
            //     var UserModule = /** @class */ (function () {
            //         function UserModule() {
            //         }
            //         UserModule.prototype.ugo = function () { };
            //         return UserModule;
            //     }());
            //     exports.UserModule = UserModule;
            //     var TalkModule = /** @class */ (function () {
            //         function TalkModule() {
            //         }
            //         TalkModule.prototype.tgo = function () { };
            //         return TalkModule;
            //     }());
            //     exports.TalkModule = TalkModule;
            // });
            // ****导出了多个
            // 使用：---main.ts
                // import User = require('./module');
                // var a= new User.TalkModule();
                // var b= new User.UserModule();
            
    // define函数
        // 第一个参数是一个数组，这个数组包含了依赖的模块名列表。
        // 第二个参数是一个回调函数，这个函数将在所有依赖全部加载完成时执行一次。
        // 回调函数将所有的依赖模块作为它的参数，并且包含所有来自于 TypeSctipt 组件中的逻辑。
        // ***注意: AMD 中: 回调的返回类型是如何与 export 关键字声明为公共的组件相匹配的。
        // AMD模块随后可以被RequireJS模块加载器加载
    // **** 1 中 只能导出一个
    // **** 2 中 可导出多个

    // 更多AMD和RequireJS文献，请查看 http://requirejs.org/docs/staart.html


// CommonJS模块定义语法————仅在运行时使用
    // ****详见-CommonJS文件夹****
// 从将外部模块编译成CommonJS模块开始（使用标识 --cpmpile commonjs）我们将使用下面的代码片段
// 命令：tsc --module commonjs main.ts
// 生成:
    // 1、
        // 文件--module.ts
            // class User {
            //     ugo(){}
            // };
            // export = User;
        // 输出--module.js
            // "use strict";
            // var User = /** @class */ (function () {
            //     function User() {
            //     }
            //     User.prototype.ugo = function () { };
            //     return User;
            // }());
            // ;
            // module.exports = User;
        // 使用
            // import User = require('./module');
            // var u = new User();
            // u.ugo();
    // 上面代码片段， CommonJS 模块和已被弃用的（1.4及更早版本的）TypeScript外部模块语法相似。
    // 上面的CommonJS模块不需要进行任何修改，就能被Node.js 程序使用 import 和 require 关键字加载。
    // *** 然而，当尝试在浏览器中使用 require 关键字时，将抛出一个异常，因为require关键字未被定义。
    // *** 可以使用 Browserify 轻松解决这个问题。
    // *** 但前提是要将 所有 ts 文件 编译 为js 使用 CommonJS模块语法
        // 解决步骤：
            // 1、使用npm 安装 Browserify： npm install -g browserify
            // 2、使用 Browserify 将所有 CommonJS 模块打包成一个 JavaScript 文件
                // 在使用<script> 标签引入它。
                // 方式： browserify main.js -o bundle.js
                // *** main.js 文件包含了程序内部依赖树的 根模块。
                // *** bundle.js 是 生成的 要放在 HTML中 <script> 标签中引入的文件
            // 3、使用HTML 的 <script>标签 引入 bundle.js文件。
        // 详细案例见 CommonJS文件夹。

    // 更多Browserify文献，请查看 http://github.com/substack/node-browserify#usage.


// UMD模块定义语法————仅在运行时使用
    // ****详见-UMD文件夹****
    // 如果想发布一个 JavaScript 库或者框架，需要将 Typescript 程序编译成 CommonJS 和 AMD 模块。
    // 我的库同样也要让开发者能够直接在浏览器中用 HTML 的 <script> 标签加载。
    // web开发者社区 开发出了 下面的 代码片段 帮助我们实现 通用模块定义（UMD）：
        // (function( root, factory) {
        //     if(typeof export === 'object') {
        //         // CommonJS
        //         module.exports = factory(require('b'));
        //     } else if( typeof fefins === 'function' && undefined) {
        //         // AMD
        //         define(['b'], function (b) {
        //             return root.returnExportsGlobal = factory(b);
        //         });
        //     } else {
        //         // 全局变量
        //         root.returnExportsGlobal= factory(root.b);
        //     }
        // }(this, function(b) {
        //     // 真正的模块
        //     return {};
        // }))
    // *** 上面的代码很棒，但是我们希望避免在每一个模块中加入这段代码。
    // *** 幸运的是有些选项可以轻松实现 UMD。
        // 1、使用 --compile umd标识，为程序中的每一个模块生成一个UMD模块。
            // tsc --module commonjs module.ts
            // tsc --module commonjs main.ts
        // 2、使用模块加载器，如： Browserify ，只创建一个UMD模块，它包含程序中所有的模块。
            // browserify main.js -o bundle.js

    // 访问 http://browserify.org/ 官方项目地址可了解更多关于 Browserify 的内容。
    // 根据 Browserify-standalone 选项 可了解如何生成单一优化后的文件


// SystemJS模块定义————仅在运行时使用
    // ****详见-systmeJS文件夹****
    // 如同 UMD 为你提供了一种生成一个模块即 兼容CommonJS 又兼容 AMD 的方式。
    // SystemJS 可以让你在不兼容 ES6 的浏览器上，更加贴近它们语义地使用 ES6 模块定义方式。
    // SystemJS 被 Angular2.0 所使用

    // 访问  SystemJS 的官网：http://github.com/systemjs/systemjs 可获取更多关于 SystmeJS 的信息。
    // 这里有一个免费的、关于使用模块遇到的常见错误的在线列表：
        //  http://www.typescriptlang.org/Handbook#modules-pitfalls-of-modules 


// // // 循环依赖
    // 循环依赖是在处理多个模块 和 依赖时会遇到的 问题。
    // 如：   
        // 组件A 依赖 组件B
        // 组件B 依赖 组件A
    // 见书P132 图解
    // 循环依赖并不一定只包含两个组件，我们可以设想 一个组件 依赖另一个 依赖其他组件的组件，
    // 依赖树上的一些组件最终指向树上的它们的 父组件

    // 辨认 循环依赖 是非常耗时的， Atom内置了一个命令行工具，来生成依赖树的 图。
    // 导航栏 View 菜单  => Toggle Command Palet 项 => 输入 TypeScript：Dependency View 显示依赖树的图

    // 更多关于依赖图的信息，访问官方文档 
    // http://github.com/TypeScript/atom-typescript/blob/master/docs/dependency-view.md

