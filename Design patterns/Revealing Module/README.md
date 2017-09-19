# Revealing Module(揭示模块)模式

> `Module`稍微改进版本--Revealing Module(揭示模块)

模块实例:
```javascript
var myRevealingModule = function () {
    var privateVar = "Ben Cherry",
        publicVar = "Hey there!";

    function privateFunction () {
        console.log("Name: " + privateVar );
    }    

    function publicSetName (strName) {
        privateName = strName;
    }
    function publicGetName () {
        privateFunction();   
    }

    //将暴露的公有指针指向到私有函数和属性上

    return {
        setName: publicSetName,
        greeting: publicVar,
        getName: publicGetName
    }

}();

myRevealingModule.setName("Paul Kinlan");

//示例二
var myRevealingModule = function () {
    var privateCounter = 0;

    function privateFunction () {
        privateCounter++;
    }
    function publicFunction () {
        publicIncrement();
    } 
    function publicIncrement () {
        privateFunction();
    }
    function publicGetCount () {
        return privateCounter;
    }
    //将暴露的公有指针指向到私有函数和属性上
    return {
        start: publicFunction,
        increment: publicIncrement,
        count: publicGetCount
    };
};

myRevealingModule.start();
```

#### 优点
> 该模式可以使脚本语法更加一致,在模块代码地步,它也会很容易指出哪些函数和变量可以被公开访问,从而改善可读性

#### 缺点
> - 一个私有函数引用一个公有函数没在需要打补丁时,公有函数是不能被覆盖,这是因为私有函数将继续引用私有实现,该模式并不适用于公有成员,只适用于函数
> - 引用私有变量的公有对象成员也遵守无补丁规则
> - 正因为如此,采用该模式创建的模块可能比那些采用原始`Module`模式创建的模块更加的脆弱,所以在使用时应该特别小心
