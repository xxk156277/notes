# Vue

[[toc]]

### 1、MVVM

`Model–View–ViewModel （MVVM）` 是一个软件架构设计模式。`MVVM` 的出现促进了前端开发与后端业务逻辑的分离，极大地提高了前端开发效率，`MVVM` 的核心是`ViewModel` 层，它就像是一个中转站（value converter），负责转换 `Model` 中的数据对象来让数据变得更容易管理和使用，该层向上与视图层进行双向数据绑定，向下与 `Model` 层通过接口请求进行数据交互，起呈上启下作用。![MVVM](https://user-gold-cdn.xitu.io/2019/8/19/16ca75871ec53fba?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

（1）View 层

View 是视图层，也就是用户界面。前端主要由 HTML 和 CSS 来构建 。

（2）Model 层

Model 是指数据模型，泛指后端进行的各种业务逻辑处理和数据操控，对于前端来说就是后端提供的 api 接口。

（3）ViewModel 层

ViewModel 是由前端开发人员组织生成和维护的**视 h 图数据层**。在这一层，前端开发者对从后端获取的 Model 数据进行转换处理，做二次封装，以**生成符合 View 层使用预期的视图数据模型**。需要注意的是 ViewModel 所封装出来的数据模型包括**视图的状态和行为**两部分，而 Model 层的数据模型是只包含状态的，比如页面的这一块展示什么，而页面加载进来时发生什么，点击这一块发生什么，这一块滚动时发生什么这些都属于视图行为（交互），视图状态和行为都封装在了 ViewModel 里。这样的封装使得 ViewModel 可以完整地去描述 View 层。

### 2、vue 响应式原理

`Object.defineProperty()`方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

```js
var obj = {}
Object,definProperty(obj,'a',{
    value:3
    //是否可写
    writable:false
});
Object,definProperty(obj,'b',{
    value:5
    //是否被枚举
    enumerable:false
});
```
