# GenoNutri Planner

Aplicación web moderna para planificar comidas semanales con una interfaz fluida y atractiva. Diseñada específicamente para el plan nutricional "Genotipo 1 Hunter".

## Características

- **Interfaz moderna y responsive** con diseño limpio y profesional
- **Sistema de pestañas** para una navegación intuitiva entre secciones
- **Planificador semanal interactivo** con arrastrar y soltar
- **Biblioteca de alimentos completa** con sistema de búsqueda y filtrado
- **Información educativa detallada** sobre el genotipo Hunter
- **Codificación visual intuitiva**:
  - Colores para categorías nutricionales (superalimentos, neutros, toxinas)
  - Identificadores para activadores metabólicos
  - Etiquetas para tipos de alimentos (proteínas, carbohidratos, etc.)
- **Exportación** del plan nutricional a CSV
- **Guardado local** mediante localStorage
- **Animaciones fluidas** para una experiencia de usuario mejorada

## Tecnologías

- **React 18** con Vite para una experiencia de desarrollo ágil
- **Tailwind CSS** para un diseño moderno y responsivo
- **Framer Motion** para animaciones suaves y atractivas
- **Lucide Icons** para iconografía consistente
- **React DnD** para funcionalidad de arrastrar y soltar

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

4. Abre en tu navegador [http://localhost:3000](http://localhost:3000)

## Compilación para producción

```bash
npm run build
# Vista previa de la carpeta 'dist'
npm run preview
```

## Despliegue en Vercel

1. Inicia sesión en [Vercel](https://vercel.com) y conecta tu cuenta de GitHub
2. Importa el proyecto **my-nutritional-planner**
3. Verifica que el comando de build sea `npm run build` y la carpeta de salida `dist`
4. Despliega; Vercel asignará una URL al sitio

## Estructura del proyecto

```
├── public/
│   └── _redirects
├── src/
│   ├── App.jsx              # Componente principal
│   ├── index.css            # Estilos globales
│   ├── main.jsx             # Punto de entrada
│   └── components/
│       ├── ModernNutritionalPlanner.jsx  # Contenedor principal
│       ├── WeeklyPlanner.jsx             # Vista de planificación semanal
│       ├── FoodLibrary.jsx               # Biblioteca de alimentos
│       └── GenotypeInfo.jsx              # Información del genotipo
├── tailwind.config.js       # Configuración de Tailwind
├── postcss.config.js
├── vite.config.js
├── vercel.json
└── package.json
```

## Plan Nutricional Genotipo 1 Hunter

Esta aplicación está diseñada específicamente para el perfil metabólico Genotipo 1 Hunter, que se caracteriza por:

- Alta eficiencia en el procesamiento de proteínas y grasas saludables
- Respuesta positiva a activadores metabólicos específicos
- Sensibilidad a ciertas toxinas alimentarias
- Necesidad de un período de desintoxicación inicial

El planificador ayuda a organizar comidas que respetan estas características, favoreciendo los superalimentos beneficiosos e identificando claramente los alimentos a evitar.

---

_Desarrollado con ♥ para optimizar tu salud nutricional_