// ===== SİTE BAŞLATMA =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 PC Parça Rehberi Başlatılıyor...');
    
    initSite();
});

// ===== ANA FONKSİYON =====
function initSite() {
    // Tüm fonksiyonları başlat
    initMobileMenu();
    initActivePage();
    initSmoothScroll();
    initCardAnimations();
    initPageTransitions();
    initHoverEffects();
    initScrollEffects();
    initBackToTop();
    initLoadAnimations();
    initClickEffects();
    
    console.log('✅ Site başarıyla başlatıldı!');
}

// ===== 1. MOBİL MENÜ =====
function initMobileMenu() {
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuBtn || !navLinks) return;
    
    // Menü butonuna tıklama
    menuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMobileMenu();
    });
    
    // Menü dışına tıklayınca kapat
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Esc tuşu ile kapat
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Menü linklerine tıklayınca kapat
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}

function toggleMobileMenu() {
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    navLinks.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    
    // Buton ikonunu değiştir
    if (navLinks.classList.contains('active')) {
        menuBtn.innerHTML = '<i class="fas fa-times"></i>';
        menuBtn.setAttribute('aria-label', 'Menüyü Kapat');
    } else {
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        menuBtn.setAttribute('aria-label', 'Menüyü Aç');
    }
}

function closeMobileMenu() {
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    navLinks.classList.remove('active');
    document.body.classList.remove('menu-open');
    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    menuBtn.setAttribute('aria-label', 'Menüyü Aç');
}

// ===== 2. AKTİF SAYFA =====
function initActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        
        // Ana sayfa kontrolü
        if ((currentPage === 'index.html' || currentPage === '') && linkPage === 'index.html') {
            link.classList.add('active');
            return;
        }
        
        // Diğer sayfalar
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ===== 3. SMOOTH SCROLL =====
function initSmoothScroll() {
    // Sayfa içi linkler için
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== 4. KART ANİMASYONLARI =====
function initCardAnimations() {
    const cards = document.querySelectorAll('.component-card');
    
    cards.forEach((card, index) => {
        // Her karta gecikmeli animasyon
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Kart hover efekti
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
        
        // Kart tıklama efekti
        card.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') return;
            
            const link = this.querySelector('a');
            if (link) {
                // Tıklama animasyonu
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                    window.location.href = link.href;
                }, 200);
            }
        });
    });
}

// ===== 5. SAYFA GEÇİŞLERİ =====
function initPageTransitions() {
    // Linklere tıklayınca geçiş efekti
    document.querySelectorAll('a').forEach(link => {
        if (link.href && link.href.includes(window.location.origin)) {
            link.addEventListener('click', function(e) {
                // Harici linkler veya yeni sekmede açılanlar için
                if (this.target === '_blank' || this.href.includes('#')) {
                    return;
                }
                
                e.preventDefault();
                const href = this.href;
                
                // Sayfa çıkış animasyonu
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.3s ease';
                
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            });
        }
    });
    
    // Sayfa yüklendiğinde animasyon
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
}

// ===== 6. HOVER EFFECTS =====
function initHoverEffects() {
    // Buton hover efekti
    document.querySelectorAll('.btn, .nav-btn').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Navbar link hover efekti
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.backgroundColor = '';
            }
        });
    });
}

// ===== 7. SCROLL EFFECTS =====
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        // Navbar scroll efekti
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            navbar.style.backgroundColor = '';
        }
        
        // Scroll animasyonları
        animateOnScroll();
    });
}

// ===== 8. BACK TO TOP BUTTONU =====
function initBackToTop() {
    // Butonu oluştur
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Yukarı Çık');
    document.body.appendChild(backToTopBtn);
    
    // CSS ekle
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: #000000;
            color: white;
            border: 2px solid #333333;
            border-radius: 50%;
            cursor: pointer;
            display: none;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            z-index: 1000;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }
        
        .back-to-top:hover {
            background: #333333;
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }
        
        .back-to-top.show {
            display: flex;
            animation: fadeIn 0.3s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Scroll kontrolü
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Tıklama olayı
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== 9. YÜKLEME ANİMASYONLARI =====
function initLoadAnimations() {
    // Sayfa yüklendiğinde
    window.addEventListener('load', function() {
        // Hero animasyonu
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.animation = 'fadeIn 1s ease';
        }
        
        // Kartları sırayla göster
        const cards = document.querySelectorAll('.component-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    });
}

// ===== 10. TIKLAMA EFFECTS =====
function initClickEffects() {
    // Ripple efekti için
    document.addEventListener('click', function(e) {
        // Butonlara ripple efekti
        if (e.target.closest('.btn, .nav-btn')) {
            createRipple(e, e.target.closest('.btn, .nav-btn'));
        }
        
        // Kartlara ripple efekti
        if (e.target.closest('.component-card')) {
            createRipple(e, e.target.closest('.component-card'));
        }
    });
}

function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        top: ${y}px;
        left: ${x}px;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Ripple animasyonu için CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ===== 11. SCROLL ANİMASYON FONKSİYONU =====
function animateOnScroll() {
    const elements = document.querySelectorAll('.scroll-animate');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100 && elementBottom > 0) {
            element.classList.add('animated');
        }
    });
}

// ===== 12. RESPONSIVE DETECT =====
function detectMobile() {
    return window.innerWidth <= 768;
}

// ===== 13. PERFORMANS OPTİMİZASYONU =====
// Scroll event throttle
let scrollTimeout;
window.addEventListener('scroll', function() {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(function() {
            scrollTimeout = null;
            // Scroll ile yapılacak işlemler
        }, 100);
    }
});

// ===== 14. HATA YÖNETİMİ =====
window.addEventListener('error', function(e) {
    console.error('Site hatası:', e.error);
});

// ===== 15. ONLINE/OFFLINE DETECT =====
window.addEventListener('online', function() {
    showNotification('🟢 İnternet bağlantısı aktif', 'success');
});

window.addEventListener('offline', function() {
    showNotification('🔴 İnternet bağlantısı kesildi', 'error');
});

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#4CAF50' : '#F44336'};
        color: white;
        border-radius: 5px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// SlideOut animasyonu için CSS
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyle);

// ===== 16. LOCAL STORAGE =====
function saveUserPreference(key, value) {
    try {
        localStorage.setItem(`pcparca_${key}`, value);
    } catch (e) {
        console.warn('LocalStorage erişilemiyor:', e);
    }
}

function getUserPreference(key) {
    try {
        return localStorage.getItem(`pcparca_${key}`);
    } catch (e) {
        return null;
    }
}

// ===== 17. PAGE VISIT COUNTER =====
function trackPageVisit() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    const visits = parseInt(getUserPreference(`visits_${page}`)) || 0;
    saveUserPreference(`visits_${page}`, visits + 1);
    
    console.log(`📊 ${page} sayfası ziyaret sayısı: ${visits + 1}`);
}

// Sayfa yüklendiğinde ziyaret say
trackPageVisit();

// ===== 18. KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', function(e) {
    // Ctrl + / tuş kombinasyonu ile konsol aç
    if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        console.log('🎮 Klavye kısayolları:');
        console.log('• ESC: Menüyü kapat');
        console.log('• Home: Sayfa başına git');
        console.log('• End: Sayfa sonuna git');
    }
    
    // Home tuşu ile sayfa başına git
    if (e.key === 'Home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // End tuşu ile sayfa sonuna git
    if (e.key === 'End') {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
});

// ===== 19. PAGE LOAD TIME =====
const pageLoadTime = Date.now() - performance.timing.navigationStart;
console.log(`⏱️ Sayfa yüklenme süresi: ${pageLoadTime}ms`);

// ===== 20. SERVICE WORKER (İleri Seviye) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').catch(function(error) {
            console.log('Service Worker kaydı başarısız:', error);
        });
    });
}

// ===== ÇIKIŞ ANİMASYONU =====
window.addEventListener('beforeunload', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.2s ease';
});

console.log('🎯 JavaScript hazır! Site interaktif hale getirildi.');
// PC Toplama sayfası özellikleri
function initPCToplama() {
    // SSS aç/kapat
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            this.parentElement.classList.toggle('active');
        });
    });
    
    // Konfigürasyon kartlarına hover efekti
    document.querySelectorAll('.config-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// initSite fonksiyonuna ekle
function initSite() {
    // ... diğer fonksiyonlar ...
    
    // PC Toplama sayfası özellikleri
    if (document.querySelector('.steps-container')) {
        initPCToplama();
    }
}