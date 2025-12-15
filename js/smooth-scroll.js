/*
  Smooth Scroll Implementation
  スムーススクロール実装
*/

// Lenisスムーススクロール初期化
// CDNから読み込む場合は以下を追加してください:
// <script src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.29/dist/lenis.min.js"></script>

document.addEventListener('DOMContentLoaded', () => {
  // Lenisが利用可能かチェック
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // アニメーションフレームごとにlenisを更新
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // アンカーリンクのスムーススクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // ハッシュのみの場合はトップへスクロール
        if (href === '#') {
          e.preventDefault();
          lenis.scrollTo(0, {
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
          return;
        }

        // 指定された要素へスクロール
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          lenis.scrollTo(target, {
            offset: -80, // ヘッダー分のオフセット
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });

          // モバイルメニューが開いている場合は閉じる
          const drawer = document.getElementById('js-drawer');
          if (drawer && drawer.classList.contains('active')) {
            drawer.classList.remove('active');
            document.body.style.overflow = '';
          }
        }
      });
    });

    // スクロール位置に応じてヘッダーを隠す/表示する
    let lastScrollY = 0;
    const header = document.querySelector('.header');

    lenis.on('scroll', ({ scroll, direction }) => {
      if (scroll > 100) {
        if (direction === 1 && scroll > lastScrollY) {
          // 下にスクロール
          header.style.transform = 'translateY(-100%)';
        } else {
          // 上にスクロール
          header.style.transform = 'translateY(0)';
        }
      } else {
        // トップ付近では常に表示
        header.style.transform = 'translateY(0)';
      }
      lastScrollY = scroll;
    });

  } else {
    // Lenisが利用できない場合は通常のスムーススクロール
    console.warn('Lenis library not found. Using native smooth scroll.');
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        const target = document.querySelector(href);
        
        if (target) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // モバイルメニューが開いている場合は閉じる
          const drawer = document.getElementById('js-drawer');
          if (drawer && drawer.classList.contains('active')) {
            drawer.classList.remove('active');
            document.body.style.overflow = '';
          }
        }
      });
    });
  }

  // パララックス効果
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  if (parallaxElements.length > 0) {
    window.addEventListener('scroll', () => {
      parallaxElements.forEach(element => {
        const scrolled = window.pageYOffset;
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrolled;
        const elementHeight = element.offsetHeight;
        const windowHeight = window.innerHeight;

        // 要素がビューポート内にある場合のみパララックスを適用
        if (scrolled + windowHeight > elementTop && scrolled < elementTop + elementHeight) {
          const yPos = (scrolled - elementTop) * 0.3;
          element.style.transform = `translateY(${yPos}px)`;
        }
      });
    });
  }
});

