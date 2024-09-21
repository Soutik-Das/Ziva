const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

let waveArray = [];

class Wave {
    constructor(x, y, frequency, amplitude, phase) {
        this.x = x;
        this.y = y;
        this.frequency = frequency;
        this.amplitude = amplitude;
        this.phase = phase;
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        for (let i = 0; i < canvas.width; i++) {
            ctx.lineTo(i, this.y + Math.sin(i * this.frequency + this.phase) * this.amplitude);
        }
        ctx.strokeStyle = '#E0BAC0';
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.closePath();
    }

    update() {
        this.phase += 0.02;
        this.draw();
    }
}

function init() {
    waveArray = [];
    for (let i = 0; i < canvas.height; i += 20) {
        const frequency = 0.006;
        const amplitude = 30;
        const phase = Math.random() * Math.PI * 2;
        waveArray.push(new Wave(0, i, frequency, amplitude, phase));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    waveArray.forEach(wave => wave.update());
    requestAnimationFrame(animate);
}

init();
animate();
