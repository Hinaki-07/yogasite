/*
  Main JavaScript
  メインJavaScriptファイル
*/

document.addEventListener('DOMContentLoaded', () => {
  
  // ========================================
  // イントロアニメーション
  // ========================================
  const intro = document.querySelector('.intro');
  const content = document.getElementById('content');

  if (intro && content) {
    // イントロが終わったらコンテンツを表示
    setTimeout(() => {
      intro.style.pointerEvents = 'none';
      content.style.opacity = '1';
    }, 2500);

    // イントロ要素を完全に削除
    setTimeout(() => {
      intro.remove();
    }, 3000);
  }

  // ========================================
  // Splide スライダー初期化
  // ========================================
  const splideElement = document.querySelector('.instructor-slider');
  
  if (splideElement && typeof Splide !== 'undefined') {
    const splide = new Splide(splideElement, {
      type: 'loop',
      perPage: 3,
      perMove: 1,
      gap: '2rem',
      pagination: true,
      arrows: true,
      autoplay: true,
      interval: 5000,
      pauseOnHover: true,
      pauseOnFocus: true,
      breakpoints: {
        1024: {
          perPage: 2,
          gap: '1.5rem',
        },
        768: {
          perPage: 1,
          gap: '1rem',
        }
      }
    });

    splide.mount();
  } else if (splideElement) {
    console.warn('Splide library not found. Slider will not be initialized.');
  }

  // ========================================
  // フォームバリデーション
  // ========================================
  const reservationForm = document.querySelector('.reservation-form');
  
  if (reservationForm) {
    reservationForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // フォームデータを取得
      const formData = new FormData(reservationForm);
      const data = Object.fromEntries(formData.entries());

      // 簡単なバリデーション
      if (!data.name || !data.email || !data.message) {
        alert('必須項目を入力してください。');
        return;
      }

      // メールアドレスの形式チェック
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        alert('正しいメールアドレスを入力してください。');
        return;
      }

      // reCAPTCHAチェック（実装されている場合）
      const recaptchaResponse = grecaptcha ? grecaptcha.getResponse() : null;
      if (!recaptchaResponse && typeof grecaptcha !== 'undefined') {
        alert('reCAPTCHAを完了してください。');
        return;
      }

      // 送信処理（実際のAPIエンドポイントに変更してください）
      try {
        // デモ用: コンソールにデータを出力
        console.log('Form data:', data);
        alert('お問い合わせを受け付けました。ありがとうございます！');
        reservationForm.reset();
        
        // 実際のAPIへの送信例:
        /*
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          alert('お問い合わせを受け付けました。ありがとうございます！');
          reservationForm.reset();
        } else {
          throw new Error('送信に失敗しました。');
        }
        */
      } catch (error) {
        console.error('Error:', error);
        alert('送信中にエラーが発生しました。もう一度お試しください。');
      }
    });
  }

  // ========================================
  // ローディング時のパフォーマンス最適化
  // ========================================
  
  // 遅延読み込み画像の設定
  if ('loading' in HTMLImageElement.prototype) {
    // ブラウザがネイティブの遅延読み込みをサポート
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.src = img.dataset.src || img.src;
    });
  } else {
    // Intersection Observerを使用した代替実装
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => imageObserver.observe(img));
  }

  // ========================================
  // スクロール進捗インジケーター
  // ========================================
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
    z-index: 9999;
    transition: width 0.1s ease;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = scrollPercentage + '%';
  });

  // ========================================
  // ユーティリティ関数
  // ========================================
  
  // スムーズスクロール（トップへ戻る）
  window.scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // 現在のセクションをハイライト（ナビゲーション用）
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.drawer__item a[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 100) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });

  // ========================================
  // コンソールメッセージ
  // ========================================
  console.log('%cYoga Studio', 'font-size: 24px; font-weight: bold; color: #5a7d6b;');
  console.log('%cWelcome to our website!', 'font-size: 14px; color: #666;');
  console.log('Built with ❤️');
});

// ========================================
// ページビジビリティAPI - タブが非表示の時にアニメーションを停止
// ========================================
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // ページが非表示の時の処理
    document.body.classList.add('page-hidden');
  } else {
    // ページが表示された時の処理
    document.body.classList.remove('page-hidden');
  }
});

// ========================================
// エラーハンドリング
// ========================================
window.addEventListener('error', (e) => {
  console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
});

