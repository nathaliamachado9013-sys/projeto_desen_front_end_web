// === Gráficos demonstrativos da página Transparência ===

// Gráfico 1: Pizza (distribuição de recursos)
const c1 = document.getElementById("grafico-recursos")?.getContext("2d");
if (c1) {
  c1.fillStyle = "#6c9a8b";
  c1.beginPath();
  c1.moveTo(160,160);
  c1.arc(160,160,100,0,Math.PI*1.2);
  c1.fill();

  c1.fillStyle = "#e9ecef";
  c1.beginPath();
  c1.moveTo(160,160);
  c1.arc(160,160,100,Math.PI*1.2,Math.PI*2);
  c1.fill();
}

// Gráfico 2: Linha (evolução de voluntários)
const c2 = document.getElementById("grafico-voluntarios")?.getContext("2d");
if (c2) {
  c2.beginPath();
  c2.moveTo(30,180);
  [60,90,120,150,180,210,240].forEach((x)=>{
    c2.lineTo(x,180 - Math.random()*100);
  });
  c2.strokeStyle = "#6c9a8b";
  c2.lineWidth = 3;
  c2.stroke();
}

// Gráfico 3: Barras (impacto por região)
const c3 = document.getElementById("grafico-regioes")?.getContext("2d");
if (c3) {
  ["#6c9a8b","#94b8a9","#cfe3d7","#e9ecef"].forEach((cor,i)=>{
    c3.fillStyle = cor;
    c3.fillRect(60 + i*70, 250 - (i+2)*30, 40, (i+2)*30);
  });
}

// === Gráfico de pizza - Doações (Distribuição de recursos por projeto) ===
(function () {
  const canvas = document.getElementById('graficoRecursos');
  if (!canvas) return; // só executa na página de Doações
  const ctx = canvas.getContext('2d');

  // Dados de exemplo (você pode ajustar os valores/labels)
  const dados = [
    { label: 'Oficinas 2025', valor: 40, cor: '#6c9a8b' },
    { label: 'Horta & Saúde', valor: 25, cor: '#94b8a9' },
    { label: 'Beleza nas Escolas', valor: 20, cor: '#cfe3d7' },
    { label: 'Gestão e Operação', valor: 15, cor: '#e9ecef' }
  ];

  const total = dados.reduce((s, d) => s + d.valor, 0);
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const r  = Math.min(canvas.width, canvas.height) * 0.38; // raio
  const rInterno = r * 0.55; // donut

  let angInicio = -Math.PI / 2; // começa no topo

  // desenha as fatias
  dados.forEach(d => {
    const ang = (d.valor / total) * Math.PI * 2;
    const angFim = angInicio + ang;

    // fatia externa
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, angInicio, angFim);
    ctx.closePath();
    ctx.fillStyle = d.cor;
    ctx.fill();

    angInicio = angFim;
  });

  // “buraco” central (donut)
  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.arc(cx, cy, rInterno, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';

  // círculo branco suave no centro (para texto)
  ctx.beginPath();
  ctx.arc(cx, cy, rInterno * 0.96, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();

  // título no centro (opcional)
  ctx.fillStyle = '#2b2b2b';
  ctx.font = '600 18px system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Distribuição', cx, cy - 10);
  ctx.font = '500 14px system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif';
  ctx.fillText('por projeto', cx, cy + 10);

  // legenda simples (opcional)
  const legend = document.createElement('ul');
  legend.className = 'legend';
  dados.forEach(d => {
    const li = document.createElement('li');
    li.innerHTML = `<span style="background:${d.cor}"></span>${d.label} — ${d.valor}%`;
    legend.appendChild(li);
  });
  canvas.parentElement.appendChild(legend);
})();