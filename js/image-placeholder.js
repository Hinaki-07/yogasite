/*
  Image Placeholder Helper
  画像プレースホルダーヘルパー
*/

document.addEventListener('DOMContentLoaded', () => {
  
  // ========================================
  // 画像エラーハンドリング
  // ========================================
  const handleImageError = (img) => {
    // 既にプレースホルダーが設定されている場合は何もしない
    if (img.dataset.placeholderSet) return;
    
    // 画像のサイズを取得
    const width = img.width || 800;
    const height = img.height || 600;
    
    // プレースホルダーSVGを生成
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f0f5f2"/>
        <text 
          x="50%" 
          y="50%" 
          font-family="Arial, sans-serif" 
          font-size="24" 
          fill="#8fa998" 
          text-anchor="middle" 
          dominant-baseline="middle"
        >
          画像を配置してください
        </text>
        <text 
          x="50%" 
          y="60%" 
          font-family="Arial, sans-serif" 
          font-size="14" 
          fill="#c9a97f" 
          text-anchor="middle" 
          dominant-baseline="middle"
        >
          ${img.alt || 'Image'}
        </text>
      </svg>
    `;
    
    // SVGをBase64エンコード
    const encodedSvg = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
    
    // プレースホルダーを設定
    img.src = encodedSvg;
    img.dataset.placeholderSet = 'true';
    
    // スタイルを追加
    img.style.backgroundColor = '#f0f5f2';
    img.style.border = '2px dashed #c9a97f';
  };
  
  // すべての画像にエラーハンドラーを設定
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    // 画像が既に読み込まれているかチェック
    if (!img.complete || img.naturalHeight === 0) {
      img.addEventListener('error', () => handleImageError(img));
    }
  });
  
  // ========================================
  // 画像の遅延読み込み最適化
  // ========================================
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          // data-src属性がある場合は設定
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          
          // 監視を停止
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });
    
    // loading="lazy"属性を持つ画像を監視
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  }
  
  // ========================================
  // 画像読み込み完了時のフェードイン
  // ========================================
  images.forEach(img => {
    if (img.complete && img.naturalHeight !== 0) {
      img.style.opacity = '1';
    } else {
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.5s ease';
      
      img.addEventListener('load', () => {
        img.style.opacity = '1';
      });
    }
  });
  
  // ========================================
  // 開発モード: 画像パスのログ出力
  // ========================================
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    const missingImages = [];
    
    images.forEach(img => {
      if (!img.complete || img.naturalHeight === 0) {
        missingImages.push({
          src: img.src,
          alt: img.alt,
          element: img
        });
      }
    });
    
    if (missingImages.length > 0) {
      console.group('%c📷 Missing Images', 'color: #c9a97f; font-weight: bold; font-size: 14px;');
      console.log(`Found ${missingImages.length} missing image(s):`);
      missingImages.forEach((img, index) => {
        console.log(`${index + 1}. ${img.src}`);
        console.log(`   Alt: "${img.alt}"`);
      });
      console.log('\n💡 Tip: Add images to the /images folder or they will show placeholders.');
      console.groupEnd();
    }
  }
});

// ========================================
// プレースホルダー画像生成ユーティリティ
// ========================================
window.generatePlaceholder = (width = 800, height = 600, text = 'Placeholder') => {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f0f5f2"/>
      <line x1="0" y1="0" x2="${width}" y2="${height}" stroke="#c9a97f" stroke-width="2" opacity="0.3"/>
      <line x1="${width}" y1="0" x2="0" y2="${height}" stroke="#c9a97f" stroke-width="2" opacity="0.3"/>
      <text 
        x="50%" 
        y="50%" 
        font-family="Arial, sans-serif" 
        font-size="24" 
        fill="#5a7d6b" 
        text-anchor="middle" 
        dominant-baseline="middle"
      >
        ${text}
      </text>
      <text 
        x="50%" 
        y="calc(50% + 30px)" 
        font-family="Arial, sans-serif" 
        font-size="14" 
        fill="#8fa998" 
        text-anchor="middle" 
        dominant-baseline="middle"
      >
        ${width} × ${height}
      </text>
    </svg>
  `;
  
  return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
};

// ========================================
// 画像キャッシング（オプション）
// ========================================
class SimpleImageCache {
  constructor(maxSize = 50) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }
  
  set(key, value) {
    if (this.cache.size >= this.maxSize) {
      // 最も古いエントリを削除
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
  
  get(key) {
    return this.cache.get(key);
  }
  
  has(key) {
    return this.cache.has(key);
  }
  
  clear() {
    this.cache.clear();
  }
  
  get size() {
    return this.cache.size;
  }
}

// グローバルインスタンスを作成
window.imageCache = new SimpleImageCache();

// ========================================
// プリロード機能
// ========================================
window.preloadImages = (imageUrls) => {
  return Promise.all(
    imageUrls.map(url => {
      return new Promise((resolve, reject) => {
        // キャッシュにある場合はスキップ
        if (window.imageCache.has(url)) {
          resolve(url);
          return;
        }
        
        const img = new Image();
        img.onload = () => {
          window.imageCache.set(url, img);
          resolve(url);
        };
        img.onerror = () => {
          console.warn(`Failed to preload image: ${url}`);
          reject(url);
        };
        img.src = url;
      });
    })
  );
};

// ========================================
// 使用例をコンソールに出力
// ========================================
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  console.log('%c🎨 Image Utilities Available', 'color: #5a7d6b; font-weight: bold; font-size: 14px;');
  console.log('• generatePlaceholder(width, height, text) - Generate placeholder image');
  console.log('• preloadImages([urls]) - Preload multiple images');
  console.log('• imageCache - Simple image cache instance');
}

