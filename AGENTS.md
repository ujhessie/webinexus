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
├── components/
│   ├── layout/
│   └── ui/
│
├── config/
├── sites/
│   ├── ujhessie/
│   ├── webinexus/
│   └── manutencao/
│
├── utils/
│
├── App.jsx
├── main.jsx
└── style.css