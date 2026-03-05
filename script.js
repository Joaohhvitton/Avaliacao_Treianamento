window.APP_CONFIG = window.APP_CONFIG || {
  googleSheets: {
    sheetId: "15s3H_uI-6pO4FQFuxJS2DkJtJqtP4tD-swBQw91waJw",
    apiKey: "AIzaSyD9PazDh8LE7O6m76ODALpX9swQgdafgs4",
    range: "A:H",
    formsUrl: "",
  },
  googleForms: {
    url: "",
  },
};

const fallbackDadosPorDia = [
  { dia: "Dia 1", pontuacaoMaxima: 100, pontuacao: 660, mediaGrupo: 94.29, variacao: 0 },
  { dia: "Dia 2", pontuacaoMaxima: 110, pontuacao: 980, mediaGrupo: 98.0, variacao: 3.71 },
  { dia: "Dia 3", pontuacaoMaxima: 100, pontuacao: 850, mediaGrupo: 94.44, variacao: -3.56 },
  { dia: "Dia 4", pontuacaoMaxima: 90, pontuacao: 760, mediaGrupo: 69.09, variacao: -25.35 },
];

const fallbackParticipantes = [
  { nome: "Giselda Cecília Martins", totalAcerto: 95, percentualAcertoTotal: 95 },
  { nome: "Nathalia Barbosa Campos", totalAcerto: 90, percentualAcertoTotal: 90 },
  { nome: "Taymara Cristina", totalAcerto: 90, percentualAcertoTotal: 90 },
  { nome: "Severiano Lima", totalAcerto: 70, percentualAcertoTotal: 70 },
  { nome: "Carlos Eduardo", totalAcerto: 70, percentualAcertoTotal: 70 },
];

const fallbackDetalhamento = [
  {
    participante: "Giselda Cecília Martins",
    dia: "Dia 1",
    pontMaxima: 100,
    pontuacao: 660,
    media: 94.29,
    acerto: 95,
    classificacao: "Alta Performance",
  },
  {
    participante: "Guilherme Ferreira Marques",
    dia: "Dia 2",
    pontMaxima: 100,
    pontuacao: 980,
    media: 98,
    acerto: 90,
    classificacao: "Alta Performance",
  },
];

const fallbackQuestoesPorDia = {
  "Dia 1": [
    {
      pergunta: "O que é uma adquirente?",
      pontos: 10,
      alternativas: [
        "Banco emissor do cartão",
        "Empresa que fabrica máquinas POS",
        "Instituição que intermedeia e processa pagamentos",
        "Cliente que aceita cartão",
      ],
      resposta: "Instituição que intermedeia e processa pagamentos",
    },
    {
      pergunta: "O que é uma sub-adquirente?",
      pontos: 10,
      alternativas: [
        "Empresa que emite cartões de crédito para os clientes",
        "Participante homologado pelas bandeiras que contrata adquirentes para oferecer meios de pagamento aos estabelecimentos",
        "Banco responsável por autorizar ou negar transações",
        "Empresa que fabrica máquinas POS",
      ],
      resposta: "Participante homologado pelas bandeiras que contrata adquirentes para oferecer meios de pagamento aos estabelecimentos",
    },
    {
      pergunta: "Qual é a função da bandeira na transação (Visa, Mastercard, etc.)?",
      pontos: 10,
      alternativas: [
        "Autorizar saldo",
        "Fazer o roteamento entre adquirente e emissor",
        "Vender máquinas",
        "Definir limite do cliente",
      ],
      resposta: "Fazer o roteamento entre adquirente e emissor",
    },
    {
      pergunta: "Quem decide aprovar ou negar uma transação?",
      pontos: 10,
      alternativas: ["O lojista", "A adquirente", "O banco emissor", "O atendente SAC"],
      resposta: "O banco emissor",
    },
    {
      pergunta: "O que significa MDR?",
      pontos: 10,
      alternativas: [
        "Modelo de Documento Registrado",
        "Merchant Discount Rate (taxa do comerciante)",
        "Movimento Diário de Receita",
        "Modalidade de Débito Registrado",
      ],
      resposta: "Merchant Discount Rate (taxa do comerciante)",
    },
    {
      pergunta: "O MCC é utilizado para:",
      pontos: 10,
      alternativas: [
        "Definir limite do cliente",
        "Classificar o tipo de negócio do estabelecimento",
        "Registrar chamados",
        "Gerar cupom fiscal",
      ],
      resposta: "Classificar o tipo de negócio do estabelecimento",
    },
    {
      pergunta: "No fluxo de transação POS, o que acontece primeiro?",
      pontos: 10,
      alternativas: [
        "Liquidação",
        "Impressão do cupom",
        "Captura da leitura do cartão",
        "Retorno da autorização",
      ],
      resposta: "Captura da leitura do cartão",
    },
    {
      pergunta: "Após a autorização do emissor, o que ocorre no POS?",
      pontos: 10,
      alternativas: [
        "O sistema reinicia",
        "O terminal recebe aprovação ou negação",
        "A máquina bloqueia",
        "O cliente faz novo cadastro",
      ],
      resposta: "O terminal recebe aprovação ou negação",
    },
    {
      pergunta: "Quais são os principais atores envolvidos em uma transação de cartão?",
      pontos: 10,
      alternativas: [
        "Cliente, vendedor e contador",
        "Adquirente, bandeira e emissor",
        "SAC, N2 e OPCOM",
        "Marketing e Comercial",
      ],
      resposta: "Adquirente, bandeira e emissor",
    },
    {
      pergunta: "O banco emissor analisa quais critérios para aprovar ou negar uma transação?",
      pontos: 10,
      alternativas: [
        "Apenas o valor da compra",
        "Saldo, limite de crédito, status do cartão e risco de fraude",
        "Cidade do estabelecimento",
        "Marca da maquininha",
      ],
      resposta: "Saldo, limite de crédito, status do cartão e risco de fraude",
    },
  ],
  "Dia 2": [
    {
      pergunta: "O que é a CIP?",
      pontos: 10,
      alternativas: [
        "Banco emissor",
        "Câmera Interbancária de Pagamentos",
        "Sistema interno da adquirente",
        "Plataforma de vendas",
      ],
      resposta: "Câmera Interbancária de Pagamentos",
    },
    {
      pergunta: "Qual é o prazo de liquidação para vendas no débito?",
      pontos: 10,
      alternativas: ["D+0", "D+1", "D+15", "D+30"],
      resposta: "D+1",
    },
    {
      pergunta: "Qual é o prazo padrão de liquidação para crédito à vista (sem antecipação automática)?",
      pontos: 10,
      alternativas: ["D+1", "D+7", "D+15", "D+30"],
      resposta: "D+30",
    },
    {
      pergunta: "O que é antecipação de pagamentos?",
      pontos: 10,
      alternativas: [
        "Cancelamento da venda",
        "Recebimento antes do prazo original, com desconto de taxa",
        "Estorno automático",
        "Aumento do limite do cliente",
      ],
      resposta: "Recebimento antes do prazo original, com desconto de taxa",
    },
    {
      pergunta: "O que representa o valor bruto?",
      pontos: 10,
      alternativas: [
        "Valor já descontado das taxas",
        "Valor total da venda antes de descontos",
        "Valor líquido creditado",
        "Valor com antecipação aplicada",
      ],
      resposta: "Valor total da venda antes de descontos",
    },
    {
      pergunta: "A antecipação automática (RAV) significa:",
      pontos: 10,
      alternativas: [
        "Recebimento do crédito automaticamente no próximo dia útil",
        "Cancelamento automático",
        "Antecipação apenas sob solicitação",
        "Liquidação em D+30",
      ],
      resposta: "Recebimento do crédito automaticamente no próximo dia útil",
    },
    {
      pergunta: "O efeito de contrato é autorizado por qual órgão?",
      pontos: 10,
      alternativas: ["Receita Federal", "Banco Central do Brasil", "CIP", "PSP"],
      resposta: "Banco Central do Brasil",
    },
    {
      pergunta: "Um lojista questiona por que recebeu R$ 8.000,00 de uma venda de R$ 10.000,00. Foi identificado efeito de contrato por dívida de R$ 2.000,00. Qual a explicação correta?",
      pontos: 10,
      alternativas: [
        "Foi erro do sistema",
        "Houve cobrança indevida de taxa",
        "O valor da dívida foi retido automaticamente conforme contrato",
        "A CIP reduziu o valor",
      ],
      resposta: "O valor da dívida foi retido automaticamente conforme contrato",
    },
    {
      pergunta: "No fluxo PIX, o código 715 representa:",
      pontos: 10,
      alternativas: ["Liquidação final", "Geração do QR Code", "Estorno", "Cancelamento"],
      resposta: "Geração do QR Code",
    },
    {
      pergunta: "Qual é a função da Sonda?",
      pontos: 10,
      alternativas: [
        "Gerar QR Code",
        "Monitorar transações pendentes automaticamente",
        "Calcular antecipação",
        "Autorizar vendas",
      ],
      resposta: "Monitorar transações pendentes automaticamente",
    },
    {
      pergunta: "Com quais emissores/PSPs realizamos as transações PIX na operação?",
      pontos: 10,
      alternativas: [
        "Banco do Brasil e Bradesco",
        "Nubank e Santander",
        "Banco Arbi e Itaú",
        "Qualquer banco participante do SPI",
      ],
      resposta: "Banco Arbi e Itaú",
    },
  ],
  "Dia 3": [
    {
      pergunta: "No Gestão Solver, a consulta de transações permite filtrar por:",
      pontos: 10,
      alternativas: [
        "Apenas data",
        "Apenas valor",
        "Data, valor, bandeira e status",
        "Apenas CNPJ",
      ],
      resposta: "Data, valor, bandeira e status",
    },
    {
      pergunta: "A parametrização do terminal garante:",
      pontos: 10,
      alternativas: [
        "Redução de taxa",
        "Comunicação correta com o host autorizador",
        "Cancelamento automático",
        "Antecipação diária",
      ],
      resposta: "Comunicação correta com o host autorizador",
    },
    {
      pergunta: "Os arranjos de bandeira são importantes porque:",
      pontos: 10,
      alternativas: [
        "Aumentam o limite do cliente",
        "Permitem que o terminal reconheça e processe bandeiras específicas",
        "Reduzem o tempo de liquidação",
        "Ativam o PIX automaticamente",
      ],
      resposta: "Permitem que o terminal reconheça e processe bandeiras específicas",
    },
    {
      pergunta: "Cada bandeira possui:",
      pontos: 10,
      alternativas: ["1 arranjo", "2 arranjos", "4 arranjos", "Quantidade ilimitada"],
      resposta: "4 arranjos",
    },
    {
      pergunta: "O Metabase é utilizado principalmente para:",
      pontos: 10,
      alternativas: [
        "Parametrizar POS",
        "Monitorar e consultar transações PIX",
        "Calcular aluguel",
        "Alterar cadastro",
      ],
      resposta: "Monitorar e consultar transações PIX",
    },
    {
      pergunta: "Para consultar transações PIX Itaú no Metabase, é possível filtrar por:",
      pontos: 10,
      alternativas: [
        "IP do terminal",
        "Data do Cash-In, CNPJ e valor",
        "Número lógico apenas",
        "Versão do software",
      ],
      resposta: "Data do Cash-In, CNPJ e valor",
    },
    {
      pergunta: "No Portal do Cliente, o simulador de vendas permite:",
      pontos: 10,
      alternativas: [
        "Cancelar transação",
        "Alterar taxa",
        "Simular valor bruto, taxas e valor líquido",
        "Parametrizar terminal",
      ],
      resposta: "Simular valor bruto, taxas e valor líquido",
    },
    {
      pergunta: "No TMS7 o terminal está Ativo, porém não passa cartões com a bandeira Mastercard. Quais itens devem ser verificados?",
      pontos: 10,
      alternativas: [
        "Versão de software apenas",
        "Arranjos de bandeira e parametrização",
        "IP da loja",
        "Agenda financeira",
      ],
      resposta: "Arranjos de bandeira e parametrização",
    },
    {
      pergunta: "Todo cadastro criado no Gestão Solver deve estar integrado ao TMS7 para que o terminal possa autorizar transações?",
      pontos: 10,
      alternativas: ["Falso", "Verdadeiro"],
      resposta: "Verdadeiro",
    },
    {
      pergunta: "Um estabelecimento afirma que as vendas estão aprovando, mas não aparecem no Portal. Qual sequência correta de verificação?",
      pontos: 10,
      alternativas: [
        "Metabase → Solver → TMS7",
        "Gestão → Relatórios → Portal → Transações",
        "CIP → Emissor → PSP",
        "Apenas Portal do Cliente",
      ],
      resposta: "Gestão → Relatórios → Portal → Transações",
    },
  ],
  "Dia 4": [
    {
      pergunta: "O DX8000 utiliza qual sistema operacional?",
      pontos: 10,
      alternativas: ["TELIUM TETRA", "Android 10", "Linux", "Windows CE"],
      resposta: "Android 10",
    },
    {
      pergunta: "O MOVE5000 opera com qual sistema?",
      pontos: 10,
      alternativas: ["Android", "Linux Custom", "TELIUM TETRA OS", "Windows Embedded"],
      resposta: "TELIUM TETRA OS",
    },
    {
      pergunta: "“Sim Card is Locked” normalmente indica:",
      pontos: 10,
      alternativas: [
        "Falha de liquidação",
        "Chip incorreto ou bloqueado",
        "Problema no emissor",
        "Erro de bandeira",
      ],
      resposta: "Chip incorreto ou bloqueado",
    },
    {
      pergunta: "O erro “Falha ao conectar” no credenciamento está ligado principalmente a:",
      pontos: 10,
      alternativas: [
        "Taxa incorreta",
        "Oscilação de internet",
        "Bloqueio da CIP",
        "Erro do banco emissor",
      ],
      resposta: "Oscilação de internet",
    },
    {
      pergunta: "Quando o terminal perde aplicação e chaves criptográficas, deve-se:",
      pontos: 10,
      alternativas: ["Atualizar software", "Reiniciar", "Substituir o equipamento", "Refazer credenciamento"],
      resposta: "Substituir o equipamento",
    },
    {
      pergunta: "Qual a versão atual do DX8000",
      pontos: 10,
      alternativas: ["1.54.08", "1.54.12", "1.54.15", "1.54.16"],
      resposta: "1.54.15",
    },
    {
      pergunta: "Quando há lentidão na aplicação, deve-se primeiro:",
      pontos: 10,
      alternativas: [
        "Reiniciar a máquina",
        "Verificar rede e reiniciar",
        "Alterar bandeira",
        "Cancelar venda",
      ],
      resposta: "Verificar rede e reiniciar",
    },
    {
      pergunta: "Qual a versão atual do Move5000?",
      pontos: 10,
      alternativas: ["1.07", "1.08", "1.05", "1.09"],
      resposta: "1.09",
    },
    {
      pergunta: "Em qual/quais máquinas é possível transacionar cartões vouchers?",
      pontos: 10,
      alternativas: ["DX8000", "Ambos equipamentos", "MOVE5000"],
      resposta: "MOVE5000",
    },
  ],
};

const formsUrlsPorDiaPadrao = {
  "Dia 1": "https://forms.office.com/Pages/DesignPageV2.aspx?origin=NeoPortalPage&subpage=design&id=k3LiVrcbW0OjGE1pzgIrMbVNobdxUspOjI2lS08OXQ1UM09QWDEwRDBQMDQyVDlJTk9aQkcxRFdURy4u",
  "Dia 2": "https://forms.office.com/Pages/DesignPageV2.aspx?origin=NeoPortalPage&subpage=design&id=k3LiVrcbW0OjGE1pzgIrMbVNobdxUspOjI2lS08OXQ1UMzZBWUo1VzNXT1VSUlg3MVZLQURVVEtGWC4u",
  "Dia 3": "https://forms.office.com/Pages/DesignPageV2.aspx?origin=NeoPortalPage&subpage=design&id=k3LiVrcbW0OjGE1pzgIrMbVNobdxUspOjI2lS08OXQ1UNVlBOVBBQjdSMEdHNE1NWDQxWEEwTzgwMy4u",
  "Dia 4": "https://forms.office.com/Pages/DesignPageV2.aspx?origin=NeoPortalPage&subpage=design&id=k3LiVrcbW0OjGE1pzgIrMbVNobdxUspOjI2lS08OXQ1UNEpYUjIyUEFaS0NLUVVQSlMzTjcxSjY4SC4u",
};

let dadosPorDia = [...fallbackDadosPorDia];
let participantes = [...fallbackParticipantes];
let detalhamento = [...fallbackDetalhamento];
let filtroDiaAtual = "todos";
let participanteExpandidoAtual = null;
let questoesPorDia = { ...fallbackQuestoesPorDia };
let formsUrlsPorDia = { ...formsUrlsPorDiaPadrao };

const pontuacaoMaximaPorDiaPadrao = {
  "Dia 1": 100,
  "Dia 2": 110,
  "Dia 3": 100,
  "Dia 4": 90,
};

const formatPercent = (value) => `${Number(value || 0).toFixed(2).replace(".", ",")}%`;
const formatNumber = (value) => Number(value || 0).toFixed(2).replace(".", ",");

function classeTendencia(valor) {
  if (valor > 0) return "trend-up";
  if (valor < 0) return "trend-down";
  return "trend-neutral";
}

function iconeTendencia(valor) {
  if (valor > 0) return "▲";
  if (valor < 0) return "▼";
  return "•";
}

function setStatusApi(message, type = "default") {
  const statusEl = document.getElementById("status-api");
  if (!statusEl) return;
  statusEl.className = `api-status hidden-sync`;
  statusEl.textContent = message;
  statusEl.setAttribute("aria-hidden", "true");
}

function toNumber(raw) {
  if (raw == null) return 0;
  let value = String(raw).replace(/%/g, "").trim();
  if (!value) return 0;

  value = value.replace(/\s/g, "");
  if (value.includes(",") && value.includes(".")) {
    value = value.replace(/\./g, "").replace(/,/g, ".");
  } else if (value.includes(",")) {
    value = value.replace(/,/g, ".");
  }

  value = value.replace(/[^0-9.-]/g, "");
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function extractSheetId(value) {
  if (!value) return "";
  const match = String(value).match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : String(value);
}

function normalizeRange(value) {
  const raw = String(value || "").trim();
  if (!raw.includes("!")) return raw;
  const [sheetName, cells] = raw.split("!");
  const cleanedSheet = sheetName.replace(/^'+|'+$/g, "").trim();
  if (!cleanedSheet || !cells) return raw;
  return `'${cleanedSheet}'!${cells.trim()}`;
}

function buildSheetApiUrl(rangeOverride) {
  const cfg = window.APP_CONFIG?.googleSheets;
  if (!cfg?.sheetId || !cfg?.apiKey || !cfg?.range) return "";
  const sheetId = extractSheetId(cfg.sheetId);
  const range = encodeURIComponent(rangeOverride || cfg.range);
  return `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${cfg.apiKey}`;
}

function badgeClassificacao(classificacao) {
  if (classificacao.includes("Alta")) return "alta";
  if (classificacao.includes("Média")) return "media";
  return "baixa";
}

function getDiaFiltrado() {
  if (filtroDiaAtual === "todos") {
    return {
      dadosPorDiaFiltrados: [...dadosPorDia],
      detalhamentoFiltrado: [...detalhamento],
      participantesFiltrados: [...participantes],
    };
  }

  const dadosPorDiaFiltrados = dadosPorDia.filter((item) => item.dia === filtroDiaAtual);
  const detalhamentoFiltrado = detalhamento.filter((item) => item.dia === filtroDiaAtual);
  const participantesFiltrados = buildRankingFromDetalhamento(detalhamentoFiltrado);

  return { dadosPorDiaFiltrados, detalhamentoFiltrado, participantesFiltrados };
}


function ordenarParticipantesAlfabeticamente(rows) {
  return [...rows].sort((a, b) => a.participante.localeCompare(b.participante, "pt-BR", { sensitivity: "base" }));
}

function extrairNumeroDia(valorDia) {
  const match = String(valorDia || "").match(/(\d+)/);
  return match ? Number(match[1]) : Number.POSITIVE_INFINITY;
}

function ordenarDetalhamentoPorDia(rows) {
  return [...rows].sort((a, b) => extrairNumeroDia(a.dia) - extrairNumeroDia(b.dia));
}

function renderResumoPorDia(dadosFiltrados) {
  const tbody = document.getElementById("resumo-por-dia");
  tbody.innerHTML = "";

  const dadosOrdenados = [...dadosFiltrados].sort((a, b) => extrairNumeroDia(a.dia) - extrairNumeroDia(b.dia));

  dadosOrdenados.forEach((item, index) => {
    const tr = document.createElement("tr");
    tr.style.animationDelay = `${0.05 + index * 0.05}s`;
    tr.innerHTML = `
      <td>${item.dia}</td>
      <td class="num">${Math.round(item.pontuacaoMaxima)}</td>
      <td class="num">${Math.round(item.pontuacao)}</td>
      <td class="num">${formatNumber(item.mediaGrupo)}</td>
      <td class="num ${classeTendencia(item.variacao)}">${iconeTendencia(item.variacao)} ${formatPercent(Math.abs(item.variacao))}</td>
    `;
    tbody.appendChild(tr);
  });

  if (!dadosOrdenados.length) {
    document.getElementById("total-maximo").textContent = "0";
    document.getElementById("total-pontuacao").textContent = "0";
    document.getElementById("total-media").textContent = "0,00";
    document.getElementById("total-variacao").textContent = "0,00%";
    return;
  }

  const totalMaximo = dadosOrdenados.reduce((acc, item) => acc + item.pontuacaoMaxima, 0);
  const totalPontuacao = dadosOrdenados.reduce((acc, item) => acc + item.pontuacao, 0);
  const mediaTotal = dadosOrdenados.reduce((acc, item) => acc + item.mediaGrupo, 0) / dadosOrdenados.length;
  const variacaoTotal =
    dadosOrdenados.length > 1
      ? dadosOrdenados.at(-1).mediaGrupo - dadosOrdenados[0].mediaGrupo
      : dadosOrdenados[0].variacao;

  document.getElementById("total-maximo").textContent = Math.round(totalMaximo);
  document.getElementById("total-pontuacao").textContent = Math.round(totalPontuacao);
  document.getElementById("total-media").textContent = formatNumber(mediaTotal);
  document.getElementById("total-variacao").innerHTML = `<span class="${classeTendencia(
    variacaoTotal
  )}">${iconeTendencia(variacaoTotal)} ${formatPercent(Math.abs(variacaoTotal))}</span>`;
}

function preencherCabecalhoKpi() {
  if (!dadosPorDia.length) return;

  const mediaTotal = dadosPorDia.reduce((acc, item) => acc + item.mediaGrupo, 0) / dadosPorDia.length;
  document.getElementById("media-geral").textContent = formatPercent(mediaTotal);

  const melhorDia = [...dadosPorDia].sort((a, b) => b.mediaGrupo - a.mediaGrupo)[0];
  const piorDia = [...dadosPorDia].sort((a, b) => a.mediaGrupo - b.mediaGrupo)[0];
  const maiorQueda = [...dadosPorDia].sort((a, b) => a.variacao - b.variacao)[0];

  document.getElementById("melhor-dia").textContent = melhorDia?.dia || "-";
  document.getElementById("melhor-dia-percentual").textContent = formatPercent(melhorDia?.mediaGrupo || 0);
  document.getElementById("maior-queda-dia").textContent = maiorQueda?.dia || "-";
  document.getElementById("maior-queda-percentual").textContent = formatPercent(Math.abs(maiorQueda?.variacao || 0));
  document.getElementById("variacao-melhor-pior").textContent = `${((piorDia?.mediaGrupo || 0) - (melhorDia?.mediaGrupo || 0)).toFixed(0)}%`;
}

function aplicarFiltroDia() {
  const { dadosPorDiaFiltrados, detalhamentoFiltrado, participantesFiltrados } = getDiaFiltrado();
  renderResumoPorDia(dadosPorDiaFiltrados);
  preencherRanking(participantesFiltrados);
  preencherDetalhamento(detalhamentoFiltrado);
}

function inicializarFiltroDia() {
  const select = document.getElementById("filtro-dia");
  select.innerHTML = '<option value="todos">Todos</option>';

  dadosPorDia.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.dia;
    option.textContent = item.dia;
    select.appendChild(option);
  });

  select.value = filtroDiaAtual;
  select.onchange = (event) => {
    filtroDiaAtual = event.target.value;
    aplicarFiltroDia();
  };
}

function preencherRanking(participantesView = participantes) {
  const tbody = document.getElementById("ranking-participantes");
  tbody.innerHTML = "";

  participantesView.forEach((item, index) => {
    const tr = document.createElement("tr");
    tr.style.animationDelay = `${0.06 + index * 0.04}s`;
    tr.innerHTML = `
      <td>${item.nome}</td>
      <td class="num">${Math.round(item.totalAcerto || 0)}</td>
      <td class="num ${classeTendencia((item.percentualAcertoTotal || 0) - 85)}">${iconeTendencia((item.percentualAcertoTotal || 0) - 85)} ${formatPercent(item.percentualAcertoTotal || 0)}</td>
    `;
    tbody.appendChild(tr);
  });
}

function preencherDetalhamento(detalhamentoView = detalhamento) {
  const tbody = document.getElementById("detalhamento");
  tbody.innerHTML = "";

  const detalhamentoOrdenado = ordenarParticipantesAlfabeticamente(detalhamentoView);
  const participantesUnicos = [...new Set(detalhamentoOrdenado.map((item) => item.participante))];

  if (!participantesUnicos.length) {
    const tr = document.createElement("tr");
    tr.innerHTML = '<td>Nenhum participante encontrado para o filtro atual.</td>';
    tbody.appendChild(tr);
    return;
  }

  if (participanteExpandidoAtual && !participantesUnicos.includes(participanteExpandidoAtual)) {
    participanteExpandidoAtual = null;
  }

  participantesUnicos.forEach((nomeParticipante, index) => {
    const trParticipante = document.createElement("tr");
    trParticipante.className = "participant-row";
    trParticipante.style.animationDelay = `${0.08 + index * 0.03}s`;

    const buttonId = `participante-btn-${index}`;
    const expandido = participanteExpandidoAtual === nomeParticipante;

    trParticipante.innerHTML = `
      <td>
        <button id="${buttonId}" class="participant-toggle" type="button" aria-expanded="${expandido}">
          ${nomeParticipante}
        </button>
      </td>
    `;

    tbody.appendChild(trParticipante);

    const button = trParticipante.querySelector(".participant-toggle");
    button.onclick = () => {
      participanteExpandidoAtual = participanteExpandidoAtual === nomeParticipante ? null : nomeParticipante;
      preencherDetalhamento(detalhamentoView);
    };

    if (expandido) {
      const detalhamentoParticipante = ordenarDetalhamentoPorDia(
        detalhamentoOrdenado.filter((item) => item.participante === nomeParticipante)
      );

      detalhamentoParticipante.forEach((item) => {
        const trDetalhe = document.createElement("tr");
        trDetalhe.className = "participant-day-detail";
        trDetalhe.innerHTML = `
          <td>
            <div class="detail-inline">
              <span><strong>${item.dia}</strong></span>
              <span>Pont. Máxima: ${Math.round(item.pontMaxima)}</span>
              <span>Pontuação: ${Math.round(item.pontuacao)}</span>
              <span class="${classeTendencia(item.acerto - 85)}">${iconeTendencia(item.acerto - 85)} ${formatPercent(item.acerto)}</span>
              <span><span class="badge ${badgeClassificacao(item.classificacao)}">${item.classificacao}</span></span>
            </div>
          </td>
        `;
        tbody.appendChild(trDetalhe);
      });
    }
  });
}

function renderGraficoLinha() {
  const svg = document.getElementById("line-chart");
  const width = 720;
  const height = 240;
  const pad = { top: 40, right: 46, bottom: 38, left: 48 };
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  const values = dadosPorDia.map((item) => item.mediaGrupo);

  if (!values.length) {
    svg.innerHTML = "";
    return;
  }

  const xStep = values.length > 1 ? (width - pad.left - pad.right) / (values.length - 1) : 0;
  const yMin = 50;
  const yMax = 102;
  const scaleY = (v) => pad.top + ((yMax - v) / (yMax - yMin)) * (height - pad.top - pad.bottom);

  const grid = [100, 90, 80, 70, 60, 50]
    .map((tick) => {
      const y = scaleY(tick);
      return `<line x1="${pad.left}" y1="${y}" x2="${width - pad.right}" y2="${y}" stroke="#e2e6ef" stroke-width="1" />
              <text x="10" y="${y + 4}" font-size="12" fill="#6f7381">${tick}%</text>`;
    })
    .join("\n");

  const splitIndex = Math.max(values.length - 2, 0);
  const firstPoints = values
    .slice(0, splitIndex + 1)
    .map((v, i) => `${pad.left + i * xStep},${scaleY(v)}`)
    .join(" ");
  const secondPoints = values
    .slice(splitIndex)
    .map((v, i) => `${pad.left + (splitIndex + i) * xStep},${scaleY(v)}`)
    .join(" ");

  const markers = values
    .map((v, i) => {
      const x = pad.left + i * xStep;
      const y = scaleY(v);
      const color = i < values.length - 1 ? "#3d7f53" : "#c54b4b";
      const valorLabelX = i === 0 ? x + 14 : x;
      const valorLabelAnchor = i === 0 ? "start" : "middle";

      return `
        <g class="marker-anim" style="animation-delay:${0.7 + i * 0.1}s">
          <circle cx="${x}" cy="${y}" r="5" fill="#fff" stroke="${color}" stroke-width="2" />
          <text x="${valorLabelX}" y="${Math.max(y - 12, pad.top - 4)}" text-anchor="${valorLabelAnchor}" font-size="13" font-weight="700" fill="#2d3142">${formatPercent(v)}</text>
          <text x="${x}" y="${height - 10}" text-anchor="middle" font-size="13" fill="${i === values.length - 1 ? "#c54b4b" : "#2d3142"}">${dadosPorDia[i].dia}</text>
        </g>
      `;
    })
    .join("\n");

  svg.innerHTML = `
    <rect x="0" y="0" width="${width}" height="${height}" fill="#f8f9fc" />
    ${grid}
    <polyline class="line-anim" points="${firstPoints}" fill="none" stroke="#3d7f53" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    <polyline class="line-anim last" points="${secondPoints}" fill="none" stroke="#c54b4b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    <line x1="${pad.left}" y1="${scaleY(77)}" x2="${width - pad.right}" y2="${scaleY(77)}" stroke="#b8bcc8" stroke-dasharray="6 6" />
    ${markers}
  `;
}

function rerenderDashboard() {
  preencherCabecalhoKpi();
  inicializarFiltroDia();
  aplicarFiltroDia();
  renderGraficoLinha();
  renderQuestoesPorDia();
}

function renderQuestoesPorDia() {
  const container = document.getElementById("questoes-por-dia");
  if (!container) return;

  const dias = ["Dia 1", "Dia 2", "Dia 3", "Dia 4"];
  container.innerHTML = "";

  dias.forEach((dia) => {
    const card = document.createElement("article");
    card.className = "question-card";

    card.innerHTML = `
      <button type="button" class="day-open-modal" data-dia="${dia}">${dia}</button>
      <p class="question-preview-hint">Abra para consultar as perguntas.</p>
    `;

    container.appendChild(card);
  });

  container.querySelectorAll(".day-open-modal").forEach((button) => {
    button.onclick = () => abrirModalQuestoes(button.dataset.dia || "");
  });
}

function abrirModalQuestoes(dia) {
  const modal = document.getElementById("question-modal");
  const titulo = document.getElementById("question-modal-title");
  const corpo = document.getElementById("question-modal-body");
  if (!modal || !titulo || !corpo) return;

  const questoes = obterQuestoesDoDia(dia);
  titulo.textContent = `${dia} · Questões e Respostas`;

  const perguntasFallback = !questoes.length
    ? '<p class="no-question">Sem questões cadastradas para este dia.</p>'
    : questoes
        .map((item, idx) => {
          const alternativas = Array.isArray(item.alternativas) ? item.alternativas : [];
          const resposta = item.resposta || "Resposta não informada";

          const alternativasHtml = alternativas.length
            ? `<ul class="answers-list">${alternativas
                .map((alternativa) => {
                  const correta = alternativa.trim().toLowerCase() === resposta.trim().toLowerCase();
                  return `<li class="option-item ${correta ? "correct" : ""}">${escapeHtml(alternativa)}${correta ? " ✓" : ""}</li>`;
                })
                .join("")}</ul>`
            : `<p class="qa-answer">Resposta: ${escapeHtml(resposta)}</p>`;

          return `
            <div class="qa-item">
              <div class="qa-head">
                <p><strong>${idx + 1}. ${escapeHtml(item.pergunta)}</strong></p>
                <span class="qa-points">${Number(item.pontos || 10)} pontos</span>
              </div>
              ${alternativasHtml}
            </div>
          `;
        })
        .join("");

  corpo.innerHTML = `
    <div class="qa-fallback-list">${perguntasFallback}</div>
  `;

  modal.classList.remove("hidden");
  requestAnimationFrame(() => {
    modal.classList.add("is-visible");
  });
}

function fecharModalQuestoes() {
  const modal = document.getElementById("question-modal");
  if (!modal || modal.classList.contains("hidden")) return;

  modal.classList.remove("is-visible");
  window.setTimeout(() => {
    modal.classList.add("hidden");
  }, 220);
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function obterQuestoesDoDia(dia) {
  const questoesDia = questoesPorDia[dia] || [];
  const diasComQuestoesFixas = ["Dia 1", "Dia 2", "Dia 3", "Dia 4"];

  if (diasComQuestoesFixas.includes(dia) && fallbackQuestoesPorDia[dia]?.length) {
    return fallbackQuestoesPorDia[dia];
  }

  return questoesDia;
}

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  if (target.id === "question-modal-close" || target.closest("#question-modal-close")) {
    fecharModalQuestoes();
  }

  if (target.classList.contains("question-modal")) {
    fecharModalQuestoes();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    fecharModalQuestoes();
  }
});

function normalizeKey(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function detectHeaderMap(headerRow) {
  const map = {};
  const normalized = headerRow.map((cell) => normalizeKey(cell));

  const findIndex = (predicate) => normalized.findIndex(predicate);

  // Participante: prioriza colunas explícitas de nome do participante e evita "nome da origem".
  const participanteIdx = findIndex(
    (key) =>
      key === "nome" ||
      key === "nome:" ||
      key.includes("participante") ||
      (key.includes("nome") && !key.includes("origem"))
  );

  const diaIdx = findIndex((key) => key === "dia" || key.includes("dia"));

  const pontuacaoIdx = findIndex(
    (key) =>
      key.includes("pontuacao") ||
      key.includes("total de pontos") ||
      key.includes("pontos") ||
      key.includes("score")
  );

  const pontMaximaIdx = findIndex((key) => key.includes("pont") && key.includes("max"));
  const mediaIdx = findIndex((key) => key.includes("media"));
  const acertoIdx = findIndex((key) => key.includes("acerto") || key.includes("percentual") || key.includes("%") );
  const classificacaoIdx = findIndex((key) => key.includes("classifica"));
  const questaoIdx = findIndex((key) => key.includes("questao") || key.includes("pergunta") || key.includes("enunciado"));
  const respostaIdx = findIndex((key) => key.includes("resposta") || key.includes("gabarito") || key.includes("answer"));
  const alternativasIdx = findIndex((key) => key.includes("alternativa") || key.includes("opcoes") || key.includes("opcoes") || key.includes("choices"));

  if (participanteIdx >= 0) map.participante = participanteIdx;
  if (diaIdx >= 0) map.dia = diaIdx;
  if (pontuacaoIdx >= 0) map.pontuacao = pontuacaoIdx;
  if (pontMaximaIdx >= 0) map.pontMaxima = pontMaximaIdx;
  if (mediaIdx >= 0) map.media = mediaIdx;
  if (acertoIdx >= 0) map.acerto = acertoIdx;
  if (classificacaoIdx >= 0) map.classificacao = classificacaoIdx;
  if (questaoIdx >= 0) map.questao = questaoIdx;
  if (respostaIdx >= 0) map.resposta = respostaIdx;
  if (alternativasIdx >= 0) map.alternativas = alternativasIdx;

  return map;
}

function deriveClassificacao(acerto, pontuacao, pontMaxima) {
  const percentual = pontMaxima > 0 ? (pontuacao / pontMaxima) * 100 : acerto;
  const score = (Number(acerto || 0) + Number(percentual || 0)) / 2;

  if (score >= 85) return "Alta Performance";
  if (score >= 70) return "Média Performance";
  return "Baixa Performance";
}

function mapRowsToDetalhamento(rows) {
  if (!rows?.length) return [];

  const headerIndex = rows.findIndex((row) => row.some((cell) => normalizeKey(cell).includes("dia")));
  const headerRow = headerIndex >= 0 ? rows[headerIndex] : rows[0];
  const start = headerIndex >= 0 ? headerIndex + 1 : 1;
  const map = detectHeaderMap(headerRow);

  const parsed = rows
    .slice(start)
    .map((row) => {
      const participante = String(row[map.participante ?? 6] || "").trim();
      const diaRaw = String(row[map.dia ?? 7] || "").trim();
      const dia = diaRaw ? `Dia ${diaRaw}`.replace("Dia Dia", "Dia") : "";

      const pontuacao = toNumber(row[map.pontuacao ?? 5]);
      const pontMaximaRaw = toNumber(row[map.pontMaxima ?? -1]);
      const mediaRaw = toNumber(row[map.media ?? -1]);
      const acertoRaw = toNumber(row[map.acerto ?? -1]);
      const classificacaoRaw = String(row[map.classificacao ?? -1] || "").trim();

      if (!participante || !dia) return null;
      if (normalizeKey(participante).includes("nome da origem")) return null;

      return {
        participante,
        dia,
        pontMaxima: pontMaximaRaw,
        pontuacao,
        media: mediaRaw,
        acerto: acertoRaw,
        classificacao: classificacaoRaw,
      };
    })
    .filter(Boolean)
    .filter((item) => item.pontuacao > 0);

  if (!parsed.length) return [];

  // Se não existir coluna de pontuação máxima, usa tabela padrão por dia e fallback para maior pontuação do dia.
  const maxPorDia = new Map();
  parsed.forEach((item) => {
    const curr = maxPorDia.get(item.dia) || 0;
    if (item.pontuacao > curr) maxPorDia.set(item.dia, item.pontuacao);
  });

  return parsed.map((item) => {
    const pontMaximaDerivada = pontuacaoMaximaPorDiaPadrao[item.dia] || maxPorDia.get(item.dia) || item.pontuacao;
    // Regra fixa de referência por dia para evitar inconsistência no detalhamento.
    const pontMaxima = pontMaximaDerivada;
    const acerto = item.acerto > 0 ? item.acerto : (pontMaxima > 0 ? (item.pontuacao / pontMaxima) * 100 : 0);
    const media = item.media > 0 ? item.media : acerto;

    return {
      participante: item.participante,
      dia: item.dia,
      pontMaxima,
      pontuacao: item.pontuacao,
      media,
      acerto,
      classificacao: item.classificacao || deriveClassificacao(acerto, item.pontuacao, pontMaxima),
    };
  });
}

function mapRowsToQuestoesPorDia(rows) {
  const dias = ["Dia 1", "Dia 2", "Dia 3", "Dia 4"];
  const base = Object.fromEntries(dias.map((dia) => [dia, []]));
  if (!rows?.length) return base;

  const headerIndex = rows.findIndex((row) => row.some((cell) => normalizeKey(cell).includes("dia")));
  const headerRow = headerIndex >= 0 ? rows[headerIndex] : rows[0] || [];
  const start = headerIndex >= 0 ? headerIndex + 1 : 1;
  const map = detectHeaderMap(headerRow);

  rows.slice(start).forEach((row) => {
    const diaRaw = String(row[map.dia ?? 7] || "").trim();
    const dia = diaRaw ? `Dia ${diaRaw}`.replace("Dia Dia", "Dia") : "";
    if (!dias.includes(dia)) return;

    let pergunta = String(row[map.questao ?? -1] || "").trim();
    const resposta = String(row[map.resposta ?? -1] || "").trim();
    const alternativasRaw = String(row[map.alternativas ?? -1] || "").trim();

    if (!pergunta) {
      const candidato = String(row[0] || "").trim();
      const pareceQuestao = /questao|pergunta|^q\d+/i.test(normalizeKey(candidato));
      pergunta = pareceQuestao ? candidato : "";
    }

    if (!pergunta) return;

    const alternativas = alternativasRaw
      ? alternativasRaw
          .split(/\n|;|\|/)
          .map((item) => item.trim())
          .filter(Boolean)
      : [];

    base[dia].push({
      pergunta,
      resposta: resposta || "Resposta não informada",
      alternativas,
      pontos: 10,
    });
  });

  dias.forEach((dia) => {
    const unicos = new Map();
    base[dia].forEach((item) => {
      const key = `${normalizeKey(item.pergunta)}::${normalizeKey(item.resposta)}::${normalizeKey((item.alternativas || []).join("|"))}`;
      if (!unicos.has(key)) unicos.set(key, item);
    });
    base[dia] = Array.from(unicos.values());
  });

  return base;
}

function buildResumoPorDiaFromDetalhamento(rows) {
  const grouped = new Map();
  rows.forEach((item) => {
    const curr = grouped.get(item.dia) || { dia: item.dia, pontuacaoMaxima: 0, pontuacao: 0, mediaTotal: 0, count: 0 };
    curr.pontuacaoMaxima = Math.max(curr.pontuacaoMaxima, item.pontMaxima);
    curr.pontuacao += item.pontuacao;
    curr.mediaTotal += item.media;
    curr.count += 1;
    grouped.set(item.dia, curr);
  });

  const ordered = Array.from(grouped.values()).sort((a, b) => toNumber(String(a.dia).replace(/[^0-9]/g, "")) - toNumber(String(b.dia).replace(/[^0-9]/g, "")));
  return ordered.map((item, idx) => {
    const mediaGrupo = item.count ? item.mediaTotal / item.count : 0;
    const previous = idx > 0 ? ordered[idx - 1].mediaTotal / ordered[idx - 1].count : mediaGrupo;
    return {
      dia: item.dia,
      pontuacaoMaxima: item.pontuacaoMaxima,
      pontuacao: item.pontuacao,
      mediaGrupo,
      variacao: idx === 0 ? 0 : mediaGrupo - previous,
    };
  });
}

function buildRankingFromDetalhamento(rows) {
  const grouped = new Map();

  rows.forEach((item) => {
    const curr =
      grouped.get(item.participante) || { nome: item.participante, pontuacaoTotal: 0, pontuacaoMaximaConsiderada: 0 };

    curr.pontuacaoTotal += item.pontuacao;
    curr.pontuacaoMaximaConsiderada += item.pontMaxima;
    grouped.set(item.participante, curr);
  });

  return Array.from(grouped.values())
    .map((item) => {
      const percentualAcertoTotal =
        item.pontuacaoMaximaConsiderada > 0
          ? (item.pontuacaoTotal / item.pontuacaoMaximaConsiderada) * 100
          : 0;

      return {
        nome: item.nome,
        totalAcerto: item.pontuacaoTotal,
        percentualAcertoTotal,
      };
    })
    .sort((a, b) => b.percentualAcertoTotal - a.percentualAcertoTotal || b.totalAcerto - a.totalAcerto);
}

async function fetchSheetRowsWithFallbackRange() {
  const cfg = window.APP_CONFIG?.googleSheets;
  const firstRange = String(cfg?.range || "").trim();
  const secondRange = normalizeRange(firstRange);
  const rangesToTry = secondRange !== firstRange ? [firstRange, secondRange] : [firstRange];

  let lastError = null;
  for (const range of rangesToTry) {
    const response = await fetch(buildSheetApiUrl(range));
    const payload = await response.json();

    if (response.ok) return { ok: true, payload, rangeUsado: range };

    lastError = payload?.error?.message || "Falha ao consultar Google Sheets.";
    if (!String(lastError).toLowerCase().includes("unable to parse range")) {
      return { ok: false, error: lastError, rangeUsado: range };
    }
  }

  return { ok: false, error: lastError || "Falha ao consultar Google Sheets.", rangeUsado: firstRange };
}

async function validarConexaoSheets() {
  if (!buildSheetApiUrl()) {
    setStatusApi("Configuração da API ausente. Usando dados mockados.", "error");
    return;
  }

  try {
    const result = await fetchSheetRowsWithFallbackRange();
    if (!result.ok) {
      setStatusApi(`Erro da API: ${result.error} (range: ${result.rangeUsado}).`, "error");
      return;
    }

    const rows = result.payload?.values || [];
    const novoDetalhamento = mapRowsToDetalhamento(rows);
    const novasQuestoesPorDia = mapRowsToQuestoesPorDia(rows);

    if (!novoDetalhamento.length) {
      setStatusApi(
        "API conectada, mas sem dados válidos na Base. Verifique colunas: Participante, Dia, Pont. Máxima, Pontuação, Média, % Acerto.",
        "error"
      );
      return;
    }

    detalhamento = novoDetalhamento;
    participantes = buildRankingFromDetalhamento(novoDetalhamento);
    dadosPorDia = buildResumoPorDiaFromDetalhamento(novoDetalhamento);
    questoesPorDia = novasQuestoesPorDia;

    rerenderDashboard();
    setStatusApi(
      `Google Sheets conectado com sucesso. ${novoDetalhamento.length} linhas de detalhamento carregadas (range: ${result.rangeUsado}).`,
      "success"
    );
  } catch (error) {
    setStatusApi(`Falha de rede ao consultar Google Sheets: ${error.message}`, "error");
  }
}

rerenderDashboard();
validarConexaoSheets();






