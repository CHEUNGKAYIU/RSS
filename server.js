const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const { JSDOM } = require('jsdom');

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(express.json());

// RSS代理端点
app.get('/api/rss', async (req, res) => {
  try {
    const { url } = req.query;
    
    if (!url) {
      return res.status(400).json({ error: '缺少URL参数' });
    }

    // 验证URL格式
    try {
      new URL(url);
    } catch (error) {
      return res.status(400).json({ error: '无效的URL格式' });
    }

    // 获取RSS内容
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'referrerpolicy':"no-referrer"
      },
      timeout: 10000 // 10秒超时
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const xmlText = await response.text();
    
    // 解析RSS XML
    const dom = new JSDOM(xmlText, { contentType: 'text/xml' });
    const doc = dom.window.document;
    
    // 提取RSS信息
    const channelTitle = doc.querySelector('channel > title')?.textContent || '';
    const items = doc.querySelectorAll('item');
    
    const rssData = {
      title: channelTitle.trim(),
      items: Array.from(items).map((item, index) => {
        const title = item.querySelector('title')?.textContent || '无标题';
        const description = item.querySelector('description')?.textContent || '';
        const pubDate = item.querySelector('pubDate')?.textContent || '';
        const link = item.querySelector('link')?.textContent || '';
        
        // 提取图片URL
        const imgRegex = /<img[^>]+src="([^"]+)"/i;
        const imgMatch = description.match(imgRegex);
        const imageUrl = imgMatch ? imgMatch[1] : null;
        
        return {
          id: `${url}-${index}`,
          title: title.trim(),
          content: description,
          pubDate,
          link,
          source: url,
          imageUrl,
          cachedAt: Date.now()
        };
      })
    };

    res.json(rssData);
    
  } catch (error) {
    console.error('RSS获取错误:', error);
    res.status(500).json({ 
      error: '获取RSS内容失败', 
      message: error.message 
    });
  }
});

// 图片代理端点
app.get('/api/image-proxy', async (req, res) => {
  try {
    const { url } = req.query;
    
    if (!url) {
      return res.status(400).json({ error: '缺少图片URL参数' });
    }

    // 验证URL格式
    try {
      new URL(url);
    } catch (error) {
      return res.status(400).json({ error: '无效的图片URL格式' });
    }

    // 获取图片
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Referer': new URL(url).origin
      },
      timeout: 10000 // 10秒超时
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 获取图片内容类型
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    
    // 设置响应头
    res.set({
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=86400', // 缓存1天
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type'
    });

    // 将图片数据流式传输到客户端
    response.body.pipe(res);

  } catch (error) {
    console.error('图片代理错误:', error);
    res.status(500).json({ 
      error: '获取图片失败', 
      message: error.message 
    });
  }
});

// 健康检查端点
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`RSS代理服务器运行在端口 ${PORT}`);
  console.log(`健康检查: http://localhost:${PORT}/api/health`);
  console.log(`RSS代理: http://localhost:${PORT}/api/rss?url=<RSS_URL>`);
  console.log(`图片代理: http://localhost:${PORT}/api/image-proxy?url=<IMAGE_URL>`);
});

module.exports = app;
