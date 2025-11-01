(function(){
  const EL = document.documentElement;
  const BTN = document.getElementById('theme-cycle');
  const KEY = 'flordapele:theme';
  const MODES = ['light', 'dark', 'hc']; // claro, escuro, alto contraste

  function apply(mode){
    // remove atributos anteriores
    EL.removeAttribute('data-theme');
    if (mode === 'dark') EL.setAttribute('data-theme', 'dark');
    else if (mode === 'hc') EL.setAttribute('data-theme', 'hc');
    // se "light", não seta atributo (usa :root padrão)
    BTN && (BTN.textContent = 'Tema: ' + (mode === 'hc' ? 'alto contraste' : (mode==='dark'?'escuro':'claro')));
  }

  function next(mode){
    const i = MODES.indexOf(mode);
    return MODES[(i+1) % MODES.length];
  }

  // preferência inicial: storage ou preferência do sistema
  let current = localStorage.getItem(KEY) ||
                (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  // aplica ao carregar
  apply(current);

  // botão pode não existir em todas as páginas, então checa:
  if (BTN) {
    BTN.addEventListener('click', () => {
      current = next(current);
      localStorage.setItem(KEY, current);
      apply(current);
    });
  }

  // se a view for trocada pelo SPA e o botão reaparecer, reatacha o texto
  document.addEventListener('view:loaded', () => {
    const b = document.getElementById('theme-cycle');
    if (b) b.textContent = 'Tema: ' + (current === 'hc' ? 'alto contraste' : (current==='dark'?'escuro':'claro'));
  });
})();