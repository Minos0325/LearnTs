// // // 装饰器
// 注解 和 装饰器
    // 类装饰器
    // 方法装饰器
    // 属性装饰器
    // 参数装饰器
    // 装饰器工厂
    // 带有参数的装饰器
// 元数据反射 API

// 代码见文件夹 8ZSQ

// 步骤：
// npm init 
// npm install --save-dev gulp gulp-typescript typescript
// npm install --save reflect-metadata

// 创建gulpfile.js文件 添加编译代码的任务。


// // 注解 和 装饰器
    // 注解：是一种为类声明添加元数据的方法。然后元数据可以被诸如依赖注入容器这样的工具所使用。
        // 注解的API最早由Google的AtScript团队提出，但注解 最终并没有成为语言标准。
    // 装饰器： 由 Yehuda Katz提出，已是 ECMAScript7标准的特性。
        // 它用来在代码的设计时 注释和修改 类和类的属性。

// 注解 和 装饰器 在外观上十分相似。
    // 它们有相同的的语法。
    // 唯一的区别就是：
        // 在使用 注解 时，不用去关心它是如何将元数据加入到代码里来的。
        // 装饰器 则更像 一个借口，用来构建一个以注解功能结尾的东西。
// *** 目前主要关注装饰器，因为他是语言标准， AtScript 是 TypeScript 和 TypeScript实现的装饰器的结合。

// 装饰器：
    // 可供使用的 装饰器 一共4种，它们分别来装饰： 类 属性 方法 参数
    // 案例：
    @logClass            // 类装饰器
    class Person {
        @logProperty
        public name: string;
        public surname: string;
        constructor(name: string, surname: string) {
            this.name = name;
            this.surname = surname;
        }
        // @logMethod          // 方法装饰器1
        @readMetadata       // 方法装饰器2---参数装饰器同用
        public saySomething(@addMetadata something: string) {
            return this.name + ' ' + this.surname + 'says:' + something;
        }
    }

// ************************************************************************
// 类装饰器：是指接受一个类的 构造函数 作为参数 的函数，并返回 undefined 、 参数中提供的构造函数 或 一个新的构造函数。
    // 返回 undefined 等同于 返回 参数中提供的构造函数。
        // 案例1
            // function logClass(target: any) {
            //     console.log(11111);
            // }
            // var a = new Person('1', '2');
        // 案例2
            function logClass(target: any) {
                // 保存原构造函数
                var original = target;
                // 用来生成 类的实例 的工具方法
                function construct(constructor, args) {
                    var c: any = function() {
                        return constructor.apply(this, args);
                    }
                    c.prototype = constructor.prototype;
                    return new c();
                }
                
                // 新的构造函数行为
                var f: any = function (...args) {
                    console.log("New："+ original.name);
                    return construct(original, args);
                }
                // 复制原型， 使 instanceof 操作符能正常使用
                f.prototype = original.prototype;
                // 返回 新的构造函数（将覆盖原构造函数）
                return f;
            }
            // var a = new Person('1', '2');
// ************************************************************************

// ************************************************************************
// 方法装饰器：是一个接受3个 参数的 函数： 包含：
    // 这个属性的对象、 即 Person.prototype
    // 属性名（一个字符串或一个符号）、
    // 一个可选参数（属性的描述对象） 即 Object.getOwnPropertyDescriptor(Person.prototype, saySomething)
// 这个函数会返回 undefined、参数里提供的属性描述对象 或 一个新的属性描述对象。
    // 返回 undefined 等同于 返回参数里 提供的属性描述对象
// **** 方法装饰器 和 类装饰器 十分相似，但它不是用来覆盖类的构造函数的，
// **** 而是用来覆盖类的方法的。
// **** 属性的描述对象是一个可以通过 Object.getOwnPrototypeDescriptor() 方法获取到的对象。
// **** Object.getOwnPropertyDescriptors()

// 方法装饰器被调用时，带有以下参数：
    // 包含了被装饰方法的 类 的原型, 即 Person.prototype
    // 被装饰方法的名字, 即 saySomething
    // 被装饰方法的属性描述对象, 即 Object.getOwnPropertyDescriptor(Person.prototype, saySomething)
    
    // 案例1：
        // function logMethod(target: any, key: string, descriptor: any) {
        //     console.log('logMethod do somethings');
        // }
    // 案例2：
        function logMethod(target: any, key: string, descriptor: any) {
            // 保存原方法的引用
            var originalMethod = descriptor.value;
            // 编辑descriptor参数的value属性
            descriptor.value = function(...args: any[]) {
                // 将方法参数 化为字符串
                var a = args.map(a=> JSON.stringify(a)).join();
                // 执行方法, 得到其返回值
                var result = originalMethod.apply(this, args);
                // 将返回值化为字符串
                var r = JSON.stringify(result);
                // 将函数的调用细节答应在 控制台中
                console.log(`Call: ${key}(${a})=> ${r}`)
                // 返回方法的调用结果
                return result;
            }
            // 返回标记后的属性描述对象
            return descriptor;
        }
// ************************************************************************

// ************************************************************************
// 属性装饰器：是一个接受两个参数的函数，不会返回一个属性描述对象。
    // 参数：
        // 包含了这个属性 的对象、 // 即targrt 指Person.prototype对象
        // 这个属性的属性名（一个字符串或一个符号）
// *** 属性装饰器 和 方法装饰器 十分相似。
// *** 主要的区别在于，一个 属性装饰器 并没有返回值 且 没有第三个参数（属性描述对象）。
// *** 原理 利用 重置 getter setter 方法 来 实现
    // 案例1：
        // function logProperty(targrt: any, key: string) { }
    // 案例2：
        function logProperty (targrt: any, key: string) {
            // 属性值
            var _val = this[key];       // this 指Person对象 // targrt 指Person对象的原型对象
            // 属性值getter
            var getter= function() {
                console.log(`Get: ${key} => ${_val}`);
                
                console.log(targrt === this.__proto__);     // true
                return _val;
            }
            // 属性值setter
            var setter= function(newVal) {
                console.log(`Set: ${key} => ${newVal}`);
                _val = newVal;
            }
            // 删除属性，在严格模式下，如果对象是不可配置的，
            // 删除操作将会抛出一个错误。在非严格模式下，则会返回false
            if(delete this[key]) {
                Object.defineProperty(targrt, key, {
                    get: getter,
                    set: setter,
                    enumerable: true,
                    configurable: true
                })
            }
        }
// ************************************************************************

// ************************************************************************
// 参数装饰器：是一个接受三个参数的函数， 这个装饰器的返回值将被忽略。
    // 参数：
        // 一个 包含了被装饰参数的方法 的 对象、 // 指Person.prototype对象
        // 方法的名字 或 undefined
        // 参数在参数列表中的 索引
    // 案例1：
        function addMetadata(target: any, key: string, index: number) {
            var metadatakey = `_log_${key}_parameters`;
            if(Array.isArray(target[metadatakey])) {
                target[metadatakey].push(index);
            } else {
                target[metadatakey] = [index];
            }
        }
        // 详解 
            // Person.prototype[`_log_${key}_parameters`] 属性 是否为数组 
            // 是的话 把 使用此 装饰器  的元素的 索引 记录
            // 不是的话 新建一个 属性 并存入索引
            // 这样就可以 多个参数 调用此 装饰器

// *** 单独的参数装饰器 并不是 很有用， 它需要和 方法装饰器 结合 ***
// *** 参数装饰器 用来添加元数据, 然后通过 方法装饰器 来读取它 ***

    // 案例2： 方法装饰器
        // 此装饰器 读取 通过 参数装饰器添加的 元数据，在器执行时，不显示所有参数，而是仅仅打印被装饰的参数。
    function readMetadata(target: any, key: string, descriptor: any) {
        var originalMethod = descriptor.value;
        descriptor.value = function(...args: any[]) {
            var metadataKey = `_log_${key}_parameters`;
            var indices = target[metadataKey];
            if(Array.isArray(indices)) {
                for(var i= 0; i< args.length; i++) {
                    if(indices.indexOf[i] !== -1) {
                        var arg = args[i];
                        var argStr = JSON.stringify(arg) || arg.toString();
                        console.log(`${key} arg[${i}]: ${argStr}`);
                    }
                }
                var result = originalMethod.apply(this, args);
                return result;
            }
        }
        return descriptor;
    }
    // 执行
    var person = new Person('Rome', 'Jansen');
    person.saySomething('hello!');
// ************************************************************************    

// ************************************************************
//     ****************************************************
//         反射元数据API 是用来 专门生产和读取元数据API，
//         这个API用来专门生成和读取元数据，
//         在处理装饰器和元数据时，更推荐使用 反射元数据API
//     ****************************************************
// ************************************************************

// // // 装饰器工厂
    // 装饰器工厂 是 一个接受 任意数量参数 的函数，并且必须返回上述的任意一种装饰器。

    // 大多时候我们只是去 使用 装饰器 而不是去 实现 装饰器
    // 可以使用装饰器工厂来时装饰器更容易被使用！
// 案例1：----例子中因为名字问题语义化，装饰器的作用位置问题还不算严重。
    // @logClass
    // class Person1 {
    //     @logProperty 
    //     public name: string;
    //     public surname: string;
    //     @logMethod
    //     public saySomething(@addMetadata something: string): string {
    //         return this.name + " " +this.surname + " says: " + something;
    //     }
    // }


    // ************************  优化:  ************************
        // 更好的解决方法是 一个 装饰器 @log， 
        // 可以用在任意位置 而不用担心是否使用了正确类型的装饰器
    // *********************************************************

// 案例2：----优化过
    // @log
    // class Person1 {
    //     @log 
    //     public name: string;
    //     public surname: string;
    //     @log
    //     public saySomething(@log something: string): string {
    //         return this.name + " " +this.surname + " says: " + something;
    //     }
    // }
    // 案例2 通过创建一个装饰器工厂来实现。

// 装饰器工厂 指 能鉴别该使用哪种装饰器 并返回它的函数。
    // function log(...args: any[]) {
    //     switch(args.length) {
    //         case 1: 
    //             return logClass.apply(this, args);
    //         case 2:
    //             // 由于属性装饰器没有返回值
    //             // 所以使用 break 取代 return
    //             logProperty.apply(this, args);
    //             break;
    //         case 3:
    //             if(typeof args[2] === 'number') {
    //                 addMetadata.apply(this, args);
    //                 // break; 要不要加 break 书上没写, 自己测试 写不写没啥区别。
    //             }
    //             return logMethod.apply(this, args);
    //         default:
    //             throw new Error('Decorators are not valid here');
    //     }
    // }

// 带参数的装饰器
    // 为了 给装饰器 传递参数 需要使用一个函数来包裹 装饰器
    // @logClass1('option')
    // class Person2 { }

    // 案例：
        // function logClass1(option: string) {
        //     return function(target: any) {
        //         // 类装饰器 的 逻辑
        //         // 我们考科一访问到装饰器的参数、
        //         console.log(target, option);
        //     }
        // }
    // *** 可以运用到上边的任意装饰器中


// // // 反射源数据API
        // TypeScript编译器 将会在这些 保留装饰器的参数 中添加额外的信息。
            // @type ：被装饰目标 序列化后的 类型
            // @returnType ：被装饰目标若为函数，则为其序列化后的返回类型， 否则为 undefined
            // @parameterTypes ：如果它是一个函数、undefined 或 其他类型，这是被装饰目标 序列化后的参数类型。
            // @name ：被装饰目标的名字。
    // TypeScript团队 打算用 反射元信息API 来替代 保留装饰器。反射元信息API 思想与 保留装饰器 十分相似。

// TypeScript文档中 定义了三个 保留元数据键：----反射元信息API 
    // 类型元数据 使用元数据键 ： design: type
    // 参数类型元数据 使用元数据键 ： design: paramtypes
    // 返回值元数据 使用元数据键： design: returntype
// 使用：反射元信息API 
    // 需要依赖： reflect-metadata
    // 方法： 
        // 安装包： npm install --save-dev reflect-metadata 
        // 引入包： 
            //   /// <reference path=""./node_modules/reflect-metadata/reflect-metadata.d.ts"/>
            //   import "reflect-metadata";
        // 手动编译： tsc reflectdemo.ts --experimentalDecorators --emitDecoratorMetadata
// 案例详解-----见文件夹---8ZSQ
    // 为了测试我们将 创建一个类，而在运行时，去获取一个属性的类型。
    // 使用一个名为 logType的属性装饰器 来装饰属性。
    // 注: 例子 只有 导入了  reflect-metadata库后才可使用。

// ******************** 序列化 ********************
//         类型                             序列化
//         void                             undefined
//         string                           String
//         number                           Number
//         boolean                          Boolean
//         symbol                           Symbol
//         any                              Object
//         enum                             Number
//         Class c{}                        C
//         Object literal {}                Object
//         interface                        Object
// ***********************************************