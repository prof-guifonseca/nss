// Nosso Sisteminha Sustentável - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
            }
        });
    }

    // Smooth Scrolling for Navigation Links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact Form Handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }

    // Newsletter Form Handler
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            if (!email) {
                alert('Por favor, insira um email válido.');
                return;
            }
            
            // Show loading state
            submitButton.textContent = 'Inscrevendo...';
            submitButton.disabled = true;
            
            // Simulate newsletter subscription
            setTimeout(() => {
                alert('Inscrição realizada com sucesso! Você receberá novidades em breve.');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }

    // Login Form Handler
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            if (!email || !password) {
                alert('Por favor, preencha todos os campos.');
                return;
            }
            
            // Show loading state
            submitButton.textContent = 'Entrando...';
            submitButton.disabled = true;
            
            // Simulate login
            setTimeout(() => {
                alert('Funcionalidade de login em desenvolvimento. Para solicitar acesso, entre em contato conosco.');
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }

    // Exchange Form Handler
    const exchangeForm = document.querySelector('.exchange-form');
    if (exchangeForm) {
        exchangeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const itemName = this.querySelector('input[type="text"]').value;
            const category = this.querySelector('select').value;
            const description = this.querySelector('textarea').value;
            const location = this.querySelectorAll('input[type="text"]')[1].value;
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            if (!itemName || !description || !location) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Show loading state
            submitButton.textContent = 'Cadastrando...';
            submitButton.disabled = true;
            
            // Simulate item registration
            setTimeout(() => {
                alert('Item cadastrado com sucesso! Outros usuários poderão visualizá-lo na lista de trocas.');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Add item to the exchange list
                addExchangeItem(itemName, description, location, category);
            }, 1500);
        });
    }

    // Component Purchase Handlers
    const purchaseButtons = document.querySelectorAll('.component-card .btn--primary');
    purchaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.component-card');
            const productName = card.querySelector('h3').textContent;
            const productPrice = card.querySelector('.component-card__price').textContent;
            
            const confirmed = confirm(`Deseja adquirir ${productName} por ${productPrice}?\n\nVocê será redirecionado para o WhatsApp para finalizar a compra.`);
            
            if (confirmed) {
                const message = `Olá! Gostaria de adquirir o produto: ${productName} (${productPrice})`;
                const whatsappUrl = `https://wa.me/5541999999999?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
            }
        });
    });

    // Guide Download Handlers
    const downloadButtons = document.querySelectorAll('.guide-card .btn--primary');
    downloadButtons.forEach(button => {
        if (button.textContent.includes('Baixar PDF')) {
            button.addEventListener('click', function() {
                const card = this.closest('.guide-card');
                const guideName = card.querySelector('h3').textContent;
                
                // Simulate PDF download
                alert(`Download do ${guideName} iniciado! O arquivo será baixado em breve.`);
                
                // In a real implementation, this would trigger an actual download
                console.log(`Downloading: ${guideName}.pdf`);
            });
        }
    });

    // Guide Online View Handlers
    const viewButtons = document.querySelectorAll('.guide-card .btn--outline');
    viewButtons.forEach(button => {
        if (button.textContent.includes('Ver Online')) {
            button.addEventListener('click', function() {
                const card = this.closest('.guide-card');
                const guideName = card.querySelector('h3').textContent;
                
                // Simulate online viewing
                alert(`Abrindo ${guideName} para visualização online...`);
                
                // In a real implementation, this would open a PDF viewer
                console.log(`Opening online view: ${guideName}.pdf`);
            });
        }
    });

    // Exchange Contact Handlers
    const contactButtons = document.querySelectorAll('.exchange-item .btn--outline');
    contactButtons.forEach(button => {
        button.addEventListener('click', function() {
            const item = this.closest('.exchange-item');
            const itemName = item.querySelector('h4').textContent;
            const location = item.querySelector('.exchange-item__location').textContent;
            
            const message = `Olá! Vi seu anúncio "${itemName}" no Sistema de Trocas do Sisteminha Sustentável (${location}). Gostaria de saber mais detalhes.`;
            const whatsappUrl = `https://wa.me/5541999999999?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    });

    // Exchange Search Functionality
    const searchInput = document.querySelector('.exchange-search input');
    const categoryFilter = document.querySelector('.exchange-search select');
    
    if (searchInput && categoryFilter) {
        function filterExchangeItems() {
            const searchTerm = searchInput.value.toLowerCase();
            const selectedCategory = categoryFilter.value;
            const exchangeItems = document.querySelectorAll('.exchange-item');
            
            exchangeItems.forEach(item => {
                const itemName = item.querySelector('h4').textContent.toLowerCase();
                const itemDescription = item.querySelector('p').textContent.toLowerCase();
                const itemCategory = item.dataset.category || 'Outros';
                
                const matchesSearch = itemName.includes(searchTerm) || itemDescription.includes(searchTerm);
                const matchesCategory = selectedCategory === 'Todas as categorias' || itemCategory === selectedCategory;
                
                if (matchesSearch && matchesCategory) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }
        
        searchInput.addEventListener('input', filterExchangeItems);
        categoryFilter.addEventListener('change', filterExchangeItems);
    }

    // Add Exchange Item Function
    function addExchangeItem(name, description, location, category) {
        const exchangeItems = document.querySelector('.exchange-items');
        if (!exchangeItems) return;
        
        const newItem = document.createElement('div');
        newItem.className = 'exchange-item';
        newItem.dataset.category = category;
        
        newItem.innerHTML = `
            <h4>${name}</h4>
            <p>${description}</p>
            <div class="exchange-item__location">📍 ${location}</div>
            <button class="btn btn--outline btn--sm">Entrar em contato</button>
        `;
        
        // Add contact handler to the new button
        const contactButton = newItem.querySelector('.btn--outline');
        contactButton.addEventListener('click', function() {
            const message = `Olá! Vi seu anúncio "${name}" no Sistema de Trocas do Sisteminha Sustentável (${location}). Gostaria de saber mais detalhes.`;
            const whatsappUrl = `https://wa.me/5541999999999?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
        
        exchangeItems.insertBefore(newItem, exchangeItems.firstChild);
    }

    // Header Scroll Effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'rgba(255, 255, 253, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.backgroundColor = 'var(--color-surface)';
                header.style.backdropFilter = 'none';
            }
        });
    }

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.phase-card, .ods-card, .component-card, .guide-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Form Validation Enhancement
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Enhanced form validation for all forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    });

    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove previous error styling
        field.classList.remove('error');
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Check if field is required
        if (field.hasAttribute('required') || field.type === 'email') {
            if (!value) {
                isValid = false;
                errorMessage = 'Este campo é obrigatório.';
            } else if (field.type === 'email' && !validateEmail(value)) {
                isValid = false;
                errorMessage = 'Por favor, insira um email válido.';
            }
        }

        if (!isValid) {
            field.classList.add('error');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = errorMessage;
            errorDiv.style.color = 'var(--color-error)';
            errorDiv.style.fontSize = 'var(--font-size-sm)';
            errorDiv.style.marginTop = 'var(--space-4)';
            field.parentNode.appendChild(errorDiv);
        }

        return isValid;
    }

    // Loading state management
    function setLoadingState(button, isLoading) {
        if (isLoading) {
            button.classList.add('loading');
            button.disabled = true;
        } else {
            button.classList.remove('loading');
            button.disabled = false;
        }
    }

    // Keyboard Navigation Enhancement
    document.addEventListener('keydown', function(e) {
        // Close mobile menu with Escape key
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });

    // Initialize tooltips (simple implementation)
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.dataset.tooltip;
            tooltip.style.position = 'absolute';
            tooltip.style.background = 'var(--color-text)';
            tooltip.style.color = 'var(--color-background)';
            tooltip.style.padding = 'var(--space-8)';
            tooltip.style.borderRadius = 'var(--radius-sm)';
            tooltip.style.fontSize = 'var(--font-size-sm)';
            tooltip.style.zIndex = '1000';
            tooltip.style.pointerEvents = 'none';
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + 'px';
            tooltip.style.top = (rect.top - tooltip.offsetHeight - 8) + 'px';
            
            this.tooltipElement = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.tooltipElement) {
                this.tooltipElement.remove();
                this.tooltipElement = null;
            }
        });
    });

    // Console welcome message
    console.log('🌱 Nosso Sisteminha Sustentável v3.0');
    console.log('Sistema carregado com sucesso!');
    console.log('Para mais informações: contato@sisteminhasustentavel.org.br');
});

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for potential future use
window.SisteminhaApp = {
    // Public API functions can be added here
    version: '3.0',
    contact: 'contato@sisteminhasustentavel.org.br'
};
