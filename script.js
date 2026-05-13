// A variável agora começa vazia e será preenchida pelo JSON
let presentes = []; 
let chavePixAtual = ""; 
let categoriaAtual = "Todos";

// Nova função para buscar os dados do arquivo JSON
async function carregarPresentes() {
    try {
        const resposta = await fetch('presentes.json');
        presentes = await resposta.json(); // Transforma o JSON de volta em Array
        renderizarCards(); // Só desenha os cards APÓS carregar os dados
    } catch (erro) {
        console.error('Erro ao carregar a lista de presentes:', erro);
        document.getElementById('grid-presentes').innerHTML = '<p class="text-center w-full col-span-full">Erro ao carregar os presentes. Tente recarregar a página.</p>';
    }
}

// 2. Renderiza os Cards com base no filtro
function renderizarCards(categoria = "Todos") {
    const grid = document.getElementById('grid-presentes');
    grid.innerHTML = ''; 

    // Filtra o array antes de desenhar
    const presentesFiltrados = categoria === "Todos" 
        ? presentes 
        : presentes.filter(item => item.categoria === categoria);

    presentesFiltrados.forEach(item => {
        const cardHTML = `
            <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all cursor-pointer border border-slate-100 group animate-fade-in" onclick="abrirModal(${item.id})">
                <div class="h-48 overflow-hidden relative">
                    <span class="absolute top-2 right-2 bg-white/90 text-slate-700 text-xs px-2 py-1 rounded shadow-sm z-10">${item.categoria}</span>
                    <img src="${item.imagem}" alt="${item.nome}" class="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500">
                </div>
                <div class="p-5 text-center">
                    <h3 class="text-lg font-medium text-slate-800 mb-2 line-clamp-1">${item.nome}</h3>
                    <p class="text-emerald-600 font-semibold">${item.valor}</p>
                    <button class="mt-4 w-full border border-azul-convite text-azul-convite py-2 rounded-lg group-hover:bg-azul-convite group-hover:text-white transition-colors font-medium">
                        Presentear
                    </button>
                </div>
            </div>
        `;
        grid.innerHTML += cardHTML;
    });

    atualizarBotoesFiltro(categoria);
}

// 3. Lógica dos Filtros
function filtrarPresentes(categoria) {
    categoriaAtual = categoria;
    renderizarCards(categoriaAtual);
}

function atualizarBotoesFiltro(categoriaAtiva) {
    const botoes = document.querySelectorAll('.btn-filtro');
    botoes.forEach(btn => {
        if (btn.innerText.includes(categoriaAtiva) || (categoriaAtiva === 'Todos' && btn.innerText === 'Todos')) {
            btn.classList.add('bg-azul-convite', 'text-white');
            btn.classList.remove('bg-white', 'text-slate-600');
        } else {
            btn.classList.add('bg-white', 'text-slate-600');
            btn.classList.remove('bg-azul-convite', 'text-white');
        }
    });
}

// 4. Funções do Modal (Mantidas iguais)
function abrirModal(id) {
    const item = presentes.find(p => p.id === id);
    if (!item) return;

    document.getElementById('modal-img').src = item.imagem;
    document.getElementById('modal-nome').innerText = item.nome;
    document.getElementById('modal-valor').innerText = item.valor;
    document.getElementById('modal-qr').src = item.qrCode;
    document.getElementById('modal-chave-pix').innerText = item.chavePix;
    chavePixAtual = item.chavePix;

    document.getElementById('modal').classList.remove('hidden');
}

function fecharModal() {
    document.getElementById('modal').classList.add('hidden');
}

// 5. Novo sistema de Cópia com Toast Notification
function copiarPix() {
    navigator.clipboard.writeText(chavePixAtual).then(() => {
        mostrarToast();
    }).catch(err => {
        console.error('Falha ao copiar: ', err);
        alert("Não foi possível copiar a chave.");
    });
}

function mostrarToast() {
    const toast = document.getElementById('toast');
    // Mostra o toast
    toast.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
    toast.classList.add('opacity-100', 'translate-y-0');
    
    // Esconde depois de 3 segundos
    setTimeout(() => {
        toast.classList.remove('opacity-100', 'translate-y-0');
        toast.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
    }, 3000);
}

// 6. Contagem Regressiva (Mantida igual)
function iniciarContador() {
    const dataCasamento = new Date("May 31, 2026 12:00:00").getTime();

    const atualizarRelogio = setInterval(function() {
        const agora = new Date().getTime();
        const distancia = dataCasamento - agora;

        const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

        document.getElementById("dias").innerText = dias.toString().padStart(2, '0');
        document.getElementById("horas").innerText = horas.toString().padStart(2, '0');
        document.getElementById("minutos").innerText = minutos.toString().padStart(2, '0');
        document.getElementById("segundos").innerText = segundos.toString().padStart(2, '0');

        if (distancia < 0) {
            clearInterval(atualizarRelogio);
            document.getElementById("contador").innerHTML = "<p class='text-2xl mt-4'>O grande dia chegou!</p>";
        }
    }, 1000);
}

// Inicialização Atualizada
window.onload = () => {
    carregarPresentes(); // Chama a função do JSON primeiro
    iniciarContador();
};