// تحديد لون الجسيمات بناءً على وضع النظام
const particleColor = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches 
    ? '#0e56b4' 
    : '#333';   

particlesJS('particles-js', {
    particles: {
        number: { value: 100 },
        color: { value: particleColor },
        shape: { type: 'circle' },
        opacity: { value: 0.5 },
        size: { value: 3 },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false,
        },
        line_linked: {
            enable: true,
            distance: 150,  // المسافة التي عندها يتصل الجسيمان
            color: particleColor,  // لون الخطوط
            opacity: 0.4,  // شفافية الخطوط
            width: 1  // سمك الخط
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: { enable: true, mode: 'repulse' },
            onclick: { enable: true, mode: 'push' },
            resize: true
        }
    },
    retina_detect: true
});



  window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });









// الحصول على العنصر الذي يمثل التبديل
const themeSwitch = document.querySelector('.theme-switch__checkbox');

// التحقق من الحالة الحالية في LocalStorage وتعيين الوضع الحالي
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
  document.querySelector('.navbar').classList.add('dark-mode');
  document.querySelector('.nav-links').classList.add('dark-mode');
  themeSwitch.checked = true; // تفعيل التبديل إذا كان في وضع الـ Dark Mode
} else {
  document.body.classList.remove('dark-mode');
  document.querySelector('.navbar').classList.remove('dark-mode');
  document.querySelector('.nav-links').classList.remove('dark-mode');
  themeSwitch.checked = false; // التأكد من أن التبديل غير مفعل في الوضع الفاتح
}

// التحقق من الحالة الحالية و تفعيل/إلغاء تفعيل وضع الـ Dark Mode
themeSwitch.addEventListener('change', function () {
  const isDarkMode = themeSwitch.checked; // تحقق مما إذا كانت الـ checkbox مفعلّة

  // إضافة أو إزالة الكلاس 'dark-mode' من الـ body و navbar و nav-links
  document.body.classList.toggle('dark-mode', isDarkMode);
  document.querySelector('.navbar').classList.toggle('dark-mode', isDarkMode);
  document.querySelector('.nav-links').classList.toggle('dark-mode', isDarkMode);

  // حفظ الحالة في LocalStorage
  if (isDarkMode) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});






function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    
    // إضافة/إزالة الكلاس 'show' لتفعيل أو إخفاء القائمة
    navLinks.classList.toggle('show');
  }





  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    document.getElementById('underline').style.width = scrollPercent + '%';
});






// تحديد جميع العناصر التي تحتوي على الكلاسات e-card و card
const cards = document.querySelectorAll('.e-card, .card');

// إنشاء المراقب
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.3 });

// تفعيل المراقبة على العناصر المحددة
cards.forEach(card => {
  observer.observe(card);
});




// منع النقر بزر الماوس الأيمن
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();  // منع النقر بزر الماوس الأيمن
  });
  
  // منع اختصارات لوحة المفاتيح F12 و Ctrl+Shift+I
  document.addEventListener('keydown', function(e) {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
      e.preventDefault();  // منع فتح Developer Tools
    }
  });
  
  // منع التفاعل مع أدوات المطور
  (function() {
    let devtools = /./;
    devtools.toString = function() {
      this.open = true;
      return 'devtools';
    };
    setInterval(function() {
      console.log(devtools); // محاولة منع المتصفح من اكتشاف الـ DevTools
    }, 1000);
  })();

  // منع فتح DevTools بالفأرة أو الكيبورد
document.addEventListener('keydown', function (e) {
  if (
    e.key === 'F12' ||
    (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
    (e.ctrlKey && e.key === 'U')
  ) {
    e.preventDefault();
    window.location.href = "https://www.google.com"; // إعادة التوجيه أو الخروج
  }
});

// محاولة كشف فتح DevTools عن طريق قياس حجم النافذة
let checkDevTools = setInterval(() => {
  if (window.outerWidth - window.innerWidth > 100 || window.outerHeight - window.innerHeight > 100) {
    window.location.href = "https://www.google.com"; // إعادة التوجيه أو الخروج
  }
}, 1000);

// منع كليك يمين
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});




(function() {
  let devtoolsOpen = false;

  const threshold = 160; // قيمة تقريبية

  function detectDevTools() {
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;

    if (widthThreshold || heightThreshold) {
      if (!devtoolsOpen) {
        devtoolsOpen = true;
        alert('تم اكتشاف فتح أدوات المطور، سيتم خروجك من الموقع.');
        // تحويل المستخدم لصفحة أخرى أو إغلاق التبويب
        window.location.href = 'about:blank'; // أو window.close();
      }
    } else {
      devtoolsOpen = false;
    }
  }

  window.addEventListener('resize', detectDevTools);
  setInterval(detectDevTools, 1000); // تحقق كل ثانية
})();



  


  


