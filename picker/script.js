const fileInput = document.getElementById('file-input');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('color-picker');
const colorHex = document.getElementById('color-hex');
const colorHsl = document.getElementById('color-hsl');
const colorRgb = document.getElementById('color-rgb');

fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const img = new Image();
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        };
        img.src = URL.createObjectURL(file);
    }
});

canvas.addEventListener('mousemove', function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const r = pixel[0];
    const g = pixel[1];
    const b = pixel[2];
    
    const hex = rgbToHex(r, g, b);
    const hsl = rgbToHsl(r, g, b);
    
    colorHex.textContent = `HEX: ${hex}`;
    colorHsl.textContent = `HSL: (${hsl.h.toFixed(1)}°, ${hsl.s.toFixed(1)}%, ${hsl.l.toFixed(1)}%)`;
    colorRgb.textContent = `RGB: (${r}, ${g}, ${b})`;
    
    colorPicker.style.backgroundColor = hex;
    colorPicker.style.left = `${event.clientX - rect.left}px`;
    colorPicker.style.top = `${event.clientY - rect.top}px`;
});

function rgbToHex(r, g, b) {
    return `#${[r, g, b].map(x =>
        x.toString(16).padStart(2, '0')
    ).join('').toUpperCase()}`;
}

function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
}