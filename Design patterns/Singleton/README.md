# Singleton (单例) 模式
单例模式的定义是：`保证一个类仅有一个实例，并提供一个访问它的全局访问点`。

单例模式是一种常用的模式，有一些对象我们往往只需要一个，比如线程池、全局缓存、浏
览器中的 window 对象等。在 JavaScript开发中，单例模式的用途同样非常广泛。试想一下，当我
们单击登录按钮的时候，页面中会出现一个登录浮窗，而这个登录浮窗是唯一的，无论单击多少
次登录按钮，这个浮窗都只会被创建一次，那么这个登录浮窗就适合用单例模式来创建。

> `Singleton`(单例) 模式被熟知的原因是因为它限制了类的实例化次数只能一次,从经典意义上来说,`Singleton`模式,在该实例不存在的情况下,可以通过一个方法创建一个类来实现创建类的新实例;如果实例已经存在,他会简单返回该对象的引用,`Singleton`不同与静态类(或对象),因为我们可以推迟它们的初始化,这通常是因为它们需要一些信息,而这些信息在初始化期间可能无法获得,对于没有察觉到之前的引用的代码,它们不会提供方便检索的方法,这是因为它既不是对象,也不是由`Singleton`返回"类",它是一个结构. 思考一下闭包变量为何实际上不是闭包,而提供闭包的函数作用域是闭包,在Javascript中,Singleton充当共享资源命名空间,从全局命名空间中隔离出代码实现,从而为函数提供单一访问点,我们可以像如下这样实现一个Singleton:

```javascript
var mySingleton = (function () {
    //实例保持了Singleton的一个引用
    var instance;
    function init () {
        //Singleton
        //私有方法和变量
        function privateMethod () {
            console.log("I am private");
        }
        var privateVariable = "Im also private";
        var privateRandomNumber = Math.random();
        return {
            //公有方法和变量
            publicMethod: function () {
                console.log("The public can see me!");
            },
            publicProperty: "I am also public",
            getRandomNumber: function () {
                return privateRandomNumber;
            }
        };
    }
    return {
        //获取Singleton的实例,如果存在就返回,不存在就创建实例
        getInstance: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    }
})();

var myBadSingleton = (function () {
    //实例保持了Singleton的一个引用
    var instance;
    function init () {
        //Singleton
        var privateRandomNumber = Math.random();
        return {
            getRandomNumber: function () {
                return privateRandomNumber;
            }
        };
    }
    return {
        //每次都创建新实例
        getInstance: function () {
            instance = init();
            return instance;
        }
    }
})();

var singleA = mySingleton.getInstance();
var singleB = mySingleton.getInstance();
console.log(singleA.getRandomNumber() === singleB.getRandomNumber()); //ture

var badSingleA = myBadSingleton.getInstance();
var badSingleB = myBadSingleton.getInstance();
console.log(badSingleA.getRandomNumber() !== badSingleB.getRandomNumber() ); //ture
```
