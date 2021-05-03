# javascript

[[toc]]

### 1.原始值和引用值类型及区别

js 一共有六种基本数据类型，分别是 Undefined、Null、Boolean、Number、String，还有在 ES6 中新增的 Symbol 和 ES10 中新增的 BigInt 类型。

- Symbol 代表创建后独一无二且不可变的数据类型，它的出现我认为主要是为了解决可能出现的全局变量冲突的问题。
- BigInt 是一种数字类型的数据，它可以表示任意精度格式的整数，使用 BigInt 可以安全地存储和操作大整数，即使这个数已经超出了 Number 能够表示的安全整数范围。

**JavaScript** **有几种类型的值**？**你能画一下他们的内存图吗**？

- 栈：原始数据类型（Undefined、Null、Boolean、Number、String、bigint、symbol）
- 堆：引用数据类型（对象、数组和函数）

两种类型的区别是：存储位置不同。

1. 原始数据类型直接存储在栈（stack）中的简单数据段，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储。
2. 引用数据类型存储在堆（heap）中的对象，占据空间大、大小不固定。如果存储在栈中，将会影响程序运行的性能；引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。

### 2.判断数据类型 typeof、instanceof、Object.prototype.toString.call()、constructor

https://www.cnblogs.com/onepixel/p/5126046.html

### 3.类数组与数组的区别与转换

https://blog.csdn.net/qq_37635012/article/details/106195211

### 4.数组的常见 API

**修改原数组的**API

**pop（）：**弹出数组中最后一个元素，并返回这个元素

```js
let arr = [1, 2, 3, 4, 5, 6];
let result = arr.pop();
console.log(arr); // [1, 2, 3, 4, 5]
console.log(result); // 6
```

**push（）**：添加一个或多个元素到数组末尾，并返回新的长度

```js
let arr = [1, 2, 3, 4, 5, 6];
arr.push(7, 8);
console.log(arr); // [1, 2, 3, 4, 5, 6, 7, 8]
console.log(arr.length); // 8
```

**shift（）**：弹出数组的第一个元素，并返回这个元素

```js
let arr = [1, 2, 3, 4, 5, 6];
let result = arr.shift();
console.log(arr); // [2, 3, 4, 5, 6]
console.log(result); // 1
```

**unshift（）**：在数组开头添加一个或多个元素，并返回新的长度

```js
let arr = [1, 2, 3, 4, 5, 6];
arr.unshift(-1, 0);
console.log(arr); // [-1, 0, 1, 2, 3, 4, 5, 6]
console.log(arr.length); // 8
```

**splice（x，n，...）**：从 x 位置开始截取，截取 n 个并返回被截取的元素，第三个参数是截取完了需要添加哪些元素，从 x 的位置开始添加

从数组的第 1 位开始截取，截取 3 位并返回，再从第 1 位开始添加‘x’‘y’‘z’

```js
let arr = [1, 2, 3, 4, 5, 6];
let result = arr.splice(1, 3, "x", "y", "z");
console.log(arr); // [1, "x", "y", "z", 5, 6]
console.log(result); // [2, 3, 4]
```

**.reverse（）**：逆转数组的顺序

```js
let arr = [1, 2, 3, 4, 5, 6];
arr.reverse();
console.log(arr); // [6, 5, 4, 3, 2, 1]
```

**sort（）**：给数组排序(默认从小到大)

```js
let arr = [1, 6, 4, 3, 5, 2];
arr.sort();
console.log(arr); // [1, 2, 3, 4, 5, 6]
```

sort 还可以接受一个函数作为参赛，该函数接受两个参数 a，b

如果 a < b 就返回一个负数，a 就排在 b 的前面

如果 a === b 就返回 0，顺序不变

如果 a > b 就返回一个正数，a 就排在 b 的后面

```js
let arr = [1, 6, 4, 3, 5, 2];
arr.sort((a, b) => {
  if (a < b) {
    return -1;
  } else if (a === b) {
    return 0;
  } else {
    return 1;
  }
});
console.log(arr); // [1, 2, 3, 4, 5, 6]
```

可以简写为

```js
let arr = [1, 6, 4, 3, 5, 2];
arr.sort((a, b) => b - a);
console.log(arr); // [1, 2, 3, 4, 5, 6]
```

同理，返回 b - a 就可以倒序排列

```js
let arr = [1, 6, 4, 3, 5, 2];
arr.sort((a, b) => b - a);
console.log(arr); // [6, 5, 4, 3, 2, 1]
```

**返回新数组的 API**

**concat（）**：把传入的数组，或者元素+数组合并成一个新的数组，返回这个新数组

```js
let arr = [1, 2, 3];
let arr2 = [4, 5, 6];
let newArr = arr.concat(arr2);
console.log(newArr); // [1, 2, 3, 4, 5, 6]
```

**slice（）**：截取数组，不会改变原数组

从数组的第 0 位截取到数组的第 3 位

```js
let arr = [1, 2, 3, 4, 5, 6];
let result = arr.slice(0, 3);
console.log(result); // [1, 2, 3]
```

如果不给第二个参数，那么就从第 1 个参数的位置截取到数组的最后

```js
let arr = [1, 2, 3, 4, 5, 6];
let result = arr.slice(3);
console.log(result); // [4, 5, 6]
```

**join（）**：把数组中的元素连接成一个字符串并返回，不会改变原数组

可以选择用什么作为分隔符，空字符串就代表没有分隔符

```js
let arr = [1, 2, 3, 4, 5, 6];
let result = arr.join("");
console.log(arr); // [1, 2, 3, 4, 5, 6]
console.log(result); // '123456'
```

**indexOf（）**：查找元素在数组中第一次出现时的索引，如果没有就返回-1

```js
let arr = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
let result = arr.indexOf(3);
console.log(result); // 2
```

**LastIndexOf（）**：查找元素在数组中最后一次出现时的索引，如果没有就返回-1

```js
let arr = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
let result = arr.indexOf(3);
console.log(result); // 8
```

**数组遍历方法**

**forEarh（）**：传入一个函数，把数组的每一项作为函数的参数被调用，不改变原数组

```js
let arr = [1, 2, 3, 4, 5, 6];
arr.forEach((item) => {
  console.log(item); // 依次输出1到6
});
```

**map（）**：传入一个函数，把数组的每一项作为函数的参数被调用，然后用函数每次的返回值组成新的数组并返回，不改变原数组

```js
let arr = [1, 2, 3, 4, 5, 6];
let newArr = arr.map((item) => item * item); // 箭头函数的简写,不用写return
console.log(arr); // [1, 2, 3, 4, 5, 6]
console.log(newArr); // [1, 4, 9, 16, 25, 36]
```

**filter（）**：传入一个函数，把数组的每一项作为函数的参数被调用，在函数内部判断符合条件的每一项，把它们组成新的数组并返回，不改变原数组

```js
let arr = [1, 2, 3, 4, 5, 6];
let newArr = arr.filter((item) => item % 2 === 0); // 取数组中的偶数
console.log(arr); // [1, 2, 3, 4, 5, 6]
console.log(newArr); // [2, 4, 6]
```

**reduce（）**：接受两个参数，函数和初始值，其中函数接受两个参数，那个初始值和数组的每一项，每次用初始值对数组的每一项进行操作并返回这个新的初始值（函数返回），不改变原数组

初始值为 0，sum 代表了初始值，每次用 sum+= item，最后初始值为 21 并被返回（reduce 返回）

```js
let arr = [1, 2, 3, 4, 5, 6];
let result = arr.reduce((sum, item) => (sum += item), 0);
console.log(arr); // [1, 2, 3, 4, 5, 6]
console.log(result); // 21
```

### 5.[bind、call、apply 的区别][https://zhuanlan.zhihu.com/p/71553017]

- 三者都可以改变函数的 this 对象指向。
- 三者第一个参数都是 this 要指向的对象，如果如果没有这个参数或参数为 undefined 或 null，则默认指向全局 window。
- 三者都可以传参，但是 apply 是数组，而 call 是参数列表，且 apply 和 call 是一次性传入参数，而 bind 可以分为多次传入。
- bind 是返回绑定 this 之后的函数，便于稍后调用；apply 、call 则是立即执行 。

### 6.[new 的原理][https://www.zhihu.com/question/36440948/answer/71234418]

要创建 Person 的新实例，必须使用 new 操作符。以这种方式调用构造函数实际上会经历以下 4 个步骤：
（1）创建一个新对象；
（2）将构造函数的作用域赋给新对象（因此 this 就指向了这个对象）；
（3）执行构造函数中的代码（为这个新对象添加属性）；
（4）返回新对象。

### 7.[如何正确判断 this?][https://zhuanlan.zhihu.com/p/26766112]

`this`是执行上下文中的一个属性，它指向最后一次调用这个方法的对象。在实际开发中，`this`的指向可以通过四种调用模式来判断(按优先级排列)

- 构造器调用模式，一个函数使用 new 调用时，函数执行前会创建一个对象， this 指向这个新创建的对象;
- `apply`、 `call`、 `bind` 调用模式，显示制定调用函数的`this`指向;
- 方法调用模式，一个函数作为对象的方法调用时，`this`指向该对象;
- 函数调用模式， 函数直接调用时，`this`指向全局对象
- 箭头函数中没有 this，他不能使用 new 实例化，也不能使用`apply`、 `call`、 `bind`等改变 this 的指向

### 8.[闭包及其作用][https://zh.javascript.info/closure]

闭包是指有权访问另一个函数作用域中变量的函数，创建闭包的最常见的方式就是在一个函数内创建另一个函数，创建的函数可以访问到当前函数的局部变量。

闭包有两个常用的用途。

闭包的第一个用途是使我们在函数外部能够访问到函数内部的变量。通过使用闭包，我们可以通过在外部调用闭包函数，从而在外部访问到函数内部的变量，可以使用这种方法来创建私有变量。

闭包的另一个用途是使已经运行结束的函数上下文中的变量对象继续留在内存中，因为闭包函数保留了这个变量对象的引用，所以这个变量对象不会被回收。

其实闭包的本质就是作用域链的一个特殊的应用，只要了解了作用域链的创建过程，就能够理解闭包的实现原理。

### 9.原型和原型链

利用原型让一个引用类型继承另一个引用类型的属性和方法。

缺点：

1. 包含引用类型的原型属性会被所有实例属性共享，容易造成属性的修改混乱。
2. 在创建子类型的实例时，不能向超类型的构造函数中传递参数。

### 10.prototype 与**proto**的关系与区别

![proto](https://pic1.zhimg.com/80/e83bca5f1d1e6bf359d1f75727968c11_720w.jpg?source=1940ef5c)

1. 对象有属性\_\_proto\_\_，指向该对象的构造函数的原型对象。
2. 方法除了有属性\_\_proto\_\_，还有属性 prototype，prototype 指向该方法的原型对象

### 11.继承的实现方式及比较

（1）第一种是以原型链的方式来实现继承，但是这种实现方式存在的缺点是，在包含有引用类型的数据时，会被所有的实例对象所共享，容易造成修改的混乱。还有就是在创建子类型的时候不能向超类型传递参数。

（2）第二种方式是使用借用构造函数的方式，这种方式是通过在子类型的函数中调用超类型的构造函数来实现的，这一种方法解决了不能向超类型传递参数的缺点，但是它存在的一个问题就是无法实现函数方法的复用，并且超类型原型定义的方法子类型也没有办法访问到。

（3）第三种方式是组合继承，组合继承是将原型链和借用构造函数组合起来使用的一种方式。通过借用构造函数的方式来实现类型的属性的继承，通过将子类型的原型设置为超类型的实例来实现方法的继承。这种方式解决了上面的两种模式单独使用时的问题，但是由于我们是以超类型的实例来作为子类型的原型，所以调用了两次超类的构造函数，造成了子类型的原型中多了很多不必要的属性。

（4）第四种方式是原型式继承，原型式继承的主要思路就是基于已有的对象来创建新的对象，实现的原理是，向函数中传入一个对象，然后返回一个以这个对象为原型的对象。这种继承的思路主要不是为了实现创造一种新的类型，只是对某个对象实现一种简单继承，ES5 中定义的 Object.create() 方法就是原型式继承的实现。缺点与原型链方式相同。

（5）第五种方式是寄生式继承，寄生式继承的思路是创建一个用于封装继承过程的函数，通过传入一个对象，然后复制一个对象的副本，然后对象进行扩展，最后返回这个对象。这个扩展的过程就可以理解是一种继承。这种继承的优点就是对一个简单对象实现继承，如果这个对象不是我们的自定义类型时。缺点是没有办法实现函数的复用。

（6）第六种方式是寄生式组合继承，组合继承的缺点就是使用超类型的实例做为子类型的原型，导致添加了不必要的原型属性。寄生式组合继承的方式是使用超类型的原型的副本来作为子类型的原型，这样就避免了创建不必要的属性。

### 12.深拷贝与浅拷贝

```js
// 浅拷贝的实现;

function shallowCopy(object) {
  // 只拷贝对象
  if (!object || typeof object !== "object") return;

  // 根据 object 的类型判断是新建一个数组还是对象
  let newObject = Array.isArray(object) ? [] : {};

  // 遍历 object，并且判断是 object 的属性才拷贝
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      newObject[key] = object[key];
    }
  }

  return newObject;
}

// 深拷贝的实现;

function deepCopy(object) {
  if (!object || typeof object !== "object") return object;

  let newObject = Array.isArray(object) ? [] : {};

  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      newObject[key] = deepCopy(object[key]);
    }
  }

  return newObject;
}
```

浅拷贝指的是将一个对象的属性值复制到另一个对象，如果有的属性的值为引用类型的话，那么会将这个引用的地址复制给对象，因此两个对象会有同一个引用类型的引用。浅拷贝可以使用 Object.assign 和展开运算符来实现。

深拷贝相对浅拷贝而言，如果遇到属性值为引用类型的时候，它新建一个引用类型并将对应的值复制给它，因此对象获得的一个新的引用类型而不是一个原有类型的引用。深拷贝对于一些对象可以使用 JSON 的两个函数来实现，但是**由于 JSON 的对象格式比 js 的对象格式更加严格，所以如果属性值里边出现函数或者 Symbol 类型的值时，会转换失败**。

### 13.防抖和节流

```js
// 函数防抖： 在事件被触发 n 秒后再执行回调，如果在这 n 秒内事件又被触发，则重新计时。

// 函数节流： 规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。

// 函数防抖的实现
function debounce(fn, wait) {
  var timer = null;

  return function() {
    var context = this,
      args = arguments;

    // 如果此时存在定时器的话，则取消之前的定时器重新记时
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    // 设置定时器，使事件间隔指定事件后执行
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}

// 函数节流的实现;
function throttle(fn, delay) {
  var preTime = Date.now();

  return function() {
    var context = this,
      args = arguments,
      nowTime = Date.now();

    // 如果两次时间间隔超过了指定时间，则执行函数。
    if (nowTime - preTime >= delay) {
      preTime = Date.now();
      return fn.apply(context, args);
    }
  };
}
```

函数防抖是指在事件被触发 n 秒后再执行回调，如果在这 n 秒内事件又被触发，则重新计时。这可以使用在一些点击请求的事件上，避免因为用户的多次点击向后端发送多次请求。

函数节流是指规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。节流可以使用在 scroll 函数的事件监听上，通过事件节流来降低事件调用的频率。

### 14.作用域和作用域链、执行期上下文

- 作用域就是代码的执行环境，全局执行环境就是全局作用域，函数的执行环境就是私有作用域，它们都是栈内存。作用域就是代码执行开辟栈内存

- 作用域链

  作用域链的作用是保证对执行环境有权访问的所有变量和函数的有序访问，通过作用域链，我们可以访问到外层环境的变量和函数。

  作用域链的本质上是一个指向变量对象的指针列表。变量对象是一个包含了执行环境中所有变量和函数的对象。作用域链的前端始终都是当前执行上下文的变量对象。全局执行上下文的变量对象（也就是全局对象）始终是作用域链的最后一个对象。

  当我们查找一个变量时，如果当前执行环境中没有找到，我们可以沿着作用域链向后查找。

  作用域链的创建过程跟执行上下文的建立有关....

- js 是描述性的脚本语言，是由 JS 引擎动态的解析和执行。JS 在执行代码之前，会对这段代码进行解析（预处理），这个阶段会根据**可执行代码**创建相应的**执行上下文**。

  > Js 是边执行边解析的

  可执行代码：

  - 全局执行代码，在执行所有代码前，解析创建全局执行上下文。
  - 函数执行代码，执行函数前，解析创建函数执行上下文。
  - eval 执行代码，运行于当前执行上下文中。

  执行上下文由 this、变量对象、作用域链三个属性组成。

### 15.DOM 常见的操作方式

（1）创建新节点

```js
createDocumentFragment(node);
createElement(node);
createTextNode(text);
```

（2）添加、移除、替换、插入

```js
appendChild(node)
removeChild(node)
replaceChild(new,old)
insertBefore(new,old)
```

（3）查找

```js
getElementById();
getElementsByName();
getElementsByTagName();
getElementsByClassName();
querySelector();
querySelectorAll();
```

（4）属性操作

```js
getAttribute(key);
setAttribute(key, value);
hasAttribute(key);
removeAttribute(key);
```

### 16.Array.sort()方法与实现机制

sort 函数只给出了两种排序分别是： InsertionSort 和 QuickSort，数组长度小于等于 10 的用插入排序 InsertionSort，比 10 大的数组则使用快速排序 QuickSort

### 17.Ajax 的请求过程

相关知识点：

2005 年 2 月，AJAX 这个词第一次正式提出，它是 Asynchronous JavaScript and XML 的缩写，指的是通过 JavaScript 的
异步通信，从服务器获取 XML 文档从中提取数据，再更新当前网页的对应部分，而不用刷新整个网页。

具体来说，AJAX 包括以下几个步骤。

- 1.创建 XMLHttpRequest 对象，也就是创建一个异步调用对象
- 2.创建一个新的 HTTP 请求，并指定该 HTTP 请求的方法、URL 及验证信息
- 3.设置响应 HTTP 请求状态变化的函数
- 4.发送 HTTP 请求
- 5.获取异步调用返回的数据
- 6.使用 JavaScript 和 DOM 实现局部刷新

一般实现：

```js
const SERVER_URL = "/server";

let xhr = new XMLHttpRequest();

// 创建 Http 请求
xhr.open("GET", SERVER_URL, true);

// 设置状态监听函数
xhr.onreadystatechange = function() {
  if (this.readyState !== 4) return;

  // 当请求成功时
  if (this.status === 200) {
    handle(this.response);
  } else {
    console.error(this.statusText);
  }
};

// 设置请求失败时的监听函数
xhr.onerror = function() {
  console.error(this.statusText);
};

// 设置请求头信息
xhr.responseType = "json";
xhr.setRequestHeader("Accept", "application/json");

// 发送 Http 请求
xhr.send(null);

// promise 封装实现：

function getJSON(url) {
  // 创建一个 promise 对象
  let promise = new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest();

    // 新建一个 http 请求
    xhr.open("GET", url, true);

    // 设置状态的监听函数
    xhr.onreadystatechange = function() {
      if (this.readyState !== 4) return;

      // 当请求成功或失败时，改变 promise 的状态
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };

    // 设置错误监听函数
    xhr.onerror = function() {
      reject(new Error(this.statusText));
    };

    // 设置响应的数据类型
    xhr.responseType = "json";

    // 设置请求头信息
    xhr.setRequestHeader("Accept", "application/json");

    // 发送 http 请求
    xhr.send(null);
  });

  return promise;
}
```

回答：

我对 ajax 的理解是，它是一种异步通信的方法，通过直接由 js 脚本向服务器发起 http 通信，然后根据服务器返回的数据，更新网页的相应部分，而不用刷新整个页面的一种方法。

创建一个 ajax 有这样几个步骤：

- 首先是创建一个 XMLHttpRequest 对象。
- 在这个对象上使用 open 方法创建一个 http 请求，open 方法所需要的参数是请求的方法、请求的地址、是否异步和用户的认证信息。
- 在发起请求前，我们可以为这个对象添加一些信息和监听函数。比如说我们可以通过 setRequestHeader 方法来为请求添加头信息。我们还可以为这个对象添加一个状态监听函数。一个 XMLHttpRequest 对象一共有 5 个状态，当它的状态变化时会触发 onreadystatechange 事件，我们可以通过设置监听函数，来处理请求成功后的结果。当对象的 readyState 变为 4 的时候，代表服务器返回的数据接收完成，这个时候我们可以通过判断请求的状态，如果状态是 2xx 或者 304 的话则代表返回正常。这个时候我们就可以通过 response 中的数据来对页面进行更新了。
- 当对象的属性和监听函数设置完成后，最后我们调用 send 方法来向服务器发起请求，可以传入参数作为发送的数据体。

### 18.JS 的垃圾回收机制

### 19.JS 中的 String、Array 和 Math 方法

- String 的方法：

  ```js
  var str = "fighting 2021!";
  ```

  stringObject.charAt(index)

  ```js
  console.log(str.charAt(3)); //h
  ```

  **stringObject.indexOf**(str,startpos)
  返回某个指定的字符串值在字符串中首次出现的位置

  ```js
  console.log(str.indexOf("ht")); //3
  ```

  **stringObject.split**(separator,limit)
  将字符串分割成字符串数组，并且返回此数组

  ```js
  console.log(str.split(" ")); //[ 'fighting', '2021!' ]
  ```

  **stringObject.substring**(start,stop)
  提取 start 和 stop 之间的字符串 stop 省略则一直提取到结尾

  ```js
  console.log(str.substring(1, 4)); //igh
  console.log(str.substring(-1, 4)); //figh
  console.log(str.substring(1, 25)); //ighting 2021!
  ```

  **stringObject.substr**(start,length)
  提取 start 开始的指定数目的字符串

  ```js
  console.log(str.substr(1, 10)); //ighting 20
  console.log(str.substr(-3, 7)); //21!
  ```

  **stringObject.replace(regexp/substr,newsubstr/function)**
  regexp/substr 必需，规定要替换掉的子字符串或要替换掉的模式的 RegExp 对象。
  newsubstr/function 必需，规定了替换文本或生成替换文本的函数。
  在字符串中用一些字符替换掉另一些字符，或替换掉一个与正则表达式匹配的子串。
  返回经过替换操作后形成的新的字符串，不改变原字符串

https://www.cnblogs.com/lihuijuan/p/8490578.html

### 20.addEventListener 和 onClick()的区别

addEventListener 允许给一个事件注册多个监听器。

```js
<body>
    <button class="addEvent">点击1</button>
    <button class="onclick">点击2</button>
    <script>
        const btn1 = document.querySelector('.addEvent');
        btn1.addEventListener("click",()=>{
            console.log("我是addEvent1");
        })
        btn1.addEventListener('click',()=>{
            console.log("我是addEvent2");
        })

        const btn2 = document.querySelector(".onclick");
        btn2.onclick = ()=>{
            console.log("我是onclick1");
        }
        btn2.onclick = ()=>{
            console.log("我是onclick2");
        }
    </script>
</body>
```

分别点击 btn1 和 btn2 的结果

```
我是addEvent1
我是addEvent2
我是onclick2   //"我是onclick1"会被覆盖掉
```

结论：

1.onclick 事件在同一时间只能指向唯一对象

2.addEventListener 给一个事件注册多个 listener

3.addEventListener 对任何 DOM 都是有效的，而 onclick 仅限于 HTML

4.addEventListener 可以控制 listener 的触发阶段，（捕获/冒泡）。对于多个相同的事件处理器，不会重复触发，不需要手动使用 removeEventListener 清除

5.IE9 使用 attachEvent 和 detachEvent

参考：https://blog.csdn.net/viewyu12345/article/details/79171215

### 21.new 和 Object.create 的区别

https://juejin.cn/post/6941944148387692575

### 22.DOM 的 location 对象

**`Location`**接口表示其链接到的对象的位置（URL）。所做的修改反映在与之相关的对象上。

1.此对象包含当前的 URL 信息，属性有以下几个：
1> href 设置或获取整个 URL 为一个字串
2> protocol 设置或获取 URL 对应的协议部分
3> pathname 设置或获取 location 或者 URL 对应的主机名称
4> port 设置或获取与 URL 关联的端口号
5> host 设置或获取 location 或 URL 对应的主机名和端口号
6> hostname 设置或获取 location 或 URL 对应的主机名
7> search 设置或获取属性 href 中问号后的内容

    2. 对象包含的方法：
    1> assign		装入新的html文档
    2> reload		重新载入当前页面
    3> replace		装入指定URL的文档来替换当前文档

https://blog.csdn.net/persional_zhangchao/article/details/18409639

### 23.浏览器从输入 URL 到页面渲染的整个流程（涉及到计算机网络数据传输过程、浏览器解析渲染过程）

详细：https://blog.csdn.net/baidu_33438652/article/details/106586413?utm_medium=distribute.pc_relevant.none-task-blog-2~default~BlogCommendFromMachineLearnPai2~default-1.control&dist_request_id=1619663228401_05184&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2~default~BlogCommendFromMachineLearnPai2~default-1.control

简单版：

- 首先用户从浏览器输入请求信息
- 然后网络发起 URL 请求
- 服务器响应请求之后，浏览器进程准备渲染进程
- 渲染进程准备好之后，向渲染进程提交页面数据，称之为提交文档阶段
- 渲染进程接受完文档信息，开始进行页面解析和资源加载
- 最后完成整个页面加载

### 24.跨域、同源策略及跨域实现方式和原理

**什么是跨域**

当一个请求 url 的协议、域名、端口三者之间任意一个与当前页面 url 不同即为跨域。

<!-- ![image-20210501184159055](C:\Users\xxk\AppData\Roaming\Typora\typora-user-images\image-20210501184159055.png)

![image-20210501184407636](C:\Users\xxk\AppData\Roaming\Typora\typora-user-images\image-20210501184407636.png) -->

**同源策略**：

SOP 是一种约定，是浏览器最核心也是最基本的安全功能，同源是指“协议+域名+端口”三者相同，即便两个不同的域名指向同一个 ip 地址，也非同源。

HTML 特殊标签

link、script、img、frame 等标签具有跨域特性，可以直接访问。

相关知识点：

1. 通过 jsonp 跨域

2. document.domain + iframe 跨域

3. location.hash + iframe

4. window.name + iframe 跨域

5. postMessage 跨域

6. 跨域资源共享（CORS)

7. nginx 代理跨域

8. nodejs 中间件代理跨域
9. WebSocket 协议跨域
10. 代理 proxy
    <!--
    ![image-20210501190129930](C:\Users\xxk\AppData\Roaming\Typora\typora-user-images\image-20210501190129930.png) -->

回答：

```
解决跨域的方法我们可以根据我们想要实现的目的来划分。

首先我们如果只是想要实现主域名下的不同子域名的跨域操作，我们可以使用设置 document.domain 来解决。

（1）将 document.domain 设置为主域名，来实现相同子域名的跨域操作，这个时候主域名下的 cookie 就能够被子域名所访问。同时如果文档中含有主域名相同，子域名不同的 iframe 的话，我们也可以对这个 iframe 进行操作。

如果是想要解决不同跨域窗口间的通信问题，比如说一个页面想要和页面的中的不同源的 iframe 进行通信的问题，我们可以使用 location.hash 或者 window.name 或者 postMessage 来解决。

（2）使用 location.hash 的方法，我们可以在主页面动态的修改 iframe 窗口的 hash 值，然后在 iframe 窗口里实现监听函数来实现这样一个单向的通信。因为在 iframe 是没有办法访问到不同源的父级窗口的，所以我们不能直接修改父级窗口的 hash 值来实现通信，我们可以在 iframe 中再加入一个 iframe ，这个 iframe 的内容是和父级页面同源的，所以我们可以 window.parent.parent 来修改最顶级页面的 src，以此来实现双向通信。

（3）使用 window.name 的方法，主要是基于同一个窗口中设置了 window.name 后不同源的页面也可以访问，所以不同源的子页面可以首先在 window.name 中写入数据，然后跳转到一个和父级同源的页面。这个时候级页面就可以访问同源的子页面中 window.name 中的数据了，这种方式的好处是可以传输的数据量大。

（4）使用 postMessage 来解决的方法，这是一个 h5 中新增的一个 api。通过它我们可以实现多窗口间的信息传递，通过获取到指定窗口的引用，然后调用 postMessage 来发送信息，在窗口中我们通过对 message 信息的监听来接收信息，以此来实现不同源间的信息交换。

如果是像解决 ajax 无法提交跨域请求的问题，我们可以使用 jsonp、cors、websocket 协议、服务器代理来解决问题。

（5）使用 jsonp 来实现跨域请求，它的主要原理是通过动态构建 script  标签来实现跨域请求，因为浏览器对 script 标签的引入没有跨域的访问限制 。通过在请求的 url 后指定一个回调函数，然后服务器在返回数据的时候，构建一个 json 数据的包装，这个包装就是回调函数，然后返回给前端，前端接收到数据后，因为请求的是脚本文件，所以会直接执行，这样我们先前定义好的回调函数就可以被调用，从而实现了跨域请求的处理。这种方式只能用于 get 请求。

（6）使用 CORS 的方式，CORS 是一个 W3C 标准，全称是"跨域资源共享"。CORS 需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能，因此我们只需要在服务器端配置就行。浏览器将 CORS 请求分成两类：简单请求和非简单请求。对于简单请求，浏览器直接发出 CORS 请求。具体来说，就是会在头信息之中，增加一个 Origin 字段。Origin 字段用来说明本次请求来自哪个源。服务器根据这个值，决定是否同意这次请求。对于如果 Origin 指定的源，不在许可范围内，服务器会返回一个正常的 HTTP 回应。浏览器发现，这个回应的头信息没有包含 Access-Control-Allow-Origin 字段，就知道出错了，从而抛出一个错误，ajax 不会收到响应信息。如果成功的话会包含一些以 Access-Control- 开头的字段。

非简单请求，浏览器会先发出一次预检请求，来判断该域名是否在服务器的白名单中，如果收到肯定回复后才会发起请求。

（7）使用 websocket 协议，这个协议没有同源限制。

（8）使用服务器来代理跨域的访问请求，就是有跨域的请求操作时发送请求给后端，让后端代为请求，然后最后将获取的结果发返回。
```

### 25.浏览器的回流（Reflow）和重绘（Repaints）

**回流、重排**

更新元素的几何属性需要重排。

![回流](https://img-blog.csdnimg.cn/20201213153952304.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2JhaWR1XzMzNDM4NjUy,size_16,color_FFFFFF,t_70)

从上图可以看出，如果通过 JavaScript 或者 CSS 修改元素的几何位置属性，例如改变元素的宽度、高度等，那么浏览器会触发重新布局，解析之后的一系列子阶段，这个过程就叫**重排**。

**重排需要更新完整的渲染流水线**，所以开销也是最大的。

**重绘**

通过 JavaScript 更改某些元素的背景颜色，会触发重绘

![重绘](https://img-blog.csdnimg.cn/20201213155329899.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2JhaWR1XzMzNDM4NjUy,size_16,color_FFFFFF,t_70)

从图中可以看出，因为只修改了元素的背景颜色，并没有引起几何位置的变换，那么布局阶段将不会被执行，直接进入了绘制阶段，然后执行之后的一系列子阶段，这个过程就叫**重绘**。

相较于重排操作，重绘省去了布局和分层阶段，所以执行效率会比重排操作要高一些。

**直接合成**

![合成](https://img-blog.csdnimg.cn/20201213172500794.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2JhaWR1XzMzNDM4NjUy,size_16,color_FFFFFF,t_70)

如图中显示，只用 transform 来实现动画效果，既不更改更改页面布局也不更改样式，渲染引擎将跳过布局和绘制，只执行后续的合成操作，我们把这个过程叫做合成。

因为是在非主线程上合成，并没有占用主线程的资源，另外也避开了布局和绘制两个子阶段，所以相对于重绘和重排，合成能大大提升绘制效率。

### 26.[JavaScript]()中的 arguments

### 27.EventLoop 事件循环

相关知识点：

```
事件队列是一个存储着待执行任务的队列，其中的任务严格按照时间先后顺序执行，排在队头的任务将会率先执行，而排在队尾的任务会最后执行。事件队列每次仅执行一个任务，在该任务执行完毕之后，再执行下一个任务。执行栈则是一个类似于函数调用栈的运行容器，当执行栈为空时，JS 引擎便检查事件队列，如果不为空的话，事件队列便将第一个任务压入执行栈中运行。
```

回答：

```
因为 js 是单线程运行的，在代码执行的时候，通过将不同函数的执行上下文压入执行栈中来保证代码的有序执行。在执行同步代码的时候，如果遇到了异步事件，js 引擎并不会一直等待其返回结果，而是会将这个事件挂起，继续执行执行栈中的其他任务。当异步事件执行完毕后，再将异步事件对应的回调加入到与当前执行栈中不同的另一个任务队列中等待执行。任务队列可以分为宏任务对列和微任务对列，当当前执行栈中的事件执行完毕后，js 引擎首先会判断微任务对列中是否有任务可以执行，如果有就将微任务队首的事件压入栈中执行。当微任务对列中的任务都执行完成后再去判断宏任务对列中的任务。

微任务包括了 promise 的回调、node 中的 process.nextTick 、对 Dom 变化监听的 MutationObserver。

宏任务包括了 script 脚本的执行、setTimeout ，setInterval ，setImmediate 一类的定时事件，还有如 I/O 操作、UI 渲
染等。
```

详细资料可以参考：

### 28.宏任务与微任务

### 29.BOM 属性对象方法

### 30.函数柯里化及其通用封装

### 31JS 的 map()和 reduce()方法

### 32.“\=\=”和“\=\==”的区别

### 33.setTimeout 用作倒计时为何会产生误差？

### 34.一段帮助理解作用域、作用域链，执行上下文，闭包的代码

```js
const arr = [];
function box() {
  for (var i = 0; i < 5; ++i) {
    function f() {
      return i;
    }
    arr[i] = f;
  }
}
box();
console.log(arr);
//  [[Function: f],[Function: f],[Function: f],[Function: f],[Function: f]]
console.log(arr[1]());
//5
```

执行上下文栈`ECStack`的执行循序

```
ECStack.push(box);
ECStack.pop();
ECStack.push(f);
ECStack.pop();
```

### 35.js 实现双向绑定

```js
<body>
    <input type="text" id="inputxx"/>
    <h1 id = 'h1xx'></h1>
    <script>
       function getId(n){
           return document.getElementById(n);
       }

       var _obj = {
           t:'111',
           get fn(){
               return this.t;
           },
           set fn(n){
               getId('inputxx').value = n;
               getId('h1xx').innerHTML = n;
           }
       }

       document.addEventListener('keyup',function(event){
           console.log(window.document);
        	console.log(event);
        _obj.fn = event.target.value;
       })

    </script>
</body>
```

### 36.object.define.property

意义：Object 对象 define 定义 property 属性 对象的 key

### 37. undefined 与 undeclared 的区别？

已在作用域中声明但还没有赋值的变量，是 undefined 的。

还没有在作用域中声明过的变量，是 undeclared 的。

对于 undeclared 变量的引用，浏览器会报引用错误，如 ReferenceError: b is not defined 。但是我们可以使用 typeof 的安全防范机制来避免报错，因为对于 undeclared（或者 not defined ）变量，typeof 会返回 "undefined"。

### 38. null 和 undefined 的区别？

首先 Undefined 和 Null 都是基本数据类型，这两个基本数据类型分别都只有一个值，就是 undefined 和 null。

undefined：

- 声明了一个变量，但没有赋值
- 访问对象上不存在的属性
- 函数定义了形参，但没有传递实参
- 使用 void 对表达式求值
- 函数的默认返回值

null：

null 的字面意思是`空值` ，这个值的语义是，希望表示一个对象被人为的重置为空对象，而非一个变量最原始的状态 。 在内存里的表示就是，**栈中的变量没有指向堆中的内存对象**。

当我们对两种类型使用 typeof 进行判断的时候，Null 类型化会返回 “object”，这是一个历史遗留的问题。

> null 有属于自己的类型 `Null`，而不属于 Object 类型，typeof 之所以会判定为 Object 类型，是因为 JavaScript 数据类型在底层都是以二进制的形式表示的，**二进制的前三位为 0 会被 typeof 判断为对象类型，而 null 的二进制位恰好都是 0 **，因此，null 被误判断为 Object 类型。

当我们使用双等号对两种类型的值进行比较时会返回 true，使用三个等号时会返回 false。

> ES 规范中规定 null==undefined，可以理解为无效的值，和类型转换无关。
