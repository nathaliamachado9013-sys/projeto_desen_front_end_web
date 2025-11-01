const ROUTES = {
  '/home': 'index.html',
  '/sobre': 'sobre.html',
  '/projetos': 'projetos.html',
  '/voluntariado': 'voluntariado.html',
  '/doacoes': 'doacoes.html',
  '/transparencia': 'transparencia.html',
  '/blog': 'blog.html',
  '/contato': 'contato.html',
};

// pega o HTML e extrai só o <main> da página alvo
export async function loadRoute(path) {
  const url = ROUTES[path] || ROUTES['/home'];
  // evita recarregar a própria index desnecessariamente
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Falha ao carregar a rota: ' + path);
  const text = await res.text();

  // Parse do documento para extrair apenas o conteúdo de <main>
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, 'text/html');
  const main = doc.querySelector('main');
  // fallback: se não tiver main, usa body
  return main ? main.innerHTML : doc.body.innerHTML;
}

// aplica navegação de hash (ex.: #/sobre)
export async function navigateTo(path) {
  const app = document.getElementById('app');
  try {
    app.setAttribute('aria-busy', 'true');
    const html = await loadRoute(path);
    app.innerHTML = html;
    // foco acessível no começo do conteúdo
    app.focus({ preventScroll: false });
    app.removeAttribute('aria-busy');
    // dispara evento para re-inicializar JS da view
    document.dispatchEvent(new CustomEvent('view:loaded', { detail: { path } }));
  } catch (err) {
    console.error(err);
    app.innerHTML = `<section><h2>Ops!</h2><p>Não foi possível carregar esta seção agora.</p></section>`;
    app.removeAttribute('aria-busy');
  }
}

export function startHashRouter() {
  const onChange = () => {
    const path = location.hash.replace('#', '') || '/home';
    navigateTo(path);
  };
  window.addEventListener('hashchange', onChange);
  onChange(); // inicial
}