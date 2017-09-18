### Node.js 基础
- Node.js中的控制台
- Node.js中的全局作用域
- Node.js中的事件处理机制及事件环
> 约定标志 : 
- => : 输出符
### 2.1 Node.js 中的控制台
> 可以通过console对象的各种方法对控制台进行标准的输出流与标准错误输出流的输出

- 2.1.1 `console.log` 方法
>console.log方法用于进行标准输出流的输出
```javascript
 console.log ("This is a test string.");
```
>可以将该行代码保存在一个脚本文件,然后通过命令行执行
```javascript
> node app.js
This is a test string.
> console.log(2+2);
4
```
> 在Node.js中,也可以使用`console.info`方法来代替`console.log`方法,这两个方法的作用与使用完全相同

- 2.1.2 `console.error` 方法
> `console.error` 方法用于进行标准错误输出流的输出,即向控制台中输出一行错误信息
```javascript
console.error("This is anerror string.");
```

- 2.1.3 `console.dir` 方法
> `console.dir`方法用于查看一个对象的内容并且将该对象的信息输出到控制台中
```javascript
var user = {};
user.name = "Lulingniu";
user.getName = function(){return this.name};
user.setName = function(name){this.name = name};
console.dir(user);

=> { name: 'Lulingniu', setName: [Function] }
```

- 2.1.4 `console.time` 方法与 `console.timeEnd` 方法
> 当需要统计一段代码的执行时间时,可以使用`console.time`与`conso.timeEnd`方法 ,其中`console.time` 用于标记开始时间,`console.timeEnd`用于标记结束时间,并且将结束时间与开始之间通过的毫秒数在控制台中输出
```javascript
console.time(string); //传入参数字符串必须保持一致
console.timeEnd(string);
```
```javascript
console.time('small loop');
for (var i = 0; i < 100000; i++) {
    
}
console.timeEnd('small loop');

=> small loop: 0.443ms
```
- 2.1.5 `console.trace`方法
> console.trace 方法用于将当前位置处的栈信息作为标准错误信息进行输出
```javascript
console.trace(label); //传入参数字符串,用来标记此处输出的标准错误信息
```

- 2.1.6 `console.assert` 方法
> console.assert方法用于对一个表达式的执行结果进行评估(类似if 语句),如果该表达式的执行结果为`false`,则输出一个小心字符串并抛出`AssertionError`异常
```javascript 
console.assert(1==22, 'raise an exception');

=> AssertionError: raise an exception
    at Console.assert (console.js:95:23)
    at repl:1:9
    at sigintHandlersWrap (vm.js:22:35)
    at sigintHandlersWrap (vm.js:73:12)
    at ContextifyScript.Script.runInThisContext (vm.js:21:12)
    at REPLServer.defaultEval (repl.js:340:29)
    at bound (domain.js:280:14)
    at REPLServer.runBound [as eval] (domain.js:293:12)
    at REPLServer.<anonymous> (repl.js:538:10)
    at emitOne (events.js:101:20)
```

### 2.2 Node.js中的全局作用域及全局函数

#### 2.2.1 Node.js中的全局作用域
>在Node.js中,在一个模块中定义的变量,函数或者方法只有在该模块中可用,单可以通过`exports`对象的使用将其传递到模块外部
>但是,在Node.js中,仍然存在一个全局作用域,既可以定义一些不需要通过任何模块的加载即可使用的变量函数或者类
>在Node.js中,定义了一个`global`对象,代表Node.js中的全局命名空间,任何全局变量,函数或者对象都是该对象的一个属性值
- 在REPL运行环境中,可以通过如下语句来观察`global`对象中的内容
```javascript
console.log(global);

=> { DTRACE_NET_SERVER_CONNECTION: [Function],
  DTRACE_NET_STREAM_END: [Function],
  DTRACE_HTTP_SERVER_REQUEST: [Function],
  DTRACE_HTTP_SERVER_RESPONSE: [Function],
  DTRACE_HTTP_CLIENT_REQUEST: [Function],
  DTRACE_HTTP_CLIENT_RESPONSE: [Function],
  COUNTER_NET_SERVER_CONNECTION: [Function],
  COUNTER_NET_SERVER_CONNECTION_CLOSE: [Function],
  COUNTER_HTTP_SERVER_REQUEST: [Function],
  .......

> var test = "Tist";

=>   .......  
     [Function: require]
     resolve: [Function: resolve],
     main: undefined,
     extensions: { '.js': [Function], '.json': [Function], '.node': [Function] },
     cache: {} },
 text: 'This' }
```
#### 2.2.2 `global`函数介绍

- `setTimeout` 函数与 `clearTimeout` 函数
>Node.js中定义的`setTimeeout`全局函数的作用与客户端Javascript脚本代码中`setTimeout`函数作用类似,在当前时刻过去多少毫秒之后执行某个回调函数,具体延迟时间取决于外部因素,例如操作系统的世界粒度.
```javascript
/*
cd : 回调函数
ms : 毫秒数
[arg] : 可选回调参数
*/
setTimeout(cd, ms, [arg],[...])

//使用setTimeout 函数指定过5秒钟后调用testFunction函数
var timer = setTimeout(testFunction,5000,"this is a parameter");
//使用clearTimeout函数取消testFunction函数的调用
clearTimeout(timer)
```

- `setlnterval` 函数与 `clearInterval` 函数
> Node.js中定义的`setLnterval`全局函数的作用与客户端javascript脚本代码中的`setTnterval`函数的作用类似,表示在当前时刻过去后每隔多少毫秒执行某个回调函数,具体延迟时间取决于外部因素
```javascript
/*
cd : 回调函数
ms : 毫秒数
[arg] : 可选回调参数
*/
setInterval(cb, ms, [arg],[...]);

//使用setInterval 函数指定每隔5秒钟后调用testFunction函数
var timer = setInterval(testFunction,5000,"this is a parameter");
//使用clearInterval函数取消testFunction函数的调用
clearInterval(timer)
```

#### 与模块相关的全局函数及对象
 - 使用 `require` 函数加载模块
 >可以使用`require`函数来加载模块,代码如下
 ``` javascript

var foo = require('../foo.js'); //文件模块
//或
var http = require('http'); // 内置模块
```
`require`函数使用了一个参数,参数值可以为带有完整路径的模块文件名,也可以为模块名

代码示例:
```javascript
//创建文件 testModule.js 内容如下:
var testVar = "This is a variable from testModule.js";
exports.testVar = testVar;
------------------------------
//创建文件 app-main.js 内容如下:
var testModule = require('./testModule.js');
console.log(testModule.testVar);

```
>在这段代码中,引用`testModule.js`模块文件并将模块对象赋值给`testModule`对象

在命令行窗口操作:
```javascript
> node app-main.js
This is a variable from testModule.js
```

>在Node.js中,由于所有脚本文件都是一个模块,因此`app-main.js`脚本文件本身也是个模块文件,又由于该文件是在命令行窗口中通过`node`命令被直接运行,因此在Node.js中将该模块文件所定义的模块称为应用程序的主模块.

在Node.js中,定义了一个`require.main`变量,用来检测一个模块是否为应用程序中的主模块

```javascript
//app-main.js内部
var testModule = require('./testModule.js');
console.log(testModule.testVar);

if(module === require.main) {
    console.log('This is the main module of application.');
}
```
如果将这段代码移动到`testModule.js`文件的底部,则控制台的输出结果不会有所改变

- 使用`require.resolve` 函数查询完整模块名
> 可以使用`require.resolve` 函数来查询某个模块文件的带有完整绝对路径的文件名,代码如下所示:
```javascript
require.resolve('./testModule.js');
```
在这行代码中,我们使用`require.resolve`函数来查询当前目录下testModule.js模块文件的带有完整绝对路径的模块文件名

>注意: 使用`require.resolve`函数查询模块文件名时并不会加载该模块

- `require.cache`对象
>定义了一个`require.cache`对象,该对象代表缓存了所有已被加载模块的缓存区
可以使用`console.log(require.cache);`,表达式来查看该缓存区中的内容

可以通过键名来访问某个模块
`require.cache['模块文件名']`

删除缓存区中缓存的某个模块后重新加载该模块
```javascript
var testModule1 = require('./restModule.js');
var testModule2 = require('./restModule.js');
delete require.cache[require.resolve('./testModule.js')];
var testModule3 = require('./testModule.js');
```

#### `__filename` 变量与 `__dirname`变量
 - `__filename` 变量
 >在任何模块文件内部,可以使用`__filename`变量获取当前模块文件的带有完整绝对路径的文件名
 - `__dirname` 变量
 >在任何模块文件内部,可以使用`__dirname`变量获取当前模块文件所在的目录路径

```javascript
console.log(__filename);
console.log(__dirname);

=> D:\node.js\node app-main.js
   D:\node.js\
```
