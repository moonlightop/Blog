# 参考

* CSS参考手册：[http://css.cuishifeng.cn/columns.html](http://css.cuishifeng.cn/columns.html)
* MDN：[https://developer.mozilla.org/es/docs/Web/CSS/linear-gradient()](https://developer.mozilla.org/es/docs/Web/CSS/linear-gradient())
* caniuse：[https://www.caniuse.com/](https://www.caniuse.com/)
* github案例练习：[https://chokcoco.github.io/CSS-Inspiration/#/./layout/flex-waterfalls-flow](https://chokcoco.github.io/CSS-Inspiration/#/./layout/flex-waterfalls-flow)
* 张大大的博客：[https://www.zhangxinxu.com/wordpress/](https://www.zhangxinxu.com/wordpress/)
# SEO

* 搜索引擎标签的遍历顺序从右向左

![图片](https://uploader.shimo.im/f/XCddEqyV6OMmBwXW.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

# inline

## vertical-align

* baseline（默认值）、text-top、text-bottom、middle
* 给红方块设置inline-block，使其拥有文字特性
    * baseline在方块有文字时对齐文字底线，没文字时对齐方块底部

![图片](https://uploader.shimo.im/f/B3RGPI9FR2TrLaZZ.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)![图片](https://uploader.shimo.im/f/lei3Zo8DDShIGtmH.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

# Sprites

* 图片中有小图标，如果高度使得当前小图标展示不到一半，就直接展示下一个小图标
* 参考图片：81px * 81px，每个小图标 27px*27px

![图片](https://uploader.shimo.im/f/VkBZViCF5wq71TQ7.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

![图片](https://uploader.shimo.im/f/SQs1pF6tK4Mpxo75.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

# 第三方插件

## prefix

* 因为有些CSS3新增的属性，当时的浏览器还没有普遍兼容，只有某些内核支持，因此需要加上prefix来区分是什么内核支持
* 可以使用![图片](https://uploader.shimo.im/f/DgpspZN4npe4Nt6K.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)，一种自动加上prefix的一种插件，方便我们编写代码
    * 它会检查css代码，然后补齐前缀，实现兼容
* 不同内核实现了，用不同的prefix标识

![图片](https://uploader.shimo.im/f/MDOtb0VmbZbQhwc4.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

![图片](https://uploader.shimo.im/f/o36677oynfS4wSeA.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

* 当所有主流Browser都实现了，就变成下图

![图片](https://uploader.shimo.im/f/vc6PzPOsWOr83VwJ.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

## post-processor（后处理器）

* autoprefixer插件
    * 我们不考虑浏览器兼容去写CSS，然后它帮我们的CSS补齐prefix
    * 这样我们写的CSS代码就不用因为所有浏览器都兼容了，而去维护修改代码了
        * 此时只需撤掉后处理器，可维护性高
        * 而用预处理的话，需改写代码，维护性低
# ![图片](https://uploader.shimo.im/f/VVhJVjatkRaOgV2t.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

## pre-processor（预处理器）

* less/sass、cssNext（辅助CSS的工具）
    * 我们按照别人的语法写，人家进行预处理为CSS

![图片](https://uploader.shimo.im/f/GoXX8FzSU0PMHYhf.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

* cssNext
    * 用来实现一些未来的标准（未完全在各大浏览器的标准）
        * 定义变量...

![图片](https://uploader.shimo.im/f/LaWRUK0xQ8WkbhHu.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

## postCss

* 可以在原有的插件基础上，扩展其它功能，而并非后处理器、预处理器
    * 例如：autoprefixer  |  less/sass  |  cssNext这些插件 + postCss实现的功能

![图片](https://uploader.shimo.im/f/J8YQo025JRBhTvTl.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

# CSS3选择器

## 不常用选择器

### Relation selectors

#### E > F

* 选中E标签下所有F子标签

![图片](https://uploader.shimo.im/f/0DuCjKd6Pw6ClxCW.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

#### E  +  F

* 下一个满足条件的兄弟元素节点

![图片](https://uploader.shimo.im/f/9qwvfBtmdLoh4DrX.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

![图片](https://uploader.shimo.im/f/wuX9RxsRgWHQgwdE.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

#### E  ~  F

* 所有满足条件的兄弟元素节点

![图片](https://uploader.shimo.im/f/rl1tUyxIWQyBJYzb.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

### 并列选择器

* =
    * 根据标签的属性名 | 属性名和值选择符合条件的元素节点

![图片](https://uploader.shimo.im/f/epSZFRGwE1AMsY7h.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

* ~=
    * 标签中有一个独立的属性值（不同字符用空格分开）

![图片](https://uploader.shimo.im/f/e3sEEvKDziwRdNEB.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

![图片](https://uploader.shimo.im/f/SeinZYX849YHPa5W.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

* |=
    * 选取以属性值和属性值-  开头的所有元素节点

![图片](https://uploader.shimo.im/f/hfp3fseolsYhPutC.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

![图片](https://uploader.shimo.im/f/1prPhK4oeb6eg5Ju.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

* $=
    * 选取以属性值结尾的所有元素节点

![图片](https://uploader.shimo.im/f/rkU4OUmx5IEVeQaY.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

* *=
    * 选取存在属性值的所有元素节点

![图片](https://uploader.shimo.im/f/1duitSr084OkAKBF.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

### 伪元素选择器

>它是被选择元素的一种状态
* placeholder

![图片](https://uploader.shimo.im/f/fptB63x6WKAeJFnh.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

![图片](https://uploader.shimo.im/f/2Ob6Yodb6MtBfRH6.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

* selection
    * 用鼠标选中时触发此css选择器

![图片](https://uploader.shimo.im/f/XwRG6BDB5KE9ZSHJ.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

![图片](https://uploader.shimo.im/f/D2fIa7QmMIZGGTVS.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

* 没有demo类的所有元素节点

![图片](https://uploader.shimo.im/f/2t4bsVd9xaNRYZCa.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

![图片](https://uploader.shimo.im/f/H60tPc7YSO73CtuD.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

* 不是最后一个的所有元素节点
    * 注意如果有子标签，则选取子标签中不是最后一个节点的所有元素节点

![图片](https://uploader.shimo.im/f/Oux80NNmWPuseU0y.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)![图片](https://uploader.shimo.im/f/YumKj2Alnew8e0Ha.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

* div：target
    * 选中处于target状态的div标签，并跳转到此标签处
    * 当location.hash == 对应标签的id值，那么此标签处于target状态

![图片](https://uploader.shimo.im/f/8zUHtxp0jofIDfqo.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

![图片](https://uploader.shimo.im/f/idaqAdBFiHBIMiZT.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

* p：first-child（last-child）
    * 选父元素的第一个符合条件的子元素

![图片](https://uploader.shimo.im/f/QsWfJfyWqfHYlCgf.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)![图片](https://uploader.shimo.im/f/mKg4NONd6YD8IPMo.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

* span：only-child
    * 独生子的所有span标签

![图片](https://uploader.shimo.im/f/YKMDXiLMgTBwausX.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

* n = 0，1，2 ....
    * CSS从1开始查数，选父元素的第2n+1个符合条件的子元素

![图片](https://uploader.shimo.im/f/LSlUEXEkbGh6tDlJ.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

![图片](https://uploader.shimo.im/f/nZloW5g7XxgvbP4K.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

* div：empty
    * 选取子节点为空的标签，但不包括注释节点

![图片](https://uploader.shimo.im/f/Q74NuURmDVW9S24n.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

* input：checked、input：enable（disable）、input：read-only（read-write）

![图片](https://uploader.shimo.im/f/j3pKLvEUYH0LMV3l.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)![图片](https://uploader.shimo.im/f/0pmIRuwIMCzPu9Av.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

![图片](https://uploader.shimo.im/f/YFTPXEw8AtjXayWS.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

### 根标签选择器

* 选中文档，最好写root

![图片](https://uploader.shimo.im/f/D7ynthIxJimGCSsx.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

## 常用选择器

* div：target
    * 选中处于处于target状态的div标签，并跳转到此标签处
    * 当location.hash == 对应标签的id值，那么此标签处于target状态

![图片](https://uploader.shimo.im/f/8zUHtxp0jofIDfqo.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

* 不是最后一个

![图片](https://uploader.shimo.im/f/L0MHwxYSSLV2RyCE.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

* p：first-of-type(last-of-type)
    * 匹配父元素下第一个符合条件的子元素

![图片](https://uploader.shimo.im/f/Ho0hex9ZUZUqOUwG.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

![图片](https://uploader.shimo.im/f/oSwWB849pbV9f02x.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

* p：only-of-type
    * 匹配父元素下只有一个符合条件的子元素

![图片](https://uploader.shimo.im/f/IZAQjnhqwVjdw81D.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

* p：nth-of-type(2n+1)
    * n - 0、1、2...
    * 匹配父元素的第2n+1个符合条件的子元素

![图片](https://uploader.shimo.im/f/QqItclruSTOgUROP.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)![图片](https://uploader.shimo.im/f/jJ7WoCv3FYAe5TFR.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

* p：nth-child(n+1)
    * n - 0、1...
    * 匹配父元素的第n+1个符合条件的子元素
# 新增属性

## border

* 参考文章：[https://www.zhihu.com/question/35180018](https://www.zhihu.com/question/35180018)
* 由盒模型，我们可以看到border的每一个方向是由一个梯形组成
    * （此时padding + content是有宽高的）

![图片](https://uploader.shimo.im/f/7Ie1vj3It8tJpl9s.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

* 使得padding + content的宽度为0，可以看到上下两个border变为了三角形
    * 因为随着padding + content的宽度趋向于0，两条线就不断的靠近，最终相交成为三角形

![图片](https://uploader.shimo.im/f/ZHmbrrTl17FW1esF.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

* 同理，使得padding + content的宽高都为0，就可以看到，左右也变为了三角形

![图片](https://uploader.shimo.im/f/fTXyUV829BTI0hVm.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

* border-width指的是四个方向三角形或梯形的高
    * 当一个方向的border高度为0，是以此方向的border高的顶点A为线，切一个矩形
    * 四个方向都有时，接下来把border-bottom取消，就会以顶点A为线，切一个矩阵（用蓝笔画主的矩形）

![图片](https://uploader.shimo.im/f/GmwZchl9OQC2F7cA.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

    * 不设置border-bottom，接下来把border-left和border-bottom取消，就会以顶点A为线，且一个矩形（用蓝笔画主的矩形）

![图片](https://uploader.shimo.im/f/Hja2kbrUKQvuVuSA.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

    * 不设置border-left和border-bottom

![图片](https://uploader.shimo.im/f/lDgWqUK5MNuqKnXG.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

```css
.box{
height: 0;
  width: 0;
  box-sizing: border-box;
  border-top:200px solid red;
  border-left: 200px solidblack;
  border-bottom: 200px solid transparent;
  border-right: 200px solid transparent;
}
```
### border-radius

* 对盒子内部起作用（border + padding + content）
    * 它分为四个方向，每个方向可以设置两个值，分别为下图**椭圆**的**水平方向半径和垂直方向半径**，每个方向都会以一个这样的去切盒子，将红线外的原来盒子中切掉

![图片](https://uploader.shimo.im/f/dIM4Fs3bP5PMkJi1.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

    * border-left-top-radius: 45px 90px
        * 那么此椭圆的水平方向半径为45px、垂直方向半径为90px
    * border-radius: 50%，这样就能画出椭圆，首先它相当于border-radius: 50% 50% 50% 50%  / 50% 50% 50% 50%，**那么每个方向上的将会以50% * width的水平半径，50% * height的垂直半径的椭圆去切这个盒模型**（默认标准盒模型），这样就得到一个椭圆
        * 此处得到椭圆因为盒模型的width != height，而且圆是椭圆的特殊情况（a == b时）

![图片](https://uploader.shimo.im/f/MEaXpRLYibNMQHsB.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

    * 各种写法，简写时，从左上角开始，顺时针转下去
```css
.box {
  height: 0;
  width: 0;
  box-sizing: border-box;
  margin: 0 auto;
  border-top: 200px solid red;
  border-left: 200px solid black;
  border-bottom: 200px solid orange;
  border-right: 200px solid grey;
  border-radius: 10px 40px 70px 100px 
              /  10px 40px 70px 100px;
/*
  border-radius: 50%; // 全部设为50%
  border-radius: 10px 40px 70px 100px;
  border-left-top-radius: 10px; // 10px 10px
  border-right-top-radius: 40px;
  border-right-bottom-radius: 70px;
  border-left-bottom-radius: 100px;  
*/
}
```
### border-image

强烈推荐参考博文：[https://www.cnblogs.com/aishangliming/p/6032810.html](https://www.cnblogs.com/aishangliming/p/6032810.html)

>border-image: 图片（url(xxx.jpg)） 位置（27） 重复性（stretch）
* 第一个参数用于引入图片，第二个参数用于对此图片进行裁剪，然后将裁剪的内容再压缩或拉伸到borde中，其中上下两个部分取决于border-image-slice的水平参数，左右两个部分取决于border-image-slice的垂直参数
* 具体可用此图片，大小81px * 81px，然后每个小格是27px * 27px

![图片](https://uploader.shimo.im/f/29AKegDCMya1A1Vr.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

#### border-image-source

* 引入图片
>border-image-source: url(./test.jpg);
#### border-image-outset

* 图片往border外扩展
>border-image-outset: 100px;
#### border-image-width

* 设置border引入的图片的宽度
>border-image-width: 200px;
#### border-image-slice

* %、数(表示像素)，默认加上px
    * 默认border-image-slice：100%
    * border-image-slice：30% 35% 40%  30%（上 右 下 左）
        * **相对引入的图片**，让裁剪线下移30%px，右移35%px，下移40%px，左移30%px

![图片](https://uploader.shimo.im/f/N2GmuyLwe3v5iXL1.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

#### border-image-repeat

>border-image-repeat: 水平方向  垂直方向
* 上图的四个顶角此属性不作用，上下对应了此属性的水平方向的参数，左右对应了此属性的垂直方向的参数
* 参数：repeat（重复）、round（平铺）、stretch（拉伸，默认）
    * repeat不会压缩图片，直接重复铺上去，而round则是会压缩，使得它能完整的铺上去
    * stretch就拉伸图片来填充此区域

![图片](https://uploader.shimo.im/f/oXp5kZRJxTxdUnHS.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)![图片](https://uploader.shimo.im/f/5kFI3zKg4qhc1sab.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)![图片](https://uploader.shimo.im/f/aoz6URuFFjZBS6D6.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

## background

### background-image

* background-image：linear-gradient() / radial-gradient() / url
    * 渐变颜色是图片来的
* background-repeat：repeat / no-repeat(默认值) / repeat-x / repeat-y / round / space
    * round和space的区别：[https://blog.csdn.net/weixin_49752665/article/details/107879926](https://blog.csdn.net/weixin_49752665/article/details/107879926)
* background-size: xxpx
* background-position: x方向，y方向
    * 原理参考Sprites

![图片](https://uploader.shimo.im/f/Nq06sNCduSXEPKiu.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

```css
.box {
  width: 0;
  height: 0;
  padding: 200px 200px;
  margin: 200px auto;
  background-color: gray;
  background-image: url(./border1.png),url(./border.png);
  background-repeat: no-repeat,repeat-x;
  background-size: 50px,100px;
  background-position: 200px 0,100px 100px;
}
```
### background-origin

>将背景图片以...位置**开始填充**
* padding-box（默认）  border-box  content-box
    * 修改background-position的坐标轴原点
    * 要注意的是border不显示图片，仅有padding和content显示图片
    * background-color的颜色填充padding和content
        * border-width：100px
        * padding：200px
        * content：250px * 250px

![图片](https://uploader.shimo.im/f/vmmKCYXKcmQLJcVK.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

### background-clip

>以...位置为背景图片的**显示的终点**
* padding-box（默认）  border-box  content-box
    * 原理同background-origin
>text：用文字体来截背景图，还不是很兼容，不是很重要
```plain
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent; // 会覆盖color
```
![图片](https://uploader.shimo.im/f/H8wuCXYdbeXp1GhO.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

### background-attachment

>背景图像相对xxx固定，配合overflow：hidden使用
* fixed：相对于浏览器可视窗口固定
    * 背景图片跟着浏览器滚动而滚动
* scroll：相对于元素（容器）固定（默认值）
    * 背景图片不跟着容器滚动而滚动
* local：相对于元素内容固定
    * 背景图片跟着容器滚动而滚动
### background-size

* div
    * width：500px
    * height：700px
#### cover

* 不改变图片原比例，用一张图片填充满容器（**可能溢出**）
    * 假设原有图片比例是1：2，为了充满容器，就会调整图片为500px * 1000px
#### contain

* 不改变图片原比例，让容器包含一张图片（**可能留白**）
    * 假设原有图片比例是1：2，为了能让容器包含图片，就会调整图片为350px * 700px
### linear-gradient

* 参考博文：[https://blog.csdn.net/three_bird/article/details/51361065](https://blog.csdn.net/three_bird/article/details/51361065)
>**参数**
>渐变方向 | deg（默认180deg，to bottom）颜色1  starting point1，颜色2  starting point2（ending point1），......
* 第一个颜色的位置设置为n%，第二个颜色的位置设置为m%。则浏览器会将0%-n%的范围设置为第一个颜色的纯色，n%-m%的范围设置为第一个颜色到第二个颜色的过渡，m%-100%的范围设置为第二个颜色的纯色
* 每一个渐变的区域都对应这样一个图，起始颜色由starting point沿着此条直线走到ending point，在starting~ending之间，是前后两种颜色的过渡

![图片](https://uploader.shimo.im/f/IO876WyFHYbZkbKG.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

* 看如下例子
    * 0~20px先是纯色，然后在交汇出两色混合，渐变效果出现，其它同理
```css
background-image: linear-gradient(90deg,#0f0 20px,#ff0 60px,#00f 80px)
等价于
background-image: linear-gradient(90deg,#0f0 0,#0f0 20px,#ff0 60px,#00f 80px,#00f 100%)
```
![图片](https://uploader.shimo.im/f/U2J2noLKrQdrYZ1m.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

### repeating-linear-gradient

>未渐变区域重复之前的
```css
.box {
  width: 500px;
  height: 500px;
  
  background-image: repeating-linear-gradient(90deg,#f00 250px,#ff0 300px,blue 400px)
}
```
![图片](https://uploader.shimo.im/f/XSCm81mfmZRLtgfE.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

### radial-gradient

>以中心开始，以不同半径的shape(circle  \  ellipse)扩散
>参数
>circle \ ellipse 半径限制条件 圆心位置，第一个圆的颜色 R1，第二个圆的颜色 R2...
* px是指定半径的、%就根据容器的宽高来决定
* 两圆间渐变，单圆纯色（高斯模糊），默认圆心在容器中间
* 半径限制条件

![图片](https://uploader.shimo.im/f/lrRMBkUPXgA6VAie.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

![图片](https://uploader.shimo.im/f/T0TWL2pY39P993Dd.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

![图片](https://uploader.shimo.im/f/GAhYQX3M20gvEnKZ.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

![图片](https://uploader.shimo.im/f/uSfYVitxOSKLpV1y.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

### repeating-radial-gradient

>未渐变区域重复之前的

![图片](https://uploader.shimo.im/f/keiCvUuO6zZi6T5T.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)![图片](https://uploader.shimo.im/f/UfBRizXf185lGVvQ.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

## box-shadow

### How to Use

>**参数**
>[inset] 水平阴影偏移  垂直阴影偏移  高斯模糊程度(blur)  整体扩大阴影(spread)  阴影颜色
    * 内阴影扩大向内（inset）、外阴影扩大向外
    * xoffset > 0 ：右移
    * yoffset > 0 ：下移
    * spread向四周延申，blur是以spread为边界去模糊（值越大、越模糊且范围越大）

![图片](https://uploader.shimo.im/f/8dhMQtpmToUV3KOT.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

    * 阴影谁先写，它的z轴越靠近我们
        * 重叠会叠加颜色变色
    * 背景颜色在阴影的下面，文本在阴影的上面
```xml
<div class="box">center</div>
```
```css
.box {
  margin: 100px auto;
  width: 100px;
  height: 100px;
  font-size: 20px;
  color: #fff;
  box-shadow: inset 0 0 10px 30px grey,
              150px 70px 10px 0 #f0f,
              100px 100px 10px 0 #0ff;
}
```
![图片](https://uploader.shimo.im/f/vL2kIxta6CFM2HDW.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

### Example

>炫酷圆

![图片](https://uploader.shimo.im/f/KrAActS2jegPNHvv.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)![图片](https://uploader.shimo.im/f/JGiksndwPjIwxrFQ.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

>太阳（扩大阴影配合高斯模糊）

![图片](https://uploader.shimo.im/f/IPMO9meBbKXyL7HN.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)![图片](https://uploader.shimo.im/f/qXjXzLlbW8f3At9Y.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

## text-shadow

### How to Use

>参数
>x  y  blur  ShadowColor

![图片](https://uploader.shimo.im/f/y0a3hPkUu6M8hG3j.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

### Example

#### 浮雕效果

* 左上白阴影、右下黑阴影（阳光从左上照下来）
    * 给人一种感觉，阴影在右后

![图片](https://uploader.shimo.im/f/O919Vlb5KUq80099.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

![图片](https://uploader.shimo.im/f/1RgdJzUSSciDX8vN.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

![图片](https://uploader.shimo.im/f/E33QHOmHZne6HkKL.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

#### 镂刻效果

* 左上黑阴影、右下白阴影（阳光从右下照上来）
    * 给人一种感觉，阴影在左后

![图片](https://uploader.shimo.im/f/P859MBRKTVUoveSC.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

![图片](https://uploader.shimo.im/f/AHgxh2YH8twl3VbT.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

#### 火焰效果

* 通过伪元素来添加文字，hover时更换阴影，并且显现伪元素添加的文字

![图片](https://uploader.shimo.im/f/S2Dn7I7p6ENPSjWV.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)![图片](https://uploader.shimo.im/f/607ZsrrmqR9BAOd7.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

```css
body {
  background-color: black;
}
.box {
  width: 400px;
  height: 100px;
  font-size: 40px;
  color: #fff;
  position: absolute;
  left: calc(50% - 200px);
  top: calc(50% - 50px);
  text-shadow: 0 0 10px #0f0,
               0 0 20px #0f0,
               0 0 30px #0f0;
  transition: 0.6s;
}
div:hover {
  text-shadow: 0 0 10px #f00,
               0 0 20px #f10,
               0 0 30px #f20;
}
div::before {
  content: "NO ";
  opacity: 0;
  transition: 0.6s;
}
div:hover::before {
  opacity: 1;
}
```
#### 死神来了

* background-clip和text-shadow配合使用时，
    * 由于用了background-clip：text所以改文字变为背景一部分，因此文字阴影更靠近我们

![图片](https://uploader.shimo.im/f/NU6JKVsHBLNQTz0P.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

![图片](https://uploader.shimo.im/f/pYtPzm1g3sBGMea1.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

![图片](https://uploader.shimo.im/f/1YLelUSAkt21fesg.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

#### 影分身

>其实就是hover时候疯狂加text-shadow

![图片](https://uploader.shimo.im/f/RVWY9xoFFCrWXdOM.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

![图片](https://uploader.shimo.im/f/pVEuAiUlT1w3d92N.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

![图片](https://uploader.shimo.im/f/BaZ9rLamV6iXczgu.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

#### 描边效果

>-webkit-text-stroke: 描边的大小  描边颜色
```css
.box {
  font-size: 60px;
  font-weight: bold;
  color: transparent;
  -webkit-text-stroke: 2px red;
}
```
![图片](https://uploader.shimo.im/f/9j5gsNkAE46aRZaT.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

## @font-face

>中文字体包太大了，一般不引入过来
>**多用于引入小的字体包**

![图片](https://uploader.shimo.im/f/hC3cE2m9NhvIhX2J.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

>MINE协议时Browser和Operation System的桥梁
* Browser内置MINE协议，而不同Browser的MINE协议可能不同

因此我们最好引入所有不同后缀名的同一字体文件，防止浏览器不兼容

![图片](https://uploader.shimo.im/f/98Xcg4mgDuvw10BN.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

## box

>盒模型定义如下：[https://zhuanlan.zhihu.com/p/291489867](https://zhuanlan.zhihu.com/p/291489867)
* 父盒子通过content来存储子盒子
>**盒子内部**
>> box-sizing：content-box / border-box
>> content：内容区
>> padding：内边距
>> border：边框
>**盒子外部**
>> margin：外边距

![图片](https://uploader.shimo.im/f/9UIV0ylOaDcFsKhm.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

### content-box（标准盒模型）

* boxWidth = width + border*2 + padding*2
    * width是内容区的宽度，width == contentWidth
### border-box（怪异盒模型）

* boxWidth = width
    * width是盒子的整体宽度
    * contentWidth = width - border*2 - padding*2
>**适用场景**
* 后端响应的数据固定了盒子的大小
* 内容区宽度（contentWidth）不固定，但内边距（padding）固定
* input框，产品经理给定了盒子的大小
## Flex

### **设置在父盒子上的属性**

* flex-flow：flex-direction、flex-wrap
* flex / inline-flex 的区别
    * inline-flex是拥有文字特性的弹性盒子
#### flex-direction

>依据主轴方向对齐，交叉轴与主轴垂直
* from main-start to main-end
* 用flex-direction来改变主轴方向，也就是改变main-start 和 main-end的位置
* 注意由于文本内容超出flex items时，在收缩时需要flex-wrap不会生效
    * row(默认值)

![图片](https://uploader.shimo.im/f/MvGiezfEadmjimRV.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

    * row-reverse

![图片](https://uploader.shimo.im/f/pk7MM9BY9HciUHhw.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

    * column

![图片](https://uploader.shimo.im/f/gIHQTNJHR5Ku0t5q.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

    * column-reverse

![图片](https://uploader.shimo.im/f/UnhyDhek0fdWFpRO.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

#### flex-wrap

* 将wrapper设置为弹性盒子，子元素是item
    * 由于item不是弹性盒子，所以子元素p、div撑开item盒子时，会让item撑开父盒子
    * no-wrap属性失效

![图片](https://uploader.shimo.im/f/4SxwlIDP1F3U04gp.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

* 当一行元素的宽度之和超过了父级元素的宽度，默认(nowrap)是通过收缩来实现放置，

但会改变flex items的宽度，如果不想改变的化，可以使用wrap来实现

    * wrap(换行)

![图片](https://uploader.shimo.im/f/fgrIBONPy1Z7CxZz.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

    * nowrap(默认值，不换行)
        * 如果flex items的宽度和超过了父级元素的宽度，就会收缩flex items的宽度

![图片](https://uploader.shimo.im/f/NeNM4l36eWr7VzFk.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

    * wrap-reverse（向这我立体转了180°）
#### ![图片](https://uploader.shimo.im/f/KH9N4zDO7WYtl6Ni.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

#### justify-content

>**决定主轴的对齐方式（单列、多列均适用）**
* flex-start
    * 主轴开始边界对齐

![图片](https://uploader.shimo.im/f/YPK9Qc7g2SE1Qnhw.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

* flex-end
    * 与主轴结束边界对齐

![图片](https://uploader.shimo.im/f/v7jJdSwz9Ss6ZKkf.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

* center

![图片](https://uploader.shimo.im/f/K89ElxZbqAvz75ta.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

* space-between
    * 两边站住，中间自由分配，每个flex items之间距离相等

![图片](https://uploader.shimo.im/f/qm7Zsh8SkZYKSBQF.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

* space-around
    * 相当于每个加相同margin
        * 每个flex items之间距离相等，但距离main start、main end的距离是一半

![图片](https://uploader.shimo.im/f/X61s9HFEFeLh5lUP.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

* space-evenly
    * 每个flex items之间的距离和距离main start、main end相等

![图片](https://uploader.shimo.im/f/8qXkds5GBEywdhyD.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

#### align-items

>**决定交叉轴的对齐方式，只适用于单行元素**
* flex-direction：row
    * flex-start、flex-end

![图片](https://uploader.shimo.im/f/zC2zZiZ9sHwQ2cAL.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)![图片](https://uploader.shimo.im/f/WvDc9G9GhHIVZ4mO.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

    * center

![图片](https://uploader.shimo.im/f/Em6GPtT8d3UWKoWy.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

    * baseline
        * 第一行文本的基线(文字底部)对齐

![图片](https://uploader.shimo.im/f/EVU8YujqcOPlRwNR.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)![图片](https://uploader.shimo.im/f/gmQwyabopFq2qi0Z.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

    * stretch（默认值）
        * 垂直主轴的方向宽或高是否设置
            * 设置了，不拉伸
            * 没设置，则拉伸

![图片](https://uploader.shimo.im/f/C3e6tPo2jw8uMhL9.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

![图片](https://uploader.shimo.im/f/Vy8JrGb1YlaA8v4u.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

#### align-content

>**功能和align-items一样，但只适用于多行元素**
* stretch(默认值)
* flex-start、flex-end、center、space-around、space-between、space-evenly

![图片](https://uploader.shimo.im/f/RyRc8wF8ZVUVoD0J.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

![图片](https://uploader.shimo.im/f/Y9wEaS7ZIPhn1tCr.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

### 设置在子盒上的属性

#### flex-grow（0）

>当主轴空间还有剩余时，让设置此属性的子盒**按flex-grow的比例分配**剩余的空间
* flex-grow  ->  1：2：3，剩余300px
    * 分别分到50px、100px、150px

![图片](https://uploader.shimo.im/f/3uAT9RxlYAV2MWAr.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

#### flex-shrink（1）

>将超出父容器的部分各子容器的内容区按下列公式缩减
* 父容器的contentWidth：600px
* 子容器的contentWidth：200px    200px    400px
* flex-shrink：1   1   3
    * 200px - 25px  = 175px        200px - 25px = 175px         400px - 150px = 250px

![图片](https://uploader.shimo.im/f/25jrMpMAxVM3Y56K.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

![图片](https://uploader.shimo.im/f/7OkvccSBdq9MMg7F.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

* 父容器的contentWidth：600px
* 子容器的contentWidth：40px    40px    240px
* flex-shrink：1   1   3
    * 此公式是对各子容器的contentWidth进行缩减
    * 40px - 10px  = 30px        40px - 10px = 175px         240px - 60px = 180px

![图片](https://uploader.shimo.im/f/78UIrEUc2hiiBz6G.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

```xml
<div class="box">
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
</div>
```
```css
.box {
  display: flex;
  width: 600px;
  height: 600px;
  border: 2px solid red;
}
.item {
  width: 200px;
  height: 200px;
  box-sizing: border-box;
  padding: 0 80px;
  flex-shrink: 1;
  background-color: #f0f;
}
.item:nth-of-type(2) {
  background-color: #ff0;
}
.item:nth-of-type(3) {
  width: 400px;
  flex-shrink: 3;
  background-color: #0ff;
}
```
#### flex-basis（auto）

>参考博文：[https://juejin.cn/post/6844903914148462599](https://juejin.cn/post/6844903914148462599)
>- content -> width -> flex-basis（受到 max|min-width 的制约）
>- width -> flex-basis表示flex-basis的回退方案，没设置flex-basis，设置了width，flex-basis就会回退到width
>- content -> width表示了width的回退方案，没设置width，width就回退到  content（由内容撑开的宽度）
* flex-basis是我们flex-items的一个假想尺寸，当它放入弹性盒子时，受到max|min-width以及flex-grow和flex-shrink的制约，将其调整到实际的尺寸
* 当`flex-direction：column | column-reverse`时，就是`flex-basis`和`height`的关系了
#### flex

>它们是**在主轴方向**上进行的伸缩以及定义基准值
* flex：1 1 atuo

flex-grow：1

flex-shrink：1

flex-basis：auto

#### order**（**0**）**

>数值小的排在前面，可以负数
#### align-self**（**auto**）**

>设置**自己的**交叉轴排列方式
>auto | flex-start | flex-end | center | baseline | stretch
* 在交叉轴上排列，自己的排列优先级高（单行时align-self > align-items）
* 多行时align-content > align-self
### 注意

>- 无论什么情况，被不换行内容撑开的容器，不会被压缩计算

![图片](https://uploader.shimo.im/f/xgH1aclgwtKTkChl.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

### ![图片](https://uploader.shimo.im/f/5pezdujPbd6zB7Tw.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

### Example

#### 单行元素在文档居中

* 交叉轴居中 + 主轴居中
>align-items: center
>justify-content: center
>flex-wrap: no-wrap // 确保不会成为多行文本

![图片](https://uploader.shimo.im/f/LXAF3ncFCL3GMzmN.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

#### 多行元素在文档居中

>align-content: center
>justify-content: center
>flex-wrap: wrap // 确保不会将多行文本变成单行文本
* align-content：center

![图片](https://uploader.shimo.im/f/gOKTetUsLL9ISIxv.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

* align-content：center

justify-content：center

![图片](https://uploader.shimo.im/f/91lcIZqTtdVetqUF.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

#### 流式布局

>利用align-content：stretch 或 alin-items：stretch，通过不设定高度完成布局

![图片](https://uploader.shimo.im/f/N8K4UpJPcxtpJk9d.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)![图片](https://uploader.shimo.im/f/XwymjPNUnWAZkPfe.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

#### 圣杯布局

* header、footer固定占的高度20%，中间高度自适应
    * left、right固定宽占20%，center宽自适应

![图片](https://uploader.shimo.im/f/Mif4mA057u55UgWZ.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

## Grid

* 参考文章：[https://www.html.cn/archives/8510/](https://www.html.cn/archives/8510/)
* 案例练习：[https://www.html.cn/archives/8512](https://www.html.cn/archives/8512)
```css
display: grid;
display: inline-grid;
```
### 定义

* Grid Container：grid item的直接父级元素
* Grid Item：Grid Contaniner的直接子元素'
* Grid Line：Grid Item的分割线
    * column grid line
    * row grid line
* Grid Track：两条相邻网格线之间的空间（网格轨道）
* Grid Cell：两条相邻的行和两条相邻的列Grid Line之间的空间（网格单元）
* Grid Area：可以由任意数量的Grid Cell组成（网格区域），但是需要是连续的Grid Cell
```xml
<div class="container">
  <div class="item-a"></div>
  <div class="item-b">
    <p class="sub-item"></p>
  </div>
  <div class="item-c"></div>
  <div class="item-d"></div>
</div>
```
### Container

#### Grid Line

>grid-template-columns
>grid-template-rows
* fr单元用于等分剩余Grid Container空间，按照比例划分
* repeate（网格线重复的数量，长度 网格线的名字）
    * 也就是有多少行 或 列
    * 长度的单位：fr、px、%、vm...
```css
.container {
  grid-template-rows: repeat(3,1fr [row line]);
  grid-template-columns: [col line] 1fr [line] 20px [line1] 10%;
}
```
#### Grid Track

>grid-template-rows：两行网格线间的距离 [名字1   名字2...]
>grid-template-columns：两列网格线间的距离 [名字1 名字2...]
* auto时需要justify: stretch或者内容将其撑开，不然不占空间
#### Grid Area

>grid-template-areas
* 任意数量的**.**| none | 网格区域名字
    * 任意数量的**.**代表空的网格单元格，none是不定义网格区域
```css
.container {
  display: grid;
  grid-template-areas: none;
  grid-template-columns: [row1-start]50px [row1-end row2-start]50px [row2-end row3-start]50px [row3-end]50px;
  grid-template-rows: 50px 50px auto 50px;
  grid-template-areas: 
    "header header header header"
    "main main .. siderbar"
    "footer footer footer footer"; 
}
```
* grid-template：汇总grid-template-areas、grid-template-columns、grid-template-rows
```css
.container {
  grid-template:
    [row1-start] "header header header header" 50px [row1-end]
    [row2-start] "main none . siderbar" 50px [row2-end]
    [row3-start] "footer footer footer footer" 50px [row3-end]
    / 50px 50px auto 50px;
}
```
* 由Grid Container定义好网格线、网格区域后，再对Grid Item分配相应的网格区域
```css
.item-a {
  background-color: red;
  grid-area: header;
}
.item-b {
  background-color: salmon;
  grid-area: main;
}
.item-c {
  background-color: tan;
  grid-area: siderbar;
}
.item-d {
  background-color: violet;
  grid-area: footer;
}
```
#### column-gap / row-gap

>指定网格线间的距离，就是线与线间的缝隙
* 现在已经支持无**grid-**前缀了，gap是两者缩写：column-gap row-gap
    * column-gap：15px
    * row-gap：10px

![图片](https://uploader.shimo.im/f/jQ4spliI53icqCyr.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

```css
.container {
  gap: 15px 10px;
  
  gap: 10px 10px;
  gap: 10px;
}
```
#### justify-items

* 沿着行轴线对齐网格单元
    * 它是每个网格单元相对于它的网格线的对齐方式
    * `start    end    center    stretch（默认）`
    * 左对齐   右对齐   水平居中   填满（网格单元没有设宽或高时）
```css
.container {
  display: grid;
  justify-items: start | end | center | strecth;
}   
```
![图片](https://uploader.shimo.im/f/fWLAajPryN9hL7jQ.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

#### align-items

* 沿着列轴线对齐网格项，相对列网格线的对齐方式
    * 每个网格单元的对齐方式
    * `start    end    center    stretch（默认）`
    * 左对齐   右对齐   水平居中   填满（网格单元没有设宽或高时）

![图片](https://uploader.shimo.im/f/nocTUpkMhM2G1Zc4.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

>place-items：align-items justify-items
#### justify-content

* 沿着行轴线使得每列网格单元（整体）相对网格容器的对齐方式
    * `start    end    center    stretch（默认）`
    * 左对齐   右对齐   水平居中   填满（网格单元没有设宽或高时）
    * `space-around       space-between       space-evenly`
    * 两边靠，中间均匀

![图片](https://uploader.shimo.im/f/OXatNThAVxgWtq4I.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

#### align-content

* 沿着列轴线使得每行网格单元（整体）相对网格容器的对齐方式
    * 取值一样，效果变成列
>place-content：align-content justify-content
#### grid-auto-columns / grid-auto-rows

* 指定隐式轨道被创建时的大小
    * 原本只有两行两列，但是给一个grid-item用grid-column、grid-row指明此网格单元的起始于结束的地方

![图片](https://uploader.shimo.im/f/yhw7jxQ7PIJU6DIw.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

>grid-auto-columns：60px
>grid-auto-rows：60px

![图片](https://uploader.shimo.im/f/UwlkEfGWCqdN8IXc.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

#### grid-auto-flow

* 相当于flex布局中的主轴方向，默认主轴是row
    * `row（默认）     column      dense算法（基本不用）`
#### grid

* grid-areas  grid-column  grid-row  grid-auto-flow grid-auto-column grid-auto-row
```css
.container {
  grid:
  [row1-start] "header header header header" 50px [row1-end]
  [row2-start] "main main . siderbar" 50px [row2-end]
  [row3-start] "footer footer footer siderbar" 50px [row3-end]
  / 50px 50px 50px 50px auto-flow; 
}
```
## ![图片](https://uploader.shimo.im/f/7NaXdVpTUUiUZIzW.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

### Grid Items

#### grid-(column | row)-(start | end)

* 指定一个网格项的初始位置和结束位置
* grid-(column | row)-start
    * 从第几条网格线开始
* grid-(column | row)-end
    * 从第几条网格线开始  |  span 跨越网格线的数量  |  span 网格线名字
    * container设置为4行4列
```css
.item-a {
  width: 25px;
  height: 25px;
  background-color: red;
  grid-column-start: 3;
  grid-column-end: span 1;
  grid-row-start: 3;
  grid-row-end: span col4;
}
```
![图片](https://uploader.shimo.im/f/cDc3s0cnjvEwMXLk.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

#### grid-column / grid-row

* grid-column：grid-column-start + grid-colummn-end的简写
* grid-row：grid-row-start + grid-row-end的简写
```css
.item-a {
  grid-column: 3 / span 2;
  grid-row: 3 / span col4;
  
  grid-row: 1;
  grid-row: 1 / 2;
}
```
#### grid-area

* 引用Grid Container 创建的Grid Area，或者 用于`grid-row-start`+`grid-column-start`+`grid-row-end`+`grid-column-end`的简写。
>grid-area：
>网格区域名称  |  grid-row-start / grid-column-start / grid-row-end / grid-column-end
```css
.item-a {
  grid-area: header;
  grid-area: 1 / col4 / row-end / col-end
}
```
#### justify-self

* 沿着行轴线对齐网格项
    * 对于指定的单个网格单元，其余功能与justify-items一样
    * 同时设置justify-items和justify-self，justify-self优先
#### align-self

* 沿列轴线对齐网格项
    * 对于指定的单个网格单元，其余功能与align-items一样
    * 同时设置align-items和align-self，align-items优先
>place-self：align-self justify-self
>第二个值省略，第一个值分配给它
### Animation

* 支持`(grid-)gap`**，**`(grid-)row-gap`**，**`(grid-)column-gap``，``grid-template-areas`****的动画
## column

>设置在父元素上的
* column-count：n （划分为n列）

column-gap：npx（每列缝隙为npx）

column-rule：1px solid black（每列的分割线）

column-width：npx（每列的宽度）

>设置在子元素上的
* column-span：all（横跨所有列）
* break-inside：avoid
    * 避免元素到达底部，超出的部分再新的列展示
>**多用于处理小说的分页**
## @media

>参考：[https://www.runoob.com/cssref/css3-pr-mediaquery.html](https://www.runoob.com/cssref/css3-pr-mediaquery.html)
>参考博文：[https://blog.csdn.net/gtlishujie/article/details/81975157](https://blog.csdn.net/gtlishujie/article/details/81975157)
### CSS2-@media

><link rel="stylesheet" media="screen and (max-width:960px)" href="style.css">
* 当监听到屏幕长度小于960px时，客户端会向服务端请求此css文件，但这样会增加请求的次数，加大客户端的负担
### CSS3-@media

```css
@import url(./example.css) screen and (width:800px);
@import url("./example.css") screen and (width:800px);
@import "./example.css" screen and (width:800px);
@media screen and (max-device-width:960px) {
  body {
    background:red;
  }
}
```
* 当屏幕宽度小于960px时，执行下面的css代码，相对于CSS2的媒体查询，它不用再向服务端发送请求，获取相应的css文件，此处我猜测，是由浏览器负责监听屏幕宽度小于960px时，就会渲染这部分的css代码
* screen
    * 告知设备在打印页面时使用衬线字体，在屏幕上显示时用无衬线字体
* width：浏览器的可视宽度
* height：浏览器的可视高度
* device-width：设备屏幕的宽度
* ......
## 响应式布局

* CSS3的@media结合grid或flex布局就可以巧妙的实现响应式布局
## BFC / GFC / FFC

>margin：auto
* GFC / FFC下，子容器设置此属性会自动用margin填充水平方向和垂直方向的空闲空间
* 而BFC下，此属性只对设置该属性容器的水平方向生效
## Animation（动画）

### transition

>- 监听属性的变化，延迟设定的秒数后，按预先设定好的运动函数，在指定时间内变化完成
>- transition：all  .5s  ease-in  .1s
* transition-property（默认all）
    * 指定监听的属性
* transition-duration
    * 过渡动画的时间
* transition-timing-function（默认linear）
    * 运动的状态函数，linear
* transition-delay（默认0s）
    * 延迟几秒进行过渡
>**cubic-bezier - transition-timing-function**

![图片](https://uploader.shimo.im/f/eeyJ9A4Vf5ONIPWj.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

![图片](https://uploader.shimo.im/f/jUvxR8wITPP8b0Cs.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

![图片](https://uploader.shimo.im/f/6Er0kYLoTvsefbQ3.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

### animation

>**常用参数**：animation-name     animation-duration     animation-timing-function   animation-delay ...，....
* 自定义一个或多个动画
#### animation-name（@keyframes）

* 从一个状态转向另一个状态（共两个状态），用from to
    * 这个动画过程就占用了animation-duration
```xml
<div class="box"></div>
```
* 多个状态，可以使用 %来瓜分animation-duration的时间
```css
@keyframes rushB {
  20% {
    left: 0;
    top: 0;
  }
  60% {
    left: 0;
    top: 200px;
  }
}
.box {
  background-color: salmon;
  width: 100px;
  height: 100px;
  position: absolute;
  left: 50px;
  top: 100px;
  animation: rushB 4s linear .2s;
}
```
#### animation-duration（0s）

#### animation-timing-function（linear）

>**cubic-bezier**：每一段都按此运动函数去变化速率
* **steps：**[https://laixiazheteng.com/article/page/id/0gU2Wefas7hn](https://laixiazheteng.com/article/page/id/0gU2Wefas7hn)

[https://www.cnblogs.com/chenlf/p/10032568.html](https://www.cnblogs.com/chenlf/p/10032568.html)

>- n决定两个关键帧的变化步数，作用于每两个关键帧之间
>- start / end表示在 0% / 100%的阶跃点，直接由一种状态A跳跃为下一种状态B，那样
>的话状态A就不会显示出来，因为来到就立即突变为另一种状态
```xml
<div class="step4"></div>
```
```css
 div {
  width: 100px;
  height: 100px;
  margin-bottom: 50px;
}
 @keyframes move {
  0% {
    background: purple;
  }
  50% {
    background: blue;
  }
  100% {
    background: red;
  }
}
.step4 {
 animation: move 3s steps(1,end) 0s infinite; 
}
```
* 下图当 n = 1时，因为设置了end，因此动画完成度在100%时会直接进行突变，所以它不占据时间，那么一次动画的时间就被0%和50%瓜分，分别占据1.5s
    * 又因为第一个参数为1，也就说0%的元素样式 经过一步变化 成为了 50%的元素样式，所以会呈现出突变的效果
        * 0 ~ 1.5s：purple         1.5s ~ 3.0s：blue        red经过0s直接突变为purple
        * 3.0s ~ 4.5s：purple     4.5s ~ 6.0s：blue        此时动画结束，不需要突变了（也没时间给它突变，其实可以忽视它）
    * 而当我们将第一个参数n > 1时，表示从0%的元素样式会经过 n步变化 成为 50%的元素样式，因此我们能看到颜色会呈现一个逐渐变化的过程
        * 而我猜测此处每步变化所占据的时间 应该是 1.5 / n，而且怀疑它是通过线性渐变过去的（linear gradient）

![图片](https://uploader.shimo.im/f/7RTwZH1SOJm9x5ET.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

* n = 1，start

![图片](https://uploader.shimo.im/f/cm7JWJycB21L5SfZ.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

#### animation-delay（0s）

>动画等待时间
#### animation-iteration-count（1）

>动画循环的次数：0% ~ 100%算一次
>**- infinite：**无限循环
#### animation-direction（normal）

>设置动画运动的方向
* reverse（from 100% to 0%）
* alternate（from 0% to 100%，再from 100% to 0%）
* alternate-reverse
    * 同上理
#### animation-fill-mode（none）

* **强烈推荐此文章**：[https://www.cnblogs.com/lyzg/archive/2016/08/08/5738860.html](https://www.cnblogs.com/lyzg/archive/2016/08/08/5738860.html)

![图片](https://uploader.shimo.im/f/x5NOZIBjJGhFdarj.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

* 动画是独立，各自都有各自的时间轴，互不影响
* animation-fill-mode只认动画定义里的0%和100%，而非动画定义里的第一帧和最后一帧
* 当动画定义里面没有0%和100%的时候，并不是意味着动画就没有起始帧跟结束帧了，任何一个动画一定具有起始帧和结束帧
    * 默认情况下起始帧跟结束帧所对应的样式就是元素未添加动画前的样式，我们可以通过0%或100%，来覆盖默认的起始帧和结束帧的定义
    * backwards：动画等待期间，元素样式为第一帧所对应样式
    * forwards：动画结束期间，元素样式为最后一种所对应的样式
## transform-origin

>transform-origin:  x2  y2  z2
>- 默认值：以元素自身的中心位置为变换原点
* 将当前变换原点(x1，y1，z1) 变为 (x1 + x2，y1 + y2，z1 + z2)
    * %  px  em
    * 水平方向取值，相对元素的宽，left  center  bottom
    * 垂直方向取值，相对元素的高，top  center  bottom
        * 元素左上角为 0%  0%，右下角为 100%  100%
## transform

>none | rotate | skew | scale | translate | matrix
### 2D变换

#### translate()

>translate(a,b)
>- translateX(a)
>- translateY(b)
>- 以变换原点为基准，沿x轴方向平移a，沿y方向平移b
#### rotate()

* 绕变换原点旋转
    * 注意仅有一个参数
>- 参数：ndeg，n > 0 顺时针，n < 0 逆时针
#### scale()

* scalex() + scaley() = scale(x,y)
>- 对元素的坐标轴刻度进行缩放
>- 默认 1 1（水平方向   垂直方向）

![图片](https://uploader.shimo.im/f/1xaqxpmoeMMOK8mf.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

* scale(1,1)   scale(2,1)
    * 同一设置了100px * 100px的逻辑像素，转换为物理像素，然后显示到我们的电脑屏幕上，后者的宽比前者大一倍
    * 首先我们假设原来x 坐标轴1刻度可以表示1px（逻辑像素），现在经过scale(2,1)使得坐标轴刻度增大，也就是现在 1刻度可以表示2px（逻辑像素），而scale(2,1)的发挥作用后，该元素从原来 100px * 100px 变换成 200px * 100px，然后再将其转为物理像素，显示在屏幕上

![图片](https://uploader.shimo.im/f/GtbHNTvjiXz8OTBj.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)![图片](https://uploader.shimo.im/f/ALyAL2OSSrBD8veK.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

* 后一个scale以前一个为基础，再对坐标轴刻度缩放
* 所有缩放过的方向都会保留效果（雁过留声）
>transform: scale(2,1) rotate(-45deg) scale(2,1)
    * 原来的缩放的有效，-45deg旋转后会改变变换原点，这时的缩放也有效
#### skew

>- 参考博文：[https://www.cnblogs.com/mm2015/p/4812763.html](https://www.cnblogs.com/mm2015/p/4812763.html)
>- skew(n,m)
>- x轴倾斜ndeg，y轴倾斜mdeg
* 它的坐标轴比较特殊，垂直方向为x轴，水平方向为y轴

![图片](https://uploader.shimo.im/f/oBWuA4NHCjIiqZ6O.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

![图片](https://uploader.shimo.im/f/JWKBFhnWaeANrTpc.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

* 倾斜y，保持宽度

![图片](https://uploader.shimo.im/f/jPW552cem5cdE1At.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

* 倾斜x，保持高度

![图片](https://uploader.shimo.im/f/Qi7hgccZcuq2l4GA.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

#### matrix

* 参考文章：[https://www.zhangxinxu.com/wordpress/2012/06/css3-transform-matrix-%E7%9F%A9%E9%98%B5/](https://www.zhangxinxu.com/wordpress/2012/06/css3-transform-matrix-%E7%9F%A9%E9%98%B5/)
* matrix分解演示：[https://www.zhangxinxu.com/study/201206/css3-transform-matrix-30-30-step.html](https://www.zhangxinxu.com/study/201206/css3-transform-matrix-30-30-step.html)
>- transform: matrix(a,b,c,d,e,f)
>- 最后一行固定（0，0，1）
>- x, y表示转换元素的所有坐标
* 变换矩阵 * 坐标矩阵 = 新坐标矩阵

![图片](https://uploader.shimo.im/f/axoRadhR8EqvPiyB.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

* `transform: matrix(1, 0, 0, 1, 30, 30); === transform: translate(30px, 30px);`
### 3D变换

#### translate3d()

>- translate3d(a,b,c)
>- translateX(a)
>- translateY(b)
>- translateZ(c)
>- 需要设置perspective才会起作用
#### rotateX() / rotateY() / rotateZ()

>旋转后，变换原点会一起变化（x，y轴也发生变化）
>- 参数：ndeg
* 绕当前坐标轴旋转，n > 0时的旋转方向如下
#### ![图片](https://uploader.shimo.im/f/NOho7lDKYY8uYj8I.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

#### rotate3d

>transform:  rotate3d(x,y,z,angle)
>- 以矢量（x,y,z）为旋转轴，旋转angle
>- angle > 0，顺时针，反之

![图片](https://uploader.shimo.im/f/Lpn4IXFUeYGibgpS.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

#### scale3d

```plain
scale() + scalez
- scale3d(x,y,z)
  - scalez() 
```
#### matrix3d()

![图片](https://uploader.shimo.im/f/pIc9JDG86LGij9AV.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

>默认值

![图片](https://uploader.shimo.im/f/gdxLiwESBm1nIpMT.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

### perspective

>**Use - 用上透视，更有立体感**
* 舞台元素上的，perspective：npx
    * 给整个舞台设置了一个眼睛，一般舞台元素有很多子元素
* 当前动画元素上的，transform：perspective(npx)
    * 给该元素设置了眼睛，一般是父容器的包含很多子容器，然后给子容器设置
>**透视原理**
* Screen可以当作浏览器或屏幕，我们看到的是Screen的像
    * tanslateZ()，可以改变当前元素与Screen的距离
    * perspective：表示眼睛距离屏幕的距离
* 一开始我们没设置perspective，即none时，正常效果显示
* 而当我们设置了perspective时，屏幕上的成像是由我们的眼睛发射射线，经过白圈而投影到Screen上的像就是我们所看到的实际效果
    * translateZ：0，有perspective时，白圈和黑圈重合，正常效果

![图片](https://uploader.shimo.im/f/eaDL3kDDEtlyT6Vt.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

    * translateZ > 0,且有perspective时，眼睛看向黑圈，发射的光线，经过黑圈后，成像在Screen的白圈就是我们看到的实际效果

![图片](https://uploader.shimo.im/f/ngrX1VRavDzKA7NE.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

    * 当有translateZ < 0, 且有perspective时，眼睛看向黑圈，发射的射线，经过Screen形成的白圈就是我们实际看到的效果

![图片](https://uploader.shimo.im/f/H4MVKmN4gmV2e66m.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

### perspective-origin

* 变换眼睛的位置，默认center、center
    * n% ，水平方向的width * n%，垂直方向的height * n%
#### ![图片](https://uploader.shimo.im/f/6xPBWjdpjGhZMDEd.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

### preserve-3d

>transform-style: preserve-3d
* 一般而言，该声明应用在3D变换的兄弟元素们的父元素上，也就是舞台元素
    * 默认为flat，也就是2D渲染层，指明3D渲染层后，该元素有立体效果
### 木马旋转

* 原博文案例复现地址：[https://www.zhangxinxu.com/wordpress/2012/09/css3-3d-transform-perspective-animate-transition/](https://www.zhangxinxu.com/wordpress/2012/09/css3-3d-transform-perspective-animate-transition/)
* 原博文地址：[https://www.zhangxinxu.com/wordpress/2012/09/css3-3d-transform-perspective-animate-transition/](https://www.zhangxinxu.com/wordpress/2012/09/css3-3d-transform-perspective-animate-transition/)
* html结构：舞台包含很多子元素
* 舞台css，首先加上perspective，使得translateZ可以生效，然后加上transform-style：presever-3d使得舞台变为3d渲染层
* 子元素css：9张照片平分360deg，然后每张宽度是128px，计算出translateZ应该是多少

![图片](https://uploader.shimo.im/f/bHLQaHdU8rlDoHHa.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

* 正视图看translateZ的效果不明显

![图片](https://uploader.shimo.im/f/uNnLy6Amp61tTSnz.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

* 但设置眼睛为50% 100%，用仰视的视角解释translateZ，其实图片是沿着图中所画的Z轴平移我们所设置的像素
#### ![图片](https://uploader.shimo.im/f/WzPQ3rcWWzFxgzyL.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

* 完整代码
```xml
<div class="stage">
    <img src="../img/mm1.jpg" class="piece" >
    <img src="../img/mm2.jpg" class="piece" >
    <img src="../img/mm3.jpg" class="piece" >
    <img src="../img/mm4.jpg" class="piece" >
    <img src="../img/mm5.jpg" class="piece" >
    <img src="../img/mm6.jpg" class="piece" >
    <img src="../img/mm7.jpg" class="piece">
    <img src="../img/mm8.jpg" class="piece">
    <img src="../img/mm9.jpg" class="piece">
</div>
```
```css
.stage {
      padding: 50% 50%;
      width: 128px;
      height: 96px;
      margin: 0 auto;
      background-color: #f0f0f0;
      perspective: 800px;
      perspective-origin: 50% 100%;
      transform-style: preserve-3d;
      position: relative;
      top: 0;
    }
    .piece {
      position: absolute;
      width: 128px;
      box-shadow: 0 1px 3px rgba(0,0,0,.5);
    }
.piece:nth-child(1) { 
  transform: rotateY(   0deg ) translateZ(195.839px);
}
.piece:nth-child(2) { 
  transform: rotateY(  40deg ) translateZ(195.839px); 
}
.piece:nth-child(3) { 
  transform: rotateY(  80deg ) translateZ(195.839px); 
}
.piece:nth-child(4) { 
  transform: rotateY( 120deg ) translateZ(195.839px); 
}
.piece:nth-child(5) { 
  transform: rotateY( 160deg ) translateZ(195.839px); 
}
.piece:nth-child(6) { 
  transform: rotateY( 200deg ) translateZ(195.839px); 
}
.piece:nth-child(7) { 
  transform: rotateY( 240deg ) translateZ(195.839px); 
}
.piece:nth-child(8) { 
  transform: rotateY( 280deg ) translateZ(195.839px); 
}
.piece:nth-child(9) { 
  transform: rotateY( 320deg ) translateZ(195.839px); 
}
```
## 文本溢出

```css
.box {
  height: 100px;
  width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis
}
```
### white-space

>nowrap - 越界不换行（常用）
### word-break

>break-word - 尽可能保存单词完整性越界换行
### text-align-last

>针对文本的最后一行
>- left  center  right
>- justify
>- start end
### text-overflow

>clip - 溢出部分裁剪
>ellipsis - 溢出部分...
## overflow

>**参数：overflow-x   overflow-y**
>visible（默认）
>hidden
>scroll
>auto（按需显示滚动条）
* overflow-x或overflow-y设置非visible的值，另一个的值为auto
## resize

* 自行拖拽改变dom元素的大小（但很少用，会reflow）
* 所有 <'[overflow](http://css.cuishifeng.cn/overflow.html)'> 设置为`非visible`的元素

![图片](https://uploader.shimo.im/f/8ez7u8wqp4HBjhCA.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

## cpu | gpu

>Central   Processing  Unit         Graphics   Processing  Unit
>参考文章：[https://www.cnblogs.com/biglucky/p/4223565.html](https://www.cnblogs.com/biglucky/p/4223565.html)
* CPU大部分空间分配给Cache有复杂的逻辑单元和控制单元，而GPU只有非常简单的控制逻辑，并省去cache，但它有数量众多的计算单元，这能帮助它做很多简单的操作
    * GPU将一个任务分成多个简单的小任务，适用于那些不是很复杂，重复工作多的任务，每个小任务之间是独立的
        * 如：图像处理，画一幅图，可以分解成画很多的像素点这样的简单，耦合度高的任务
### will-change

>给指定属性单一分配一个层，用gpu加速来渲染

![图片](https://uploader.shimo.im/f/kUOlayB6U2F1vAti.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

## 浏览器渲染原理

>推荐文章：[https://juejin.cn/post/6844904119157669902](https://juejin.cn/post/6844904119157669902)
>[ https://segmentfault.com/a/1190000002629708](https://segmentfault.com/a/1190000002629708)
>> Create DOMTree  and  Create CSSOMTree
>- HTML文件，JS文件中的DOMAPI
>- CSS文件，JS文件中的CSSAPI
>> DOMTree + CSSOM Tree   ->  Create RenderTree
>- 构建渲染树
>> 根据RenderTree来计算每个节点的布局（位置）
>- 布局渲染树（reflow）
>> Paint（repaint）
>- 绘制渲染树（repaint）

![图片](https://uploader.shimo.im/f/aTE5kfT0IhgOaNlD.png!thumbnail?fileGuid=9QTKdXDv8RQKrcRP)

### reflow

>需要重新构建DOM树
* 对DOM操作导致DOM尺寸等属性发生变化，Browser需要重新计算该元素的属性，然后将其重新绘制出来
### repaint

>重新描绘某个区域
* 不影响页面的布局，不需要重新计算元素的位置、尺寸，直接为该元素绘制新的样式
## screen&px（1px问题）

>参考博文：[https://juejin.cn/post/6901565362693734407](https://juejin.cn/post/6901565362693734407)
>强烈推荐DPI和PPI：[https://segmentfault.com/a/1190000016818984](https://segmentfault.com/a/1190000016818984)
>[https://www.zcool.com.cn/article/ZMzc4NTg0.html](https://www.zcool.com.cn/article/ZMzc4NTg0.html)
* pt是物理单位，**1inch = 72pt = 25.4mm**，px是屏幕的基本单位
* **px = inch * dpi**
    * px是相对单位，且是逻辑像素（DIP）
    * 物理像素（DP）是组成显示屏的基本单位，出厂时固定
        * iPhone(6~7)的宽为2.3 inch，高为4.1 inch，屏幕的尺寸为4.7 inch（对角线），同时它的屏幕每行有750个px，每竖有1334个px
    * 设备像素比（DPR） = 物理像素（DP） /  逻辑像素（DIP）
* 其实DPI和PPI的意思是一样的，只不过适用场景不同，性能评价的场景也不同
    * DPI（打印分辨率）
        * 最早用来描述打印机的性能，一台打印机最多能用多少墨点来打印一寸的内容
    * PPI（图像分辨率）
        * 屏幕每英寸有多少个物理像素（屏幕的像素密度），1inch=2.54cm
            * 屏幕分辨率：1920 * 1080，设备尺寸：5.5inch（屏幕对角线距离）
>斜边像素大小^2 = 1920^2 + 1080^2;
>PPI = 斜边像素大小 / 5.5inch
>**解决方案：**[https://segmentfault.com/a/1190000037790305](https://segmentfault.com/a/1190000037790305)
>[https://segmentfault.com/a/1190000016445815?utm_source=sf-related](https://segmentfault.com/a/1190000016445815?utm_source=sf-related)
>[https://zhuanlan.zhihu.com/p/113391811](https://zhuanlan.zhihu.com/p/113391811)
>**最干的干货：**[https://www.cnblogs.com/zaoa/p/8630393.html](https://www.cnblogs.com/zaoa/p/8630393.html)
* 手提，台式用ppi来衡量，但手机端适配的dpi不太懂
