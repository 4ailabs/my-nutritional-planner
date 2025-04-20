import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, X, Save, Download, Calendar, Info, Grid2X2, Settings, Filter, Search } from 'lucide-react';
import FoodLibrary from './FoodLibrary';
import WeeklyPlanner from './WeeklyPlanner';
import GenotypeInfo from './GenotypeInfo';

const ModernNutritionalPlanner = () => {
  const [activeTab, setActiveTab] = useState('planner');
  const [mealPlan, setMealPlan] = useState({});
  const [draggingItem, setDraggingItem] = useState(null);
  
  // Constantes para comidas y días
  const daysOfWeek = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];
  
  const mealTypes = [
    { name: "Rompe Ayuno", time: "8:00 AM" },
    { name: "Desayuno", time: "11:00 AM" },
    { name: "Comida", time: "3:00 PM" },
    { name: "Colación", time: "6:00 PM" },
    { name: "Cena", time: "9:00 PM" },
  ];

  // Inicializar el plan de comidas
  useEffect(() => {
    const initialMealPlan = {};
    daysOfWeek.forEach((day) => {
      initialMealPlan[day] = {};
      mealTypes.forEach((type) => {
        initialMealPlan[day][type.name] = [];
      });
    });
    
    // Intentar cargar desde localStorage
    const savedPlan = localStorage.getItem("nutritionalPlan");
    if (savedPlan) {
      setMealPlan(JSON.parse(savedPlan));
    } else {
      setMealPlan(initialMealPlan);
    }
  }, []);

  // Funciones para drag and drop
  const handleDragStart = (item) => {
    setDraggingItem(item);
  };

  const handleDrop = (day, mealType) => {
    if (draggingItem) {
      const newPlan = { ...mealPlan };
      if (!newPlan[day][mealType].includes(draggingItem)) {
        newPlan[day][mealType] = [
          ...newPlan[day][mealType],
          draggingItem,
        ];
        setMealPlan(newPlan);
      }
      setDraggingItem(null);
    }
  };

  const removeItem = (day, mealType, item) => {
    const newPlan = { ...mealPlan };
    newPlan[day][mealType] = newPlan[day][mealType].filter(
      (i) => i !== item
    );
    setMealPlan(newPlan);
  };

  // Función para guardar en localStorage
  const saveToLocalStorage = () => {
    localStorage.setItem("nutritionalPlan", JSON.stringify(mealPlan));
    // Mostrar notificación
    alert("Plan guardado correctamente");
  };

  // Función para exportar a CSV
  const exportToCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";

    // Agregar encabezados
    csvContent += "Tiempo de comida,Horario," + daysOfWeek.join(",") + "\n";

    // Agregar datos
    mealTypes.forEach((mealType) => {
      let row = `${mealType.name},${mealType.time},`;
      daysOfWeek.forEach((day) => {
        const meals = mealPlan[day][mealType.name];
        row += `"${meals.join("; ")}"`;
        if (day !== daysOfWeek[daysOfWeek.length - 1]) {
          row += ",";
        }
      });
      csvContent += row + "\n";
    });

    // Crear un enlace para descargar
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Plan_Nutricional_Hunter.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-emerald-600 mr-2">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">GenoNutri Planner</h1>
              <p className="text-xs text-gray-500">Planificador Nutricional Personalizado</p>
            </div>
          </div>
          
          <div>
            <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
              <Settings size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-sm p-1 mb-6 inline-flex">
          <button 
            onClick={() => setActiveTab('planner')}
            className={`px-4 py-2 rounded-md flex items-center text-sm transition-colors ${activeTab === 'planner' ? 'bg-emerald-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Calendar size={16} className="mr-1" /> Planificador
          </button>
          <button 
            onClick={() => setActiveTab('foods')}
            className={`px-4 py-2 rounded-md flex items-center text-sm transition-colors ${activeTab === 'foods' ? 'bg-emerald-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Grid2X2 size={16} className="mr-1" /> Alimentos
          </button>
          <button 
            onClick={() => setActiveTab('info')}
            className={`px-4 py-2 rounded-md flex items-center text-sm transition-colors ${activeTab === 'info' ? 'bg-emerald-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Info size={16} className="mr-1" /> Genotipo 1 Hunter
          </button>
        </div>
        
        <AnimatePresence mode="wait">
          {activeTab === 'planner' && (
            <motion.div
              key="planner"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <WeeklyPlanner 
                mealPlan={mealPlan} 
                daysOfWeek={daysOfWeek} 
                mealTypes={mealTypes} 
                onDrop={handleDrop}
                onRemove={removeItem}
                onSave={saveToLocalStorage}
                onExport={exportToCSV}
              />
            </motion.div>
          )}
          
          {activeTab === 'foods' && (
            <motion.div
              key="foods"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <FoodLibrary onDragStart={handleDragStart} />
            </motion.div>
          )}
          
          {activeTab === 'info' && (
            <motion.div
              key="info"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <GenotypeInfo />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default ModernNutritionalPlanner;