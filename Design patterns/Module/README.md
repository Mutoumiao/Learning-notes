# Module (模块) 模式
> 模块是任何强大应用程序架构中不可或缺的一部分,它通常能够帮助我们清晰地分离和组织项目中的代码单元

在JavaScript中,有几种用于实现模块的方法,包括:

- 对象字面量表示法

- Module模式

- AMD模块

- CommonJs模块

- ECMAScript Harmony模块

在这里只先介绍上两种,后续再说明后面三种

### 对象字面量法
使用对象字面量表示法定义的模块:
```javascript

var myModule = {
    myProperty: "someValue",
    //对象字面量可以包含属性和方法
    //例如:可以声明模块的配置对象
    myConfig: {
        useCaching: true,
        language: "en"
    },

    //基本方法
    myMethod: function () {
        console.log("Where in the world is Paul Irish today?");
    },

    //根据当前配置输出信息
    myMethod2: function () {
       console.log("Caching is: " + (this.myConfig.useCaching))? "enadbled": 
       "disabled"; 
    }

    //重写当前的配置
    myMethod3: function (newConfing) {
        if (typeof newConfig = "object") {
            this.myConfig = newConfig;
            console.log(this.myConfig.language);
        }
    }
};

myModule.myMethod();
// => Where in the world is Paul Irish today?

myModule.myMethod2();
// => enadbled

myModule.myMethod3({
    language: "fr",
    useCaching: false
});

```
>使用对象字面量有助于封装和组织代码

### Module(模块)模式
Module模式最初被定义为一种传统软件工程中为类提供私有和公有封装的方法
> 在Javascript中,`Module`模式用于进一步模拟类的概念,通过这种方式,能够使一个单独的对象拥有公有/私有方法和变量,从而屏蔽来自全局作用域的特殊部分,产生的结果:函数名与在页面其他脚本定义的函数冲突的可能性降低

#### 私有
> `Module`模式使用闭包封装"私有"状态和组织,它提供了一种包装混合公有/私有方法和变量的方法,防止其泄露至全局作用域,并与别的开发人员的接口发生冲突,通过该模式,只需返回一个公有API,而其他的一切都维持在私有闭包里

在这里提供一个屏蔽处理底层事件逻辑的整洁解决方案,同时只暴露一个接口供应用程序的其他部分使用.该模式除了返回一个对象而不是一个函数之外,非常类似与一个立即调用的函数表达式
- IIFE

Module模式的实现示例:
```javascript
var testModule = (function () {
    var counter = 0;

    return {
        incrementCounter: function () {
            return ++counter;
        },

        resetCounter: function () {
            console.log("counter value prior to reset: " + counter );
            counter = 0;
        }
    };
})();

//用法:

//增加计数器
testModule.incrementCounter();
//检查计数器值并重置
testModule.resetCounter()
// => counter value prior to reset: 1
```

> 再这里,代码的其他部分无法直接读取`incrementCounter()`或`resetCounter()`包括`counter`变量,实际上是完全与全局作用域隔离,因此它表现得像一个私有变量,它的存在被局限于模块的闭包内,因此唯一能够访问其作用域的代码就是这两个函数,上述方法进行了有效的命名空间设置

使用`Module`模式时,可能会觉得它可以用来定义一个简单的模板来入门使用,下面是一个包含命名空间,公有和私有变量的`Module`模式:
```javascript

var myNamespace = (function () {
    //私有计数器变量
    var myprivateVar = 0 ;

    var myPrivateMethod = function (foo) {
        console.log(foo);
    };

    return {
        //公有变量
        myPublicVar: "foo",

        //调用公有变量和方法的公有函数
        myPublicFunction: function (bar) {
            //增加私有计数器值
            myPrivateVar++;
            //传入bar调用私有方法
            myPrivateMethod(bar);
        }
    }
});

```
使用`Module`模式实现购物车:
```javascript

var basketModule = (function () {
    //私有
    var basket = [];

    function doSomethingPrivate () {
        //....
    }

    function doSomethingElsePrivate () {
        //...
    }

    //返回一个暴露出的公有对象
    return {
        
        //添加item购物车
        addItem: function (values) {
            basket.push(values);
        },

        //获取购物车里的item数
        getItemCount: function () {
            return basket.length;
        },

        //私有函数的公有形式式别名
        doSomething: doSomethingPrivate,

        //获取购物车里所有item的价格总值

        getTotal: function () {
            var itemCount = this.getItemCount(),
                total = 0;

            while(itemCount--) {
                total += basket[itemCount].price;
            }    
            return total;
        }
    };
})();

//在该模块中,可能已经注意到了返回了一个object. 它会被自动复制给basketModule,以便我们可以与它交互, 如下所示:

    //basketMdoule返回了一个拥有公用AIP的对象
    basketModule.addItem({
        item:"bread",
        price: 0.5
    });

    basketModule.addItem({
        item: "butter",
        price: 0.3
    });

    console.log(basketModule.getItemCount());
    //=> 2
    console.log(backetModule.getTotal());
    //=> 0.8
    
    //下述输出: undefined
    //因为basket自身没有暴露在公有AIP里,外部作用域无法访问闭包里面元素
    console.log(basketModule.basket)
    console.log(basket)
```
上述方法在`basketModule`内部都属于有效的命名空间设置

#### 优点:
> - 只有我们的模块才能够享用私有函数的自由,因为它们不会暴露于页面的其余部分(只会暴露于我们输出的API),我们认为它们是真正的私有
> - 鉴于函数往往已声明并命名,在试图找到有哪些函数抛出异常时,这将使得在调试器中显示调用堆栈变得更容易

### Module模式变化

#### 引入混入
模式的这种变化演示了全局变量(如: `jQuery`, `Underscore`) 如何作为参数传递给模块的匿名函数,这允许我们引入它们,并按照我们所希望的为它们取个本地别名

```javascript
//全局模块

var myModule = (function ($, _) {
    function privateMethod1 () {
        $(".container").html("test");
    }

    function privateMethod2 () {
        console.log(_.min([10, 5, 100 2, 1000]));
    }
    
    return {
        publicMethod: function () {
            privateMethod1();
        }
    }
})(jQuery,_)

myModule.publicMethod();
```

#### 引出

下面一个变化允许我们声明全局变量,而不需实现它们,并可以同样地支持上一个示例中的全局引入的概念:
```javascript

//全局模块
var myModule = (function () {

    //模块对象
    var module = {},
        privateVariable = "hello world";
    
    function privateMethod () {
        //....
    }

    module.publicProperty = "Foobar";
    module.publicMethod = function () {
        console.log(privateVariable);
    };
     
    return module;
})();

```
#### 优点: 
> 相比真正的封装思想,它对于很多拥有面向对象背景的开发人员来说更加的整洁,至少是从Javascript的角度,其次,它支持私有数据,因此,在`Module`模式中,代码的公有部分能够接触私有部分,然而外界无法接触类的私有部分

#### 缺点:
> - 由于我们访问公有和私有成员的方式不同,当我们想改变可见性时,实际上我们必须要修改每个曾经使用过该成员的地方
> - 无法为私有成员创建自动化单元测试,bug需要修正补丁时会添加额外的复杂性,为私有方法打补丁是不可能的,相反,我们必须覆盖所有与有bug的私有方法进行交互的公有方法,另外开发人员也无法轻易地扩展私有方法,所以私有方法并不像它们最初显现出来的那么灵活 
