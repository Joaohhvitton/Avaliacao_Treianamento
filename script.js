window.APP_CONFIG = window.APP_CONFIG || {
  googleSheets: {
    sheetId: "15s3H_uI-6pO4FQFuxJS2DkJtJqtP4tD-swBQw91waJw",
    apiKey: "AIzaSyD9PazDh8LE7O6m76ODALpX9swQgdafgs4",
    range: "A:H",
  },
};

window.APP_CONFIG = window.APP_CONFIG || {
  googleSheets: {
    sheetId: "https://docs.google.com/spreadsheets/d/15s3H_uI-6pO4FQFuxJS2DkJtJqtP4tD-swBQw91waJw",
    apiKey: "AIzaSyD9PazDh8LE7O6m76ODALpX9swQgdafgs4",
    range: "Base!A:G",
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

let dadosPorDia = [...fallbackDadosPorDia];
let participantes = [...fallbackParticipantes];
let detalhamento = [...fallbackDetalhamento];
let filtroDiaAtual = "todos";

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
  statusEl.className = `api-status${type !== "default" ? ` ${type}` : ""}`;
  statusEl.textContent = message;
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

function renderResumoPorDia(dadosFiltrados) {
  const tbody = document.getElementById("resumo-por-dia");
  tbody.innerHTML = "";

  dadosFiltrados.forEach((item, index) => {
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

  detalhamentoView.forEach((item, index) => {
    const tr = document.createElement("tr");
    tr.style.animationDelay = `${0.08 + index * 0.03}s`;
    tr.innerHTML = `
      <td>${item.participante}</td>
      <td>${item.dia}</td>
      <td class="num">${Math.round(item.pontMaxima)}</td>
      <td class="num">${Math.round(item.pontuacao)}</td>
      <td class="num ${classeTendencia(item.acerto - 85)}">${iconeTendencia(item.acerto - 85)} ${formatPercent(item.acerto)}</td>
      <td><span class="badge ${badgeClassificacao(item.classificacao)}">${item.classificacao}</span></td>
    `;
    tbody.appendChild(tr);
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
}

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

  if (participanteIdx >= 0) map.participante = participanteIdx;
  if (diaIdx >= 0) map.dia = diaIdx;
  if (pontuacaoIdx >= 0) map.pontuacao = pontuacaoIdx;
  if (pontMaximaIdx >= 0) map.pontMaxima = pontMaximaIdx;
  if (mediaIdx >= 0) map.media = mediaIdx;
  if (acertoIdx >= 0) map.acerto = acertoIdx;
  if (classificacaoIdx >= 0) map.classificacao = classificacaoIdx;

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

  const maximaPorDia = new Map();
  rows.forEach((item) => {
    const maxAtual = maximaPorDia.get(item.dia) || 0;
    maximaPorDia.set(item.dia, Math.max(maxAtual, item.pontMaxima));
  });
  const pontuacaoMaximaPeriodo = Array.from(maximaPorDia.values()).reduce((acc, v) => acc + v, 0);

  rows.forEach((item) => {
    const curr = grouped.get(item.participante) || { nome: item.participante, pontuacaoTotal: 0 };
    curr.pontuacaoTotal += item.pontuacao;
    grouped.set(item.participante, curr);
  });

  return Array.from(grouped.values())
    .map((item) => {
      const percentualAcertoTotal =
        pontuacaoMaximaPeriodo > 0 ? (item.pontuacaoTotal / pontuacaoMaximaPeriodo) * 100 : 0;
      return {
        nome: item.nome,
        totalAcerto: item.pontuacaoTotal,
        percentualAcertoTotal,
      };
    })
    .sort((a, b) => b.totalAcerto - a.totalAcerto);
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

