// Main JavaScript File - Eman Shalabi Portfolio
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initTheme();
    initDropdownNav();
    initQuickMessage();
    initCardHover();
    initFloatingCircles();
    
    // Initialize AOS if it exists
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            offset: 120,
            once: true,
            startEvent: 'DOMContentLoaded'
        });
    }
});

// ===== THEME FUNCTIONALITY =====
function initTheme() {
    const modeToggle = document.getElementById('modeToggle');
    const dropdownModeToggle = document.getElementById('dropdownModeToggle');
    
    // Apply saved theme or default to light
    function applyTheme() {
        const savedMode = localStorage.getItem('site-mode') || 'light';
        const root = document.documentElement;
        
        if (savedMode === 'light') {
            root.classList.add('light-mode');
            // Bright blue colors for light mode
            root.style.setProperty('--primary', '#1e40af');
            root.style.setProperty('--primary-dark', '#1e3a8a');
            root.style.setProperty('--accent', '#3b82f6');
        } else {
            root.classList.remove('light-mode');
            // Darker blue colors for dark mode
            root.style.setProperty('--primary', '#60a5fa');
            root.style.setProperty('--primary-dark', '#93c5fd');
            root.style.setProperty('--accent', '#2563eb');
        }
    }
    
    // Apply theme immediately
    applyTheme();
    
    // Theme toggle functionality
    function toggleTheme() {
        const root = document.documentElement;
        const isLight = !root.classList.contains('light-mode');
        
        if (isLight) {
            root.classList.add('light-mode');
            // Bright blue colors
            root.style.setProperty('--primary', '#1e40af');
            root.style.setProperty('--primary-dark', '#1e3a8a');
            root.style.setProperty('--accent', '#3b82f6');
            localStorage.setItem('site-mode', 'light');
        } else {
            root.classList.remove('light-mode');
            // Darker blue colors
            root.style.setProperty('--primary', '#60a5fa');
            root.style.setProperty('--primary-dark', '#93c5fd');
            root.style.setProperty('--accent', '#2563eb');
            localStorage.setItem('site-mode', 'dark');
        }
        
        // Update button aria-label for accessibility
        if (modeToggle) {
            modeToggle.setAttribute('aria-label', `Switch to ${isLight ? 'dark' : 'light'} mode`);
        }
        if (dropdownModeToggle) {
            dropdownModeToggle.setAttribute('aria-label', `Switch to ${isLight ? 'dark' : 'light'} mode`);
        }
    }
    
    // Add event listeners to both theme buttons
    if (modeToggle) {
        modeToggle.addEventListener('click', toggleTheme);
        modeToggle.setAttribute('aria-label', 'Toggle theme');
    }
    
    if (dropdownModeToggle) {
        dropdownModeToggle.addEventListener('click', function() {
            toggleTheme();
            // Close dropdown after clicking theme toggle on mobile
            closeDropdown();
        });
        dropdownModeToggle.setAttribute('aria-label', 'Toggle theme');
    }
}

// ===== FLOATING BACKGROUND CIRCLES =====
function initFloatingCircles() {
    const canvas = document.getElementById("bgCircles");
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    let circles = [];
    let w, h;

    function resizeCanvas() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    function createCircles() {
        circles = [];
        for (let i = 0; i < 40; i++) {
            circles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                radius: Math.random() * 12 + 8,
                alpha: Math.random() * 0.25 + 0.05,
                speedX: (Math.random() - 0.5) * 0.4,
                speedY: (Math.random() - 0.5) * 0.4
            });
        }
    }
    createCircles();

    function animateCircles() {
        ctx.clearRect(0, 0, w, h);

        circles.forEach(c => {
            ctx.beginPath();
            ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(119, 156, 255, ${c.alpha})`;
            ctx.fill();

            c.x += c.speedX;
            c.y += c.speedY;

            if (c.x < -50) c.x = w + 50;
            if (c.x > w + 50) c.x = -50;
            if (c.y < -50) c.y = h + 50;
            if (c.y > h + 50) c.y = -50;
        });

        requestAnimationFrame(animateCircles);
    }

    animateCircles();
}

// ===== DROPDOWN NAVIGATION =====
function initDropdownNav() {
    const navToggle = document.getElementById('navToggle');
    const dropdownNav = document.getElementById('dropdownNav');
    
    if (navToggle && dropdownNav) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownNav.classList.toggle('active');
            
            // Toggle icon between bars and X
            const icon = navToggle.querySelector('i');
            if (dropdownNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                navToggle.setAttribute('aria-expanded', 'true');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.nav-toggle') && !event.target.closest('.dropdown-nav')) {
                closeDropdown();
            }
        });

        // Close dropdown when a link is clicked
        dropdownNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeDropdown);
        });
        
        function closeDropdown() {
            if (dropdownNav) {
                dropdownNav.classList.remove('active');
                const navToggle = document.getElementById('navToggle');
                if (navToggle) {
                    const icon = navToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            }
        }
    }
}

// ===== CARD HOVER EFFECTS =====
function initCardHover() {
    const cards = document.querySelectorAll('.card, .exp-card');
    
    cards.forEach(card => {
        // Set initial transition
        card.style.transition = 'all 0.3s ease';
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow)';
        });
        
        // Mobile touch support
        card.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.12)';
        });
        
        card.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'var(--shadow)';
            }, 150);
        });
    });
}

// ===== QUICK MESSAGE MODAL =====
function initQuickMessage() {
    const quickMsgBtn = document.getElementById('quickMsgBtn');
    const quickMsgModal = document.getElementById('quickMsgModal');
    const qmClose = document.getElementById('qmClose');
    const quickMsgForm = document.getElementById('quickMsgForm');
    
    if (quickMsgBtn && quickMsgModal) {
        quickMsgBtn.addEventListener('click', function() {
            quickMsgModal.classList.add('active');
        });
        
        qmClose.addEventListener('click', function() {
            quickMsgModal.classList.remove('active');
        });
        
        // Close modal when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.chat-btn') && !event.target.closest('.chat-modal')) {
                quickMsgModal.classList.remove('active');
            }
        });
        
        if (quickMsgForm) {
            quickMsgForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const formData = new FormData(quickMsgForm);
                const name = formData.get('name');
                const email = formData.get('email');
                const message = formData.get('message');
                
                const subject = encodeURIComponent(`Message from ${name}`);
                const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
                
                window.open(`mailto:Eman.shalabi.ca@gmail.com?subject=${subject}&body=${body}`, '_blank');
                
                // Reset form and close modal
                quickMsgForm.reset();
                quickMsgModal.classList.remove('active');
            });
        }
    }
}