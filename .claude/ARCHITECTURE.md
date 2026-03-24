# 🏗️ Architecture — 3D Exploration Project

## 🎯 Objetivo

Criar um sistema 3D interativo modular, escalável e orientado a componentes, com separação clara entre:

- Renderização (3D)
- Lógica de domínio (game logic)
- Input (controle)
- UI (React)
- Dados (API)

---

## 🧩 Camadas

### 1. Presentation Layer (UI)
Responsável por:
- Cards
- Modais
- Overlays
- HUD

Stack:
- React
- Tailwind / UI libs

---

### 2. 3D Layer (R3F)

Responsável por:
- Scene
- Lights
- Camera
- Meshes

Arquivos:
- Scene.tsx
- World.tsx

---

### 3. Game Layer (Core)

Responsável por:
- Player logic
- Movement
- State

Arquivos:
- player.ts
- movement.ts

---

### 4. Input Layer

Responsável por:
- Teclado
- Mouse

Arquivos:
- useKeyboard.ts
- useMouse.ts

---

### 5. Data Layer

Responsável por:
- API
- Fetch de dados
- Transformação

Arquivos:
- services/
- adapters/

---

## 🔄 Fluxo

Input → Game Logic → Atualiza estado → Render (3D/UI)

---

## 📁 Estrutura sugerida

/src
  /components
    /ui
    /3d
  /game
  /hooks
  /services
  /store

---

## ⚠️ Princípios

- Baixo acoplamento
- Alta coesão
- Evolução incremental
- Testável

---

## 🔥 Regra principal

Nenhuma lógica de negócio dentro do componente 3D.