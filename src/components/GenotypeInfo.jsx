import React from 'react';
import { motion } from 'framer-motion';

const GenotypeInfo = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Genotipo 1: Hunter</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
          <h3 className="font-semibold text-emerald-700 mb-2">Características</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex items-start">
              <span className="text-emerald-500 mr-2">•</span>
              <span>Metabolismo eficiente y adaptable</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-500 mr-2">•</span>
              <span>Alta capacidad para procesar proteínas y grasas saludables</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-500 mr-2">•</span>
              <span>Sensibilidad a toxinas alimentarias específicas</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-500 mr-2">•</span>
              <span>Respuesta favorable a activadores metabólicos</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 className="font-semibold text-blue-700 mb-2">Objetivos Nutricionales</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Optimizar la función mitocondrial</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Favorecer la desintoxicación natural del organismo</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Equilibrar los niveles hormonales</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Reducir la inflamación sistémica</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
          <h3 className="font-semibold text-amber-700 mb-2">Recomendaciones</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex items-start">
              <span className="text-amber-500 mr-2">•</span>
              <span>5-6 comidas distribuidas a lo largo del día</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-500 mr-2">•</span>
              <span>Priorizar proteínas magras y vegetales de hoja verde</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-500 mr-2">•</span>
              <span>Incluir al menos 2 activadores metabólicos por comida</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-500 mr-2">•</span>
              <span>Evitar estrictamente alimentos con toxinas marcadas</span>
            </li>
          </ul>
        </div>
      </div>
      
      <motion.div 
        className="border-l-4 border-emerald-500 pl-4 py-2 bg-gray-50 rounded-r mb-6"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-gray-700">
          El perfil <span className="font-medium">Genotipo 1 Hunter</span> representa un tipo metabólico adaptado para la alta eficiencia energética. Este plan nutricional está diseñado específicamente para optimizar tu salud según tu perfil genético.
        </p>
      </motion.div>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Superalimentos Recomendados</h3>
          <p className="text-gray-700 mb-2">Los superalimentos marcados en verde deberían formar la base de tu alimentación:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {['Brócoli', 'Salmón', 'Espárragos', 'Huevos', 'Sardinas', 'Chile jalapeño', 'Semillas de lino', 'Ghee'].map((food) => (
              <div key={food} className="bg-emerald-100 p-2 rounded text-sm text-emerald-800">
                {food}
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Activadores Metabólicos</h3>
          <p className="text-gray-700 mb-2">Incluye estos activadores metabólicos (marcados con ♢) para potenciar tu metabolismo:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {['Piña', 'Semillas de calabaza', 'Té verde', 'Canela', 'Jengibre', 'Cilantro', 'Alcachofa', 'Trucha'].map((food) => (
              <div key={food} className="bg-blue-100 p-2 rounded text-sm text-blue-800 flex items-center">
                <span className="text-blue-500 mr-1">♢</span> {food}
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Recomendaciones de Actividad Física</h3>
          <ul className="ml-6 text-gray-700 list-disc space-y-1">
            <li>Entrenamiento de alta intensidad (HIIT): 2-3 veces por semana</li>
            <li>Ejercicios de fuerza: 2-3 veces por semana</li>
            <li>Actividad aeróbica moderada: 30 minutos diarios</li>
            <li>Recuperación activa entre sesiones intensas</li>
          </ul>
        </div>
      </div>
      
      <div className="mt-8 bg-red-50 p-4 rounded-lg border border-red-100">
        <h3 className="font-semibold text-red-700 mb-2">Período de Desintoxicación</h3>
        <p className="text-gray-700 mb-2">
          Es fundamental realizar un período de desintoxicación inicial de <span className="font-medium">60 días</span> evitando estrictamente los alimentos marcados como toxinas. Después de este período, puedes reintroducir gradualmente algunos alimentos neutros, observando tu respuesta.
        </p>
      </div>
    </div>
  );
};

export default GenotypeInfo;