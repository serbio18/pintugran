// Paint Calculator Logic
function calculatePaint() {
    const length = document.getElementById('length').value;
    const height = document.getElementById('height').value;
    const coats = document.getElementById('coats').value;
    
    const coveragePerGallon = 350;
    const totalSqFt = (length * height) * coats;
    const gallonsNeeded = (totalSqFt / coveragePerGallon).toFixed(1);
    
    document.getElementById('result').innerText = `Total Needed: ${gallonsNeeded} Gallons`;
}

// Color Palette Logic
const paintSchemes = [
    {wall: '#556B2F', trim: '#F5F5DC', accent: '#8B4513'},
    {wall: '#4682B4', trim: '#FFFFFF', accent: '#FFD700'},
    {wall: '#708090', trim: '#E1E1E1', accent: '#FF6347'},
    {wall: '#E6E6FA', trim: '#FFFFFF', accent: '#4B0082'}
];

function generatePalette() {
    const scheme = paintSchemes[Math.floor(Math.random() * paintSchemes.length)];
    document.getElementById('color1').style.backgroundColor = scheme.wall;
    document.getElementById('color2').style.backgroundColor = scheme.trim;
    document.getElementById('color3').style.backgroundColor = scheme.accent;
}