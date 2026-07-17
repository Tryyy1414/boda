document.addEventListener("DOMContentLoaded", () => {
    // Inicializar animación sutil de pétalos de rosa y mariposas flotantes
    initBackgroundAnimation();

    // Animación sutil de levitación para el sobre, invita a hacer clic
    gsap.to(".envelope-wrapper", {
        y: -5,
        duration: 1.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
    });

    // Evento de respaldo por si el usuario hace clic en cualquier otro lado de la pantalla primero
    document.body.addEventListener('click', function initAudio() {
        const bgMusic = document.getElementById('bg-music');
        if (bgMusic.paused) {
            bgMusic.play().catch(e => console.log("Esperando interacción para audio..."));
        }
        document.body.removeEventListener('click', initAudio);
    }, { once: true });
});

let isOpen = false; 

function abrirInvitacion() {
    if (isOpen) return;
    isOpen = true;

    // Reproducir la música de fondo al abrir el sobre
    const bgMusic = document.getElementById('bg-music');
    if (bgMusic.paused) {
        bgMusic.play().catch(err => console.log("El navegador bloqueó el audio:", err));
    }

    const tl = gsap.timeline();

    // 1. Abrir la solapa y desaparecer el sello
    tl.to(".flap", { 
        rotationX: 180, 
        duration: 0.8, 
        ease: "power2.inOut",
        onComplete: () => gsap.set(".flap", { zIndex: 1 })
    }, "start")
    
    // Desvanece el sello de cera
    .to(".seal", { 
        opacity: 0, 
        scale: 0.5, 
        duration: 0.4, 
        ease: "power1.in" 
    }, "start");

    // 2. Sacar la carta hacia arriba
    tl.to(".inner-letter", {
        y: -130, 
        scale: 1.05, 
        zIndex: 10,
        boxShadow: "0 25px 40px rgba(0,0,0,0.3)",
        duration: 0.9,
        ease: "back.out(1.2)"
    }, "-=0.2"); 

    // 3. Desvanecer la pantalla de inicio
    tl.to("#landing", {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut"
    }, "+=0.4")
    
    // 4. Preparar y mostrar la nueva pantalla (Detalles)
    .set("#landing", { display: "none" })
    .set("#details", { display: "flex", opacity: 0, y: 30 }) 
    
    // 5. Fade In ascendente de la invitación final
    .to("#details", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        onStart: () => window.scrollTo({ top: 0, behavior: 'smooth' })
    });
}

/**
 * Genera una animación sutil e interactiva de pétalos de rosa cayendo en el fondo
 */
function initBackgroundAnimation() {
    const container = document.getElementById('bg-animation-container');
    if (!container) return;

    // Paleta romántica para los pétalos
    const petalColors = ['#f4c2c2', '#e8a5b8', '#cfb160', '#f7d6de', '#e4b6c3'];
    
    // Generar Pétalos de Rosa optimizados (10 simultáneos)
    const petalCount = 10;
    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.className = 'falling-petal';
        
        const size = Math.floor(Math.random() * 10) + 14; // 14px a 24px
        const color = petalColors[Math.floor(Math.random() * petalColors.length)];
        const left = Math.random() * 95;
        const duration = Math.random() * 6 + 9; // 9s a 15s
        const delay = Math.random() * 8;
        const opacity = (Math.random() * 0.35 + 0.35).toFixed(2);
        const driftX = (Math.random() * 100 - 50).toFixed(0) + 'px';

        petal.style.left = left + '%';
        petal.style.width = size + 'px';
        petal.style.height = size + 'px';
        petal.style.setProperty('--petal-opacity', opacity);
        petal.style.setProperty('--drift-x', driftX);
        petal.style.animationDuration = duration + 's';
        petal.style.animationDelay = delay + 's';

        petal.innerHTML = `
            <svg viewBox="0 0 30 30" width="100%" height="100%" style="color: ${color}">
                <path d="M15 3 C 25 3, 28 15, 15 27 C 2 15, 5 3, 15 3 Z" fill="currentColor"/>
            </svg>
        `;
        container.appendChild(petal);
    }

    // Pausar animaciones en segundo plano para ahorrar batería y CPU
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            container.style.display = 'none';
        } else {
            container.style.display = 'block';
        }
    });
}