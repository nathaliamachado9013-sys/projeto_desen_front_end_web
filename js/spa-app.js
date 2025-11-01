// js/spa-app.js
// Garanta que o script é carregado como ES module no HTML:
// <script type="module" src="js/spa-app.js" defer></script>

import { startHashRouter } from './spa-router.js';
import { initForms } from './form-validacao.js';

/** Intercepta <a data-route> para evitar navegação completa */
function interceptMenuLinks() {
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-route]');
    if (!a) return;

    const route = a.getAttribute('data-route')?.trim();
    if (!route) return;

    e.preventDefault();
    // Normaliza: "/sobre" -> "#/sobre", "#/sobre" permanece
    const normalized = route.startsWith('#') ? route : `#${route}`;
    if (location.hash !== normalized) {
      location.hash = normalized;
    } else {
      // Se já está na mesma rota, força recarregar a view
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    }
  });
}

/** Reexecuta lógicas pós-render (ex.: máscaras/validação em formulários) */
function onViewLoaded() {
  try { initForms?.(document); } catch {}
  // Acessibilidade: rola o #app para o topo se necessário
  const app = document.getElementById('app');
  if (app) app.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

window.addEventListener('DOMContentLoaded', () => {
  interceptMenuLinks();
  // Inicia o roteador
  startHashRouter();
  // Primeira carga
  onViewLoaded();
  // A cada troca de rota via hash, seu spa-router dispara 'view:loaded'
  document.addEventListener('view:loaded', onViewLoaded);
});