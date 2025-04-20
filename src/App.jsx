import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Sidebar from './components/Sidebar';
import MealGrid from './components/MealGrid';

const initialItems = [
  { id: '1', name: 'Manzana' },
  { id: '2', name: 'Banana' },
  { id: '3', name: 'Huevos' },
  { id: '4', name: 'Pollo' },
  { id: '5', name: 'Arroz' },
];

const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const meals = ['Desayuno', 'Comida', 'Cena'];

function App() {
  const [items, setItems] = useState([]);
  const [schedule, setSchedule] = useState({});

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items'));
    const storedSchedule = JSON.parse(localStorage.getItem('schedule'));
    if (storedItems) setItems(storedItems);
    else setItems(initialItems);
    if (storedSchedule) setSchedule(storedSchedule);
    else {
      const initSchedule = {};
      days.forEach(day => {
        initSchedule[day] = {};
        meals.forEach(meal => {
          initSchedule[day][meal] = [];
        });
      });
      setSchedule(initSchedule);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('schedule', JSON.stringify(schedule));
  }, [schedule]);

  const onDragEnd = result => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    if (source.droppableId === 'sidebar' && destination.droppableId.startsWith('grid-')) {
      const [, day, meal] = destination.droppableId.split('-');
      const item = items.find(i => i.id === draggableId);
      const instance = { ...item, instanceId: `${draggableId}-${Date.now()}` };
      setSchedule(prev => {
        const newSchedule = { ...prev };
        const destList = Array.from(newSchedule[day][meal]);
        destList.splice(destination.index, 0, instance);
        newSchedule[day] = { ...newSchedule[day], [meal]: destList };
        return newSchedule;
      });
    }
    else if (source.droppableId.startsWith('grid-') && destination.droppableId.startsWith('grid-')) {
      const [, srcDay, srcMeal] = source.droppableId.split('-');
      const [, destDay, destMeal] = destination.droppableId.split('-');
      setSchedule(prev => {
        const newSchedule = { ...prev };
        const srcList = Array.from(newSchedule[srcDay][srcMeal]);
        const srcIndex = srcList.findIndex(item => item.instanceId === draggableId);
        const [moved] = srcList.splice(srcIndex, 1);
        newSchedule[srcDay] = { ...newSchedule[srcDay], [srcMeal]: srcList };
        const destList = Array.from(newSchedule[destDay][destMeal]);
        destList.splice(destination.index, 0, moved);
        newSchedule[destDay] = { ...newSchedule[destDay], [destMeal]: destList };
        return newSchedule;
      });
    }
    else if (destination.droppableId === 'sidebar' && source.droppableId.startsWith('grid-')) {
      const [, day, meal] = source.droppableId.split('-');
      setSchedule(prev => {
        const newSchedule = { ...prev };
        const srcList = Array.from(newSchedule[day][meal]);
        const srcIndex = srcList.findIndex(item => item.instanceId === draggableId);
        if (srcIndex !== -1) srcList.splice(srcIndex, 1);
        newSchedule[day] = { ...newSchedule[day], [meal]: srcList };
        return newSchedule;
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col sm:flex-row h-screen">
        <Sidebar items={items} />
        <MealGrid schedule={schedule} />
      </div>
    </DragDropContext>
  );
}

export default App;