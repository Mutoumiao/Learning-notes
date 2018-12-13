# HTTP 首部

## HTTP 首部字段传递重要信息

    HTTP 首部字段是构成 HTTP 报文的要素之一。在客户端与服务器之 间以 HTTP 协议进行通信的过程中，无论是请求还是响应都会使用首 部字段，它能起到传递额外重要信息的作用。

    使用首部字段是为了给浏览器和服务器提供报文主体大小、所使用的 语言、认证信息等内容

## HTTP 首部字段类型

HTTP 首部字段根据实际用途被分为 4 种类型

**通用首部字段（`General Header Fields`）**

请求报文和响应报文两方都会使用的首部

**请求首部字段（`Request Header Fields`）**

从客户端向服务器端发送请求报文时使用的首部。补充了请求的附加 内容、客户端信息、响应内容相关优先级等信息。

**响应首部字段（`Response Header Fields`）**

从服务器端向客户端返回响应报文时使用的首部。补充了响应的附加 内容，也会要求客户端附加额外的内容信息

**实体首部字段（`Entity Header Fields`）**

针对请求报文和响应报文的实体部分使用的首部。补充了资源内容更 新时间等与实体有关的信息

## HTTP/1.1 首部字段一览

HTTP/1.1 规范定义了如下 47 种首部字段

**通用首部字段（`General Header Fields`）**

| 首部字段名        | 说明                       |
| ----------------- | -------------------------- |
| [Cache-Control](./GeneralHeaderFields/Cache-Control.md)     | 控制缓存行为               |
| Connection        | 逐跳首部、连接的管理       |
| Date              | 创建报文的日期             |
| Pragma            | 报文指令                   |
| Trailer           | 报文末端的首部一览         |
| Transfer-Encoding | 制定报文主体的传输编码方式 |
| Upgrade           | 升级为其他协议             |
| Via               | 代理服务器的相关信息       |
| Warning           | 错误通知                   |
|                   |                            |

**请求首部字段（`Request Header Fields`）**

| 首部字段名          | 说明                                            |
| ------------------- | ----------------------------------------------- |
| Accept              | 用户代理可处理的媒体类型                        |
| Accept-Charset      | 优先的字符集                                    |
| Accept-Encoding     | 优先的内容编码                                  |
| Accept-Language     | 优先的语言（自然语言）                          |
| Authoriza           | Web 认证信息                                    |
| Expect              | 期待服务器的特定行为                            |
| Form                | 用户的电子邮箱地址                              |
| Host                | 请求资源所在的服务器                            |
| if-Match            | 比较实体标志（ETag）                            |
| if-Modified-Since   | 比较实体标志（与 if-Match 相反）                |
| If-Range            | 资源未更新时发送实体                            |
| Byte                | 的范围请求                                      |
| If-Unmodified-Since | 比较资源的更新时间（与 If-Modified-Since 相反） |
| Max-Forwards        | 最大传输逐跳数                                  |
| Proxy-Authorization | 代理服务器要求客户端的认证信息                  |
| Range               | 实体的字节范围请求                              |
| Referer             | 对请求中 URI 的原始获取方                       |
| TE                  | 传输编码的优先级                                |
| User-Agent          | HTTP 客户端程序的信息                           |
|                     |                                                 |

**响应首部字段（`Response Header Fields`）**

| 首部字段名         | 说明                         |
| ------------------ | ---------------------------- |
| Accept-Ranges      | 是否接受字节范围请求         |
| Age                | 推算资源创建经过时间         |
| ETag               | 资源的匹配信息               |
| Location           | 令客户端重定向至指定 URI     |
| Proxy-Authenticate | 代理服务器对客户端的认证信息 |
| Retry-After        | 对再次发起请求的时机要求     |
| Server             | HTTP 服务器的安装信息        |
| Vary               | 代理服务器缓存的管理信息     |
| WWW-Authenticate   | 服务器对客户端的认证信息     |

|

**实体首部字段（`Entity Header Fields`）**

| 首部字段名       | 说明                         |
| ---------------- | ---------------------------- |
| Allow            | 资源可支持的 HTTP 方法       |
| Content-Encoding | 实体主体适用的编码方式       |
| Content-Language | 实体主体的自然语言           |
| Content-Length   | 实体主体的大小（单位：字节） |
| Content-Location | 替代对应资源的 URI           |
| Content-MD5      | 实体主体的报文摘要           |
| Content-Range    | 实体主体的位置范围           |
| Content-Type     | 实体主体的媒体类型           |
| Expires          | 实体主体过期的日期时间       |
| Last-Modified    | 资源的最后修改日期时间       |

|

## 非 HTTP/1.1 首部字段

    在 HTTP 协议通信交互中使用到的首部字段，不限于 RFC2616 中定 义的 47 种首部字段。还有 Cookie、Set-Cookie 和 Content-Disposition 等在其他 RFC 中定义的首部字段，它们的使用频率也很高。

    这些非正式的首部字段统一归纳在 RFC4229 HTTP Header Field Registrations

## End-to-end 首部和 Hop-by-hop 首部

HTTP 首部字段将定义成缓存代理和非缓存代理的行为，分成 2 种类 型。

**端到端首部（`End-to-end Header`）**

> 分在此类别中的首部会转发给请求 / 响应对应的最终接收目标，且必 须保存在由缓存生成的响应中，另外规定它必须被转发

**逐跳首部（`Hop-by-hop Header`）**

> 分在此类别中的首部只对单次转发有效，会因通过缓存或代理而不再 转发。HTTP/1.1 和之后版本中，如果要使用 hop-by-hop 首部，需提 供 Connection 首部字段。

下面列举了 HTTP/1.1 中的逐跳首部字段。除这 8 个首部字段之外， 其他所有字段都属于端到端首部。

- Connection
- Keep-Alive
- Proxy-Authenticate
- Proxy-Authorization
- Trailer
- TE
- Transfer-Encoding
- Upgrad
