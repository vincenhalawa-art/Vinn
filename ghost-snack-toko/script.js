// Password untuk login
const PASSWORD = 'hantu123';

// Data produk jajanan
const products = [
    {
        id: 1,
        name: 'Keripik Hantu Pedas',
        price: 15000,
        image: '🌶️',
        brand: 'GhostCrunch',
        composition: 'Kentang, cabe hantu, garam mistis',
        halal: true,
        expired: '2025-12-31'
    },
    {
        id: 2,
        name: 'Permen Arwah',
        price: 8000,
        image: '🍬',
        brand: 'SoulSweet',
        composition: 'Gula, pewarna supernatural, essence hantu',
        halal: true,
        expired: '2025-11-15'
    },
    {
        id: 3,
        name: 'Coklat Kuburan',
        price: 25000,
        image: '🍫',
        brand: 'GraveChoco',
        composition: 'Coklat hitam, almond, misteri',
        halal: false,
        expired: '2025-10-30'
    },
    {
        id: 4,
        name: 'Kacang Sangkar',
        price: 12000,
        image: '🥜',
        brand: 'PhantomNuts',
        composition: 'Kacang, garam, bumbu gaib',
        halal: true,
        expired: '2025-12-20'
    },
    {
        id: 5,
        name: 'Wafer Wraith',
        price: 18000,
        image: '🍪',
        brand: 'WraithWafers',
        composition: 'Tepung, gula, vanila hantu',
        halal: true,
        expired: '2025-09-15'
    },
    {
        id: 6,
        name: 'Chips Setan',
        price: 20000,
        image: '🔥',
        brand: 'DevilChips',
        composition: 'Ubi, sambal neraka, minyak panas',
        halal: true,
        expired: '2025-11-30'
    }
];

// State
let currentPage = 'home';
let filteredProducts = [...products];
let salesData = [120, 190, 300, 500, 200, 300, 400];

// DOM Elements
const loginScreen = document.getElementById('loginScreen');
const mainApp = document.getElementById('mainApp');
const passwordInput = document.getElementById('passwordInput');
const loginBtn = document.getElementById('loginBtn');
const errorMsg = document.getElementById('errorMsg');
const logoutBtn = document.getElementById('logoutBtn');
const navBtns = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page');
const searchInput = document.getElementById('searchInput');
const productsGrid = document.getElementById('productsGrid');

// Chart
let salesChart;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initLogin();
    initNavigation();
    initSearch();
    // initDashboard();
});

// Login functionality
function initLogin() {
    loginBtn.addEventListener('click', handleLogin);
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleLogin();
        }
    });
}

function handleLogin() {
    const password = passwordInput.value;
    if (password === PASSWORD) {
        loginScreen.style.display = 'none';
        mainApp.style.display = 'block';
        initDashboard();
        animateLoginSuccess();
    } else {
        showError('Password salah! Coba lagi 👻');
        passwordInput.value = '';
        passwordInput.focus();
    }
}

function showError(message) {
    errorMsg.textContent = message;
    errorMsg.style.display = 'block';
    setTimeout(() => {
        errorMsg.style.display = 'none';
    }, 3000);
}

function animateLoginSuccess() {
    document.body.style.transition = 'all 1s ease';
    document.body.style.background = 'linear-gradient(45deg, #0f0f23, #1a0033, #330066)';
}

// Navigation
function initNavigation() {
    navBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const page = this.dataset.page;
            switchPage(page);
        });
    });
    
    logoutBtn.addEventListener('click', function() {
        mainApp.style.display = 'none';
        loginScreen.style.display = 'flex';
        passwordInput.value = '';
        passwordInput.focus();
    });
}

function switchPage(page) {
    // Update nav buttons
    navBtns.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-page="${page}"]`).classList.add('active');
    
    // Update pages
    pages.forEach(p => p.classList.remove('active'));
    document.getElementById(page + 'Page').classList.add('active');
    
    currentPage = page;
    
    // Load content
    if (page === 'products') {
        renderProducts(filteredProducts);
    } else if (page === 'dashboard') {
        updateDashboard();
    }
}

// Search functionality
function initSearch() {
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(query) ||
            product.brand.toLowerCase().includes(query)
        );
        if (currentPage === 'products') {
            renderProducts(filteredProducts);
        }
    });
}

// Render products
function renderProducts(productsList) {
    productsGrid.innerHTML = '';
    
    productsList.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const isExpired = new Date(product.expired) < new Date();
    
    card.innerHTML = `
        <div class="product-image">${product.image}</div>
        <div class="product-name">${product.name}</div>
        <div class="product-price">Rp ${product.price.toLocaleString()}</div>
        <div class="product-info">
            <strong>Merek:</strong> ${product.brand}<br>
            <strong>Komposisi:</strong> ${product.composition}
        </div>
        <div style="margin-bottom: 1rem;">
            ${product.halal ? 
                '<span class="halal-badge">✅ HALAL</span>' : 
                '<span class="halal-badge expired-badge">❌ Tidak Halal</span>'
            }
            ${isExpired ? 
                '<span class="halal-badge expired-badge">⏰ EXPIRED</span>' : 
                `<span class="halal-badge">📅 ${new Date(product.expired).toLocaleDateString('id-ID')}</span>`
            }
        </div>
        <button class="add-to-cart" onclick="addToCart(${product.id})">
            🛒 Tambah ke Keranjang
        </button>
    `;
    
    return card;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    // Simulate cart addition
    alert(`✅ ${product.name} ditambahkan ke keranjang!`);
}

// Dashboard
function initDashboard() {
    const ctx = document.getElementById('salesChart').getContext('2d');
    salesChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul'],
            datasets: [{
                label: 'Penjualan (Rp)',
                data: salesData,
                borderColor: '#ff00ff',
                backgroundColor: 'rgba(255, 0, 255, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { color: '#fff' },
                    grid: { color: 'rgba(255,255,255,0.1)' }
                },
                x: {
                    ticks: { color: '#fff' },
                    grid: { color: 'rgba(255,255,255,0.1)' }
                }
            },
            plugins: {
                legend: {
                    labels: { color: '#fff' }
                }
            }
        }
    });
    
    updateDashboard();
}

function updateDashboard() {
    document.getElementById('totalSales').textContent = 'Rp ' + 
        products.reduce((sum, p) => sum + p.price * 10, 0).toLocaleString();
    document.getElementById('totalProducts').textContent = products.length;
    document.getElementById('halalProducts').textContent = 
        products.filter(p => p.halal).length;
}

// Auto-login animation after 3 seconds (demo)
setTimeout(() => {
    if (loginScreen.style.display !== 'none') {
        passwordInput.value = PASSWORD;
        handleLogin();
    }
}, 3000);