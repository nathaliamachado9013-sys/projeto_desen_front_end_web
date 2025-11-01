// js/graficos.js
// =====================================================
// Gráficos da Flor da Pele (Transparência + Doações)
// Compatível com MPA e SPA (escuta 'view:loaded')
// =====================================================

// Util: pega 2D context com segurança
function ctx2d(id) {
  const c = document.getElementById(id);
  return c ? c.getContext('2d') : null;
}

// ---------- TRANSPARÊNCIA ----------

// 1) Pizza simples (demonstração)
function drawPieDemo() {
  const ctx = ctx2d('grafico-recursos');
  if (!ctx) return;

  const { width: W, height: H } = ctx.canvas;
  const cx = W / 2, cy = H / 2, r = Math.min(W, H) * 0.38;

  // limpar
  ctx.clearRect(0, 0, W, H);

  const fatias = [
    { cor: '#6c9a8b', ang: Math.PI * 1.2 }, // 60%
    { cor: '#e9ecef', ang: Math.PI * 0.8 }, // 40%
  ];

  let start = -Math.PI / 2;
  fatias.forEach(f => {
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, start, start + f.ang);
    ctx.closePath();
    ctx.fillStyle = f.cor;
    ctx.fill();
    start += f.ang;
  });
}

// 2) Linha simples (demonstração)
function drawLineDemo() {
  const ctx = ctx2d('grafico-voluntarios');
  if (!ctx) return;

  const { width: W, height: H } = ctx.canvas;
  const pad = 30;

  ctx.clearRect(0, 0, W, H);

  // Eixos
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad, pad);
  ctx.lineTo(pad, H - pad);
  ctx.lineTo(W - pad, H - pad);
  ctx.stroke();

  // Linha
  const xs = [pad, pad + 30, pad + 60, pad + 90, pad + 120, pad + 150, pad + 180];
  ctx.beginPath();
  ctx.moveTo(xs[0], H - pad);
  xs.forEach((x, i) => {
    const y = (H - pad) - (i === 0 ? 0 : Math.random() * (H - 2 * pad));
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = '#6c9a8b';
  ctx.lineWidth = 3;
  ctx.stroke();
}

// 3) Barras simples (demonstração)
function drawBarsDemo() {
  const ctx = ctx2d('grafico-regioes');
  if (!ctx) return;

  const { width: W, height: H } = ctx.canvas;
  const pad = 30, bw = 40, gap = 30;

  ctx.clearRect(0, 0, W, H);

  // eixo base
  ctx.strokeStyle = '#333';
  ctx.beginPath();
  ctx.moveTo(pad, H - pad);
  ctx.lineTo(W - pad, H - pad);
  ctx.stroke();

  const cores = ['#6c9a8b', '#94b8a9', '#cfe3d7', '#e9ecef'];
  const vals = [60, 90, 120, 80]; // demo

  vals.forEach((v, i) => {
    const x = pad + i * (bw + gap);
    const bh = v; // altura demo (px)
    ctx.fillStyle = cores[i % cores.length];
    ctx.fillRect(x, (H - pad) - bh, bw, bh);
  });
}

function drawTransparenciaCharts() {
  drawPieDemo();
  drawLineDemo();
  drawBarsDemo();
}

// ---------- DOAÇÕES (pizza do tipo donut) ----------

function drawDoacoesPie() {
  const canvas = document.getElementById('graficoRecursos');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const { width: W, height: H } = canvas;
  const cx = W / 2, cy = H / 2;
  const r = Math.min(W, H) * 0.38;
  const rInterno = r * 0.55;

  // limpar
  ctx.clearRect(0, 0, W, H);

  const dados = [
    { label: 'Oficinas 2025', valor: 40, cor: '#6c9a8b' },
    { label: 'Horta & Saúde', valor: 25, cor: '#94b8a9' },
    { label: 'Beleza nas Escolas', valor: 20, cor: '#cfe3d7' },
    { label: 'Gestão e Operação', valor: 15, cor: '#e9ecef' }
  ];
  const total = dados.reduce((s, d) => s + d.valor, 0);

  let start = -Math.PI / 2;
  dados.forEach(d => {
    const ang = (d.valor / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, start, start + ang);
    ctx.closePath();
    ctx.fillStyle = d.cor;
    ctx.fill();
    start += ang;
  });

  // “buraco” (donut)
  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.arc(cx, cy, rInterno, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';

  // círculo branco suave para texto
  ctx.beginPath();
  ctx.arc(cx, cy, rInterno * 0.96, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();

  // texto central
  ctx.fillStyle = '#2b2b2b';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '600 18px system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif';
  ctx.fillText('Distribuição', cx, cy - 10);
  ctx.font = '500 14px system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif';
  ctx.fillText('por projeto', cx, cy + 10);

  // legenda (idempotente: remove anterior)
  const parent = canvas.parentElement;
  if (parent) {
    const old = parent.querySelector('.legend');
    if (old) old.remove();

    const legend = document.createElement('ul');
    legend.className = 'legend';
    dados.forEach(d => {
      const li = document.createElement('li');
      const sw = document.createElement('span');
      sw.style.background = d.cor;
      li.appendChild(sw);
      li.appendChild(document.createTextNode(`${d.label} — ${d.valor}%`));
      legend.appendChild(li);
    });
    parent.appendChild(legend);
  }
}

// ---------- BOOTSTRAP (MPA + SPA) ----------

function initChartsForPath(path) {
  // Roda pelos ids presentes (seguro mesmo se path não bater)
  // Transparência
  if (document.getElementById('grafico-recursos')
   || document.getElementById('grafico-voluntarios')
   || document.getElementById('grafico-regioes')) {
    drawTransparenciaCharts();
  }
  // Doações
  if (document.getElementById('graficoRecursos')) {
    drawDoacoesPie();
  }
}

// MPA: ao carregar a página diretamente
window.addEventListener('DOMContentLoaded', () => {
  const path = location.hash.replace('#', '') || location.pathname; // cobre hash e rota direta
  initChartsForPath(path);
});

// SPA: toda vez que uma view for injetada
document.addEventListener('view:loaded', (e) => {
  const { path } = e.detail || {};
  initChartsForPath(path || '');
});