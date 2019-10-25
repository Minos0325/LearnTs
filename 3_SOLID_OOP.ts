// // 阶段1
// SOLID 原则
// 类
// 关联、聚合 和 组合
// 继承
// 混合
// 泛型类
// 泛型约束
// 接口

// // 阶段2
// 命名空间（内部模块）
// 外部模块
// 异步模块定义
// CommonJS模块
// ES6 模块
// Browserify和通用模块定义
// 循环依赖

// // // SOLID原则
// 单一责任原则（SRP）：表明软件组件（函数、类、模块）必须专注于单一的任务（只有单一的职责）。
// 开/闭原则（OCP）：表明软件设计时必须时刻考虑到（代码）可能的发展（具有扩展性），但是程序的发展必须最少地修改已有的代码（对已有的修改封闭）。
// 里氏替换原则（LSP）：表明只要继承的是同一个接口，程序里任意一个类都可以被其他的类替换。在替换完成后，不需要其他额外的工作程序就能像原来一样运行。
// 接口隔离原则（ISP）：表明我们应该将那些非常大的接口（大而全的接口），拆分成一些小的更具体的接口（特定客户端接口），这样客户端就只需关心他们需要用到的接口。
// 依赖反转原则（DIP）：表明一个方法应该 遵从 依赖于抽象（接口） 而不是一个实例（类）的概念。


// **** 类
// ***************************未优化
// class Person {
//     public name: string;
//     public surname: string;
//     public email: string;
//     constructor(name: string, surname: string, email: string) {
//         this.name = name;
//         this.surname = surname;
//         if(this.validateEmail()) {
//             this.email = email;
//         } else {
//             throw new Error("Invalid email！");
//         }        
//     }
//     greet() {
//         alert('hi');
//     }
//     validateEmail() {
//         var re = /\S+@\S+\/\S+/;
//         return re.test(this.email);
//     }
// }
// var me : Person= new Person('Remo', 'Jansen', 'remo.jansen@wolksoftware.com');
// 注： Person 类：当一个类不遵循SRP，知道了太多的事情（拥有太多属性）或做了太多事情（拥有太多方法），
// 我们称这种对象为God对象。 这里的Person对象就是一个God对象
// 因为我们增加了一个和Person类行为并无关联的 validateEmail 方法
// ***** 决定一个属性 或 方法 能不能成为一个类的一部分， 在某种意义上是一种 主观的抉择。

// *******************已优化
// class Email {
//     private email: string;
//     constructor(email: string) {
//         if(this.validateEmail(email)) {
//             this.email = email;
//         } else {
//             throw new Error("Invalid email！");
//         }
//     }
//     private validateEmail(email: string) {
//         var re = /\S+@\S+\/\S+/;
//         return re.test(email);
//     }
//     get(): string {
//         return this.email;
//     }

// }
// class Person {
//     public name: string;
//     public surname: string;
//     public email: Email;
//     constructor(name: string, surname: string, email: Email) {
//         this.name = name;
//         this.surname = surname;
//         this.email = email;
//     }
//     greet() {
//         alert('hi');
//     }
    
// }
// var me : Person= new Person('Remo', 'Jansen', new Email('remo.jansen@wolksoftware.com'));
// // 当我们提升一个对象的抽象等级时， 可以说成实在 封装这个对象的 数据和行为， 封装也被称为信息隐藏。

// // // 接口
// 在传统的面向对象概念中，一个类可以扩展另一个类，也可以实现一个或多个接口。
// 一个接口 可以实现 一个或多个 接口，但是 不能扩展 另一个类 或 接口。
// 维基百科对OOP中接口的定义： 在面向对象的语言中， 术语interface经常被用来定义一个 不包含数据和逻辑代码
// 但用函数签名定义了行为 的 抽象类型

//***在 TypeScript 中，接口并不是严格遵守上面提到的定义。 在TypeScript中 主要有两个点不同：
//     1、接口可以扩展 其他接口 或者 类
//     2、接口可以定义数据 和 行为 而不只是 行为 --属性 和 方法


// // // 关联 聚合 和 组合
// 在面向对象的概念中，类与类之间可以有一些关系。 三种： 关联 聚合 组合
// *** 关联
// 有联系但是他们的对象有独立的声明周期，并且没有丛书关系的类之间的关系 即为 关联 Association
// 如：
// 老师
// Teacher => students: Student[];
//         => teach(): void;
// 学生
// Student => teachers: Teacher[]; 
//         => learn(): void;
// n个学生 可以与 n个老师 存在关联关系，但他们都有自己的声明周期，都可以独立地创建和删除。

// ***聚合
// 有独立生命周期，但是有从属关系，并且子对象不能从属于其他对象的关系 即为 聚合 Aggregation
// 如:
// 手机
// CellPhone    => battery: CellBattery;
//              => ring(number: int): void;
// 电池
// CellBattery  => remainingEnergy: int;
//              => change(): void;
// 一块单独的电池可以属于一台手机，但是手机停止工作了，我们将它从数据库中删除，但电池并不需要删除，因为他可能还是可以用的。
// 所以在聚合关系中， 即使是从属关系，但对象间依然有独立的生命周期。

// ***组合
// 组合 Composition 是指 那些没有独立生命周期，父对象被删除后 子对象 也被删除的对象间的关系。
// 如：
// 问题
// Question    => title: string;
// 答案
// Answer      => question: Question;
// 一个问题可以有多个答案，并且一个答案不可以属于多个问题。如果删除了问题，答案将会被自动删除。
// 生命周期依赖 其他对象 的对象（例子中的答案） 也被称为 弱实体。

// 注： 有时候决定使用 关联、 聚合 还是 组合 是一个复杂的过程。 导致这一困难的原因是
// 聚合 和 组合 是关联的 子集
// 关联> 聚合> 组合


// // // 继承
// 面向对象编程 最重要的基本功能之一： 
    // 可以扩展已有的类， 这个功能被称为 继承 Inheritance
    // 它允许我们创建一个类（子类）， 从已有的类（父类）上继承所有的属性和方法。
    // 子类可以包含父类中没有的属性和方法
// 如：
// class Email {
//     private email: string;
//     constructor(email: string) {
//         if(this.validateEmail(email)) {
//             this.email = email;
//         } else {
//             throw new Error("Invalid email！");
//         }
//     }
//     private validateEmail(email: string) {
//         var re = /\S+@\S+\/\S+/;
//         return re.test(email);
//     }
//     get(): string {
//         return this.email;
//     }
// }
// class Person {
//     public name : string;
//     public surname : string;
//     public email: Email;
//     constructor(name: string, surname: string, email: Email) {
//         this.name = name;
//         this.surname = surname;
//         this.email = email;
//     }
//     greet() {
//         alert('hi');
//     }
//     private say() {
//         alert('say hello');
//     }
// }
// class Teacher extends Person{
//     teach() {
//         alert('teach');
//     }
// }
// // var p = new Person('1', '2', new Email('1'))
// var t = new Teacher('1', '2', new Email('1'));
// t.teach();
// *** 子类中 继承了 父类中一切 公有属性 和 方法

// 有时我们希望 子类 能提供 父类 中 同名方法的特殊实现。可以使用保留字 super 达到这个目的。
// *** 我们需要增加一个属性列出 老师教的科目 并且 想通过 Teacher类的构造函数 初始化这个属性。
// *** 可以再子类的构造函数中 使用super关键字 引用父类 的构造函数, 也可以在扩展已有方法时使用 super 关键字.
// *** 比如 greet 方法。
// *** 面向对象语言中， 这种允许子类提供父类已有方法的特殊实现的功能 被称作 方法重写。
// 子类中 的 super 可以理解为 想加载子类 name必须要将父类提前加载好 才能继承！！

// 如:
// ***********************继承案例-开始***********************
// class Email {
//     private email: string;
//     constructor(email: string) {
//         if(this.validateEmail(email)) {
//             this.email = email;
//         } else {
//             throw new Error("Invalid email！");
//         }
//     }
//     private validateEmail(email: string) {
//         var re = /\S+@\S+\/\S+/;
//         return re.test(email);
//     }
//     get(): string {
//         return this.email;
//     }
// }
// class Person {
//     public name : string;
//     public surname : string;
//     public email: Email;
//     constructor(name: string, surname: string, email: Email) {
//         this.name = name;
//         this.surname = surname;
//         this.email = email;
//     }
//     greet() {
//         alert('hi');
//     }
//     private say() {
//         alert('say hello');
//     }
// }
// class Teacher extends Person{
//     public subJects : string[];
//     constructor(name: string, surname: string, email: Email, subjects: string[]) {
//         super(name, surname, email);  // super 必须放在第一句
//         this.subJects= this.subJects;
        
//     }
//     teach() {
//         alert('teach');
//     }
//     greet() {
        // alert('teacher`s  greet');
        // super.greet()
//     }
// }
// // var p = new Person('1', '2', new Email('1'))
// var t = new Teacher('1', '2', new Email('1'), ["a", "b", "c"]);
// t.teach();

// 也可以声明 一个新的类 继承 一个已经继承了别的类的类
// 就比如 SchoolPrincipal类继承 Person类扩展而来的 Teacher 类
//SchoolPrincipal extends Teacher extends Person
// class SchoolPrincipal extends Teacher {
//     manageTeachers() {
//         alert('SchoolPrincipal`s manageTeachers()');
//     }
// }
// var sp = new SchoolPrincipal('1', '2', new Email('minosminos0324@hotmail.com'), ["a", "b", "c"])
// sp.manageTeachers();
// sp.greet();
// SchoolPrincipal 的实例 可以访问它 及 其父级 的所有 公有方法，属性（SchoolPrincipal，Teacher，Person）

// ***注意***
    // 不推荐由多层级的继承。一个位于 继承树上很深层的类 开发、测试和维护，在某种程度上非常复杂。
    // 继承树深度 DIT 应保持在 0 - 4 之间， 大于4时 将损害封装性 并增加 复杂度。

// ***********************继承案例-结束***********************

// // // 混合
// 有时，我们会认为声明一个同时继承两个 或多个类（被称作多重继承）的类是一个好想法
// 但是一个类不能实现多继承！！！！
// // 如:
//     // 动物
// class Animal {
//     eat() {
//         alert('eat');
//     }
// }
//     // 哺乳动物
// class Mammal extends Animal {
//     breathe() {
//         alert('breathe');
//     }
//     move() {}
// }
//     // 飞行动物
// class WingedAnimal extends Animal {
//     fly() {
//         alert('fly');
//     }
//     move() {}
// }
// ****严重问题****
// 蝙蝠类 想 即是 哺乳动物 又是 飞行动物 但只能继承一个类 下方直接报错。
//   继承树 会出现 钻石问题 的 设计模式 “◇”
// class Bat extends Mammal, WingedAnimal { 
//     // 。。。。
// }
    // 但是假如我们只是调用存在于继承树上其中一个类中的方法时，不会遇到问题
        // 如： bat.fly();  bat.eat(); bat.breathe();
    // 钻石问题出现在：当调用Bat类中的父类中都存在的方法时，哪个父类的方法被调用是说不清楚的或者说是存在歧义的。
    // 如 move 方法，我们不知道调用的是哪个父类的
// 所以引入了混合（Mixin）特性 来 替代 多重继承，但这个功能有一些限制
// ********************混合案例-开始********************
    // Mammal,WingedAnimal 类不再继承 Animal
        // 哺乳动物
    class Mammal {
        breathe() {
            return 'breathe';
        }
        move() {
            return 'Mammal move';
        }
    }
        // 飞行动物
    class WingedAnimal {
        fly() {
            return 'fly';
        }
        move() {
            return 'WingedAnimal move';
        }
    }
    class Bat implements Mammal, WingedAnimal { 
        breathe: ()=> string;
        fly: ()=> string;
        move: ()=> string;
    }
    // *** Bat 会实现 所有  Mammal, WingedAnimal 类中声明的功能，还增加了所有 Bat 类会实现的函数的签名
    function applyMixins(derivedCtor: any, baseCtors: any[]) {
        baseCtors.forEach(
            baseCtor => {
                Object.getOwnPropertyNames(baseCtor.prototype).forEach(
                    name => {
                        if(name != 'constructor') {
                            derivedCtor.prototype[name] = baseCtor.prototype[name];
                        }
                    }
                )
            }
        )
    }
    // 混合开始
    // applyMixins(Bat, [Mammal,WingedAnimal]);
    // 混合后使用 Bat.prototype 包含了 [Mammal,WingedAnimal] 的属性方法
    // Bat类 包含了  两个 父类中的所有属性和实现。
    // var b = new Bat();
    // b.fly();
    // b.breathe();
    

// 总结： 
    // 混合 是一种设计模式，如果实现的两个类中 有方法名相同应该是 取 最后的为准。
    // 限制：
        // 1、只能在继承树上继承一级的方法和属性， 父级 父级 无法继承。
        // 2、如果 父类中 多个属性 方法重名，只保留 baseCtors数组最后一个类中的同名方法。
// ********************混合案例-结束********************



// // // 泛型类



