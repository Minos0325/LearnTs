import { Controller, AppEvent } from "./Learning TypeScript_Code/Chapter 9 and 10/TsStock/source/framework/framework";

// // // 应用架构
// 第一部分：
//     单页面应用（SPA）架构
//     可扩展、可维护程序的设计模式
        // 包含：
            // 单页应用架构
            // MV* 架构
            // 数据模型（module）和 数据模型集合（collection）
            // 单数据视图（item view） 和 集合数据视图（collection view）
            // 控制器（controller）
            // 事件（events）
            // 路由（router） 和 hash 导航
            // 中介器（mediator）
            // 客户端渲染 和 virtual DOM
            // 数据绑定 和 数据流
            // Web组件和 shadow DOM
            // 选择一个 MV* 框架
// 第二部分： 
    // 练习
    // 开发一个单页应用框架

// // 单页应用架构（SPA）
// 一个SPA就是一个Web应用，它所需要的资源（html、css、JavaScript等）在一次请求中就加载完成，或不需刷新的动态加载。
// 我们使用术语“单页”来指这种应用，因为页面在初始化加载后就永远不会重新加载（刷新）

// AJAX请求动态加载一些页面内容，以避免不必要的网页加载。
// AJAX应用 和 SPA 的工作原理非类似。
// 它们之间的区别是：
    // AJAX是以HTML的形式，加载应用的一部分，这些部分在加载完成后被插入到DOM中。
    // SPA会避免加载HTML。而加载数据 和 客户端模板，这些数据和模板通过客户端渲染的过程在浏览器中被处理和转化成HTML。
    // *** 这些数据通常使用 XML 或 JSON 格式。
// 区别案例 见书 P241-
    // SPA流程 初始化页面的加载 和 AJAX程序完全一样。
    // 在SPA中,导航到一个新的页面 由 JavaScript事件控制,通常被一个叫做 路由 的模块 管理。
    // 暂时忽略SPA中的导航，而关注数据加载 和 渲染。
    
    
// **************************** 详解 ****************************
    // 在SPA中我们不会以HTML的形式加载订单列表，将使用JSON 或 XML 格式加载它。
    // 在浏览器展示 之前，我们需要通过一个模板系统将他们转化成HTML，目前有很多模板系统可供选择。 如: Handlebars

        // function getOrdersData(userId: number, cb) {
        //     $.ajax({
        //         method: 'get',
        //         uri: `/api/orders/${userId}`,
        //         dataType: 'text',
        //         success: function(json) {
        //             cb(json);
        //         },
        //         error: function() {
        //             var msg = `<h1>Sorry, there has been an error !</h1>`;
        //             $('#page_container').html(msg);
        //         }
        //     })
        // }
        // 数据
            // {
            //     "order": [
            //         {"item" : [
            //             {},
            //             {},
            //         ]},
            //         {"item" : [
            //             {},
            //             {},
            //         ]}
            //     ]
            // }
        // 语法
            // {{#each orders}}
            // <tr>
            //     <td>{{order_id}}</td>
            //     <td>{{data}}</td>
            //     <td>
            //         <ul>
            //             {{#each items}}
            //             <li>
            //                 {{product_id}}  x  {{quantity}}
            //             </li>
            //             {{#each}}
            //         </ul>
            //     </td>
            // </tr>
            // {{each}}
        // Handlebars 模板语言中的元素被双括号包裹（{{和}}）。
        // each语句会为数组中每个元素重复一些命令。
        // 如果我们看一下相应的 JSON,会发现订单列表是一个数组。
        // 模板回味orders数组 的 每一个对象重复 {{#each}}和{{each}}间的操作。
    // *** 当模板中引入了一个JSON的字段时，这个字段必须在当前的作用域内。
    // *** 作用域可以通过this关键字访问。比如 {{this.order_id}} 等于 {{order_id}}。
    // 使用一些流程控制语法时，模板中的作用域会被改变。比如{{#each orders}} 语法 会将 this 指向数组内的当前元素。

    // 为了使用 Handlebar 模板，需要加载并编译它。我们通过一个普通的Ajax请求加载它:
        // function getOrdersTemplate(cb) {
        //     $.ajax({
        //         method: 'get',
        //         uri: "/client/orders.hbs",
        //         dataType: 'text',
        //         success: function(templateSource) {
        //             var template = Handlebars.compile(templateSource);
        //             cb(template);
        //         },
        //         error: function() {
        //             var msg = `<h1>Sorry, there has been an error !</h1>`;
        //             $('#page_container').html(msg);
        //         }
        //     })
        // }
    // *** 在一个真实生产环境中的网站，模板通常由持续集成系统编译。模板在它们加载完成之后就可以使用了。
    // *** 预编译模板可以提升应用性能。
// 上边两个函数：一个用来加载模板并编译它，了一个用来加载JSON数据。
// 最后一步是将他们放在一起并生成一个包含订单列表的HTML表格:
// function displayOrders(userId) {
//     getOrdersData(userId, function(data) {
//         getOrdersTemplate(data, function(template) {
//             var html = template(json);
//             $('#page_container').html(html);
//         })
//     })
// }

// **************************** 详解 结束 ****************************

// SPA看起来可能需要更多的工作量，并且它与AJAX应用相比可能性能性更差，因为它即需要更多的操作，也需要更多的请求。
// 然而，这和真实情况相差甚远。要理解SPA的好处，我们需要了解为什么会出现SPA。、
// SPA出现收到两个事件的深度影响：
    // 1、功能强大的移动和平板设备数量的迅速增长。
    // 2、同一时期的JavaScript性能的迅速增长。
// SPA的主要好处之一是 我们需要一个HTTP API。
    // 一个HTTP API相比在服务器端渲染一个HTML页面有诸多好处：
        // 比如为网络服务编写单元测试会简单很多，因为断言数据的正确比断言用户交互函数简单得多。
        // HTTP API 还可以被其他很多客户端程序所用，这样可以节约大量的成本并 开拓新的业务线，比如将 HTTP API作为产品销售。
// 另一个SPA的重要好处是 大量的工作都在浏览器中完成，服务端承担更少的工作，这样就可以处理更多的请求。而客户端性能并没有收到显著影响。

// SPA的网络性能 与 传统AJAX 应用 相比 各有好坏。请求的相应格式是HTML，相应的数据量有时候比JSON和XML大。
// 使用XML和JSON额外的开销是，我们需要一个额外的 请求获取模板，可以通过预编译模板、缓存机制 和 将多个模板拼接成一个大的模板来介绍请求数量。

// // // MV* 架构
// SPA中 很多传统在服务端的任务转移到了 客户端，这样就增加了JavaScript代码的数量，从而我们需要更好地组织代码、
// MVC - Model View Controller
// MV* - Model View 不实现 Controller

// // model
    // model是一个用来存储数据的组件。这些数据通常从HTTP API请求过来并显示在 view上。
    // 一些框架包含了 一个 model实现，我们开发时需要继承它。
    // 比如:
    //     使用Backbone.js(一个类型的MV*框架)时， model必须继承 Backbone.model类：
        // class TaskModel extends Backbone.Model {
        //     public created: number;
        //     public completed: boolean;
        //     public title: string;
        //     constructor() {
        //         super();
        //     }
        // }
        // 一个model继承了一些方法，可以帮助我们与网络服务进行通信。
        // 比如：Backbone.js的model为例，我们可以使用fetch方法从网络服务请求数据，并将它设置到model中。
        // 在一些框架中，model包含了与网络服务进行通信的方法，而另一些框架中则有单独的模块负责 与 HTTP API 通信。
    // 在其他框架中， model可能就是一个纯粹的类，它不需要继承或实例化框架中的类：
        // class TaskModel {
        //     public created: number;
        //     public completed: boolean;
        //     public title: string;
        // }

// // Collection
    // collection 用来表示一组model。
    // 如上个例子，model表示列表中的一个任务，collection表示一个任务的列表。

    // 在正常collection的主流MV*框架中，我们需要在collection声明时定义collection臣在的元素类型。
    // 比如：以Backbone.js 为例，TaskCollection 像下面这样声明：
        // class TaskCollection extends Backbone.Collection<TaskModel> {
        //     public model : TaskModel;
        //     constructor() {
        //         this.model = TodoModel;
        //         super();
        //     }
        // }
    // 如同model的例子，一些框架中的 collection 就是纯粹的数组，我们也不需要继承或实例化框架中的任何类。
    // collection 也可以继承一些 方便 与 网络服务进行通信的方法。

// // item View
    // 框架提供给我们最主要的功能就是item View（或者就叫view）组件。
    // view 负责将存储在 model中 的 数据渲染成 HTML。
    // view通常依赖在构造函数、属性或设置中传入一个model、一个模板和一个容器。
        // * model 和 模板 用来生成HTML就像前边提到过的
        // * 容器通常是一个DOM选择器，被选中的DOM元素作为HTML法人容器，HTML将会被插入 会附加进去。
    // 比如：在Marionette.js（一个流行的基于Backbone.js 的MV*框架）中，一个view被这样声明：
        // class NavBarItemView extends Marionette.ItemView {
        //     constructor(options: any = {}) {
        //         options.template = '#navBarItemViewTemplate';
        //         super(options);
        //     }
        // }

// // collection view 
    // 一个collection view 是一个 特殊的 view。它的存在就好比collection 和 model的关系。
    // collection view通常依赖在构造函数、属性或者设置中传入一个collection、一个item view和一个容器。
    
    // 一个 collection view 迭代collection里面存储的model，使用item view 渲染它，然后将结果最佳到容器尾部。

    // 在主流框架中，渲染一个 collection view实际上是为每一个collection 中的model 渲染一个 item view,这可能会造成性能瓶颈。
    // 一种代替的方案是，使用一个item view 和 一个属性为数组的model，然后使用 {{#each}} 语句在view的模板中渲染这个列表，而不是为
    // collection中的每一个元素都渲染一个view。
    // 例如：
        // class SampleCollectionView extends Marionette.CollectionView<SampleModel> {
        //     constructor(options: any= {}) {
        //         super(options);
        //     }
        // }
        // var view = new SampleCollectionView({
        //     collection: collection,
        //     el: ${'#divOutPut'},
        //     childView: SampleView
        // })

// // Controller
    // 一些框架提供了 Controller 功能， Controller通常赋值管理特定 model 和相关view 的 生命周期。
    // 它们的职责是实例化 model 和 collection ，将它们关联起来，并与相关的view 关联起来，并与相关的 view
    // 联系起来，在将控制权交给其他controller前销毁它们。
    
    // MVC 应用的交互是通过组织 Controller 和 它的方法。Controller 在需要的时候可以拥有许多方法，
    // 而这些方法和 用户的行为一一对应。

    // 例如：
    // class LikesController extends ChannelSplitterNode.Controller {
    //     public beforeAction() {
    //         this.redirectUnlessLoggedIn();
    //     }
    //     public index(params) {
    //         this.collection = new Likes();
    //         this.view = new LikeView({collection: this.collection});
    //     }
    //     public show(params) {
    //         this.model = new Like(id: params.id);
    //         this.view = new FullLikeView(model: this.model);
    //     }
    // }

// // 事件
    // 事件是指被程序发现的行为 或 发生的事情，而且它可能会被程序处理。
    // MV*框架通常区分两种事件。
    // 1、用户事件：程序允许用户通过触发和处理事件的形式沟通，比如点击一个按钮、滚动屏幕 或 提交一个 表单。用户事件 通常在view中处理。
    // 2、程序事件：应用自身也可以触发和处理一些事件。比如，一些程序在view渲染后触发onRender事件，或在controller的方法调用前触发onBeforeRouting事件。
    // 程序事件是遵循SOLID原则的中的 开/闭 原则的一个好的方式。可以使用事件来允许开发者扩展框架，而不需要对框架做任何改变。
    // 程序事件也可以 用来避免组件间的直接通信。


// // 路由 和 hash（#）导航
// 路由 负责观察URL的变化，并将程序的执行流程切换到controller的相应方法上。
// 主流框架使用了一种叫做hash导航的混合技术，它使用HTML5的History API在不重载页面的情况下处理页面URL的变更。
// 在SPA中，链接通常包含一个hash（#）字符。这个字符原本的设计时导航到页面的一个DOM元素上，但它被MV*框架用来做无须刷新的导航。
// ************************ 详解 ************************ 
// 一个代表URL的纯对象
    class Route {
        public controllerName: string;
        public activeName: string;
        public args: Object[];

        constructor(controllerName: string, activeName: string, args: Object[]) {
            this.controllerName = controllerName;
            this.activeName = activeName;
            this.args = args;
        }
    }
// 路由观察浏览器URL的变更。当URL变更时，路由会解析它并生成一个新的路由实例。
// 一个最基本的路由：
    class Router {
        public _defaultController: string;
        public _defaultAction: string;

        constructor(defaultController: string, defaultAction: string) {
            this._defaultController = defaultController || 'home';
            this._defaultAction = defaultAction || 'index';
        }
        public initialize() {
            // 观察用户改变URL的行为
            $(window).on('hashchange', ()=> {
                var r = this.getRoute();
                this.onRouteChange(r);
            })
        }
        // 读取
        private getRoute() {
            var h = window.location.hash;
            return this.parseRoute(h);
        }
        // 解析URL
        private parseRoute(hash: string) {
            var comp, controller, action, args, i;
            if(hash[hash.length - 1] === '/') {
                hash = hash.substring(0, hash.length-1);
            }
            comp = hash.replace('#', '').split('/');
            controller = comp[0] || this._defaultController;
            action = comp[1] || this._defaultAction;
            args = [];
            for(i = 2; i< comp.length; i++) {
                args.push(comp[i]);
            }
            return new Route(controller, action, args);
        }
        onRouteChange(route: Route) {
            //在此处执行控制器
        }
    }
    // 详解：
    // 上面这个类使用默认的controller和默认的名字作为它的构造函数的参数。
    // 当没有值传入时，home和 index作为默认的controller名和默认方法名。
    // initialize方法被用来创建hashchange事件的监听。浏览器会在window.location.hash变更时触发这个事件。

    // 使用：
        // 当前地址是： http://localhost:8080
        // 当用户点击<a href='#tasks/index'>View tasks</a>
        // 浏览器地址栏中的地址会变更，但hash 会阻止浏览器重载当前页面。
        // 随后paseRoute调用getRoute方法将URL转变成一个新的Route类实例。
        // URL遵循下面的命名规则：
            // #conrollerName/actionName/arg1/arg2/arg3/argN
        // task/index URL 会被转换成： new Route('task', 'index', []);
        // 主流MV*框架会使用HTML History API 隐藏URL上的 hash字符。
        // Route类的实例被传入onRouteChange方法中，它将负责调用调用处理这个路由的controller。

// ****************************************************** 


// // 中介器
// 一些MV*框架引入了一个叫做中介器的组件。
// 中介器是一个简单的对象，所有其他的模块都通过它与其他部分进行通信。

// 中介器通常实现于发布/订阅设计模式（也叫pub/sub）,这种设计模式可以让模块之间不用相互依赖。
// 模块之间通过事件通信，而不是直接使用程序中其他的部分。

// 模块可以监听一个事件并处理它，也可以发布一个事件让他模块影响这个事件。
// 这保证了程序模块间额低耦合，也能轻松实现信息交换。

// 中介器还能让开发者轻松扩展（通过订阅事件）框架而不需要对框架代码做任何改动。
// 这是非常好的特性，因为它遵循了SOLID原则中的开/闭原则。
// ********************** 中介器接口示例 **********************
    // interface IMediator {
    //     publish(e: IAppEvent) : void;
    //     subscribe(e: IAppEvent) : void;
    //     unsubscribe(e: IAppEvent) : void;
    // }
// 路由中的 controller 是由 中介器 来开发的。
    // **** Router =====> Controller
// ***********************************************************


// ***** 使用中介器 发布事件 而不是直接调用controller 示例 ******

// 路由避免直接 调用 controller。
    // class Router {
    //     private onRouteChange(route: Route) {
    //         this.meditor.publish(new AppEvent("app.dispatch", route, null));
    //     }
    // }
// 路由中的 controller 是由 中介器 来开发的。
    // **** Router =====> Mediator =====> Controller
    

// ***********************************************************

// // 调度器
// 上面的代码中 app.dispatch 是事件名。
// app.dispatch 事件指向一个叫做 调度器 的东西。 这意味着路由在向 调度器发送事件 而不是 controller。
// 如：
    class Dispatcher {
        // ...
        public initalize() {
            this.meditor.subscribe(
                new AppEvent('app.dispatch', null, (e: any, data?: any)=> {
                    this.dispatch(data);
                })
            )
        }
        // 创建和销毁 controller 实例
        private dispatch(route: IRoute) {
            // 1. 销毁旧的 controller
            // 2. 创建新的 控制器实例
            // 3. 通过中介器触发控制器的action
        }
        // ...
    }
// 调度器的职责是 创建新的controller 和 销毁 旧的controller。当路由完成对URL的解析后，
// 他将通过中介器向调度器闯入一个新的路由实例。然后调度器会销毁旧的controller并创建 新的controller，
// 并使用中介器调用controller 上的方法。

// // 客户端渲染 和 Virtual DOM
// 客户端渲染 需要一个模板和 一些数据来生成HTML。
// 但没意识到关于性能的细节，选择MV*框架时要考虑到。
// 有些框架 是在 model发生更改时 进行渲染，有两种可能的方式可以知道一个model是否发生了改变：
    // 第一种是 使用 定时器检测变更，这个操作有时候被称为脏检查（但并非angular.js 中的脏检查）
    // 第二种是 使用 observable model

// observable 的 实现比使用定时器更高效，因为observable仅在 变更发生的时候触发。
// 而定时器会在时间符合条件的时候触发，不管是否有变更发生。

// 何时渲染非常重要，如何渲染也非常重要。
// 一些框架直接操作DOM，而另一些框架在内存中操作被称为Virtual DOM 的DOM映射。
// Virtual DOM更加高效，因为JavaScript对内存的操作比对DOM的操作更加快速。

// // 用户界面数据绑定
// 用户界面（UI）数据绑定 是一种 旨在 简化图形界面开发的设计模式。
// UI数据绑定将一个 UI元素 和程序model绑定在一起。
// 一个绑定 会将两个属性关联在一起，当其中一个改变时，另一个的值将自动更新。
// 绑定可以将同一对象或不同对象上的元素联系在一起。大多数MV*框架都实现了某种view 和model间的绑定。

// ********** 单向数据绑定 **********
    // 主流MV*框架中，单向数据绑定意味着 只有model的变更会传到view中，而view上的变更不会被传递给model。

// ********** 双向数据绑定 **********
    // 双向数据绑定 用来确保 model 和 view 中的素有的变更都会传递给对方。

// **********    数据流    **********
    // 一些最新的MV*框架引入了新的实现和术，其中一个新的概念就是单向数据流（由Flux提出）。
    // 单向数据流基于这样的想法————一个变量值每次改变，都会导致依赖于该变量的其他变量重新计算自己的值。
    
    // MVC应用中，一个controller处理多个model 和view。有时，一个view使用不止一个model，
    // 当使用双向数据绑定是，我们最终会面临相当复杂的数据量。
    // 见图书P258

    // 数据流框架试图 通过把数据的流动限制为唯一的渠道和方向, 来解决这个问题。
    // 这样做之后，程序组件内的数据流动就非常容易跟踪了。
    // 见图书P259

// // Web component 和 shadow DOM
// 一些框架使用Web component 术语来指代那些可以重用UI组件。
// Web component允许用户自定义HTML元素，比如可以定义一个新的HTML <map>标签 来显示一个地图。
// Web component可以单独引入他们自己的依赖并且使用一种叫 shadow DOM 的客户端模板渲染HTML。

// shadow DOM 让浏览器能在Web component中使用HTML、CSS和javascript。
// shadow DOM技术在开发大型应用时非常有用，因为它可以避免模块之间CSS、HTML和JavaScript冲突。

// 一些现存的MV*框架（如：Polymer），可以用来实现真正法人Web component。
// 而一些其他框架比如React，使用Web component 术语指代那些可复用的UI组件，这些组件并非真正的Web componrnt，
// 因为它们没有Web component 的相关技术（自定义元素、HTML模板、shadow DOM 和 HTML导入）

// **************************************************************
// 开发SPA框架前，需要选好JavaScript框架，参考http://todomvc.com
// TodoMVC是一个提供使用不同MV*框架实现相同程序（一个任务管理应用）的项目
// **************************************************************

