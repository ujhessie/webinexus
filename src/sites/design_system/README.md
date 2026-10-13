# Design System Oficial - Web Inexus 2.0

> Este documento e a página `src/sites/design_system/index.jsx` são a fonte única de verdade para os padrões visuais e componentes do projeto.

---

## 📌 Regra Obrigatória para Desenvolvedores e Agentes IA

1. **Sempre consulte este Design System antes de criar qualquer tela ou componente**.
2. **Reutilize componentes existentes**: Nunca recrie botões, badges, cabeçalhos ou cards se eles já existirem em `src/componentes/`.
3. **Mantenha a página atualizada**: Sempre que um novo componente global ou variante for criado, adicione-o imediatamente em `src/sites/design_system/index.jsx` com visualização interativa, tabela de props e caminho do arquivo.

---

## 🎨 Design Tokens & Cores

Definidas no arquivo [`style.css`](file:///d:/Projetos%20Dev/web-inexus-2.0/style.css):

| Nome | Hex | Variável CSS | Classe Tailwind | Uso Principal |
| :--- | :--- | :--- | :--- | :--- |
| **Roxo Principal** | `#b72ffe` | `--color-roxo-principal` | `bg-roxo-principal`, `text-roxo-principal` | Destaque primário, CTAs e bordas ativas |
| **Roxo Escuro** | `#7b1fe1` | `--color-roxo-escuro` | `bg-roxo-escuro` | Início dos gradientes e sombras profundas |
| **Roxo Claro** | `#b62dfe` | `--color-roxo-claro` | `bg-roxo-claro` | Fim dos gradientes e hovers de botões |
| **Preto Fosco** | `#161724` | `--color-preto-fosco` | `bg-preto-fosco` | Superfície de cartões, modais e containers |
| **Preto Escuro** | `#050610` | `--color-preto-escuro` | `bg-preto-escuro` | Fundo base geral da página |

### Gradientes Oficiais:
- **Gradiente da Marca**: `bg-linear-to-r from-roxo-escuro to-roxo-principal`
- **Gradiente de Texto**: `bg-linear-to-r from-roxo-escuro to-roxo-principal bg-clip-text text-transparent` (aplicado automaticamente em tags `<strong>` dentro de títulos)
- **Gradiente de Fundo**: `bg-linear-to-r from-preto-escuro via-preto-escuro/90 to-preto-escuro/40`

---

## 🔤 Tipografia

- **Títulos e CTAs**: `font-titulo` (Space Grotesk, sans-serif)
  - `h1`: `font-titulo font-black text-4xl sm:text-5xl lg:text-7xl uppercase`
  - `h2`: `font-titulo text-3xl sm:text-4xl font-bold`
  - `h3`: `font-titulo text-xl sm:text-2xl font-semibold`
- **Corpo e Descrições**: `font-corpo` (Poppins, sans-serif)
  - Parágrafos: `font-corpo text-sm sm:text-base text-zinc-300 leading-relaxed`

---

## 📐 Layout & Container

- **Container Padrão**: `.content-section` (`max-w-7xl mx-auto px-6 sm:px-10 lg:px-12`)
- **Espaçamento de Seção**: `py-16 sm:py-20 lg:py-24`

---

## 📁 Catálogo de Componentes

### 1. Componentes UI (`src/componentes/ui/`)
- [`Botao.jsx`](file:///d:/Projetos%20Dev/web-inexus-2.0/src/componentes/ui/Botao/Botao.jsx):
  - Variantes: `tipoBotao="primario"` | `"secundario"` | `"outline"`
  - Props: `textoCTA`, `iconCTA`, `href`, `className`, `children`
- [`Badge.jsx`](file:///d:/Projetos%20Dev/web-inexus-2.0/src/componentes/ui/Badge/Badge.jsx):
  - Props: `textoBadge` (padrão: "BEM VINDOS!")
- [`Marquee.jsx`](file:///d:/Projetos%20Dev/web-inexus-2.0/src/componentes/ui/Marquee/Marquee.jsx):
  - Props: `children`, `reverse` (boolean)
- [`SeletorSiteLocal.jsx`](file:///d:/Projetos%20Dev/web-inexus-2.0/src/componentes/ui/SeletorSiteLocal.jsx):
  - Botão flutuante para alternar entre os sites no localhost.

### 2. Componentes de Layout (`src/componentes/layout/`)
- [`Header.jsx`](file:///d:/Projetos%20Dev/web-inexus-2.0/src/componentes/layout/Header.jsx):
  - Props: `logo`, `links`, `configCTA`
- [`CardProjeto.jsx`](file:///d:/Projetos%20Dev/web-inexus-2.0/src/componentes/layout/CardProjeto/CardProjeto.jsx):
  - Props: `id`, `basePath`
- [`GaleriaProjetos.jsx`](file:///d:/Projetos%20Dev/web-inexus-2.0/src/componentes/layout/GaleriaProjetos/GaleriaProjetos.jsx):
  - Props: `limite`
- [`PaginaProjeto.jsx`](file:///d:/Projetos%20Dev/web-inexus-2.0/src/componentes/layout/PaginaProjeto/PaginaProjeto.jsx):
  - Props: `basePath`

---

## 🚀 Como Visualizar o Design System

No ambiente local (`localhost`):
1. Abra o site no navegador.
2. No botão flutuante **"Site Local"** no canto inferior direito, selecione **"Design System"**.
3. Ou acesse a rota `/design-system`.

