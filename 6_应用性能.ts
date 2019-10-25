// // // 应用性能
// 性能与资源
// 性能的各个方面
// 内存性能分析
// 网络性能分析
// CUP与GPU的性能分析
// 性能测试
// 性能优化建议
// 性能自动化检测

// // 准备工作
// 1、安装Google Chrome浏览器。 使用它的 开发者工具进行 网络性能分析。

// // 性能与资源
// 一个好的应用程序应该集 功能性、可靠性、可用性、可复用性、效率、可维护性、可移植性等理想特性于 一身。
// 目前我们侧重于：可靠性、可维护性
// 性能：相对于时间及资源消耗所能完成的任务量。
// 资源：指有限的物理（CPU，内存，GPU，硬盘等） 或 虚拟（CPU时间，内存区，文件等）组件。
    // 由于资源是有限的，每个资源会在进程间共享。当一个资源被一个进程使用完毕，只有当资源被该进程释放后，
    // 其他进程才可使用它。
// 高效管理可用资源，将有助于减少其他进程等待资源可用时所消耗的时间。

// 当开发WEB应用时，我们必须了解以下资源时有限的：
// 中央处理器CPU：
    // 通过执行由指令所指定的基本的算术、逻辑、控制、输入/输出(I/O)操作 来执行计算机的指令。
// 图形处理器GPU：
    // 为了加速图像在显示用帧缓冲器中的创建，而专门用来操作和变更存储数据的处理器。
    // 当创建一个使用WebGL API 或 CSS3动画的应用时，我们就是在使用GPU。
// 内存RAM：
    // 使数据项能够无视访问顺序地进行时间大致相同的读取和写入。
    // 当声明一个变量时，它将被存储到内存中。当变量离开作用域后，它将被垃圾收集器从内存中移除。
// 硬盘HDD和固态硬盘SSD：
    // 两者都是用来存储和检索信息的存储设备。一般应用不会广泛持久地使用数据存储空间。
    // 但当使用持久的存储方式时（cookie、本地存储、索引数据库等），应用程序的性能会受到HDD或SSD可用性的影响。
// 网络吞吐量：
    // 决定了在单位时间内通过网络可发送的数据量。
    // 是由诸如网络延迟 或 带宽 等因素决定。

// *** 所有在之前列表中出现的资源在使用与 Node.js应用或混合应用是也都是有限的。
// *** 虽然Node.js应用并不广泛使用GPU，但也存在例外情况。



// // 性能指标----见书P162
    // 可用性：通过提高系统可靠性 可维护性 和 可测试性 来改进。
    // 响应时间：对一个服务请求做出响应所需时间（服务不是指一个web服务，可指代任意的服务单元）
        // 响应时间可分为3个部分：
            // 1、等待时间：指该请求等待其他焦躁产生的请求完成所花费的时间。
            // 2、服务时间：指完成服务（工作单位）所消耗的时间。
            // 3、传输时间：一旦该任务完成，该响应将会被发送回请求者。传输响应所消耗的时间。
    // 处理速度：也被称为始终速率，是指处理单元CPU 或 GPU 的运行频率。
    // 延迟：可应用与许多范畴中
        // 网络延迟：指任意在网络数据通讯中发生的延迟
            // 高延迟:会在通讯中产生瓶颈,从而限制 带宽。基于延迟产生的原因，延迟对于网络带宽的影响
                // 可能是临时 抑或是 持久的。高延迟可由传输介质（电缆，无线信号）、路由及网关或反病毒程序等问题导致。
    // 带宽：或 数据传输速率。与延迟情况相似,这里指网络带宽。
        // 是指一定时间从一点到另一点可以传输的数据量，网络带宽：通常以比特每秒计算。
    // 可伸缩性：系统处理更大规模任务的能力。峰值测试、压力测试体现出好坏。

// 网络性能分析 ----见书P163
    // 可以通过 全局对象来访问性能计时API： window.performance
    // 该全局对象的performance属性对象具有一些属性（memory、navigation、tieming）
        // 和方法（clearMarks、clearMeasures、getEntries）。
    // 我们可以使用 getEntries方法来得到一个包含每一个请求的计时数据点的数组。
        // window.performance.getEntries();
    // 数组内每个元素都是以个PerformanceResourceTiming的实例。
    // 它包含了以下信息：
        // {
        //     connectEnd: 9.299999999939246
        //     connectStart: 9.299999999939246
        //     decodedBodySize: 13927
        //     domComplete: 255.8999999999969
        //     domContentLoadedEventEnd: 255.8999999999969
        //     domContentLoadedEventStart: 255.8999999999969
        //     domInteractive: 255.79999999990832
        //     domainLookupEnd: 9.299999999939246
        //     domainLookupStart: 9.299999999939246
        //     duration: 256.1999999999216
        //     encodedBodySize: 4511
        //     entryType: "navigation"
        //     fetchStart: 9.299999999939246
        //     initiatorType: "navigation"
        //     loadEventEnd: 256.1999999999216
        //     loadEventStart: 255.8999999999969
        //     name: "https://exmail.qq.com/cgi-bin/ftnExs_download?k=0064313327fcc1ce60e3b219433705044a0101500004040606495752520e1f020600501e5c020b054850060a505502045556030252371d362b2072604959565516495250055154575c5c0706505450070702055050040a0601510652015354004b4a1f1d1e5e42365b&t=exs_ftn_download&code=ed13d726&s=email"
        //     nextHopProtocol: "http/1.1"
        //     redirectCount: 0
        //     redirectEnd: 0
        //     redirectStart: 0
        //     requestStart: 12.39999999995689
        //     responseEnd: 231.9999999999709
        //     responseStart: 230.29999999994288
        //     secureConnectionStart: 0
        //     serverTiming: []
        //     startTime: 0
        //     transferSize: 5274
        //     type: "navigate"
        //     unloadEventEnd: 0
        //     unloadEventStart: 0
        //     workerStart: 0
        // }
    // ***光看上边的没啥用
    // 使用工具去分析他们：
        // 1、performance-bookmarket的浏览器插件
            // 下载地址：https://github.com/micmro/performance-bookmarklet
        // 2、或使用Chrome开发者工具来进行网络性能测试。
            // F12 ----> NexWork ----> 每条 右边 或者 timing中
        // *** 其中红色线，蓝色线最重要。 很细
            // 蓝色指：DOMContentLoaded事件什么时候触发。
            // 红色指：蓝色出发后 load事件什么时候触发。

    // 鼠标悬浮到timing上会有 性能计时API信息
    // Stalled/Blocking: 发送请求前的等待时间，开启TPC连接存在最长时限，到达时限后一些请求会显示 blocking时间而不是 stalled时间。
    // Proxy Negotiation：与带路服务器协商连接的时间
    // DNS lookup：解析DNS地址的时间，每次域名解析都需要与DNS服务器建立双向通信
    // 。。。。。

// 网络性能与用户体验
    // 首要目标提高加载速度。
    // 尽快触发onLoad事件可以提高网络性能，但不意味着用户体验提高。
    // onLoad事件不足以决定网络性能

// 网络性能最佳实践规则
    // 分析工具：
        // Google PageSpeed Insights : https://developers.google.com/speed/pagespeed/insights/
        // Yahoo YSlow ： http://yslow.org

// // GPU性能分析
// web应用中部分元素的渲染可被GPU加速，GPU是专门处理图形相关指令的，因此在处理图形时会优于CPU。
// css3动画被GPU加速， JavaScript动画被CPU加速
// WebGl API 可以调用GPU。

// 每秒传输帧数 
    // FPS 或 帧率
    // FPS：60/s 时 效果最佳，应保持大于40帧/秒
    // *** 开源工具库 stats.js，可以显示应用的帧率
        // 地址：https://github.com/mrdoob/stats.js/

    // 使用：
        // var stats = new Stats();
        // stats.setMode(1);
        // stats.domElement.style.position = 'absolute';
        // stats.domElement.style.left = '0px';
        // stats.domElement.style.top = '0px';
        // document.body.appendChild(stats.domElement);

        // var  update = function () {
        //     stats.begin();
        //     stats.end();
        //     requestAnimationFrame(update);
        // }
        // requestAnimationFrame(update);
    // *** 点击更换模式 fps to ms

    // fps： 上一秒渲染过的帧，数字越大越好
    // ms：渲染一帧需要的时间，数字越小越好

// // CPU 性能分析
    // f12 => Memory => Profiles 选项卡 可以测试每个函数的运行时间

// // 内存性能分析---详见书P177
    // 声明一个变量后，它就会被分配到内存中，当变量离开作用域后，就会被垃圾回收器回收内存。
    // 在某些特定场景下，变量不会离开作用域，也不会被销毁、内存不会被回收，最终导致 内存泄露（持续性内存不足）
    // 通过谷歌开发者工具来确定原因：
        // F12 => TimeLine选项卡 => 左上角图标点击（开始记录资源使用情况） => 点击停止 => 生成时间轴

// // 垃圾回收器
    // 低抽象级别的编程语言具有低级内存管理机制，另一方面，高抽象级别的编程语言，比如LC# 或 JavaScript，内存会自动分配，靠垃圾回收器回收。

    // 无论哪种编程语言,内存的生命周期大多遵循相应的模式:
        // 1、 按需分配内存
        // 2、 使用内存进行读写
        // 3、 及时释放内存
    // 垃圾回收器 遵循 标记-清除 原则，周期性扫描标记过的变量，及时回收不再使用的变量所占用的内存。
    // 扫描分两个阶段：
        // 第一阶段： 标记阶段，即垃圾回收器标记可回收的变量；
        // 第二阶段： 清除阶段，即释放上阶段中标记过的变量所占用的内存。
    // 垃圾回收器 能确定哪些东西可以清除，但我们应保证，当不需要一些变量时，变量会离开作用域，
        // 若一个变量无法离开作用域，一直存在内存里，可能会导致内存泄露。
    // 变量被引用的次数会阻止其内存的释放，因此大多数内存泄露都可以通过解除变量的引用修复。
    // 避免内存泄露的规则：
        // 1、及时清除计时器
        // 2、及时清除事件监听器
        // 3、闭包会记住上下文环境，这意味着需要占据部分内存。
        // 4、适用对象组合时，若存在循环引用，也会有部分变量占据内存导致无法释放的情况。


// // 性能自动化
    // 性能优化的自动化：从 内容拼接 和 压缩， 到 自动化性能检测 和性能测试。

// 性能优化的自动化
    // 主要集中于将 应用组件文件进行拼接和压缩，同时这样会导致难以调试与维护，而每次修改组件后都得创建一个新的版本。
        // 使用 Gulp来帮助进行。
        // Gulp的诸多插件可以用来专门完成：合并压缩、优化图片、生成缓存清单（ccache manifest）以及其他自动化性能优化的任务。
        // 详情见第二章

// 性能监测自动化
    // 同样使用Gulp
    // 收集数据进行比较：
        // 真实用户检测（RUM）：通过浏览器中加载小段JavaScript代码实现。
        // 模拟浏览器：收集模拟浏览器的性能数据，经济省事但不能准确模拟真实用户操作。
        // 真实浏览器检测：收集真实浏览器的性能数据，准确呈现真实用户操作。

// 性能测试自动化
    // 另一种提升应用性能的方式：编写自动化性能测试，来保证系统满足一组性能目标
    // 常见性能测试：
        // 1、加载测试：通过加载测试来了解预设的加载情况下的系统行为（并发用户数，事务数和时长）。
        // 2、压力测试：测试应用最大负荷能力，长时间极端负载下工作情况，通常客户端中作用不大，Node.js中作用大。
        // 3、渗透测试：耐力测试，与压力测试相似长时间预设的负载量进行测试。用于手机内存使用情况以及发现潜在的内存泄露问题，检测性能是否会下降。
        // 4、峰值测试：跟压力测试类似，但仅通过剧增的间隔和预期负载进行测试，帮助检测性能是否应对巨量变化的访问量。
        // 5、配置测试：用于检测配置辩护对应性能和行为的影响，通常用来测试不同的负载平衡问题。


// 错误处理
    // 有效利用可用资源可以帮助我们创建更好的应用，类似的，了解如何处理运行时错误可以帮助提高应用的整体质量。
    // TypeScript中错误处理的主要三种方式：
        // 1、Error类：运行时错误发生后 抛出一个Error类
            // throw new Error('创建自定义错误， 给 Error类的构造器');
                // 若需要更多自定义及控制能力可以通过继承来实现。
                // module CustomException {
                //     export declare class Error {
                //         public name: string;
                //         public message: string;
                //         public stack: string;
                //         constructor(message?: string);
                //     }
                //     export class Exception extends Error {
                //         constructor(public message: string) {
                //             super(message);
                //             this.name = 'Exception';
                //             this.message = message;
                //             this.stack = (<any> new Error()).stack;
                //         }
                //         toString() {
                //             return this.name + ":" + this.message;
                //         }
                //     }
                // }
                // class CustomError extends CustomException.Exception {
                //     // ...
                // }
                // 详解：
                    // 声明了一个Error类，该类存在于运行时，但并非 TypeScript自带，所有需要自己声明。
                    // 然后创建一个继承自Error类的Exception类，最后创建了CustomError 继承自 Exception 类 
                
        // 2、try...catch 语句 和 throw语句
                // catch语句会 捕获try中抛出的异常。在try中写的代码，如果运行失败了，程序就会运行catch内的代码。
                // 另外还有一个可选的finally，会在try和catch运行后执行：
                    // try {
                    //     throw new Error('Oops!');
                    // }
                    // catch (e) {
                    //     // try 中抛出异常时运行的代码
                    //     console.log(e+'1231231');
                    // }
                    // finally {
                    //     // 无论是否抛出异常都会执行的代码
                    //     console.log('finnally!');
                    // }
    // *** 大多数编程语言中，包括 TypeScript，抛出和接收异常的操作很耗资源。
    // 不必要的情况下尽量避免使用它们，因为这样会影响性能。
    // 在会影响性能的函数和循环中尽量不要使用 try...catch 和 throw语句
