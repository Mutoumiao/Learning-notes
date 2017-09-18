# Constructor (构造器) 模式
### 介绍
在经典面向对象编程语言中,Constructor是一种在内存已分配给该对象的情况下,用于初始化新创建新对象的特殊方法.在Javascript中,几乎所有东西都是对象,通常最感兴趣的是Object构造器.

>Objcet构造器用于创建特定类型的对象--准备好对象以备使用,同时接收构造器可以使用的参数,以在第一次创建对象时,设置成员属性和方法的值

### 对象创建
在Javascript中,创建对象的两种常用方法如下所示:
```javascript
//下面每种方式都将创建一个新的空对象
var newObject = {};

var newObject = new Object();

//四种方法可以将键值赋值给一个对象:
//es3 兼容方式

//1. "点" 语法

//设置属性
newObjcet.someKey = "hello World";

//获取属性
var key = newObject.someKey;

//2.中括号语法

//设置属性
newObject["someKey"] = "hello world";

//获取属性
var key = newObject["someKey"];

//只适用es5

//3. Object.defineProperty

//设置属性
Object.defineProperty(newObjcet, "someKey",{
    value: "hello world",
    writable: true, //可写
    enumerable: true, //可枚举
    configurable: true //可配置
});

//简便方式
var defineProp = function (obj, key, value) {
    config.value = value;
    Object.defineProperty(obj, key, config);
};

//使用上述方式
var person = Object.create(null);

defineProp(person, "car", "Delorean");
defineProp(person, "dateOfBirth", "1981");
defineProp(person, "hasBeard", false);

//4. Object.defineProperties

//设置属性
Object.defineProperties(newObject, {
    "someKey": {
        value: "hello world",
        writable: true
    },
    "anotherKey": {
        value: "foo bar",
        writable: false
    }
});

//使用继承方法:

//es5
var driver = Object.create(person);

//设置自身属性
defineProp(dirver, "topspeed", "100mph");

//获得继承属性
console.log(driver.dateOfBirth);

//获取自身属性
console.log(driver.topSpeed);

```

### 基本Constructor(构造器方法)
>Javascript不支持类的概念,但它确实支持与对象一起用的特殊constructor函数.通过在构造器前面加new 关键字,告诉Javascript像使用构造器一样实例化一个新对象,并且对象成员由该函数定义.

在构造器内,关键字this引用新创建的对象
```javascript

function Car(model, year, miles) {
    this.model = model;
    this.year = year;
    this.miles = miles;

    this.toString = function () {
        return this.model + "has done" + this.miles + "miles";
    };
}

//用法

//可以创建car的新实例
var civic = new Car("Honda Civic", 2009, 20000);
var mondeo = new Car("Ford Mondeo", 2010, 5000);
```
上述构造器版本缺点:
上述方式使继承变得困难,toString()这样的函数是为每个使用Car构造器创建的新对象而分别重新定义的,这不是最理想的,因为这种函数应该在所有Car类型实例之间共享


### 带原型的Constructor(构造器)

>Javascript中有一个为prototype的属性,调用Javascript构造器创建一个对象后,新对象就会具有构造器原型的所有属性.通过这种方式,可以创建多个Car对象,并访问相同的原型

```javascript
function Car (model, year, miles) {
    this.model = model;
    this.year = year;
    this.miles = miles;
}

//Car.prototype.toString不使用Car.prototype为了避免重新定义prototype
Car.prototype.toString = function () {
    return this.model + "has done" + this.miles + "miles";
};

//用法:
var civic = new Car("Honda Civic", 2009, 20000);
var mondeo = new Car("Ford Mondeo", 2010, 5000);

console.log(civic.toString());
console.log(mondeo.toString());
```
现在toString()的单一实例就能够在所有Car对象之间共享

