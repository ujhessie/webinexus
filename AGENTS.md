# Regras do Projeto

Este projeto é uma aplicação React com vários sites.

O objetivo é manter o código simples, organizado, reutilizável e fácil de entender.

**NUNCA rode `npm run build`** neste projeto — ainda estamos em desenvolvimento e o build não é necessário. Para validar o código, use apenas `npm run lint` e o dev server (`npm run dev`).

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

---

## 4. Contexto do Projeto (Web iNexus)

- **O que é**: este é o site da própria agência de sites e designs **Web iNexus** — e também uma vitrine/portfólio com vários sites (ver pastas em `src/sites/`).
- **Público-alvo**: pequenos negócios locais (restaurantes, barbearias, salões, academias etc.). A proposta é oferecer **melhorias e pequenas soluções** — não projetos complexos.
- **Quem é o dono**: Jesse, 23 anos, fundador da agência e iniciante em desenvolvimento.
- **Como explicar as coisas**: termos técnicos diretos (como o mercado usa), explicando conceitos novos com uma linha rápida *"(isso é X, pergunta se quiser)"* e detalhando mais só quando ele pedir.
- **Regra de ouro**: antes de planejar algo neste projeto (página nova, feature, mudança de layout), faça perguntas uma por vez até o Jesse falar "pode executar". Para tarefas pequenas, avise que é pequeno e pergunte se ele quer que seja feito direto.
- **Mais detalhes** de cada projeto de vida do Jesse (CLT, estudos) estão no arquivo global de instruções (`~/.config/opencode/AGENTS.md`), na seção "Projetos de Vida".