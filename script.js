document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-menu a');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  // Função para atualizar o item ativo no menu
  function updateActiveLink() {
    navLinks.forEach(link => {
      const linkHref = link.getAttribute('href');
      if (linkHref === currentPage) {
        link.classList.add('active');
        // Adiciona um atraso para a animação de pulso
        setTimeout(() => {
          link.style.animation = 'pulse 2s infinite';
        }, 300);
      } else {
        link.classList.remove('active');
        link.style.animation = 'none';
      }
    });
  }

  // Inicializa o estado ativo
  updateActiveLink();

  // Adiciona efeito de clique suave
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Atualiza o item ativo
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      
      // Adiciona efeito de clique
      const ripple = document.createElement('span');
      const rect = link.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size/2}px`;
      ripple.style.top = `${e.clientY - rect.top - size/2}px`;
      ripple.classList.add('ripple');
      
      link.appendChild(ripple);
      
      // Remove o efeito após a animação
      setTimeout(() => {
        ripple.remove();
      }, 1000);
      
      // Navegação suave para âncoras
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Efeito de hover com delay
  navLinks.forEach(link => {
    let hoverTimeout;
    
    link.addEventListener('mouseenter', () => {
      clearTimeout(hoverTimeout);
      hoverTimeout = setTimeout(() => {
        link.style.transform = 'translateY(-3px)';
        link.style.transition = 'transform 0.3s ease';
      }, 50);
    });
    
    link.addEventListener('mouseleave', () => {
      clearTimeout(hoverTimeout);
      link.style.transform = 'translateY(0)';
    });
  });

  // Observer para animações de scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Aplica o observer aos elementos
  document.querySelectorAll('.feature-card, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
  });
});
