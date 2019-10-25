///<reference path="../typings/handlebars/handlebars.d.ts" />
///<reference path="../typings/jquery/jquery.d.ts" />

// Alias for callback 定义 回调类型的别名
type cb = (json : any) => void;

class View {
  private _container : string;    // DOM选择器， 是View被插入的地方
  private _templateUrl : string;  // 模板URL， 返回Handlebars模板的URl
  private _serviceUrl : string;   // 服务URl，返回JSON数据的网络服务RUL
  private _args : any;            // 请求参数， 被发送到网络服务的数据
  constructor(config) {
    this._container = config.container;
    this._templateUrl = config.templateUrl;
    this._serviceUrl = config.serviceUrl;
    this._args = config.args;
  }
  //... 接受 服务URL  请求参数 请求成功后回调 请求失败后 回调
  private _loadJson(url : string, args : any, cb : cb, errorCb : cb) {
    $.ajax({
      url: url,
      type: "GET",
      dataType: "json",
      data: args,
      success: (json) => {
        cb(json);
      },
      error: (e) => {
        errorCb(e);
      }
    });
  }
  //... handlebars 是 能在浏览器中编译并渲染HTML模板的库
  // 这些模板可以帮我们将JSON 转成 HTML
  // _loadHbs 方法 与上边的 类似吗， 但 不是加载JSON 而是加载 一个 handlebars 模板
  private _loadHbs(url : string, cb : cb, errorCb : cb) {
    $.ajax({
      url: url,
      type: "GET",
      dataType: "text",
      success: (hbs) => {
        cb(hbs);
      },
      error: (e) => {
        errorCb(e);
      }
    });
  }
  // ... 接受 handlebars 模板字符串作为参数， 并尝试使用handlebars编译函数去编译他
  private _compileHbs(hbs : string, cb : cb, errorCb : cb) {
    try
    {
    var template = Handlebars.compile(hbs);
      cb(template);
    }
    catch(e) {
      errorCb(e);
    }
  }
  //... 将编译好的模板 和 已加载的 JSON 数据作为参数传入，并遵循模板语法规则，
  // 将他们放在一起使 JSON 转成 HTML
  private _jsonToHtml(template : any, json : any, cb : cb, errorCb : cb) {
    try
    {
    var html = template(json);
      cb(html);
    }
    catch(e) {
      errorCb(e);
    }
  }
  //... 使用 _jsonToHtml 生成的HTML 作为参数， 并将它插入DOM元素中
  private _appendHtml(html : string, cb : cb, errorCb : cb) {
    try
    {
      if($(this._container).length === 0) {
        throw new Error("Container not found!");
      }
      $(this._container).html(html);
      cb($(this._container));
    }
    catch(e) {
      errorCb(e);
    }
  }
  //... render 负责执行 以下 流程
    // 顺序
    // 1、加载JSON数据---json
    // 2、加载模板  ---hbs
    // 3、编译模板  ---json hbs=>template
    // 4、将JSON转化为HTML  --- json=>template.(json)=>Html 
    // 5、将HTML 插入到 DOM元素中 --appendChild
  public render(cb : cb, errorCb : cb) {
    try
    {
      this._loadJson(this._serviceUrl, this._args, (json) => {
        this._loadHbs(this._templateUrl, (hbs) => {
          this._compileHbs(hbs, (template) => {
            this._jsonToHtml(template, json, (html) => {
              this._appendHtml(html, cb, errorCb);
            }, errorCb);
          }, errorCb);
        }, errorCb);
      }, errorCb);
    }
    catch(e){
      errorCb(e);
    }
  }
}
