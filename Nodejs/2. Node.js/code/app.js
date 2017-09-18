//console.log
console.log("This is a test string.");

//console.error
console.error("This is anerror string.");

// console.dir
var user = {};
user.name = "Lulingniu";
user.getName = function(){return this.name};
user.setName = function(name){this.name = name};
console.dir(user);

// console.time | console.timeEnd
console.time('small loop');
for (var i = 0; i < 100000; i++) {
    
}
console.timeEnd('small loop');

//console.trace
console.trace(label);

//console.assert
console.assert(1==22, 'raise an exception');
