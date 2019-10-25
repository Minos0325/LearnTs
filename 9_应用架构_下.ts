import { Controller } from "./Learning TypeScript_Code/Chapter 9 and 10/TsStock/source/framework/framework";

// 程序将实现 controller、模板、view和 model，还有一个路由、一个中介器和一个调度器。
// 职责：
    // 程序组件：
        // 一个程序的根组件。程序组件负责初始化框架内所有的内组件（中介器、路由和调度器）
    
    // 中介器：
        // 中介器负责程序中所有其他模块间的通信。
    
    // 程序事件：
        // 被用来将信息从一个组件发送到另一个。组件可以发布程序事件也可以订阅或取消一个程序事件。
    
    // 路由：
        // 路由观察浏览器URL的变更，并在变更时创建一个Route类的实例，通过程序事件传递给调度器。
    
    // 路由表：
        // 被用来表示一个URL。URL命名规则可以指明哪一个controller的方法在特定路由下呗调用。
    
    // 调度器：
        // 接收一个Route类的实例，这个实例被用来制定依赖的controller。
        // 如果需要的话，调度器会销毁上一个controller并 新建一个。
        // 一旦controller被创建，调度器使用程序事件将程序执行流 交给 Controller。
    
    // controller：
        // 被用来初始化view 和model。
        // 一旦view 和 model 初始化完成，controller就将执行流交给一个或多个model。
    
    // model：
        // 负责与HTTP API通信，并在内存中维护这些数据，这涉及数据的格式化和对数据的增减。
        // 一旦model完成了对数据的操作，它就将被传递到一个或多个view中。
    
    // view：
        // 负责加载并编译模板。
        // 一旦模板编译完成，它就会等待model传入数据。
        // 当收到数据后，它会和模板一起呗编译成HTML代码并插入DOM。
        // view也负责绑定和解绑UI事件（click， focus等）。

// *** 详细见书P262 图

// 详细代码见 9Demo 文件夹

// 命令：
    // npm init
    // npm install animate.css bootstrap datatables handlebars jquery q --save

    // 安装依赖
    // npm install browser-sync browserify chai gulp gulp-coveralls gulp-tslint gulp-typescript gulp-uglify karma karma-chai karma-mocha karma-sinon mocha run-sequence sinon vinyl-buffer vinyl-source-stream --save-dev
    //  安装 类型描述文件 npm install @types/xx （tsd已经弃用）
    // tsd init
    // npm install @types/jquery @types/bootstrap @types/handlebars @types/q @types/chai @types/sinon @types/mocha @types/jquery.dataTables @types/highcharts --save
    