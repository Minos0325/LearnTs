// // 函数声明 和 函数表达式
// console.log(greetNamed("John"));
// console.log(greetUnNamed("John"));
// function greetNamed(name: string) {
//     if(name) {
//         return 'Hi! I am ' + name;
//     }
// }

// var greetUnNamed = function (name: string) {
//     if(name) { 
//         return 'Hi! I am ' + name;
//     }
// }

// // 可以定义参数类型 亦可以 定义函数本身类型
// var greetUnNamed : (name: string) => string;
// greetUnNamed = function(name: string) {
//     return 'Hi '+ name;
// }
// //函数类型定义简写
// var greetUnNamed : (name: string) => string= function(name: string) :string {
//     if (name){
//         return 'Hi '+ name;
//     }
// }

// // 有可选参数的 函数
// function add(foo: number, bar: number, footbar?: number): number {
//     let result = foo+ bar;
//     if (footbar) {
//         result+= footbar;
//     }
//     return result;
// }
// 注意： 可选参数必须位于必选参数后面

// // 有默认参数的 函数
// function add(foo: number, bar: number, footbar: number = 0): number {
//     return foo + bar +footbar;
// }
// 等同于
// function add(foo: number, bar: number, footbar): number {
//     return foo + bar +footbar? footbar : 0;
// }
// 等同于
// function add(foo, bar, footbar) {
//     if (footbar === void 0) { footbar = 0; }
//     return foo + bar + footbar;
// }
// 注意：
//     void 0 即 为 undefined
//     默认参数 跟 可选参数 一样 必须位于所有必选参数列表的后面，否则无意义、

// // 有剩余参数的 函数
// 如果需要传入 任意数量 的参数， 解决方案为剩余参数。
// 剩余参数 语法允许把 不限量的参数表示为一个数组
// function add(...foo) :number {
//     var result= 0;
//     for(var i= 0; i< foo.length; i++ ) {
//         result+= foo[i];
//     }
//     return result;
// }
// // 等同于
// function add() {
//     var foo= [];
//     for(var _i= 0; _i< arguments.length; _i++) {
//         foo[_i-0] = arguments[_i];
//     }
//     var result = 0;
//     for (var i= 0; i< foo.length; i++) {
//         result+= foo[i];
//     }
//     return result;
// }
// // 但是如果想提升性能应当不使用剩余参数 只是用一个数组 作为函数参数
// 如： --- 去除对函数参数列表进行遍历的操作
// function add (foo: number[]) { 
//     var result= 0;
//     for(var i=0; i< foo.length; i++) {
//         result += foo[i];
//     }
//     return result;
// }

// // 函数重载
// 函数重载 或 方法重载 是 使用相同名称 和 不同参数数量或类型 创建多个方法的一种能力
// 在 TypeScript 中， 我们可以通过声明一个函数的 所有的 函数签名， 然后再将一个签名作为 实现
// 所有函数都必须兼容  即 返回值类型 必须一样！！
// 实现签名必须 兼容所有 重载签名， 总是在参数列表最后， 接收any 或者联合类型的参数作为 它的 参数
// 如：
// function test(name: string) : string;       //重载签名
// function test(age: number) : string;        //重载签名
// function test(single: boolean) : string;    //重载签名

// // // 实现签名
// function test(value: (string | number | boolean)) : string {
//     switch(typeof value) {
//         case 'string': return `My name is ${value}.`;
//         case 'number': return `I'm ${value} years old.`;
//         case 'boolean': return value? "I'm single.": "I'm not single.";
//         default:
//             console.log('Invalid Operation!')
//     }
// }
// //总结： 
// //     1、用法不同于java中的重载
// //     2、重载签名貌似没有什么卵用， 所谓重载好似就是在方法内判断了下 参数类型。

// // 特定重载签名
// 我们可以使用一个特定的函数签名来创建具有 同样名称、参数数量 但是有不同返回类型的多个 函数。
// 为了创建一个 特定签名， 必须将函数的参数类型 指定为 一个字符串。
// 这个 字符串 被用于定义那个函数重载 被调用
// interface Document1 {
//     createElement(tagName: "div") : HTMLDivElement;         // 特定重载签名
//     createElement(tagName: "span") : HTMLSpanElement;       // 特定重载签名
//     createElement(tagName: "canvas") : HTMLCanvasElement;   // 特定重载签名
//     createElement(tagName: string) : HTMLElement;         // 非特定重载签名
// }
// 下方必须为any 返回类型
// class Dc1 implements Document1 {
//     createElement(v: string): any { //非特定重载签名
//         return ;
//     }
// }
// createElement 属性 属于一个包含了 三张特定 从在签名的类型， 并被赋予到非特定重载签名中。
// 在编写 重载声明时， 必须在最后列出非重载签名。
// 我们也可以通过使用联合类型来创建有同样名称和参数数量但参数类型不一样的函数。

// // 函数作用域
// 一些编程语言使用程序的源代码结构来指定哪些变量被引用（词法作用域），
// 另一些编程语言使用程序运行时堆栈状态来指定哪些变量被引用（动态作用域）。
// 主要的现在编程语言使用 此法作用域（包括TypeScript）
// 词法作用域往往比动态作用域更易被人和分析工具理解
// 在绝大多数词法作用域编程语言中， 变量的作用域为代码块（一段被花括号{}括起来的代码）
// 在TypeScript （和 JavaScript）中，变量的作用域在一个函数中。
// 例1
// function foo() :void {
//     if(true) {
//         var bar : number = 0;
//     }
//     alert(bar);
// }
// foo(); //shows 0
// 等同于
// function foo() :void {
//     var bar : number;
//     if(true) {
//        bar= 0;
//     }
//     alert(bar);
// }
// foo(); //shows 0

// 函数作用域 是JavaScript 最 饱受批评 的特性之一。
// ES6 开始引入了 新的关键字 let 和 const
// let 关键字 允许我们将作用域设置在 代码段 （if、 while、 for 等） 而不是 函数中。
// 如:
// function foo(): void {
//     if(true) {
//         let bar : number = 0;
//         bar = 1;
//     }
//     alert(bar);     //error
// }
// 当函数使用 const 进行定义时， 它和 let 拥有相同的作用域规则。 并且不能被重新赋值。
// function foo(): void {
//     if(true) {
//         const bar : number = 0;
//         bar = 1;    //error
//     }
//     alert(bar);     //error
// }

// // 立即调用函数
// 立即调用函数表达式（IIFE）是一种设计模式， 使用函数作用域作为一个词法作用域。
// IIFE 可以被用于防止全局中变量提升导致的污染
// 如：
// var bar = 0;
// (function() {
//     var foo : number = 0;   // 函数作用域中
//     bar = 1;                // 全局作用域中
//     console.log(bar);   // 1
//     console.log(foo);   // 0
// }) ()
// console.log(bar);   // 1
// console.log(foo);   // error
// 上述例子中使用 IIFE 包装了 两个变量的声明 (foo 和 bar)。 foo变量作用于 IIFE 函数中
// 并且在全局作用域中不可用， 这解释了为什么当我们尝试在最后一行访问它时会 报错。
// 我们也可以给IIFE 传递一个变量， 以便更好的控制在作用域之外创建的变量。
// 如：
// var bar = 0;    //全局的
// (function(global) {
//     var foo : number = 0;   // 函数作用域中
//     global.foo2 = 222;
//     bar = 1;                // 全局作用域中
//     console.log(global.bar);   // 1
//     console.log(global.foo2);   // 222
//     console.log(foo);   // 0
// }) (this)
// console.log(bar);   // 1
// console.log(foo2);   // 222
// console.log(foo);   // error
// 我们没有在IIFE 中调用 this 操作符， 所以把指向全局作用域的 this操作符 作为唯一的 参数 传递给了 IIFE。
// 在IIFE中 this 操作符传递来的参数成为global， 以便我们可以更好的操控全局作用域中声明的bar 变量，而不是 foo 变量

// 此外IIFE 允许我们公开访问方法
// 如：
// class Counter {
//     private _i: number;
//     constructor() {
//         this._i = 0;
//     }
//     get(): number {
//         return this._i;
//     }
//     set(val: number): void {
//         this._i= val;
//     }
//     increment(): void {
//         this._i++;
//     }
// }
// var counter= new Counter();
// console.log(counter.get());     // 0
// counter.set(2);
// console.log(counter.get());     // 2
// counter.increment();
// console.log(counter.get());     // 3
// // console.log(counter._i);     // error _i为私有属性

// // //泛型 ---例子较长 

// don't repeat youself (DRY) 原则
// DRY原则旨在减少各种类型的信息重复。
// ----------------------泛型例子开始----------------------------
// // 定义
// class User {
//     name: string;
//     age: number;
// }
// // function getUsers(cb: (users: User[])=> void) : void {
// //     $.ajax({
// //         url: '/api/users',
// //         method: "GET",
// //         success: function(data) {
// //             cb(data.itmes);
// //         },
// //         error: function(error) {
// //             cb(null);
// //         }
// //     });
// // }
// // // 调用
// // getUsers(function(users: User[]) {
// //     for(var i; users.length; i++) {
// //         console.log(users[i].name);
// //     }
// // })
// // 我们需要功能相同的函数 但是这次 将用Order实例 取代 User实例
// // 定义
// class Order {
//     id: number;
//     total: number;
//     item: any[];
// }
// // function getUsers(cb: (orders: Order[])=> void) : void {
// //     $.ajax({
// //         url: '/api/users',
// //         method: "GET",
// //         success: function(data) {
// //             cb(data.itmes);
// //         },
// //         error: function(error) {
// //             cb(null);
// //         }
// //     });
// // }
// // // 调用
// // getOrders(function(orders: Order[]) {
// //     for(var i; orders.length; i++) {
// //         console.log(orders[i].total);
// //     }
// // })

// // 使用泛型进行优化
// function getEntities<T>(cb: (list: T[])=> void) : void {
//     $.ajax({
//         url: '/api/users',
//         method: "GET",
//         success: function(data) {
//             cb(data.itmes);
//         },
//         error: function(error) {
//             cb(null);
//         }
//     });
// }
// getEntities<User>(function(users : User[]) {
//     for(var i; users.length; i++) {
//         console.log(users[i].name);
//     }
// })
// ----------------------泛型例子结束----------------------------


// // // tag函数 和 标签模板
// 模板字符串 与 tag函数 紧密联系
// 可是使用 tag函数 来 扩展 和 修改 模板字符串的 行为
// 当我们在模板字符串上应用一个 tag函数 时， 这个模板字符串就变成了 标签模板
// *** 要使用 tag函数，必须在 tag函数 后 紧跟一个 模板字符串。
// *** 一个标签模板必须返回一个字符串，并接受下面的参数
    // 第一个参数是 数组， 包含了模板字符串中所有的静态字面量
    // 剩余的参数是米板字符串中 所有变量 如下面的name1 surname1 等
    // tag(literals: string[], ...value: any[]) : string

// 如：
// function htmlEscape(literals, ...placeholders) {
//     let result= "";
//     for(let i= 0; i<placeholders.length; i++) {
//         result+= literals[i];
//         result += placeholders[i]
//             .replace(/&/g, '&amp;')
//             .replace(/"/g, '&quot;')
//             .replace(/'/g, '&#39;')
//             .replace(/</g, '&lt;')
//             .replace(/>/g, '&gt;');
//     }
//     result += literals[literals.length - 1];
//     return result;
// }
// var name1 = 'romo';
// var surname1 = 'jansen';
// var html1= htmlEscape`<h1>${name1} ${surname1}</h1>`;
// *** 使用tag函数最大的好处 是 他允许我们创建一个自定义的模板字符串 处理器;


// // // // // TypeScript中的异步编程
// 回调 和 高阶函数
// TypeScript中 函数可以作为参数传给其他函数，被传递给其他函数的函数叫做回调。
// 函数也可以被另外一个函数返回，这些接受函数为参数（回调） 或 返回另一个函数的 函数 被称为 高阶函数
// *** 回调通常被用在异步函数中
// var foo= function() {           // 回调
//     console.log('foo');
// }
// function bar(cb: ()=> void) {   // 高阶函数
//     console.log('bar');
//     cb();
// }
// bar(foo);

// 箭头函数
// 箭头函数 是 function表达式 的缩写。 并且这种词法会在其作用域内绑定this操作符
// 在TypeScript中， this操作符的行为 和其他语言 有点不一样， TypeScript 中定义一个类的时候，
// 可以使用this指向这个类自身的属性。
// 当定义了一个异步函数时（包含回调）， this关键字就会改变它 指向的值，指向匿名函数
// *** 当TypeScript编译器 编译 箭头函数  时 会生成一个 this的别名 名为 _this.

// // 回调地狱
// 详见 回调地狱详解.ts

// // Promise
// Promise 背后最主要的思想是对异步操作结果的一个承诺。
// 一个promise 一定是以下几种状态之一。
    // 1、 pending： promise的 初始化 状态
    // 2、 fulfilled： 代表异步操作 成功的 promise 状态
    // 3、 rejected： 代表异步操作 失败的 promise 状态
// ***当一个promise 处于 fulfilled 或 rejected 状态后，它的状态就 永远不可改变 了。
// // 语法：
// function foo() {
//     let value = '成功后的值';
//     let reason = '失败的原因';
//     return new Promise(
//         (fulfill, reject)=>{
//             try {
//                 // do something
//                 fulfill(value);
//             } catch {
//                 reject(reason);
//             }
//         }
//     )
// }
// foo()
//     .then(
//         function(value) {
//             console.log(value);
//         }
//     ).catch(
//         function(reason) {
//             console.log(reason);
//         }
//     )
// *** foo 函数中 并不需要 try...catch 语句
// 因为 promise 会在有异常抛出后自动进入到 rejected状态


// // // 生成器
// 如果在TypeScript中调用一个函数，我们可以肯定一旦这个函数开始运行，在它运行完成之前其他代码都不能运行。
// 然而，一种新的函数可能会在函数执行的过程中将这个函数 暂停一次 或 数次， 并在随后恢复它的运行。
// 而且可以让其他代码在暂停的过程中运行
// TypeScript和 ES6 中即将实现这个功能
// 这种新型函数被称为 生成器

// 使用 function 关键字 后面跟着 星号（*） 定义一个生成器构造函数
// 如： 
// function* foo() {
//     yield 1;
//     yield 2;
//     yield 3;
//     yield 4;
//     return 5;
// }
// var bar= foo();
// //*** g()并不会执行g函数，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是迭代器对象（Iterator Object）。

// var bar = new foo(); 没必要这么写 因为 执行函数就会返回其 内部对象
// bar.next(); 
// bar.next();
// bar.next();
// bar.next();
// bar.next();


// // // 异步函数---async 和 await
// 异步函数 是一个即将到来的TypeScript的特性。一个异步函数是在 异步操作中 被 调用的函数
// 开发者可以使用await关键字等待一部结果的到来而不会阻塞程序的执行。
// ***当编译目标是ES6时 异步函数会被 promise实现， 编译目标是ES5 或ES3 时 会被Promise的兼容版实现。
// 与使用Promise相比，使用异步函数可以显著提高程序的可读性，在技术上使用promise可以达到和同步函数同样的效果
// var p: Promise<number> = new Promise(function(fulfill, reject) {
//     if(true) {
//         fulfill(1);
//     }
//     reject();
// });
// async function fn(): Promise<number> {
//     var i= await p;
//     return i + 1;
// }
//fn() ===> Promise {<resolved>: 2}
// ***  await 关键字用来暂停代码 执行 直到 p 被 fulfilled
