document.addEventListener('DOMContentLoaded', () => {

    // --- Language Switcher --- //
    const langBtn = document.getElementById('lang-btn');
    const langFlag = document.getElementById('lang-flag');
    let currentLang = localStorage.getItem('lang') || 'es';

    const translations = {
        es: {
            subtitle: 'Tecnología verde: Recicla con inteligencia, adopta una mascota digital.',
            projectTitle: 'El Proyecto',
            missionTitle: 'Nuestra Misión',
            missionText: 'Transformamos el reciclaje de pilas y baterías en una experiencia accesible y motivadora mediante inteligencia artificial para identificación precisa, geolocalización de puntos limpios y un sistema gamificado con mascotas virtuales, creando un puente efectivo entre la acción individual y el impacto colectivo. Nuestra visión es escalar este modelo para convertirlo en el estándar de economía circular, integrando progresivamente más tipos de residuos peligrosos, fortaleciendo alianzas con gobiernos y empresas, y masificando la cultura sostenible mediante tecnología intuitiva que haga del cuidado ambiental un hábito gratificante y medible. Tecnología con conciencia, planeta con futuro.',
            visionTitle: 'Visión a Futuro',
            visionText: 'Buscamos ser el referente en economía circular, uniendo tecnología avanzada y participación comunitaria para revolucionar el reciclaje. Expandiremos nuestro reconocimiento inteligente a más residuos peligrosos, formando alianzas con gobiernos y empresas para crear un ecosistema sostenible. Queremos transformar cada interacción en la app en un paso concreto hacia ciudades más limpias, donde los usuarios no solo reciclen, sino que generen impacto ambiental medible a escala global.',
            techTitle: 'Tecnología',
            techText: 'Desarrollamos la app con Flutter para garantizar multiplataforma (iOS/Android), usando Python en componentes web críticos y Firebase como backend escalable para gestión de usuarios y datos de reciclaje. Implementamos TensorFlow Lite para el reconocimiento de pilas mediante IA, junto con Google Maps API para la geolocalización de puntos limpios. Todo el sistema se complementa con herramientas de diseño como Figma y análisis de datos con BigQuery para medir impacto en tiempo real.',
            statusTitle: 'Estado Actual y Próximos Pasos',
            statusIntro: 'Este sitio web es la carta de presentación de Vizcachi.',
            statusScalable: 'El proyecto ha sido completamente planificado y diseñado para ser <strong>rentable y escalable</strong>, asegurando su crecimiento y sostenibilidad. Para más detalles, puedes consultar nuestro Pitch Deck:',
            pitchDeckButton: 'Ver Pitch Deck',
            statusFunding: 'Actualmente, estamos en la fase de <strong>búsqueda de financiamiento privado y estatal</strong>. Tu apoyo en esta etapa es crucial para demostrar el interés comunitario y fortalecer nuestras postulaciones.',
            statusPhase2: 'Fase 2:',
            statusContainers: 'contenedores de reciclaje inteligentes marca Vizcachi',
            ecoPetsTitle: 'Conoce a tus Eco-Mascotas',
            vizcachiText: '¡Una mascota curiosa y juguetona que adora el reciclaje! Obtienes a Vizcachi al completar tu primer desafío ecológico en la app. Cuídala, alimentala con frutas virtuales (que ganas interactuando y reciclando) y juega con ella para subir de nivel. Desbloquea accesorios y skins especiales (como un traje de \'Vizcachi forestal\') mientras avanzas. ¡Pronto podrás decorar su hábitat con objetos sostenibles!.',
            humboldtText: '¡Un pingüino aventurero y sabio que lucha contra el cambio climático! Obtienes a Humboldt al reciclar 10 pilas registrados en la app. Es un explorador polar que te enseñará datos curiosos sobre el medioambiente mientras lo cuidas. Alimentalo con \'peces sostenibles\' (ganados reciclando) y desbloquea outfits como \'Humboldt científico\' o \'Traje de buzo reciclador\'. Su misión: inspirarte a reducir tu huella de carbono..',
            puduText: 'Pudú ¡La mascota tierna y ecológica de Vizcachi! Desbloquéalo al reciclar pilas/baterias. Aliméntalo con \'hojas virtuales\' que ganas reciclando, juega con él y descubre sus reacciones adorables (¡hasta baila feliz!). Personalízalo con skins como su \'corona de flores\' y ayuda a regenerar su bosque virtual mientras reciclas. ¡Tu compañero perfecto para aprender sobre sostenibilidad con diversión!s.',
            howItWorksTitle: '¿Cómo Funciona Vizcachi?',
            playTitle: 'Juega y Cuida',
            playText: 'Adopta una mascota virtual. Juega con ella, aliméntala y personalízala con accesorios que ganas reciclando.',
            recycleTitle: 'Recicla y Gana Puntos',
            recycleText: 'Usa la app para encontrar puntos de reciclaje de pilas y baterías. Cada vez que reciclas, ganas puntos:',
            batteryPoints: '<strong>Pila:</strong> 25 puntos',
            cellPoints: '<strong>Batería:</strong> 50 puntos',
            redeemText: 'Acumula 1000 puntos para canjearlos por disfraces y accesorios para tu mascota.',
            supportTitle: 'Apoya al Comercio Local',
            supportText: 'Vizcachi es una plataforma B2B2C. Nos asociamos con comercios locales para que puedas canjear tus puntos por descuentos y productos reales, como un café gratis. ¡Reciclar tiene su recompensa!',
            progressTitle: 'Progreso del MVP',
            fundingInfo: 'Buscamos financiamiento para comenzar a crear el MVP (Producto Mínimo Viable). Los fondos recaudados se destinarán directamente a gastos operativos y de servicios para asegurar el desarrollo y lanzamiento de la aplicación. Aquellos que donen sobre $100 dólares recibirán acceso anticipado al MVP para que puedan registrar sus comentarios y ayudarnos a mejorar.',
            devOps: 'Desarrollo y Operaciones',
            marketing: 'Marketing y Publicidad',
            legal: 'Servicios y Gastos Legales',
            donationCTA: '¡Cada aporte cuenta! Tu donación, desde $1 dólar en adelante, nos acerca a la meta. Deja tu nick al donar y aparecerás en nuestro futuro muro de agradecimientos.',
            supportTitle2: 'Apoya Nuestro Proyecto',
            supportText2: 'Tu donación, desde 1 dólar, nos ayuda a seguir desarrollando y mejorando la aplicación Vizcachi. Cada contribución es fundamental para nuestro crecimiento y no está vinculada a recompensas en el juego.',
            donorsTitle: 'Donantes (+ $10)',
            donorsText: 'Tu nombre aparecerá en una sección especial de agradecimientos en nuestro sitio web. ¡Tu apoyo es fundamental!',
            betaTestersTitle: 'Beta Testers (+ $100)',
            betaTestersText: 'Obtén acceso exclusivo a la versión MVP de la app. Tu feedback será clave para mejorar la experiencia antes del lanzamiento oficial.',
            investorsTitle: 'Inversores y Socios',
            investorsText: 'Buscamos socios estratégicos que compartan nuestra visión. Los fondos recaudados se destinarán al desarrollo y operaciones de servicios. Contáctanos para explorar oportunidades de inversión.',
            contactButton: 'Contactar',
            teamTitle: 'Nuestro Equipo',
            creatorTitle: 'Creador y Fundador de la \'Vizcachi\' aplicación',
            readMore: 'Leer más',
            creatorText1: 'Desarrollador software y diseñador ilustrador, con experiencia en crear app utilese e intuitivas. Combino código creativo y diseño atractivo para soluciones funcionales. Apasionado por innovar y simplificar la vida digital. Siempre aprendiendo y mejorando.',
            creatorText2: 'Diseño de mascotas virtuales: Las mascotas virtuales (Vizcachi, Humboldt, Pudú, Loro Tricahue, Zorro de Darwin, Puma) son creaciones originales de mi autoría. Con tu apoyo y financiamiento, podremos desarrollar más mascotas y nuevas interacciones para enriquecer la experiencia del usuario.',
            portfolioButton: 'Mi Portafolio',
            pitchDeckButton2: 'Pitch Desk Vizcachi',
            growthPlanTitle: 'Plan de Crecimiento del Equipo',
            growthPlanText: 'Actualmente, el proyecto es impulsado por un equipo reducido. Sin embargo, con el objetivo de acelerar el desarrollo y enriquecer la plataforma, buscamos financiamiento para expandir nuestras capacidades. Los fondos obtenidos nos permitirán incorporar profesionales en áreas clave como:',
            backendDev: '<strong>Desarrollo Backend:</strong> Para construir una infraestructura robusta y escalable.',
            dataAnalysis: '<strong>Análisis de Datos:</strong> Para medir el impacto ambiental y optimizar la experiencia.',
            marketing2: '<strong>Marketing y Publicidad:</strong> Para llevar nuestra misión a una audiencia más amplia.',
            teamGrowthText: 'Cada contribución nos acerca a formar un equipo multidisciplinario que lleve a Vizcachi al siguiente nivel.',
            supportersTitle: 'Muro de Agradecimientos',
            supportersText: 'Un agradecimiento especial a quienes han impulsado este proyecto con su apoyo inicial. Cada nombre en este muro representa un paso más hacia un planeta más limpio.',
            loadMoreButton: 'Ver más comentarios',
            projectLink: 'El Proyecto',
            teamLink: 'Equipo',
            supportLink: 'Apoyar',
            comingSoon: 'próximamente',
            rightsReserved: '© 2025 Vizcachi. Todos los derechos reservados.',
            designedBy: 'Diseñado por <a href="https://javier-garin-dev.vercel.app/" target="_blank" rel="noopener noreferrer">Javier Garin</a>'
        },
        en: {
            subtitle: 'Green technology: Recycle intelligently, adopt a digital pet.',
            projectTitle: 'The Project',
            missionTitle: 'Our Mission',
            missionText: 'We transform the recycling of batteries into an accessible and motivating experience through artificial intelligence for precise identification, geolocation of clean points, and a gamified system with virtual pets, creating an effective bridge between individual action and collective impact. Our vision is to scale this model to become the standard for a circular economy, progressively integrating more types of hazardous waste, strengthening alliances with governments and companies, and massifying a sustainable culture through intuitive technology that makes environmental care a rewarding and measurable habit. Technology with conscience, a planet with a future.',
            visionTitle: 'Future Vision',
            visionText: 'We aim to be the benchmark in the circular economy, uniting advanced technology and community participation to revolutionize recycling. We will expand our intelligent recognition to more hazardous waste, forming alliances with governments and companies to create a sustainable ecosystem. We want to transform every interaction in the app into a concrete step towards cleaner cities, where users not only recycle but also generate a measurable environmental impact on a global scale.',
            techTitle: 'Technology',
            techText: 'We are developing the app with Flutter to ensure it is multiplatform (iOS/Android), using Python for critical web components and Firebase as a scalable backend for user management and recycling data. We have implemented TensorFlow Lite for AI-powered battery recognition, along with the Google Maps API for geolocating clean points. The entire system is complemented by design tools like Figma and data analysis with BigQuery to measure impact in real-time.',
            statusTitle: 'Current Status and Next Steps',
            statusIntro: 'This website is the presentation card of Vizcachi.',
            statusScalable: 'The project has been fully planned and designed to be <strong>profitable and scalable</strong>, ensuring its growth and sustainability. For more details, you can consult our Pitch Deck:',
            pitchDeckButton: 'View Pitch Deck',
            statusFunding: 'We are currently in the phase of <strong>seeking private and state funding</strong>. Your support at this stage is crucial to demonstrate community interest and strengthen our applications.',
            statusPhase2: 'Phase 2:',
            statusContainers: 'Vizcachi brand smart recycling containers',
            ecoPetsTitle: 'Meet your Eco-Pets',
            vizcachiText: 'A curious and playful pet that loves recycling! You get Vizcachi by completing your first ecological challenge in the app. Take care of it, feed it with virtual fruits (which you earn by interacting and recycling) and play with it to level up. Unlock special accessories and skins (like a \'Forest Vizcachi\' costume) as you progress. Soon you will be able to decorate its habitat with sustainable objects!.',
            humboldtText: 'An adventurous and wise penguin who fights against climate change! You get Humboldt by recycling 10 registered batteries in the app. He is a polar explorer who will teach you curious facts about the environment while you take care of him. Feed him with \'sustainable fish\' (earned by recycling) and unlock outfits like \'Scientist Humboldt\' or a \'Recycler Diver Suit\'. His mission: to inspire you to reduce your carbon footprint..',
            puduText: 'Pudú The cute and ecological pet of Vizcachi! Unlock it by recycling batteries. Feed it with \'virtual leaves\' that you earn by recycling, play with it and discover its adorable reactions (it even dances happily!). Customize it with skins like its \'flower crown\' and help regenerate its virtual forest while you recycle. Your perfect companion to learn about sustainability with fun!s.',
            howItWorksTitle: 'How does Vizcachi work?',
            playTitle: 'Play and Take Care',
            playText: 'Adopt a virtual pet. Play with it, feed it and customize it with accessories you earn by recycling.',
            recycleTitle: 'Recycle and Earn Points',
            recycleText: 'Use the app to find battery recycling points. Every time you recycle, you earn points:',
            batteryPoints: '<strong>Battery:</strong> 25 points',
            cellPoints: '<strong>Cell:</strong> 50 points',
            redeemText: 'Accumulate 1000 points to exchange them for costumes and accessories for your pet.',
            supportTitle: 'Support Local Commerce',
            supportText: 'Vizcachi is a B2B2C platform. We partner with local businesses so you can exchange your points for discounts and real products, like a free coffee. Recycling has its reward!',
            progressTitle: 'MVP Progress',
            fundingInfo: 'We are seeking funding to start creating the MVP (Minimum Viable Product). The funds raised will go directly to operational and service expenses to ensure the development and launch of the application. Those who donate over $100 will receive early access to the MVP so they can register their comments and help us improve.',
            devOps: 'Development and Operations',
            marketing: 'Marketing and Advertising',
            legal: 'Services and Legal Expenses',
            donationCTA: 'Every contribution counts! Your donation, from $1 dollar onwards, brings us closer to the goal. Leave your nick when you donate and you will appear on our future wall of thanks.',
            supportTitle2: 'Support Our Project',
            supportText2: 'Your donation, from 1 dollar, helps us to continue developing and improving the Vizcachi application. Each contribution is essential for our growth and is not linked to in-game rewards.',
            donorsTitle: 'Donors (+ $10)',
            donorsText: 'Your name will appear in a special thank you section on our website. Your support is essential!',
            betaTestersTitle: 'Beta Testers (+ $100)',
            betaTestersText: 'Get exclusive access to the MVP version of the app. Your feedback will be key to improving the experience before the official launch.',
            investorsTitle: 'Investors and Partners',
            investorsText: 'We are looking for strategic partners who share our vision. The funds raised will be used for the development and operations of services. Contact us to explore investment opportunities.',
            contactButton: 'Contact',
            teamTitle: 'Our Team',
            creatorTitle: 'Creator and Founder of the \'Vizcachi\' application',
            readMore: 'Read more',
            creatorText1: 'Software developer and illustrator designer, with experience in creating useful and intuitive apps. I combine creative code and attractive design for functional solutions. Passionate about innovating and simplifying digital life. Always learning and improving.',
            creatorText2: 'Virtual pet design: The virtual pets (Vizcachi, Humboldt, Pudú, Loro Tricahue, Zorro de Darwin, Puma) are original creations of my authorship. With your support and funding, we can develop more pets and new interactions to enrich the user experience.',
            portfolioButton: 'My Portfolio',
            pitchDeckButton2: 'Pitch Desk Vizcachi',
            growthPlanTitle: 'Team Growth Plan',
            growthPlanText: 'Currently, the project is driven by a small team. However, with the aim of accelerating development and enriching the platform, we are seeking funding to expand our capabilities. The funds obtained will allow us to incorporate professionals in key areas such as:',
            backendDev: '<strong>Backend Development:</strong> To build a robust and scalable infrastructure.',
            dataAnalysis: '<strong>Data Analysis:</strong> To measure environmental impact and optimize the experience.',
            marketing2: '<strong>Marketing and Advertising:</strong> To bring our mission to a wider audience.',
            teamGrowthText: 'Each contribution brings us closer to forming a multidisciplinary team that will take Vizcachi to the next level.',
            supportersTitle: 'Wall of Thanks',
            supportersText: 'A special thanks to those who have driven this project with their initial support. Each name on this wall represents one more step towards a cleaner planet.',
            loadMoreButton: 'Load more comments',
            projectLink: 'The Project',
            teamLink: 'Team',
            supportLink: 'Support',
            comingSoon: 'coming soon',
            rightsReserved: '© 2025 Vizcachi. All rights reserved.',
            designedBy: 'Designed by <a href="https://javier-garin-dev.vercel.app/" target="_blank" rel="noopener noreferrer">Javier Garin</a>'
        }
    };

    const setLanguage = (lang) => {
        document.documentElement.lang = lang;
        localStorage.setItem('lang', lang);
        currentLang = lang;

        if (lang === 'es') {
            langFlag.src = 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/gb.svg';
        } else {
            langFlag.src = 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/es.svg';
        }

        document.querySelectorAll('[data-key]').forEach(elem => {
            const key = elem.getAttribute('data-key');
            if (translations[lang][key]) {
                elem.innerHTML = translations[lang][key];
            }
        });
    };

    langBtn.addEventListener('click', () => {
        const newLang = currentLang === 'es' ? 'en' : 'es';
        setLanguage(newLang);
    });

    // Establecer el idioma actual al cargar la página
    setLanguage(currentLang);


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
    const goalAmount = 5000;   // Tu meta
    const progressBar = document.getElementById('progress-bar');
    const currentAmountEl = document.getElementById('current-amount');
    const goalAmountEl = document.getElementById('goal-amount');

    // Función para obtener datos y actualizar la barra de progreso
    async function updateProgressBar() {
        try {
            const response = await fetch('/api/donations/total');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const currentAmount = data.total;

            // Actualizar los textos con el signo de dólar
            currentAmountEl.innerText = `${currentAmount.toLocaleString()}`;
            goalAmountEl.innerText = `${goalAmount.toLocaleString()}`;

            // Calcular y animar el porcentaje
            const progressPercentage = (currentAmount / goalAmount) * 100;
            gsap.to(progressBar, {
                width: `${progressPercentage}%`,
                duration: 2,
                ease: 'power2.out'
            });
        } catch (error) {
            console.error("Error fetching donation total:", error);
            // Opcional: mostrar un mensaje de error en la UI
            currentAmountEl.innerText = '$0';
            goalAmountEl.innerText = `${goalAmount.toLocaleString()}`;
            progressBar.style.width = '0%';
        }
    }

    // Usar Intersection Observer para disparar la animación al hacer scroll
    const progressSection = document.getElementById('progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateProgressBar(); // Llama a la función que actualiza la barra
                // No des-observamos para que se actualice si el usuario vuelve a scrollear
            }
        });
    }, { threshold: 0.5 }); // Se dispara cuando el 50% de la sección es visible

    if (progressSection) {
        observer.observe(progressSection);
    }

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