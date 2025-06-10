// Sisteminha Sustentável 3D Application
class SisteminhaApp {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.raycaster = null;
        this.mouse = null;
        this.interactiveObjects = [];
        this.zones = [];
        this.isLoading = true;
        
        // Camera positions for different views
        this.cameraPositions = {
            general: { x: 20, y: 15, z: 20 },
            top: { x: 7.5, y: 25, z: 5 },
            zone1: { x: 3.5, y: 8, z: 8 },
            zone2: { x: 10.5, y: 8, z: 8 },
            zone3: { x: 4, y: 8, z: 15 }
        };
        
        this.init();
    }

init() {
    console.log('Initializing Sisteminha 3D...');

    if (typeof THREE === 'undefined') {
        console.error('THREE.js not loaded');
        this.showError('Erro ao carregar bibliotecas 3D');
        return;
    }

    try {
        this.setupScene();
        this.setupLighting();
        this.setupControls();
        this.createTerrain();

        // Cria todos os elementos do sisteminha
        this.createSystemElements();

        // Adiciona a cerca divisória entre ZONA 1+3 e ZONA 2
        this.createVerticalDivisionFence(7.5 + 0.05);

        this.setupEventListeners();
        this.animate();
        this.hideLoading();
        console.log('3D Scene initialized successfully');
    } catch (error) {
        console.error('Error initializing 3D scene:', error);
        this.showError('Erro ao inicializar cena 3D');
    }
}

createSystemElements() {
    console.log('Creating system elements...');
    this.createZone1Elements();
    this.createZone2Elements();
    this.createZone3Elements();
    this.createEducationalSigns();
    console.log('System elements created');
}

    setupScene() {
        // Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87CEEB);
        
        // Camera
        const canvas = document.getElementById('threejs-canvas');
        const width = canvas.clientWidth || 800;
        const height = canvas.clientHeight || 600;
        
        this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
        this.camera.position.set(20, 15, 20);

        // Renderer
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: canvas,
            antialias: true 
        });
        this.renderer.setSize(width, height);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setClearColor(0x87CEEB);

        // Raycaster for interaction
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        // Handle resize
        window.addEventListener('resize', () => this.onWindowResize());
        
        console.log('Scene setup completed');
    }

    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        // Directional light (sun)
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(50, 50, 25);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 1024;
        directionalLight.shadow.mapSize.height = 1024;
        directionalLight.shadow.camera.near = 0.1;
        directionalLight.shadow.camera.far = 100;
        directionalLight.shadow.camera.left = -25;
        directionalLight.shadow.camera.right = 25;
        directionalLight.shadow.camera.top = 25;
        directionalLight.shadow.camera.bottom = -25;
        this.scene.add(directionalLight);
        
        console.log('Lighting setup completed');
    }

    setupControls() {
        if (THREE.OrbitControls) {
            this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
            this.controls.enableDamping = true;
            this.controls.dampingFactor = 0.05;
            this.controls.maxPolarAngle = Math.PI / 2;
            this.controls.minDistance = 5;
            this.controls.maxDistance = 50;
            this.controls.target.set(7.5, 0, 5);
            console.log('OrbitControls initialized');
        } else {
            console.warn('OrbitControls not available, using fallback');
        }
    }

createTerrain() {
    // Ground (15m x 10m)
    const groundGeometry = new THREE.PlaneGeometry(15, 10);
    const groundMaterial = new THREE.MeshLambertMaterial({ 
        color: 0x8FBC8F,
        transparent: true,
        opacity: 0.9
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    ground.position.set(7.5, 0, 5);
    this.scene.add(ground);

    // Paths
    this.createPaths();

    // Simple fence posts
    this.createFence();

    // Wire screen (tela de arame)
    this.createWireScreen();

    console.log('Terrain created');
}


    createPaths() {
        const pathMaterial = new THREE.MeshLambertMaterial({ color: 0xD2B48C });
        
        // Horizontal path
        const pathHorizontal = new THREE.PlaneGeometry(15, 1);
        const pathH = new THREE.Mesh(pathHorizontal, pathMaterial);
        pathH.rotation.x = -Math.PI / 2;
        pathH.position.set(7.5, 0.01, 5.5);
        this.scene.add(pathH);

        // Vertical path
        const pathVertical = new THREE.PlaneGeometry(1, 10);
        const pathV = new THREE.Mesh(pathVertical, pathMaterial);
        pathV.rotation.x = -Math.PI / 2;
        pathV.position.set(7, 0.01, 5);
        this.scene.add(pathV);
    }

    createFence() {
        const fenceMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
        const postGeometry = new THREE.BoxGeometry(0.1, 1.8, 0.1);
        
        // Corner posts
        const corners = [
            [0, 0], [15, 0], [0, 10], [15, 10]
        ];
        
        corners.forEach(([x, z]) => {
            const post = new THREE.Mesh(postGeometry, fenceMaterial);
            post.position.set(x, 0.9, z);
            post.castShadow = true;
            this.scene.add(post);
        });
    }

createWireScreen() {
    const terrainWidth = 15;
    const terrainHeight = 10;
    const screenHeight = 1.8;
    const gridSpacing = 0.3;
    const offset = 0.05;

    const screenMaterial = new THREE.LineBasicMaterial({
        color: 0xAAAAAA,
        transparent: true,
        opacity: 0.5
    });

    const createGridMesh = (width, height, openRanges = [], axis = 'x') => {
        const gridGeometry = new THREE.BufferGeometry();
        const vertices = [];

        // Linhas verticais
        for (let x = -width / 2; x <= width / 2; x += gridSpacing) {
            const inOpenRange = openRanges.some(([start, end]) => x >= start - width/2 && x <= end - width/2);
            if (inOpenRange) continue;

            vertices.push(x, 0, 0);
            vertices.push(x, height, 0);
        }

        // Linhas horizontais
        for (let y = 0; y <= height; y += gridSpacing) {
            vertices.push(-width / 2, y, 0);
            vertices.push(width / 2, y, 0);
        }

        gridGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

        const mesh = new THREE.LineSegments(gridGeometry, screenMaterial);
        if (axis === 'z') {
            mesh.rotation.y = Math.PI / 2;
        }

        return mesh;
    };

    // Posições das portas
    const frontOpenRange = [[6.5, 7.5]]; // para alinhar com a estradinha da frente
    const backOpenRange = []; // sem porta
    const leftOpenRange = []; // sem porta
    const rightOpenRange = []; // sem porta

    // Frente (Z = 0)
    const front = createGridMesh(terrainWidth, screenHeight, frontOpenRange, 'x');
    front.position.set(terrainWidth / 2, 0, 0 + offset);
    this.scene.add(front);

    // Trás (Z = terrainHeight)
    const back = createGridMesh(terrainWidth, screenHeight, backOpenRange, 'x');
    back.position.set(terrainWidth / 2, 0, terrainHeight - offset);
    this.scene.add(back);

    // Esquerda (X = 0)
    const left = createGridMesh(terrainHeight, screenHeight, leftOpenRange, 'z');
    left.position.set(0 + offset, 0, terrainHeight / 2);
    this.scene.add(left);

    // Direita (X = terrainWidth)
    const right = createGridMesh(terrainHeight, screenHeight, rightOpenRange, 'z');
    right.position.set(terrainWidth - offset, 0, terrainHeight / 2);
    this.scene.add(right);

    // Poste da porta da frente (duas extremidades)
    const fenceMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
    const postGeometry = new THREE.BoxGeometry(0.1, screenHeight, 0.1);

    // Poste esquerdo da porta da frente
    const postLeft = new THREE.Mesh(postGeometry, fenceMaterial);
    postLeft.position.set(frontOpenRange[0][0], screenHeight / 2, 0);
    this.scene.add(postLeft);

    // Poste direito da porta da frente
    const postRight = new THREE.Mesh(postGeometry, fenceMaterial);
    postRight.position.set(frontOpenRange[0][1], screenHeight / 2, 0);
    this.scene.add(postRight);
}

createVerticalDivisionFence(xPosition = 7) {
    const fenceMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
    const postGeometry = new THREE.BoxGeometry(0.1, 1.8, 0.1);

    const terrainHeight = 10;
    const postPositionsZ = [0, terrainHeight];

    // POSTES nas extremidades (topo e base)
    postPositionsZ.forEach(z => {
        const post = new THREE.Mesh(postGeometry, fenceMaterial);
        post.position.set(xPosition, 0.9, z);
        post.castShadow = true;
        this.scene.add(post);
    });

    // Cria a tela
    const screenHeight = 1.8;
    const screenMaterial = new THREE.LineBasicMaterial({
        color: 0xAAAAAA,
        transparent: true,
        opacity: 0.5
    });

    const gridSpacing = 0.3;
    const gridGeometry = new THREE.BufferGeometry();
    const vertices = [];

    const height = screenHeight;
    const width = terrainHeight;

    const openRange = [5, 6]; // posição da porta no galinheiro (alinhada com a estradinha horizontal)

    // Linhas verticais (em Z)
    for (let z = -width / 2; z <= width / 2; z += gridSpacing) {
        const worldZ = z + width / 2;
        if (worldZ >= openRange[0] && worldZ <= openRange[1]) continue;

        vertices.push(0, 0, z);
        vertices.push(0, height, z);
    }

    // Linhas horizontais (em Y)
    for (let y = 0; y <= height; y += gridSpacing) {
        vertices.push(0, y, -width / 2);
        vertices.push(0, y, width / 2);
    }

    gridGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const screen = new THREE.LineSegments(gridGeometry, screenMaterial);
    screen.position.set(xPosition, 0, terrainHeight / 2);
    this.scene.add(screen);

    // POSTES da porta do galinheiro (duas extremidades)
    const postLeft = new THREE.Mesh(postGeometry, fenceMaterial);
    postLeft.position.set(xPosition, screenHeight / 2, openRange[0]);
    this.scene.add(postLeft);

    const postRight = new THREE.Mesh(postGeometry, fenceMaterial);
    postRight.position.set(xPosition, screenHeight / 2, openRange[1]);
    this.scene.add(postRight);
}
    
createZone1Elements() {
    // ZONA 1: Produção de Insumos + Horta (50m²)

    // Minhocário Vertical (caixas pretas empilháveis)
    const minhocarioGeometry = new THREE.BoxGeometry(1.2, 1.5, 0.8);
    const minhocarioMaterial = new THREE.MeshLambertMaterial({ color: 0x2F2F2F });
    const minhocario = new THREE.Mesh(minhocarioGeometry, minhocarioMaterial);
    minhocario.position.set(1, 0.75, 1);
    minhocario.castShadow = true;
    minhocario.userData = {
        name: "Minhocário Vertical",
        description: "Sistema modular de caixas empilháveis pretas para compostagem com minhocas"
    };
    this.scene.add(minhocario);
    this.interactiveObjects.push(minhocario);

    // Composteira 3 Compartimentos (madeira)
    const composterGeometry = new THREE.BoxGeometry(2.4, 1.0, 0.8);
    const composterMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
    const composter = new THREE.Mesh(composterGeometry, composterMaterial);
    composter.position.set(3, 0.5, 1);
    composter.castShadow = true;
    composter.userData = {
        name: "Composteira 3 Compartimentos",
        description: "Madeira reaproveitada com tampa e cobertura contra chuva"
    };
    this.scene.add(composter);
    this.interactiveObjects.push(composter);

    // Sistema Bokashi (bombonas azuis/pretas) - colado à composteira
    const bokashiGroup = new THREE.Group();
    for (let i = 0; i < 3; i++) {
        const barrel = new THREE.CylinderGeometry(0.3, 0.3, 1.2, 8);
        const barrelMaterial = new THREE.MeshLambertMaterial({ 
            color: i % 2 === 0 ? 0x0066CC : 0x2F2F2F 
        });
        const barrelMesh = new THREE.Mesh(barrel, barrelMaterial);
        barrelMesh.position.set(i * 0.4, 0.6, 0);
        barrelMesh.castShadow = true;

        // UserData para cada barril
        barrelMesh.userData = {
            name: "Sistema Bokashi",
            description: "2-3 bombonas azuis/pretas para fermentação anaeróbica"
        };

        this.interactiveObjects.push(barrelMesh);
        bokashiGroup.add(barrelMesh);
    }

    // Colado à composteira (um pouco à direita dela)
    bokashiGroup.position.set(4.5, 0, 1);
    bokashiGroup.userData = {
        name: "Sistema Bokashi",
        description: "2-3 bombonas azuis/pretas para fermentação anaeróbica"
    };
    this.scene.add(bokashiGroup);

    // Horta Horizontal (canteiros elevados) - com corredor + expandida
    const gardenGeometry = new THREE.BoxGeometry(5.2, 0.3, 3); // largura levemente reduzida para abrir corredor
    const gardenMaterial = new THREE.MeshLambertMaterial({ color: 0x228B22 });
    const garden = new THREE.Mesh(gardenGeometry, gardenMaterial);

    // Deslocada para a direita, deixando ~0.3m de corredor entre horta vertical e horta horizontal
    garden.position.set(3.2, 0.15, 3.5);

    garden.userData = {
        name: "Horta Horizontal",
        description: "Canteiros elevados de madeira/blocos para cultivo de hortaliças"
    };
    this.scene.add(garden);
    this.interactiveObjects.push(garden);

    // Horta Vertical (garrafas PET) - aproveitando o alambrado
    const verticalGardenGeometry = new THREE.BoxGeometry(0.3, 2.0, 3);
    const verticalGardenMaterial = new THREE.MeshLambertMaterial({ color: 0x32CD32 });
    const verticalGarden = new THREE.Mesh(verticalGardenGeometry, verticalGardenMaterial);

    // Posição bem colada no alambrado (X quase zero), Z ajustado para alinhar com a horta horizontal
    verticalGarden.position.set(0.15, 1, 3.5);

    verticalGarden.userData = {
        name: "Horta Vertical",
        description: "Parede vertical com garrafas PET para aproveitamento de espaço"
    };
    this.scene.add(verticalGarden);
    this.interactiveObjects.push(verticalGarden);
}

    createZone2Elements() {
        // ZONA 2: Galinheiro + Energia Solar (40m²)
        
        // Galinheiro Principal
        const coopGeometry = new THREE.BoxGeometry(3, 2.5, 4);
        const coopMaterial = new THREE.MeshLambertMaterial({ color: 0xDEB887 });
        const coop = new THREE.Mesh(coopGeometry, coopMaterial);
        coop.position.set(10, 1.25, 3);
        coop.castShadow = true;
        coop.userData = {
            name: "Galinheiro Principal",
            description: "Estrutura de madeira/bambu com telhado metálico para 12-15 galinhas poedeiras"
        };
        this.scene.add(coop);
        this.interactiveObjects.push(coop);

        // Telhado
        const roofGeometry = new THREE.BoxGeometry(3.5, 0.15, 4.5);
        const roofMaterial = new THREE.MeshLambertMaterial({ color: 0x708090 });
        const roof = new THREE.Mesh(roofGeometry, roofMaterial);
        roof.position.set(10, 2.6, 3);
        roof.castShadow = true;
        this.scene.add(roof);

        // Piquete Externo (cerca)
        const fenceGeometry = new THREE.BoxGeometry(0.05, 1.8, 4);
        const fenceMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
        const fence1 = new THREE.Mesh(fenceGeometry, fenceMaterial);
        fence1.position.set(12, 0.9, 3);
        this.scene.add(fence1);

        // Painel Solar
        const solarGeometry = new THREE.BoxGeometry(1.6, 0.1, 1.0);
        const solarMaterial = new THREE.MeshLambertMaterial({ color: 0x191970 });
        const solarPanel = new THREE.Mesh(solarGeometry, solarMaterial);
        solarPanel.position.set(10, 3.2, 3);
        solarPanel.userData = {
            name: "Sistema Solar",
            description: "1-2 painéis solares para alimentar iluminação e bomba d'água"
        };
        this.scene.add(solarPanel);
        this.interactiveObjects.push(solarPanel);

        // Poste do painel solar
        const postGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1.8);
        const postMaterial = new THREE.MeshLambertMaterial({ color: 0x696969 });
        const post = new THREE.Mesh(postGeometry, postMaterial);
        post.position.set(10, 0.9, 3);
        this.scene.add(post);
    }

createZone3Elements(baseZ = 8.0) {
    // ZONA 3: Piscicultura Integrada (40m²)
    // baseZ → passado como parâmetro → define posição central Z dos elementos

    const baseX = 3.5; // MAIS À ESQUERDA

    // Tanque Principal (circular elevado)
    const tankHeight = 1.2;
    const tankGeometry = new THREE.CylinderGeometry(1.25, 1.25, tankHeight, 16);
    const tankMaterial = new THREE.MeshLambertMaterial({ 
        color: 0x4682B4,
        transparent: true,
        opacity: 0.7
    });
    const tank = new THREE.Mesh(tankGeometry, tankMaterial);
    tank.position.set(baseX, tankHeight / 2, baseZ); // base no chão
    tank.castShadow = true;
    tank.userData = {
        name: "Tanque Principal",
        description: "Tanque 1000-3000L com geomembrana para criação de tilápias"
    };
    this.scene.add(tank);
    this.interactiveObjects.push(tank);

    // Superfície da água
    const waterHeight = 0.05;
    const waterGeometry = new THREE.CylinderGeometry(1.2, 1.2, waterHeight, 16);
    const waterMaterial = new THREE.MeshLambertMaterial({ 
        color: 0x1E90FF,
        transparent: true,
        opacity: 0.8
    });
    const water = new THREE.Mesh(waterGeometry, waterMaterial);
    // Coloca a superfície da água no topo do tanque
    water.position.set(baseX, tankHeight - (waterHeight / 2), baseZ);
    this.scene.add(water);

    // Sistema Biofiltro — ACOPLADO NA ESQUERDA do tanque
    const biofilterHeight = 1.5;
    const biofilterGeometry = new THREE.CylinderGeometry(0.3, 0.3, biofilterHeight, 8);
    const biofilterMaterial = new THREE.MeshLambertMaterial({ color: 0x556B2F });
    const biofilter = new THREE.Mesh(biofilterGeometry, biofilterMaterial);
    biofilter.position.set(baseX - 1.25 - 0.35, biofilterHeight / 2, baseZ); // base no chão
    biofilter.castShadow = true;
    biofilter.userData = {
        name: "Sistema Biofiltro",
        description: "Filtro com brita + carvão + areia para filtração biológica da água"
    };
    this.scene.add(biofilter);
    this.interactiveObjects.push(biofilter);

    // Tanque de Reserva — À DIREITA do tanque principal
    const reserveHeight = 0.8;
    const reserveGeometry = new THREE.CylinderGeometry(0.75, 0.75, reserveHeight, 12);
    const reserveMaterial = new THREE.MeshLambertMaterial({ color: 0x2F4F4F });
    const reserve = new THREE.Mesh(reserveGeometry, reserveMaterial);
    reserve.position.set(baseX + 2.5, reserveHeight / 2, baseZ); // base no chão
    reserve.castShadow = true;
    reserve.userData = {
        name: "Tanque Reserva",
        description: "Tanque auxiliar de decantação e reserva de água tratada"
    };
    this.scene.add(reserve);
    this.interactiveObjects.push(reserve);

    // Sistema de Captação de Chuva — telhado sobre o tanque reserva
    const roofCatchGeometry = new THREE.BoxGeometry(2.5, 0.2, 1.5);
    const roofCatchMaterial = new THREE.MeshLambertMaterial({ color: 0xB22222 });
    const roofCatch = new THREE.Mesh(roofCatchGeometry, roofCatchMaterial);
    // Posiciona o telhado ACIMA do tanque reserva
    roofCatch.position.set(baseX + 2.5, reserveHeight + 1.2, baseZ); // altura ajustada
    roofCatch.userData = {
        name: "Captação de Chuva",
        description: "Telhado para coleta de água da chuva direcionada ao sistema"
    };
    this.scene.add(roofCatch);
    this.interactiveObjects.push(roofCatch);
}

    createEducationalSigns() {
        const signMaterial = new THREE.MeshLambertMaterial({ color: 0xFFFFFF });
        const postMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });

const signs = [
    { x: 0.5, z: 1.5, name: "Minhocário" },
    { x: 6.5, z: 5.5, name: "Horta Vertical" },
    { x: 4, z: 9, name: "Tanque de Tilápias" }
];

    signs.forEach(sign => {
        // Poste da placa
        const postGeometry = new THREE.CylinderGeometry(0.03, 0.03, 1.5);
        const post = new THREE.Mesh(postGeometry, postMaterial);
        post.position.set(sign.x, 0.75, sign.z);
        this.scene.add(post);

        // Placa
        const signGeometry = new THREE.BoxGeometry(0.8, 0.3, 0.05);
        const signBoard = new THREE.Mesh(signGeometry, signMaterial);
        signBoard.position.set(sign.x, 1.3, sign.z);

        // Ajusta rotação da Horta Vertical
        if (sign.name === "Horta Vertical") {
            signBoard.rotation.y = Math.PI / 2; // 90 graus em radianos
        }

        signBoard.userData = {
            name: `Placa: ${sign.name}`,
            description: `Placa educativa indicando ${sign.name}`
        };
        this.scene.add(signBoard);
        this.interactiveObjects.push(signBoard);
    });
}
    
    setupEventListeners() {
        // Mouse events
        if (this.renderer && this.renderer.domElement) {
            this.renderer.domElement.addEventListener('mousemove', (event) => this.onMouseMove(event));
            this.renderer.domElement.addEventListener('click', (event) => this.onMouseClick(event));
        }
        
        // UI buttons
        const resetBtn = document.getElementById('reset-view');
        const topBtn = document.getElementById('top-view');
        
        if (resetBtn) resetBtn.addEventListener('click', () => this.resetView());
        if (topBtn) topBtn.addEventListener('click', () => this.topView());
        
        // Zone focus buttons
        document.querySelectorAll('.zone-focus-btn').forEach((btn, index) => {
            btn.addEventListener('click', () => this.focusZone(index));
        });
        
        console.log('Event listeners setup completed');
    }

    onMouseMove(event) {
        const canvas = this.renderer.domElement;
        const rect = canvas.getBoundingClientRect();
        
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.interactiveObjects);

        const tooltip = document.getElementById('tooltip');
        
        if (intersects.length > 0) {
            const object = intersects[0].object;
            canvas.style.cursor = 'pointer';
            
            if (object.userData.name) {
                tooltip.classList.remove('hidden');
                document.getElementById('tooltip-title').textContent = object.userData.name;
                document.getElementById('tooltip-description').textContent = object.userData.description;
                
                tooltip.style.left = event.clientX + 10 + 'px';
                tooltip.style.top = event.clientY + 10 + 'px';
            }
        } else {
            canvas.style.cursor = 'grab';
            tooltip.classList.add('hidden');
        }
    }

    onMouseClick(event) {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.interactiveObjects);

        if (intersects.length > 0) {
            const object = intersects[0].object;
            console.log('Clicked on:', object.userData.name);
        }
    }

    resetView() {
        this.animateCamera(this.cameraPositions.general, { x: 7.5, y: 0, z: 5 });
    }

    topView() {
        this.animateCamera(this.cameraPositions.top, { x: 7.5, y: 0, z: 5 });
    }

    focusZone(zoneIndex) {
        let targetPos, targetLook;
        
        switch(zoneIndex) {
            case 0: // Zona 1
                targetPos = this.cameraPositions.zone1;
                targetLook = { x: 3.5, y: 0, z: 3.5 };
                break;
            case 1: // Zona 2
                targetPos = this.cameraPositions.zone2;
                targetLook = { x: 10.5, y: 0, z: 3 };
                break;
            case 2: // Zona 3
                targetPos = this.cameraPositions.zone3;
                targetLook = { x: 3, y: 0, z: 8.5 };
                break;
        }
        
        this.animateCamera(targetPos, targetLook);
    }

    animateCamera(targetPosition, targetLookAt) {
        if (!this.controls) {
            // Fallback: just set position directly
            this.camera.position.set(targetPosition.x, targetPosition.y, targetPosition.z);
            this.camera.lookAt(targetLookAt.x, targetLookAt.y, targetLookAt.z);
            return;
        }
        
        const duration = 1500;
        const startPosition = this.camera.position.clone();
        const startLookAt = this.controls.target.clone();
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = this.easeInOutCubic(progress);

            this.camera.position.lerpVectors(startPosition, targetPosition, easeProgress);
            this.controls.target.lerpVectors(startLookAt, targetLookAt, easeProgress);
            this.controls.update();

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        animate();
    }

    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

    onWindowResize() {
        const canvas = this.renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    hideLoading() {
        setTimeout(() => {
            const loading = document.getElementById('loading');
            if (loading) {
                loading.classList.add('hidden');
            }
            this.isLoading = false;
        }, 500);
    }

    showError(message) {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.innerHTML = `
                <div style="color: var(--color-error); text-align: center;">
                    <h3>Erro no Carregamento</h3>
                    <p>${message}</p>
                    <p style="font-size: 12px;">Tente recarregar a página</p>
                </div>
            `;
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        if (this.controls) {
            this.controls.update();
        }
        
        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing app...');
    new SisteminhaApp();
});
