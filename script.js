document.addEventListener('DOMContentLoaded', async function() {
    try {
        console.log('开始加载配置文件...');
        
        const response = await fetch('config.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const config = await response.json();
        
        console.log('配置文件加载成功:', config);

        renderMetadata(config.meta);
        renderProfile(config.profile);
        renderContact(config.contact);
        renderSocial(config.social);
        renderPortfolio(config.portfolio);
        
    } catch (error) {
        console.error('加载配置文件失败:', error);
        
        document.body.innerHTML += `
            <div style="color: red; padding: 20px;">
                配置加载失败: ${error.message}<br>
                请确保：<br>
                1. 使用本地服务器（如 Live Server）运行网站<br>
                2. config.json 文件存在且格式正确<br>
                3. 检查浏览器控制台是否有其他错误
            </div>
        `;
    }
});

function checkElement(selector, functionName) {
    const element = document.querySelector(selector);
    if (!element) {
        console.error(`${functionName}: 找不到元素 "${selector}"`);
        return null;
    }
    return element;
}

function renderIcon(iconConfig) {
    if (!iconConfig) return '';
    
    if (iconConfig.type === 'font-awesome') {
        return `<i class="${iconConfig.value}"></i>`;
    } else if (iconConfig.type === 'image') {
        return `<img src="${iconConfig.value}" alt="icon">`;
    }
    return '';
}

function renderMetadata(meta) {
    document.title = meta.title;
    document.documentElement.lang = meta.language;
    
    const head = document.head;
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        head.appendChild(metaDescription);
    }
    metaDescription.content = meta.description;
    
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta');
        metaThemeColor.name = 'theme-color';
        head.appendChild(metaThemeColor);
    }
    metaThemeColor.content = meta.themeColor;
    
    let favicon = document.querySelector('link[rel="icon"]');
    if (!favicon) {
        favicon = document.createElement('link');
        favicon.rel = 'icon';
        head.appendChild(favicon);
    }
    favicon.href = meta.favicon;
}

function renderProfile(profile) {
    const profileContent = checkElement('.profile-content', 'renderProfile');
    if (!profileContent) return;
    
    profileContent.innerHTML = `
        <div class="avatar">
            <img src="${profile.avatar}" alt="头像">
        </div>
        <h1>${profile.name}</h1>
        <p class="subtitle">${profile.website}</p>
        <p class="intro">${profile.intro}</p>
    `;
}

function renderContact(contacts) {
    const contactIcons = checkElement('.contact-icons', 'renderContact');
    if (!contactIcons) return;
    
    contactIcons.innerHTML = contacts.map(contact => {
        const isWechat = contact.type === 'wechat';
        const elementTag = isWechat ? 'div' : 'a';
        const hrefAttr = !isWechat ? `href="${contact.link}"` : '';
        
        return `
            <${elementTag} ${hrefAttr} class="contact-icon" ${isWechat ? 'id="wechat"' : ''}>
                ${renderIcon(contact.icon)}
                <span>${contact.label}</span>
                ${contact.qrcode ? `<img class="qr-code" src="${contact.qrcode}" style="display: none;">` : ''}
            </${elementTag}>
        `;
    }).join('');

    const wechatIcon = document.getElementById('wechat');
    if (wechatIcon) {
        const qrCode = wechatIcon.querySelector('.qr-code');
        if (qrCode) {
            wechatIcon.addEventListener('mouseenter', () => qrCode.style.display = 'block');
            wechatIcon.addEventListener('mouseleave', () => qrCode.style.display = 'none');
        }
    }
}

function renderSocial(socials) {
    const socialGrid = checkElement('.social-grid', 'renderSocial');
    if (!socialGrid) return;
    
    socialGrid.innerHTML = socials.map(social => `
        <a href="${social.link}" target="_blank" class="social-card">
            <div class="social-icon ${social.platform}">
                ${renderIcon(social.icon)}
            </div>
        </a>
    `).join('');
}

function handleImageError(img) {
    if (img.dataset.fallbackApplied) return;
    
    img.dataset.fallbackApplied = 'true';
    img.src = 'data:image/svg+xml;charset=UTF-8,%3csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="%23ccc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3e%3crect x="3" y="3" width="18" height="18" rx="2" ry="2"%3e%3c/rect%3e%3ccircle cx="8.5" cy="8.5" r="1.5"%3e%3c/circle%3e%3cpolyline points="21 15 16 10 5 21"%3e%3c/polyline%3e%3c/svg%3e';
    img.alt = '图片加载失败';
    img.style.backgroundColor = '#f8f9fa';
    img.style.padding = '10px';
}

function renderPortfolio(portfolio) {
    const projectContainer = checkElement('.project-container', 'renderPortfolio');
    if (!projectContainer) return;

    projectContainer.innerHTML = portfolio.map(item => `
        <a href="${item.link}" class="project" target="_blank">
            <img src="${item.image}" alt="${item.title}" onerror="handleImageError(this)">
            <h3 title="${item.title}">${item.title}</h3>
            <div class="project-desc" title="${item.description}">${item.description}</div>
        </a>
    `).join('');
}

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});
