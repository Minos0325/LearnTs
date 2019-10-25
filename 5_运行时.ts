// 项目的代码量越来越多、添加的功能越来越复杂时，可能会遇到 运行时（Runtime）的问题。
// TypeScript运行时 其实就是 JavaScript 的运行时。

// 编译 TypeScript 代码时，将会生成 JavaScript 代码，
// 然后在 服务端（使用Node.js） 或 客户端（浏览器）中 执行。
// 然后可能会遇到一些 运行时 问题。

// 话题：
    // 1、运行时环境
    // 2、事件循环
    // 3、this操作符
    // 4、原型
    // 5、闭包


// // // 环境
    // TypeScript开发应用前，运行时环境是 首先考虑到的事情。一旦编译完 TypeScript 代码，
    // 它可能会被不同的 JavaScript 引擎执行。主要有浏览器：Chrome， Firefox， Inter Explorer，
    // 有可能是在Node.js 或 RingoJS 环境中 运行的服务端程序 或 桌面应用。
    // 所以需要谨慎使用那些仅在特定环境中才可使用的变量，如：document.layers 变量。
    // document对象是 W3C 文档对象模型（DOM）标准中的 一部分， layers 只是Inter Explorer中特有变量， 并不属于  W3C DOM 标准。

        // W3C 对文档对象模型有如下定义：
        //     文档对象模型是用于动态访问和更新页面中视图结构的接口，它独立于平台 和 语言。
        //     模型的 数据可以被进一步处理和修改，并且修改会反映在当前视图中

        // BOM：和DOM类似， 浏览器对象模型（BOM） 也是一个仅在浏览器运行环境下特有的对象集合。
        //     BOM包含了 导航栏、历史记录、屏幕、 地址栏 和 文档 等窗口对象

        // DOM只存在浏览器中，不是JavaScript的一部分
        //     浏览器中运行 能访问到 DOM BOM ，在Node.js 或 RingoJS 这样的纯 JavaScript 环境中，它们是不存在的。
        //     服务器端的运行环境中，也存在一些浏览器中不能访问的对象（如：Node.js 中的 process.stdin）

    // 另外，还需要把同一 JavaScript 运行时的 不同版本考虑在内。如 兼容多个浏览器或多个版本的Node.js。
    // 处理这个问题的一个比较好的实践是添加一个逻辑，在使用特性前，先检测一下特性是否存在。

// **** 有一个库，可以帮助我们实现开发浏览器应用时的特性检测： Modernizr ****
    // 下载地址： http://modernizr.com/


// // // 运行时的一些概念
// TypeScript 的运行时环境（JavaScript） 有一个基于 事件循环 的 并发模型。
// 这个模型与 其他语言(如 C， java) 这样的编程语言中的模型不同。
//     *** 讨论事件循环前，必须了解一些其他的运行时概念 ***
    // 详细图见： 
    //     书P136

// ***** 关键运行时：堆(Heap) 栈(stack) 列队(queue) 帧(frame) *****
// 帧(frame):
    // 一个帧(frame) 是一个连续的工作单元。当一个JavaScript函数被调用时，运行时环境就会在 栈(stack) 中创建一个帧(frame)。 
    // 帧(frame) 里保存了特殊函数的参数 和 局部变量。当函数返回时，帧就被从 栈(stack) 中 推出。
    // 如：
        // function foo(b) {
        //     var a = 12;
        //     return a + b + 35;
        // }
        // function bar(x) {
        //     var m = 4;
        //     return foo(m * x);
        // }
        // bar(21);
    // 当 bar 被执行时，运行时将会创建一个 包含bar的参数和所有局部变量的 帧。这个 帧 被添加在了 栈 的顶部。
    // bar 函数在内部调用了 foo 函数。当 foo 函数被调用时。栈 顶部 又创建了一个新的帧。
    // 当 foo 函数执行完毕（foo 函数返回）后，栈 顶部 对应的帧 就会被移除。bar 函数也一样。
    // *** 如果 foo 函数内 再调用 bar函数，创建一个无限的 函数调用循环。每调用一次一个新的帧 就会被添加在 栈 的顶部。
    // *** 最终 栈被完全填满， 然后抛出一个错误————栈溢出错误


// 栈(stack)
    // 栈(stack)包含了一个信息在执行时的所有步骤（帧）。栈 的数据结构是一个后进先出的 对象集合。
    // 事件循环会从上至下 地处理栈中的帧。单帧所依赖的其他的帧，将会被添加到此帧上面，以保证他从栈中可以获取到所需的依赖信息。

// 列队(queue)
    // 列队(queue)中包含一个 待执行信息 的列表，每个信息都与一个函数相互联系。
    // 当 栈 为空时，队列中的一条信息就会被取出 并被 处理。
    // 处理的过程为 调用该信息 所关联的函数， 然后将此帧添加到 栈的顶部，当栈再次为空时，本次信息处理视为结束。

// 堆(Heap)
    // 堆(Heap)是一个内存存储空间，它不关注内部存储的内容的保存顺序。堆中保存了所有正在被使用的变量和对象。
    // 同时也保存了一些当前作用域已经不再会被用到，但还没有被垃圾回收的帧。\

// 事件循环
    // 并发：是指同一时间有两个 或更多的操作一起执行。不过由于运行时执行在一个 单线程中，所以意味着我们并不能达到真正意义上的并发。
    // 事件循环内的信息 是 线性执行的。这意味着它接收到一个信息后，处理完毕前不会再处理其他任何信息。
    // *** 如 第三章 文件中说明的， 可以使用 yield 和 生成器 函数 来暂停一个函数。
    // 当一个函数被调用，列队中就会加入一个新的信息。如果栈是空的，那么函数就会立即执行（即 标识该函数的帧 被 添加到了 栈 中）。
    // 当多有的帧都被加入栈中后，栈便开始从上至下地一个个清除（执行）这些帧。最后栈会被清空，然后下一个信息将会被处理。
    // *** HTML5标准中的 web worker 可以在不同的线程内处理后台任务。它们各自拥有自己的队列、堆、栈。

    // 优点
        // 使用事件循环的一个好处是，执行顺序是非常容易预测且容易跟踪的。
        // 另一个好处就是，在事件循环内可以进行非阻塞 I/O 操作。
            // 这意味着当一个应用在等待I/O操作的执行结果时，它还可以处理其他事情，比如：处理用户输入。

    // 缺点
        // 当一个信息需要大量时间来处理时，应用会变得无响应。一个好的做法是， 保持每个信息处理尽量简短。
        // 可能的话，将一个信息函数分割为多个小函数。

// this操作符：
    // JavaScript中的 this 比较特殊，它的值通常 由它所属的函数 被 调用的方式来决定。
    // 它的值 不能 在执行时通过赋值操作来设置，并且 同一个函数 以不同方式被调用， 其this值也都可能会不同。
    // *** this操作在严格模式下 与 非严格模式下 变现不同，
    // *** 详情见 https;//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode

    // 全局上下文中的 this 操作符
        // 在 全局上下文中的 this 操作符总是指向 全局对象----window
        // this === window  //true
    // 函数上下文中的 this 操作符
        // 1、函数内的 this 操作符的值 由 函数被调用的方式来决定
            // 例1
                // 非严格模式下
                    // function f1() { return this; }        // window
                    // f1() == window                        // true
                    // this指向 全局 window
                // *** 注 在严格模式中 上面的 this 会指向 undefined;
                // 严格模式下
                    // function f2() { "use strict" return this; }        // 未定义
                    // console.log(f2());                                 // 未定义
                    // console.log(this);                                 // window
            
        // 2、如果函数以实例的方法的形式被调用， this操作符将会指向该实例。
        // 换句话说，调用一个类的成员方法，那么this操作符的值将指向该类：
            // 例1 ------字面量
                // var p = {
                //     age : 37,
                //     getAge : function () {
                //         return this.age;            // this 指向 类实例（p）
                //     }
                // }
                // console.log(p.getAge());            // 37
            // 例2 ------原型链
                // function Person() {};
                // Person.prototype.age = 37;
                // Person.prototype.getAge = function() {
                //     return this.age;
                // }
                // var p = new Person();
                // console.log(p.getAge());            // 37
            // *** 当一个函数作为构造函数（使用new 关键字）调用时， this操作符将指向正在被构造的对象。
            // *** 原型链上的 也是一样
            // 例3 ------构造函数
                // function Person() {
                //     this.age = 37;
                // }
                // Person.prototype.getAge1 = function() {
                    //     return this.age;
                    // }
                // var p = new Person();
                // console.log(p.age);                      // 37
                // console.log(p.getAge1());                // 37


// call apply bind 方法
    // 所有函数都从 Function.prototype 中继承了 call apply bind 方法。
    // 可以使用call apply bind 方法 来设置 函数内部 this 操作符的值。
    // call 与 applay 相似,但是 接收的值 call:为单个的, apply: 为数组。
    // bind方法返回的是新的函数，修改了就不能再被覆盖。
    // *** 一般来讲 不推荐使用 call apply bind 方法。以免增加阅读难度。
    // 例：
        // class Person {
        //     public name: string;
        //     public surname: string;

        //     constructor(name: string, surname: string) {
        //         this.name = name;
        //         this.surname = surname;
        //     }
        //     public greet(city: string, country: string) {
        //         var msg = `Hi, my name is ${this.name} ${this.surname}.`;
        //         msg+= `I'm from ${city}(${country})`;
        //         console.log(msg);
        //     }
        // }
        // var p = new Person('remo', 'jansen');
        // p.greet('Seville', 'Spain');
        // var  valueOfThis = {name: 'anakin', surname: 'skywalker'};
        // // var greet = p.greet.call(valueOfThis,11111,22222);
        // // var greet = p.greet.apply(valueOfThis,[33333,44444]);
        // // **** bind ****
        // // var greet = p.greet.bind(valueOfThis,11111,22222);
        // // var greet = p.greet.bind(valueOfThis); // 正确使用方式
        // // greet.call(valueOfThis, 888.999);
        // // greet.apply(valueOfThis, 777,666);
    

// 原型
    // JavaScript运行时的继承系统使用的是原型继承模型，在一个继承模型中，并没有类。对象直接继承自对象。
    // 但是，可以使用原型来模拟对象。
    // 在运行时，几乎所有的JavaScript对象都有一个内部名为prototype的属性，这个属性的值是一个对象。
    // 这个对象中包含了一些属性（数据）和方法（行为）。
    
    // *** 在TypeScript中，使用基于类的继承系统。
    // class Person {
    //     public name: string;
    //     public surname: string;
    //     public age: number = 0;
    //     constructor(name: string, surname: string) {
    //         this.name = name;
    //         this.surname = surname;
    //     }
    //     greet() {
    //         var msg = `Hi! my name is ${this.name} ${this.surname}`;
    //         msg+= `I'm ${this.age}`;
    //     }
    // }
    // *** 在JavaScript中，使用原型
    // var Person = /** @class */ (function () {
    //     function Person(name, surname) {
    //         this.age = 0;
    //         this.name = name;
    //         this.surname = surname;
    //     }
    //     Person.prototype.greet = function () {
    //         var msg = "Hi! my name is " + this.name + " " + this.surname;
    //         msg += "I'm " + this.age;
    //     };
    //     return Person;
    // }());
    // *** TypeScript 编译器使用一个 立即调用函数表达式 包装了 一个对象声明（这里我们不将他称为类，因为他不是类）。
    // *** 在立即调用函数表达式的内部，有个Person的函数，与 TypeScript中的构造函数类似。其用来创建Person的新实例。

// 实例属性 和 类属性 的对比
    // 由于JavaScript是动态编程语言，可以再运行时为一个实例添加属性和方法，
    // 并且他们 不必为（是） 对象（类）声明中的一部分。
    // *** 在 构造函数中 this 指向的 是 对象的 原型对象。即prototype属性上定义的实力属性 ***
    // 例1---实例属性
    // function Person(name, surname) {
    //     // 实例属性
    //     this.anme = name;
    //     this.surname = surname;
    // }
    // var me = new Person('aaa', 'bbb');
    // me.email = 'minos0324@gmail.com';
    // for(var prototype in me) {
    //     console.log('prototype: ' + prototype+ ', value: '+me[prototype]);
    // }
    // // prototype: anme, value: aaa
    // // prototype: surname, value: bbb
    // // prototype: email, value: minos0324@gmail.com
    // *** 实例属性： 每个实例 都有自己各自的值。
    // 例2---实例属性
    // function Person() {
    // }
    // Person.prototype.name = "minos";
    // Person.prototype.surname = 'kami';
    // var me = new Person();
    // for(var prototype in me) {
    //     console.log('prototype: ' + prototype+ ', value: '+me[prototype]);
    // }
    // *** 在 构造函数中 this 指向的 是 对象的 原型对象。即prototype属性上定义的实力属性 ***
    
    // *** 还可以声明类的 属性 和 方法，他们之间的主要却别在于，类的属性和方法的值是在他的实例间共享的。
    // **** 类的 属性 和 方法 有时也被称为 静态属性 和 静态方法。
    // **** 类方法 常常被作为工具函数使用，为其提供参数，经过计算，返回一个结果。
    // 例3---类属性
        // function MathHelper() {
        //     /* ... */
        // }
        // // 类属性
        // MathHelper.PI = 3.14159265349;
        // // 类方法
        // MathHelper.areaOfCircle = function(radius) {
        //     return radius*radius*this.PI;   //类方法 访问 类属性
        // }
        //*** 注
            // 可以在 实例方法中 访问 类属性，
            // 但 不能在 类属性 或 类方法中 访问 实例属性 或 实例方法。
            // 如：
                // function MathHelper() {
                //     this.PI = 3.14159265349;  // 实例属性
                // }
                // MathHelper.areaOfCircle = function(radius) {
                //     return radius*radius*this.PI;   //类方法 访问 实例属性 this.PI  undefined;
                // }
                // var a = new MathHelper();
                // MathHelper.areaOfCircle(123);        //NaN

            // 当需要从实例方法中访问 类属性 或 类方法时，可以使用原型的 constructor 属性来取得它们。
            // 如：
                // function MathHelper() {
                //     /* ... */
                // }
                // // 类属性
                // MathHelper.PI = 3.14159265349;
                // // 实例方法
                // MathHelper.prototype.areaOfCircle = function(radius) {
                //     return radius*radius*this.constructor.PI;   //实例方法 访问 类属性
                // }
                // var m = new MathHelper();
                // m.areaOfCircle(5);              // 78.53981633725
            // 详解：
                // 原型 constructor 属性返回了 对象的构造函数 的引用， 在areaOfCircle（实例方法中），通过原型访问到PI（类属性）；
                // areaOfCircle 方法中，this 操作符返回了 对象原型 的 引用；
                // this === MathHelper.prototype;      // true
                // 推断出： this.constructor 等于 MathHelper.prototype.constructo。  MathHelper.prototype.constructor 等于 MathHelper。


// 基于原型的继承
    // extends 如何工作
    // TypeScript
        // class Person {
        //     public name: string;
        //     public surname: string;
        //     public age: number = 0;
        //     constructor(name: string, surname: string) {
        //         this.name = name;
        //         this.surname = surname;
        //     }
        //     greet() {
        //         var msg = `Hi! my name is ${this.name} ${this.surname}`;
        //         msg+= `I'm ${this.age}`;
        //     }
        // }
        // class SuperHero extends Person {
        //     public superpower: string;
        //     constructor(name: string, surname: string, superpower: string) {
        //         super(name, surname);
        //         this.superpower = superpower;
        //     }
        //     useSuperPower() {
        //         return `I'm using my ${this.superpower}`;
        //     }
        // }
    // JavaScript
        // var __extends = (this && this.__extends) || (function () {
        //     var extendStatics = function (d, b) {
        //         extendStatics = Object.setPrototypeOf ||
        //             ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        //             function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        //         return extendStatics(d, b);
        //     };
        //     return function (d, b) {
        //         extendStatics(d, b);
        //         function __() { this.constructor = d; }
        //         d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        //     };
        // })();
        // var Person = /** @class */ (function () {
        //     function Person(name, surname) {
        //         this.age = 0;
        //         this.name = name;
        //         this.surname = surname;
        //     }
        //     Person.prototype.greet = function () {
        //         var msg = "Hi! my name is " + this.name + " " + this.surname;
        //         msg += "I'm " + this.age;
        //     };
        //     return Person;
        // }());
        // var SuperHero = /** @class */ (function (_super) {
        //     __extends(SuperHero, _super);
        //     function SuperHero(name, surname, superpower) {
        //         var _this = _super.call(this, name, surname) || this;
        //         _this.superpower = superpower;
        //         return _this;
        //     }
        //     SuperHero.prototype.useSuperPower = function () {
        //         return "I'm using my " + this.superpower;
        //     };
        //     return SuperHero;
        // }(Person));

    // *** 重点 ***
        // 详细
            // var __extends = (this && this.__extends) || (function () {
            //     var extendStatics = function (d, b) {
            //         extendStatics = Object.setPrototypeOf ||
            //             ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            //             function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            //         return extendStatics(d, b);
            //     };
            //     return function (d, b) {
            //         extendStatics(d, b);
            //         function __() { this.constructor = d; }
            //         d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            //     };
            // })();
        // 简化
                // var __extends = this.__extends || function (d, b) { 
                //     for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; 
                //     function __() { this.constructor = d; }
                //     __.prototype = b.prototype;
                //     d.prototype = new __();
                // };

        // 详解:
            // 1、函数第一次执行完毕之前，this指向全局对象，那时他没有一个名为 __extends 的方法，__extends 为 undefined
                // console.log(this.__extends);     //undefined;
            // 2、当函数第一次被执行完毕后，函数表达式（即这个匿名函数）的值被保存在了全局对象的 __extends属性中。--（内部的匿名函数）;
                // console.log(this.__extends);     //extends(n, e, t);
            // 3、TypeScript每次检测到extends 关键字时就会生成一个函数表达式。但是他仅仅只会被执行一次（当__extends 变量是 undeafined时）;
                // var __extends = this.__extends || function (d, b) { ......
                // 只会赋值一次
            // 4、匿名函数接收两个名为 d 和 b 的参数。当调用时，必须提供一个子类对象构造函数（d） 和 父类对象构造函数（b）
                // for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];  // 父类的属性方法给子类。
            // 5、for...in... 
                // 给 对象实例使用：迭代对象的 实例属性
                // 给 一个对象的构造函数 使用：会迭代 类属性
            // 6、为了继承 实力属性， 复制对象的原型。
            // 7、第三行 声明了一个 名为 __ 的新构造函数。在它内部，this操作符被用来访问它的原型。
                // function __() { this.constructor = d; }; // 返回对象构造函数的引用。 __ 对象的构造函数被赋值为 子类对象（d）的构造函数。                   
            // 8、父类对象构造函数的原型，被赋值给了 __ 对象构造函数的原型。
                // __.prototype = b.prototype;
            // 9、最后一行，调用new __(),其结果被赋值给了子类（d）的原型。
                // d.prototype = new __();

        // 使用
            // var instance = new d();
    // *** 经过以上步骤后我们得到了 一个 包含子类（d） 和 父类（b）的所有属性的对象。
    // var superHero = new SuperHero();
    // superHero instanceof Person;            // true
    // superHero instanceof SuperHero;         // true
        // 使用详解 编译：
            // var SuperHero = /** @class */ (function (_super) {
            //     __extends(SuperHero, _super);
            //     function SuperHero(name, surname, superpower) {
            //         var _this = _super.call(this, name, surname) || this;
            //         _this.superpower = superpower;
            //         return _this;
            //     }
            //     SuperHero.prototype.useSuperPower = function () {
            //         return "I'm using my " + this.superpower;
            //     };
            //     return SuperHero;
            // }(Person));

    // *** 函数提升： 函数表达式不会被提升，当将函数赋值给一个变量时，变量名会被提升，但它的值（函数背身）不会被提升。

// 原型链
    // 当尝试访问一个对象的属性或方法时，运行时将会搜索对象自身原型上的属性和方法，如果没有找到，那么运行时将会继续沿着对象继承树，
    // 在被继承的对象的原型中继续搜索，由于父类对象通过原型链接了子类，我们称这种继承树为原型链。

    // 原型遮蔽(property shadowing)：如果父类 子类 有 同名方法则会访问到子类 原型 上的 方法。

// 访问对象的原型
    // 三种方式
    // 1、Person.prototype: 直接使用prototype属性来访问原型。
    // 2、Person.getPrototypeOf(person): 使用getPrototypeOf函数来访问一个实例对象的原型。
    // 3、person.__proto__: 这个属性暴露对象内部可访问的原型属性。
    // ***  __proto__ 属性已被ES6 标准语言收录，可能高版本中支持，但目前性能不高，不建议使用。

// new操作符
    // 使用new操作符生成一个类的实例
    // var p = new Person();
    // 运行时不会遵从基于类的继承模型。使用new操作符时，运行时会创建一个新对象，并让其继承自 Person类的原型。
    // 可以认为运行时（JavaScript）的new 操作符行为和程序设计阶段（TypeScript）的extends关键字行为没有区别。

// 闭包
    // 闭包是 最强大的运行时特性之一。但同时它也是被误解的最多的。
    // Mozilla开发者文档对闭包的定义：
        // 闭包是指向独立变量的函数。换句话说，在闭包中定义的函数会‘记住’它创建时的环境。
    // 可以将 独立变量 理解为： 在我们创建的 字面量作用域上 持续存在的变量。
    // 如：
        // function makeArmy() {
        //     var shooters = [];
        //     for(var i= 0; i< 10; i++) {
        //         var shooter = function() {          // 一个shooter即一个函数
        //             alert(i);                       // 将弹出一个数字
        //         }
        //         shooters.push(shooter);
        //     }
        //     return shooters;
        // }
        // var army = makeArmy();
        // army[0]();      // 10 (期望值为 0);
        // army[5]();      // 10 (期望值为 5);
    // 详解：
        // 在makeArmy中声明一个 shooter函数时，创建了一个闭包。
        // shooter函数它们包含自身函数定义并保存了makeArmy的作用域环境，shooters数组中有10个闭包，但它们共享一个环境。
        // 当shooter函数执行时，函数中的循环已经执行完毕， i 变量的值也变成10。
    // 解决办法：
        // 1、使用更多的闭包--不在简单的共享一个环境，而是使用一个自执行函数创建一个新的作用域环境。
        // function makeArmy() {
        //     var shooters = [];
        //     for(var i= 0; i< 10; i++) {
        //         (function(i) {
        //             var shooter = function() {          // 一个shooter即一个函数
        //                 alert(i);                       // 将弹出一个数字
        //             }
        //             shooters.push(shooter);
        //         })(i)
        //     }
        //     return shooters;
        // }
        // var army = makeArmy();
        // army[0]();      // 0
        // army[5]();      // 5

// 闭包 和 静态变量
    // 当一个变量在一个闭包环境中被声明后，它可以在一个类的不同实例间共享，换句话说，这个变量表现的像一个静态变量。
    // 创建一个表现的像静态变量的属性 和 方法。
    // TypeScript
        // class Counter {
        //     private static _COUNTER = 0;
        //     constructor() {}
        //     private _changeBy(val) {
        //         Counter._COUNTER += val;
        //     }
        //     public decrement() {
        //         this._changeBy(-1);
        //     }
        //     public increment() {
        //         this._changeBy(1);
        //     }
        //     public value() {
        //         return Counter._COUNTER;
        //     }
        // }
    // JavaScript
        // var Counter = /** @class */ (function () {
        //     function Counter() {
        //     }
        //     Counter.prototype._changeBy = function (val) {
        //         Counter._COUNTER += val;
        //     };
        //     Counter.prototype.decrement = function () {
        //         this._changeBy(-1);
        //     };
        //     Counter.prototype.increment = function () {
        //         this._changeBy(1);
        //     };
        //     Counter.prototype.value = function () {
        //         return Counter._COUNTER;
        //     };
        //     Counter._COUNTER = 0;
        //     return Counter;
        // }());
    // 静态属性被编译成了 类属性，而不是实例属性。编译器之所以使用类属性是因为他被所有实例共享。
    // 或者使用下面代码
        // var Counter = /** @class */ (function () {
        //     // 闭包上下文
        //     var _COUNTER= 0;
        //     function changeBy(val) {
        //         _COUNTER += val;
        //     };
        //     function Counter() { };
        //     Counter.prototype.decrement = function () {
        //         changeBy(-1);
        //     };
        //     Counter.prototype.increment = function () {
        //         changeBy(1);
        //     };
        //     Counter.prototype.value = function () {
        //         return _COUNTER;
        //     }
        //     return Counter;
        // })();
    // 单例模式使一个对象可以像静态变量一样被声明，避免了每次使用都创建它的单例。
    // 因此这个对象的实例被应用中的所有组件所共享。
    // 单例模式常在一些如 每一个的实例都不必是相互唯一、设置应用的全局状态等场景下使用。

    // // 使用
    //     var counter1 = new Counter();
    //     var counter2 = new Counter();
    //     console.log(counter1.value());  // 0
    //     console.log(counter2.value());  // 0
    //     counter1.increment();
    //     counter1.increment();
    //     console.log(counter1.value());  // 2 
    //     console.log(counter2.value());  // 2    期望值为 0
    //     counter1.decrement();           // 1
    //     console.log(counter1.value());  // 1 
    //     console.log(counter2.value());  // 1    期望值为 0

// 闭包 和 私有成员
    // 闭包函数 可以访问到 在创建的字面量作用域上 持续存在的变量。
    // 这些变量并不是函数原型 或 函数体中的 一部分，但它们是闭包上下文 中的一部分。

    // * 由于我们不可以直接访问闭包上下文，那么该上下文中的变量 和 成员 就可以用来模拟私有成员。
    // * 使用闭包来迷你私有成员，而不是使用（TypeScript的private描述符）的主要好处是---闭包会在运行时阻止对它们的访问。
    
    // * TypeScript在运行时 并不会模拟私有变量，如果视图访问私有变量，TypeScript会在编译时 抛出错误。
    // * TypeScript由于性能原因，并没有在运行时使用闭包模拟私有成员。无论是否使用private描述符，生成的JavaScript代码都不会有变化。
    // * 这意味着在运行时，私有变量变成了公开成员。
    // * 但是，使用闭包在运行时模拟私有变量是可行的。可以使用纯 JavaScript来完成成员可见性控制。
    // 如：
    // function makeCounter() {
    //     var _COUNTER = 0;
    //     function changeBy(val) {
    //         _COUNTER += val;
    //     }
    //     function Counter() { };
    //     Counter.prototype.increment = function() {
    //         changeBy(1);
    //     }
    //     Counter.prototype.decrement = function() {
    //         changeBy(-1);
    //     }
    //     Counter.prototype.value = function() {
    //         return _COUNTER;
    //     }
    //     return new Counter();
    // }
    // // 使用
    //     var counter1 = makeCounter();
    //     var counter2 = makeCounter();
    //     console.log(counter1.value());  // 0
    //     console.log(counter2.value());  // 0
    //     counter1.increment();
    //     counter1.increment();
    //     console.log(counter1.value());  // 2 
    //     console.log(counter2.value());  // 0    期望值为 0
    //     counter1.decrement();           // 1
    //     console.log(counter1.value());  // 1 
    //     console.log(counter2.value());  // 0    期望值为 0
    // 详解
        // makeCounter函数调用时，一个新的闭包上下文即被创建，所有每个实例都有独立的上下文。

    // 由于闭包上下文 不能 直接被访问到，我们可以说 变量_COUNTER 和 函数changeBy 是 私有成员。
    // console.log(counter1._COUNTER);  // undefined
    // counter1.changeBy(2);           // changeBy 并不是一个函数
    // console.log(counter1.value());    // 1
