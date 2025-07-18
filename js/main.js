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
    const commentsPerPage = 5; // Número de comentarios a mostrar por carga
    let currentOffset = 0;
    let totalComments = 0;

    const wall = document.getElementById('supporters-wall');
    const loadMoreButton = document.getElementById('load-more-comments');

    async function fetchAndDisplayComments() {
        if (!wall) return; // Si no existe el elemento, no hacer nada

        try {
            const response = await fetch(`/api/supporters?offset=${currentOffset}&limit=${commentsPerPage}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const comments = data.comments || [];
            totalComments = data.totalComments || 0;

            if (currentOffset === 0 && comments.length === 0) {
                wall.innerHTML = '<p class="no-comments-message">¡Sé el primero en apoyar este proyecto y aparecer aquí!</p>';
                loadMoreButton.style.display = 'none';
                return;
            }

            // Renderizar los nuevos comentarios
            comments.forEach(comment => {
                const commentDiv = document.createElement('div');
                commentDiv.className = 'comment-item';
                
                const date = new Date(comment.timestamp);
                const formattedDate = date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

                commentDiv.innerHTML = `
                    <p class="comment-nick"><strong>${comment.nick}</strong></p>
                    ${comment.comment ? `<p class="comment-text">${comment.comment}</p>` : ''}
                    <span class="comment-date">${formattedDate}</span>
                `;
                wall.appendChild(commentDiv);
            });

            currentOffset += comments.length;

            // Mostrar/ocultar botón "Ver más"
            if (currentOffset < totalComments) {
                loadMoreButton.style.display = 'block';
            } else {
                loadMoreButton.style.display = 'none';
            }

        } catch (error) {
            console.error('Error al cargar los comentarios:', error);
            wall.innerHTML = '<p class="error-message">No se pudieron cargar los comentarios. Inténtalo de nuevo más tarde.</p>';
            loadMoreButton.style.display = 'none';
        }
    }

    // Event listener para el botón "Ver más"
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', fetchAndDisplayComments);
    }

    // Llamar a la función para cargar los primeros comentarios
    fetchAndDisplayComments();

});