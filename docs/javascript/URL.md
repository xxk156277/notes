# URL 与 URI 的解惑、URL拆解

## URL 与 URI 的解惑

说到 URL 就不得不提到 URI，大多数人对于 URL 与 URI 的概念都比较混淆。有时候就算是有着几年工作经验的同学也很难把两者的关系讲清。

由于 URL 与 URI 都是简称，所以为了更加深刻的理解，我们首先把他们的英文全称拼出来

- URL（Uniform Resource Locator）：统一资源定位符
- URI（Uniform Resource Identifier）：统一资源标识符

可以看出 URL 是定位符，而 URI 是标识符。

参考[rfc3986](https://link.zhihu.com/?target=https%3A//tools.ietf.org/html/rfc3986)规范中的描述：

>  A URI can be further classified as a locator, a name, or both. The term "Uniform Resource Locator" (URL) refers to the subset of URIs that
>  

这句话所表达的重要信息是：**URL 是 URI 的子集，这也明确了 URL 和 URI 的关系。**

如果还没明白，这里引用一些知乎的一些优秀回答来帮你更好的理解 URL 与 URI 的概念

[Cat Chen](https://www.zhihu.com/people/catchen)：

>  URL 是 URI 的子集。任何东西，只要能够唯一地标识出来，都可以说这个标识是 URI 。如果这个标识是一个可获取到上述对象的路径，那么同时它也可以是一个 URL ；但如果这个标识不提供获取到对象的路径，那么它就必然不是 URL 。
>  

[Rio](https://www.zhihu.com/people/rio)：

>  一句话解释：URI 和 URL 都定义了 what the resource is。URL 还定义了 how to get the resource。
>  

看到这里想必你已经明确的 URL 与 URI 的概念与区别，简单来讲就是：一个 URL 一定是一个 URI，但是一个 URI 不一定是一个 URL，URI 是标识而 URL 是路径。

## URL/URI 的组成

我们知道了 URL 与 URI 的概念之后，接下来让我们深入了解一下 URI 中究竟有什么（由于 URL 是 URI 的子集，所以之后统一使用 URI 字眼）

根据[rfc3986](https://link.zhihu.com/?target=https%3A//tools.ietf.org/html/rfc3986%23section-3.1)规范的组成语法，我们将一个 URI 进行拆解

```text
foo://example.com:8042/over/there?name=ferret#nose
   \_/   \______________/\_________/ \_________/ \__/
    |           |            |            |        |
 scheme     authority       path        query   fragment
    |   _____________________|__
   / \ /                        \
   urn:example:animal:ferret:nose
```

可以看到，除了 URI 基本可以拆解为`scheme`、`authority`、`path`、`query`、`fragment`五个组成部分，接下来我们就来对这五个部分进行一一讲解。

### scheme

URI 以 scheme 开头，scheme 指的是我们对应的协议比如`http`、`https`、`file`或者一些企业特定的诸如`weixin`、`alipays`、`qqmusic`

### authority

**authority**是 URI 从`//`开始，到`/ ? #`或者 URI 结束中间的内容部分。一般由**主机名(host)**、**端口号(port)**以及**用户信息组成(userinfo)**。

authority 的对应规范如下：

```text
authority = [ userinfo "@" ] host [ ":" port ]
```

### userinfo

相比于我们常见的 host 与 port，userinfo 可能并不常见。

**userinfo**会包含用户名称之类的数据，这些数据用以获取对应资源的访问权限，userinfo 后面会跟@符号用以区分 host

`https://user:password@live.bilibili.com`中`user:password`就是 userinfo

*`user:password`这种形式已经被弃用了，了解一下即可*

### host

**host**为我们的主机名，也是我们大家最常见的部分，一般都会是服务器 IP 地址或者域名，他们一般长成这样：

```js
// ip地址
127.0.0.1
// 域名
live.bilibili.com
```

### port

**port**端口号就是跟在 Host 之后的数字，举个例子：在`live.bilibili.com:8080`中`8080`就是我们的端口号，一般端口号默认为 80

### path

很多时候我们的 host 会有多级目录进行区分，这些就是 path

比如说`live.bilibili.com:8080/page/`中的`page`就是 path

### query

**query**就是我们 URI 中以`？`开头`&`连接的部分，我们一般叫它**请求参数**。

比如在`live.bilibili.com:8080/page/index.html?page=1&size=10`中，`page=1&size=10`就是 query

### fragment

**fragment**是我们 URI 中#之后的部分，我们也叫它**hash**。

比如在`live.bilibili.com:8080/page/index.html?page=1&size=10#list`中`list`就是 fragment

*值得注意的是：浏览器往往会忽视 fragement 的变化，你可以尝试一下在浏览器的网址上添加一个#号后面输入内容，确认回车后浏览器并不会进行刷新*

综合上面，我们一个完整的 URI 很可能长成这样

```
https://user:password@live.bilibili.com:8080/page/index.html?page=1&size=10#list
```

现在你能分清楚每一部分都是什么吗？

标准答案如下：

- scheme: https
- authority
  - userinfo: user:password
  - host: [http://live.bilibili.com](https://link.zhihu.com/?target=http%3A//live.bilibili.com)
  - port: 8080
- path: /page/index.html
- query: page=1&size=1
- fragment: list



> 以上内容来源：
>
> 作者：圈鹅
> 链接：https://zhuanlan.zhihu.com/p/216488873
> 来源：知乎
> 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。



## URL 拆解

对 URL 中的 query 部分做拆解，返回一个对象

```js
// 'http://www.domain.com/order?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled#hash'
const parseUrl = (url) => {
  const params = url
    .split('?')[1]
  //截取问号以后的字符串即user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled#hash
    .split('#')[0]
  //截取#号以前的字符串即user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled
    .split('&')
  //通过&符号进行分割即["user=anonymous","id=123","id=456","city=%E5%8C%97%E4%BA%AC","enabled"]
  const obj = {}
  for (let s of params) {
    let [k = '', v = true] = s.split('=')
    //解构赋值，k默认‘’，v默认true。
    v = decodeURIComponent(v) //解码
    v = /^\d+$/.test(v) ? parseFloat(v) : v // 转换数字
    //  /^\d+$/ 以数字开头的一个或多个数字且以数字结尾的字符串。
    //  /正则表达式/.test()检查str中是否符合正则表达式的规则
    //parseFloat()将字符串转化浮点数
    if (obj.hasOwnProperty(k)) {
      (Array.isArray(obj[k]) ? obj[k] : (obj[k] = [obj[k]])).push(v)
    } else {
      obj[k] = v
    }
  }
  return obj
}

- URI 编码：[encodeURI()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURI)、[encodeURIComponent()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)
    
```



~~~js
## 将 HTTP headers 转换为对象

HTTP headers 为文本型字符串，将其转化为 JS 对象

```http
Accept: */*
Cache-Control: no-cache
Connection: keep-alive
Content-Type: application/json
 
        Copied!
```
const headersTrans = (s) => {
  let obj = {}
  s.split('\n').forEach((e) => {
    let t = e.split(': ')
    obj[t[0]] = t[1]
  })
  return obj
}
 
~~~