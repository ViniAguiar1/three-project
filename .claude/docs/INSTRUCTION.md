# 🎮 3D Exploration Project (Three.js + React Three Fiber)

## 📌 Objetivo

Este projeto tem como objetivo explorar desenvolvimento 3D na web utilizando Three.js com React Three Fiber, focando em aprendizado prático de:

- Renderização 3D (WebGL)
- Interação em tempo real
- Estrutura de game loop
- Integração com UI React
- Uso de IA como assistente de desenvolvimento

---

## 🚀 Stack

- Next.js (App Router)
- React
- Three.js
- @react-three/fiber
- @react-three/drei
- TypeScript

---

## 🧠 Conceitos sendo estudados

- Scene / Mesh / Geometry / Material
- Camera (Perspective)
- Lighting (Ambient / Directional)
- Game Loop (`useFrame`)
- Vetores (Vector3)
- Transformações (posição, rotação, escala)
- Interação (raycasting - futuro)

---

## 🧱 Estrutura inicial
/src
/app
/components
Scene.tsx
Player.tsx
/lib
controls.ts

---

## 🎯 Roadmap

### Fase 1 — Base
- [x] Renderizar cena básica
- [x] Adicionar objeto (mesh)
- [x] Configurar iluminação
- [ ] Adicionar chão (plane)

### Fase 2 — Movimento
- [ ] Implementar movimento com teclado (WASD)
- [ ] Criar Player component
- [ ] Ajustar velocidade e direção

### Fase 3 — Câmera
- [ ] Camera follow (terceira pessoa)
- [ ] Ajustar ângulo e suavidade

### Fase 4 — Interação
- [ ] Raycasting (clique em objetos)
- [ ] Hover state
- [ ] Eventos de interação

### Fase 5 — Produto
- [ ] Inserir pontos de interesse
- [ ] Exibir cards (React UI)
- [ ] Integração com API

---

## 🤖 Uso de IA

Este projeto utiliza IA como parte ativa do desenvolvimento:

- Geração de código
- Refatoração
- Sugestões arquiteturais
- Debugging assistido

---

## 📏 Princípios

- Começar simples, evoluir incrementalmente
- Manter código modular
- Separar lógica de renderização
- Evitar overengineering

---

## ⚠️ Não fazer

- Não implementar física avançada no início
- Não usar muitas libs externas
- Não acoplar lógica diretamente ao render

---

## 🔥 Objetivo final

Criar um ambiente 3D interativo onde usuários possam:

- Navegar pelo espaço
- Interagir com elementos
- Visualizar dados reais (ex: estabelecimentos)

---

## 🧑‍💻 Autor

Vinicius Aguiar