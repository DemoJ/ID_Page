# 赛博名片

这是一个简洁现代的个人主页模板，使用纯静态技术栈构建，支持响应式布局。  
预览地址：https://about.diyun.site

## 特点

- 🎨 简洁现代的设计风格
- 📱 完整的响应式布局支持
- ⚡️ 纯静态实现，无需后端
- 🔧 配置驱动，易于定制
- 🖼️ 优雅的图片加载失败处理

## 技术说明

- HTML5
- CSS3
- Vanilla JavaScript
- Font Awesome 图标
- Google Fonts (Noto Sans SC)

## 配置说明
修改 `config.json` 文件来自定义网站内容：  
```json
{
    "meta": {
        "title": "网站标题",
        "description": "网站描述",
        "language": "zh",
        "themeColor": "#ffffff",
        "favicon": "网站图标地址"
    },
    "profile": {
        "avatar": "头像URL",
        "name": "姓名",
        "website": "个人网站地址",
        "intro": "个人简介"
    },
    "contact": [
        {
            "type": "wechat/etc",
            "icon": {
                "type": "font-awesome/image",
                "value": "图标类名或URL"
            },
            "label": "显示文本",
            "qrcode": "二维码URL"/"link": "非二维码URL，点击会跳转这个地址"
        }
    ],
    "social": [
        {
            "platform": "平台名称",
            "link": "链接",
            "icon": {
                "type": "font-awesome/image",
                "value": "图标类名或URL"
            }
        }
    ],
    "portfolio": [
        {
            "title": "作品标题",
            "description": "作品描述",
            "image": "作品图片URL",
            "link": "作品链接"
        }
    ]
}
```
联系方式支持类型为'wechat'和'非wechat'，非wechat类型需要填写link，wechat类型需要填写qrcode。  
联系方式和社交媒体的图标支持font-awesome和image两种类型，font-awesome类型需要填写图标类名，image类型需要填写图片地址。  
