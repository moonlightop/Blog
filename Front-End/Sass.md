# 参考

* vscode转换插件：[Live Sass](https://www.sass.hk/skill/sass154.html)
* 官方文档：[Sass教程 Sass中文文档 | Sass中文网](https://www.sass.hk/docs/)
# 常用语法

* 此处选择scss语法，在原有的css语法上扩展功能
## 嵌套规则

* 内存样式将外层的选择器作为父选择器
>scss
```scss
#main p {
  color: #00ff00;
  width: 97%;
  
  .redbox1,.readbox2 {
    background-color: #ff0000;
    color: #000000;
    .a1,.a2 {
      font-size: 20px;
    }
  }
}
```
>css
```css
#main p {
  color: #00ff00;
  width: 97%;
}
#main p .redbox1 {
  background-color: #ff0000;
  color: #000000;
}
#main p .redbox1 .a1,#main .redbox1 .a2{
  font-size: 20px;
}
#main p .redbox2 {
  background-color: #ff0000;
  color: #000000;
}
#main p .redbox2 .a1,#main .redbox2 .a2{
  font-size: 20px;
}
```
## 父选择器&

* 用&代表嵌套规则外层的父选择器，**必须作为选择器的第一个字符**
>sass
```scss
#main {
  color: black;
  &-header {
    border: 1px solid red;
    &:hover {
      background-color: black;
    }
  }
}
```
>css
```css
#main { color: black; }
#main-header { border: 1px solid red; }
#main-header:hover { background-color:black; }
```
## 属性嵌套

* 将**同一属性前缀**的写在同一命名空间，自身也可以取值
>sass
```scss
#main {
  /* border、background ... */
  font: 20px {
    family: fantasy;
    weight: bold;
  }
}
```
>css
```css
#main { font: 20px; font-family: fantasy; font-weight: bold; }
```
## 注释

* **/**/**多行注释保留，sass新增的//不会保留到css中
    * **/*****!*****/******表示在压缩输出模式下保留此注释
## SassScript

### 变量$

* 全局变量，没有嵌套规则的变量
* 局部变量，在嵌套规则内部的变量
    * 局部变量通过后加**!global**变为全局变量
>sass
```scss
$count: 1px;
#main{
  $color: red !global;
  p {
    color: $color;
  }
  width: $count;
}
#sidebar {
  color: $color;
}
```
>css
```css
#main { width: 1px; }
#main p { color: red; }
#sidebar { color: red; }
```
## 数据类型（Data Types）

* css中属性对应的可能取值都可以用变量表示
    * 可以通过 #{"!important"} 将字符串转为无引号的字符串
>sass
```scss
$b-color: #{"!important"};
$b-width: "!important";
#main {
  color: red $b-color;
  width：100px $b-width;
}
```
>css
```css
#main { 
  color: red !important; 
  width: 100px "!important"
}
```
## list

* ( , )          ，          () ()           (),()
    * 分别使用逗号，两个()间用空格隔开分成两个数组
```scss
$list:(1px 1px 0 0 red),(2px 2px 0 0 orange)
div {
  width: 50px;
  height: 50px;
  box-shadow: $list;
}
```
## 运算符（Operations）

* **数字运算**：< 、>、<=、>=
* ==、!= 用于所有类型的运算
* / 号的除法功能
    * 值算术表达式的一部分
    * 值被圆括号包裹
    * 值或值得一部分是变量或函数得返回值
* / 号是起着数字的分隔作用
    * 通过#{}将变量包裹
    * 其它情况
>sass
```scss
p {
  $font-size: 10px;
  $font-height: 8px;
  font: 10px/8px;
  font: #{($font-size)}/#{($font-height)};
  $width: 1000px;
  width: $width/2;
  width: round(1.9)/2;
  height: (500px/2);
  margin-left: 5px + 8px/2px;
}
```
>css
```css
p { font: 10px/8px; font: 10px/8px; width: 500px; width: 1px; height: 250px; margin-left: 9px; }
```
* **颜色运算**
    * #010203 + #040506 = #050709
        * 01 + 04 = 05，02 + 05 = 07，03 + 06 = 09
    * #010203 * 2 = #020406
        * 01 * 2 = 02，02 * 2 = 04，03 * 2 = 06
    * rgba(255，0，0，0.75) + rgba(0，255，0，0.75) = rgba(255，255，0，0.75)
        * 必须有相同的不透明值才能相加
* **字符串运算**
    * 两个字符串连接，最终结果是有引号字符串还是无引号字符串取决于 位于 +号左侧的是有引号还是无引号
>sass
```scss
p:before {
  content: "Foo" + Bar;
  font-family: sans- + "serif";
}
```
>css
```css
p:before { content: "FooBar"; font-family: sans-serif; }
```
* 布尔运算、数组运算
    * and、or、not
    * [list function](https://sass-lang.com/documentation/modules/list)
    * 圆括号优先
## 自定义函数（Function）

>sass
```scss
$grid-width: 40px;
$guter-width: 10px;
@function grid-width($n) {
  @return $n * $grid-width + ($n - 1) * $gutter-width; 
} 
#sidebar { width: grid-width(5) }
```
>css
```css
#sidebar { width: 240px; }
```
## @import

* 扩展css原有功能，还可以导入sass、scss文件
    * 将文件最前面加_colors.scss 就不会编译将它编译为_colors.css

![图片](https://uploader.shimo.im/f/irTuoz4MQHsIuI56.png!thumbnail?fileGuid=qvRCxjGYDVKq6KPx)

## @if-else

* 简单的控制命令
>sass
```scss
p {
  @if 1 + 1 == 2 { 
    border: 1px solid; 
  } @else if 5 < 3 { 
    border: 2px dotted; 
  }
}
```
>css
```css
p { border: 1px solid; }
```
## @for

* @for $var from <start> through <end>
* @for $var from <start> to <end>
    * through 包括 end
    * to 不包括 end
>sass
```scss
@for $i from 1 to 3 {
  .item-#{$i} {
    width: 2px * $i
  }
}
```
## @each

* @each $var in <list>
    * 将$var作用与列表的每一个值
>sass
```scss
@each $animal in dog,cat,fish {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
  }
}
```
>css
```css
.dog {
  background-image: url('/images/dog.png');
}
.cat {
  background-image: url('/images/cat.png');
}
.fish {
  background-image: url('/images/fish.png');
}
```
## @while

>sass
```scss
$i: 6;
@while $i > 0 {
  .item- #($i) {
    width: 2px * $i;
  }
  $i: $i - 2;
}
```
## @mixin

* 函数是返回某个值作为属性值，而混合是与include合并
    * @mixin        =
    * @include     +
>sass
```scss
@mixin sexy-border($color,$width) {
  border: {
    color: $color;
    width: $width;
  }
}
#main {
  @include sexy-border(red,10px);
  height: 100px;
}
```
>css
```css
#main { border-color: red; border-width: 10px; height:100px; }
```
# 常用函数

## random

* 随机获取一个[0，1）的数字
# 输出格式

![图片](https://uploader.shimo.im/f/lDuATugHkOongI6D.png!thumbnail?fileGuid=qvRCxjGYDVKq6KPx)

* nested

![图片](https://uploader.shimo.im/f/GrtOZjxoX5RUODoy.png!thumbnail?fileGuid=qvRCxjGYDVKq6KPx)

* expanded
    * 想我们手写css一样
* compact

![图片](https://uploader.shimo.im/f/MrfKg9DBgu0VKo9t.png!thumbnail?fileGuid=qvRCxjGYDVKq6KPx)

* compressed
    * 压缩模式输出



