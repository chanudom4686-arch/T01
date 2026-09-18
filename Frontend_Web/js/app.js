/**
 * Frontend Web V.1 - Core Application Logic
 * SPA Router and UI Interaction
 */

// --- UI Interactions ---

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

// Close sidebar on mobile when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
            toggleSidebar();
        }
    });
});


// --- SPA Router ---

const routes = {
    '/': { file: 'water_balance_pond1.html', title: 'สมดุลน้ำ บ่อ 1' },
    '/weather': { file: 'weather.html', title: 'สถานีอากาศ' },
    '/river': { file: 'river.html', title: 'ระดับน้ำคลอง' },
    '/tap-water': { file: 'tap_water.html', title: 'ระดับน้ำประปา' },
    '/activity': { file: 'activity.html', title: 'บันทึกความเคลื่อนไหว' },
    '/devices': { file: 'devices.html', title: 'จัดการอุปกรณ์ IoT' },
    '/settings': { file: 'settings.html', title: 'ตั้งค่าระบบ' },
};

async function loadRoute() {
    let path = window.location.hash.replace('#', '') || '/';
    
    // Fallback if route not found
    if (!routes[path]) {
        path = '/';
    }
    
    const route = routes[path];
    const contentArea = document.getElementById('app-content');
    const pageTitle = document.getElementById('page-title');
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-path') === path) {
            link.classList.add('active');
        }
    });
    
    // Update Header
    pageTitle.innerText = route.title;
    
    // Loading State
    contentArea.innerHTML = '<div class="loading-state"><i class="fa-solid fa-spinner fa-spin"></i> Loading...</div>';
    
    try {
        // Fetch HTML Fragment
        const htmlPath = `views/${route.file}`;
        const response = await fetch(htmlPath + '?v=' + new Date().getTime());
        if (!response.ok) throw new Error('Network response was not ok');
        const html = await response.text();
        
        // Inject HTML
        contentArea.innerHTML = html;
        
        // Initialize scripts specific to the view (like charts)
        initViewLogic(path);
        
    } catch (error) {
        contentArea.innerHTML = `
            <div class="sp-card" style="border-color: #ff4d4f; color: #ff4d4f;">
                <h3><i class="fa-solid fa-triangle-exclamation"></i> Error Loading View</h3>
                <p>Could not load views/${route.file}. Make sure you are running a local server (e.g. Live Server or PHP server).</p>
            </div>
        `;
        console.error('Error loading route:', error);
    }
}

// Listen to hash changes (URL changes)
window.addEventListener('hashchange', loadRoute);

// Load initial route
document.addEventListener('DOMContentLoaded', loadRoute);


// --- View Specific Logic & Mock Data ---

function initViewLogic(path) {
    // This function runs after a view is loaded into the DOM.
    // It finds elements in the new HTML and attaches charts or data.
    
    if (path === '/weather') {
        initWeatherChart();
    } else if (path === '/river') {
        initRiverChart();
    } else if (path === '/') {
        initWaterBalanceChart();
    }
    // Add other initializers as needed
}

function initWeatherChart() {
    const ctx = document.getElementById('weatherChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['10:00', '10:05', '10:10', '10:15', '10:20', '10:25'],
            datasets: [{
                label: 'Temperature (°C)',
                data: [32.1, 32.5, 33.0, 32.8, 32.2, 31.9],
                borderColor: '#3ecf8e', // Emerald
                backgroundColor: 'rgba(62, 207, 142, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: false, grid: { color: '#ededed' } },
                x: { grid: { display: false } }
            }
        }
    });
}

function initRiverChart() {
    const ctx = document.getElementById('riverChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['10:00', '10:05', '10:10', '10:15', '10:20', '10:25'],
            datasets: [
                {
                    label: 'น้ำในคลอง (m)',
                    data: [1.2, 1.25, 1.3, 1.3, 1.28, 1.35],
                    borderColor: '#3ecf8e',
                    borderWidth: 2,
                    tension: 0.1
                },
                {
                    label: 'น้ำในบ่อ (m)',
                    data: [0.8, 0.8, 0.82, 0.85, 0.9, 0.95],
                    borderColor: '#171717',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    tension: 0.1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' }
            },
            scales: {
                y: { grid: { color: '#ededed' } },
                x: { grid: { display: false } }
            }
        }
    });
}

function initWaterBalanceChart() {
    const ctx = document.getElementById('waterBalanceChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['10:00', '10:05', '10:10', '10:15', '10:20', '10:25'],
            datasets: [
                {
                    label: 'Qin',
                    data: [1100000, 1100500, 1090000, 1085000, 1083000, 1083120],
                    borderColor: '#0dcaf0',
                    backgroundColor: 'rgba(13, 202, 240, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    yAxisID: 'y'
                },
                {
                    label: 'Qout',
                    data: [180000, 181000, 185000, 182000, 181500, 182280],
                    borderColor: '#ff4d4f',
                    backgroundColor: 'rgba(255, 77, 79, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    yAxisID: 'y'
                },
                {
                    label: 'ปริมาตรน้ำในบ่อ (m³)',
                    data: [800000, 850000, 900000, 950000, 900340, 900340],
                    borderColor: '#3ecf8e',
                    borderWidth: 3,
                    borderDash: [5, 5],
                    tension: 0.4,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { grid: { display: false } },
                y: { 
                    type: 'linear', display: true, position: 'left',
                    title: { display: true, text: 'อัตราการไหล (m³/วัน)' }
                },
                y1: {
                    type: 'linear', display: true, position: 'right',
                    title: { display: true, text: 'ปริมาตรสะสม (m³)' },
                    grid: { drawOnChartArea: false }
                }
            }
        }
    });
}
