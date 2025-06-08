// Data from JSON
const appData = {
  "modulos_fase1": [
    {
      "nome": "Horta Vertical/Horizontal Intensiva", 
      "prioridade": "Altíssima",
      "cor": "#2E7D32",
      "justificativa": "Produto de alto impacto, fácil manejo, retorno rápido, culturalmente aceito",
      "beneficios": ["Retorno em 30-60 dias", "Aceitação cultural universal", "Baixa complexidade técnica", "Alimentação diária da família"],
      "materiais": ["Garrafas PET", "Paletes", "Terra adubada", "Sementes", "Ferramentas básicas"],
      "investimento": "R$ 50-150",
      "tempo_implementacao": "1-2 semanas"
    },
    {
      "nome": "Galinhas Poedeiras",
      "prioridade": "Altíssima", 
      "cor": "#2E7D32",
      "justificativa": "Relação produção x manejo excelente; aceitação cultural muito alta",
      "beneficios": ["2-3 ovos por dia com 3 galinhas", "Esterco para adubo", "Controle de insetos", "Baixa manutenção"],
      "materiais": ["Madeira/paletes", "Tela", "Bebedouros", "Comedouros", "Galinhas poedeiras"],
      "investimento": "R$ 200-400",
      "tempo_implementacao": "1 semana"
    },
    {
      "nome": "Compostagem",
      "prioridade": "Altíssima",
      "cor": "#2E7D32", 
      "justificativa": "Fechamento de ciclo, redução de resíduos, baixo custo",
      "beneficios": ["Adubo orgânico gratuito", "Reduz 50-60% do lixo doméstico", "Ciclo sustentável", "Melhora fertilidade do solo"],
      "materiais": ["Baldes", "Materiais secos", "Restos orgânicos", "Ferramentas"],
      "investimento": "R$ 30-80",
      "tempo_implementacao": "2-3 dias"
    },
    {
      "nome": "Minhocário",
      "prioridade": "Alta",
      "cor": "#66BB6A",
      "justificativa": "Produz húmus e proteína para galinhas; otimiza fertilidade da horta", 
      "beneficios": ["Húmus de alta qualidade", "Biofertilizante líquido", "Proteína para aves", "Decomposição acelerada"],
      "materiais": ["Caixas empilhadas", "Minhocas californianas", "Substrato", "Torneirinha"],
      "investimento": "R$ 80-150",
      "tempo_implementacao": "3-5 dias"
    }
  ],
  "modulos_fase2": [
    {
      "nome": "Piscicultura com Biofiltro Natural",
      "prioridade": "Moderada",
      "cor": "#FFC107",
      "justificativa": "Opcional; indicado para famílias capacitadas, com espaço, água e energia",
      "beneficios": ["Proteína de peixe", "Água nutritiva para horta", "Economia de água", "Sistema integrado"],
      "materiais": ["Tanque/lona", "Bomba", "Filtros naturais", "Alevinos", "Ração"],
      "investimento": "R$ 800-1500",
      "tempo_implementacao": "2-3 semanas"
    },
    {
      "nome": "Energia Solar Modular",
      "prioridade": "Baixa (Parceria Recomendada)",
      "cor": "#FF9800",
      "justificativa": "Valor pedagógico e sustentável, mas custo elevado para famílias vulneráveis",
      "beneficios": ["Independência energética", "Sustentabilidade", "Redução de custos", "Backup para sistema"],
      "materiais": ["Painéis solares", "Baterias", "Controlador", "Inversor", "Cabeamento"],
      "investimento": "R$ 2000-4000",
      "tempo_implementacao": "1-2 dias"
    },
    {
      "nome": "Frangos de Corte",
      "prioridade": "Alta Viabilidade",
      "cor": "#66BB6A",
      "justificativa": "Culturalmente aceito; gera carne adequada ao perfil de consumo do público-alvo",
      "beneficios": ["Carne para consumo", "Aproveitamento de infraestrutura", "Ciclo de 70 dias", "Mercado local"],
      "materiais": ["Piquete móvel", "Pintinhos", "Ração", "Bebedouros", "Comedouros"],
      "investimento": "R$ 150-300",
      "tempo_implementacao": "3-5 dias"
    }
  ],
  "parceiros": [
    {
      "categoria": "Institucionais",
      "organizacoes": ["Embrapa", "Ministério do Desenvolvimento Agrário", "Prefeitura de Curitiba", "IFPR", "UTFPR"]
    },
    {
      "categoria": "Técnicos", 
      "organizacoes": ["UFPR", "PUC-PR", "EMATER-PR", "IAPAR", "Cooperativas locais"]
    },
    {
      "categoria": "Financeiros",
      "organizacoes": ["Bancos cooperativos", "Fintechs rurais", "Programas governamentais", "ONGs"]
    },
    {
      "categoria": "Comerciais",
      "organizacoes": ["Fornecedores de insumos", "Mercados locais", "Feiras orgânicas", "Cooperativas de consumo"]
    }
  ],
  "cursos_disponiveis": [
    {
      "nome": "Fundamentos da Agricultura Urbana",
      "duracao": "20 horas",
      "modalidade": "EAD",
      "certificacao": "Sim"
    },
    {
      "nome": "Implementação do Sisteminha - Fase 1", 
      "duracao": "15 horas",
      "modalidade": "Híbrido",
      "certificacao": "Sim"
    },
    {
      "nome": "Manejo Ecológico de Pragas",
      "duracao": "10 horas", 
      "modalidade": "EAD",
      "certificacao": "Não"
    },
    {
      "nome": "Compostagem e Minhocário Doméstico",
      "duracao": "8 horas",
      "modalidade": "Presencial",
      "certificacao": "Sim"
    }
  ]
};

// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const navToggle = document.getElementById('nav-toggle');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.querySelector('.modal__close');
const modulosGrid = document.getElementById('modulos-grid');
const parceirosGrid = document.getElementById('parceiros-grid');
const cursosList = document.getElementById('cursos-list');
const filterBtns = document.querySelectorAll('.filter-btn');

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    loadModulos();
    loadParceiros();
    loadCursos();
    initializeEventListeners();
});

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-color-scheme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-color-scheme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-color-scheme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Load Módulos
function loadModulos() {
    const allModulos = [...appData.modulos_fase1, ...appData.modulos_fase2];
    
    modulosGrid.innerHTML = '';
    
    allModulos.forEach((modulo, index) => {
        const fase = index < appData.modulos_fase1.length ? 'fase1' : 'fase2';
        const moduloCard = createModuloCard(modulo, fase);
        modulosGrid.appendChild(moduloCard);
    });
}

function createModuloCard(modulo, fase) {
    const card = document.createElement('div');
    card.className = `modulo-card fade-in-up ${fase}`;
    card.setAttribute('data-fase', fase);
    
    const priorityClass = getPriorityClass(modulo.prioridade);
    
    card.innerHTML = `
        <div class="modulo-card__header">
            <div class="modulo-card__priority ${priorityClass}">${modulo.prioridade}</div>
            <h3 class="modulo-card__title">${modulo.nome}</h3>
            <p class="modulo-card__description">${modulo.justificativa}</p>
        </div>
        <div class="modulo-card__body">
            <div class="modulo-card__meta">
                <div class="meta-item">
                    <span class="meta-item__value">${modulo.investimento}</span>
                    <span class="meta-item__label">Investimento</span>
                </div>
                <div class="meta-item">
                    <span class="meta-item__value">${modulo.tempo_implementacao}</span>
                    <span class="meta-item__label">Implementação</span>
                </div>
            </div>
            <button class="btn btn--primary btn--full-width" onclick="openModuloModal('${modulo.nome}')">
                Ver Detalhes
            </button>
        </div>
    `;
    
    return card;
}

function getPriorityClass(prioridade) {
    const priorityMap = {
        'Altíssima': 'priority-altissima',
        'Alta': 'priority-alta',
        'Alta Viabilidade': 'priority-alta',
        'Moderada': 'priority-moderada',
        'Baixa (Parceria Recomendada)': 'priority-baixa'
    };
    return priorityMap[prioridade] || 'priority-baixa';
}

// Load Parceiros
function loadParceiros() {
    parceirosGrid.innerHTML = '';
    
    appData.parceiros.forEach(categoria => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'parceiro-category fade-in-up';
        
        categoryDiv.innerHTML = `
            <h3>${categoria.categoria}</h3>
            <div class="parceiros-list">
                ${categoria.organizacoes.map(org => 
                    `<span class="parceiro-tag">${org}</span>`
                ).join('')}
            </div>
        `;
        
        parceirosGrid.appendChild(categoryDiv);
    });
}

// Load Cursos
function loadCursos() {
    cursosList.innerHTML = '';
    
    appData.cursos_disponiveis.forEach(curso => {
        const cursoDiv = document.createElement('div');
        cursoDiv.className = 'curso-item fade-in-up';
        
        cursoDiv.innerHTML = `
            <h4>${curso.nome}</h4>
            <div class="curso-meta">
                <span>⏱️ ${curso.duracao}</span>
                <span>📍 ${curso.modalidade}</span>
                <span>🎓 ${curso.certificacao === 'Sim' ? 'Com certificação' : 'Sem certificação'}</span>
            </div>
            <div class="status status--warning">Em desenvolvimento</div>
        `;
        
        cursosList.appendChild(cursoDiv);
    });
}

// Modal Management
function openModuloModal(moduloNome) {
    const allModulos = [...appData.modulos_fase1, ...appData.modulos_fase2];
    const modulo = allModulos.find(m => m.nome === moduloNome);
    
    if (!modulo) return;
    
    modalBody.innerHTML = `
        <h3>${modulo.nome}</h3>
        
        <div class="modal__section">
            <h4>Justificativa Técnica</h4>
            <p>${modulo.justificativa}</p>
        </div>
        
        <div class="modal__meta">
            <div class="modal__meta-item">
                <span class="modal__meta-value">${modulo.investimento}</span>
                <span class="modal__meta-label">Investimento Inicial</span>
            </div>
            <div class="modal__meta-item">
                <span class="modal__meta-value">${modulo.tempo_implementacao}</span>
                <span class="modal__meta-label">Tempo de Implementação</span>
            </div>
            <div class="modal__meta-item">
                <span class="modal__meta-value">${modulo.prioridade}</span>
                <span class="modal__meta-label">Prioridade</span>
            </div>
        </div>
        
        <div class="modal__section">
            <h4>Principais Benefícios</h4>
            <ul class="modal__list">
                ${modulo.beneficios.map(beneficio => `<li>✅ ${beneficio}</li>`).join('')}
            </ul>
        </div>
        
        <div class="modal__section">
            <h4>Materiais Necessários</h4>
            <ul class="modal__list">
                ${modulo.materiais.map(material => `<li>📦 ${material}</li>`).join('')}
            </ul>
        </div>
        
        <div class="modal__section">
            <button class="btn btn--primary btn--lg">Adicionar ao Plano</button>
            <button class="btn btn--outline btn--lg">Ver no Marketplace</button>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Filter Management
function filterModulos(phase) {
    const cards = document.querySelectorAll('.modulo-card');
    
    cards.forEach(card => {
        if (phase === 'all' || card.getAttribute('data-fase') === phase) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
    
    // Update active filter button
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-phase') === phase) {
            btn.classList.add('active');
        }
    });
}

// Navigation Management
function toggleMobileNav() {
    const navMenu = document.querySelector('.nav__menu');
    navMenu.classList.toggle('active');
}

// Event Listeners
function initializeEventListeners() {
    // Theme toggle
    themeToggle?.addEventListener('click', toggleTheme);
    
    // Mobile navigation
    navToggle?.addEventListener('click', toggleMobileNav);
    
    // Modal close
    modalClose?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const phase = btn.getAttribute('data-phase');
            filterModulos(phase);
        });
    });
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter__form');
    newsletterForm?.addEventListener('submit', handleNewsletterSubmit);
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = 80;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Hero action buttons
    const heroExploreBtn = document.querySelector('.hero__actions .btn--primary');
    heroExploreBtn?.addEventListener('click', () => {
        const modulosSection = document.getElementById('modulos');
        const headerHeight = 80;
        const targetPosition = modulosSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
    
    // Scroll animations
    initializeScrollAnimations();
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    const emailInput = e.target.querySelector('input[type="email"]');
    const email = emailInput.value;
    
    if (email) {
        // Simulate form submission
        const submitBtn = e.target.querySelector('button');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Inscrevendo...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = 'Inscrito! ✓';
            emailInput.value = '';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }, 1000);
    }
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    document.querySelectorAll('.pillar, .phase, .modulo-card, .category-card, .topic-preview, .parceiro-category, .curso-item, .feature-item').forEach(el => {
        observer.observe(el);
    });
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 253, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 253, 0.95)';
    }
});

// Global modal function (accessible from HTML onclick)
window.openModuloModal = openModuloModal;

// Error handling
window.addEventListener('error', (e) => {
    console.error('Application error:', e);
});

// Mobile responsive navigation
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        const navMenu = document.querySelector('.nav__menu');
        navMenu?.classList.remove('active');
    }
});

// Loading state management
document.addEventListener('DOMContentLoaded', () => {
    // Remove loading class from body if it exists
    document.body.classList.remove('loading');
    
    // Add loaded class for animations
    document.body.classList.add('loaded');
});

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker can be registered here in the future
    });
}
