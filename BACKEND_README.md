# RSS代理后端服务

这个后端服务用于代理RSS请求，避免前端跨域问题。

## 安装依赖

```bash
# 将server-package.json重命名为package.json
mv server-package.json package.json

# 安装依赖
npm install
```

## 启动服务

```bash
# 开发模式（自动重启）
npm run dev

# 生产模式
npm start
```

服务将在 `http://localhost:3001` 启动

## API端点

### 获取RSS内容
```
GET /api/rss?url=<RSS_URL>
```

示例：
```
GET http://localhost:3001/api/rss?url=https://example.com/rss.xml
```

响应格式：
```json
{
  "title": "RSS源标题",
  "items": [
    {
      "id": "url-0",
      "title": "文章标题",
      "content": "文章内容",
      "pubDate": "发布时间",
      "link": "文章链接",
      "source": "RSS源URL",
      "imageUrl": "图片URL",
      "cachedAt": 1234567890
    }
  ]
}
```

### 图片代理
```
GET /api/image-proxy?url=<IMAGE_URL>
```

示例：
```
GET http://localhost:3001/api/image-proxy?url=https://example.com/image.jpg
```

功能：
- 代理图片请求，解决CORS问题
- 支持各种图片格式（JPEG、PNG、GIF、WebP等）
- 自动设置正确的Content-Type
- 缓存1天，提高性能
- 流式传输，节省内存

### 健康检查
```
GET /api/health
```

## 环境变量

- `PORT`: 服务器端口（默认：3001）

## 功能特性

- CORS支持，允许前端跨域请求
- RSS XML解析和JSON转换
- 图片URL提取
- 图片代理，解决图片CORS问题
- 错误处理和超时控制
- 用户代理设置，提高兼容性
- 图片缓存，提高加载性能
- 流式传输，节省服务器内存

## 注意事项

1. 确保后端服务在启动前端应用之前运行
2. 后端服务默认运行在3001端口
3. 如果修改端口，需要同时更新前端代码中的API URL
