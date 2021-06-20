---
* World Wid Web 是 internet的一部分，
  如：[ 电子邮件 、磁力链接种子 、Magnet 、FTP文件下载 、即使通信服务，它们都需要各自的协议来访问 ]
  而万维网是通过HTTP来访问超文本资源的
---

# 网络分层模型

## what

- 对于网络分层模型常说的有  `TCP/IP四层网络分层模型`  和  `OSI七层网络分层模型`，后者是国际标准组织为了让大家有一个能统一的参考模型去设计，在  `TCP/IP四层网络分层模型`  的基础上完善的模型
  - OSI的每层可以用Layer 1等简称，也可以叫做1层，2层，...，七层
  - 由下图可以很明显看出，七层细分了应用层，以及添加上了物理层，但实际上OSI网络分层模型四层以上的层级分的太细了，在实际的应用中会话管理，编码转换，压缩等是紧密联系的，难以将其分开

<img src="C:\Users\ASUS\Desktop\notes\http协议\images\七层和四层对比.png" alt="七层和四层对比" style="zoom:80%;" />

## 思考

- 【四层负载均衡】针对OSI模型的，工作在传输层上，基于TCP/IP的特性实现负载均衡

- 【七层负载均衡】同理，工作在应用层，通过解析HTTP请求报文的URI 、Host等数据 + 适当的策略来转发给后台服务器

- 如何理解【二层转发】和【三层路由】？

  - 二层转发是通过arp协议来确定目的MAC地址的

  - 而三层路由是通过路由表来确定是否处于同一网段，若是则进行【二层转发】，否则转发到下一个ip地址





<hr>

# HTTP

## 前世今生

- 最初作者本着分享信息的初衷，创建了HTTP，也就是后来的HTTP/0.9，它仅允许通过  `GET`  请求向服务器获取  `HTML文档`  
- 随着用户日益增长的需求，逐渐演变为HTTP/1.0，HTTP/1.1，HTTP/2，HTTP/3以及HTTP over TLS/SSL

## what is HTTP

- HTTP全称HyperText Transfer Protocol，即超文本传输协议

  - 对此，需要弄清楚何为超文本，何为协议

    - 首先超文本包括但不限于【文字 | 音视频 | 链接】等，而熟知的HTML就是一种超文本标记语言，它通过超链接连接不同的超文本 
    - 其次是协议二字，它是指多人共同协商形成的约定或规范

  - 那么所谓的超文本传输协议其实就是指在【两点】间传输【文字 | 音视频 | 链接】等超文本的约定或规范

    > 其中两点，最为熟悉的就是客户端和服务端

## HTTP报文格式

- HTTP的报文格式如下图，但需要注意的是header和body间是通过空行来划分的，也就是说如果header中的key:value多了一个空行，就会将下面的数据识别为body部分
- 尽量少携带空格，因为会导致发送的HTTP报文变大，浪费服务器资源
  - 头字段  `:`  后的一个空格是约定俗成的习惯

![image-20210528090557176](C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\image-20210528090557176.png)

- 在HTTP/1.1中要求请求报文必须携带 `Host字段`

  > 因为域名和IP的映射关系可以是多对多，也就是有可能出现多个不同的域名经过DNS解析后得到的IP是同一个，那么此时如果不携带Host，就不清楚具体访问的服务器哪一个主机（同端口，不同域名）
  >
  > - 当然也可以通过同域名，不同端口来划分虚拟主机

- 同理，请求报文也必须携带 `User-Agent字段`，告诉服务器代理人是谁（即谁替用户发送的HTTP报文 - 如：Google浏览器等）

### 请求方法

- HTTP允许自定义请求方法，二主要需要清楚的是

  - POST（增）

  - DELETE（删）

  - GET（查）

    > HEAD方法与GET方法一样，但不允许携带body

  - PUT（改）

  - OPTION

    > 发送复杂的请求时，会先发送预检请求，检查服务器是否允许该主机跨域，自定义请求头等

- `安全`：请求不会对服务器的资源造成实质性的修改（GET/HEAD）

- `幂等`：多次执行相同的操作，结果都是相同的（GET/HEAD  PUT  DELETE）

### 状态码

- RFC规定状态码有3位，数字第一位用于分类，但常常状态码的描述不够具体，因此有时需要实体携带相关描述信息返回或自定义状态码及其描述

  - 204 No Content 指的是不携带响应体

  - 206 Partial Content 通过响应头字段`Content-Range`来表示响应体中的`数据范围`

    > Content-Range: bytes 0-99/2000	
    >
    > 表示此次body携带的是总计2000个字节中的前100个字节

  - 301 Moved Permanently 浏览器有缓存，而302 Found无缓存

    > 区别在相同请求时，前者可以用浏览器缓存，后者不可以

  - 304 Not Modified表示请求的资源可以直接从缓存中获取，不需要向服务端请求

  <img src="C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\image-20210528123925639.png" alt="image-20210528123925639" style="zoom:80%;" />

  - 400 Bad Request 表示请求报文格式错误，很笼统

    > 没有详细指明具体原因是数据格式错误，缺少请求头等，还是什么错误

  - 401 Unauthorized

    > 如：调登录接口时，没有携带token

  - 403 Forbidden 服务器不允许访问该资源
  - 404 Not Found 客户端请求的资源没有在服务器上找到

  > 服务端的错误原因会比较笼统，因为它们需要防止敏感信息的泄漏...

  - 501 Not Implemented 表示客户端请求的接口"即将开业，敬请期待"
  - 502 Bad GateWay 服务器作为代理或者网关时，本身没出错，但访问"目的地"发生了错误
  - 503 表示服务器当前很忙，暂时无法提供响应服务

## 内容协商（Accep和Content系列）

- `Accep系列`  描述了  `我可以处理`  的【数据，编码，语言，字符】类型  `有哪些`
- `Content系列`  则描述了  `实体数据`  的【数据，编码，语言，字符】`采用了哪些`  类型

![image-20210529093710742](C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\image-20210529093710742.png)

```markdown
MIME type
	text/html	text/plain	text/css
	image/jpeg	image/png	image/gif
	audio/mpeg	video/mp4
	application/json	application/javascript
    （二进制数据）application/octet-sream
    
Language type
	zh-CH	en-US（美式英语）	en-GB（英式英语）
```

- 注意quality factor默认值为1，当权重相等时，前面的优先级高

## 如何传输大文件

- HTTP传输大文件主要从数据压缩，分块传输或范围请求解决

### 数据压缩

- gzip等压缩算法对  `文本类型` 的文件有较好的效果，但对  `音视频等多媒体数据`  甚至可能会增大

  > br算法是专门为HTML设计的，压缩的效率和性能比gzip还要好

### 分块传输

> 将大文件分成一块块地传输到客户端

- 在【响应报文】用头字段	`Transfer-Encoding: chunked`，分块传输中每一块的实际长度未知，与Content-Length互斥

<img src="C:\Users\ASUS\Desktop\notes\http协议\images\分块传输实体数据格式.png" alt="分块传输实体数据格式" style="zoom:80%;" />

### 范围请求

- 我仅仅想获取一个文件地某个范围的数据，该怎么办呢 ？

  > 看电影，想快进几分钟，这实际上就是想获取这个大文件的某个片段数据，`分块传输显然是不行的`

- bytes=x-y中x和y均表示偏移量

  > bytes=0-9表示获取前10个字节

  - 假设有一个文件有100个字节

    ```markdown
    10-		表示从第10个字节到第100个字节
    -10		表示倒数10个字节
    ```

- Accept-Ranges: bytes 表示支持  `范围请求`，没有此字段或Accept-Ranges：none 表示不支持  `范围请求`

<img src="C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\image-20210529104418322.png" alt="image-20210529104418322" style="zoom:67%;" />

### 范围请求 — 多段数据

- Range头字段中使用多个x-y即可

  > Range: bytes=0-9, 20-29

- 这时候响应报文的  `Content-type: multipart/byteranges;boundary=xxx`

<img src="C:\Users\ASUS\Desktop\notes\http协议\images\范围请求-多段数据实体数据格式.png" alt="范围请求-多段数据实体数据格式" style="zoom:80%;" />

### 思考

- 分块传输数据的时候，如果数据里含有回车换行（\r\n）是否影响分块的处理呢 ？
  - 不会影响，因为有该分块的长度声明

  > 对比HTTP的头字段如果多了一个CRLF，就会导致下部分变为body，这是因为没有头字段长度的声明

- 如果对一个被gzip的文件执行范围请求，如：“Range: bytes=10-19”，那么这个范围请求应用于原文件还是压缩后的文件 ?

  - `Range针对原文件`，如果传输的响应报文使用了压缩算法，浏览器会根据响应报文的头字段Content-encoding来解压缩，分块传输同理

## 连接管理

- 主要讨论三个问题
  - 为何要提出长连接，优劣？
  - 什么是HTTP的队头阻塞？
  - 什么是并发连接，它的作用是什么？

### 长连接的由来

- HTTP之前使用`短连接`，每次请求-应答结束后，便进行TCP四次挥手断开连接，但如果同一时间有多个资源需要请求，这就意味着每获取一个资源都需要通过TCP三次握手`重新建立连接`，不能复用之前建立好的TCP连接，这十分浪费资源，因此在HTTP/1.1提出了`长连接`，在`一段时间内`可以`复用`之前`建立好的TCP连接`

  ```markdown
  HTTP/1.1默认开启
  	Connection: keep-alive; 
  关闭长连接
  	Connection: close;
  ```
  
  <img src="C:\Users\ASUS\Desktop\notes\http协议\images\keep-alive和短连接.png" alt="keep-alive和短连接" style="zoom:80%;" />

### 队头阻塞

- 应用层：HTTP/1采用的是  `请求-应答的模式，需要等应答结束才可以进行下一个请求-应答`，这就意味着如果同一时间有大量的请求，那么它们都需要等待当前的请求-应答结束，才能轮到它（即阻塞一段时间），而这就是  `HTTP的队头阻塞问题`

  <img src="C:\Users\ASUS\Desktop\notes\http协议\images\队头阻塞.png" alt="队头阻塞" style="zoom:80%;" />

- 传输层：采用的是TCP，当在传输的过程中丢包了，需要重传时，直到服务器收到所有数据并验证成功，才发送下一个TCP数据包给服务器，而这期间的等待时间，就是  `TCP的队头阻塞问题`
  - 对此，可以通过  `并发连接`  来缓解HTTP的队头阻塞，即对同一个域名和服务器建立多个  `TCP连接`，一个阻塞了就去另一个那里，而浏览器限制了一个域名可以建立的长连接数量，但仍然可以通过多个域名对应1个IP地址来实现  `并发连接`
  - 而对于TCP的队头阻塞，HTTP/2通过引入流的概念，实现了多路复用（一个请求-应答对应一个流ID，流用完，重新建立TCP连接），但一个请求-应答出现丢包重传时，它并不会影响其它流的传递，因此成功解决该问题



## 重定向机制

### what

- 说起HTTP的重定向机制，相信大家也见过不少301和302的HTTP报文了吧，这类的重定向报文究竟是如何工作的呢 ？

  - 关键点在于响应头中的  `Location字段`  以及相关的  `Refresh`  、`Referer`  、`Referrer-Policy` 等头字段

    > 如：Location：/moonlightop?name=hao（相对URI，拼接host后跳转）
    >
    > ​	    Location：https://www.baidu.com（绝对URI，直接跳转）
    >
    > ​		Location：moonlightop?name=hao（浏览器会自动补全/）

  ```markdown
  告诉浏览器延时5s后，才跳转url
  	Refresh: 5;url=xxx
  表示浏览器跳转的来源
  	Referer 
      Referrer-Policy
  ```

### 应用场景

- 注册多个简单的域名，使其最终重定向到服务端，方便用户访问

  > http://qq.com	=>	http://www.qq.com	=>	https://www.qq.com

- 访问需要登录权限的页面，返回302临时重定向使浏览器跳转到登录页面

### 性能消耗

- 重定向会多一次req/res，滥用会影响服务器的性能
  - 外部重定向指  `服务端返回重定向绝对URI给客户端`
    - 站内跳转，利用已经建立好的HTTP长连接，进行req/res
    - 站外跳转，就需要三次握手建立TCP连接了，然后进行req/res
  - 内部重定向指  `服务端内部`  进行跳转  ===  站内跳转
- 循环跳转，浏览器检测到会显示【该网页无法正常运行】



## Cookie

- 因为HTTP是  `无状态` （无记忆能力） 的，所以服务器不能得知  `发送HTTP报文的是谁`。因此需要有记忆功能的  `外物`  来协助它完成记忆，Cookie就此诞生

### 相关属性

- Max-Age优先级大于Expires，Max-Age <= 0 统一按0算

  ```markdown
  Max-Age=0		相当于Session
  Max-Age=10		浏览器收到响应报文后，再过10s该Cookie过期
  Expires=Sat, 29-May-21 08:56:17 GMT		表示过期时间为2021-5-29 08:56:17 GMT
  ```

- Cookie的作用域由 `Domain` 和 `Path` 共同决定，符合作用域的浏览器才会携带上它发送过去

  ```markdown
  1. 子域&&子路径 可以携带 父域&&父路径 的Cookie
  2. Domain和Path均相同 也可以携带的Cookie
  ```

- HttpOnly禁止使用document.cookie等API对Cookie进行读写

  > 不禁止的话很容易导致，`跨站脚本`（XSS）攻击窃取敏感数据

- SameSite，建议看看文章

  > 有效防止 `跨站请求伪造`（XSRF）攻击

- Secure表示唯有采用HTTPS时，才会携带Cookie。采用HTTP，不会携带Cookie

  > 保证在传输过程的安全性

### 相关报文头字段

- 响应报文的`Set-Cookie`，请求报文携带Cookie时的Cookie头字段

<img src="C:\Users\ASUS\Desktop\notes\http协议\images\Set-Cookie.png" alt="Set-Cookie" style="zoom:80%;" />

## 缓存和代理

- [由HTTP的缓存控制到缓存代理](https://juejin.cn/post/6968281385060532237)
- 代理
  - 匿名代理：完全隐藏被 “代理” 的机器，访问的目标服务器只能 "看到" 代理服务器
  - 透明代理：不隐藏，均可以知道
  - 正向代理：让代理服务器去指定的服务器（URI）获取资源
  - 反向代理：让代理服务器根据某种策略来向某个服务器（URI）获取资源

## HTTP/2

<img src="C:\Users\ASUS\Desktop\notes\http协议\images\HTTP2网络分层模型.png" alt="HTTP2网络分层模型" style="zoom:80%;" />

### what

- 基于google的SPDY协议演变而来
  - 规定了头字段全部使用小写
  - 以后不再使用小版本号，而是直接称HTTP/1，HTTP/2
  - 基于TLS/SSL能很好的解决安全性问题，建立HTTP over TLS1.2+，主流浏览器仅支持  `h2`（加密的HTTP/2报文），不支持  `h2c`（clear text）
  - 在性能上，HTTP/2通过  `头部压缩`，`传输二进制格式`  以及引入  `流`  的概念来优化
- TLS握手成功后，客户端会发送过来一个请求报文  `connection preface` （连接前言） 来表明使用的是HTTP/2协议

### 头部压缩

- `HPACK` 算法通过在两端建立字典，分为静态字典和动态字典

  - 静态字典包括  `伪头字段`（:authority :method :status），即将HTTP报文格式把start line删除，然后加入了  `伪头字段`  来存储相关信息

    <img src="C:\Users\ASUS\Desktop\notes\http协议\images\static_table.png" alt="static_table" style="zoom:80%;" />

  - 由于静态字典有些只有key，没有相应的value，那该如何是好，这时候就要通过动态字典来不断收集和更新内容了，长久下去，动态字典包含的内容就十分丰富，那样传递报文时可能就只需要携带几个字节的报文过去了（仅需要携带相应Index即可）

    <img src="C:\Users\ASUS\Desktop\notes\http协议\images\Dynamic_Table.png" alt="Dynamic_Table" style="zoom:80%;" />

- 但是这也需要增加两端维护静态表和动态表的成本，即所谓的  `空间换时间`

### 二进制格式

- 消除start line后，再将原来的报文由Header + Body变为HEADERS Frame和多个DATA Frame，进一步将其拆分传输
- 传输的内容不再使用  `文本格式`，而是使用二进制格式，更加简洁明了

<hr>

<img src="C:\Users\ASUS\Desktop\notes\http协议\images\HTTP帧格式.png" alt="HTTP帧格式" style="zoom:80%;" />

- 帧类型：分为  `数据帧(HEADERS,DATA)`  和  `控制帧(SETTINGS,PING,PRIORITY)`

- 帧长度：`Frame Payload`  的长度

- 标志位：`END_HEADERS`  表示HEADERS Frame传输结束，`END_STREAM`  表示单方向数据发送结束，即流处于  `关闭`  状态

- 流标识符：流ID不能复用（关闭该流也不可以复用）

  > 因此发送新的请求时，需要创建一个新的流，这样流会很快到达上限，此时就需要发送  `GOAWAY`  控制帧（0号流中）重新开启TCP连接，流ID数就会重新计数

  <img src="C:\Users\ASUS\Desktop\notes\http协议\images\流的状态转换图.png" alt="流的状态转换图" style="zoom:80%;" />

### 流和多路复用

- 通过引入流的概念，即一个请求-应答就在一个独立的流中进行，不影响其它的请求-应答，从而实现多个流一起使用（多路复用）
  - 每个流的帧通过底层TCP的丢包重发等机制来保证帧的收发是有序进行的
  - 每个流分配的流ID是唯一的，当流ID用尽时，重新建立TCP连接，流ID重新计数
  - 服务器也可以主动推送消息给客户端

<img src="C:\Users\ASUS\Desktop\notes\http协议\images\多路复用.png" alt="多路复用" style="zoom:80%;" />

### 思考

- HTTP/2 的动态表维护  、流状态转换很复杂，你认为HTTP/2还是  `无状态`  的吗 ? 

  - HTTP没有记忆能力，每一次的请求服务端都无法区分它是哪一个客户端发送过来的请求

    > Cookie	=>	Session	or	Token	=>	记忆能力

- HTTP/2的帧最大可以达到16M，你觉得大帧好还是小帧好 ？

  - 需要区分场景，如果是网络不流畅，小帧比较好，因为丢帧重传的成本比较低；而在大文件下载传输的时候，大帧比较好，因为小帧耗费的头字段就比较多

- HTTP/2是如何解决它的  `队头阻塞`  问题的 ？

  - HTTP2引入  `流`  的概念，通过  `多路复用` — 同一个TCP连接可以同时进行多个流的传输，来解决  `HTTP的队头阻塞`，但由于TCP收发窗口的确认机制，还是会存在TCP的队头阻塞 

  <img src="C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\image-20210604193348913.png" alt="image-20210604193348913" style="zoom:80%;" />

## HTTP/3

<img src="C:\Users\ASUS\Desktop\notes\http协议\images\HTTP3协议栈.png" alt="HTTP3协议栈" style="zoom:80%;" />

### what

- 基于google的QUIC协议演变而来。HTTP/3基于UDP，混合了TLS1.3+以及HTTP/2的协议，主要是为了解决TCP带来的队头阻塞问题

  - 使用TLS1.3+，可以享受到1-RTT，0-RTT的好处

  - 基于UDP，解决了队头阻塞，但带来了不可靠传输的问题

  - 下移HTTP/2中流的概念到QUIC中，从而解决UDP是不可靠传输的问题，即实现可靠传输

    > QUIC（可靠传输）：单个  `流`  是有序的，可能会因为  `丢包`  而阻塞，但不会影响其它  `流`  的正常进行

<img src="C:\Users\ASUS\Desktop\notes\http协议\images\HTTP3帧结构.png" alt="HTTP3帧结构" style="zoom:80%;" />

### QUIC报文格式

<img src="C:\Users\ASUS\Desktop\notes\http协议\images\HTTP3连接迁移.png" alt="HTTP3连接迁移" style="zoom: 80%;" />

### 连接迁移

- 切换网络，不需要重新建立连接，复用之前建立的连接便能使用

  - TCP是通过IP地址和端口来建立两端的连接的
  - QUIC则是通过两端的ID来建立连接的

  > 将手机网路由4G切换到WiFi时，目的IP地址发生变化，TCP必须重新建立连接，而QUIC则可以通过两端的ID复用之前的连接，从而实现无缝迁移

## 性能优化

### 服务端

- 服务端是  `第零公里`  的一部分，选取高性能的Web服务器，配置TLS Flase Start、TCP Fast Open，HTTP/1长连接或配置HTTP/2或HTTP/3等

<img src="C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\image-20210605100400900.png" alt="image-20210605100400900" style="zoom: 67%;" />

### 客户端

- `降低延时`  是关键，重定向 => TCP连接，DNS查询，本地缓存，减少传输的报文中冗余字段和内容

<img src="C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\image-20210605112022913.png" alt="image-20210605112022913" style="zoom:80%;" />

- 浏览器进行一个	`请求-应答`	性能测试

  > https://www.baidu.com
  >
  > 其中延迟时间	=	Stalled	+	DNS Lookup	+	Initial connection	+	SSL	+	Waiting（TTFB-Time To First Bytes），占了大部分的总时间

<img src="C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\image-20210605103647368.png" alt="image-20210605103647368" style="zoom:80%;" />

### 传输链路

> 感觉程序员只能从  `中间一公里`  的传输链路中优化性能

<img src="C:\Users\ASUS\Desktop\notes\http协议\images\HTTP性能优化_传输链路.png" alt="HTTP性能优化_传输链路" style="zoom:80%;" />

### 思考

- 精灵图（Spriting）、资源内联（inlining）、域名分片（Sharding）这些手段为什么会对HTTP/2的性能优化造成反效果呢 ？
  - HTTP/1为了避免队头阻塞而做的，但不利于本地缓存（某个图标的改动就需要重新获取资源，某个资源改动同理，同时间多个请求需要等待请求-应答完成才能开始下一个）
  - HTTP/2的多路复用已经解决了HTTP的队头阻塞，不优化反而更有利于本地缓存
    - 域名分片是指利用多个域名和同一个IP地址建立`TCP连接`，巧妙地避开了浏览器对并发连接数的限制，然而HTTP/2建立那么多TCP连接纯属浪费资源（维护两端字典，TCP连接成本等）

## 特点

- `无状态`，因此后来引入了Cookie配合服务端的Session或Token技术  `间接`  实现有状态
- HTTP/1和HTTP/2是基于TCP的  `可靠传输`，而HTTP/3是基于UDP然后通过QUIC实现的可靠传输（保证送达）
- HTTP/1.1的  `长连接`，HTTP/2的  `多路复用`，HTTP/3 over QUIC的多路复用
- `请求-应答`   的串行队列通信模式（HTTP的队头阻塞，服务器不能主动推送均在引入流后解决）
- `灵活易扩展`，基于TLS/SSL实现加密通信，可自定义请求方法，状态码及其描述，头字段，body传输的数据类型等
- 明文传输





<hr>

# 信息安全五要素

- 机密性（Secrecy/Confidentiality）

  > HTTP报文在传输过程中是  `明文`  的，敏感信息很容易就会泄漏出去，失去了通信过程的    `机密性`

- 完整性（Integrity）

  > HTTP报文在传输过程中很容易被  `截获` ，然后  `修改`  相应的字段或数据，因此不能保证   `数据的完整性` 

- 身份认证（Authentication）

  > 如何  `证明你是你` ，而不是它人伪造的

- 不可否认（Non-repudiation/Undeniable）

  > 参与者都不可能否认或抵赖本人的真实身份

# HTTPS

## 前世今生

- 94年网景公司提出，由v2 => v3 => 99年IETF将其重命名位TLSv1.0，发展至今为TLSv1.3

  > 目的是为了使得HTTP能满足信息安全的五要素，从而保证传输过程中信息的安全

<img src="C:\Users\ASUS\Desktop\notes\http协议\images\SSLAndTLS.png" alt="SSLAndTLS" style="zoom:80%;" />

## 密码套件（cipher suite）

- 密码套件（cipher suite），恰当的加密算法组合

  > OpenSSL几乎支持所有公开的加密算法和协议

- 如下图例子

  <img src="C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\image-20210601155351680.png" alt="image-20210601155351680" style="zoom:80%;" />

  <img src="C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\image-20210601160037623.png" alt="image-20210601160037623" style="zoom:80%;" />

## 如何满足机密性

- 通过加密算法使得HTTP报文在传输过程中从  `明文`  变为  `密文`，从而满足了通信安全中的  `机密性`

### 对称加密

- 加密和解密的 `密钥相同` ，即为  `对称加密`

  > 对称加密算法

  ```markdown
  `AES`的密钥长度可以是 128bit  、192bit  、256bit 
  Google的`ChaCha20`密钥长度固定为 256bit
  ```

- 让明文按  `固定长度的密钥`  分组，然后每组分别用密钥进行加密 ，称为  `分组模式`

  > 常用：GCM	CCM	Poly1305
  >
  > AEAD（Authenticated Encryption with Associated Data）
  >
  > ECB	CBC	CFB	OFB

- 而它的问题在于如何将密钥安全地传递给对方，因为如果在传递过程中一旦被窃取，那么信息就不安全了！
  - 可能有人想到给传递地密钥加密不就行了，那么问题又来了，这个加密密钥的密钥又该如何传递给对方呢 ？

    > 因此非对称加密算法就出现了

### 非对称加密

- 给出两个整数，很容易就能将它们两个相乘
  但是，给出一个大整数(100位数以上的整数)，找出它们的约数就显得不是那么容易了（即得知公钥很难推出私钥）

  ​		<img src="C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\image-20210601201112270.png" alt="image-20210601201112270" style="zoom: 80%;" /> 

- 公钥（public key）和私钥（private key）的  `单向性`

  - 利用公钥加密后，仅能用私钥解密（没有密钥交换问题）

  - 利用私钥加密后，仅能用公钥解密（身份验证）

    > 普遍认为非对称加密的密钥长度  `至少为 2048bit`

    <img src="C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\image-20210601201130911.png" alt="image-20210601201130911" style="zoom: 80%;" />    




- 我给你知道公钥，但没用，因为  `公钥的加密只能通过私钥解密`，而私钥只属于持有者，从而有效解决密钥交换问题。但由于非对称加密是  `基于复杂的数学难题`  的，因此运算速度很慢，也就是  `牺牲了运算的速度，保证了安全`

  > 因此啊，混合加密又出现了

### 混合加密

- 虽然非对称加密很慢，但是我们给它加密/解密的内容很小不就行了，也就是将非对称加密应用在对称加密的会话密钥（session key）上（密钥一般是128bit | 192bit | 256bit，即16k | 24k | 32k），然后其它过程使用 对称加密即可
  - 这样一来既利用了非对称加密来解决密钥交换问题，也尽量地避免非对称加密在运算速度的劣势

  <img src="C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\image-20210601205257455.png" alt="image-20210601205257455" style="zoom:80%;" />

- 混合加密流程如下

  ```markdown
  1. 生成 session key && public key && private key
  2. 用public key给session key加密
  3. 传输的数据用session key加密
  4. 传输给对方，拿到后用持有的private key解密，得到session key
  5. 通过session key解密数据
  ```

  <img src="C:\Users\ASUS\Desktop\notes\http协议\images\混合加密.png" alt="混合加密" style="zoom: 50%;" />

## 如何满足完整性&不可否认性&身份认证

### 摘要算法（Digest Algorithm）

- 单向性：将任意长度的数据 "压缩" 成 唯一的 `摘要` 字符串，不可逆

- 雪崩效应：输入的微小不同导致输出的剧烈变化   =>   TLS利用它生成pseudo random function

  > 可能存在  `冲突`，所以说没有任何算法是万能的，只能尽可能保证安全

```markdown
安全强度较低的算法(TLS禁止使用)	
	MD5（Message-Digest 5）			16byte
	SHA-1（Secure Hash Algorithm 1）	20byte

安全强度较高的算法(TLS推荐的)
	SHA-2：
		SHA224		28byte 
		SHA256		32byte 
		SHA384		48byte 
		...
```

> 1byte => 2个字符

​		<img src="C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\image-20210601221622103.png" alt="image-20210601221622103" style="zoom:80%;" /> 

​		<img src="C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\image-20210601221634587.png" alt="image-20210601221634587" style="zoom:80%;" /> 

​		<img src="C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\image-20210601221641131.png" alt="image-20210601221641131" style="zoom:80%;" /> 

- 哈希消息认证码（HMAC）

<img src="C:\Users\ASUS\Desktop\notes\http协议\images\哈希消息认证码.png" alt="哈希消息认证码" style="zoom: 80%;" />

### 数字签名

- 生活中如何证明身份，自己独有的身份证，那在TLS中有什么是用户独有的呢 ？

  > 非对称算法中生成的  `私钥`  就是啊！

- 很简单，用私钥加密，公钥解密即可

  - 因为私钥  `只有你才拥有`，所以可以证明是你发的消息
  - 但要注意一点非对称加密的运算符速度很慢，为了降低影响，选择较小的数据进行  `加密，也就是  `摘要`

  > `签名`	=>	`验签`

<img src="C:\Users\ASUS\Desktop\notes\http协议\images\数字签名.png" alt="数字签名" style="zoom: 67%;" />



### 数字证书和CA（Certificate Authority）

- `公钥信任`   的问题，因为谁都可以发布公钥，万一是黑客伪造的公钥呢 ？

  - 又来个私钥，无限死循环，不如来个  `第三方权威来认证`  ！

- 我们必须相信  Root CA，不然整个信任链就无法继续了

  > 服务器发过来CA（下图的Self-Signed Cert），如果能验证该CA找到Root CA，那么就是可信的

- 操作系统和浏览器都内置了各大 CA 的根证书

<img src="C:\Users\ASUS\Desktop\notes\http协议\images\CA信任链.png" alt="CA信任链" style="zoom:80%;" />



### 证书体系（Public Key Infrastructure）

- 如果CA失误或被欺骗，签发了错误的证书，虽然证书是对的，但实际上这个网站是不安全的
  - CRL（证书吊销列表，Certificate revocation list）和 OCSP（在线证书状态协议，Online Certificate Status Protocol），及时废止有问题的证书
- CA被黑客攻陷了，或者这个CA本身就有恶意的想法
  - 只能操作系统或者浏览器从  `根上“下狠手”`  了，`撤销`  对该CA 的 `信任`，列入“黑名单”，这样它颁发的所有证书就都会被认为是不安全的

### 总结

- 建立在机密性上的  `完整性`
  - 如果没有机密性的话，黑客可以将报文截获后修改内容，并且生成使用相同的  `摘要算法`  生成摘要，这样就丢失了通信过程的完整性了
- 确认了身份后，不允许说刚刚的不是我发送的，否认之前做过的事情

## ECDHE密钥交换算法

### 数学原理

> 短暂 — 椭圆曲线 — 迪菲 — 赫尔曼

```markdown
离散对数：
	10 ^ 2 = 100	=>	log100 = 10
	5 ^ 3 % 17 = 6	=>	lnd(5,6) = 3 mod 17
(17,5)是离散对数的公共参数，6是真数，3是对数
```

- 知道  `对数`  和  `公共参数`，`很容易`  就求出了  `真数`

- 反之知道  `真数`  和  `公共参数`  ，`很难`  求出  `对数`

  > 通过穷举尝试出来：1，2，3，那么当一个非非常大的数时候，就很难求了


### static DH

- `P和G`  分别是公共参数中的  `模`  和  `底数`

- `a和b`  分别是两端的  `私钥`，且为  `对数`

- `A和B`  分别是两端的  `公钥`，且为  `真数`

  > 虽然黑客有可能通过获取到 g p A B，但是通过真数求解对数是很难的，即很难破解出  a  和  b

- `K`  就是  `Pre-Master`

- 一方的私钥是静态的，另一方是动态的

  > 如：a生成后就不变，b每次密钥交换采用随机数生成
  >
  > - 这就会导致服务端的公钥是不变的，而客户端的公钥是变化的，拥有海量计算资源的攻击者在足够的时间内，最终能够暴力破解出服务器的私钥，计算出Pre-Master

<img src="C:\Users\ASUS\Desktop\notes\http协议\images\DH.png" alt="DH" style="zoom:80%;" />

- `example`

<img src="C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\image-20210605155912917.png" alt="image-20210605155912917" style="zoom:80%;" />

### DHE

- DH算法 + Ephemeral（临时性的）

  > 为解决static DH算法一方的私钥是静态所留下的安全隐患，推出DHE算法使得两方的私钥都是动态的（临时）

### ECDHE

- 将整数域的离散对数	=>	椭圆曲线上的离散对数

  > 原来DHE算法是任意整数，而ECDHE算法则把连续的椭圆曲线给 "离散化" 成整数，使其更难计算出离散对数

```markdown
椭圆曲线C和基点G是公共参数，模数P
	私钥是倍数x，公钥是倍数点xG

而已知C 、G 、P 、xG想计算出离散对数x会更加困难
```

- `a和b`  分别是两端动态生成的  `私钥`，且为  `对数`，其余同理，此处试想一下穷举椭圆曲线上的离散对数解，中间还有一步将  `连续的椭圆曲线`  给离散化为整数的过程，确实是比整数域下的离散对数要难求

## TLS1.2握手

- `握手协议`  用于客户端和服务端在TLS的握手过程中  `协商`  TLS的  `Version`  、`Random`  、`Ciper Suites`  等信息，以及  `交换证书`  来保证  `公钥是可信`  ，`数字签名`  来  `表明身份`，若使用的加密协议是  `ECDHE`，还需  `Server Key Exchange`
- `变更密码规范协议`  用于  `通知对方`  接下来的数据传输将采用指定的  `加密算法`（TLS中就是改用  `对称加密算法`  ）

<img src="C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\image-20210602104507578.png" alt="image-20210602104507578" style="zoom:80%;" />




	TCP三次握手建立连接
	TLS握手
	1. 客户端使用握手子协议，发送 "Client Hello"
	    TLS Version
	    Client Random
	    cipher situes
	2. 服务端反馈一个 "Server Hello"
		TLS Version
		Server Random
		cipher situe
		
	3. 传输服务端使用的证书
	   签名
	   服务端发送Server Params(ECDHE)
	
	4. 接受到证书，验证证书链逐级验证，确认证书的真实性，以确保公钥是可信的
	   验签
	   客户端发送Client Params(ECDHE)
	
	5. pre-master = S的x向量
		Pa(x,y) = Ra * Q(x,y), Pa(x,y)是Client Params，Ra是Client Random
		Pb(x,y) = Rb * Q(x,y), Pb(x,y)是Server Params，Rb是Server Random
		Sa = Pb(x,y) * Ra
		Sb = Pa(x,y) * Rb
		S = Sa = Sb
	
	6. 利用RFC标准的公式，算出master_secret
	    将三个不可靠的随机数混合，使其更难以预测
	    master_secret = PRF(pre_master_secret, "master secret",ClientHello.random + ServerHello.random)
	    主密钥48byte，避免只用一个密钥带来的安全隐患 =>  client_write_key  server_write_key
	
	7. 客户端表明 'Change Cipher Spec' 改用对称加密算法进行加密通信，测试是否能正常加密通信
	
	8. 服务端表明可信正常通信
	
	// TLS握手阶段结束 
- 主流的TLS握手过程如下图
  - 使用ECDHE实现密钥交换，而不是RSA，因此需要Server Key Exchange
  - 因为使用了ECDHE，所以客户端可以不用等服务端Finished确认握手完毕，立即就发出HTTP报文，`快`  了一个rtt，这个叫 `TLS False Start("抢跑")`
  - "Change Cipher Spec" 之前传输的是明文，之后是对称加密的密文

<img src="C:\Users\ASUS\Desktop\notes\http协议\images\TLS详细连接过程.png" alt="TLS详细连接过程" style="zoom:80%;" />



- 没有  `"抢跑行为"`  的TLS握手如下图

<img src="C:\Users\ASUS\Desktop\notes\http协议\images\TLS_false_Start.png" alt="TLS_false_Start" style="zoom:80%;" />

- 但以上是 `单向验证`，即仅验证了服务器的身份，而没有验证客户端身份。伪造官方欺骗用户输入账号，密码就gg了

- `双向验证`  仅需要在  `Server Hello Done`  之后，`Client Key Exchange`  之前，客户端发送  `Client Certificate` ，服务端收到后沿着证书链验证客户端身份是否可信即可 

## TLS1.3的进化

- 简化了握手过程中cipher situes 、version 、group 、key_share 、algorithm等参数的协商过程
- 前向安全：“从现在往前、历史上”的那些通信都是安全的

### 最大化兼容

- 通过扩展协议来增加新功能，如果修改原有格式，那么很多 "老设备" 将不能继续工作

```markdown
Handshake Protocol: Client Hello
    Version: TLS 1.2 (0x0303)
    Extension: supported_versions (len=11)
        Supported Version: TLS 1.3 (0x0304)
        Supported Version: TLS 1.2 (0x0303)
```

### 强化安全

- 保留安全的算法，去除有漏洞的算法
  - 禁止在记录协议使用压缩
  - PRF   =>   HKDF
  - 废除RC4 、DES ....

- TLS1.3 明确废除RSA和DH

<img src="C:\Users\ASUS\Desktop\notes\http协议\images\TLS1.3瘦身.jpg" alt="TLS1.3瘦身" style="zoom:80%;" />

### 提升性能

- TLS1.2  `2-RTT`  握手，而TLS1.3利用  `supported_versions`  `supported_groups`  `signature_algorighms`  `key_share`  实现  `1-RTT`  握手，还可以继续利用  `pre_shared_key`  `early_data`  实现  `0-RTT`  握手

<img src="C:\Users\ASUS\Desktop\notes\http协议\images\TLS1.3.png" alt="TLS1.3" style="zoom:80%;" />

- 默认采用ECDHE，supported_groups 表明支持的曲线，key_share 是该曲线的参数

<img src="C:\Users\ASUS\Desktop\notes\http协议\images\1RTT_TLS1.3.png" alt="1RTT_TLS1.3" style="zoom:80%;" />

## 性能优化

- HTTPS的连接可以分为  `非对称加密`  握手阶段，`对称加密`  报文传输阶段

- 性能消耗主要在  `非对称加密`  握手阶段

  - TLS连接建立需要的RTT
  - Client Params 和 Server Params（ECDHE）
  - 验证证书时访问CA需要获取CRL 或 OCSP
  - 非对称加密解密处理 `Pre-Master`

  <img src="C:\Users\ASUS\Desktop\notes\http协议\images\HTTPS性能消耗.png" alt="HTTPS性能消耗" style="zoom:80%;" />





<hr>

# Extend

## DNS

### what

- 输入地址栏的域名，需要通过DNS域名解析得到IP地址，而这个过程还可以通过  `缓存策略`  来提高DNS的查询速度

- `递归查询`  和  `迭代查询`

  - 前者会替主机继续查询该域名对应的IP地址

  - 后者则不会代替它而是告诉它下一步去哪里查询

- 域名查询顺序

  - 查询浏览器的DNS缓存

  - 操作系统DNS缓存（host文件中的条目会在系统启动时添加到该系统的缓存中，或者可以主动使用命令刷新添加）

  - 一些大公司搭建了一些非权威DNS服务器来缓存（如：google的8.8.8.8等）

  - 根域名服务器

  - 顶级域名服务器

  - 权威域名服务器

  <img src="C:\Users\ASUS\Desktop\notes\http协议\images\DNS查询策略.png" alt="DNS查询策略" style="zoom:80%;" />

### 应用场景

- 域名屏蔽：DNS域名无法解析到相应的IP地址，或错误的IP地址

  > Great Wall Fire阻止访问外网

- 域名劫持：DNS域名解析成别的IP地址

  > 输入A网站的域名，却跳转到了B网站

- 由于主机损坏或需要减少访问的次数等原因，可以通知相应的域名服务器域名映射的IP地址重定向

- 由于域名与IP地址的关系可以是  `多对多`  的，那么当一个域名对应多个IP地址时，该如何优化DNS查询 ？

  - `客户端`  获取到DNS查询的所有IP地址后，通过某种负载均衡的策略来提高请求-应答效率
  - `DNS服务器`  根据多个IP地址的距离远近等因素，选取最好的返回给客户端

## URI

- 全称Uniform Resource Identifier，即统一资源定位符，它包括URL、URN等，但其实不用纠结于这些，因为它们都是用于区分互联网上不同的资源
- 因为user:passwd@指登录主机的用户名和密码，但以明文的形式暴露出现，太危险了，因此可忽略它

<img src="C:\Users\ASUS\Desktop\notes\http协议\images\URI.png" alt="URI" style="zoom:80%;" />

- encodeURI原理：将字符编码成UTF-8（用1-4个字节表示），再将每个字节转为16进制并在前面加上%，转化后的全部结果连接起来

## CDN

- CDN在对待浏览器和爬虫时会有差异吗 ？
  - 如果没有在CDN中加入反爬虫技术，那么爬虫和浏览器将没有区别，一般可通过User Agent、访问频率、IP地址等因素来判断