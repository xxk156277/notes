# 项目笔记

## （一） git

- 本地git和远程git仓库连接   

  ​						`git remote add origin 仓库地址`

  ​						`git push -u origin master`

- 本地提交 `git commit`

- 提交代码   `git push`

![1.1](img\1.1.png)


## （二）项目搭建

### 1 划分目录结构

![2.1](img\2.1.png)

- ​	component 一般放公共组件
  - common：别的项目也可能用的组件
  - content：仅对该项目是公共的组件
- assets：放素材
- store：vuex 项目管理
- network：网络相关
- router
- common 一些公共的js文件

### 2  css文件引入

css标签初始化

> 添加normalize.css和base.css加入到assets文件中

base.css



### 3  别名相关配置

创建vue.config.js文件


创建.editorconfig 文件


### 4  项目的模块划分:tabbar->路由映射关系

> 综合练习   tabbar、

### 5  更换网页小图标

![2.5.1](img\2.5.1.png)

![2.5.2](img\2.5.2.png)

> <%= BASE_URL %>是jsp的语法，目的是为了动态获取路径

### 6  导航栏的封装和使用

![2.6](img\2.6.png)

- 导航栏左边一般是固定的
- 一般导航栏的高度是44px

## （三）项目笔记

### 一 、FeatureView

- 独立组件封装FeatureView
  - div>a>img

### 二、 TabControl

- 独立组件的封装
  - props->titles
  - div>根据titles v-for遍历 div->span'title'
  - css相关
  - 选中哪一个tab，哪一个tab的文字颜色变色，下面border-bottom
    - currentIndex

### 三、首页商品数据的请求

#### 3.1.设计数据结构

goods：{

​	pop：page/list，

​	sell：page/list，

​	new：page/list，

}

### 3.2发送数据请求

- 在home.js中封装getHomeGoods(type,page)

- 在Home.vue中，又在methods中getHomeGoods(type)

- 调用getHomeGoods('pop')/getHomeGoods('sell')/getHomeGoods('new')

  - page:动态的获取对应的page

- 获取到数据：res

  - this.goods[type].list.push(...res.data.list)
  - this,goods[type].page+=1

- goods：{

  ​	pop：page1/list[30]，

  ​	sell：page1/list[30]，

  ​	new：page1/list[30]，

  }

### 四、对商品数据进行展示

#### 4.1封装GoodsList.vue组件

- props：goods->list[30]
- v-for goods ->GoodsListItem[30]
- GoodListItem(组件)->GoodsItem(数据)

#### 4.2.封装GoodsListItem.vue组件

- props:goodsItem
- goodsItem取出数据，并且使用正确的div/span/img基本标签进行展示

### 五、对滚动进行重构，Better-Scroll

#### 5.1.在index.html中使用Better-Scroll

- const bscroll = new BScroll（el，{}）

> Better-Scroll   位置监听原理

![3.5](img\3.5.png)

### 六 、 回到顶部backTop

#### 6.1. 对BackTop.vue进行封装

#### 6.2. 如何监听组件的点击

- 直接监听back-top的点击，但是是否可以直接监听？

  - 不可以，必须添加修饰.native

- 回到顶部

  - scroll对象，scroll.scrollTo(x,y,time)

  - ```javascript
    this.$refs.scroll.scrollTo(0,0,500)
    ```

6.3.BackTop组件的显示和隐藏

- isShowBackTop:false
- 监听滚动，拿到滚动的位置
  - -position.y>1000  ->isShowBackTop:true; 
  - isShowBackTop=-position.y>1000

### 七  解决首页中Better-Scroll可滚动区域的问题

- Better-Scroll在决定有多少区域可以滚动时，是根据scrollerHeight属性决定的
  - scrollerHeight属性时根据放Better-Scroll的content中的子组件的高度
  - 但是我们首页中，刚开始在计算scrollerHeight属性时，是没有将图片计算在内的
  - 所以，计算出来的告诉是错误的（1300+）
  - 后来图片进来加载之后有了新的高度，但是scrollerHeight属性并没有进行更新，所以出现了滚动问题
  
- 如何解决这个问题？
  - 监听每一张图片是否加载完成，只要有一张图片加载完成了，执行一次refresh()
  - 如何监听图片加载完成了？
    1. 原生js监听图片：`img.omload = function(){}`
    2. Vueh中监听：`@load=“方法`
  - 调用scroll的refresh()

- 如何将GoodListItem.vue中的事件传入到home.vue中

  ![调用refresh](img\调用refresh.png)

  - 因为涉及到非父子组件通信，所以我们选择了事件总线
    - bus->总线
    - Vue.prototype.$bus=new Vue()
    - this.bus.emit("事件名称",参数)
    - this.bus.on("事件名称",回调函数(参数))

- 对于refresh非常频繁的问题。进行防抖操作

  - 防抖debounce/节流throttle
  - 防抖函数起作用的过程：
    - 如果我们直接refresh，那么refresh函数会被执行30次
    - 可以将refresh函数传入到debounce函数中，生成一个新的函数。
    - 之后在调用非常频繁的时候，就使用新生成的函数
    - 而新生成的函数，并不会非常频繁的调用，如果下一次执行来的非常快，那么会将上一次取消掉



### 八 上拉加载更多的功能

- 监听滚到底部
  - 通过scroller对象监听底部

### 九 tabControl的吸顶效果

#### 9.1获取到tabControl的offsetTop

- 必须知道滚动到多少时，开始有吸顶效果，这个时候就需要获取tabControl的offsetTop
- 但是，如果直接在mounted中获取tabControl的offsetTop,那么值是不正确。
- 如何获取正确的值？
  - 监听HomeSwiper中img的加载完成
  - 加载完成后，发出事件，在Home.vue中获取正确的值
  - 补充：
    - 为了不让HomeSwiper多次发出事件
    - 可以使用isLoad的变量进行状态的记录。
  - 注意：这里不进行多次调用和debounce的区别

#### 9.2监听滚动，动态的改变tabControl的样式

- 问题动态的改变tabControl的样式时，会出现两个问题：
  - 问题一：下面的商品内容，会突然上移
  - 问题二：tabControl虽然设置了fixed，但是也会随着Better-Scroll一起滚出去了
- 其他方案解决停留问题
  - 在最上面，多复制一份PlaceHolder TabControl组件对象，利用它来实现停留效果
  - 当用户滚动到一定位置时，PlaceHolder TabContro显示出来
  - 当用户滚动没有达到一定位置时，PlaceHolder TabControl隐藏起来

### 十  让Home保持原来的状态

#### 10.1让Home不要随意销毁掉

- keep-alive

#### 10.2让Home中的内容保持原来的位置

- 离开时，保存一个位置信息 saveY
- 进来时，讲位置设置为原来保存的位置信息即可。
  - 注意：最好回来时，进行一次refresh（）