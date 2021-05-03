# ES6

[[toc]]

### 1、let、const 和 var 的概念与区别

#### **1 、var 关键字**

使用 var 操作符来定义变量，在不初始化的情况下，变量会保存一个特殊值 underfined。

```javascript
var message = "hi";
```

如上初始化变量不会将它标识为字符串类型，只是一个简单的赋值而已。

（解释：js 是动态语言，message 的类型只有到运行时才能确定）

**var 声明作用域**

使用 var 操作符定义的变量会成为包含它的函数的局部变量

```javascript
function test() {
  var message = "hi"; //局部变量
}
test();
console.log(message); //出错！
```

解释：1、函数之外不能读取函数内部的代码。2、函数变量将在函数退出时（函数执行完或者函数生命周期）被销毁。

在函数内省略 var 可以创建一个全局变量，并且可以在函数外部访问到（不推荐且在严格模式下会报错 ）

```javascript
function test() {
  message = "hi"; //全局变量
}
test();
console.log(message); //"hi"
```

**var 声明提升**

使用 var 声明的变量会自动提升到函数作用域的顶部

```javascript
function foo() {
  console.log(age);
  var age = 26;
}
foo(); //undefind
//实际执行顺序：
function foo() {
  var age;
  console.log(age);
  age = 26;
}
```

_(要看词法分析)_

### **2、 let 声明**

- let 声明的是块作用域，而 var 声明的是函数作用域；

- 块作用域是函数作用域的子集，函数内 let 定义的变量，函数外不能访问到。

- JavaScript 引擎会记录用于变量声明的标识符及其所在的块作用域。

- let 和 var 声明的并不是不同类型的变量，他们只是指出变量在相关作用域如何存在。
- let 不存在变量提升，变量声明必须在变量使用之前
- let 在相同的作用域内不可以重复声明同一个变量

**暂时性死区**

let 声明的变量不会在作用域中被提升（let 声明变量之前，该变量都是不可用的），在 let 声明之前的瞬间叫做**`暂时性死区`**

ES6 明确规定，如果区块中存在 let 和 const 命令，则这个区块对这些命令声明的变量从一开始就形成了**封闭作用域**

```javascript
//name会被提升
console.log(name); //undefined;
var name = "matt";
//age不会被提升
console.log(age); //ReferenceError:age没有定义,age的死区
let age = 26;
```

- typeof 也不再是个百分之百安全的操作，下述代码在 let 之前，都属于 x 的“死区”。

  ```javascript
  typeof x; //error
  let x;
  ```

- 隐蔽的死区

  ```javascript
  function bar(x = y, y = 2) {
    return [x, y];
  }
  bar(); //报错
  ```

  上述代码，在 y 被声明之前属于 y 的死区，所以 x=y 会报错，一下代码则不会报错。

  ```javascript
  function bar(x = 2, y = x) {
    return [x, y];
  }
  bar(); //[2,2]
  ```

- 在变量声明结束前使用变量也是会报错的

  ```javascript
  let x = x; //error
  ```

**全局声明**

let 在全局作用域中声明的变量不会成为 window 对象的属性，var 声明的变量则会

**条件声明**

let 的作用域是块，所以不可能检查前面是否已经使用

### **3 、const 声明**

const 和 let 的基本相同，区别是 const 声明变量时必须同时初始化变量，且尝试修改 const 声明的变量会导致运行时错误

const 变量引用的是一个对象，修改对象内部的属性并不违反 const 的限制

```javascript
let i = 0;
for (const j = 7; i < 5; ++i) {
  console.log(j);
} //7,7,7,7,7

for (const key in { a: 1, b: 2 }) {
  console.log(key);
} //a,b

for (const value of [1, 2, 3, 4, 5]) {
  console.log(value);
} //1,2,3,4,5
```

### 2、变量提升与暂时性死区

**暂时性死区**

let 声明的变量不会在作用域中被提升（let 声明变量之前，该变量都是不可用的），在 let 声明之前的瞬间叫做**`暂时性死区`**

**var 声明提升**

使用 var 声明的变量会自动提升到函数作用域的顶部

```javascript
function foo() {
  console.log(age);
  var age = 26;
}
foo(); //undefind
//实际执行顺序：
function foo() {
  var age;
  console.log(age);
  age = 26;
}
```

### 3、变量的结构赋值

#### 数组的解构赋值

**1、基本用法**

ES6 允许按照一定模式从数组和对象中提取值，然后对变量进行赋值，这种被称为解构（Destructuring）

```js
let a,
  b,
  c = [1, 2, 3];
console.log(a, b, c); //1,2,3
```

本质上，只要等号两边的模式相同，左边的变量就会被赋予对应的值。

- 如果解构不成功，就会赋值 undefined。
- 如果等号左边的模式只匹配一部分等号右边的数组，这种情况下会变成不完全解构。
- 如果等号右边不是可遍历解构，那么就会报错。

> 只要某种数据解构具有 Iterator 接口，就可以采用数组形式的解构

**2、**默认值

```js
let [foo = true] = [];
console.log(foo); //true
let [x, y = "b"] = ["a", undefined]; //x='a',y='b';
```

> ES6 内部使用严格相等运算符（===）判断一个位置是否有值。所以如果一个数组元素不严格等于 undefined，默认值是不会生效的。

```js
let [x = 1] = [null];
console.log(x); //null
```

- 默认值可以是一个表达式，但是该表达式是惰性求值的，即只有在用到时才会求值。
- 默认值也可以其他变量，前提是该变量必须声明了。

#### 对象的解构赋值

```js
let { foo, bar } = { foo: "aaa", bar: "bbb" };
foo; //aaa
bar; //bbb
```

**对象解构和数组解构的不同点：**

- 数组的元素是按次序排列的，变量的取值是由它的位置决定的；
- 对象的属性没有次序，变量必须与属性同名才能取到正确的值；

如果变量名与属性名不一致，可以写成：

```js
var { foo: baz } = { foo: "aaa", bar: "bbb" };
baz; //"aaa"
```

对象的解构赋值的内部机制是先找到同名属性，然后再赋值给对应的变量，真正被赋值的是后者，而不是前者；

```js
let { foo: baz } = { foo: "aaa", bar: "bbb" };
baz; //"aaa"
boo; //error:foo is not defined
```

上述代码中，foo 是模式，baz 才是变量。真正被赋值的是变量 baz，而不是模式 foo。非别名解构赋值应该是下面形式的简写：

```js
var { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" };
```

对象解构也可以指定默认值。生效条件是对象的属性值严格等于 undefined。

如果解构模式是嵌套的对象，如果子对象所在的父属性不存在，那么将会报错。

如果要将一个已经声明的变量用于解构赋值，

```js
let x;
{x} = {x:1};//error
```

**原因：**js 引擎会将{x}理解成一个代码块，正确操作为：`({x} = {x:1})`

#### 字符串、数值和布尔类型解构赋值

#### 函数声明解构赋值

#### 圆括号规则

#### 解构使用场景

### 箭头函数及其 this 问题

### Symbol 概念及其作用

### Set 和 Map 数据结构

### Proxy

### Reflect 对象

### Promise（手撕 Promise A+规范、Promise.all、Promise 相关 API 和方法）

### Iterator 和 for...of（Iterator 遍历器的实现）

### 循环语法比较及使用场景（for、forEach、for...in、for...of）

### Generator 及其异步方面的应用

### async 函数

### 几种异步方式的比较（回调、setTimeout、Promise、Generator、async）

### class 基本语法及继承

### 模块加载方案比较（CommonJS 和 ES6 的 Module）

### ES6 模块加载与 CommonJS 加载的原理
