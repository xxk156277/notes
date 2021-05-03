# Promise

## 1.promise 简单介绍：

#### promise

- ES6 新提出的 JS 中进行异步编程的新解决方案
- 语法上：构造函数
- 功能上：promise 对象用来封装一个异步操作并可以获取其成功/失败的结果值

#### 异步：

- fs 文件操作

  ```js
  require("fs").readFile("./index.html", (err, data) => {});
  ```

- 数据库操作

- AJAX

  ```js
  $.get("/server", (data) => {});
  ```

- 定时器

  ```js
  setTimeout(() => {}, 2000);
  ```

#### 为什么要用 Promise

1. 支持链式调用，可以解决回调地狱
2. 指定回调函数的方式更加灵活

> 回调函数的嵌套调用，外部回调函数异步执行的结果是嵌套的回调执行的条件

#### 生成 m 和 n 随机整数

```js
function rand(m, n) {
  return Math.ceil(Math.random() * (n - m + 1)) + m - 1;
}
```

#### promise 的状态

promise 实例对象中的一个属性`PromiseState`

- pending ：未决定的
- resolved /fullfilled： 成功
- rejected ：失败

#### promise 对象的值

promise 实例对象的另一个属性`PromiseResult`

保存着对象异步操作`成功/失败`的结果

- resolve
- reject

#### promise 的基本流程

## 2.promise 相关 API

1. Promise 构造函数：Promise（executor）{}

   - executor 函数：执行器`(resolve,reject)=>{}`
   - resolve 函数：内部定义成功时我们调用的函数 value=>{}
   - reject 函数：内部定义失败时我们调用的函数 reason=>{}

   > executor 会在 Promise 内部立即同步调用，异步操作在执行器中执行

2. Promise.prototype.then 方法：(onResolved,onRejected)=>{}

3. Promise.prototype.catch 方法：(onReject)=>{}

   > 以下方法皆是属于 promise 函数对象的

4. Promise.resolve 方法：(value)=>{}

   - value:成功的数据或者 promise 对象
   - 如果传入的参数为 非 promise 类型对象，则返回的结果为成功 promise 对象
   - 如果传入的参数为 promise 类型对象，则参数的结果决定了 resolve 的结果
   - 作用：快速得到 promise 对象，并且可以将一个值封装成为 promise 对象

5. Promise.reject 方法：(value)=>{}

   - 返回的总是失败的 promise

6. Promise.all 方法：(promises)=>{}

   - promises:包含 n 个 promise 数组
   - 返回一个新的 promise，全部成功就返回成功，如果有一个失败，就返回失败

7. Promise.race 方法：(promises)=>{}

   - promises:包含 n 个 promise 的数组
   - 返回一个新的 promise，第一个完成 promise 的结果状态就是最终的结果状态

## 3.promise 的几个关键问题

1. #### 如何改变 promise 的状态

   ```js
   let p = new Promise((resolve, reject) => {
     //1.resolve函数
     resolve("ok"); //pending => fulfilled(resolve)
     //2.reject函数
     reject("error"); //pending => rejected
     //3.抛出错误
     throw "出问题了"; //pending => rejected
   });
   console.log(p);
   ```

2. #### promise 指定多个回调

   - 状态改变会执行该状态的回调

     ```js
     let p = new Promise((resolve, reject) => {
       resolve("ok");
     });
     ///指定回调-1
     p.then((value) => {
       console.log(value);
     });
     //指定回调-2
     p.then((value) => {
       alert(value);
     });
     ```

3. #### 改变 promise 状态和指定回调函数谁先谁后？

   - 都有可能，正常情况下是先`指定回调`再`改变状态`；
   - 如何先改变状态再指定回调？
     1. 在执行器中直接调用 resolve()/reject()；
     2. 延迟更长时间才调用 then()；
   - 先指定回调，再改变状态的情况下，回调函数的执行时机是在调用完 resolve/reject 之后，对成功/失败作处理

4. #### promise.then()方法

   - 返回结果是一个新的 promise，该 promise 由 then()指定的回调函数执行的结果决定的
   - 详细：
     1. 如果抛出异常，新 promise 变为 rejected，reason 变为抛出的异常；
     2. 如果返回的是非 promise 的任意值，新 promise 变为 resolved，value 为返回的值
     3. 如果返回的是另一个新 promise，此 promise 的结果就会成为新 promise 的结果

5. #### promise 如何串连多个操作任务？

   ```js
   let p = new Promise((resolve, reject) => {
     setTimeout(() => {
       resolve("pk");
     }, 1000);
   });

   p.then((value) => {
     return new Promise((resolve, reject) => {
       resolve("success");
     });
   })
     .then((value) => {
       console.log(value); //success
     })
     .then((value) => {
       console.log(value); //undefined 因为上一个没有返回值
     });
   ```

6. #### 异常穿透

   ```js
   let p = new Promise((resolve, reject) => {
     setTimeout(() => {
       // resolve('pk')
       reject("error");
     }, 1000);
   });

   p.then((value) => {
     console.log(111);
   })
     .then((value) => {
       console.log(222);
     })
     .then((value) => {
       console.log(333);
     })
     .catch((reason) => {
       console.warn(reason); //一旦有错误抛出，直接执行catch
     });
   ```

7. #### 中断 promise 链

   ```js
   let p = new Promise((resolve, reject) => {
     setTimeout(() => {
       resolve("pk");
       // reject("error")
     }, 1000);
   });

   p.then((value) => {
     console.log(111);
     //有且只有一个方式,返回一个pending状态的promise
     return new Promise(() => {});
   })
     .then((value) => {
       console.log(222);
     })
     .then((value) => {
       console.log(333);
     })
     .catch((reason) => {
       console.warn(reason);
     });
   ```

## 4.手写 Promise

1. 初始结构搭建

   ```js
   function Promise(executor) {}
   //添加then方法
   Promise.prototype.then = function(onResolved, onRejected) {};
   ```

2. resolve 与 reject 声明

   ```js
   function Promise(executor) {
     //resolve函数
     function resolve(data) {}
     //reject函数
     function reject(data) {}
     //同步调用【执行器函数】
     executor(resolve, reject);
   }
   //添加then方法
   Promise.prototype.then = function(onResolved, onRejected) {};
   ```

3. resolve 与 reject 代码实现

   ```js
   function Promise(executor) {
     //添加属性
     this.PromiseState = "pending";
     this.PromiseResult = null;
     //保存实例对象的 this 的值
     const self = this;
     //resolve函数
     function resolve(data) {
       //1.修改对象状态(promiseState)
       self.PromiseState = "fulfilled";
       //2.设置对象结果值(promiseResult)
       self.PromiseResult = data;
     }
     //reject函数
     function reject(data) {
       //1.修改对象状态(promiseState)
       self.PromiseState = "rejected";
       //2.设置对象结果值(promiseResult)
       self.PromiseResult = data;
     }

     //同步调用【执行器函数】
     executor(resolve, reject);
   }
   //添加then方法
   Promise.prototype.then = function(onResolved, onRejected) {};
   ```

4. throw 抛出异常改变状态

   ```js
   function Promise(executor) {
     //添加属性
     this.PromiseState = "pending";
     this.PromiseResult = null;
     //保存实例对象的 this 的值
     const self = this;
     //resolve函数
     function resolve(data) {
       //1.修改对象状态(promiseState)
       self.PromiseState = "fulfilled";
       //2.设置对象结果值(promiseResult)
       self.PromiseResult = data;
     }
     //reject函数
     function reject(data) {
       //1.修改对象状态(promiseState)
       self.PromiseState = "rejected";
       //2.设置对象结果值(promiseResult)
       self.PromiseResult = data;
     }
     try {
       //同步调用【执行器函数】
       executor(resolve, reject);
     } catch (error) {
       //修改promise对象状态为【失败】
       reject(error);
     }
   }
   //添加then方法
   Promise.prototype.then = function(onResolved, onRejected) {};
   ```

5. Promise 状态只能修改一次

   ```js
   function Promise(executor) {
     //添加属性
     this.PromiseState = "pending";
     this.PromiseResult = null;
     //保存实例对象的 this 的值
     const self = this;
     //resolve函数
     function resolve(data) {
       //判断状态
       if (self.PromiseState !== "pending") return;
       //1.修改对象状态(promiseState)
       self.PromiseState = "fulfilled";
       //2.设置对象结果值(promiseResult)
       self.PromiseResult = data;
     }
     //reject函数
     function reject(data) {
       //判断状态
       if (self.PromiseState !== "pending") return;
       //1.修改对象状态(promiseState)
       self.PromiseState = "rejected";
       //2.设置对象结果值(promiseResult)
       self.PromiseResult = data;
     }
     try {
       //同步调用【执行器函数】
       executor(resolve, reject);
     } catch (error) {
       //修改promise对象状态为【失败】
       reject(error);
     }
   }
   //添加then方法
   Promise.prototype.then = function(onResolved, onRejected) {};
   ```

6. then 方法执行回调

   ```js
   function Promise(executor) {
     //添加属性
     this.PromiseState = "pending";
     this.PromiseResult = null;
     //保存实例对象的 this 的值
     const self = this;
     //resolve函数
     function resolve(data) {
       //判断状态
       if (self.PromiseState !== "pending") return;
       //1.修改对象状态(promiseState)
       self.PromiseState = "fulfilled";
       //2.设置对象结果值(promiseResult)
       self.PromiseResult = data;
     }
     //reject函数
     function reject(data) {
       //判断状态
       if (self.PromiseState !== "pending") return;
       //1.修改对象状态(promiseState)
       self.PromiseState = "rejected";
       //2.设置对象结果值(promiseResult)
       self.PromiseResult = data;
     }
     try {
       //同步调用【执行器函数】
       executor(resolve, reject);
     } catch (error) {
       //修改promise对象状态为【失败】
       reject(error);
     }
   }
   //添加then方法
   Promise.prototype.then = function(onResolved, onRejected) {
     //调用回调函数
     //因为P.then()   这里this指向实例对象P
     if (this.PromiseState === "fulfilled") {
       onResolved(this.PromiseResult);
     }
     if (this.PromiseState === "rejected") {
       onRejected(this.PromiseResult);
     }
   };
   ```

7. 异步封装回调的执行

   > 异步封装之前为什么不执行 setTimeout 中的 resolve：
   >
   > ```js
   > let p = new Promise((resolve, reject) => {
   >   setTimeout(() => {
   >     resolve("ok");
   >   }, 1000);
   > });
   > p.then(
   >   (value) => {
   >     console.log(value);
   >   },
   >   (reason) => {
   >     console.warn(reason);
   >   }
   > );
   > ```
   >
   > 因为是同步执行，resolve 没有执行，会直接调用 then 方法，而 resolve 没有调用，P 的状态是`panding`,不满足 then 方法中任何一个判断条件
   >
   > 思路：增加 panding 的判断条件，同时在改变状态后调用回调函数，但 promise 中无法调用回调函数，所以在 then 中保存回调函数

   ```js
   function Promise(executor) {
     //添加属性
     this.PromiseState = "pending";
     this.PromiseResult = null;
     //声明属性
     this.callback = {};
     //保存实例对象的 this 的值
     const self = this;
     //resolve函数
     function resolve(data) {
       //判断状态
       if (self.PromiseState !== "pending") return;
       //1.修改对象状态(promiseState)
       self.PromiseState = "fulfilled";
       //2.设置对象结果值(promiseResult)
       self.PromiseResult = data;
       //调用成功的回调函数
       if (self.callback.onResolved) {
         self.callback.onResolved(data);
       }
     }
     //reject函数
     function reject(data) {
       //判断状态
       if (self.PromiseState !== "pending") return;
       //1.修改对象状态(promiseState)
       self.PromiseState = "rejected";
       //2.设置对象结果值(promiseResult)
       self.PromiseResult = data;
       //调用成功的回调函数
       if (self.callback.onRejected) {
         self.callback.onRejected(data);
       }
     }
     try {
       //同步调用【执行器函数】
       executor(resolve, reject);
     } catch (error) {
       //修改promise对象状态为【失败】
       reject(error);
     }
   }
   //添加then方法
   Promise.prototype.then = function(onResolved, onRejected) {
     //调用回调函数
     //因为P.then()   这里this指向实例对象P
     if (this.PromiseState === "fulfilled") {
       onResolved(this.PromiseResult);
     }
     if (this.PromiseState === "rejected") {
       onRejected(this.PromiseResult);
     }
     if (this.PromiseState === "pending") {
       //保存回调函数
       this.callback = {
         onResolved: onResolved,
         onRejected: onRejected,
       };
     }
   };
   ```

8. 指定多个回调实现

   > 上述代码只能执行一个回调
   >
   > ```js
   > p.then(
   >   (value) => {
   >     console.log(value);
   >   },
   >   (reason) => {
   >     console.warn(reason);
   >   }
   > );
   >
   > p.then(
   >   (value) => {
   >     alert(value);
   >   },
   >   (reason) => {
   >     alert(reason);
   >   }
   > );
   > ```
   >
   > 第二次回调把第一次回调保存的函数覆盖了

   ```js
   function Promise(executor) {
     //添加属性
     this.PromiseState = "pending";
     this.PromiseResult = null;
     //声明属性
     this.callbacks = [];
     //保存实例对象的 this 的值
     const self = this;
     //resolve函数
     function resolve(data) {
       //判断状态
       if (self.PromiseState !== "pending") return;
       //1.修改对象状态(promiseState)
       self.PromiseState = "fulfilled";
       //2.设置对象结果值(promiseResult)
       self.PromiseResult = data;
       //调用成功的回调函数
       self.callbacks.forEach((item) => {
         item.onResolved(data);
       });
     }
     //reject函数
     function reject(data) {
       //判断状态
       if (self.PromiseState !== "pending") return;
       //1.修改对象状态(promiseState)
       self.PromiseState = "rejected";
       //2.设置对象结果值(promiseResult)
       self.PromiseResult = data;
       //调用成功的回调函数
       self.callbacks.forEach((item) => {
         item.onRejected(data);
       });
     }
     try {
       //同步调用【执行器函数】
       executor(resolve, reject);
     } catch (error) {
       //修改promise对象状态为【失败】
       reject(error);
     }
   }
   //添加then方法
   Promise.prototype.then = function(onResolved, onRejected) {
     //调用回调函数
     //因为P.then()   这里this指向实例对象P
     if (this.PromiseState === "fulfilled") {
       onResolved(this.PromiseResult);
     }
     if (this.PromiseState === "rejected") {
       onRejected(this.PromiseResult);
     }
     if (this.PromiseState === "pending") {
       //保存回调函数
       this.callbacks.push({
         onResolved: onResolved,
         onRejected: onRejected,
       });
     }
   };
   ```

9. 同步修改状态 then 方法结果返回 34 集

   ```js
   function Promise(executor) {
     //添加属性
     this.PromiseState = "pending";
     this.PromiseResult = null;
     //声明属性
     this.callbacks = [];
     //保存实例对象的 this 的值
     const self = this;
     //resolve函数
     function resolve(data) {
       //判断状态
       if (self.PromiseState !== "pending") return;
       //1.修改对象状态(promiseState)
       self.PromiseState = "fulfilled";
       //2.设置对象结果值(promiseResult)
       self.PromiseResult = data;
       //调用成功的回调函数
       self.callbacks.forEach((item) => {
         item.onResolved(data);
       });
     }
     //reject函数
     function reject(data) {
       //判断状态
       if (self.PromiseState !== "pending") return;
       //1.修改对象状态(promiseState)
       self.PromiseState = "rejected";
       //2.设置对象结果值(promiseResult)
       self.PromiseResult = data;
       //调用成功的回调函数
       self.callbacks.forEach((item) => {
         item.onRejected(data);
       });
     }
     try {
       //同步调用【执行器函数】
       executor(resolve, reject);
     } catch (error) {
       //修改promise对象状态为【失败】
       reject(error);
     }
   }
   //添加then方法
   Promise.prototype.then = function(onResolved, onRejected) {
     return new Promise((resolve, reject) => {
       //调用回调函数
       //因为P.then()   这里this指向实例对象P
       if (this.PromiseState === "fulfilled") {
         try {
           //获取回调函数的执行结果
           let result = onResolved(this.PromiseResult);
           //判断
           if (result instanceof Promise) {
             result.then(
               (v) => {
                 resolve(v);
               },
               (r) => {
                 reject(r);
               }
             );
           } else {
             //结果的对象状态为【成功】
             resolve(result);
           }
         } catch (error) {
           reject(error);
         }
       }
       if (this.PromiseState === "rejected") {
         onRejected(this.PromiseResult);
       }
       if (this.PromiseState === "pending") {
         //保存回调函数
         this.callbacks.push({
           onResolved: onResolved,
           onRejected: onRejected,
         });
       }
     });
   };
   ```

   #### 听懵了，后面再补

## 5.async 与 await

1. #### async 函数

   1. 函数的返回值是 promise 对象
   2. promise 对象的结果由 async 函数执行的返回值决定

   ```js
   //和then的返回结果一样
   async function main() {
     //1、如果返回值是一个非promise类型的数据
     return 111;
     //2、如果返回的是一个Promise对象
     return new Promise((resolve, reject) => {
       //resolve('ok')
       reject("error");
     });
     //3、抛出异常
     throw "oh no";
   }
   let res = main();
   console.log(res);
   ```

2. #### await 表达式

   1. await 右侧的表达式一般为 promise 对象，但是也可以是其他值；
   2. 如果表达式是 promise 对象，await 返回的值是 promise 成功的值；
   3. 如果表达式是其他值，直接将此值作为 await 的返回值；
   4. 注意：
      - await 必须写在 async 函数中，但是 async 函数中可以没有 await
      - 如果 await 的 promise 失败了，就会抛出异常，需要通过 try...catch 捕获处理

   ```js
   async function main() {
     // let p1 = new Promise((resolve,reject)=>{
     //     resolve('ok');
     // })
     let p2 = new Promise((resolve, reject) => {
       reject("error");
     });
     //1.右侧为promise的情况
     // let res1 = await p1;
     // console.log(res1);
     //2.右侧为其他类型的数据
     // let res2 = await 20;
     // console.log(res2);
     //3、失败类型
     try {
       let res3 = await p2;
     } catch (error) {
       console.log(error);
     }
   }
   main();
   ```

3. #### 结合

   ```js
   //https://api.apiopen.top/getJoke
   function sendAJAX(url) {
     return new Promise((resolve, reject) => {
       //创建对象
       const xhr = new XMLHttpRequest();
       xhr.responseType = "json";
       //初始化
       xhr.open("GET", url);
       //发送
       xhr.send();
       //处理响应结果
       xhr.onreadystatechange = function() {
         if (xhr.readyState === 4) {
           if (xhr.status >= 200 && xhr.status < 300) {
             resolve(xhr.response);
           } else {
             reject(xhr.status);
           }
         }
       };
     });
   }
   const btn = document.querySelector("#btn");
   btn.addEventListener("click", async function() {
     //获取段子信息
     let joker = await sendAJAX("https://api.apiopen.top/getJoke");
     console.log(joker);
   });
   ```
