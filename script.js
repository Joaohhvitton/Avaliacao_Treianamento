window.APP_CONFIG = window.APP_CONFIG || {
  googleSheets: {
    sheetId: "15s3H_uI-6pO4FQFuxJS2DkJtJqtP4tD-swBQw91waJw",
    apiKey: "AIzaSyCbRNgBusa9Q3gyIFRefGNDO5-JGtIRARQ",
    range: "Base!A:G"
  }
};

let dadosPorDia = [
  { dia: "Dia 1", pontuacaoMaxima: 100, pontuacao: 660, mediaGrupo: 94.29, variacao: 0 },
  { dia: "Dia 2", pontuacaoMaxima: 110, pontuacao: 980, mediaGrupo: 98.0, variacao: 3.71 },
  { dia: "Dia 3", pontuacaoMaxima: 100, pontuacao: 850, mediaGrupo: 94.44, variacao: -3.56 },
  { dia: "Dia 4", pontuacaoMaxima: 90, pontuacao: 760, mediaGrupo: 69.09, variacao: -25.35 },
];

const participantes = [
  { nome: "Giselda Cecília Martins", media: 95, acerto: 95 },
  { nome: "Nathalia Barbosa Campos", media: 90, acerto: 90 },
  { nome: "Taymara Cristina", media: 90, acerto: 90 },
  { nome: "Severiano Lima", media: 70, acerto: 70 },
  { nome: "Carlos Eduardo", media: 70, acerto: 70 },
];

const detalhamento = [
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
  {
    participante: "Joao Pedro Moura",
    dia: "Dia 3",
    pontMaxima: 100,
    pontuacao: 850,
    media: 94.44,
    acerto: 77,
    classificacao: "Alta Performance",
  },
  {
    participante: "Joicy Cbeda Campos",
    dia: "Dia 4",
    pontMaxima: 100,
    pontuacao: 760,
    media: 69.09,
    acerto: 70,
    classificacao: "Baixa Performance",
  },
];

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
  statusEl.className = `api-status${type !== "default" ? ` ${type}` : ""}`;
  statusEl.textContent = message;
}

function toNumber(raw) {
  if (raw == null) return 0;
  const normalized = String(raw).replace("%", "").replace(/\./g, "").replace(",", ".").trim();
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function extractSheetId(value) {
  if (!value) return "";
  const match = String(value).match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : String(value);
}

function buildSheetApiUrl() {
  const cfg = window.APP_CONFIG?.googleSheets;
  if (!cfg?.sheetId || !cfg?.apiKey || !cfg?.range) return "";

  const sheetId = extractSheetId(cfg.sheetId);
  const range = encodeURIComponent(cfg.range);
  return `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${cfg.apiKey}`;
}

function renderResumoPorDia(filtroDia = "todos") {
  const tbody = document.getElementById("resumo-por-dia");
  tbody.innerHTML = "";

  const dadosFiltrados =
    filtroDia === "todos" ? dadosPorDia : dadosPorDia.filter((item) => item.dia === filtroDia);

  dadosFiltrados.forEach((item) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.dia}</td>
      <td class="num">${item.pontuacaoMaxima}</td>
      <td class="num">${item.pontuacao}</td>
      <td class="num">${formatNumber(item.mediaGrupo)}</td>
      <td class="num ${classeTendencia(item.variacao)}">${iconeTendencia(item.variacao)} ${formatPercent(Math.abs(item.variacao))}</td>
    `;
    tbody.appendChild(tr);
  });

  if (!dadosFiltrados.length) {
    document.getElementById("total-maximo").textContent = "0";
    document.getElementById("total-pontuacao").textContent = "0";
    document.getElementById("total-media").textContent = "0,00";
    document.getElementById("total-variacao").textContent = "0,00%";
    return;
  }

  const totalMaximo = dadosFiltrados.reduce((acc, item) => acc + item.pontuacaoMaxima, 0);
  const totalPontuacao = dadosFiltrados.reduce((acc, item) => acc + item.pontuacao, 0);
  const mediaTotal = dadosFiltrados.reduce((acc, item) => acc + item.mediaGrupo, 0) / dadosFiltrados.length;

  const variacaoTotal =
    dadosFiltrados.length > 1
      ? dadosFiltrados.at(-1).mediaGrupo - dadosFiltrados[0].mediaGrupo
      : dadosFiltrados[0].variacao;

  document.getElementById("total-maximo").textContent = totalMaximo;
  document.getElementById("total-pontuacao").textContent = totalPontuacao;
  document.getElementById("total-media").textContent = formatNumber(mediaTotal);
  document.getElementById("total-variacao").innerHTML = `<span class="${classeTendencia(
    variacaoTotal
  )}">${iconeTendencia(variacaoTotal)} ${formatPercent(Math.abs(variacaoTotal))}</span>`;
}

function preencherCabecalhoKpi() {
  const mediaTotal = dadosPorDia.reduce((acc, item) => acc + item.mediaGrupo, 0) / dadosPorDia.length;
  document.getElementById("media-geral").textContent = formatPercent(mediaTotal);

  const melhorDia = [...dadosPorDia].sort((a, b) => b.mediaGrupo - a.mediaGrupo)[0];
  const piorDia = [...dadosPorDia].sort((a, b) => a.mediaGrupo - b.mediaGrupo)[0];
  const maiorQueda = [...dadosPorDia].sort((a, b) => a.variacao - b.variacao)[0];

  document.getElementById("melhor-dia").textContent = melhorDia?.dia || "-";
  document.getElementById("melhor-dia-percentual").textContent = formatPercent(melhorDia?.mediaGrupo || 0);
  document.getElementById("maior-queda-dia").textContent = maiorQueda?.dia || "-";
  document.getElementById("maior-queda-percentual").textContent = formatPercent(Math.abs(maiorQueda?.variacao || 0));

  const variacaoMelhorPior = (piorDia?.mediaGrupo || 0) - (melhorDia?.mediaGrupo || 0);
  document.getElementById("variacao-melhor-pior").textContent = `${variacaoMelhorPior.toFixed(0)}%`;
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

  select.onchange = (event) => {
    renderResumoPorDia(event.target.value);
  };
}

function preencherRanking() {
  const tbody = document.getElementById("ranking-participantes");
  tbody.innerHTML = "";

  participantes.forEach((item) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.nome}</td>
      <td class="num">${item.media}</td>
      <td class="num ${classeTendencia(item.acerto - 85)}">${iconeTendencia(item.acerto - 85)} ${item.acerto}%</td>
    `;
    tbody.appendChild(tr);
  });
}

function badgeClassificacao(classificacao) {
  if (classificacao.includes("Alta")) return "alta";
  if (classificacao.includes("Média")) return "media";
  return "baixa";
}

function preencherDetalhamento() {
  const tbody = document.getElementById("detalhamento");
  tbody.innerHTML = "";

  detalhamento.forEach((item) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.participante}</td>
      <td>${item.dia}</td>
      <td class="num">${item.pontMaxima}</td>
      <td class="num">${item.pontuacao}</td>
      <td class="num">${formatNumber(item.media)}</td>
      <td class="num ${classeTendencia(item.acerto - 85)}">${iconeTendencia(item.acerto - 85)} ${item.acerto}%</td>
      <td><span class="badge ${badgeClassificacao(item.classificacao)}">${item.classificacao}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

function renderGraficoLinha() {
  const svg = document.getElementById("line-chart");
  const width = 720;
  const height = 220;
  const pad = { top: 24, right: 40, bottom: 36, left: 42 };
  const values = dadosPorDia.map((item) => item.mediaGrupo);

  const xStep = values.length > 1 ? (width - pad.left - pad.right) / (values.length - 1) : 0;
  const yMin = 50;
  const yMax = 100;

  const scaleY = (v) => pad.top + ((yMax - v) / (yMax - yMin)) * (height - pad.top - pad.bottom);

  const gridY = [100, 90, 80, 70, 60, 50];
  const grid = gridY
    .map((tick) => {
      const y = scaleY(tick);
      return `<line x1="${pad.left}" y1="${y}" x2="${width - pad.right}" y2="${y}" stroke="#e2e6ef" stroke-width="1" />
              <text x="8" y="${y + 4}" font-size="12" fill="#6f7381">${tick}%</text>`;
    })
    .join("\n");

  const pathColor = "#3d7f53";
  const lastSegmentColor = "#c54b4b";
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
      const color = i < values.length - 1 ? pathColor : "#c54b4b";
      return `
        <circle cx="${x}" cy="${y}" r="5" fill="#fff" stroke="${color}" stroke-width="2" />
        <text x="${x}" y="${y - 10}" text-anchor="middle" font-size="13" font-weight="700" fill="#2d3142">${v}%</text>
        <text x="${x}" y="${height - 10}" text-anchor="middle" font-size="13" fill="${i === values.length - 1 ? "#c54b4b" : "#2d3142"}">${dadosPorDia[i].dia}</text>
      `;
    })
    .join("\n");

  svg.innerHTML = `
    <rect x="0" y="0" width="${width}" height="${height}" fill="#f8f9fc" />
    ${grid}
    <polyline points="${firstPoints}" fill="none" stroke="${pathColor}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    <polyline points="${secondPoints}" fill="none" stroke="${lastSegmentColor}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    <line x1="${pad.left}" y1="${scaleY(77)}" x2="${width - pad.right}" y2="${scaleY(77)}" stroke="#9ea6b5" stroke-dasharray="6 6" />
    ${markers}
  `;
}

function rerenderDashboard() {
  preencherCabecalhoKpi();
  inicializarFiltroDia();
  renderResumoPorDia();
  preencherRanking();
  preencherDetalhamento();
  renderGraficoLinha();
}

function mapRowsToDadosPorDia(rows) {
  if (!rows?.length) return [];
  return rows
    .filter((row) => row.length >= 5)
    .filter((row) => !String(row[0]).toLowerCase().includes("dia"))
    .map((row) => ({
      dia: String(row[0] || "").trim(),
      pontuacaoMaxima: toNumber(row[1]),
      pontuacao: toNumber(row[2]),
      mediaGrupo: toNumber(row[3]),
      variacao: toNumber(row[4]),
    }))
    .filter((item) => item.dia);
}

async function validarConexaoSheets() {
  const apiUrl = buildSheetApiUrl();
  if (!apiUrl) {
    setStatusApi("Configuração da API ausente. Usando dados mockados.", "error");
    return;
  }

  try {
    const response = await fetch(apiUrl);
    const payload = await response.json();

    if (!response.ok) {
      const message = payload?.error?.message || "Falha ao consultar Google Sheets.";
      setStatusApi(`Erro da API: ${message} (usando dados mockados).`, "error");
      return;
    }

    const rows = payload?.values || [];
    const mapped = mapRowsToDadosPorDia(rows);

    if (mapped.length) {
      dadosPorDia = mapped;
      rerenderDashboard();
      setStatusApi(`Google Sheets conectado com sucesso. ${mapped.length} linhas de dias carregadas.`, "success");
      return;
    }

    setStatusApi("Conectou na API, mas não encontrou linhas válidas no formato Dia/Pontuação/Média.", "error");
  } catch (error) {
    setStatusApi(`Falha de rede ao consultar Google Sheets: ${error.message}`, "error");
  }
}

rerenderDashboard();
validarConexaoSheets();
