// Mock user data
const mockUsers = [
    { email: "user@example.com", password: "password123" }
];

// DOM Elements
const loginForm = document.getElementById('loginForm');
const logoutBtn = document.getElementById('logoutBtn');

// Check if user is logged in
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentPage = window.location.pathname.split('/').pop();
    
    // Redirect to login if not authenticated on dashboard
    if (currentPage === 'dashboard.html' && !isLoggedIn) {
        window.location.href = 'login.html';
    }
    
    // Redirect to dashboard if already logged in
    if (currentPage === 'login.html' && isLoggedIn) {
        window.location.href = 'dashboard.html';
    }
}

// Login Handler
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Simple validation
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        // Check credentials
        const user = mockUsers.find(u => u.email === email && u.password === password);
        
        if (user) {
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'dashboard.html';
        } else {
            alert('Invalid credentials');
        }
    });
}

// Logout Handler
if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'login.html';
    });
}

// Initialize carousel on home page
function initCarousel() {
    const carousel = document.getElementById('carousel');
    if (!carousel) return;
    
    const items = carousel.querySelectorAll('.carousel-item');
    let currentIndex = 0;
    
    function showItem(index) {
        items.forEach((item, i) => {
            item.style.opacity = i === index ? '1' : '0';
        });
    }
    
    function nextItem() {
        currentIndex = (currentIndex + 1) % items.length;
        showItem(currentIndex);
    }
    
    // Show first item initially
    showItem(0);
    
    // Auto-rotate every 5 seconds
    setInterval(nextItem, 5000);
}

// Initialize page when loaded
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    initCarousel();
    
    // Add active class to current page nav item
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('text-blue-600');
            link.classList.remove('text-gray-500');
        }
    });
});