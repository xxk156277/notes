# css-html

[[toc]]

### 1、CSS 权重及其引入方式

**行间样式**

```css
<divstyle: "color:red;" ><div>;
```

**内部样式表**

```css
<head>
	<title>>标题</title>
	<style>
		.class{
			color:red;
		}
	</style>
</head>
```

**外部 css 文件**

```css
<link rel="style.css" type="text/css">
```

**导入样式**

```css
<style>
	@import url('../..')
</style>
```

**权重：**

important > 内联样式 > ID > 类 > 标签 | 伪类 | 属性选择 > 伪对象 > 继承 > 通配符

**权重值计算如下：**

我们把特殊性分为 4 个等级，每个等级代表一类选择器，每个等级的值为其所代表的选择器的个数乘以这一等级的权值，最后把所有等级的值相加得出选择器的特殊值。

4 个等级的定义如下：

```
第一等：代表内联样式，如: style=””，权值为1000。
第二等：代表ID选择器，如：#content，权值为100。
第三等：代表类，伪类和属性选择器，如.content a:link :[title]，权值为10。
第四等：代表类型选择器和伪元素选择器，如div p ::before，权值为1。
```

### 2、\<a>\</a>标签全部作用

标签的 target 属性大致有这几种：

```
（1）_blank
（2）_self
（3）_parent
（4）_top
```

作用 1 超链接

```html
1、<a href="https://www.baidu.com/" target="_blank">超链接</a>
```

在一个新的窗口打开连接相应的网页。

```html
2、<a href="https://www.baidu.com/" target="_self"></a>
```

```
	在原来的窗口打开连接相应的网页。（如果target属性值不写的话，默认是这种方式）

	在原来的窗口打开连接相应的网页。（如果target属性值不写的话，默认是这种方式）
```

```html
3、<a href="https://www.baidu.com/" target="_parent">
  4、<a href="https://www.baidu.com/" target="_top"> 5、<a href="#"></a></a
></a>
```

```
	作用2 锚点
```

```html
<div id="runtop"></div>
通过返回顶部能够实现一个常见的返回顶部的功能
```

```
	作用3：打电话或者发邮件
```

```html
<a href="tel:123456">打电话给号码为123456的人</a>
<a href="mailto:123456@789.com">发邮件给给号码为123456@789.com的人 </a>
```

作用 4：协议限定符

```html
<a href="javascript:alert("强制运行的javascript代码")">这样就能够在<a
  >标 签被点击的时候强制运行href属性里面的代码</a
>
```

### 3、用 CSS 画三角形

```css
div {
  width: 0;
  height: 0;
  border-left: 50px solid red;
  border-top: 50px solid blue;
  border-right: 50px solid green;
  border-bottom: 50px solid yellow;
}
```

![](https://upload-images.jianshu.io/upload_images/7780361-1f2d8d85903f6bb8.png?imageMogr2/auto-orient/strip|imageView2/2/format/webp)

把其他另外三个三角形隐身就可以画出各种三角形，相对的就是把 border-color 设置为 transparent 来实现

### 4、如何居中 div？

-水平居中：给 div 设置一个宽度，然后添加 margin:0 auto 属性

```css
div {
  width: 200px;
  margin: 0 auto;
}
```

-水平居中，利用 text-align:center 实现

```css
.container {
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
  font-size: 0;
}

.box {
  display: inline-block;
  width: 500px;
  height: 400px;
  background-color: pink;
}
```

-让绝对定位的 div 居中

```css
div {
  position: absolute;
  width: 300px;
  height: 300px;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: pink; /*方便看效果*/
}
```

-水平垂直居中一

```css
/*确定容器的宽高宽500高300的层设置层的外边距div{*/
position: absolute;/*绝对定位*/
width: 500px;
height: 300px;
top: 50%;
left: 50%;
margin: -150px00-250px;/*外边距为自身宽高的一半*/
background-color: pink;/*方便看效果*/
}
```

-水平垂直居中二

```css
/*未知容器的宽高，利用`transform`属性*/
div {
  position: absolute; /*相对定位或绝对定位均可*/
  width: 500px;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: pink; /*方便看效果*/
}
```

-水平垂直居中三

```css
/*利用flex布局实际使用时应考虑兼容性*/
.container {
  display: flex;
  align-items: center; /*垂直居中*/
  justify-content: center; /*水平居中*/
}
.containerdiv {
  width: 100px;
  height: 100px;
  background-color: pink; /*方便看效果*/
}
```

-水平垂直居中四

```css
/*利用text-align:center和vertical-align:middle属性*/
.container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
  font-size: 0;
  white-space: nowrap;
  overflow: auto;
}

.container::after {
  content: "";
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}

.box {
  display: inline-block;
  width: 500px;
  height: 400px;
  background-color: pink;
  white-space: normal;
  vertical-align: middle;
}
```

回答：

```
一般常见的几种居中的方法有：

对于宽高固定的元素

（1）我们可以利用margin:0 auto来实现元素的水平居中。

（2）利用绝对定位，设置四个方向的值都为0，并将margin设置为auto，由于宽高固定，因此对应方向实现平分，可以实现水
平和垂直方向上的居中。

（3）利用绝对定位，先将元素的左上角通过top:50%和left:50%定位到页面的中心，然后再通过margin负值来调整元素
的中心点到页面的中心。

（4）利用绝对定位，先将元素的左上角通过top:50%和left:50%定位到页面的中心，然后再通过translate来调整元素
的中心点到页面的中心。

（5）使用flex布局，通过align-items:center和justify-content:center设置容器的垂直和水平方向上为居中对
齐，然后它的子元素也可以实现垂直和水平的居中。

对于宽高不定的元素，上面的后面两种方法，可以实现元素的垂直和水平的居中。
```

### 5、常用布局

左列定宽，右列布局

```html
<main>
  <div class="left">左列定宽</div>
  <div class="right">右列自适应</div>
</main>
```

**float + margin**

```css
main {
  height: 500px;
}
.left {
  float: left;
  height: 100%;
  width: 200px;
  background-color: lightblue;
}
.right {
  height: 100%;
  width: 100%-200px;
  margin-left: 200px;
  background-color: lightpink;
}
```

**flex**

```css
main {
  display: flex;
  width: 100%;
  height: 700px;
}
.left {
  width: 200px;
  height: 100%;
  background-color: lightblue;
}
.right {
  flex: 1;
  height: 100%;
  background-color: lightgreen;
}
```

**右列定宽，左列布局**

```html
<main>
  <div class="left">左列自适应</div>
  <div class="right">右列定宽</div>
</main>
```

margin + float

```
	main {
	 	 width: 100%;
	  	height: 500px;
	}
	.left {
	  	float: left;
 		 width: 100%;
 		 height: 100%;
 		 margin-right: -100px;
 		 background-color: lightblue;
	}
	.right {
 		 float: right;
 		 width: 100px;
  		height: 100%;
 		 background-color: lightcoral;
	}
```

flex

```css
main {
  display: flex;
  width: 100%;
  height: 700px;
}
.left {
  flex: 1;
  height: 100%;
  background-color: lightgreen;
}
.right {
  width: 200px;
  height: 100%;
  background-color: lightskyblue;
}
```

**三栏布局**

```html
<main>
  <div class="left">左列定宽</div>
  <div class="center">中列定宽</div>
  <div class="right">右列自适应</div>
</main>
```

**float + margin 实现**

```css
main {
  height: 700px;
}
.left {
  float: left;
  width: 200px;
  height: 100%;
  margin-right: 10px;
  background-color: lightgreen;
}
.center {
  float: left;
  width: 300px;
  height: 100%;
  background-color: lightcoral;
}
.right {
  margin-left: 520px;
  height: 100%;
  background-color: lightskyblue;
}
```

未知宽高元素水平垂直居中（方案及比较）

元素种类的划分

盒子模型及其理解

定位方式及其区别（文档流）

margin 塌陷及合并问题

浮动模型及清除浮动的方法

CSS 定位属性

display 及相关属性

IFC 与 BFC

圣杯布局和双飞翼布局的实现

Flex 布局

px、em、rem 的区别

Less 预处理语言

媒体查询

vh 与 vw

H5 的语义化作用及语义化标签

Web Worker 和 Web Socket

CSS3 及相关动画

如何实现响应式布局

SEO 的概念及实现

HTML5 的新特性

Less 和 Sass 使用
