# Nutritional Planner
 Aplicación web para planificar comidas semanales de forma interactiva, con arrastrar y soltar (drag & drop) y persistencia en el navegador.
 
 ## Características
 - Arrastra alimentos desde la barra lateral a la cuadrícula semanal.
 - Tres tipos de comida: **Desayuno**, **Comida**, **Cena**.
 - Persistencia automática en **localStorage**.
 - Diseño responsive y mobile-first con **Tailwind CSS**.
 - Desplegable en **Vercel** como sitio estático.
 
 ## Tecnologías
 - React 18 + Vite
 - Tailwind CSS
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
 npm run serve
 ```
 
 ## Despliegue en Vercel
 1. Inicia sesión en [Vercel](https://vercel.com) y conecta tu cuenta de GitHub.
 2. Importa el proyecto **my-nutritional-planner**.
 3. Verifica que el comando de build sea `npm run build` y la carpeta de salida `dist`.
 4. Despliega; Vercel asignará una URL al sitio.
 
 ## Estructura del proyecto
 ```
 ├── public/ (index.html)
 ├── src/
 │   ├── main.jsx
 │   ├── index.css
 │   ├── App.jsx
 │   └── components/
 │      ├── Sidebar.jsx
 │      └── MealGrid.jsx
 ├── tailwind.config.js
 ├── postcss.config.js
 ├── vite.config.js
 ├── vercel.json
 └── package.json
 ```
 
 ---
 _Mantén este README actualizado con instrucciones y enlaces reales al despliegue._