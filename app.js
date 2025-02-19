// app.js
import { createSignal, onMount } from "https://esm.sh/solid-js@1.8.1";
import { openDB, getAll, add, remove } from './db.js';
import html from "https://esm.sh/solid-js@1.8.1/html";
import Habit from './habit.js';

export default function App() {
  const [habits, setHabits] = createSignal([]);
  const [checks, setChecks] = createSignal([]);
  const [db, setDb] = createSignal(null);
  const [newHabit, setNewHabit] = createSignal('');

  onMount(async () => {
    const database = await openDB();
    setDb(database);
    refreshHabits(database);
    refreshChecks(database);
  });

  const refreshHabits = async (database) => {
    const items = await getAll(database, 'habits');
    setHabits(items);
  };

  const refreshChecks = async (database) => {
    const items = await getAll(database, 'checks');
    setChecks(items);
  };

  const handleAddHabit = async () => {
    if (!newHabit().trim() || !db()) return;
    
    await add(db(), 'habits', {
      title: newHabit(),
      completed: false
    });
    
    setNewHabit('');
    refreshHabits(db());
  };

  const handleRemoveHabit = async (id) => {
    await remove(db(), 'habits', id);
    refreshHabits(db());
  };

  const handleAddCheck = async (date, habit_id) => {
    await add(db(), 'checks', {
      date: date,
      habit_id: habit_id,
      active: true
    });
  };

  return html`
    <div>
      <h1>IndexedDB Habit List</h1>
      
      <input
        type="text"
        value=${() => newHabit()}
        onInput=${(e) => {
	    setNewHabit(e.currentTarget.value)
	}}
        placeholder="Add new habit"
      />
      <button onClick=${handleAddHabit}>Add</button>

      <ul>
        ${() => habits().map(habit => (
          html`
            <${Habit} 
              data=${() => habit} 
              checks=${() => checks} 
              onRemove=${handleRemoveHabit}
              onCheck=${handleAddCheck}
            />
          `
        ))}
      </ul>
    </div>
  `;
}
