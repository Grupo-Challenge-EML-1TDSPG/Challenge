// assets/js/dados-pacientes.js

// Tenta carregar dados do localStorage, ou usa o default.
let dadosPacientes = JSON.parse(localStorage.getItem('dadosPacientesStorage')) || {
    "39294208052": { // CPF do Enzo (chave única) - Formato apenas números para chave
        nomeCompleto: "Enzo Okuizumi",
        cpf: "392.942.080-52", // CPF formatado para exibição
        dataNascimento: "14/05/1985",
        email: "enzo.okuizumi@gmail.com",
        telefone: "(11) 98765-4321",
        senhaPlana: "123@mudar", // Apenas para simulação! NUNCA armazene senhas assim.
        telegramId: "123456789", // ID do chat do Telegram (opcional)
        notificacoes: {
            email: true,
            telegram: true,
            lembreteConsulta: true
        },
        proximasConsultas: [
            { tipo: "Consulta Presencial", especialidade: "Cardiologia", medico: "Dr. Ricardo Alves", dataHora: "25/08/2024 às 10:00", local: "HC Clínicas - Unidade Central", observacoes: "Trazer exames anteriores." },
            { tipo: "Teleconsulta", especialidade: "Clínica Geral", medico: "Dra. Ana Martins", dataHora: "10/09/2024 às 14:30", local: "Teleconsulta via Google Meet", observacoes: "Verificar conexão antes."}
        ],
        receitasAtivas: [
            { nome: "Losartana Potássica 50mg", instrucoes: "1 comprimido, 1x ao dia", medico: "Dr. Ricardo Alves", dataPrescricao: "10/07/2024", validade: "10/01/2025" },
            { nome: "Metformina 500mg", instrucoes: "1 comprimido, 2x ao dia após as refeições", medico: "Dra. Beatriz Costa", dataPrescricao: "15/06/2024", validade: "15/12/2024" }
        ],
        ultimosExames: [
            { nome: "Hemograma Completo", data: "30/04/2024", status: "Disponível", descricaoResultado: "Dentro dos parâmetros normais", pdfLink: "#" },
            { nome: "Glicemia em Jejum", data: "19/04/2024", status: "Disponível", descricaoResultado: "Elevada - 110 mg/dL", pdfLink: "#" },
            { nome: "Colesterol Total", data: "19/04/2024", status: "Disponível", descricaoResultado: "Normal - 180 mg/dL", pdfLink: "#" }
        ],
        historicoConsultas: [
            { tipo: "Teleconsulta", especialidade: "Endocrinologia", medico: "Dra. Beatriz Costa", dataHora: "18/05/2024 às 14:00", local: "Teleconsulta" },
            { tipo: "Consulta Presencial", especialidade: "Clínica Geral", medico: "Dr. Carlos Martins", dataHora: "02/03/2024 às 09:30", local: "IMREA Vila Mariana" }
        ]
    },
    "12345678900": { // CPF Fictício do Lucas
        nomeCompleto: "Lucas Barros Gouveia",
        cpf: "123.456.789-00",
        dataNascimento: "22/09/1992",
        email: "lucas.barros@example.com",
        telefone: "(11) 91234-5678",
        senhaPlana: "Lucas@123",
        telegramId: "", // Sem ID do Telegram
        notificacoes: {
            email: true,
            telegram: false,
            lembreteConsulta: true
        },
        proximasConsultas: [
            { tipo: "Teleconsulta", especialidade: "Dermatologia", medico: "Dra. Sofia Pereira", dataHora: "10/09/2024 às 15:30", local: "Teleconsulta", observacoes: "Tenha boa iluminação no ambiente."}
        ],
        receitasAtivas: [
            { nome: "Isotretinoína 20mg", instrucoes: "1 cápsula ao dia, após o almoço", medico: "Dra. Sofia Pereira", dataPrescricao: "01/08/2024", validade: "01/11/2024" }
        ],
        ultimosExames: [
            { nome: "Perfil Lipídico", data: "15/07/2024", status: "Disponível", descricaoResultado: "HDL baixo, demais normais", pdfLink: "#" }
        ],
        historicoConsultas: [] // Sem histórico por enquanto
    },
    "09876543211": { // CPF Fictício do Milton
        nomeCompleto: "Milton Marcelino",
        cpf: "098.765.432-11",
        dataNascimento: "05/03/1978",
        email: "milton.marcelino@example.com",
        telefone: "(11) 90987-6543",
        senhaPlana: "Milton@123",
        telegramId: "555666777",
        notificacoes: {
            email: false,
            telegram: true,
            lembreteConsulta: false
        },
        proximasConsultas: [], // Sem próximas consultas
        receitasAtivas: [], // Sem receitas ativas
        ultimosExames: [], // Sem exames
        historicoConsultas: [
             { tipo: "Consulta Presencial", especialidade: "Gastroenterologia", medico: "Dr. Antônio Silva", dataHora: "20/07/2024 às 16:00", local: "HC Clínicas - Unidade Central" }
        ]
    }
    // Novos usuários cadastrados serão adicionados aqui pelo login.js
};

// Função para simular login e armazenar o CPF do usuário logado
function simularLogin(cpfInput, senhaInput) {
    const cpfLimpo = cpfInput.replace(/\D/g, ""); // Remove formatação do CPF para buscar
    if (dadosPacientes[cpfLimpo] && dadosPacientes[cpfLimpo].senhaPlana === senhaInput) { // Validação de senha SIMULADA
        localStorage.setItem('usuarioLogadoCpf', cpfLimpo);
        return true;
    }
    return false;
}

// Função para registrar um novo usuário (simulação)
function registrarNovoUsuario(dadosNovoUsuario) {
    const cpfLimpo = dadosNovoUsuario.cpf.replace(/\D/g, "");
    if (dadosPacientes[cpfLimpo]) {
        return false; // Usuário já existe
    }
    // Adiciona o novo usuário ao objeto dadosPacientes
    dadosPacientes[cpfLimpo] = {
        nomeCompleto: dadosNovoUsuario.nome,
        cpf: formatarCPF(cpfLimpo), // Formata o CPF antes de salvar
        dataNascimento: dadosNovoUsuario.dataNascimento,
        email: dadosNovoUsuario.email,
        telefone: dadosNovoUsuario.telefone || "", // Telefone pode ser opcional
        senhaPlana: dadosNovoUsuario.senha, // NÃO FAÇA ISSO EM PRODUÇÃO
        telegramId: "", // Telegram ID vazio por padrão
        notificacoes: { // Preferências de notificação padrão
            email: true,
            telegram: false,
            lembreteConsulta: true
        },
        proximasConsultas: [], // Listas vazias para novo usuário
        receitasAtivas: [],
        ultimosExames: [],
        historicoConsultas: []
    };
    // Salvar no localStorage para persistir a simulação
    localStorage.setItem('dadosPacientesStorage', JSON.stringify(dadosPacientes));
    return true;
}

function formatarCPF(cpf) {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');
    // Aplica a formatação XXX.XXX.XXX-XX
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}


// Função para obter o CPF do usuário logado
function getUsuarioLogadoCpf() {
    return localStorage.getItem('usuarioLogadoCpf');
}

// Função para obter dados do usuário logado
function getDadosUsuarioLogado() {
    const cpfLogado = localStorage.getItem('usuarioLogadoCpf');
    if (!cpfLogado) return null;
    
    // Recarrega do localStorage para garantir que os dados estejam atualizados se modificados em outra aba/sessão
    const dadosAtuais = JSON.parse(localStorage.getItem('dadosPacientesStorage')) || dadosPacientes;
    return dadosAtuais[cpfLogado] || null;
}

function simularLogout() {
    localStorage.removeItem('usuarioLogadoCpf');
}

// Inicializa o localStorage com os dados padrão se ainda não existir
if (!localStorage.getItem('dadosPacientesStorage')) {
    localStorage.setItem('dadosPacientesStorage', JSON.stringify(dadosPacientes));
}