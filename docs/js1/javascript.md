# JavaScript高级程序设计

## 第三章  语言基础

### 一 语法

#### 3.1.1 区分大小写

#### 3.1.2标识符

关键字、保留字、true、false和null不能作为标识符

#### 3.1.3注释

​			//和/*   */

#### 3.1.4严格模式

#### 3.1.5 语句

- 语句以分号结尾，省略分号意味着由解析器确定语句在哪里结尾
- 代码快一个左花括号标识开始，一个右花括号标识结束

### 二 关键字与保留字

### 三 变量

ECMAScript变量是松散类型的。作为容器来讲，变量可以保存任何类型的数据；作为名称来讲，变量是一个保存任意值的命名占位符。

关键字：var、let、const（所有版本的ECMAScript都支持var，另外两个只能在ECMAScript6使用）

#### 1 、var关键字

使用var操作符来定义变量，在不初始化的情况下，变量会保存一个特殊值underfined。

```javascript
var message="hi";
```

如上初始化变量不会将它标识为字符串类型，只是一个简单的赋值而已。

（解释：js是动态语言，message的类型只有到运行时才能确定）

**var声明作用域**

使用var操作符定义的变量会成为包含它的函数的局部变量

```javascript
function test(){
    var message="hi"; //局部变量
}
test();
console.log(message);//出错！
```

解释：1、函数之外不能读取函数内部的代码。2、函数变量将在函数退出时（函数执行完或者函数生命周期）被销毁。

在函数内省略var可以创建一个全局变量，并且可以在函数外部访问到（不推荐且在严格模式下会报错 ）

```javascript
function test(){
    message = "hi";//全局变量
}
test();
console.log(message);//"hi"
```

**var声明提升**

使用var声明的变量会自动提升到函数作用域的顶部

```javascript
function foo()
{
    console.log(age);
    var age=26;
}
foo();//undefind
//实际执行顺序：
function foo()
{
    var age;
    console.log(age);
    age=26;
}
```

*(要看词法分析)*

#### 2、 let 声明

- let声明的是块作用域，而var声明的是函数作用域；

- 块作用域是函数作用域的子集，函数内let定义的变量，函数外不能访问到。

- JavaScript引擎会记录用于变量声明的标识符及其所在的块作用域。

- let和var声明的并不是不同类型的变量，他们只是指出变量在相关作用域如何存在。
- let不存在变量提升，变量声明必须在变量使用之前
- let在相同的作用域内不可以重复声明同一个变量

**暂时性死区**

let声明的变量不会在作用域中被提升（let声明变量之前，该变量都是不可用的），在let声明之前的瞬间叫做**`暂时性死区`**

ES6明确规定，如果区块中存在let和const命令，则这个区块对这些命令声明的变量从一开始就形成了**封闭作用域**

```javascript
//name会被提升
console.log(name);//undefined;
var name="matt";
//age不会被提升
console.log(age);//ReferenceError:age没有定义,age的死区
let age =26;
```

- typeof也不再是个百分之百安全的操作，下述代码在let之前，都属于x的“死区”。

  ```javascript
  typeof x;//error
  let x;
  ```

- 隐蔽的死区

  ```javascript
  function bar (x=y,y=2){
      return [x,y];
  }
  bar()//报错
  ```

  上述代码，在y被声明之前属于y的死区，所以x=y会报错，一下代码则不会报错。

  ```javascript
  function bar (x=2,y=x){
      return [x,y];
  }
  bar()//[2,2]
  ```

- 在变量声明结束前使用变量也是会报错的

  ```javascript
  let x=x//error
  ```

  

**全局声明**

let在全局作用域中声明的变量不会成为window对象的属性，var声明的变量则会

**条件声明**

let的作用域是块，所以不可能检查前面是否已经使用

#### 3 、const声明

const和let的基本相同，区别是const声明变量时必须同时初始化变量，且尝试修改const声明的变量会导致运行时错误

const变量引用的是一个对象，修改对象内部的属性并不违反const的限制

```javascript
let i=0;
for(const j=7;i<5;++i){
    console.log(j);
}//7,7,7,7,7

for(const key in {a:1,b:2}){
    console.log(key);
}//a,b

for(const value of [1,2,3,4,5]){
    console.log(value);
}//1,2,3,4,5
```

#### 4、块级作用域

为什么需要块级作用域？

1. 内层变量可能会覆盖外层变量
2. 用来计数的循环变量可能会泄露称为全局变量

#### 5、 声明风格及最佳实践

1. 不使用var
2. const优先，let次之

### 3.4 数据类型

ECMAScript的6中简单数据类型：Undefined、Null、Boolean、Number、String、Symbol、Object。Object是一种无序名值对的集合。

#### 3.4.1 typeof操作符

- undefined 是未定义；
- boolean 是布尔值；
- number 是数值；
- string 是字符串；****
- symbol 是符号；
- object 是对象；
- function 是函数；

```javascript
let message = "some string ";
console.log(typeof message);//"string"
console.log(typeof(message));//"string"
console.log(typeof 95);//"number"

```

数值字面量，又叫直接量，标识固定的一个值，例如上述代码中的95。

intinity(无穷大)和NaN(0/0)都是number类型，也是字面量。

typeof是一个操作符而不是函数

```javascript
 console.log(123.toSring())//报错
 console.log(123.0.toSring())//“123”
 console.log(123..toSring())//“123”
 console.log(123.11.toSring())//“123.11”
//数值字面量不能通过小数点来判断数字是否结束

 console.log((123).toSrting())

```

null被认为是一个空对象的引用

#### 3.4.2 Undefined 类型

用var或者let声明了一个变量但没有初始化，相当于给变量赋予了undefined值，此时比较该变量和undefined，两者是相等的。

**包含undefined值的变量跟未定义变量是有区别的**	

```javascript
let message;
console.log(message);//"undefined"
console.log(age);//报错
```

对于未声明变量，typeof返回的是字符串“undefined”。undefined是一个假值（false），但undefined不等同于false，所以要明确自己想要检测的是undefined这个字面值，还是假值（false）。

```javascript
undefined === false //false
let message;
if(message){
    //不会执行
}
if(!message){
    //会执行
}
if(age){
    //会报错
}
```

#### 3.4.3 Null类型

Null类型只有一个值，即特殊值null。null值表示一个空对象指针，typeof会返回一个“object” 

定义将来要保存对象值的变量时，建议使用null来初始化 

undefined是由null值派生而来的。这两个值表面上相等

null也是个假值，和undefined是假值 同理

```javascript
null == undefined //true
null === undefined //false
```

#### “==”和“\=\==”的比较规则

```javascript
“==”的比较规则
1、先检查两个操作数的数据类型是否相同
2、如果相同，则比较两个数是否相等
3、如果不同，则先将两个数转换为相同数据类型，再进行比较
“===”的比较规则
1、先检查两个操作数的数据类型是否相同
2、若不同，直接返回false
3、若相同，则比较二者是否相等
```

#### 3.4.4  Boolean类型

Boolean的字面值：true和false；布尔值不等同于数值，因此true不等于1，false不等于0。

**布尔值字面量是区分大小写的**

所以其他ECMAScript类型的值都有相应布尔值的等价形式，可以使用Boolean（）转型函数，该函数可以在任意类型的数据上调用，而且始终返回一个布尔值。if等流程控制语句会自动执行其他类型值到布尔值的转换。 

![image-20210114152114404](C:\Users\xxk\AppData\Roaming\Typora\typora-user-images\image-20210114152114404.png)

## 第四章  变量、作用域与内存

### 4.1原始值与引用值

### 4.2执行上下文与作用域

### 4.3  垃圾回收

- javascript是垃圾回收语言，通过自动内存管理实现内存分配和闲置资源回收。
- 基本思路：确定哪个变量不会再使用，然后释放它占用的内存。
- 缺点：某块内存是否还有用，属于”不可判定的“问题
- 垃圾回收程序必须跟踪纪录哪个变量还会使用，以及那个变量不会再使用，以便回收内存。
- 标记策略：标记清理和引用计数。

#### 4.3.1 标记清理

变量进入上下文时会被加上存在于上下文中的标记，变量离开上下文时，也会被加上离开上下文的标记。

#### 4.3.2 引用计数

- 对每个值都记录被引用的次数
- 存在问题：循环引用，对象A有一个指针指向对象B，而对象B也引用了对象A，引用技术策略下，这两个变量的引用数永远不会变成0。

#### 4.3.3 性能

- 垃圾回收程序会周期性运行，如果内存中分配了很多变量，则可能造成性能损失。
- 写代码时要做到：无论什么时候开始收集垃圾，都能让它尽快结束工作。

#### 4.4.4 内存管理

- 将内存占用量保持在一个较小的值可以让页面性能更好
- 优化内存占用的最佳手段就是保证在执行代码时只保存必要的数据，如果数据不再必要，那么把它设置能null（解除引用）

1. 通过const和let声明提升性能
2. 隐藏类和删除操作
3. 内存泄漏
4. 静态分配和对象池

## 第五章  基本引用类型

### 5.1 Date

创建日期对象，使用new操作符来调用Date构造函数。

```javascript
let now = new Date();
```









·