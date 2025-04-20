import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';

// Datos de alimentos disponibles
const foodGroups = [
  {
    category: "Rompe Ayuno",
    color: "emerald",
    foods: [
      { name: "🟢 Piña♢ con chía y canela♢", type: "fruit", tags: ["metabolic"] },
      { name: "🟢 Arándanos♢ con yogurt (sin azúcar)", type: "fruit", tags: ["metabolic"] },
      { name: "🟢 Sandía♢ con semillas de lino♢", type: "fruit", tags: ["metabolic"] },
      { name: "🟢 Pera♢ con té verde♢", type: "fruit", tags: ["metabolic"] },
      { name: "🟢 Dátiles♢ rellenos de mantequilla de almendra♢", type: "fruit", tags: ["metabolic"] },
      { name: "🟢 Mango♢ con semillas de calabaza♢", type: "fruit", tags: ["metabolic"] },
      { name: "🟡 Plátano con nueces", type: "fruit", tags: [] },
      { name: "🟡 Guayaba con limón", type: "fruit", tags: [] },
      { name: "🟡 Chirimoya con semillas de calabaza♢", type: "fruit", tags: ["metabolic"] },
      { name: "🟡 Melón con hojas de menta", type: "fruit", tags: [] },
      { name: "🟡 Mamey con canela♢", type: "fruit", tags: ["metabolic"] },
    ]
  },
  {
    category: "Desayunos",
    color: "emerald",
    foods: [
      { name: "🟢 Huevos♢ revueltos con espárragos♢ y cilantro♢", type: "protein", tags: ["metabolic"] },
      { name: "🟢 Omelette con brócoli♢ y ghee♢", type: "protein", tags: ["metabolic"] },
      { name: "🟢 Pan de lino♢ con sardinas♢", type: "protein", tags: ["metabolic"] },
      { name: "🟢 Quinoa♢ con semillas de calabaza♢ y mango♢", type: "carb", tags: ["metabolic"] },
      { name: "🟢 Huevos♢ rancheros con chile jalapeño♢ (sin tomate)", type: "protein", tags: ["metabolic"] },
      { name: "🟢 Caldo de res♢ con verduras y cilantro♢", type: "protein", tags: ["metabolic"] },
      { name: "🟢 Huevos♢ en salsa verde de tomatillo y jalapeño♢", type: "protein", tags: ["metabolic"] },
      { name: "🟡 Clara de huevo♢ con champiñones y hojas de nabo♢", type: "protein", tags: ["metabolic"] },
      { name: "🟡 Mijo♢ con frutas secas y canela♢", type: "carb", tags: ["metabolic"] },
      { name: "🟡 Arroz basmati♢ con ghee♢ y especias", type: "carb", tags: ["metabolic"] },
      { name: "🟡 Chilaquiles con salsa verde y queso manchego♢", type: "carb", tags: ["metabolic"] },
    ]
  },
  {
    category: "Comidas",
    color: "emerald",
    foods: [
      { name: "🟢 Salmón rey♢ al horno con brócoli♢ y jengibre♢", type: "protein", tags: ["metabolic"] },
      { name: "🟢 Filete de res♢ con camote♢ y curry♢", type: "protein", tags: ["metabolic"] },
      { name: "🟢 Cordero♢ asado con alcachofa♢ y romero", type: "protein", tags: ["metabolic"] },
      { name: "🟢 Trucha arcoíris♢ con hojas de parra♢ y limón", type: "protein", tags: ["metabolic"] },
      { name: "🟢 Carne de res♢ asada con nopal y chile jalapeño♢", type: "protein", tags: ["metabolic"] },
      { name: "🟢 Pozole de venado♢ con col y chile en polvo♢", type: "protein", tags: ["metabolic"] },
      { name: "🟢 Tacos de pescado con brócoli♢ (tortilla de maíz)", type: "protein", tags: ["metabolic"] },
      { name: "🟢 Carnitas de venado♢ con cilantro♢ y cebolla", type: "protein", tags: ["metabolic"] },
      { name: "🟡 Venado♢ a la plancha con kale", type: "protein", tags: ["metabolic"] },
      { name: "🟡 Bacalao♢ con puré de calabaza y ajo", type: "protein", tags: ["metabolic"] },
      { name: "🟡 Arroz salvaje♢ con hígado de res y cebollas", type: "carb", tags: ["metabolic"] },
      { name: "🟡 Sopa de lima con pescado blanco", type: "protein", tags: [] },
    ]
  },
  {
    category: "Colaciones",
    color: "amber",
    foods: [
      { name: "🟢 Almendras♢ con chocolate♢ negro", type: "fat", tags: ["metabolic"] },
      { name: "🟢 Apio con mantequilla de almendra♢", type: "vegetable", tags: ["metabolic"] },
      { name: "🟢 Haba♢ tostada con especias", type: "protein", tags: ["metabolic"] },
      { name: "🟢 Té verde♢ con arándanos rojos♢", type: "drink", tags: ["metabolic"] },
      { name: "🟢 Jícama con chile en polvo♢ y limón", type: "vegetable", tags: ["metabolic"] },
      { name: "🟢 Toronja♢ con semillas de lino♢", type: "fruit", tags: ["metabolic"] },
      { name: "🟢 Totopos de maíz con guacamole (sin tomate)", type: "carb", tags: [] },
      { name: "🟡 Piñones con ghee♢", type: "fat", tags: ["metabolic"] },
      { name: "🟡 Jugo de piña♢ fresca", type: "drink", tags: ["metabolic"] },
      { name: "🟡 Caldo de hueso casero", type: "drink", tags: [] },
      { name: "🟡 Gajos de lima con sal de mar y chile♢", type: "fruit", tags: ["metabolic"] },
    ]
  },
  {
    category: "Cenas",
    color: "amber",
    foods: [
      { name: "🟢 Sardinas♢ con ensalada de alcachofa♢", type: "protein", tags: ["metabolic"] },
      { name: "🟢 Filete de res♢ con achicoria♢ y ghee♢", type: "protein", tags: ["metabolic"] },
      { name: "🟢 Huevo♢ cocido con brócoli♢ y alga wakame♢", type: "protein", tags: ["metabolic"] },
      { name: "🟢 Lubina♢ al horno con chile jalapeño♢ y jengibre♢", type: "protein", tags: ["metabolic"] },
      { name: "🟢 Tostadas de maíz con carne de res♢ y vegetales", type: "protein", tags: ["metabolic"] },
      { name: "🟢 Ceviche de trucha arcoíris♢ con limón y cilantro♢", type: "protein", tags: ["metabolic"] },
      { name: "🟢 Sopa de lima con sardinas♢ y brócoli♢", type: "protein", tags: ["metabolic"] },
      { name: "🟢 Filete de res♢ relleno de verduras con salsa de chile♢", type: "protein", tags: ["metabolic"] },
      { name: "🟡 Cabra♢ asada con coliflor verde", type: "protein", tags: ["metabolic"] },
      { name: "🟡 Ensalada de diente de león con nueces", type: "vegetable", tags: [] },
      { name: "🟡 Sopa de algas♢ con verduras de temporada", type: "vegetable", tags: ["metabolic"] },
      { name: "🟡 Salmón♢ en caldo de jengibre♢ y limón", type: "protein", tags: ["metabolic"] },
    ]
  },
  {
    category: "Alimentos a Evitar",
    color: "red",
    foods: [
      { name: "🔴 Tomate (toxina)", type: "vegetable", tags: [] },
      { name: "🔴 Aguacate (toxina)", type: "fat", tags: [] },
      { name: "🔴 Queso cottage (toxina)", type: "dairy", tags: [] },
      { name: "🔴 Manzana (toxina)", type: "fruit", tags: [] },
      { name: "🔴 Café (toxina)", type: "drink", tags: [] },
      { name: "🔴 Leche de vaca (toxina)", type: "dairy", tags: [] },
      { name: "🔴 Pimiento (toxina)", type: "vegetable", tags: [] },
      { name: "🔴 Lechuga (toxina)", type: "vegetable", tags: [] },
      { name: "🔴 Uva (toxina)", type: "fruit", tags: [] },
      { name: "🔴 Cerdo (toxina)", type: "protein", tags: [] },
      { name: "🔴 Pepino (toxina)", type: "vegetable", tags: [] },
      { name: "🔴 Cerveza (toxina)", type: "drink", tags: [] },
    ]
  }
];

const FoodLibrary = ({ onDragStart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  // Filtrar alimentos por término de búsqueda y tipo
  const filteredFoodGroups = foodGroups.map(group => {
    const filteredFoods = group.foods.filter(food => {
      const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || food.type === filterType;
      return matchesSearch && matchesType;
    });
    
    return {
      ...group,
      foods: filteredFoods
    };
  }).filter(group => group.foods.length > 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-xl font-bold text-gray-800">Biblioteca de Alimentos</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search size={18} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar alimentos..." 
              className="pl-9 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <button 
              className="bg-gray-100 p-2 rounded-md hover:bg-gray-200 transition-colors"
              onClick={() => setShowFilterMenu(!showFilterMenu)}
            >
              <Filter size={18} className="text-gray-600" />
            </button>
            
            {showFilterMenu && (
              <motion.div 
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10" 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="py-1">
                  <button 
                    className={`block px-4 py-2 text-sm w-full text-left ${filterType === 'all' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => setFilterType('all')}
                  >
                    Todos
                  </button>
                  <button 
                    className={`block px-4 py-2 text-sm w-full text-left ${filterType === 'protein' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => setFilterType('protein')}
                  >
                    Proteínas
                  </button>
                  <button 
                    className={`block px-4 py-2 text-sm w-full text-left ${filterType === 'carb' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => setFilterType('carb')}
                  >
                    Carbohidratos
                  </button>
                  <button 
                    className={`block px-4 py-2 text-sm w-full text-left ${filterType === 'vegetable' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => setFilterType('vegetable')}
                  >
                    Vegetales
                  </button>
                  <button 
                    className={`block px-4 py-2 text-sm w-full text-left ${filterType === 'fruit' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => setFilterType('fruit')}
                  >
                    Frutas
                  </button>
                  <button 
                    className={`block px-4 py-2 text-sm w-full text-left ${filterType === 'fat' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => setFilterType('fat')}
                  >
                    Grasas
                  </button>
                  <button 
                    className={`block px-4 py-2 text-sm w-full text-left ${filterType === 'drink' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => setFilterType('drink')}
                  >
                    Bebidas
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      
      {/* Leyenda */}
      <div className="flex flex-wrap gap-4 mb-4 text-xs">
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-emerald-500 mr-1"></span>
          <span>Superalimentos</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-amber-500 mr-1"></span>
          <span>Neutros</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-red-500 mr-1"></span>
          <span>Evitar (toxinas)</span>
        </div>
        <div className="flex items-center">
          <span className="text-blue-500 mr-1">♦</span>
          <span>Activador metabólico</span>
        </div>
      </div>
      
      {/* Grid de categorías de alimentos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFoodGroups.map((group) => (
          <div key={group.category} className="border rounded-lg overflow-hidden">
            <div className={`bg-${group.color === 'red' ? 'red' : group.color}-100 p-2 font-medium ${group.color === 'red' ? 'text-red-800' : `text-${group.color}-800`} border-b`}>
              {group.category}
            </div>
            <div className="p-3 max-h-[200px] overflow-y-auto">
              {group.foods.map((food, index) => (
                <motion.div 
                  key={index}
                  className={`${group.color === 'red' ? 'bg-red-50' : `bg-${group.color}-50`} mb-2 p-2 rounded text-sm cursor-move hover:shadow-md transition-shadow flex justify-between items-center`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  draggable
                  onDragStart={() => onDragStart(food.name)}
                >
                  <div>
                    <span>{food.name}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${group.color === 'red' ? 'bg-red-200 text-red-800' : `bg-${group.color}-200 text-${group.color}-800`}`}>
                    {food.type}
                  </span>
                </motion.div>
              ))}
              
              {group.foods.length === 0 && (
                <div className="text-center text-gray-500 py-4">
                  No se encontraron alimentos
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodLibrary;