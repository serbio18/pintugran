/**
 * TITO STYLE - Main Application Logic
 * 1. Google Maps Store Locator
 * 2. Paint Coverage Calculator
 * 3. Color Palette Generator
 * 4. UI/UX Interactions (Add to Cart, Scroll)
 */

// --- 1. GOOGLE MAPS STORE LOCATOR ---
let map;
const stores = [
    { name: "Sede Principal Bogotá", lat: 4.6097, lng: -74.0817, address: "Calle 12 # 34-56" },
    { name: "Sede Medellín", lat: 6.2442, lng: -75.5812, address: "Av. El Poblado # 10-20" }
];

function initMap() {
    // Check if map container exists to avoid errors on other pages
    const mapElement = document.getElementById("map");
    if (!mapElement) return;

    const bogota = { lat: 4.6097, lng: -74.0817 };
    
    map = new google.maps.Map(mapElement, {
        zoom: 12,
        center: bogota,
        styles: [
            { "featureType": "administrative", "elementType": "all", "stylers": [{ "saturation": "-100" }] },
            { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] },
            { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 45 }] },
            { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#004a99" }, { "visibility": "on" }] }
        ]
    });

    // Add Markers for all stores
    stores.forEach(store => {
        new google.maps.Marker({
            position: { lat: store.lat, lng: store.lng },
            map: map,
            title: store.name,
            icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        });
    });
}

// Function to move map when store is clicked in sidebar
function centerMap(lat, lng) {
    if (map) {
        const newPos = { lat: lat, lng: lng };
        map.setCenter(newPos);
        map.setZoom(15);
        document.getElementById('map').scrollIntoView({ behavior: 'smooth' });
    }
}

// --- 2. PAINT COVERAGE CALCULATOR ---
function calculatePaint() {
    const length = parseFloat(document.getElementById('length').value);
    const height = parseFloat(document.getElementById('height').value);
    const resultElement = document.getElementById('result');
    
    if (!length || !height || length <= 0 || height <= 0) {
        alert("Por favor ingrese dimensiones válidas (Ancho y Alto).");
        return;
    }

    // Standard Coverage: 1 Gallon covers ~32 square meters per coat
    const coveragePerGallon = 32; 
    const area = length * height;
    const gallonsNeeded = (area / coveragePerGallon).toFixed(2);
    
    resultElement.style.color = "#e31e24"; // Highlight result in brand red
    resultElement.innerText = `Necesitas aproximadamente: ${gallonsNeeded} Galones (por capa)`;
}

// --- 3. COLOR PALETTE GENERATOR ---
const paintSchemes = [
    { wall: '#556B2F', trim: '#F5F5DC', accent: '#8B4513', name: 'Bosque Profundo' },
    { wall: '#4682B4', trim: '#FFFFFF', accent: '#FFD700', name: 'Cielo Nórdico' },
    { wall: '#708090', trim: '#E1E1E1', accent: '#FF6347', name: 'Gris Urbano' },
    { wall: '#E6E6FA', trim: '#FFFFFF', accent: '#4B0082', name: 'Atardecer Lavanda' },
    { wall: '#004a99', trim: '#f1f2f6', accent: '#e31e24', name: 'Tito Pabón Classic' }
];

function generatePalette() {
    const scheme = paintSchemes[Math.floor(Math.random() * paintSchemes.length)];
    
    // Check if elements exist before styling
    const c1 = document.getElementById('color1');
    const c2 = document.getElementById('color2');
    const c3 = document.getElementById('color3');

    if (c1 && c2 && c3) {
        c1.style.backgroundColor = scheme.wall;
        c2.style.backgroundColor = scheme.trim;
        c3.style.backgroundColor = scheme.accent;
        console.log(`Cargado el esquema: ${scheme.name}`);
    }
}

// --- 4. SHOPPING & UI INTERACTIONS ---
function addToCart() {
    // This replicates the "Tito Pabón" experience of a toast notification
    const notification = document.createElement('div');
    notification.innerText = "✓ Producto añadido al carrito";
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #27ae60;
        color: white;
        padding: 12px 24px;
        border-radius: 4px;
        font-weight: bold;
        z-index: 9999;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Trigger a small attention-getter for WhatsApp after 5 seconds
window.addEventListener('load', () => {
    setTimeout(() => {
        const waButton = document.querySelector('.whatsapp-float');
        if (waButton) {
            waButton.style.transform = "scale(1.2)";
            setTimeout(() => { waButton.style.transform = "scale(1)"; }, 300);
        }
    }, 5000);
})

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

