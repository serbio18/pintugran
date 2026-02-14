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
let cart = [];

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('active');
    document.getElementById('cart-overlay').classList.toggle('active');
}

// Update the Cart Icon link in the header to open the cart
document.querySelector('.cart-link').addEventListener('click', toggleCart);

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    
    updateCartUI();
    // Open the cart automatically when someone adds an item
    if (!document.getElementById('cart-sidebar').classList.contains('active')) {
        toggleCart();
    }
}

function updateCartUI() {
    const container = document.getElementById('cart-items-container');
    const totalElement = document.getElementById('cart-total-price');
    const cartCount = document.querySelector('.cart-link'); // The 🛒 (0) in header
    
    container.innerHTML = '';
    let total = 0;
    let count = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;
        
        container.innerHTML += `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong><br>
                    <small>${item.quantity} x $${item.price.toLocaleString()}</small>
                </div>
                <button onclick="removeFromCart('${item.name}')" style="border:none; background:none; color:red; cursor:pointer;">✕</button>
            </div>
        `;
    });

    totalElement.innerText = `$${total.toLocaleString()}`;
    cartCount.innerText = `🛒 (${count})`;
    
    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-msg">Tu carrito está vacío.</p>';
    }
}

function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    // 1. Enter your WhatsApp number (International format: CountryCodeNumber)
    // For Colombia, use 57 followed by the number
    const myNumber = "573001234567"; 

    // 2. Format the message
    let message = "🎨 *NUEVO PEDIDO - TITO STYLE*\n\n";
    message += "Hola, me gustaría comprar los siguientes productos:\n\n";

    let total = 0;
    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        message += `• *${item.name}* x${item.quantity} - $${subtotal.toLocaleString()}\n`;
        total += subtotal;
    });

    message += `\n💰 *TOTAL A PAGAR: $${total.toLocaleString()}*`;
    message += "\n\n📍 _Por favor, confírmame disponibilidad y métodos de entrega._";

    // 3. URL Encode the message to make it web-safe
    const encodedMessage = encodeURIComponent(message);

    // 4. Create the final link and open it
    const whatsappURL = `https://wa.me/${myNumber}?text=${encodedMessage}`;
    
    // Open in a new tab
    window.open(whatsappURL, '_blank');
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartUI();
}

// Toggle Search Overlay
function toggleSearch() {
    const overlay = document.getElementById('search-overlay');
    if (overlay.style.display === "block") {
        overlay.style.display = "none";
    } else {
        overlay.style.display = "block";
        document.getElementById('search-input').focus();
    }
}

// Attach event listener to the Search span in header
document.querySelector('.search-link').addEventListener('click', toggleSearch);

// Basic Search Logic
function liveSearch() {
    let input = document.getElementById('search-input').value.toLowerCase();
    let cards = document.getElementsByClassName('product-card');
    
    for (let i = 0; i < cards.length; i++) {
        let title = cards[i].querySelector('h3').innerText.toLowerCase();
        if (title.includes(input)) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
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

