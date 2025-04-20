import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, X, Save, Download } from 'lucide-react';

const WeeklyPlanner = ({ 
  mealPlan, 
  daysOfWeek, 
  mealTypes, 
  onDrop, 
  onRemove,
  onSave,
  onExport
}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  // Función para mostrar detalles de una comida
  const showMealDetails = (meal) => {
    setModalContent(meal);
    setShowModal(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-xl font-bold text-gray-800">Planificador Semanal</h2>
        <div className="flex space-x-2">
          <button 
            onClick={onSave}
            className="bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-md flex items-center text-sm transition-colors"
          >
            <Save size={16} className="mr-1" /> Guardar
          </button>
          <button 
            onClick={onExport}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md flex items-center text-sm transition-colors"
          >
            <Download size={16} className="mr-1" /> Exportar
          </button>
        </div>
      </div>
      
      {/* Vista de calendario */}
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Encabezados de días */}
          <div className="grid grid-cols-8 gap-2 mb-1">
            <div className="h-10"></div>
            {daysOfWeek.map((day) => (
              <div key={day} className="bg-gray-100 p-2 rounded font-medium text-sm text-center text-gray-700">
                {day}
              </div>
            ))}
          </div>
          
          {/* Filas de comidas */}
          {mealTypes.map((meal) => (
            <div key={meal.name} className="grid grid-cols-8 gap-2 mb-4">
              <div className="flex flex-col justify-center">
                <div className="font-medium text-sm text-gray-700">{meal.name}</div>
                <div className="text-xs text-gray-500">{meal.time}</div>
              </div>
              
              {daysOfWeek.map((day) => (
                <div 
                  key={`${day}-${meal.name}`} 
                  className="bg-gray-50 rounded p-2 min-h-[100px] border-2 border-dashed border-gray-200 hover:border-emerald-300 transition-colors"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => onDrop(day, meal.name)}
                >
                  {mealPlan[day] && mealPlan[day][meal.name] && mealPlan[day][meal.name].map((item, idx) => (
                    <motion.div
                      key={idx}
                      className="bg-emerald-100 border-l-4 border-emerald-500 rounded p-2 text-sm mb-2 flex justify-between items-center"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => showMealDetails(item)}
                    >
                      <span className="text-gray-800 truncate max-w-[80%]">{item}</span>
                      <button 
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemove(day, meal.name, item);
                        }}
                      >
                        <X size={14} />
                      </button>
                    </motion.div>
                  ))}
                  
                  <div className="flex justify-center">
                    <button className="text-gray-400 hover:text-emerald-500 transition-colors">
                      <PlusCircle size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Modal para ver detalles de comida */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <motion.div 
            className="bg-white rounded-lg p-6 w-full max-w-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Detalles de la comida</h3>
              <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>
            <p className="text-gray-700">{modalContent}</p>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default WeeklyPlanner;