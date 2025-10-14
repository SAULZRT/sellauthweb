// ==================================================
// 🌟 SCRIPT PROFESIONAL PARA WEB DE VENTA — DarKlinca Future
// ==================================================

// ─── 1. PRELOADER CON ANIMACIÓN SUAVE ───────────────────────
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('fade-out');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 300);
    }, 600);
  }
});

// ─── 2. TYPWRITER EFFECT EN EL HERO ─────────────────────────
const typewriter = (text, elementId, speed = 80) => {
  const el = document.getElementById(elementId);
  if (!el) return;
  let i = 0;
  el.textContent = '';
  const type = () => {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  };
  type();
};

// Inicia el efecto si existe el contenedor
if (document.querySelector('.hero h1 .dynamic')) {
  const staticPart = "Bot de Discord Profesional<br>con ";
  const dynamicText = "Java & Spring Boot";
  document.querySelector('.hero h1').innerHTML = staticPart + '<span class="dynamic"></span>';
  window.addEventListener('load', () => {
    setTimeout(() => typewriter(dynamicText, 'typewriter-text'), 800);
  });
}

// ─── 3. SCROLL ANIMATIONS (INTERSECTION OBSERVER) ──────────
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

document.querySelectorAll('.card, .plan, .features h2, .demo, .contact').forEach(el => {
  el.classList.add('animate-out');
  observer.observe(el);
});

// Estilos CSS para animaciones (se inyectan si no existen)
const style = document.createElement('style');
style.textContent = `
  .animate-out {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .animate-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);

// ─── 4. BOTÓN "VOLVER ARRIBA" ───────────────────────────────
const createBackToTop = () => {
  const btn = document.createElement('button');
  btn.innerHTML = '↑';
  btn.id = 'back-to-top';
  btn.style.cssText = `
    position: fixed; bottom: 20px; right: 20px; width: 50px; height: 50px;
    background: var(--accent); color: #000; border: none; border-radius: 50%;
    font-size: 1.4rem; cursor: pointer; opacity: 0; visibility: hidden;
    transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(0,240,255,0.4);
    z-index: 1000;
  `;
  document.body.appendChild(btn);

  const toggleVisibility = () => {
    if (window.scrollY > 500) {
      btn.style.opacity = '1';
      btn.style.visibility = 'visible';
    } else {
      btn.style.opacity = '0';
      btn.style.visibility = 'hidden';
    }
  };

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', toggleVisibility);
};

createBackToTop();

// ─── 5. MODO OSCURO / CLARO ─────────────────────────────────
const initThemeToggle = () => {
  const toggle = document.createElement('button');
  toggle.textContent = '🌓';
  toggle.id = 'theme-toggle';
  toggle.title = 'Cambiar tema';
  toggle.style.cssText = `
    background: transparent; border: none; font-size: 1.5rem; cursor: pointer;
    color: var(--text); width: 40px; height: 40px;
  `;

  // Insertar en header
  const headerContainer = document.querySelector('header .container');
  if (headerContainer) headerContainer.appendChild(toggle);

  const setTheme = (theme) => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme);

  toggle.addEventListener('click', () => {
    const current = document.body.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });
};

initThemeToggle();

// Añadir estilos dinámicos para modo claro
const lightThemeStyles = document.createElement('style');
lightThemeStyles.textContent = `
  body[data-theme="light"] {
    --bg: #ffffff;
    --text: #121212;
    --card-bg: #f9f9fb;
    --border: #e0e0e8;
    --accent: #0066cc;
  }
  body[data-theme="light"] .back-to-top {
    background: #333;
    color: white;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  }
  body[data-theme="light"] header {
    background: rgba(255,255,255,0.9);
    backdrop-filter: blur(10px);
  }
  body[data-theme="light"] nav a,
  body[data-theme="light"] .logo {
    color: #121212;
  }
`;
document.head.appendChild(lightThemeStyles);

// ─── 6. FORMULARIO DE CONTACTO CON VALIDACIÓN ───────────────
document.getElementById('contact-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  // Validación básica
  const email = form.email.value;
  if (!email || !email.includes('@')) {
    alert('Por favor, introduce un email válido.');
    return;
  }

  // Evitar doble envío
  if (submitBtn.disabled) return;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando...';

  try {
    // ⚠️ Reemplaza TU_FORMSPREE_ID por tu endpoint real de Formspree
    const response = await fetch('https://formspree.io/f/TU_FORMSPREE_ID', {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });

    if (response.ok) {
      alert('¡Mensaje enviado! Te responderé pronto.');
      form.reset();
    } else {
      throw new Error('Error al enviar');
    }
  } catch (err) {
    alert('Hubo un problema. Escríbeme directamente a darklinca@gmail.com');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
});

// ─── 7. CONTADOR ANIMADO (clientes satisfechos) ─────────────
const animateCounter = (element, target, duration = 2000) => {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.ceil(start) + '+';
    }
  }, 16);
};

// Si tienes un elemento con id="satisfied-clients", lo anima al hacer scroll
const counterEl = document.getElementById('satisfied-clients');
if (counterEl) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(counterEl, 250); // Ej: 250 clientes
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counterObserver.observe(counterEl);
}

// === MODAL DE COMPRA MODERNO ===
const modal = document.getElementById('purchase-modal');
const closeModalBtn = document.getElementById('close-modal');
const purchaseForm = document.getElementById('purchase-form');
const selectedPlanInput = document.getElementById('selected-plan');
const modalPlanSpan = document.getElementById('modal-plan');

// Abrir modal al hacer clic en cualquier botón de compra
document.querySelectorAll('.btn.primary, .btn.secondary').forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    const planCard = this.closest('.plan');
    const planName = planCard?.querySelector('h3')?.textContent || 'Pro';
    
    modalPlanSpan.textContent = planName;
    selectedPlanInput.value = planName;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Evita scroll en fondo
  });
});

// Cerrar modal
const closeModal = () => {
  modal.classList.remove('active');
  document.body.style.overflow = ''; // Restaura scroll
  purchaseForm.reset();
};

closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// Enviar formulario
purchaseForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const plan = selectedPlanInput.value;

  if (!name || !email || !plan) {
    alert('Por favor, completa todos los campos.');
    return;
  }

  if (!email.includes('@')) {
    alert('Por favor, introduce un email válido.');
    return;
  }

  const submitBtn = purchaseForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando...';

  try {
    const response = await fetch('/api/notify-discord', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, plan })
    });

    const result = await response.json();
    
    if (response.ok) {
      alert('¡Gracias! 🎉\nHe recibido tu solicitud. Te contactaré pronto por email o Discord.');
      closeModal();
    } else {
      throw new Error(result.error || 'Error desconocido');
    }
  } catch (err) {
    console.error(err);
    alert('Hubo un problema. Por favor, escríbeme a darklinca@gmail.com');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
});

// ─── 9. LAZY LOADING (para futuras imágenes) ────────────────
const lazyLoad = () => {
  const lazyImages = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => imageObserver.observe(img));
};

// Ejecutar si hay imágenes lazy
if (document.querySelectorAll('img[data-src]').length > 0) {
  lazyLoad();
}

// ─── 10. ANALYTICS LIGERO (OPCIONAL) ────────────────────────
// Descomenta si quieres trackear eventos (ej. con Plausible, GoatCounter, etc.)
/*
window.plausible = window.plausible || function() {
  (window.plausible.q = window.plausible.q || []).push(arguments);
};
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => {
    plausible('ButtonClick', { props: { text: btn.textContent } });
  });
});
*/
// Cargar planes desde el backend
const loadPlans = async () => {
  try {
    const res = await fetch('/api/plans');
    const plans = await res.json();
    
    const container = document.getElementById('plans-container');
    container.innerHTML = `
      <div class="plans">
        ${plans.map(plan => `
          <div class="plan ${plan.popular ? 'featured' : ''}">
            ${plan.popular ? '<div class="popular">¡Más popular!</div>' : ''}
            <h3>${plan.name}</h3>
            <div class="price">€${plan.price}<span>/mes</span></div>
            <ul>
              ${plan.features.map(f => `<li>${f}</li>`).join('')}
            </ul>
            <button class="btn ${plan.popular ? 'primary' : 'secondary'}" data-plan="${plan.name}">Comprar</button>
          </div>
        `).join('')}
      </div>
    `;
    
    // Re-vincular los botones de compra
    document.querySelectorAll('[data-plan]').forEach(btn => {
      btn.addEventListener('click', () => {
        const plan = btn.getAttribute('data-plan');
        document.getElementById('modal-plan').textContent = plan;
        document.getElementById('selected-plan').value = plan;
        document.getElementById('purchase-modal').classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });
  } catch (err) {
    document.getElementById('plans-container').innerHTML = 'No se pudieron cargar los planes.';
  }
};

// Ejecutar al cargar la página
if (document.getElementById('plans-container')) {
  loadPlans();
}
// Cargar testimonios
const loadTestimonials = async () => {
  try {
    const res = await fetch('/api/get-testimonials');
    const data = await res.json();
    
    const container = document.getElementById('testimonials-container');
    container.innerHTML = data.map(t => `
      <div class="card" style="margin:1.5rem auto; max-width:600px; text-align:left;">
        <p>"${t.message}"</p>
        <p><strong>${t.name}</strong> — ${t.server}</p>
      </div>
    `).join('');
  } catch (err) {
    document.getElementById('testimonials-container').innerHTML = 'No hay testimonios.';
  }
};

// Ejecutar al cargar
if (document.getElementById('testimonials-container')) {
  loadTestimonials();
}
console.log('✅ Web cargada con funcionalidades profesionales — DarKlinca Future');