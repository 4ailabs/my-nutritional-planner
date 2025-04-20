# Nutritional Planner
Aplicación web para planificar comidas semanales de forma interactiva, con arrastrar y soltar (drag & drop), animaciones y persistencia en el navegador.

## Características
- Arrastra alimentos desde la barra lateral a la cuadrícula semanal.
- Cinco tipos de comida: **Rompe Ayuno**, **Desayuno**, **Comida**, **Colación**, **Cena**.
- Clasificación nutricional con código de colores.
- Identificación de superalimentos y activadores metabólicos.
- Información sobre toxinas alimentarias a evitar.
- Exportación del plan en CSV o PDF.
- Persistencia automática en **localStorage**.
- Diseño responsive con animaciones usando **Framer Motion**.
- Desplegable en **Vercel** como sitio estático.

## Tecnologías
- React 18 + Vite
- Tailwind CSS
- Framer Motion
- react-beautiful-dnd

## Instalación y desarrollo
1. Clona el repositorio:
   ```bash
   git clone https://github.com/4ailabs/my-nutritional-planner.git
   cd my-nutritional-planner
   ```
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Abre en tu navegador [http://localhost:3000](http://localhost:3000).

## Compilación para producción
```bash
npm run build
# Vista previa de la carpeta 'dist'
npm run preview
```

## Despliegue en Vercel
1. Inicia sesión en [Vercel](https://vercel.com) y conecta tu cuenta de GitHub.
2. Importa el proyecto **my-nutritional-planner**.
3. Verifica que el comando de build sea `npm run build` y la carpeta de salida `dist`.
4. Despliega; Vercel asignará una URL al sitio.

## Estructura del proyecto
```
├── public/
│   └── _redirects
├── src/
│   ├── main.jsx
│   ├── index.css
│   ├── App.jsx
│   └── components/
│      └── NutritionalPlanner.jsx
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── vercel.json
└── package.json
```

### Enfoque Nutricional
Esta aplicación está diseñada específicamente para el plan nutricional "Genotipo 1 Hunter" con:
- Identificación de superalimentos beneficiosos
- Marcado de activadores metabólicos para pérdida de peso y desarrollo muscular
- Lista completa de alimentos a evitar por su contenido de toxinas

---
_Mantén este README actualizado con instrucciones y enlaces reales al despliegue._