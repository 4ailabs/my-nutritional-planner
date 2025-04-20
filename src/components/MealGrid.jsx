import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const meals = ['Desayuno', 'Comida', 'Cena'];

function MealGrid({ schedule }) {
  return (
    <div className="w-full sm:w-3/4 overflow-auto">
      <div className="grid grid-cols-7 auto-rows-min text-center border-t border-l">
        {days.map(day => (
          <div key={day} className="border-r border-b p-2 bg-gray-100 font-bold">
            {day}
          </div>
        ))}
        {days.map(day =>
          meals.map(meal => (
            <Droppable droppableId={`grid-${day}-${meal}`} key={`${day}-${meal}`}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="border-r border-b h-32 p-2 flex flex-col overflow-y-auto"
                >
                  <div className="text-sm font-semibold">{meal}</div>
                  {schedule[day] &&
                    schedule[day][meal] &&
                    schedule[day][meal].map((item, index) => (
                      <Draggable key={item.instanceId} draggableId={item.instanceId} index={index}>
                        {(provided2) => (
                          <div
                            ref={provided2.innerRef}
                            {...provided2.draggableProps}
                            {...provided2.dragHandleProps}
                            className="p-1 m-1 bg-green-200 rounded text-xs cursor-move"
                          >
                            {item.name}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))
        )}
      </div>
    </div>
  );
}

export default MealGrid;