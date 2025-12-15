/*
  Modal and Drawer Implementation
  モーダルとドロワーメニューの実装
*/

document.addEventListener('DOMContentLoaded', () => {
  
  // ========================================
  // ドロワーメニュー
  // ========================================
  const hamburger = document.getElementById('js-hamburger');
  const drawer = document.getElementById('js-drawer');
  const drawerOverlay = drawer ? drawer.querySelector('.modal__overlay') : null;
  const drawerClose = drawer ? drawer.querySelector('.modal__close') : null;

  // ハンバーガーメニューをクリック
  if (hamburger && drawer) {
    hamburger.addEventListener('click', () => {
      const isActive = drawer.classList.contains('active');
      
      if (isActive) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  // ドロワーを開く
  function openDrawer() {
    drawer.classList.add('active');
    hamburger.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // ドロワーを閉じる
  function closeDrawer() {
    drawer.classList.remove('active');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  }

  // オーバーレイをクリックして閉じる
  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', closeDrawer);
  }

  // 閉じるボタンをクリック
  if (drawerClose) {
    drawerClose.addEventListener('click', closeDrawer);
  }

  // Escキーで閉じる
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer && drawer.classList.contains('active')) {
      closeDrawer();
    }
  });

  // ========================================
  // インストラクターモーダル
  // ========================================
  const instructorButtons = document.querySelectorAll('[data-instructor]');
  const instructorModals = document.querySelectorAll('.instructor-modal');

  instructorButtons.forEach(button => {
    button.addEventListener('click', () => {
      const instructorId = button.getAttribute('data-instructor');
      const modal = document.getElementById(instructorId);
      
      if (modal) {
        openInstructorModal(modal);
      }
    });
  });

  // インストラクターモーダルを開く
  function openInstructorModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // インストラクターモーダルを閉じる
  function closeInstructorModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // 各モーダルの閉じるボタンとオーバーレイにイベントを設定
  instructorModals.forEach(modal => {
    const closeButton = modal.querySelector('.instructor-modal__close');
    const overlay = modal.querySelector('.instructor-modal__overlay');

    if (closeButton) {
      closeButton.addEventListener('click', () => {
        closeInstructorModal(modal);
      });
    }

    if (overlay) {
      overlay.addEventListener('click', () => {
        closeInstructorModal(modal);
      });
    }

    // Escキーで閉じる
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeInstructorModal(modal);
      }
    });
  });

  // ========================================
  // スクロールに応じたアニメーション
  // ========================================
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // アニメーション対象の要素を監視
  const animateElements = document.querySelectorAll('.section-title, .lesson-card, .price-card, .blog-card, .strength-item, .info-card');
  
  animateElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
  });
});

