# Regras do Projeto

Este projeto é uma aplicação React com vários sites.

O objetivo é manter o código simples, organizado, reutilizável e fácil de entender.

Não precisa rodar sempre o npm run build, ainda estamos em desenvolvimento.

---

## 1. Simplicidade

- Prefira sempre a solução mais simples.
- Evite abstrações, arquivos, componentes e funções desnecessárias.
- Não crie uma estrutura complexa antes de existir uma necessidade real.
- Antes de criar algo novo, verifique se algo existente pode ser reutilizado.
- Não faça refatorações que não sejam necessárias para a tarefa solicitada.
- Antes de criar um componente, veja se já existe algum que já faça a mesma função
- Se precisar criar novos componentes, mantenha-os junto ao componente principal.
---

## 2. Estrutura do projeto

A estrutura principal é:

```text
src/
├── componentes/
│   ├── layout/
│   │   ├── CardProjeto/
│   │   ├── GaleriaProjetos/
│   │   ├── PaginaProjeto/
│   │   └── Header.jsx
│   └── ui/
│       ├── Badge/
│       ├── Botao/
│       ├── Marquee/
│       └── SeletorSiteLocal.jsx
│
├── contexts/
├── data/
├── sites/
│   ├── admin_local/
│   ├── design_system/
│   ├── manutencao/
│   ├── ujhessie/
│   └── webinexus/
│
├── App.jsx
├── main.jsx
└── style.css
```

---

## 3. Design System & Padrões Visuais (Obrigatório)

- **Consulte antes de criar**: Sempre que for criar uma nova tela, design ou funcionalidade, consulte primeiro o Design System (`src/sites/design_system/index.jsx` ou visualizando no site local).
- **Reutilize componentes existentes**:
  - `Botao`: `src/componentes/ui/Botao/Botao.jsx` (variantes: `primario`, `secundario`, `outline`, com `iconCTA`).
  - `Badge`: `src/componentes/ui/Badge/Badge.jsx` (pílulas com Sparkles para tags e categorias).
  - `Marquee`: `src/componentes/ui/Marquee/Marquee.jsx` (letreiro animado).
  - `Header`: `src/componentes/layout/Header.jsx` (cabeçalho oficial com navegação e WhatsApp).
  - `CardProjeto`: `src/componentes/layout/CardProjeto/CardProjeto.jsx` (card com efeito hover e overlay).
  - `GaleriaProjetos`: `src/componentes/layout/GaleriaProjetos/GaleriaProjetos.jsx` (grid com filtros).
  - `content-section`: Classe utilitária universal de container (`max-w-7xl mx-auto px-6 sm:px-10 lg:px-12`).
- **Cores & Tokens Oficiais** (definidos no `style.css`):
  - `--color-roxo-principal` (`#b72ffe` / `bg-roxo-principal`, `text-roxo-principal`)
  - `--color-roxo-escuro` (`#7b1fe1` / `bg-roxo-escuro`)
  - `--color-roxo-claro` (`#b62dfe` / `bg-roxo-claro`)
  - `--color-preto-fosco` (`#161724` / `bg-preto-fosco`)
  - `--color-preto-escuro` (`#050610` / `bg-preto-escuro`)
  - Gradiente oficial: `bg-linear-to-r from-roxo-escuro to-roxo-principal`
  - Fontes: `font-titulo` (Space Grotesk) para títulos/botões e `font-corpo` (Poppins) para textos.
- **Atualização Obrigatória**: Se for necessário criar um novo padrão, componente global ou variante, **atualize imediatamente o arquivo do Design System** (`src/sites/design_system/index.jsx`), deixando bem descritivo onde está o componente, suas props e um preview funcional.