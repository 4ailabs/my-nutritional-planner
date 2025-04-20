import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

function Sidebar({ items }) {
  return (
    <div className="w-full sm:w-1/4 bg-white p-4 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Alimentos</h2>
      <Droppable droppableId="sidebar">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided2) => (
                  <div
                    ref={provided2.innerRef}
                    {...provided2.draggableProps}
                    {...provided2.dragHandleProps}
                    className="p-2 mb-2 bg-gray-200 rounded cursor-move"
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
    </div>
  );
}

export default Sidebar;