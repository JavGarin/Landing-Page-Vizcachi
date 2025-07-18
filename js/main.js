document.addEventListener('DOMContentLoaded', () => {

    // --- Animación de entrada para el texto del home ---
    const tl = gsap.timeline();

    tl.to(".main-title", {
        duration: 1.5, 
        y: 0, 
        opacity: 1, 
        ease: "power3.out",
        delay: 0.5
    })
    .to(".subtitle", {
        duration: 1.5,
        y: 0,
        opacity: 1,
        ease: "power3.out",
    }, "-=1.2")
    .to(".cta-button", {
        duration: 1,
        scale: 1,
        opacity: 1,
        ease: "back.out(1.7)"
    }, "-=0.8");

    // --- Lógica de la Barra de Progreso ---
    const currentAmount = 25; // Dato simulado
    const goalAmount = 5000;   // Tu meta

    const progressBar = document.getElementById('progress-bar');
    const currentAmountEl = document.getElementById('current-amount');
    const goalAmountEl = document.getElementById('goal-amount');

    // Actualizar los textos
    currentAmountEl.innerText = `${currentAmount.toLocaleString()}`;
    goalAmountEl.innerText = `${goalAmount.toLocaleString()}`;

    // Calcular el porcentaje
    const progressPercentage = (currentAmount / goalAmount) * 100;

    // Animar la barra cuando sea visible
    const progressSection = document.getElementById('progress');
    
    const animateProgressBar = () => {
        gsap.to(progressBar, {
            width: `${progressPercentage}%`,
            duration: 2,
            ease: 'power2.out'
        });
    };

    // Usar Intersection Observer para disparar la animación al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBar();
                observer.unobserve(entry.target); // Animar solo una vez
            }
        });
    }, { threshold: 0.5 }); // Se dispara cuando el 50% de la sección es visible

    observer.observe(progressSection);

    // --- Lógica para copiar correo --- 
    const contactButton = document.querySelector('.contact-button');
    if (contactButton) {
        contactButton.addEventListener('click', (e) => {
            e.preventDefault();
            const email = 'vizcachiapp.contact@gmail.com';
            navigator.clipboard.writeText(email).then(() => {
                // Feedback visual para el usuario
                const originalText = contactButton.innerText;
                contactButton.innerText = '¡Correo Copiado!';
                setTimeout(() => {
                    contactButton.innerText = originalText;
                }, 2000);
            }).catch(err => {
                console.error('Error al copiar el correo: ', err);
                // Opcional: abrir cliente de correo como fallback
                window.location.href = `mailto:${email}`;
            });
        });
    }

    // --- Cargar Muro de Agradecimientos ---
    async function fetchAndDisplaySupporters() {
        const wall = document.getElementById('supporters-wall');
        if (!wall) return; // Si no existe el elemento, no hacer nada

        try {
            const response = await fetch('/api/supporters');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const supporters = data.supporters || [];

            if (supporters.length === 0) {
                wall.innerHTML = '<p>¡Sé el primero en apoyar este proyecto y aparecer aquí!</p>';
                return;
            }

            // Limpiar el muro antes de añadir nuevos nombres
            wall.innerHTML = '';

            // Añadir cada donante como un chip
            supporters.forEach(name => {
                const chip = document.createElement('span');
                chip.className = 'supporter-chip';
                chip.textContent = name;
                wall.appendChild(chip);
            });

        } catch (error) {
            console.error('Error al cargar los donantes:', error);
            wall.innerHTML = '<p>No se pudo cargar la lista de donantes. Inténtalo de nuevo más tarde.</p>';
        }
    }

    // Llamar a la función para cargar los donantes
    fetchAndDisplaySupporters();

});