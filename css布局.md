# 居中布局
- 首先联想到的时`text-align`可以控制`内联级元素`的布局，而`center`值可以让其居中
> 可以通过控制display属性的值来改变盒子的类型，使其成为内联级元素（inline、inline-block、文本）
```css
.vertical-inline {
    height: 200px;
    border: 1px solid red;
    text-align: center;
}
.box {
    display: inline-block;
    width: 50px;
    height: 50px;
    background: orangered;
}
``
​```html
<div class="vertical-inline">
    hello world
    <div class="box"></div>
</div>
```
- 以及通过`line-height`控制行高，配合`vertical-align`实现居中
> 推荐文章：[CSS深入理解vertical-align和line-height的基友关系](https://www.zhangxinxu.com/wordpress/2015/08/css-deep-understand-vertical-align-and-line-height/)，本人还没搞清楚😂

- 其次就是通过利用`margin`来`自动填充`水平或垂直方向的`剩余空间`，从而实现居中布局
    - `块级元素`：有宽高时，设置`margin: auto`会自动填充`水平方向`的剩余空间
    ```css
    .vertical-block {
        width: 100px;
        margin: auto;
        height: 200px;
        border: 1px solid red;
    }
    ```
    ```html
    <div class="vertical-block"></div>
    ```
    - `FFC或GFC`：有宽高时，设置`margin: auto`会自动填充`水平和垂直方向`的剩余空间（当然也会按照相应的flex或grid的语法进行布局）
    ```css
    .vertical-block {
        /* display: flex; */
        display: grid;
        width: 500px;
        height: 500px;
        border: 1px solid red;
    }
    .box {
        background: orchid;
        margin: 0 auto; /* 上下margin填充为0，左右margin自动平分剩余空间 */
        /* margin: auto 0; */
        /* margin: auto; */
        width: 50px;
        height: 50px;
    }
    ```
    ```html
    <div class="vertical-block">
        <div class="box"></div>
    </div>
    ```
- 也可以通过`定位（position）`来完成居中布局（子元素相对父元素定位实现居中布局）
```css
.vertical-block {
    position: relative;
    width: 500px;
    height: 500px;
    border: 1px solid red;
}

.box {
    position: absolute;
    background: orchid;
    width: 50px;
    height: 50px;

    /* 1. 50%定位 - 本身元素宽或高的一半 */
    /* left: 50%; */
    /* top: 50%; */

    /* margin: -25px 0 0 -25px; */
    /* transform: translate(-50%,-50%); */

    /* 
    2. 利用left/top/right/bottom的计算方式是按照，该元素的左margin相对于包含块的左border计算的（从左到右排列时，反之同理） 
    因为要满足下列的条件距离为0，且宽高均为50px，因此margin会自动填充水平和垂直方向的剩余空间
    */
    margin: auto;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;

}
```
```html
<div class="vertical-block">
    <div class="box"></div>
</div>
```
- `table-cell` + vertical-align实现垂直居中
> 推荐文章：[我所知道的几种display: table-cell的应用](https://www.zhangxinxu.com/wordpress/2010/10/%E6%88%91%E6%89%80%E7%9F%A5%E9%81%93%E7%9A%84%E5%87%A0%E7%A7%8Ddisplaytable-cell%E7%9A%84%E5%BA%94%E7%94%A8/)


- 使用`flex`实现居中布局就不多说了

# `定`宽或高 + `自适应`布局
- 浮动元素 + 非浮动元素使用margin 或 创建BFC
- 定位（position）
- flex 或 grid

# `不定`宽或高 + `自适应`布局
- 浮动元素 + 非浮动元素使用margin 或 创建BFC
- flex 或 grid

# 圣杯布局

- header、footer固定占的高度20%，中间高度自适应left、right固定宽占20%，center宽自适应
  - flex 
  - grid
  - flow



# 参考

- [网页布局都有哪种？一般都用什么布局？](https://juejin.cn/post/6865107864139087886#heading-10)

- [干货！各种常见布局实现 + 知名网站实例分析](https://juejin.cn/post/6844903574929932301)

