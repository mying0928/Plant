// 這個模組負責所有的視覺效果。

export function initializeParticleEffect() {
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: null, y: null };
        const options = { particleCount: window.innerWidth < 768 ? 80 : 150, connectDistance: 100, mouseDistance: 150, };
        class Particle { constructor() { this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height; this.size = Math.random() * 2 + 0.5; this.color = `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.7})`; } draw() { ctx.fillStyle = this.color; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); } }
        function setup() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; particles = []; for (let i = 0; i < options.particleCount; i++) { particles.push(new Particle()); } }
        function draw() { ctx.clearRect(0, 0, canvas.width, canvas.height); for (const p of particles) { p.draw(); } if (mouse.x) { for (let i = 0; i < particles.length; i++) { const p1 = particles[i]; const distToMouse = Math.hypot(p1.x - mouse.x, p1.y - mouse.y); if (distToMouse < options.mouseDistance) { for (let j = i + 1; j < particles.length; j++) { const p2 = particles[j]; const distBetweenParticles = Math.hypot(p1.x - p2.x, p1.y - p2.y); if (distBetweenParticles < options.connectDistance) { ctx.beginPath(); ctx.strokeStyle = `rgba(224, 242, 254, ${1 - distBetweenParticles / options.connectDistance})`; ctx.lineWidth = 0.4; ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke(); } } } } } }
        let animationFrameId;
        function animate() { draw(); animationFrameId = requestAnimationFrame(animate); }
        function handleMouseMove(event) { mouse.x = event.x; mouse.y = event.y; }
        function handleMouseOut() { mouse.x = null; mouse.y = null; }
        window.addEventListener('resize', () => { cancelAnimationFrame(animationFrameId); setup(); animate(); });
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseOut);
        setup(); animate();
    }
}

export function initializeHoverEffects() {
    const grid = document.getElementById('plantGrid');
    if (!grid) return;

    function applyCardTransform(e, card) {
        const image = card.querySelector('.card-image');
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xPercent = x / rect.width;
        const yPercent = y / rect.height;
        const rotateX = (yPercent - 0.5) * 2 * -8;
        const rotateY = (xPercent - 0.5) * 2 * 8;
        
        card.style.transition = 'none';
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

        if (image) {
            image.style.transition = 'none';
            const moveX = (xPercent - 0.5) * 20;
            const moveY = (yPercent - 0.5) * 20;
            image.style.transform = `scale(1.2) translateX(${moveX}px) translateY(${moveY}px)`;
        }
    }

    function resetCardTransform(card) {
        const image = card.querySelector('.card-image');
        card.style.transition = 'transform 0.4s ease-out';
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        
        if (image) {
            image.style.transition = 'transform 0.4s ease-out';
            image.style.transform = 'scale(1) translateX(0) translateY(0)';
        }
    }

    grid.addEventListener('mousemove', (e) => {
        const card = e.target.closest('.plant-card');
        if (card) {
            applyCardTransform(e, card);
        }
    });

    grid.addEventListener('mouseleave', () => {
         const allCards = grid.querySelectorAll('.plant-card');
         allCards.forEach(resetCardTransform);
    });
    
    grid.addEventListener('mouseover', (e) => {
        const currentCard = e.target.closest('.plant-card');
        const allCards = grid.querySelectorAll('.plant-card');
        allCards.forEach(card => {
            if (card !== currentCard) {
                resetCardTransform(card);
            }
        });
    });
}

