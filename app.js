// App Data
const appData = {
  kits: [
    {
      nome: "Kit Básico Familiar", 
      preco: 500,
      area: "150m²",
      familia: "até 3 pessoas",
      componentes: ["Tanque 1000L", "Bomba d'água", "Sistema irrigação básico", "Manual completo"]
    },
    {
      nome: "Kit Intermediário",
      preco: 1200, 
      area: "300m²",
      familia: "até 5 pessoas",
      componentes: ["Tanque 2000L", "Automação com sensores", "Sistema compostagem", "Kit ferramentas"]
    },
    {
      nome: "Kit Avançado Maker",
      preco: 2500,
      area: "500m²", 
      familia: "até 7 pessoas",
      componentes: ["Sistema IoT completo", "Monitoramento remoto", "Painel solar", "Estação meteorológica"]
    },
    {
      nome: "Kit Escolar",
      preco: 800,
      area: "200m²",
      familia: "institucional", 
      componentes: ["Material pedagógico", "Treinamento professores", "Sistema básico", "Acompanhamento técnico"]
    }
  ],
  produtosMarketplace: [
    {
      categoria: "Hortaliças",
      exemplos: ["Alface", "Tomate", "Cenoura", "Beterraba"]
    },
    {
      categoria: "Frutas", 
      exemplos: ["Morango", "Limão", "Maracujá", "Pitanga"]
    },
    {
      categoria: "Proteínas",
      exemplos: ["Ovos caipira", "Peixe tilápia", "Frango caipira"]
    }
  ],
  etapasGuia: [
    "1. Planejamento do espaço",
    "2. Construção do tanque", 
    "3. Sistema de irrigação",
    "4. Plantio das hortaliças",
    "5. Introdução dos peixes",
    "6. Criação de animais"
  ],
  parceriasPotenciais: [
    "Universidade Estadual de Londrina (UEL)",
    "Embrapa",
    "Prefeitura de Londrina", 
    "ONGs locais",
    "Laboratórios Maker"
  ]
};

// Global variables for modal elements
let loginModal;
let closeModalBtn;
let loginBtn;
let cadastroInteresseBtn;

// Navigation functionality
function showSection(sectionId) {
  // Hide all sections
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.classList.add('hidden');
  });
  
  // Show selected section
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.remove('hidden');
  }
  
  // Update active nav item
  const navItems = document.querySelectorAll('.nav__item');
  navItems.forEach(item => {
    item.classList.remove('active');
  });
  
  const activeNav = document.querySelector(`[data-section="${sectionId}"]`);
  if (activeNav) {
    activeNav.classList.add('active');
  }
}

// Modal functionality
function openModal() {
  if (loginModal) {
    loginModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }
}

function closeModalHandler() {
  if (loginModal) {
    loginModal.classList.add('hidden');
    document.body.style.overflow = ''; // Restore scrolling
  }
}

// Initialize navigation and modal
function initializeNavigation() {
  const navItems = document.querySelectorAll('.nav__item');
  
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const section = item.getAttribute('data-section');
      showSection(section);
    });
  });
}

function initializeModal() {
  loginModal = document.getElementById('loginModal');
  closeModalBtn = document.querySelector('.close');
  loginBtn = document.getElementById('loginBtn');
  cadastroInteresseBtn = document.getElementById('cadastroInteresse');
  
  if (loginBtn) {
    loginBtn.addEventListener('click', openModal);
  }
  
  if (cadastroInteresseBtn) {
    cadastroInteresseBtn.addEventListener('click', openModal);
  }
  
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModalHandler);
  }
  
  // Close modal when clicking outside
  if (loginModal) {
    loginModal.addEventListener('click', (e) => {
      if (e.target === loginModal) {
        closeModalHandler();
      }
    });
  }
  
  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModalHandler();
    }
  });
}

// Populate Kits
function populateKits() {
  const kitsGrid = document.getElementById('kitsGrid');
  const kitSelector = document.getElementById('kitSelector');
  
  if (!kitsGrid || !kitSelector) return;
  
  kitsGrid.innerHTML = '';
  kitSelector.innerHTML = '<option value="">Selecione um kit</option>';
  
  appData.kits.forEach((kit, index) => {
    // Create kit card
    const kitCard = document.createElement('div');
    kitCard.className = 'kit-card';
    kitCard.innerHTML = `
      <div class="kit-card__header">
        <h3 class="kit-card__name">${kit.nome}</h3>
        <div class="kit-card__price">R$ ${kit.preco.toLocaleString()}</div>
      </div>
      <div class="kit-card__specs">
        <div class="kit-card__spec">
          <span>Área recomendada:</span>
          <span>${kit.area}</span>
        </div>
        <div class="kit-card__spec">
          <span>Atende:</span>
          <span>${kit.familia}</span>
        </div>
      </div>
      <div class="kit-card__components">
        <h4>Componentes Incluídos:</h4>
        <ul class="component-list">
          ${kit.componentes.map(comp => `<li>${comp}</li>`).join('')}
        </ul>
      </div>
      <button class="btn btn--primary btn--full-width" onclick="selectKit(${index})">
        Manifestar Interesse
      </button>
    `;
    kitsGrid.appendChild(kitCard);
    
    // Add to selector
    const option = document.createElement('option');
    option.value = index;
    option.textContent = kit.nome;
    kitSelector.appendChild(option);
  });
}

function selectKit(kitIndex) {
  const kit = appData.kits[kitIndex];
  showNotification(`Interesse registrado para ${kit.nome}! Entraremos em contato quando o projeto for lançado em 2025.`, 'success');
}

// Populate Marketplace Categories
function populateMarketplace() {
  const categoriesGrid = document.getElementById('categoriesGrid');
  if (!categoriesGrid) return;
  
  categoriesGrid.innerHTML = '';
  
  appData.produtosMarketplace.forEach(categoria => {
    const categoryCard = document.createElement('div');
    categoryCard.className = 'category-card';
    categoryCard.innerHTML = `
      <h4>${categoria.categoria}</h4>
      <p>Produtos orgânicos locais</p>
      <div class="product-examples">
        Exemplos: ${categoria.exemplos.join(', ')}
      </div>
    `;
    
    categoryCard.addEventListener('click', () => {
      showNotification(`Categoria "${categoria.categoria}" estará disponível no marketplace em 2025.`, 'info');
    });
    
    categoriesGrid.appendChild(categoryCard);
  });
}

// Populate Guide Steps
function populateGuide() {
  const guideSteps = document.getElementById('guideSteps');
  if (!guideSteps) return;
  
  guideSteps.innerHTML = '';
  
  appData.etapasGuia.forEach((etapa, index) => {
    const stepCard = document.createElement('div');
    stepCard.className = 'guide-step';
    stepCard.innerHTML = `
      <h4>${etapa}</h4>
      <p>Conteúdo detalhado disponível a partir de 2025</p>
      <div class="status status--info">Em desenvolvimento</div>
    `;
    
    stepCard.addEventListener('click', () => {
      showNotification(`Etapa "${etapa}" será disponibilizada no guia digital completo em 2025.`, 'info');
    });
    
    guideSteps.appendChild(stepCard);
  });
}

// Populate Partners
function populatePartners() {
  const partnersGrid = document.getElementById('partnersGrid');
  if (!partnersGrid) return;
  
  partnersGrid.innerHTML = '';
  
  appData.parceriasPotenciais.forEach(parceiro => {
    const partnerCard = document.createElement('div');
    partnerCard.className = 'partner-card';
    partnerCard.innerHTML = `
      <h4>${parceiro}</h4>
      <p>Instituição com potencial para parceria</p>
      <div class="status status--warning">Em prospecção</div>
    `;
    partnersGrid.appendChild(partnerCard);
  });
}

// Investment Calculator
function setupCalculator() {
  const calculateBtn = document.getElementById('calculateBtn');
  const calculatorResult = document.getElementById('calculatorResult');
  
  if (!calculateBtn || !calculatorResult) return;
  
  calculateBtn.addEventListener('click', () => {
    const kitSelector = document.getElementById('kitSelector');
    const familySize = document.getElementById('familySize');
    
    const selectedKitIndex = kitSelector.value;
    const familySizeValue = parseInt(familySize.value);
    
    if (!selectedKitIndex || !familySizeValue) {
      calculatorResult.innerHTML = '<div class="status status--warning">Por favor, preencha todos os campos.</div>';
      return;
    }
    
    const selectedKit = appData.kits[selectedKitIndex];
    const monthlyReturn = Math.round(selectedKit.preco * 0.15); // 15% estimado
    const paybackMonths = Math.round(selectedKit.preco / monthlyReturn);
    
    calculatorResult.innerHTML = `
      <h4>Projeção de Investimento - ${selectedKit.nome}</h4>
      <div class="calculation-details">
        <p><strong>Investimento inicial:</strong> R$ ${selectedKit.preco.toLocaleString()}</p>
        <p><strong>Economia mensal estimada:</strong> R$ ${monthlyReturn.toLocaleString()}</p>
        <p><strong>Retorno estimado:</strong> ${paybackMonths} meses</p>
        <p><strong>Área necessária:</strong> ${selectedKit.area}</p>
        <p><strong>Adequado para:</strong> ${selectedKit.familia}</p>
      </div>
      <div class="disclaimer" style="margin-top: 16px;">
        <strong>⚠️ Projeção:</strong> Valores estimados baseados em potencial de mercado para 2025+.
      </div>
    `;
  });
}

// Resource Calculator
function setupResourceCalculator() {
  const resourceCalcBtn = document.getElementById('resourceCalcBtn');
  const resourceResult = document.getElementById('resourceResult');
  
  if (!resourceCalcBtn || !resourceResult) return;
  
  resourceCalcBtn.addEventListener('click', () => {
    const areaInput = document.getElementById('areaInput');
    const budgetInput = document.getElementById('budgetInput');
    
    const area = parseFloat(areaInput.value);
    const budget = parseFloat(budgetInput.value);
    
    if (!area || !budget) {
      resourceResult.innerHTML = '<div class="status status--warning">Por favor, preencha área e orçamento disponíveis.</div>';
      return;
    }
    
    // Find suitable kit based on area and budget
    let recommendedKit = null;
    
    for (let kit of appData.kits) {
      const kitArea = parseInt(kit.area.replace('m²', ''));
      if (area >= kitArea && budget >= kit.preco) {
        if (!recommendedKit || kit.preco > recommendedKit.preco) {
          recommendedKit = kit;
        }
      }
    }
    
    if (recommendedKit) {
      resourceResult.innerHTML = `
        <h4>Recomendação Baseada em Recursos</h4>
        <p><strong>Kit recomendado:</strong> ${recommendedKit.nome}</p>
        <p><strong>Investimento:</strong> R$ ${recommendedKit.preco.toLocaleString()}</p>
        <p><strong>Sobra no orçamento:</strong> R$ ${(budget - recommendedKit.preco).toLocaleString()}</p>
        <p><strong>Área utilizada:</strong> ${recommendedKit.area} de ${area}m² disponíveis</p>
        <div class="status status--success">Recursos suficientes!</div>
      `;
    } else {
      resourceResult.innerHTML = `
        <h4>Recursos Insuficientes</h4>
        <p>Com os recursos informados, recomendamos aguardar o lançamento em 2025 para conhecer opções de financiamento.</p>
        <p><strong>Kit mais acessível:</strong> ${appData.kits[0].nome} (R$ ${appData.kits[0].preco.toLocaleString()})</p>
        <div class="status status--warning">Orçamento insuficiente</div>
      `;
    }
  });
}

// Form Handlers
function setupForms() {
  // Login Form
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showNotification('Interesse cadastrado com sucesso! Entraremos em contato quando o projeto for lançado no segundo semestre de 2025.', 'success');
      closeModalHandler();
      loginForm.reset();
    });
  }
  
  // Partnership Form
  const partnershipForm = document.getElementById('partnershipForm');
  if (partnershipForm) {
    partnershipForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showNotification('Proposta de parceria enviada! Analisaremos e retornaremos em breve.', 'success');
      partnershipForm.reset();
    });
  }
}

// Map Filters
function setupMapFilters() {
  const filterCheckboxes = document.querySelectorAll('.filters input[type="checkbox"]');
  
  filterCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const checkedFilters = Array.from(filterCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);
      
      if (checkedFilters.length > 0) {
        showNotification(`Filtros aplicados: ${checkedFilters.join(', ')}. Mapa interativo disponível em 2025.`, 'info');
      }
    });
  });
}

// Forum Categories
function setupForum() {
  const categoryCards = document.querySelectorAll('.category-card[data-category]');
  
  categoryCards.forEach(card => {
    card.addEventListener('click', () => {
      const category = card.getAttribute('data-category');
      showNotification(`A categoria "${category}" estará disponível quando o fórum for ativado em 2025.`, 'info');
    });
  });
}

// Notification system
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notif => notif.remove());
  
  const notification = document.createElement('div');
  notification.className = `status status--${type} notification`;
  notification.style.position = 'fixed';
  notification.style.top = '20px';
  notification.style.right = '20px';
  notification.style.zIndex = '9999';
  notification.style.maxWidth = '300px';
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    if (document.body.contains(notification)) {
      document.body.removeChild(notification);
    }
  }, 5000);
}

// Progress Tracker (simulation)
function updateProgress() {
  const progressFill = document.querySelector('.progress-fill');
  const progressText = document.querySelector('.progress-tracker p');
  
  if (progressFill && progressText) {
    // Simulate some progress for demo
    const progress = 0; // Will be dynamic based on user actions
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `${progress}% concluído`;
  }
}

// Initialize all components
function init() {
  // Set home as default section
  showSection('home');
  
  // Initialize navigation and modal
  initializeNavigation();
  initializeModal();
  
  // Populate data
  populateKits();
  populateMarketplace();
  populateGuide();
  populatePartners();
  
  // Setup interactive elements
  setupCalculator();
  setupResourceCalculator();
  setupForms();
  setupMapFilters();
  setupForum();
  updateProgress();
  
  console.log('Nosso Sisteminha Sustentável MVP v2 inicializado');
  console.log('Projeto conceitual - Implementação prevista para segundo semestre de 2025');
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', init);