# 🛍️ FakeStore Products CLI (Node.js)

Un proyecto de consola (CLI) en Node.js que permite gestionar productos desde la API pública **FakeStore** mediante comandos ejecutados con `npm run start`.

---

## ✅ Requisitos

- Node.js (recomendado **Node 18+** para tener `fetch` nativo)
- npm

---

## 📁 Estructura del proyecto

- `index.js` → punto de entrada del CLI
- `package.json` → configuración del proyecto (incluye `"type": "module"`)

---

## 🧑‍💻 Configuración inicial (resumen)

- Se creó el proyecto con:
  - `npm init -y`
- Se habilitó ESModules agregando en `package.json`:
  - `"type": "module"`
- Se configuró el script:
  - `"start": "node index.js"`

---

## 🚀 Cómo ejecutar

Ejemplos:

### 📌 Consultar todos los productos
```bash
npm run start GET products