// app.js
import { createSignal, onMount } from "https://esm.sh/solid-js@1.8.1";
import { openDB, getAllHabits, addHabit, removeHabit } from './db.js';
import html from "https://esm.sh/solid-js@1.8.1/html";

export default function App() {
  const [habits, setHabits] = createSignal([]);
  const [db, setDb] = createSignal(null);
  const [newHabit, setNewHabit] = createSignal('');

  onMount(async () => {
    console.log("OnMount");
    const database = await openDB();
    setDb(database);
    refreshHabits(database);
  });

  const refreshHabits = async (database) => {
    const items = await getAllHabits(database);
    setHabits(items);
    console.log('Habits', items);
  };

  const handleAddHabit = async () => {
    if (!newHabit().trim() || !db()) return;
    
    await addHabit(db(), {
      title: newHabit(),
      completed: false
    });
    
    setNewHabit('');
    refreshHabits(db());
  };

  const handleRemoveHabit = async (id) => {
    await removeHabit(db(), id);
    refreshHabits(db());
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
          html`<li>${habit.title}<a onClick=${() => handleRemoveHabit(habit.id)}>[ X ]</a></li>`
        ))}
      </ul>
    </div>
  `;
}
