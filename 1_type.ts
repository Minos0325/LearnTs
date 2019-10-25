// // // 类型
//--------------------------------------------------
// 可选的静态类型声明可以约束 函数、变量、属性 等程序实体。
// 强类型特性让程序员对自己和其他开发团队人员 在代码中表达他的意图。
// TypeScript的类型检测在编译期进行并且没有运行时开销。

//// 可选静态类型声明
// TypeScript允许我们明确的声明一个变量的类型。
// 这种允许声明变量类型的功能即--可选静态类型声明
// 如：
    // 未知（any）类型
    var counter;
    // number类型--推断出的
    var counter1= 0;
    // number类型
    var counter2 : number; 
    // number类型
    var counter3 : number = 0;

// 其中 var counter1= 0; 这种类型被自动推测出来的过程为 类型推导（type inference），一个类型无法被推测时，特殊类型any 会作为其类型

//--------------------------------------------------
//// 变量、基本类型、运算符
// 基本类型有: boolean number string array void enum.
// 上述类型在TypeScript中都是一个唯一的顶层的Any Type类型的子类型，
// any关键字代表这种类型

// TypeScript中不能将 null undefined 作为类型使用 以下错误
// var Test1 :null;  //错误，类型错误
// var Test2 :undefined;    //错误，找不到undefined

// var let 和 const
// 使用var 声明的变量保存在最近的函数作用域中，如果不在任何函数中则在全局作用域中
// 使用let 声明的变量保存在最近的比函数作用域小的块作用域中，若果不在任何块作用域中则在全局作用域中。
// const 关键字会创建一个保存在创建位置作用域中的常量，可以使全局作用域也可以是块作用域， 这表明const是块作用的

// 联合类型
// TypeScript 允许声明联合类型
var path : string[] | string;
// 联合类型用于声明可以存储多种类型值得变量

// 类型守护
// 可以再运行时使用 typeof instanceof 运算符对类型进行验证。
// TypeScript语言服务将会在if区域寻找这些运算符，软后对应的更改类型。
var x: any = { foo: function() { console.log('foo')}}
if(typeof(x) == 'string') {
    console.log('string');
    // console.log(x.splice(3,1)); //错误-string上不存在split方法
}
x.foo();

// 类型别名
// TypeScript中允许使用 type 关键字 声明类型别名---在大型应用中可能会导致一些覆盖问题
type PrimitiveArray = Array<string| number| boolean>;
type myNumber= number;
// type NgScope= ng.IScope;
type CallBack= ()=> void;
var Test3: PrimitiveArray = [1,2,'a', false];
// var Test4: aaa = [123]

// 环境声明-declear
// 环境声明 允许在TypeScript 代码中创建一个不会被编译到 JavaScript中的变量。
interface ICustomConsole {
    log(arg: string): void;
}
declare var customConsole: ICustomConsole;
customConsole.log('123');

// 算数运算符
// + - * / % ++ -- == === != !== > < >= <=
// 逻辑运算符
// && || ！  与 或 非
// 位运算符---火候不到不打算使用
var A= 1;
var B= 3;
console.log(A & B);
// 复制运算符
// =  +=  -=  *=  /=  %=

// // 流程控制
    // 单一选择结构 if
    // 双选择结构 if...else
    // 三元操作符 ?
    // 多选结构 switch() { case: break; default： break; }

    // 语句在顶部进行判断的循环 while
    // 语句在底部进行判断的循环 do...while 
    
    // 迭代对象的属性 for...in
    // 计数器控制循环 for

// // 函数
    // 具名函数 
    function fn1 () {};
    // 匿名函数
    var fn2 = function() {};
    // 箭头函数 : 可以作为类型   并且箭头函数会改变指针机制
    var fn3 = ()=>{};
    var fn4: ()=>void = ()=>{};


// // 类
class Character {
    fullname: string;
    constructor(firstname: string, lastname: string) {
        this.fullname = firstname+' '+lastname;
    }
    greet(name?: string) {
        if(name) {
            return 'Hi!' + name + '! my name is '+ this.fullname;
        } else {
            return 'Hi! my name is '+ this.fullname;
        }
    }
}
var spark= new Character('Jacob', 'Keyes');
var msg = spark.greet();
alert(msg);
var msg1 = spark.greet("Dr. Halsey");
alert(msg1);

// 注： 所有属性和方法默认都是公共的

// // 接口
// 使用接口 来 确保拥有指定的结构--类  对象
interface LoggerInterface {
    log(arg: any) : void;
}
class Logger implements LoggerInterface {
    constructor() {}
    log(arg) {
        if(typeof console.log === 'function') {
            console.log(arg);
        } else {
            alert(arg);
        }
    }
}
// 使用接口来约束对象
interface UserInterface {
    name: string;
    password: string;
}
var user : UserInterface = {
    name: 'Minos',
    password: "papillon999"
}

// // // 命名空间
    // 命名空间 又被称为 内部模块。 被用于住址一些具有某些内在联系的 特性 和 对象
    // 命名空间 能够使 代码结构 更清晰， 可以使用 namespace 和 export 关键字 在TypeScript中声明命名空间
    // 没有被 export 出的接口 在外部 不能访问到。
// namespace Geometry {
//     interface VectorInterface {}
//     export interface Vector2dInterface {}
//     export interface Vector3dInterface {}
//     export class Vector2d implements VectorInterface, Vector2dInterface {}
//     export class Vector3d implements VectorInterface, Vector3dInterface {}
// }

// var vector2dInterface: Geometry.Vector2dInterface = new Geometry.Vector2d();
// var vector3dInterface: Geometry.Vector3dInterface = new Geometry.Vector3d();


// 综合运用  模块 类 函数 类型注解

module Geometry {
    export interface Vector2dInterface {
        toArray(callBack: (x: number[])=>void) : void;
        length(): number;
        normalize();
    }
    export class Vector2d implements Vector2dInterface {
        private _x: number;
        private _y: number;
        constructor(x: number, y: number) {
            this._x = x;
            this._y = y;
        }
        toArray(callBack: (x: number[])=> void): void {
            callBack([this._x, this._y])
        }
        length(): number {
            return Math.sqrt(this._x * this._x + this._y * this._y);
        }
        normalize() {
            var len = 1 / this.length();
            this._x *= len;
            this._y *= len;
        }
    }
}
var vector: Geometry.Vector2dInterface = new Geometry.Vector2d(2,3);
vector.length();