export const tpl = {
  projetoCard: (titulo, resumo, img, link) => `
    <article class="card">
      <img src="${img}" alt="${titulo}">
      <div class="card-body">
        <h3>${titulo}</h3>
        <p>${resumo}</p>
        <a class="btn" href="${link}">Quero me inscrever</a>
      </div>
    </article>
  `,
  postCard: (titulo, resumo, capa, link='#') => `
    <article class="blog-card">
      <img src="${capa}" alt="${titulo}">
      <div class="blog-content">
        <h3>${titulo}</h3>
        <p>${resumo}</p>
        <a class="btn-leia" href="${link}">Ler mais</a>
      </div>
    </article>
  `
};