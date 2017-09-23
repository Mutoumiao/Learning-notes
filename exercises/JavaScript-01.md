## 常见javaScript知识题个人分析

```javascript
function Foo() {
    getName = function () { alert (1); };
    return this;
}
Foo.getName = function () { alert (2);};
Foo.prototype.getName = function () { alert (3);};
var getName = function () { alert (4);};
function getName() { alert (5);}
```
> 根据以上代码并说出以下输出

```javascript
Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();
```

在了解代码时,代码在执行前会进行预解析处理,以下为预解析后的代码:
```javascript
function Foo() {
    getName = function () { alert (1); };
    return this;
}
var getName;
function getName() { alert (5);}
Foo.getName = function () { alert (2);};
Foo.prototype.getName = function () { alert (3);};
getName = function () { alert (4);};
```

### 输出分析

- `Foo.getName()`
> 因代码在Foo函数自身定义属性,因此在进行调用时,引擎执行会在当前函数查找该方法,因`Foo`对象自身定义了`getName()`因此输出:
```javascript
=> 2
``` 

- `getName()`
> 因javascript变量声明提前的机制,因此在预解析时,将变量与函数声明进行提前,因此最后`getName`函数被重新赋值,因此输出:
```javascript
=> 4
```

- `Foo().getName()`
> 根据代码调用,`Foo`函数优先调用并返回,在执行函数内第一条时,`getName`变量重新被赋值操作,因函数`getNam`没有`var`原因,导致引擎在该作用域无法查找到该变量,因此往上查找,而在全局作用域中查找成功,并重新赋值,因此全局`getNam`被重新赋值,而其函数内部定义`return this`,加上函数自身调用原因,导致`this`指向`window`,因此实际代码调用为`window.getName()`,因此输出:
```javascript
=> 1
```

- `getName()`
> 根据上个代码调用情况,全局变量`getName`被重新改写,因此输出为: 
```javascript
=> 1
```

- `new Foo.getName()`
> 根据调用代码调用情况,由于表达式优先级原因"."号优先于`new`,因此实际调用为`new (Foo.getName())`,因此输出:
```javascript
=> 2
```

- `new Foo().getName()`
> 根据表达式优先级原因,因此实际调用为从左`new Foo()`调用,因`new`操作符因此返回`this`指向新实例,因此调用后返回新的`Foo`实例,由于实例原型为`Foo.prototype`继承`Foo`构造函数,因此调用`getName()`时会在自身属性查找,在找不到时,寻找继承的原型上寻找,并输出,因此输出:
```javascript
=> 3
```

- `new new Foo().getName()`
> 老样子,根据优先级原因,因此代码实际的调用为`(new (new Foo()) ).getName()`,由于内部`new Foo()`调用并返回新实例,再次根据新实例`new`时,一样会继承与`Foo`构造函数,因此输出与上文一致:
```javascript
=> 3
```

## 小结:
主要考察知识点
- 变量声明提升
- 函数表达式
- this指向
- 运算符优先级
- 原型
- 构造函数
