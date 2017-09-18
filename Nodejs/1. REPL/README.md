### REPL 运行环境简单介绍
>在Node.js中,提供一了一个交互式运行环境-REPL. 在这个运行环境中,我们可以做一些简单的应用程序的测试和调试

在命令行窗口中,输入"node" 命令并回车键,即可进入REPL运行环境, 命令窗口中将会显示REPL运行环境中的命令提示符(默认为"\>")
```
$ node
>
```
在REPL运行环境中,我们可以执行变量的操作,函数的书法以及执行等操作
```
> foo = 'bar'
'har'
> 3>2>1
false
> true === 1
true
```

### REPL 运行环境功能使用
- 可以使用下划线字符串('_') 的使用来访问最近使用的表达式
```
> a = 3;
3
> _+ =;
4
> a ;
3
```
> 但是输入下划线并不意味修改变量的值
-  .break
> 当你在书写一个多行函数的中途想要放弃该函数的书写或重新书写该函数时,该命令可以使你返回到命令提示符的起点处
```
> a = [1, 2, 3];
[ 1, 2, 3]
> a.forEach(function(v){
    aubFunction(v);
        .break
> 
```
- Ctrl + C : 可以退出REPL运行环境

- .clear
> 用于清除REPL运行环境的上下文对象中保存的所有变量与函数

- .exit 
> 该命令用于退出REPL运行环境

- .help
> 该命令将在命令行窗口中显示REPL运行环境中的所有基础命令

- .save
> 该命令将把你在REPL运行环境中输入的所有表达式保存到一个文件中,使用方法及执行结果
```
> a = [1, 2, 3];
[1, 2, 3]
> a.forEach(function(v){
    subFunction(v);
    function subFunction(sv){
        console.log(sv);
    }
});
1
2
3
undefined
> .save ../save.js
Session saved to : ../save.js
>
```
>打开被保存的save.js文件,其中的内容如上所示

- .load
> 该命令将把某个文件中保存的所有表达式依次加载到REPL运行环境中
```
> .load ../save.js
> a = [1, 2, 3];
[1, 2, 3]
> a.forEach(function(v){
    subFunction(v);
    function subFunction(sv){
        console.log(sv);
    }
});
1
2
3
undefined
>
```

### 小结

> 简单介绍了Node.js框架中提供的可交互式运行环境-REPL. 开发者可以在该环境中很方便地输入各种JavaScript表达式并观察表达式的运行结果
