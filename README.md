# 🌸 Flor da Pele — ONG de Nutrição e Estética Natural

🔗 **GitHub:** [nathaliamachado9013-sys](https://github.com/nathaliamachado9013-sys)  
🔗 **Site (GitHub Pages):** [https://nathaliamachado9013-sys.github.io/projeto_desen_front_end_web/](https://nathaliamachado9013-sys.github.io/projeto_desen_front_end_web/)

---

## 💫 Sobre o projeto

**Flor da Pele** é uma ONG fictícia criada para o projeto da disciplina **Desenvolvimento Front-End Web**  
do curso de **Análise e Desenvolvimento de Sistemas**.

O projeto foi desenvolvido com foco em:
- **HTML5, CSS3 e JavaScript moderno (modular)**  
- **Acessibilidade (WCAG 2.1 AA)**  
- **Design responsivo mobile-first**  
- **Controle de versão com GitFlow e versionamento semântico**  
- **Otimização de produção e SPA (Single Page Application)**

A proposta une **nutrição e estética natural**, promovendo o **autocuidado, o bem-estar e a sustentabilidade**.

---

## 🧩 Estrutura das Páginas

| Página | Descrição |
|--------|------------|
| `index.html` | Página inicial com hero, missão, visão e valores |
| `sobre.html` | História da ONG, equipe e vídeo institucional |
| `projetos.html` | Lista de projetos e galeria responsiva com 20 imagens |
| `voluntariado.html` | Formulários de cadastro, inscrição em projetos e áudio mp3 |
| `doacoes.html` | Campanhas com barras de progresso e gráfico de pizza |
| `transparencia.html` | Relatórios e gráficos (pizza, linha e barras) com `<canvas>` |
| `contato.html` | Formulário institucional com validação e mapa ilustrativo |
| `blog.html` | Estrutura de blog com cards de artigos e imagens |

---

📁 Estrutura de Pastas
projeto_desen_front_end_web/
├── index.html
├── views/
│   ├── index.html
│   ├── sobre.html
│   ├── projetos.html
│   ├── voluntariado.html
│   ├── doacoes.html
│   ├── transparencia.html
│   ├── contato.html
│   └── blog.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── app.js
│   ├── router.js
│   ├── templates.js
│   ├── form-validacao.js
│   ├── storage.js
│   ├── utils.js
│   └── theme.js
│
├── imagens/
├── docs/
├── video/
└── audio/

## ⚙️ Recursos Técnicos

### 🧠 JavaScript Avançado
- **SPA (Single Page Application)** com `router.js` e `app.js`  
  → navegação dinâmica sem recarregar páginas.
- **Formulários inteligentes**  
  → validação, máscaras (CPF, CEP, telefone) e salvamento automático com `localStorage`.
- **Gráficos interativos** (`<canvas>`) em pizza, linha e barras.
- **Temas acessíveis**: claro, escuro e alto contraste (persistentes).
- **Eventos e manipulação de DOM** com JS modular (ESM).

### 🎨 CSS3
- Layouts com **Grid** e **Flexbox**.
- Paleta em tons **verdes e terrosos**, transmitindo natureza e calma.
- Tema dinâmico via variáveis CSS (`--bg`, `--text`, `--brand`).
- Modo escuro e alto contraste respeitando `prefers-color-scheme`.

### ♿ Acessibilidade (WCAG 2.1 AA)
- Navegação completa por teclado.
- Elementos com `aria-label` e `aria-labelledby`.
- Contraste mínimo de **4.5:1**.
- Foco visível e **skip-link**.
- Modo **alto contraste** acessível via botão e persistente em `localStorage`.

### 🔍 SEO e Desempenho
- `meta description` em todas as páginas.
- `loading="lazy"` e `decoding="async"` em imagens.
- Código HTML validado via [W3C Validator](https://validator.w3.org/).

---

## 🚀 Otimização para Produção

O projeto possui scripts de build que geram a versão minificada e otimizada.

### 🧩 Tecnologias utilizadas
- `clean-css-cli` — minificação de CSS  
- `terser` — minificação de JavaScript  
- `html-minifier-terser` — minificação de HTML  
- `imagemin-cli` — compressão de imagens

🧾 Validação e Acessibilidade

✅ HTML5 validado pelo W3C Validator

✅ Acessibilidade revisada (WCAG 2.1 AA)
✅ Responsividade testada em mobile, tablet e desktop
✅ Testado com navegação por teclado e contraste alto


### 💡 Scripts de build (package.json)
```json
{
  "scripts": {
    "min:css": "npx clean-css-cli -o dist/css/style.min.css css/style.css",
    "min:js": "npx terser js/*.js -o dist/js/app.min.js -c -m",
    "min:html": "npx html-minifier-terser --collapse-whitespace --remove-comments -o dist/index.html index.html",
    "build": "mkdir -p dist && npm run min:css && npm run min:js && npm run min:html"
  }
}


Versão Online

🌐 https://nathaliamachado9013-sys.github.io/projeto_desen_front_end_web/



🪞 Créditos

✨ Nathalia Machado
Nutricionista | Estudante de ADS | Criadora da ONG fictícia Flor da Pele
💚 Apaixonada por tecnologia, arte e o poder transformador do autocuidado.


🧩 Changelog
[v1.0.0] — 2025-11-01

Implementação completa do SPA com roteamento hash.

Validação de formulários com máscaras e LocalStorage.

Sistema de tema acessível (claro, escuro, alto contraste).

Gráficos em canvas e responsividade.

GitFlow e commits semânticos aplicados.

Build de produção com minificação e compressão.


🪪 Licença

MIT © 2025 — Projeto educacional desenvolvido para fins acadêmicos.