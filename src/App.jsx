import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Usuario from "./Usuario";

function App() {
  const [people, setPeople] = useState([
    { name: "John", id: 1 },
    { name: "Peter", id: 2 },
    { name: "Sue", id: 3 },
  ]);

  const handleDragEnd = (event) => {
    //console.log("drag end");
    //Active es el elemento que esta siendo arrastrado y over es sobre el que se arrastra
    const { active, over } = event;
    /* console.log(event);
    console.log(active);
    console.log(over); */

    const oldIndex = people.findIndex((person) => person.id === active.id);
    const newIndex = people.findIndex((person) => person.id === over.id);
    const newOrder = arrayMove(people, oldIndex, newIndex);
    setPeople(newOrder);
  };
  return (
    <div className="flex justify-center items-center">
      <div className="w-4/6">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <h1 className="text-2xl font-bold">Lista de usuarios</h1>
          <SortableContext
            items={people}
            strategy={verticalListSortingStrategy}
          >
            {people.map((usuario) => (
              <Usuario usuario={usuario} key={usuario.id} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

export default App;
