// assets/js/area-paciente.js
document.addEventListener('DOMContentLoaded', function () {
    const pacienteLogado = getDadosUsuarioLogado();
    const sidebarUserNameEl = document.querySelector('.paciente-sidebar-header p#sidebarUserName, .paciente-sidebar-header p');
    const path = window.location.pathname;

    handleSidebarUserName(sidebarUserNameEl, pacienteLogado);
    if (redirectIfNotLogged(pacienteLogado, path)) return;

    // --- MEU PERFIL ---
    if (document.getElementById('formInformacoesPessoais') && pacienteLogado) {
        renderPerfilPage(pacienteLogado);
        setupPerfilEdit(pacienteLogado);
    }

    setupLogout();
    setupTabs(); // Configura abas para Minhas Consultas

    // --- MEUS EXAMES ---
    if (path.includes('meus-exames.html') && pacienteLogado) {
        renderMeusExames(pacienteLogado);
    }

    // --- MINHAS RECEITAS ---
    if (path.includes('minhas-receitas.html') && pacienteLogado) {
        renderMinhasReceitas(pacienteLogado);
    }

    // --- MINHAS CONSULTAS ---
    if (path.includes('minhas-consultas.html') && pacienteLogado) {
        renderMinhasConsultas(pacienteLogado);
    }
});

function handleSidebarUserName(sidebarUserNameEl, pacienteLogado) {
    if (sidebarUserNameEl && pacienteLogado) {
        sidebarUserNameEl.textContent = pacienteLogado.nomeCompleto;
    } else if (sidebarUserNameEl) {
        sidebarUserNameEl.textContent = "Visitante";
    }
}

function redirectIfNotLogged(pacienteLogado, path) {
    if (!pacienteLogado && path.includes('/area-paciente/')) {
        window.location.href = '../cadastro-login.html';
        return true;
    }
    return false;
}

function popularCampo(id, valor, isInput = true) {
    const campo = document.getElementById(id);
    if (campo) {
        if (isInput || campo.tagName === 'INPUT' || campo.tagName === 'TEXTAREA') {
            campo.value = valor !== undefined && valor !== null ? valor : '';
        } else {
            campo.textContent = valor !== undefined && valor !== null ? valor : 'N/A';
        }
    }
}

function popularCheckbox(id, valorBooleano) {
    const campo = document.getElementById(id);
    if (campo) {
        campo.checked = valorBooleano === true;
    }
}

function preencherListaResumo(ulId, items, mensagemVazia, formatadorItem) {
    const ulElement = document.getElementById(ulId);
    if (!ulElement) return;

    ulElement.innerHTML = '';
    if (items && items.length > 0) {
        items.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = formatadorItem(item);
            ulElement.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.innerHTML = `<em>${mensagemVazia}</em>`;
        ulElement.appendChild(li);
    }
}

function renderPerfilPage(pacienteLogado) {
    popularCampo('userName', pacienteLogado.nomeCompleto);
    popularCampo('userCpf', pacienteLogado.cpf);
    popularCampo('userDob', pacienteLogado.dataNascimento);
    popularCampo('userEmail', pacienteLogado.email);
    popularCampo('userTelefone', pacienteLogado.telefone);
    popularCampo('userTelegramId', pacienteLogado.telegramId || '');

    if (pacienteLogado.notificacoes) {
        popularCheckbox('notifEmail', pacienteLogado.notificacoes.email);
        popularCheckbox('notifTelegram', pacienteLogado.notificacoes.telegram);
        popularCheckbox('lembreteConsulta', pacienteLogado.notificacoes.lembreteConsulta);
    }

    preencherListaResumo('resumoProximasConsultas', pacienteLogado.proximasConsultas, 'Nenhuma consulta agendada.',
        item => `${item.especialidade} com ${item.medico} <br><small>${item.dataHora} - ${item.local}</small>`
    );
    preencherListaResumo('resumoReceitasAtivas', pacienteLogado.receitasAtivas, 'Nenhuma receita ativa.',
        item => `${item.nome} <br><small>Validade: ${item.validade}</small>`
    );
    preencherListaResumo('resumoUltimosExames', pacienteLogado.ultimosExames, 'Nenhum exame recente.',
        item => `${item.nome} (${item.data}) <br><small>Status: ${item.status}</small>`
    );
}

function setupPerfilEdit(pacienteLogado) {
    const editProfileButton = document.getElementById('editProfileButton');
    const saveProfileButton = document.getElementById('saveProfileButton');
    const cancelEditButton = document.getElementById('cancelEditButton');
    const formInformacoesPessoais = document.getElementById('formInformacoesPessoais');
    const editableFieldsIds = ['userEmail', 'userTelefone', 'userTelegramId', 'notifEmail', 'notifTelegram', 'lembreteConsulta'];
    let originalValues = {};

    if(saveProfileButton) saveProfileButton.classList.add('hidden'); // Inicia escondido
    if(cancelEditButton) cancelEditButton.classList.add('hidden'); // Inicia escondido
    if(editProfileButton) editProfileButton.classList.remove('hidden'); // Inicia visível

    function toggleEditMode(isEditing) {
        editableFieldsIds.forEach(id => {
            const field = document.getElementById(id);
            if (field) {
                field.disabled = !isEditing;
                if (isEditing && (field.type === 'text' || field.type === 'email' || field.type === 'tel')) {
                    originalValues[id] = field.value;
                } else if (isEditing && field.type === 'checkbox') {
                    originalValues[id] = field.checked;
                }
            }
        });
        ['userName', 'userCpf', 'userDob'].forEach(id => {
            const field = document.getElementById(id);
            if (field) field.disabled = true;
        });

        if (saveProfileButton) isEditing ? saveProfileButton.classList.remove('hidden') : saveProfileButton.classList.add('hidden');
        if (cancelEditButton) isEditing ? cancelEditButton.classList.remove('hidden') : cancelEditButton.classList.add('hidden');
        if (editProfileButton) isEditing ? editProfileButton.classList.add('hidden') : editProfileButton.classList.remove('hidden');

        if (formInformacoesPessoais) {
            if (isEditing) {
                formInformacoesPessoais.classList.add('edit-mode');
            } else {
                formInformacoesPessoais.classList.remove('edit-mode');
            }
        }
    }

    if (editProfileButton && formInformacoesPessoais) {
        editProfileButton.addEventListener('click', function () {
            toggleEditMode(true);
        });
    }
    if (cancelEditButton) {
        cancelEditButton.addEventListener('click', function () {
            editableFieldsIds.forEach(id => {
                const field = document.getElementById(id);
                if (field && originalValues.hasOwnProperty(id)) {
                    if (field.type === 'checkbox') {
                        field.checked = originalValues[id];
                    } else {
                        field.value = originalValues[id];
                    }
                }
            });
            toggleEditMode(false);
        });
    }
    if (saveProfileButton) {
        saveProfileButton.addEventListener('click', function () {
            if (pacienteLogado) {
                pacienteLogado.email = document.getElementById('userEmail').value;
                pacienteLogado.telefone = document.getElementById('userTelefone').value;
                pacienteLogado.telegramId = document.getElementById('userTelegramId').value;

                if (!pacienteLogado.notificacoes) pacienteLogado.notificacoes = {};
                pacienteLogado.notificacoes.email = document.getElementById('notifEmail').checked;
                pacienteLogado.notificacoes.telegram = document.getElementById('notifTelegram').checked;
                pacienteLogado.notificacoes.lembreteConsulta = document.getElementById('lembreteConsulta').checked;

                const cpfLimpo = pacienteLogado.cpf.replace(/\D/g, "");
                if (window.dadosPacientes?.[cpfLimpo]) {
                    window.dadosPacientes[cpfLimpo] = pacienteLogado;
                    localStorage.setItem('dadosPacientesStorage', JSON.stringify(window.dadosPacientes));
                }
                alert('Informações salvas com sucesso!'); // Alterado de console.log para alert
                toggleEditMode(false);
            }
        });
    }
}

function setupLogout() {
    const linkSair = document.getElementById('linkSair');
    if (linkSair) {
        linkSair.addEventListener('click', function (e) {
            e.preventDefault();
            if (typeof simularLogout === 'function') {
                simularLogout();
                window.location.href = '../../../index.html';
            }
        });
    }
}

function setupTabs() {
    const tabLinks = document.querySelectorAll('.consultas-tabs .tab-link');
    const tabContents = document.querySelectorAll('.paciente-content-area .tab-content');
    tabLinks.forEach(link => {
        link.addEventListener('click', function () {
            const targetTabId = this.getAttribute('data-tab');
            tabLinks.forEach(l => l.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active')); // Esconde todos os conteúdos de aba
            this.classList.add('active');
            const targetContent = document.getElementById(targetTabId);
            if (targetContent) {
                targetContent.classList.add('active'); // Mostra o conteúdo da aba ativa
                const paciente = getDadosUsuarioLogado();
                if(paciente) {
                    if(targetTabId === 'proximas-consultas-content') {
                        renderProximasConsultas(paciente,
                            document.getElementById('proximasConsultasList'),
                            document.getElementById('proximasConsultasPlaceholder')
                        );
                    } else if (targetTabId === 'historico-consultas-content') {
                        renderHistoricoConsultas(paciente,
                            document.getElementById('historicoConsultasList'),
                            document.getElementById('historicoConsultasPlaceholder')
                        );
                    }
                }
            }
        });
    });
}

function renderMeusExames(pacienteLogado) {
    const tabelaExamesBody = document.querySelector('#tabelaExames tbody');
    const examesPlaceholder = document.getElementById('examesPlaceholder');
    const tabelaExames = document.getElementById('tabelaExames');

    if (!tabelaExamesBody || !examesPlaceholder || !tabelaExames) return;
    
    // Primeiro, esconde tanto a tabela quanto o placeholder
    tabelaExames.classList.add('hidden');
    examesPlaceholder.classList.add('hidden');
    
    if (!pacienteLogado?.ultimosExames || pacienteLogado.ultimosExames.length === 0) {
        // Se não há exames, mostra o placeholder e mantém a tabela escondida
        examesPlaceholder.classList.remove('hidden');
        return;
    }

    // Se chegou aqui, há exames para mostrar
    tabelaExames.classList.remove('hidden');
    tabelaExamesBody.innerHTML = '';

    if (pacienteLogado?.ultimosExames?.length > 0) {
        // Se há exames, mostra a tabela e esconde o placeholder
        tabelaExames.classList.remove('hidden');
        pacienteLogado.ultimosExames.forEach(exame => {
            const tr = document.createElement('tr');
            let pdfLinkHtml = 'N/A';
            if (exame.pdfLink && exame.pdfLink !== '#') {
                pdfLinkHtml = `<a href="${exame.pdfLink}" class="btn btn-secondary btn-sm" download>Baixar PDF</a>`;
            } else if (exame.pdfLink === '#') {
                pdfLinkHtml = `<a href="#" class="btn btn-secondary btn-sm" onclick="alert('Link de download indisponível no momento.'); return false;">Baixar PDF</a>`;
            }
            tr.innerHTML = `
                <td>${exame.nome}</td>
                <td>${exame.data}</td>
                <td>
                    <span class="tag-status ${exame.status === 'Disponível' ? 'disponivel' : 'pendente'}">${exame.status}</span>
                    ${exame.descricaoResultado ? `<span class="resultado-desc">${exame.descricaoResultado}</span>` : ''}
                </td>
                <td>${pdfLinkHtml}</td>
            `;
            tabelaExamesBody.appendChild(tr);
        });
    } else {
        // Se não há exames, mostra o placeholder e esconde a tabela
        examesPlaceholder.classList.remove('hidden');
    }
}

function renderMinhasReceitas(pacienteLogado) {
    const receitasContainer = document.getElementById('listaReceitasContainer');
    const receitasPlaceholder = document.getElementById('receitasPlaceholder');
    
    if (!receitasContainer || !receitasPlaceholder) return;

    // Primeiro, esconde o placeholder
    receitasPlaceholder.classList.add('hidden');
    
    const currentRecipeCards = receitasContainer.querySelectorAll('.item-card');
    currentRecipeCards.forEach(card => card.remove());

    if (pacienteLogado?.receitasAtivas?.length > 0) {
        // Se há receitas, mantém o placeholder escondido
        pacienteLogado.receitasAtivas.forEach(receita => {
            const card = document.createElement('div');
            card.classList.add('item-card');
            const [diaV, mesV, anoV] = receita.validade.split('/').map(Number);
            const dataValidade = new Date(anoV, mesV - 1, diaV);
            const hoje = new Date();
            hoje.setHours(0, 0, 0, 0);
            const status = dataValidade < hoje ? 'Expirada' : 'Ativa';
            const statusClass = status === 'Ativa' ? 'ativa' : 'expirada';

            card.innerHTML = `
                <div class="item-card-header">
                    <h3>${receita.nome}</h3>
                    <span class="tag-status ${statusClass}">${status}</span>
                </div>
                <div class="item-info">
                    <p><strong>Instruções:</strong> ${receita.instrucoes}</p>
                    <p><strong>Médico:</strong> ${receita.medico}</p>
                    <p><strong>Data da Prescrição:</strong> ${receita.dataPrescricao}</p>
                    <p><strong>Validade:</strong> ${receita.validade}</p>
                </div>
                <div class="item-actions">
                    <a href="#" class="btn btn-secondary btn-sm" onclick="alert('Funcionalidade de download de receita ainda não implementada.'); return false;">Baixar Receita (PDF)</a>
                </div>
            `;
            receitasContainer.appendChild(card);
        });
    } else {
        // Se não há receitas, mostra o placeholder
        receitasPlaceholder.classList.remove('hidden');
        receitasPlaceholder.innerHTML = `
            <img src="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23777'%3E%3Cpath d='M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2h4v2h-4V4zm-6 2V4h4v2H8zm12 14H4V8h16v12zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zM5 8V6h14v2H5z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.25 2.52.77-1.28-3.52-2.09V8H12z'/%3E%3C/svg%3E" alt="Maleta de Receitas" class="placeholder-icon">
            <p>Você não possui receitas médicas.</p>`;
    }
}

function renderizarConsultaCard(consulta, isProxima = true) {
    const isTeleconsulta = consulta.local?.toLowerCase().includes('teleconsulta') || false;
    let actionsHtml = '';
    if (isProxima) {
        actionsHtml = `<a href="#" class="btn btn-secondary btn-sm cancelar-consulta-btn" data-consulta-id="${consulta.dataHora}-${consulta.medico.replace(/\s+/g, '')}">Cancelar</a>`;
        if (isTeleconsulta) {
            actionsHtml += `<a href="https://meet.google.com/" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">Entrar na Teleconsulta</a>`;
        } else {
            actionsHtml += `<a href="#" class="btn btn-secondary btn-sm ver-detalhes-btn">Ver Detalhes</a>`;
        }
    } else {
        actionsHtml = `<a href="#" class="btn btn-secondary btn-sm ver-resumo-btn">Ver Resumo</a>`;
    }
    return `
        <div class="item-card">
            <div class="item-card-header">
                <h3>${consulta.especialidade} ${isTeleconsulta && isProxima ? '(Teleconsulta)' : ''}</h3>
                <span class="tag-status ${isProxima ? 'ativa' : 'realizada'}">${isProxima ? 'Agendada' : 'Realizada'}</span>
            </div>
            <div class="item-info">
                <p><strong>Médico:</strong> ${consulta.medico}</p>
                <p><strong>Data e Horário:</strong> ${consulta.dataHora}</p>
                <p><strong>Local:</strong> ${consulta.local}</p>
                ${consulta.observacoes ? `<p><strong>Observações:</strong> ${consulta.observacoes}</p>` : ''}
            </div>
            <div class="item-actions">
                ${actionsHtml}
            </div>
        </div>`;
}

function renderProximasConsultas(pacienteLogado, listElement, placeholderElement) {
    if (!listElement || !placeholderElement) return;
    listElement.innerHTML = '';
    if (pacienteLogado.proximasConsultas && pacienteLogado.proximasConsultas.length > 0) {
        pacienteLogado.proximasConsultas.forEach(consulta => {
            listElement.innerHTML += renderizarConsultaCard(consulta, true);
        });
        placeholderElement.classList.add('hidden');
    } else {
        placeholderElement.classList.remove('hidden');
         placeholderElement.innerHTML = `
            <img src="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23777'%3E%3Cpath d='M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zM5 8V6h14v2H5z'/%3E%3C/svg%3E" alt="Calendário Vazio" class="placeholder-icon">
            <p>Sem consultas agendadas</p>
            <p>Você não possui consultas agendadas para os próximos dias.</p>`;
    }
}

function renderHistoricoConsultas(pacienteLogado, listElement, placeholderElement) {
    if (!listElement || !placeholderElement) return;
    listElement.innerHTML = '';
    if (pacienteLogado.historicoConsultas && pacienteLogado.historicoConsultas.length > 0) {
        pacienteLogado.historicoConsultas.forEach(consulta => {
            listElement.innerHTML += renderizarConsultaCard(consulta, false);
        });
        placeholderElement.classList.add('hidden');
    } else {
        placeholderElement.classList.remove('hidden');
        placeholderElement.innerHTML = `
            <img src="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23777'%3E%3Cpath d='M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.25 2.52.77-1.28-3.52-2.09V8H12z'/%3E%3C/svg%3E" alt="Relógio de Histórico" class="placeholder-icon">
            <p>Seu histórico de consultas está vazio.</p>`;
    }
}

function renderMinhasConsultas(pacienteLogado) {
    const proximasConsultasList = document.getElementById('proximasConsultasList');
    const proximasConsultasPlaceholder = document.getElementById('proximasConsultasPlaceholder');
    const historicoConsultasList = document.getElementById('historicoConsultasList');
    const historicoConsultasPlaceholder = document.getElementById('historicoConsultasPlaceholder');

    // Primeiro, esconde todos os placeholders
    if (proximasConsultasPlaceholder) proximasConsultasPlaceholder.classList.add('hidden');
    if (historicoConsultasPlaceholder) historicoConsultasPlaceholder.classList.add('hidden');

    if (proximasConsultasList) proximasConsultasList.innerHTML = '';
    if (historicoConsultasList) historicoConsultasList.innerHTML = '';

    // Renderiza as próximas consultas
    if (pacienteLogado?.proximasConsultas?.length > 0) {
        renderProximasConsultas(pacienteLogado, proximasConsultasList, proximasConsultasPlaceholder);
    } else if (proximasConsultasPlaceholder) {
        proximasConsultasPlaceholder.classList.remove('hidden');
    }

    // Renderiza o histórico
    if (pacienteLogado?.historicoConsultas?.length > 0) {
        renderHistoricoConsultas(pacienteLogado, historicoConsultasList, historicoConsultasPlaceholder);
    } else if (historicoConsultasPlaceholder) {
        historicoConsultasPlaceholder.classList.remove('hidden');
    }

    setupAgendamentoModal(pacienteLogado, proximasConsultasList, proximasConsultasPlaceholder);
    setupConsultasDelegation(pacienteLogado, proximasConsultasList, proximasConsultasPlaceholder, historicoConsultasList);
}

function setupAgendamentoModal(pacienteLogado, proximasConsultasListElement, proximasConsultasPlaceholderElement) {
    const modalAgendarConsulta = document.getElementById('modalAgendarConsulta');
    const agendarNovaConsultaBtn = document.getElementById('agendarNovaConsultaBtn');
    const closeModalBtn = modalAgendarConsulta ? modalAgendarConsulta.querySelector('.modal-close-btn') : null;
    const formAgendarConsulta = document.getElementById('formAgendarConsulta');
    const agendamentoStatus = document.getElementById('agendamentoStatus');

    if (agendarNovaConsultaBtn && modalAgendarConsulta) {
        agendarNovaConsultaBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (typeof modalAgendarConsulta.showModal === "function") {
                modalAgendarConsulta.showModal();
            } else {
                modalAgendarConsulta.classList.add('active');
                modalAgendarConsulta.setAttribute('aria-hidden', 'false');
            }
        });
    }
    if (closeModalBtn && modalAgendarConsulta) {
        closeModalBtn.addEventListener('click', () => {
            if (typeof modalAgendarConsulta.close === "function") {
                modalAgendarConsulta.close();
            } else {
                modalAgendarConsulta.classList.remove('active');
                modalAgendarConsulta.setAttribute('aria-hidden', 'true');
                if (formAgendarConsulta) {
                    formAgendarConsulta.reset();
                }
                if (agendamentoStatus) {
                    agendamentoStatus.textContent = '';
                }
            }
        });
    }
    if (modalAgendarConsulta && typeof modalAgendarConsulta.showModal !== "function") {
        modalAgendarConsulta.addEventListener('click', (event) => {
            if (event.target === modalAgendarConsulta) {
                modalAgendarConsulta.classList.remove('active');
                modalAgendarConsulta.setAttribute('aria-hidden', 'true');
                if (formAgendarConsulta) formAgendarConsulta.reset();
                if (agendamentoStatus) agendamentoStatus.textContent = '';
            }
        });
    }

    if (formAgendarConsulta && pacienteLogado) {
        formAgendarConsulta.addEventListener('submit', function (e) {
            e.preventDefault();
            const novaConsulta = {
                tipo: document.getElementById('tipoConsulta').value,
                especialidade: document.getElementById('especialidadeConsulta').value,
                medico: document.getElementById('medicoConsulta').value || 'A ser definido',
                dataHora: formatarDataHora(document.getElementById('dataConsulta').value),
                local: document.getElementById('localConsulta').value,
                observacoes: document.getElementById('observacoesConsulta').value,
            };

            if (!pacienteLogado.proximasConsultas) {
                pacienteLogado.proximasConsultas = [];
            }
            pacienteLogado.proximasConsultas.push(novaConsulta);

            const cpfLimpo = pacienteLogado.cpf.replace(/\D/g, "");
            if (window.dadosPacientes?.[cpfLimpo]) {
                window.dadosPacientes[cpfLimpo] = pacienteLogado;
                localStorage.setItem('dadosPacientesStorage', JSON.stringify(window.dadosPacientes));
            }
            
            renderProximasConsultas(pacienteLogado, proximasConsultasListElement, proximasConsultasPlaceholderElement);

            if (agendamentoStatus) {
                agendamentoStatus.textContent = 'Consulta agendada com sucesso!';
                agendamentoStatus.className = 'form-status-message success';
            }
            formAgendarConsulta.reset();
            setTimeout(() => {
                if (modalAgendarConsulta) {
                    if (typeof modalAgendarConsulta.close === "function") {
                        modalAgendarConsulta.close();
                    } else {
                        modalAgendarConsulta.classList.remove('active');
                        modalAgendarConsulta.setAttribute('aria-hidden', 'true');
                    }
                }
                if (agendamentoStatus) agendamentoStatus.textContent = '';
            }, 2000);
        });
    }
}

function setupConsultasDelegation(pacienteLogado, proximasConsultasList, proximasConsultasPlaceholder, historicoConsultasList) {
    if (proximasConsultasList) {
        proximasConsultasList.addEventListener('click', function (event) {
            if (event.target.classList.contains('cancelar-consulta-btn')) {
                event.preventDefault();
                const consultaId = event.target.dataset.consultaId;
                if (confirm('Tem certeza que deseja cancelar esta consulta?')) {
                    pacienteLogado.proximasConsultas = pacienteLogado.proximasConsultas.filter(
                        c => `${c.dataHora}-${c.medico.replace(/\s+/g, '')}` !== consultaId
                    );
                    const cpfLimpo = pacienteLogado.cpf.replace(/\D/g, "");
                    if (window.dadosPacientes?.[cpfLimpo]) {
                        window.dadosPacientes[cpfLimpo] = pacienteLogado;
                        localStorage.setItem('dadosPacientesStorage', JSON.stringify(window.dadosPacientes));
                    }
                    // Re-renderizar a lista de próximas consultas para refletir a remoção e o estado do placeholder
                    renderProximasConsultas(pacienteLogado, proximasConsultasList, proximasConsultasPlaceholder);
                    alert('Consulta cancelada com sucesso.');
                }
            } else if (event.target.classList.contains('ver-detalhes-btn')) {
                event.preventDefault();
                alert("Funcionalidade 'Ver Detalhes' ainda não implementada.");
            }
        });
    }
    if (historicoConsultasList) {
        historicoConsultasList.addEventListener('click', function (event) {
            if (event.target.classList.contains('ver-resumo-btn')) {
                event.preventDefault();
                alert("Funcionalidade 'Ver Resumo' do histórico ainda não implementada.");
            }
        });
    }
}

function formatarDataHora(dateTimeString) {
    if (!dateTimeString) return '';
    const date = new Date(dateTimeString);
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const ano = date.getFullYear();
    const horas = String(date.getHours()).padStart(2, '0');
    const minutos = String(date.getMinutes()).padStart(2, '0');
    return `${dia}/${mes}/${ano} às ${horas}:${minutos}`;
}